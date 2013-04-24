import navbar
from flask import Blueprint, render_template
import json

data = {};

about_page = Blueprint('about', __name__);

def get_data():
	return data;

@about_page.route('/')
@about_page.route('/about/')
@about_page.route('/about')
def html_url():
	merged_data = navbar.get_base_data();
	merged_data.update( get_data() )
	return render_template("about.html", **merged_data);

# last updated time
data['last_updated'] = "2013-04-22";

# things that this was built with
data['built_with'] = [
	{ "title":"LESS", "site":"http://lesscss.org", "description":"A dynamic style sheet language" }
	,{ "title":"jQuery", "site":"http://jQuery.com", "description":"Multipurpose JavaScript library" }
	,{ "title":"nicEdit", "site":"http://nicedit.com/", "description":"A minimal WYSIWYG HTML editor"}
	,{ "title":"Flask", "site":"http://flask.pocoo.org/", "description":"An http micro framework for Python"}
	,{ "title":"Jinja", "site":"http://jinja.pocoo.org/docs/", "description":"Full featured template engine for Python"}
	,{ "title":"SQLAlchemy", "site":"http://www.sqlalchemy.org/", "description":"SQL database toolkit for Python"}
	,{ "title":"timeago", "site":"http://timeago.yarp.com/", "description":"Fuzzy time stamp library for JavaScript" }
	,{ "title":"glyphicons", "site":"http://glyphicons.com/", "description":"library of simple monochromatic icons" }
	,{ "title":"Bootstrap", "site":"http://getbootstrap.com", "description":"Front end framework for web development" }
];

# short biography
data['shortbio'] = "Gianni Gambetti is a software developer, student, geek, anthropomorphiser of computers and privacy enthusiast.";

# long biography version
data['fullbio'] = """Gianni Gambetti is a software developer, that prefers to work with back end systems and has a strong interest in artificial intelligence and distributed systems. He's also currently studying for a Bachelor of Computer Science at the University of Waterloo, which he is currently calling home. Every four months he likes a change of pace and switches between studying and doing an internship through the Co-op program at UWaterloo.\nHe's a self proclaimed geek, who enjoys playing Dungeons and Dragons, as well as reading science fiction and fantasy novels."""

