#!/bin/bash

function usage(){
	echo "deploy.sh <host>"
	echo "<host> the host to deploy to"
}

function doSpellCheck(){
	path='js/data/'
	if [[ -e ./build ]]; then
		path="./${path}"
	else
		path="../${path}"
	fi

	for file in ${path}* ; do
		aspell -l 'en_CA' -c "$file"
	done
}

function doDeploy(){

	host="$1";

	doSpellCheck ;

	file=`mktemp`
	echo 'cd www' > "$file"

	if [[ -e ./build ]]; then
		cat ./build/batch.put.sftp >> "$file"
	else
		echo 'lcd ..' >> "$file"
		cat ./batch.put.sftp >> "$file"
	fi

	sftp -b "$file" "$host"

	ssh "$host" "cd www; find . -exec chmod o+rx \{\} \;"

}

if [[ $# -lt 1 ]]; then
	usage
	exit 1
fi

doDeploy "$1"