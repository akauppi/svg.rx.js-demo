// Rollup config
//
// Note: This configuration is derived from
//          https://github.com/jakobrosenberg/svelte-filerouter-example/blob/master/rollup.config.js
//
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import { fileRouter } from 'svelte-filerouter';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

// Note: production status is derived from whether we're watching, but those are two different things.
//
const watching = process.env.ROLLUP_WATCH;
const production = !watching;       // tbd. for now, maybe introduce a 'PRODUCTION' env.var. in package.json

export default [
    {   // Demo app
        input: "demo/main.js",
        output: {
            sourcemap: true,
            format: "iife",
            name: 'blah',   // without this, Rollup gave a warning: >> (!) If you do not supply "output.name", you may not be able to access the exports of an IIFE bundle. <<
            dir: "public/bundle"
        },
        plugins: [
            fileRouter({
                appFile: 'demo/App.svelte',
                pages: 'demo/pages',
                // ignore: '['widget.svelte']'      // interpreted as regex; '_'-prefixed files always excluded
                unknownPropWarnings: false

                // "UMD and IIFE output formats are not supported for code-splitting builds."
                //dynamicImports: true        // "experimental code splitting"
            }),
            svelte({
                // enable run-time checks when not in production
                dev: !production,
                // extract any component CSS into a separate file — better for performance and clearer
                css: css => {
                    css.write('public/bundle.css');
                }
            }),

            // If you have external dependencies installed from npm, you'll most likely need these plugins. In some
            // cases you'll need additional configuration — consult the documentation for details: https://github.com/rollup/rollup-plugin-commonjs
            //
            resolve({
                // no warnings for 'assert', but see -> https://github.com/rollup/rollup-plugin-node-resolve/issues/107
                //browser: true,
                preferBuiltins: true,
                mainFields: ['browser'],        // tbd. what does this do? (from )
                dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
            }),
            commonjs(),

            // Needed for runtime 'assert' in the browser
            globals(),
            builtins(),

            // Bring changes to the browser automatically, if Rollup watches the sources
            //
            // Note: You need to watch the 'rollup -w' output, to find compilation problems. Only successful builds
            //      get updated!
            //
            watching && livereload('public'),

            // If we're building for production, minify
            production && terser()
        ],
        watch: {
            // Note: This supresses some clear screen, but not the one before `Your application is ready~! 🚀`.
            //      That is due 'sirv' and non-optional (Jan 2020).
            //
            clearScreen: false
        }
    }
];
