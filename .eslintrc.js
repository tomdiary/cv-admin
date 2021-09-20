module.exports = {
  extends: ['plugin:vue/vue3-essential', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
    'vue/max-attributes-per-line': [2, {
      singleline: 10,
      multiline: {
        max: 1,
        allowFirstLine: false
      }
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    'accessor-pairs': 2,
    'arrow-spacing': [2, { before: true, after: true }],
    'no-set-state': 0,
    'brace-style': [1, '1tbs', { allowSingleLine: true }],
    indent: [2, 2],
    eqeqeq: [2, 'allow-null'],
    semi: [2, 'never'],
    quotes: [2, 'single'],
    'semi-spacing': 1,
    'no-restricted-globals': 0,
    'no-trailing-spaces': 2,
    'comma-dangle': [2, 'never'],
    'vue/this-in-template': 2,
    'vue/no-template-shadow': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'arrow-parens': 0,
    'consistent-return': 0,
    'no-unused-expressions': 0,
    'max-len': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'no-prototype-builtins': 0,
    'import/prefer-default-export': 0,
    'import/no-dynamic-require': 0,
    'global-require': 0,
    'vue/require-valid-default-prop': 0,
    'no-return-assign': 0,
    'array-callback-return': 0,
    'no-plusplus': 0,
    'vue/no-unused-components': 0,
    'prefer-destructuring': 0,
    'import/no-extraneous-dependencies': 0
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {}
    }
  ]
}
