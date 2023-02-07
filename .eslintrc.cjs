module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:import/recommended'
  ],
  overrides: [],
  parserOptions: {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  globals: {
    $api: true,
    defineProps: true
  },
  plugins: [
    'vue'
  ],
  settings: {
    // https://www.npmjs.com/package/eslint-import-resolver-alias
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@lay', './src/layout'],
          ['@com', './src/components'],
          ['@ld', './src/layout/Default/index.vue']
        ],
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
      }
    }
  },
  rules: {
    semi: [2, 'never'],
    'import/prefer-default-export': 0,
    'import/no-unresolved': [
      2,
      {
        commonjs: true,
        amd: true,
        caseSensitive: false
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/named': 0,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2
  }
}
