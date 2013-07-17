LESS="/home/jex/.npm/less/1.3.3/package/bin"
UGLIFY="/home/jex/.npm/uglify-js/1.3.4/package/bin"

REMOTE_ROOT='www/dev'

app : all
	cd build ; python -m SimpleHTTPServer 8080

all : static/base.css static/base.js build

deploy : all
	-echo "cd $(REMOTE_ROOT); mkdir db pages static templates" | ssh glgambet@csclub.uwaterloo.ca
	echo "cd $(REMOTE_ROOT) \n put *py \n put db/* db/ \n put pages/* pages/ \n put static/* static/ \n put templates/* templates/ \n " | sftp -r glgambet@csclub.uwaterloo.ca
	ssh glgambet@csclub.uwaterloo.ca "cd $(REMOTE_ROOT) ; chmod o+rx -R * ;"

build : *html */*html */*/*html
	jekyll build

static/base.css : _css/*.less
	nodejs $(LESS)/lessc _css/style.less > static/base.css

static/base.js : _js/bootstrap.js _js/jquery.js
	cat _js/jquery.js _js/bootstrap.js > /tmp/tmp.js
	nodejs $(UGLIFY)/uglifyjs /tmp/tmp.js > static/base.js
	-rm /tmp/tmp.js

clean :
	-rm static/base*
	-rm build/ -r

.PHONY : all
.PHONY : deploy
.PHONY : clean

