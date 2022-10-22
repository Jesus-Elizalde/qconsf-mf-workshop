# qconsf-mf-workshop

Repository for the workshop regarding Micro Frontends at QCon San Francisco.

Structure:

- **demos**: Contains all the demos referenced in the theory parts.
- **exercises**: Contains information and boilerplate code to be used for doing the exercises.
- **slides**: Contains the slides used for the day.
- **solutions**: Contains solution proposals for the different exercises.

Make sure to run `npm i` in each folder containing a *package.json*.

Some demos / examples / solutions have a *run-all.sh* file. This works in WSL, Linux, and MacOS. Running the script via `./run-all.sh` will actually install and run everything necessary for the respective demo / example / solution. For PowerShell users (Windows) you'll also a find a `./run-all.ps1` in the same directory.

## Agenda

9:00 - 10:30

* Web Approach and Server-Side Composition (*Demo 1*)
* Client-Side Composition
* Web Components for composing Micro Frontends (*Demo 2*)
* **Exercise 1** (using Web Components for Micro Frontends)
* SPA Composition

10:30 - 10:45

* Coffee break

10:45 - 12:00:

* Introduction to single-spa (*Demo 3*)
* **Exercise 2** (importmaps with SystemJS in single-spa)
* Introduction to Module Federation (*Demo 4*)
* Alternative approaches
* Siteless UIs (*Demo 5*)

12:00 - 12:50

* Lunch

12:50 - 14:30

* **Exercise 3** (Module Federation remotes to enable micro frontends)
* Dependency Sharing
* Centralized Sharing (*Demo 6*)
* Distributed Sharing (*Demo 7*)

14:30 - 14:45

* Coffee break

14:45 - 16:00

* **Exercise 4** (Module Federation for dependency sharing)
* Scalability Concerns
* Feed Service
* Recap & Feedback

## Further Infos

## More Samples

In general the following links may be relevant:

* [Samples from "Art of Micro Frontends"](https://github.com/ArtOfMicrofrontends)
* [Samples for Module Federation](https://github.com/module-federation/module-federation-examples)
* [Samples for Piral](https://github.com/piral-samples)

## License

All sample code is released using the MIT license. For more information see the [license file](./LICENSE).
