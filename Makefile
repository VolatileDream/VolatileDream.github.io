jekyll:
	jekyll serve --verbose --baseurl '' --watch --trace --incremental --drafts

serve: jekyll
	cd _site ; python -m "SimpleHTTPServer" 4000

.PHONY : serve jekyll

