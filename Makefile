LESS="/home/jex/.npm/less/1.3.3/package/bin"
UGLIFY="/home/jex/.npm/uglify-js/1.3.4/package/bin"

all : css/style.css lib/base.js

deploy : all css/style.css lib/base.js *py
	echo "cd www/dev \n put *py \n put lib/ \n put css/ \n put templates/" | sftp -r glgambet@csclub.uwaterloo.ca
	ssh glgambet@csclub.uwaterloo.ca "cd www/dev ; chmod o+rx -R * ;"

css/style.css : css/*.less
	nodejs $(LESS)/lessc css/style.less > css/style.css

lib/base.js : lib/bootstrap.js lib/jquery.js
	nodejs $(UGLIFY)/uglifyjs lib/jquery.js lib/bootstrap.js > lib/base.js

clean :
	-rm css/style.css lib/base.js *.pyc

.PHONY : all
.PHONY : deploy
.PHONY : clean

