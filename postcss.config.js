const cssnano = require('cssnano')({ preset: 'default' });

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./**/**/*.html', './**/**/*.svelte'],

  whitelistPatterns: [/svelte-/],
});

const production = !process.env.ROLLUP_WATCH;

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(production ? [purgecss, cssnano] : []),
  ],
};
