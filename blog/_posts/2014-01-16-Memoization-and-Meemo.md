---
layout: blog-post
tags: ["python", "std in/out", "command-line"]
---

[Meemo][1] is a tool I wrote a while ago to deduplicate standard input and/or output using custom delimiters.

While that sounds both complicated, and slightly confusing, let's look at some examples.

{% highlight bash %}
> # print abc, def and abc, on seperate lines
> echo -e "abc\ndef\nabc"
abc
def
abc
> # same thing, but with meemo
> echo -e "abc\ndef\nabc" | meemo
abc
def
> # notice that meemo stopped the output of the second abc
> echo -e "abc\ndef\nabc" | meemo
(no output)
>
{% endhighlight %}

There's a lot to take in here, so we'll break it down case by case. In the first example, we run `echo` and output to show that we're printing 3 items. After running it through [Meemo][1] we can see that we only get 2 items, that's because by default [Meemo][1] uses the newline character (`\n`) to delimit chunks that it should deduplicate. This is what [Meemo][1] sees: `"abc" DELIMITER "def" DELIMITER "abc" DELIMITER`. Then [Meemo][1] processes the input by printing out non-delimiters it hasn't seen before, and prints a delimiter after them. Which works out to be:

{% highlight bash %}
"abc" DELIMITER
"def" DELIMITER
{% endhighlight %}

In the third case, what happens? All of a sudden [Meemo][1] decided not to print anything out. The truth behind the matter, is that [Meemo][1] is a smarter tool than has been given credit so far. [Meemo][1] permanently remembers everything it sees unless told otherwise. [Meemo][1] does this by creating a local cache file of all the things it's seen before and storing it in `.meemo.cache` (by default).

This behaviour lets us run [Meemo][1] with part of the dataset today, and another part of it tomorrow. As part of caching the items it has already seen, [Meemo][1] can then output the cache later, optionally using a different delimiter.

#### Notes

[Meemo][1] is written for [python3][2], and is fairly untested. While it can be embeded into a python application to deduplicate it's io, that hasn't really been tested for input.


{% highlight bash %}
> ./meemo -h
usage: meemo [-h] [-f FILE] [-n] [-d DELIMITER] [-p]

memoize io

optional arguments:
  -h, --help            show this help message and exit
  -f FILE, --file FILE  the file to use as the cache
  -n, --nocache         bypass the cache, but populate it anyway
  -d DELIMITER, --delimiter DELIMITER
                        set the file delimiter
  -p, --print           print out the cache contents
{% endhighlight %}

[1]: https://github.com/VolatileDream/meemo
[2]: http://python.org