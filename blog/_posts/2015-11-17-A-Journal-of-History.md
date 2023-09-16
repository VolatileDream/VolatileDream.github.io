---
layout: blog-post
tags: ["software","chronos","performance"]
subtitle: An Adventure in Performance Tuning
---

Once upon a time I decided to start keeping a [journal (aka diary)][2]. It started simply enough: a [plain text][3] flat file which could be edited with almost any software. At some point this became a nuisance, I had to do too much work by hand, and adding entries was annoying.

### A Brief History

The journal has gone through approximately 5 fairly different revisions, each with their own advantages and disadvantages. It started life as a simple flat text file, eventually became a [SQLite][7] database, turned back into a simple text store, and finally into a wiki. Each format migration was catalyzed by a different performance problem I encountered while using it.

At one point, it was using [SQLite][7] as the data-store, and doing nothing at all fancy to communicate between the journal and [SQLite][7]. It turns out that by using the 'sqlite' command line interface I was seriously penalizing the performance of a few of the operations that I was frequently using. Rather than learn the [SQLite C api][8] and replace the [bash script][9] I had been using, I decided to write a customized data-store that would be perfectly tailored to my purpose. And so, [chronos][1] was born.

### The API

The API that I would require for my journal proved to be very straight forward. There were only a few operations that were needed, but they had to be fast. The operations that would be supported are `find <key>`, `iterate <print-format>`, and `append`. The biggest bottleneck that I was running into while using the [bash script][9] was iterating over the entire journal to run data aggregation across all of the entries.

#### The Design

[Chronos][1] would be the simplest possible time stamped data-store that I could design. This included some fairly simple design constraints:

 1. [Chronos][1] would have to work through the command line, accepting data from standard input, and writing to standard output.
 2. [Chronos][1] would only store a time-stamp and date. It would not be a fancy [Key-Value Store][4].
 3. [Chronos][1] would be append only, and not allow for editing of any of it's data.

After some thought on the implementation of [chronos][1] I decided that it would have to live in a directory, and have two separate files: one for the entry index, and another containing the data. This makes it much easier to traverse the entries, over say a linked list file format.

### Building It And Profiling

The majority of the work with [chronos][1] was fairly straight forward: consisting largely of file io, with a small amount of data structure modification. Profiling the code was fairly easy, [Valgrind][12] has a wonderful tool called [Callgrind][13] that spits out run summaries to be viewed in [KCachegrind][14].

#### Synchronization

Since file io takes a non-zero amount of time, added to the list of problems is cross process synchronization (also required for historical reasons). Introduce the [linux][11] `flock(2)` system call, it allows applications to have mutual exclusion locks on file system entries. The easiest way to do locking (initially) is to have exclusive locks for write operations (`append`), and use shared locks on all read operations (`get`, and `iterate`).

The optimization of `flock(2)` synchronization usage was to drop all shared locks, allowing read operations to access both the index and data store without synchronization. This calls into question the ability of [chronos][1] to ensure a correct read against any of it's data. If we reason through the way in which [chronos][1] appends data, there isn't much work to be done to ensure that it fails in a safe manner.

The strategy for data integrity is two fold: 1) appending data still uses an exclusive lock (1 write at a time), and 2) when appending data the index is the second file written to. Since the size of writes between the data store and index are expected to be very different (data store > > > index) writing to the index second should ensure that any failure only adds garbage data to the data store, but never produces an incorrect index entry.

#### File io

Since [chronos][1] is always doing io (as either: accepting input from standard input, or writing output to standard output), it requires a lot of io buffering. Most of the io buffering is very simple, and occurs in a `read(2) -> write(2)` while loop. In addition to operate safely as a pseudo-database, [chronos][1] uses the `fsync(2)` to ensure that data is propagated to physical storage before exiting.

There is no nice optimization for `fsync(2)`, instead [chronos][1] builds a variant that disables `fsync(2)` usage in case it is unlikely to be an issue for the user (this is generally the case). This turns out to be one of the largest optimizations that [chronos][1] can perform, changing the amount of time taken by almost an order of magnitude (after all other optimizations are performed).

The second file io optimization that is performed is the usage of `splice(2)`: this system call moves data between two file descriptors without it ever entering user space. This allows us to pass (almost) any amount of data through [chronos][1] without incurring context switch penalties because of buffering the data through our application.

#### Overhead

One of the things noticed while profiling [chronos][1] with [Callgrind][13] was the unreasonable amount of time that was spent initializing the standard C library. More than half of the program execution time was spent in routines that would have no effect on the programs execution. This is a difficult optimization problem, since rewriting the standard library was not something I was willing to do.

There are two optimizations that can be applied, the first is using a different implementation of the standard library ([see performance and size comparisons][15]), and the second is to amortize this cost over multiple append operations. Changing the standard library is fairly straight forward, usually modifying the last one or two build steps of an application (assuming you use someone elses rewrite).

Attempting to amortize this time (and conveniently the process forking overhead) we required that [chronos][1] be able to handle multiple append operations. To do this, [chronos][1] has a second mode of operation (invoked using the `chronosd` binary) which opens a [fifo(7)][16] for communication. A quick note about [fifos][16]: fifos pretend to be files, but instead connect a pair of open operations (read/write) which are likely from different applications. Since a [fifo][16] is a file descriptor that is compatible with `splice(2)`, there is very little overhead in the io loop using the fifo [(open, append, close)][17]. `chronosd` operation only requires that an application write their data in full to the fifo, and then close it, after the close chronos time-stamps the data, and finishes the append.

### Conclusions

The best advice I could give to anyone attempting to optimize every last cycle out of their application run-time would be to start with optimization in mind, and attempt to align data structures and usage patterns to this goal. While the narrative presented here appears to be a reasonable progression of optimization attempts, in reality they were not as nicely separated, and often punctuated by experiments of fairly large rewrites.

[1]: https://github.com/VolatileDream/chronos
[2]: https://en.wikipedia.org/wiki/Diary
[3]: https://en.wikipedia.org/wiki/Plain_text
[4]: https://en.wikipedia.org/wiki/Key-value_store
[7]: https://sqlite.org
[8]: https://sqlite.org/c3ref/intro.html
[9]: https://github.com/VolatileDream/dot-files/blob/acad6963ff1d9bcdb19bf4495bb7dd9b7fe03bfd/kiwi
[10]: https://github.com/VolatileDream/chronos/blob/f3d6615e4e26c2fd3d9f20dbc6b63d418ce950e2/chronos-physical.c#L138
[11]: https://en.wikipedia.org/wiki/Linux
[12]: http://valgrind.org
[13]: http://valgrind.org/docs/manual/cl-manual.html "Callgrind documentation"
[14]: https://www.kde.org/applications/development/kcachegrind/ "KCachegrind: Callgrind vizualiser"
[15]: http://www.etalabs.net/compare_libcs.html
[16]: http://linux.die.net/man/7/fifo
[17]: https://github.com/VolatileDream/chronos/blob/a1341f036d4a5239a9406c3c6ba6f644095b9b75/daemon.c#L213-L235
