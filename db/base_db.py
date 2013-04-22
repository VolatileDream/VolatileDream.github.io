from Config import config

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine( config['db.location'], echo=True );

import BlogPost

BlogPost.Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine);
