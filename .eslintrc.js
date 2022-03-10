module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ["airbnb-base", "plugin:prettier/recommended"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "prettier"],
	rules: {
		"prettier/prettier": [2, { singleQuote: false, parser: "typescript", endOfLine: "auto", useTabs: true }],
		"node/no-missing-import": "off",
		"global-require": "off",
		"import/no-dynamic-require": "off",
		"class-methods-use-this": "off",
		"no-param-reassign": "off",
		"no-unused-vars": ["error", { argsIgnorePattern: "next" }],
		"node/no-unsupported-features/es-syntax": "off",
		"import/no-unresolved": "off",
		"import/extensions": "off",
		"no-restricted-syntax": "off",
		"no-underscore-dangle": "off",
		"no-useless-constructor": "off",
		"no-empty-function": ["error", { allow: ["constructors"] }],
	},
};
