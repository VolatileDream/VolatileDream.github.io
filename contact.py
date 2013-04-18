#!/usr/bin/python

import www_site as site

data = site.get_base_data();

data['contacts'] = [
	{
		"logo":{
			"url":"//ssl.gstatic.com/images/icons/gplus-64.png",
			"width":"64px",
			"height":"64px"
		},
		"tagline":"on Google+",
		"link":"//plus.google.com/113067837896503448428"
	},
	{
		"logo": {
			"url":"//twitter.com/images/resources/twitter-bird-light-bgs.png",
			"width":"64px",
			"height":"64px"
		},
		"tagline":"@volatiledream on Twitter",
		"link":"//twitter.com/volatiledream"
	},
	{
		"logo": {
			"url":"//developer.linkedin.com/sites/default/files/LinkedIn_Logo60px.png",
			"width":"64px",
			"height":"100%"
		},
		"tagline":"on Linkedin",
		"link":"//www.linkedin.com/in/giannigambetti"
	},
	{
		"logo": {
			"url":"css/lib/glyphicons/399_e-mail.png",
			"width":"60px",
			"height":"60px"
		},
		"tagline":"via email",
		"link":"mailto:glgambetti@csclub.uwaterloo.ca"
	},
	{
		"logo":{
			"url":"//newsroom.fb.com/download-media/265/1",
			"width":"64px",
			"height":"64px"
		},
		"tagline":"on facebook",
		"link":"//facebook.com/gambetti"
	},
	{
		"logo":{
			"url":"//octodex.github.com/images/original.jpg",
			"width":"64px",
			"height":"64px"
		},
		"tagline":"on github",
		"link":"//github.com/jex"
	}
];

site.output_page( 'contact', data );