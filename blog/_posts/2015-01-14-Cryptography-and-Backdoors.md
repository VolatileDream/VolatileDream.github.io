---
layout: blog-post
tags: ["cs492","uwaterloo","crypto","security"]
subtitle: A Computing Dilemma for CS492
---

> "Cryptography [...] is the practice and study of techniques for secure communication in the presence of third parties" - [Wikipedia][1]

In a day and age where almost every business depends on cryptography -- either directly by relying on cryptography to securely host their websites ([SSL and TLS][2]), or indirectly because of the cryptography required for banks to securely communicate and move money around -- it seems unreasonable to cripple cryptographic systems. And yet, people keep entertaining the notion that a backdoor will be used by the appropriate parties to open up the communications of the guilty, all without endangering the innocent.

### A Tangent on Cryptography

The construction and implementation of cryptographic systems embeds assumptions into the system being created. These assumptions change the safety of the system, and the (assumed) capabilities of an adversary that is attacking the system. One of the most key assumptions of strong cryptographic systems is that the implementation of the entire system is laid bare to the attacker, who requires a secret value to successfully break the system (also known as [Kerckhoffs's principle][5]).

It is important to note that the strength of a cryptographic system is measured in the computational resources required break it. When it is constructed with the assumption it will be well known many cryptographers can then attempt to find faster and faster ways to break a system. Ensuring that the smartest minds try and (hopefully) fail to break the system, thereby showing that it is probably safe to use.

As an example, consider [ROT13][3]: a cipher that swaps a letter for one that is 13 places farther in the alphabet. Once someone knows that this is the scheme that is being used, it is trivial to break. The 'rotation' operation is just applied in reverse, and voila, the encryption is no more. We call this Order 1, as it requires a single permutation to check. *"But,*" you say, *"what if we didn't always rotate by 13?"*. Clever reader, you have stumbled on the [Caesar Cipher][4]. While trying to break the [Caesar Cipher][4] we have to try all 26 different possible shifts before being sure that we have found the correct one. This is Order linear (or N), as it requires that all possible permutations are tried. (Note that in this case 26 is a fairly small number, but it is larger than the 1 from [ROT13][3].)

### What exactly is a Backdoor?

A backdoor is a way to subvert a cryptographic system, allowing the holder of the backdoor key access to the encrypted data, and potentially inserting or removing some of it. The backdoor key is embedded into the system when it is created, and has the potential of never being discovered. As far as the system is concerned, there is no way to differentiate different users of the backdoor, making it the keys to the kingdom (trivially copy-able key).

But why would people demand the addition of a backdoor to an otherwise secure system? There are a multitude of hypothetical reasons for including a backdoor into a cryptographic system, eventually they all boil down to an illusion of security for the enemies of the key holder. If a user of the system is friendly to the key holder, they (in theory) do not need to worry about having their communications or secrets discovered, however, the enemies of the key holder have no security (from the key holder, who can reveal their communications or secrets).

Many people might assume that a system containing a backdoor is acceptable as long as the right people have access to the backdoor key, and it is used in the interest of the greater good (i.e., stopping criminals). Unfortunately, this makes two erroneous assumptions. 1) Finding the backdoor key is impossible, and 2) every agent entrusted with the key will never compromise it (accidentally or not).

#### Finding the Key

Finding a key in a cryptographic system can be as simple as getting access to an implementation of the system and watching it work, or as hard as finding one very special number out of billions. Either way, once a backdoor is known to exist, it is only a matter of time before the key is found.

#### Leaking the Key

["Loose lips sink ships"][6], the idea that disclosing secrets might compromise your organization is very much a problem with backdoors. Many people have likely discovered (through experience), that keeping a secret becomes harder and harder as more and more people know it. This causes a problem, because for a backdoor to be useful it must be usable by potentially many people or systems to break into a multitude of encrypted targets. It then becomes a struggle between the usefulness of the backdoor, and the ever persistent threat that someone leaks the backdoor key.

### Nope

Making sure that people and organizations can communicate securely is a worthy goal, and has proven to be extremely useful. While it does allow for bad things to happen, it's potential, and already existing uses vastly out number those few problematic ones. In the words of [Benjamin Franklin: "Those who would give up essential Liberty, to purchase a little temporary Safety, deserve neither Liberty nor Safety"][7], because a backdoor is only useful while it lays undiscovered, and once it is, the safety that was traded for is gone.

[1]: https://en.wikipedia.org/wiki/Cryptography
[2]: https://en.wikipedia.org/wiki/Transport_Layer_Security
[3]: https://en.wikipedia.org/wiki/ROT13
[4]: https://en.wikipedia.org/wiki/Caesar_cipher
[5]: https://en.wikipedia.org/wiki/Kerckhoffs%27s_principle
[6]: https://en.wikipedia.org/wiki/Loose_lips_sink_ships
[7]: https://en.wikiquote.org/wiki/Benjamin_Franklin#Quotes
