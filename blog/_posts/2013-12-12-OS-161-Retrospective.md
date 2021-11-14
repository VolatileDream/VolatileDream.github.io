---
layout: blog-post
tags: [ 'os', 'operating systems', 'os161', 'uwaterloo' ]
title: "OS 161 Retrospective"
---

As part of my degree requirements at the [University of Waterloo][1] every Computer Science major must take a course on [Operating Systems][2]. The course covers many OS concepts such as [synchronization][3], [processes][4], [system calls][5] and [virtual memory][6].

During the course students are tasked with implementing synchronization primitives, some system calls, and virtual memory. The assignments are cumulative. And after synchronization students are grouped to complete the last two assignments.

### Synchronization

The first assignmented entailed building synchronization primitives, specifically [locks][7] and [condition variables][8], with the restriction that we could not implement either using the provided [semaphores][9]. Once both are built we needed to solve a synchronization problem involving cats and mice, and eating from bowls.

#### Locks

Locks are fairly straight forward, but there are a few details that can make them much more difficult. The first being that some of the lock structure internals need to be marked as volatile because they <abbr title="can be, but statistically will be">will be</abbr> access from multiple threads on different cores. 

Locks should also have many `KASSERT`s to ensure that people using locks don't accidentally do something incorrectly, such as unlocking a lock that isn't locked, or locking a lock they have already locked. This is to diagnose programming mistakes in the kernel as quickly as possible, as any mistake that would use locks incorrectly removes all possibility that the kernel is working correctly.

#### Condition Variables

Implementing condition variables was incredibly straight forward after having done locks. In fact they felt far too easy. Condition variables are mostly a wrapper around <abbr title="wchan">wait channels</abbr>, but can contain some extra function to ensure that they are used more correctly.

### System Calls

The second assignment was implementing system calls. Students had been given the framework for handling system calls, all they had to do was implement the call, and wire it up. The system calls that were implemented as part of the course were in two groups: process calls (`waitpid`, `getpid`, `fork`, `execv`), and file io (`open`, `read`, `write`, `close`).

#### File Calls

The file calls are much simpler than the process calls, and mostly independent. The gotcha here is that everything must be thread safe, any number of threads could attempt to read/write from the same file descriptor at any point in time. The same thing goes for opening and closing descriptors, except all that needs to be worried about is that close properly handles the case when the file descriptor is already closed, and that the kernel file descriptor managing code is thread safe.

One of the other things to be aware of, is that you can never trust the user to give you a good buffer, so all io must be buffered through the kernel (one way or another), and that the pointers given to you by the user could potentially be malicious. Suppose the user is attempting to read data from a file into kernel space, while the kernel __can__ complete the read, it could potentially destroy the kernel to do so.

It should be noted that students didn't have to implement any of the underlying file system for this assignment.

#### Process Calls

After wrangling with file calls the process calls are next.

There were a few major lessons we learned when attempting to implement `PID`s:

* `PID`s need a quick lookup to see if they're in use (think bitmap)
* The entire integer range is not valid for `PID`s (are 0, and -1 good?)

Likewise, there were gotcha's that we ran into for exit code handling. As it turns out, storing exit code data in a `proc` structure is a pain for memory allocation reasons, and since it requires locking the structure to read or modify the data it can possibly result awkward locking scenarios (child is exiting, but the parent is too, worst case how does locking work?).

We made the following decisions when implementing our pid handling:

* Processes can only wait for their children
* When a process exits it's children become owned by the OS (which will garbage collect their exit statuses)
* All exit information is stored in a global struct (this avoids a bunch of locking issues)
* The process exit status struct holds the exit status, a `wchan` (for waitpid), and some implementation specific flags

One particular point of interest, we needed to give the operating system it's own `PID` because we couldn't guarantee that some part of the code wasn't setting the global variable `curproc` to the kernel process (`kproc`).

### Virtual Memory

This deserves a post all to itself, so I'll write about it later.

[1]: /resume/#uw "About"
[2]: https://www.student.cs.uwaterloo.ca/~cs350/ "CS350 - Operating Systems"
[3]: http://en.wikipedia.org/wiki/Synchronization
[4]: http://en.wikipedia.org/wiki/Child_process
[5]: http://en.wikipedia.org/wiki/System_calls
[6]: http://en.wikipedia.org/wiki/Virtual_memory
[7]: http://en.wikipedia.org/wiki/Lock_%28computer_science%29
[8]: http://en.wikipedia.org/wiki/Condition_variables
[9]: http://en.wikipedia.org/wiki/Semaphore_%28programming%29
