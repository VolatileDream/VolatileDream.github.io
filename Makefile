LESS="/home/jex/.npm/less/1.3.3/package/bin"
UGLIFY="/home/jex/.npm/uglify-js/1.3.4/package/bin"

all : built/base.css built/base.js

deploy : all built/base.css built/base.js *py
	echo "cd www/dev \n put *py \n put .htaccess \n put lib/ \n put built/ \n put templates/" | sftp -r glgambet@csclub.uwaterloo.ca
	ssh glgambet@csclub.uwaterloo.ca "cd www/dev ; chmod o+rx -R * ;"

built/base.css : css/*.less
	nodejs $(LESS)/lessc css/style.less > built/base.css

built/base.js : js/bootstrap.js js/jquery.js
	cat js/jquery.js js/bootstrap.js > /tmp/tmp.js
	nodejs $(UGLIFY)/uglifyjs /tmp/tmp.js > built/base.js

clean :
	-rm built/base* *.pyc

.PHONY : all
.PHONY : deploy
.PHONY : clean

