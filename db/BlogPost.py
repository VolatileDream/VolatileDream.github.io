
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base();

from sqlalchemy import Column, Integer, String, Sequence, DateTime

import datetime

class BlogPost(Base):

	__tablename__ = "blog_posts";

	id = Column(Integer, Sequence('blog_post_id_seq'), primary_key=True);
	title = Column("title", String);
	content = Column("content", String);
	updated = Column("updated", DateTime, default=datetime.datetime.utcnow);

	def __init__(self, id, title, content):
		self.id = id;
		self.title = title;
		self.content = content;
		self.updated = datetime.datetime.utcnow();

	def __repr__(self):
		return "<BlogPost('%s','%s','%s','%s')>" % (self.id, self.title, self.content, self.updated);
