jekyll: tup
	jekyll serve --verbose --baseurl '' --watch --trace --incremental

tup : 
	tup

serve: jekyll
	cd _site ; python -m "SimpleHTTPServer" 4000

.PHONY : tup serve jekyll

