jekyll:
	jekyll serve --verbose --baseurl '' --watch --trace --incremental --drafts

serve: jekyll
	cd _site ; python -m "SimpleHTTPServer" 4000

clean:
	if [ -d _site ]; then rm -r _site/ ; fi

.PHONY : serve jekyll

