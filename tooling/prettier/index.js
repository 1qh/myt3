import { fileURLToPath } from 'node:url'

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig } */
const config = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  importOrder: [
    '<TYPES>',
    '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
    '^(next/(.*)$)|^(next$)',
    '^(expo(.*)$)|^(expo$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '<TYPES>^@acme',
    '^@a/(.*)$',
    '',
    '<TYPES>^[.|..|~]',
    '^~/',
    '^[../]',
    '^[./]'
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '4.4.0',
  jsxSingleQuote: true,
  overrides: [
    {
      files: '*.json.hbs',
      options: {
        parser: 'json'
      }
    },
    {
      files: '*.js.hbs',
      options: {
        parser: 'babel'
      }
    }
  ],
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  printWidth: 100,
  semi: false,
  singleQuote: true,
  trailingComma: 'none'
}

export default config
