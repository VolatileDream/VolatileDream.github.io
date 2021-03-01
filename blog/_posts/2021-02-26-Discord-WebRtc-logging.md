---
layout: blog-post
tags: [ 'discord' ]
---

UPDATE: I incorrectly diagnose the fix in this article.

I recently noticed a bunch of log spam in my `~/.xsession-errors` file:

```
[2021-02-27 13:09:31.379] [29081] (device_info_linux.cc:40): NumberOfDevices
```

Which were being output approximately once every second, and slowly filling up
my drive. The tale presented below is a tiedied up tale of finding solving
the issue, some details fudged or omit because I don't remember exactly how I
found the solution.

## Where?

I don't particularly enjoy log spam. So I wanted to track it down and ensure I
could either fix whatever issue this was attempting to flag, or turn off the
error message.

Searching for the message eventually lead me to this [WebRTC code here][enumerate-video].
From there, I assumed it's related to one of the browsers running on my machine.
Given that more applications are becoming browsers these days (see
[Electronjs][electron]) it led to me shutting down a whole host of applications
one at a time to see where the logs came from.

Eventually I found the culprit: [Discord][discord].

## Getting rid of it

Knowing the application that is creating these messages moves us along a little
bit, but we still need to understand why these are getting output. Based on the
[code][enumerate-video] it looks like we're just getting trace messages from
running the program. And looking into the WebRTC code doesn't give us much of an
indication of how to change the behaviour.

The Discord app doesn't output anything when passed the `--help` flag, it just
starts up normally and ignores the flag. Attempting other variations (`-h`,
`--usage`, `--help-full`) doesn't get us anything else either. Even going
further and generating garbage flag names doesn't net any apparent change in
behaviour.

Alright then, let's try to find flags in the program another way: `strings`.
While I'm sure there are other ways to look for command line flags, this is
reasonably straight forward and doesn't require more searching through code
bases. I ended up searching for a few things in the `strings` output: `--`
(for flag strings), `getOptionValue` (I saw some flag looking javascript),
`trace`, `log`, and `rtc`.

---

UPDATE: Apparently none of the below is correct, something I did stopped the
logging temporarily, but I do not know what.

I've reverted to running discord like this: `discord > /dev/null 2> /dev/null`,
which fixes the issue. It appears as though `stderr` is redirected to
`.xsession-errors`, by what I do not know.

Original content below left for posterity.

---

~~I ended up finding `webrtc-event-logging`, not displayed as a flag, but maybe?
A quick search for `discord webrtc-event-logging` reveals some results that
strongly imply that this is a flag, and maybe what we're looking for. Without
looking up the flag let's assume passing it `0` disables everything?~~

~~It turns out this is the flag we're looking for. Setting
`--webrtc-event-logging 0` does disable the log spam, horray! **But** what did
we just do? Did we tell Discord to log to a file named `0`?~~

~~Okay back to the search. Again from the chromium source we can find some
[documentation for the flag][rtc-flag]. It states *"accepts the path to which
the local logs would be stored"*, uh oh. We did just tell discord to write to
a file named `0`. What about using `--no-webrtc-event-logging`? Some frameworks
provide `no-` as a flag prefix to explicitly disable flags. And as a last resort
we could fall back to `--webrtc-event-logging /dev/null`.~~

~~It turns out that `--no-webrtc-event-logging` does stop the logging that I was
seeing in `.xsession-errors`. Thank goodness. My only complaint is that the
`--help` flag wasn't any use.~~


[enumerate-video]: https://chromium.googlesource.com/external/webrtc/stable/webrtc/+/master/modules/video_capture/linux/device_info_linux.cc#60
[electron]: https://www.electronjs.org/
[discord]: https://discord.com/
[rtc-flag]: https://chromium.googlesource.com/chromium/src/+/master/content/public/common/content_switches.cc#877
