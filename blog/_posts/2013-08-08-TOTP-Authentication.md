---
layout: blog-post
tags: ['crypto', 'security']
---

With companies like [Google][2], [Dropbox][3] and [Amazon][4] adopting [TOTP][1], it would be a good idea to understand what it is, and how it works.

#### OTP

First a quick introduction to the [One Time Pad][5] on which TOTP is based. A One Time Pad is a large sequence of random numbers used to encrypt communications between two parties, it also comes with some heavy restrictions on its usage.

* The sequence of numbers must be [truely random][6]
* The sequence must be kept secret between the communicating parties
* The sequence must be at least as long as all the messages ever exchanged.
* No sequence reuse in whole or in part

On the upside OTP is [information theory secure][7], which means that if applied correctly it is proveably unbreakable. However the list of restrictions on it's usage often make it impractical to use. Reducing the size of the list is one of the primary benefits of TOTP, although it comes with some security reduction.

#### TOTP

TOTP is an acronym for "Time based One Time Password", and like the One Time Pad it is meant to produce passwords that are only used a single time. However, it doesn't have the same draw backs as OTP.

The protocol starts with a secret shared between the communicating entities. This is a sequence of numbers that is usually only 64 bytes, which is less than 140 digits (base 10). Once the two parties have shared the secret, they generate single use passwords to authenticate themselves to each other. The password generation algorithm is fairly straight forward:


* [Hash][10] the shared secret and the number of 30 second increments since the [Epoch][8]

__That's it__. It's fairly straight forward ([see the RFC for more details][9]).


Earlier I mentioned that TOTP is less secure that OTP, there are several reasons for this. I've tried to cover the major ones, but the list is by no means exhaustive as [new attacks on cryptography are discovered all the time][11].


* Anything that hashes to the same value as the shared secret can be used to generate passwords, because that's how [hashing][10] works, although in practice the hash chosen for TOTP is very resistant to finding these collisions.
* Determining the secret key reveals every single one of the passwords that will ever be produced, because the scheme is deterministic. This is also unlikely since [brute force][12] is considered to be the best attack against TOTP.
* Passwords generated can only be used in certain time intervals, because it's __time__ based one time passwords, and the user has no control over time window. For a scheme that doesn't use the time, but uses counters instead, see the [RFC for HOTP][13].

[1]: https://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm
[2]: https://en.wikipedia.org/wiki/Google_Authenticator
[3]: https://blog.dropbox.com/2012/08/another-layer-of-security-for-your-dropbox-account/
[4]: https://aws.amazon.com/mfa/
[5]: https://en.wikipedia.org/wiki/One_time_pad
[6]: https://en.wikipedia.org/wiki/One_time_pad#True_randomness
[7]: https://en.wikipedia.org/wiki/One_time_pad#Perfect_secrecy
[8]: https://en.wikipedia.org/wiki/Unix_time

[9]: https://tools.ietf.org/html/rfc6238
[10]: https://en.wikipedia.org/wiki/Cryptographic_hash_function

[11]: http://blog.tanyakhovanova.com/?p=277 "One-Way Functions"
[12]: https://tools.ietf.org/html/rfc6238#section-5 "Security Considerations for TOTP"
[13]: https://tools.ietf.org/html/rfc4226 "RFC for HOTP"
