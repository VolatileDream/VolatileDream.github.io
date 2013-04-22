import www_site
from flask import Blueprint, render_template
import json

from db.base_db import engine, Session
from db.BlogPost import BlogPost

blog_page = Blueprint('blog', __name__);

def get_post_list():
	session = Session();
	try:
		query = session.query(BlogPost, BlogPost.id, BlogPost.name);
		posts = query.all();
	finally:
		session.close();

	return posts

def get_most_recent_post():
	pass

def get_post(post_id):
	pass

def get_page_data(post_id):
	post_list = get_post_list();
	
	post = None;
	
	if post_id is None:
		post = get_most_recent_post();
	else:
		post = get_post(post_id)
	
	data = {};
	data['post_list'] = post_list;
	data['post'] = post;
	return data;

@blog_page.route('/api/blog')
@blog_page.route('/api/blog/<int:post_id>')
def json_url(post_id=None):
	return json.dumps(get_page_data(post_id));


@blog_page.route('/blog')
@blog_page.route('/blog/<int:post_id>')
def html_url(post_id=None):
	page_data = www_site.get_base_data();
	page_data.update( get_page_data(post_id) );
	return render_template("blog.html", **page_data);

