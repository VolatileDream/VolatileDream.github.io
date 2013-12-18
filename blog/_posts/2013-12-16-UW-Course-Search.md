---
layout: blog-post
tags: []
title: "UW Course Search"
---

{% for post in site.posts %}
	{% if post.title == "OS 161 Retrospective" %}
		{% assign os_post = post %}
	{% endif %}
{% endfor %}


On top of building parts of an [operating systems kernel][2] as part of my [Operating Systems][3] course during my past term at the [University of Waterloo][4], I also took a course on [User Interfaces][5]. As part of the course we designed the user interfaces for various applications to learn about UI design principles.

So, as part of the course we had to design and implement an html widget. The widget needed to fetch data using ajax and display it, and then allow for some sort of manipulation of that data. For the task I decided to look at some of the things that students need to do every term, I ended up creating a course search application, that allows users to search through their courses, and browse related courses. It's nothing terribly fancy, and a little rough around the edges. 

But here it is: [UW Course Search][1].


[1]: {{site.baseurl}}/apps/search/ "Search App"
[2]: {{os_post.url}}
[3]: https://www.student.cs.uwaterloo.ca/~cs350/ "CS350 - Operating Systems"
[4]: {{site.baseurl}}/resume/#uw
[5]: https://www.student.cs.uwaterloo.ca/~cs349/ "CS349 - User Interfaces"
