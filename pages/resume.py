import www_site
from flask import Blueprint, render_template
import json

data = {};

resume_page = Blueprint('resume', __name__);

@resume_page.route('/api/resume')
@resume_page.route('/api/resume/')
def json_url():
	return json.dumps(data);


@resume_page.route('/resume/')
@resume_page.route('/resume')
def html_url():
	page_data = www_site.get_base_data();
	page_data.update( data );
	return render_template("resume.html", **page_data);


data['resume_sections'] = [
	{
		"title":"Internships",
		"elements":[
			{
				"title":"Bazaarvoice",
				"position":"Mobile Software Developer",
				"url":"//bazaarvoice.com",
				"start":"2012-09",
				"end":"2012-12",
				"points":[
					"Worked with Connections team to develop client configuration service",
					"Trivially scaled to 100 requests per second",
					"Written in Python using Flask and Memcached",
					"Worked with Hadoop and Hive to measure unique traffic on peak days (black friday and cyber monday)"
				]
			},
			{
				"title":"Desire2Learn",
				"position":"Mobile Software Developer",
				"url":"//desire2learn.com",
				"start":"2012-01",
				"end":"2012-05",
				"points":[
					"Developed for Android",
					"Primary developer on Grades integration module in Campus Life",
					"Developed in house Android web request caching solution"
				]
			},
			{
				"title":"Desire2Learn",
				"position":"Software Developer",
				"url":"//desire2learn.com",
				"start":"2011-05",
				"end":"2011-11",
				"points":[
					"Refactored and improved Assignment Submission System middle layer",
					"Refactoring was required for Public facing API layer being developed"
				]
			},
			{
				"title":"Precidia Technologies",
				"position":"ePayments Productivity Student",
				"url":"http://precidia.com/",
				"start":"2010-06",
				"end":"2010-09",
				"points":[
					"Design and creation of test plan for eCommerce site",
					"Organizational improvements to customer facing wiki for product setup"
				]
			}
		]
	},
	{
		"title":"Education",
		"elements":[
			{
				"title":"University of Waterloo",
				"position":"Bachelor of Computer Science",
				"url":"//uwaterloo.ca",
				"start":"2010-09",
				"end":"2015 (expected)",
				"points":[
					"Orientation leader (Black Tie) 2011",
					"Orientation leader (Head Black Tie) 2012",
					"Orientation leader (Tie Guard) 2013",
					"Contributing writer to MathNews (Math Faculty student paper)"
				]
			},
			{
				"title":"Earl of March SS.",
				"position":"High School Diploma",
				"url":"http://www.earlofmarch.com",
				"start":"2006-09",
				"end":"2010-06",
				"points":[ "Member of the Ultimate Team", "Junior Band ( 2 years )" ]
			}
		]
	}
];
