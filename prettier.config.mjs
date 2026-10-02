/** @type {import('prettier').Config} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cn'],
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  useTabs: false,
  endOfLine: 'lf',
};

export default config;
