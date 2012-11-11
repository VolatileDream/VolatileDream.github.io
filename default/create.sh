#!/bin/bash

function usage(){
	echo -e "Usage: create.sh <name>" ;
	echo -e "\tname can not contain anything other than alpha numeric characters" ;
}

function validate(){
	echo "$1" | grep -E '[^a-zA-Z0-9]'
	if [[ $? -ne 1 ]]; then
		usage
		exit 2
	fi
}

function create(){
	name="$(echo "$1" | tr '[:upper:]' '[:lower:]')";
	Name="$(echo "${name:0:1}" | tr '[:lower:]' '[:upper:]' )${name:1}";

	replaceName ".html" "template/${name}.html"
	replaceName ".less" "css/${name}.less"
	replaceName "Controller.js" "js/ctrlr/${Name}Controller.js"
	replaceName "View.js" "js/view/${Name}View.js"
	replaceName "Data.json" "js/data/${name}.json"
}
function replaceName() {
	cat "default/template${1}" |
		sed "s_\$name_${name}_g" |
		sed "s_\$Name_${Name}_g" > "$2"
}

if [[ "$#" -ne "1" ]]; then
	usage ;
	exit 1;
fi

validate "$1"

create "$1"