---
layout: blog-post
tags: [ 'openpgp', 'crypto' ]
subtitle: Key Change
---

Effective immediately my OpenPGP key with fingerprint ["90C8 42FD 7D8E F1CA 25C7  63E2 6214 22E5 9C9F 9B75"][2] is revoked, and superseded with ["0D94 1BE2 A285 8FA0 0F34  BF4F 95BB 8B37 AD88 0C27"][3]. Since there aren't any signatures on the key, this is only a key management faux-pas.

According to a [blog entry by dkg at debian-administration.org][1], key comments aren't the greatest idea. The key change takes this, and some other minor key hygiene things into account.

[Revocation proof.][2]

[1]: https://www.debian-administration.org/users/dkg/weblog/97
[2]: {{site.baseurl}}/static/revoked-key.asc
[3]: {{site.baseurl}}/static/public-key.asc
