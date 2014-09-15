jekyll: tup
	jekyll --base-url '' 

tup : 
	tup

serve: jekyll
	cd _site ; python -m "SimpleHTTPServer" 4000

.PHONY : tup serve jekyll

