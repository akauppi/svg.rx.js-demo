// Rollup config
//
// Based on -> https://github.com/sveltech/routify-starter/blob/master/rollup.config.js
//
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';       // Q: or '@rollup/plugin-node-resolve'? (routify-starter)
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import { config } from '@sveltech/routify';     // as in 'routify-starter'

// Note: production status is derived from whether we're watching, but those are two different things.
//
const watching = process.env.ROLLUP_WATCH;      // automatically set by 'rollup'
const production = process.env.PROD;            // our convention

const split = config.dynamicImports;

export default {
    input: "src/main.js",
    output: {
        sourcemap: true,
        name: 'app',   // without this, Rollup gave a warning: >> (!) If you do not supply "output.name", you may not be able to access the exports of an IIFE bundle. <<
        format: split ? 'esm' : 'iife',
        [split ? 'dir' : 'file']: split ? 'public/build' : 'public/build/bundle.js'
    },
    plugins: [
        svelte({
            // enable run-time checks when not in production
            dev: !production,
            // extract any component CSS into a separate file — better for performance and clearer
            css: css => {
                css.write('public/build/bundle.css');
            }
        }),

        /*** disabled (following 'routify-starter')
        // Q: How can we provide Routify config if we'd like to run it in 'package.json', not here?  #routify
        //
        routify({
            pages: './src/pages',
            debug: true,        // "extra debugging"
            unknownPropWarnings: true,
            singleBuild: !watching,
            dynamicImports: false,      // default: false but author wrote online this would be "on by default" (playing safe)

            // "UMD and IIFE output formats are not supported for code-splitting builds."
            //dynamicImports: true        // "experimental code splitting"
        }),
        ***/

        // If you have external dependencies installed from npm, you'll most likely need these plugins. In some
        // cases you'll need additional configuration — consult the documentation for details: https://github.com/rollup/rollup-plugin-commonjs
        //
        resolve({
            // no warnings for 'assert', but see -> https://github.com/rollup/rollup-plugin-node-resolve/issues/107
            browser: true,
            preferBuiltins: true,
            //mainFields: ['browser'],        // tbd. what does this do? (from ...where?...)
            dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
        }),
        commonjs(),

        // Needed for runtime 'assert' in the browser
        globals(),
        builtins(),

        // Bring changes to the browser automatically, if Rollup watches the sources
        //
        // Note: You MUST WATCH THE 'rollup -w' output, to find compilation problems!! Only successful builds
        //      get updated!
        //
        watching && livereload('public'),

        // If we're building for production, minify
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
};
