import jinja2

nav_data = [];

def nav_register( name, location, icon ):
	data = {};
	data['name'] = name;
	data['location'] = location;
	data['id'] = 'nav-location-' + location;
	data['icon'] = icon
	nav_data.append( data );


def get_base_data():
	data = {};
	data['nav_tabs'] = nav_data;
	data['motto'] = "non sum qualis eram";
	data['mottoLink'] = "http://translate.google.com/?hl=en&tab=wT#la/en/non%20sum%20qualis%20eram";
	return data;


nav_register( 'About', 'about', 'icon-user' );
nav_register( 'Blog', 'blog', 'icon-list' );
nav_register( 'Contact', 'contact', 'icon-envelope' );
nav_register( 'Resume', 'resume', 'icon-file' );