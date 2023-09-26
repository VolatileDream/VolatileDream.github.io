---
layout: blog-post
tags: ["software","postel","protocols","compatibility"]
editors: []
title: "Postel was Wrong"
hours: { research: 1, writing: 1, editing: 0 }
---

[Jon Postel][postel] in an early [TCP specification][rfc-761]:
> TCP implementations should follow a general principle of robustness: be
> conservative in what you do, be liberal in what you accept from others.

But Postel was wrong. This doesn't make for good software.

Go read [RFC 9413] to understand why. And stop using the law as justification
for accepting garbage instead of requiring input to perfectly match a spec.

[postel]: https://en.wikipedia.org/wiki/Jon_Postel
[rfc-761]: https://datatracker.ietf.org/doc/html/rfc761
[RFC 9413]: https://datatracker.ietf.org/doc/html/rfc9413
[postel-law]: https://en.wikipedia.org/wiki/Robustness_principle
{%- comment -%}
> be conservative in what you do, be liberal in what you accept from others
or
> be conservative in what you send, be liberal in what you accept

In the context of ***TCP IP backwards & forwards compatibility!!!***

Not in the context of HTML horrors.

Not in the context of INI file parsing.

Strictly in the realm of protocol evolution and compatibility. eg: Protobuf
format does it really well! Also JSON encoding handles it well! HTML handles
it well for tags it doesn't understand, but then is garbage for ensuring the
actual structure of the document.
{%- endcomment -%}
