.PHONY: jekyll
jekyll:
	jekyll serve --verbose --baseurl '' --watch --trace --incremental --drafts

.PHONY: build
build:
	jekyll build --verbose --baseurl '' --trace --drafts

.PHONY: serve
serve: build
	cd _site ; python3 -m http.server --bind 127.0.0.1 4000

.PHONY: clean
clean:
	if [ -d _site ]; then rm -r _site/ ; fi

