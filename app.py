#!/usr/bin/env python

from Config import config
from flask import Flask, render_template, redirect, url_for

# blueprints
from pages.about import about_page
from pages.blog import blog_page
from pages.contact import contact_page
from pages.resume import resume_page

# build app
app = Flask( __name__ );

# load config
app.config.from_object(config)

app.debug = True;

# register blueprints
app.register_blueprint(about_page);
app.register_blueprint(blog_page);
app.register_blueprint(contact_page);
app.register_blueprint(resume_page);

if __name__ == "__main__":
	app.run();
