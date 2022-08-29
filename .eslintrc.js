module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true
	},
	parser: 'vue-eslint-parser',
	extends: [
		'plugin:vue/vue3-recommended',
		'plugin:prettier/recommended',
	],
	overrides: [
	],
	plugins: [
		'vue'
	],
	globals: {
		$t: true,
		$api: true
	},
	rules: {
		indent: [2, 'tab'],
		'linebreak-style': [2, 'unix'],
		quotes: [2, 'single'],
		semi: [2, 'never']
	}
}
