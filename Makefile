serve: tup
	jekyll --server --auto --base-url '' 

tup : 
	tup upd

.PHONY : tup
.PHONY : serve

