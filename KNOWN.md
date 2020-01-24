# Known Issues


<!-- disabled
## Why does the screen clear?

This is a `sirv` (feature); one cannot disable clearing a screen at a certain place.

Sirv is good (over `http-serve`), because:

- it has simple `--single` support for single-page application routes
-->

## address already in use :::35729

```
$ npm run dev
...
[rollup] Error: listen EADDRINUSE: address already in use :::35729
```

This is the live-reload rollup extension, [see here](http://livereload.com/tips/change-port-number-livereload-listens-on/). 

You likely have some wholly unrelated project also using live-reload running. Stop it and try again.

Live-reload likely has a reason to use a global port.

To avoid this scenario, use e.g. `npm run start` (launching production, no live-reload).
