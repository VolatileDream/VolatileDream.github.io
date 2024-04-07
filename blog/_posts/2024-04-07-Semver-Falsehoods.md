---
layout: blog-post
tags: ["software","semver"]
editors: [lenny, ]
title: "SemVer Falsehoods"
hours: { research: 1.5, writing: 2, editing: 2 }
---

Programmers have a
[lot of beliefs that are mismatched with reality][falsehoods]. You'd think that
we wouldn't do it to ourselves, and generally build a solid foundation for each
other, but no: even [SemVer] suffers from this.

So let's talk about [SemVer] falsehoods:

  * A public API will never have contradicting requirements with SemVer.[^1]
  * Everyone agrees on the public API if it isn't explicitly specified.[^2]
  * Tooling won't add things to your public API by "accident".[^6]
  * You will catch incompatible changes when reviewing code.[^5]
  * Tooling will catch incompatible changes.[^8]
  * It will be easy to upgrade to a new major version.[^3]
  * Every minor version will get fixes back-ported to them.[^4]
  * Maybe not every minor version, but every major version will get fixes
    back-ported.[^4]
  * Maybe not every major version, but at least the last two?[^4]
  * Anything that claims SemVer is using version X.[^7]

---

[^1]:
    This can happen if "be secure" is an expectation of your tool, and fixing a
    vulnerability requires breaking compatibility. Ex: removing an insecure
    primitive, or changing cryptography requirements. Like attempting to
    version TLS, or upgrade a hashing algorithm.

    > But we have cryptographic agility.

    You say.

    > TLS [downgrade attack].

    I say.

[^2]:
    This is why the [spec](https://semver.org/#spec-item-1) says you MUST
    declare a public API, because it's so easy to misunderstand what the public
    API of a particular piece of software covers when it's not explicitly
    communicated. Is it everything that's publicly available, or some subset?
    Declare it.
    
    Folks depending on Python's `cryptography` got
    [a rude awakening][lwn-py-crypto] when they disagreed with the maintainers
    about the build chain being part of the API. That's not the end of it,
    because [Hyrum's law][hyrum-law] says that any change that you make to
    observable behaviour will break someone!
    [XKCD 1172](https://xkcd.com/1172/)

[^3]:
    No, of course it isn't. There's a long list of incompatible changes that
    developers want to make that has grown month by month since the last major
    version bump. And of course releasing them all at once is the best strategy
    that SemVer gives you, technically and [culturally][semver-culture]. For
    example: there were lots of changes between
    [Python2 and Python3][python3-whats-new], and some were much more
    difficult to manage than others (str/bytes). Had they all been spread out
    over many more version changes (python 3, 4, 5, maybe even 6) it would have
    been much easier to manage each successive set of breaking changes.

    We don't deploy software all at once, so why would we version it that way?

[^4]:
    Unless you're paying for support, who knows if the maintainers have time to
    back-port fixes at all. [XKCD 2347](https://xkcd.com/2347/)

[^5]:
    Not always... There's a plethora of ways to make an incompatible change
    that seem inocuous. Including ones that strictly add new functionality: oh
    no, you broke people's tests because their test mock didn't implement your
    new functionality properly. But wait, is that covered by their API[^2]?

[^8]:
    Tooling is getting better here, so it may be possible to notice
    incompatible API definitions. But [Hyrum][hyrum-law] says that everything
    is in scope, even list sorting and the other things your tools don't yet
    automatically detect.

[^6]:
    Who is right when tools automatically add extra functionality that you
    don't want to promise as part of your API? Like when Rust automatically
    [derives `Send` and `Sync`][rust-sync-send-semver] for your public types?

[^7]:
    There's two major versions of [SemVer] and the spec provides no way to
    differentiate between them. Who knows if you're getting version 1.0.0 or
    version 2.0.0, or another later major version?

[falsehoods]: https://github.com/kdeldycke/awesome-falsehood
[semver]: https://semver.org/
[semver-culture]: https://semver.org/#if-even-the-tiniest-backward-incompatible-changes-to-the-public-api-require-a-major-version-bump-wont-i-end-up-at-version-4200-very-rapidly
[version-semver]: https://github.com/semver/semver/issues/976
[downgrade attack]: https://en.wikipedia.org/wiki/Downgrade_attack
[lwn-py-crypto]: https://lwn.net/Articles/845535/
[python-crypto-versions]: https://cryptography.io/en/latest/api-stability/
{% comment %}
  Compatible with SemVer, but is actually X.0.Z, and they increment X on major feature release.

  On top of that they have a deprecation policy:
    * Release a feature at X.0.0.
    * Notice at Y.0.0 and (Y+1).0.0 for looming change.
    * Change lands in (Y+2).0.0

  This is post 35.0.0 version policy. Pre 35.0.0 was using something like [haskell-version-policy].

{% endcomment %}
[hyrum-law]: https://www.hyrumslaw.com/
{% comment %}
> With a sufficient number of users of an API,
> it does not matter what you promise in the contract:
> all observable behaviors of your system
> will be depended on by somebody.
{% endcomment %}
[python3-whats-new]: https://docs.python.org/3/whatsnew/3.0.html
{% comment %}
 Lots of breaking changes:
 * print statement -> print function
 * dict methods return views, not lists
 * dict removed iterX methods
 * map, filter, & zip return iterators (lazy eval) instead of list
 * change to range, removal of xrange
 * Ordering operators (<, <=, >, >=) now return TypeError on mismatch types
 * sorting functions (builtins.sort, list.sort) use Key param, not Cmp fn.
 * __cmp__ removed, __lt__ used in it's place.
 * Non-truncating division (/) now returns floats for integer inputs.
 * sys.maxint removed
 * repr(long-integer) no longer appends "L" at the end
 * Octal representation changed leading string to "0o" from "0" 
 * str / bytes changes (so much stuff).
 Changed syntax:
 * "as", "with", "True", "False", "None" are reserved words.
 * Exception handling now "except Type as Var"
 * MetaClass changes
 * List comprehensions no longer an exception to "for x in y" syntax.
 * elipsis (...) now an atomic expression for use anywhere.
 Removed syntax:
 * Tuple unpacking in function calls.
 * Removed backtics, use repr.
 * Removed <> use !=.
 * Removed exec keyword, now a function.
 * Integers no long allow trailing "l" or "L".
 * String literals no longer allow leading "u" or "U".
 * "from Module import" no longer allowed in functions.
 * All imports are now absolute, except for "from .Module import".
 And more...
{% endcomment %}
[rust-sync-send-semver]: https://predr.ag/blog/toward-fearless-cargo-update/#breaking-semver-with-auto-traits
{% comment %}
Auto-implementing Sync & Send can set you up for SemVer violations if people
think it's part of your __public__ api. Another case where there's a difference
between what's available and what's covered by SemVer.
{% endcomment %}
