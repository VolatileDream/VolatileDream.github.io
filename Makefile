LESS="/home/jex/.npm/less/1.3.3/package/bin"
UGLIFY="/home/jex/.npm/uglify-js/1.3.4/package/bin"

all : static/base.css static/base.js

app : all
	-rm *.pyc */*.pyc
	python app.py

deploy : all static/base.css static/base.js *py
	echo "cd www/dev \n put *py \n put .htaccess \n put lib/ \n put built/ \n put templates/" | sftp -r glgambet@csclub.uwaterloo.ca
	ssh glgambet@csclub.uwaterloo.ca "cd www/dev ; chmod o+rx -R * ;"

static/base.css : css/*.less
	nodejs $(LESS)/lessc css/style.less > static/base.css

static/base.js : js/bootstrap.js js/jquery.js
	cat js/jquery.js js/bootstrap.js > /tmp/tmp.js
	nodejs $(UGLIFY)/uglifyjs /tmp/tmp.js > static/base.js

clean :
	-rm static/base* *.pyc */*.pyc

.PHONY : all
.PHONY : deploy
.PHONY : clean

