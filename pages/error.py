import navbar
from flask import Blueprint, render_template, url_for
import json

error_page = Blueprint('error', __name__);

@error_page.app_errorhandler(404)
def not_found(e):
	page_data = navbar.get_base_data();
	return render_template('error.html', **page_data), 404
