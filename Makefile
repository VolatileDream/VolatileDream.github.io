NPM_STORE=/home/jex/
LESS="$(NPM_STORE)/.npm/less/1.3.3/package/bin"
UGLIFY="$(NPM_STORE)/.npm/uglify-js/1.3.4/package/bin"

serve: all
	jekyll --server --auto --base-url '' 

all : static/base.css static/base.js

static/base.css : _css/*.less
	nodejs $(LESS)/lessc _css/style.less > static/base.css

static/base.js : _js/bootstrap.js _js/jquery.js
	cat _js/jquery.js _js/bootstrap.js > /tmp/tmp.js
	nodejs $(UGLIFY)/uglifyjs /tmp/tmp.js > static/base.js
	-rm /tmp/tmp.js

clean :
	-rm static/base*
	-rm _site/ -r

.PHONY : all
.PHONY : clean

