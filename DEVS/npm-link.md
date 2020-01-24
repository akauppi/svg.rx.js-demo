# npm-link

To co-develop the `svg.rx.js` library with this demo:

```
$ npm link ../svg.rx.js		# where-ever the library is cloned
...
/usr/local/lib/node_modules/svg.rx.js -> /Users/✁✁✁/svg.rx.js
/Users/✁✁✁/svg.rx.js-demo/node_modules/svg.rx.js -> /usr/local/lib/node_modules/svg.rx.js -> /Users/✁✁✁/svg.rx.js
```

This allows you to make changes to the lib, and try them out in the demo.

To unlink (e.g. to test a published version):

```
$ npm unlink svg.rx.js
```

## References

- [Understanding npm-link](https://medium.com/dailyjs/how-to-use-npm-link-7375b6219557) (blog, Oct 2018)

