serve: all
	jekyll --server --auto --base-url '' 

all : 
	tup upd

.PHONY : all
.PHONY : serve

