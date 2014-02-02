---
layout: blog-post
tags: [ "erlang", "reltool" ]
---

This is a collection of my notes on [Erlang][1] and [RelTool][2].

#### Starting Out

[Erlang Rebar Tutorial: Generating Releases and Upgrades][5] is a great article to introduces creating Erlang releases with [Rebar][6], and comes with an accompanying [github repository][7]. While the repository works fine for R14, some changes are required for running with Erlang versions past 14 (you can see them in [this commit][8]).

#### High Performance Erlang (HiPE)

The [HiPE module][3] for Erlang is built to attempt to speed up the erlang virtual machine by compiling part of the application and library code into native machine code. One of the issues with HiPE, is that there is currently a bug in HiPE that causes it to get compiled into standard Erlang even if flagged for exclusion. When flagged for exclusion RelTool has trouble generating correct node binaries, because you __must__ tell RelTool to exclude HiPE if you want your application to load correctly.

Add the following in your reltool.config: `{app, hipe, [ {incl_cond, exclude} ] }`. If rebar complains that `"Application hipe is used in release {your_app}  and cannot be excluded"` then either your application, or one of it's dependencies depends on HiPE, and you need to be using a version of Erlang that was compiled for HiPE support. 

A quick way to check if the version of Erlang you are using was compiled with HiPE support is to run the following in the Erlang shell: `c("path/to/source/file.erl", [native]).`. Without HiPE support Erlang will warn you that it doesn't have HiPE support.

Additional note: I've been able to find an [issue report][4].

This post will receive additional updates as I progress with [Erlang][1] and [RelTool][2].

[1]: http://www.erlang.org/
[2]: http://www.erlang.org/doc/man/reltool.html
[3]: http://www.erlang.org/doc/man/HiPE_app.html 
[4]: http://erlang.org/pipermail/erlang-questions/2013-September/075509.html
[5]: http://www.metabrew.com/article/erlang-rebar-tutorial-generating-releases-upgrades
[6]: https://github.com/rebar/rebar/
[7]: https://github.com/RJ/erlang_rebar_example_project/
[8]: https://github.com/mswimmer/erlang_rebar_example_project/commit/v1
