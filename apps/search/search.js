function search_app(userid, htmlid) {
  "use strict";

  function loadTemplatesFrom(location, storeTemplates) {
    var templates = [];

    $.getJSON(location,
      function (d) {
        for (var key in d) {
          //console.log(key);
          if (d.hasOwnProperty(key)) {
            if (typeof(d[key]) === 'object') {
              templates[key] = d[key].join("\n");
            } else {
              templates[key] = d[key];
            }
          }
        };
        console.log("templates.load success!" + JSON.stringify(templates));
        storeTemplates(templates);
      }).fail(function() { console.log("error loading templates from " + location)});
  }

  var states = {
    // initial loading state, before loading all courses
    init: "init"
    // after loading all courses, before having selected one
    , search: "search"
    // courses loaded, course selected, prereq tree not loaded
    , selected: "selected"
    // prereq graph showing, prereqs loading
    , prereq: "prereq"
  };

  var options = {
    // include the description in typeahead index
    include_description: false

    // update the typeahead data on partial course update
    , update_typeahead_on_partial: false
  };

  var throttle_div = $({});
  var throttle_queue = "search_app.ajax.throttle";

  // a bunch of stuff that we just so happen to need.
  var host = "./";
  var libs = "lib/";

  var uw_api_key = "1fd7ab89665d6a475169bddfc830f37b";
  var portal_key = "b716de7c-7c24-4093-9a2f-b451286993dd";

  var initCount = 0;// # of things that need to call into init

  function loadLib(name){
    initCount++;
    $.getScript(libs + name, function(){
      console.log("script loaded: " + name);
      init();
    });
  };

  function loadTemplates(){
    initCount++;
    loadTemplatesFrom(host + "templates.json",
    function (t) {
      templates = t;
      templates_loaded = true;
      init();
    });
  }

  function uw_api_call(ver, path, params){
    
    var base = "https://api.uwaterloo.ca/";

    var api_stuff = "?key=" + uw_api_key;

    var version = ver || 2;

    switch(version){
      case 1:
        base += "public/v1/";
        api_stuff += "&output=json";
        break;
      case 2:
          base += "v2/";
          path += ".json";
        break;
      default:
        console.error("Unsupported uw api version.");
        return;
    }

    if(params){
      api_stuff += "&" + params;
    }

    var full_call = base + path + api_stuff;

    //console.log(full_call);

    return full_call;
  }

  function register_external(key, func){
    if( typeof(search_app[key]) !== 'undefined'){
      console.error("register_external: can't register: " + key);
      undefined();
    }
    search_app[key] = func;
  }

  // wrapper for Mustache that we need for twitter typeahead
  // see the typeahead docs: https://github.com/twitter/typeahead.js/#template-engine-compatibility
  var mustache_typeahead = {
    compile: function(template){
      var compiled = Mustache.compile(template);
      return {
        render: function(ctx){
          return compiled(ctx);
        }
      };
    }
  };

  var templates_loaded = false;
  var templates = {};

  var model = {

    _views: [],

    // ============= view stuff =============
    views: function(){
      return this._views;
    },

    /**
     * Add a new view to be notified when the model changes.
     */
    addView: function (view) {
      this._views.push(view);
      view.updateView("state", this.state());
    },
    /**
     * Update all of the views that are observing us.
     */
    updateViews: function (msg, newValue) {
      var views = this.views();
      var i = 0;
      for (i = 0; i < views.length; i++) {
        views[i].updateView(msg, newValue);
      }
    },

    // ============= end view stuff =============

    // ============= data caching + storage stuff =============

    _cache: {},

    _access_cache_only: function(key, val){
      if(typeof(val) === 'undefined'){
        return this._cache[ key ];
      }else{
        this._cache[ key ] = val;
        this.updateViews(key);
      }
    },

    // using: https://github.com/julien-maurel/jQuery-Storage-API
    _access: function(key, val){
      if(typeof(val) !== "undefined"){
        //console.log("_access store: " + key + " <- " + val);
        $.localStorage.set(key, val);

        // update local cache
        this._cache[key] = val;

        this.updateViews(key, val);
      }else{

        // check the local cache first

        if(this._cache.hasOwnProperty(key)){
          return this._cache[key];
        }

        val = $.localStorage.get(key);
        
        this._cache[key] = val;

        return val;
      }
    },

    _clear_data: function(){
      this._cache = {};
      $.localStorage.removeAll();
    },

    // ============= end data caching stuff =============

    // ============= properties =============

    isInit: function(val){
      return this._access("init", val);
    },

    state: function(val){
      return this._access("state", val);
    },

    subjects: function(val){
      return this._access("subjects", val);
    },

    courses: function(val){
      return this._access("courses", val);
    },

    // to not reload all subjects.
    loaded_subjects: function(val){

      var name = "loaded_subjects";

      if(typeof(val) === 'undefined'){
        return this._cache[ name ];
      }else{
        this._cache[ name ] = val;
      }
    },

    // true if we've loaded the courses for
    // all the subjects, false otherwise
    all_courses: function(val){
      return this._access("all_courses", val);
    },

    course_map: function(val){
      var name = "course_map";

      if(typeof(val) === 'undefined'){
        return this._cache[ name ];
      }else{
        this._cache[ name ] = val;
      }
    },

    selected_course: function(val){
      return this._access("selected_course", val);
    },

    course_to_prereq_map: function(val){
      return this._access("course_to_prereq_map", val);
    },

    // =================== Pre-requisit Loading ===================

    _handle_prereqs: function(array, callback){
      var course_split = /([a-zA-Z]+)([0-9]+)?/

      array.every(function(element, index, array){
        if(typeof(element) === 'string'){
          // parse into subject + number.

          var parts = course_split.exec(element);

          model.load_prereqs({
            subject: parts[1]
            , catalog_number: parts[2]
          }, callback);

        }else if(typeof(element) === 'object'){
          model._handle_prereqs(element, callback);
        }else{
          // it's a number or something, don't care.
        }
        return true;// keep going
      });
    },

    _chain_prereqs: function(prereq_response, callback){

      callback(prereq_response);

      var course_code = prereq_response.subject + prereq_response.catalog_number;

      var map = this.course_to_prereq_map();
      map[ course_code ] = prereq_response ;
      this.course_to_prereq_map(map);

      if( typeof(prereq_response.prerequisites_parsed) === 'object' ){
        model._handle_prereqs(prereq_response.prerequisites_parsed, callback);
      }
    },

    load_prereqs: function(course, callback){

      var course_code = course.subject + course.catalog_number;

      var c_prereqs = this.course_to_prereq_map()[ course_code ];

      if( typeof(c_prereqs) !== 'undefined' ){
        // our multi-request stopper
        if( typeof(c_prereqs) === 'object' ){
          callback( c_prereqs );

          model._chain_prereqs( c_prereqs, callback );
        }

      }else{
        var subject = course.subject;
        var number = course.catalog_number;

        var location = uw_api_call(2, "courses/"+subject+"/"+number+"/prerequisites");

        this.course_to_prereq_map()[ course_code ] = "loading";

        $.getJSON( location )
          // chain load all the prereqs
          .done(function(resp){

            if(resp.meta.status != 200){
              console.debug(resp);
              return;
            }

            model._chain_prereqs(resp.data, callback);
          })
          .fail(model.load_fail(location));  
      }
    },

    // =================== Pre-requisit Loading ===================

    // =================== Course + Subject Loading ===================

    all_courses_loaded: function(){
      // check if we've loaded all the courses.

      var all = this.subjects();

      var loaded = this.loaded_subjects();

      if(loaded.length === all.length){
      //if(loaded.length === 1){
        this.all_courses(true);
      }
    },

    courses_loaded: function(subject){

      return function(response){

        var courses = response.data;

        // add courses to the list of all
        var all_courses = model.courses();
        all_courses = all_courses.concat(courses);
        model.courses(all_courses);

        var map = model.course_map();
        courses.every(function(element, index, array){
          var course_code = element.subject + element.catalog_number;

          map[ course_code ] = element;
          return true;
        });
        model.course_map(map);

        // update the list of done subject loads
        var done_list = model.loaded_subjects();
        done_list[ subject ] = true;
        done_list.length ++;
        model.loaded_subjects(done_list);

        model.all_courses_loaded();

        if( model.all_courses() ){
          model.state(states.search);
        }
      }
    },

    load_courses_for: function(subject){
      
      // if(subject !== 'MATH'){
      //   return function(n){
      //     n();
      //   };
      // }

      return function(next){

        var url = uw_api_call( 2, "courses/" + subject );

        $.getJSON( url )
          .done(model.courses_loaded(subject))
          .fail(model.load_fail(url))
          .always(function(){
            next();
          });
      }
    },

    load_all_courses: function(){
      // calculate the this.all_courses field.
      this.all_courses_loaded();

      if(this.all_courses()){
        this.state(states.search);
        return;
      }

      var loaded = this.loaded_subjects();

      this.subjects().every(function(element, index, array){

        if( loaded[element.subject] ){
          return true;
        }

        throttle_div.queue(throttle_queue, this.load_courses_for(element.subject));

        return true;
      }, this);

      throttle_div.dequeue(throttle_queue);
    },

    all_subjects_loaded: function(response){
      var subjects = response.data;

      // store list of all subjects
      model.subjects(subjects);

      // update loaded subjects list
      var loaded = [];
      subjects.every(function(element, index, array){
        loaded[element.subject] = false;
        return true;
      });
      model.loaded_subjects(loaded);

      model.load_all_courses();
    },

    load_all_subjects: function(){
      
      // we've loaded subjects.
      if( this.subjects().length > 0){
        this.load_all_courses();
        return;
      }

      var url = uw_api_call(2, "codes/subjects")

      $.getJSON( url )
        .done(this.all_subjects_loaded)
        .fail(this.load_fail(url));
    },

    // =================== End of Course + Subject Loading ===================

    load_fail: function(location){
      return function(jqxhr, msg, error){
        console.error("Failed to load " + location + " -> " + msg + " " + error);
      }
    },

    initData: function(){
      console.log("initializing model");

      // reset a few things
      this.selected_course(null);

      if( !this.isInit() ){

        // load all the api things we need into local storage.
        this.isInit(true);
        this.state(states.init);
        
        this.subjects([]);
        
        this.courses([]);
        this.all_courses(false);

        // map of course subject+number -> prereq data
        this.course_to_prereq_map({});

        // things that don't persist:
        this.loaded_subjects({ length: 0 });
        this.course_map({});

      }else{
        // build the course map
        var map = {};
        var loaded = {};

        var list = this.courses();

        list.every(function(element, index, array){

          loaded[ element.subject ] = true;

          var course_code = element.subject + element.catalog_number;

          map[ course_code ] = element;

          return true;

        }, this);

        this.loaded_subjects(loaded);
        this.course_map(map);
      }
    },

    // Initialize this object
    init: function () {

      this.initData();

      this.updateViews("state", this.state());

      this.load_all_subjects();
    }
  };

  var prereqView = {

    id: htmlid + " #search_display",

    searchText: "Search",

    // the course navigation path
    path: [ ],

    // the course to display data for.
    focused_course: null,

    updateView: function(msg, newValue){

      if(
          (msg === "state" && newValue === states.selected)
          || (msg === "selected_course")
        ){
        this.focused_course = model.selected_course();

        // show this
        this.show();

        this.update_nav();
      }
    },

    init: function(){
      // no init to do.
      register_external('prereq_clicked', function(val){
        if(typeof(val) !== 'string'){
          return;
        }
        prereqView.prereq_clicked(val);
      });
      register_external('nav_prereq', function(val){
        if(typeof(val) !== 'string'){
          return;
        }
        prereqView.nav_prereq(val);
      });
    },

    _add_prereqs: function(array){

      var map = model.course_map();
      var course_list = [];

      array.every(function(element, index, array){

        if(typeof(element) === 'string'){
          if( typeof( map[element] ) !== 'undefined'){
            course_list.push( map[element] );
          }else{
            console.error("Course doesn't seem to exist:" + element);
          }

        }else if( typeof(element) === 'object'){
          course_list = course_list.concat( prereqView._add_prereqs(element) );
        }

        return true;
      });

      return course_list;
    },

    add_course: function(prereqs){
      if( prereqs.subject === prereqView.focused_course.subject
          && prereqs.catalog_number === prereqView.focused_course.catalog_number
          && typeof(prereqs.prerequisites_parsed) === 'object'
      ){
        
        var course_list = prereqView._add_prereqs( prereqs.prerequisites_parsed );

        var content = Mustache.render(templates.display_reqs, { courses: course_list });

        $(prereqView.id + " #prereqs").html(content);
      }
    },

    update_nav: function(){
      if( this.path.length === 0 ){
        this.path.push( this.searchText );
        this.path.push( this.focused_course.subject + this.focused_course.catalog_number );
      }

      var content = Mustache.render(templates.display_nav, { path: this.path });

      $(this.id + " #nav").html(content);
    },
    
    nav_prereq: function(course_code){

      if(course_code === "Search"){
        prereqView.path = [];
        model.state(states.search);
        return;
      }

      // go backwards through the path to find the course code.

      var index = this.path.indexOf(course_code);

      if( index < 0 ){
        console.error("nav_prereq: couldn't find course: " + course_code);
        return;
      }

      // +1 because we want to go to that course
      this.path = this.path.slice(0, index+1);

      var map = model.course_map();
      var course_code = this.path[ this.path.length - 1];

      model.selected_course( map[course_code] );

      this.update_nav();
    },

    prereq_clicked: function(course_code){

      var map = model.course_map();

      if( typeof(map[course_code]) !== 'undefined' ){
        // update nav path
        this.path.push(course_code);
        model.selected_course( map[course_code] );
      }
    },

    display_context: function(){
      return {
        focused: this.focused_course
        ,
      };
    },

    load_data: function(course){

      if(typeof(course) === 'undefined'){
        course = this.focused_course;
      }

      var course_code = course.subject + course.catalog_number;

      model.load_prereqs(course, this.add_course);
    },

    show: function(){
      var contents = Mustache.render(templates.display, this.display_context());

      $(htmlid).html(contents);

      this.load_data(this.focused_course);
    }
  };

  var loadingView = {

    id: htmlid + " #search_loading",

    template: [
      "<div id='search_loading'>"
      , "<div id='loading_message' />"
      , "<div class='progress progress-striped'>"
      ,   "<div class='progress-bar progress-bar-info' />"
      , "</div>"
      , "<p>Oops, doesn't look like we have all of the UW course data yet...</p>"
      ,"</div>"
    ].join('\n'),

    show: function(){
      $(htmlid).html(this.template);
    },

    progress: function(){

      var loaded = model.loaded_subjects().length + 1;
      var total = model.subjects().length + 1;

      $(this.id + " #loading_message").html("<p>Loading (" + loaded + "/" + total + ")</p>");
      var percent = 100.0*loaded/total;
      $(this.id + " .progress-bar").css('width', percent + "%");
    },

    updateView: function(msg, newValue){

      this.progress();

      if( newValue === states.init ){
        // show or keep showing this.
        this.show();

      }else{
        // hide this.
        // $(this.id).remove();
      }
    },

    init: function(){
      this.show();
    }
  };

  var searchView = {

    id: htmlid + ' #search_search',

    typeaheadRegex : /^courses/,

    // convert a single course response from api.uw.ca/v2/courses/...
    // into a datum for twitter typeahead.js

    // remember that a datum has atleast:
    // { value: string, tokens: [string] }
    convertToDatum: function(course, index, array){

      // displayed in auto complete bar
      course.value = course.title;
      
      // things that are indexed for search
      var tokens = [];
      tokens.push( course.subject );
      tokens.push( course.catalog_number.toString() );
      tokens.push( course.subject + course.catalog_number );
      tokens = tokens.concat( course.title.split(/[\s-&:,]+/) );

      if(options.include_description){
        tokens = tokens.concat( course.description.split(" ") );
      }

      course.tokens = tokens;

      return true;
    },

    // convert the list of subjects we scrapped from
    // api.uwaterloo.ca/.../subjects into stuff for
    // twitter typeahead.js
    convertToTypeAhead: function(course_list){
      course_list.every(this.convertToDatum);
      return {
        name: "courses"
        , local: course_list
        , template: templates.search_typeahead
        , engine: mustache_typeahead
      };
    },

    update_typeahead: function(){

      console.debug("Updating typeahead");

      var courses = model.courses();

      var data = this.convertToTypeAhead(courses);

      $(this.id + " .typeahead").typeahead(data);

      $(this.id + " .typeahead").on("typeahead:selected", this.on_select);
    },

    updateView: function(msg){

      if( /state/.test(msg) && model.state() === states.search ){
        var frame = Mustache.render(templates.search);
      
        $(htmlid).html(frame);

        this.update_typeahead();
      }

      // they updated all courses, 
      if(
          /^all_courses/.test(msg)
          || ( options.update_typeahead_on_partial
            && this.typeaheadRegex.test(msg) )
      ){
        this.update_typeahead();
      }
    },

    on_select: function(event, item, dataset){
      model.selected_course(item);
      model.state(states.selected);
    },

    init: function(){
      console.log("initializing search view");
      // nothing to do.
    }
  };

  var init = function(){
    initCount--;
    if(initCount != 0){
      return; // don't do init.
    }

    model.init();

    loadingView.init();
    searchView.init();
    prereqView.init();

    model.addView(loadingView);
    model.addView(searchView);
    model.addView(prereqView);

    model.updateViews("state");
  }

  var debug = function(){
    // export a few things for testing:
    register_external("api_call", uw_api_call);
    register_external("reset", function(){
      model._clear_data();
    });

    search_app.model = model;
    search_app.search = searchView;
    search_app.prereq = prereqView;
    search_app.loading = loadingView;
  };

  var on_start = function(){
    // Initialization
    console.log("Initializing search(" + userid + ", " + htmlid + ")");

    loadLib("jquery.storage.min.js");
    loadLib("typeahead.min.js");
    
    loadTemplates();
  }

  loadingView.init();

  // this gets called exactly once.
  on_start();

  debug();
}