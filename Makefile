LESS="/home/jex/.npm/less/1.3.3/package/bin"
UGLIFY="/home/jex/.npm/uglify-js/1.3.4/package/bin"

REMOTE_ROOT='www/dev'

all : static/base.css static/base.js

app : all
	-rm *.pyc */*.pyc
	. venv/bin/activate && python app.py

deploy : all static/base.css static/base.js *py */*py
	-echo "cd $(REMOTE_ROOT); mkdir db pages static templates" | ssh glgambet@csclub.uwaterloo.ca
	echo "cd $(REMOTE_ROOT) \n put *py \n put db/* db/ \n put pages/* pages/ \n put static/* static/ \n put templates/* templates/ \n " | sftp -r glgambet@csclub.uwaterloo.ca
	ssh glgambet@csclub.uwaterloo.ca "cd $(REMOTE_ROOT) ; chmod o+rx -R * ;"

static/base.css : css/*.less
	nodejs $(LESS)/lessc css/style.less > static/base.css

static/base.js : static/js/bootstrap.js static/js/jquery.js
	cat static/js/jquery.js static/js/bootstrap.js > /tmp/tmp.js
	nodejs $(UGLIFY)/uglifyjs /tmp/tmp.js > static/base.js
	-rm /tmp/tmp.js

clean :
	-rm static/base* *.pyc */*.pyc

.PHONY : all
.PHONY : deploy
.PHONY : clean

