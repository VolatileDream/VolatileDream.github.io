import navbar
from flask import Blueprint, render_template
import json

data = {};

contact_page = Blueprint('contact', __name__);

@contact_page.route('/contact/')
@contact_page.route('/contact')
def html_url():
	page_data = navbar.get_base_data();
	page_data.update( data );
	return render_template("contact.html", **page_data);

data['contacts'] = [
	{
		"logo":{
			"url":"https://ssl.gstatic.com/images/icons/gplus-64.png",
			"width":"64px",
			"height":"64px"
		},
		"tagline":"on Google+",
		"link":"https://plus.google.com/113067837896503448428"
	},
	{
		"logo": {
			"url":"https://twitter.com/images/resources/twitter-bird-light-bgs.png",
			"width":"64px",
			"height":"64px"
		},
		"tagline":"@volatiledream on Twitter",
		"link":"https://twitter.com/volatiledream"
	},
	{
		"logo": {
			"url":"https://developer.linkedin.com/sites/default/files/LinkedIn_Logo60px.png",
			"width":"64px",
			"height":"100%"
		},
		"tagline":"on Linkedin",
		"link":"https://www.linkedin.com/in/giannigambetti"
	},
	{
		"logo": {
			"url":"/static/glyphicons/399_e-mail.png",
			"width":"60px",
			"height":"60px"
		},
		"tagline":"via email",
		"link":"mailto:glgambetti@csclub.uwaterloo.ca"
	},
	{
		"logo":{
			"url":"https://newsroom.fb.com/download-media/4406/2",
			"width":"64px",
			"height":"64px"
		},
		"tagline":"on facebook",
		"link":"https://facebook.com/gambetti"
	},
	{
		"logo":{
			"url":"//octodex.github.com/images/original.jpg",
			"width":"64px",
			"height":"64px"
		},
		"tagline":"on github",
		"link":"https://github.com/VolatileDream"
	}
];
