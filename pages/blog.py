import navbar
from flask import Blueprint, render_template, request, redirect, abort
import json

from Config import config

from sqlalchemy.sql.expression import desc

from db.base_db import engine, Session
from db.BlogPost import BlogPost

blog_page = Blueprint('blog', __name__);

def get_post_list():
	session = Session();
	try:
		query = session.query(BlogPost, BlogPost.id, BlogPost.title);
		ordered_query = query.order_by(BlogPost.id.desc());
		posts = ordered_query.all();
	finally:
		session.close();

	return posts

def get_post(post_id=None):
	session = Session();
	try:
		if post_id is None:
			# get the most recent by id
			query = session.query(BlogPost).order_by(BlogPost.id.desc());
		else:
			# get the specific id
			query = session.query(BlogPost).filter_by(id=post_id);
		post = query.first()
	finally:
		session.close();
	
	return post;

def get_page_data(post_id):
	data = {}
	data['post_list'] = get_post_list();
	data['post'] = get_post(post_id) or { "id": "err", "title": "Oops...", "content":"Looks like we couldn't find the post you're looking for." };

	return data;

@blog_page.route('/blog/')
@blog_page.route('/blog')
@blog_page.route('/blog/<int:post_id>')
def show_post(post_id=None):
	page_data = navbar.get_base_data();
	page_data.update( get_page_data(post_id) );
	return render_template("blog.html", **page_data);

@blog_page.route('/blog/new')
@blog_page.route('/blog/<int:post_id>/edit')
def edit_post(post_id=None):

	if not config['EDIT']:
		abort(404)

	page_data = get_page_data(post_id);
	if post_id is None:
		page_data['post'] = {};
	else:
		page_data['post'] = get_post(post_id);
	
	return render_template("blog-edit.html", **page_data)


@blog_page.route('/blog/save/', methods=['POST'])
@blog_page.route('/blog/save/<int:post_id>', methods=['POST'])
def save_post(post_id=None):

	if not config['EDIT']:
		abort(404)

	session = Session();
	try:
		# if post_id is None: sqlalchemy auto sets the primary id
		post = BlogPost( post_id, request.form['title'], request.form['content'] )

		session.add( post )

		session.commit()
	finally:
		session.close();
	
	return redirect("/blog/%s" % (post_id or "") )
