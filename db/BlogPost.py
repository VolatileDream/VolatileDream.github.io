
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base();

from sqlalchemy import Column, Integer, String, Sequence

class BlogPost(Base):

	__tablename__ = "blog_posts";

	id = Column(Integer, Sequence('blog_post_id_seq'), primary_key=True);
	name = Column(String);
	content = Column(String);

	def __init__(self, id, name, content):
		self.id = id;
		self.name = name;
		self.content = content;

	def __repr__(self):
		return "<BlogPost('%s','%s','%s)>" % (self.id, self.name, self.content);
