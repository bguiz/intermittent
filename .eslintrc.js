module.exports = {
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
		}
	},
	extends: 'eslint:recommended',
	env: {
		es6: true,
		browser: true,
		node: true,
		mocha: true
	},
	plugins: [],
	settings: {
	},
	rules: {
    // Comma
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],

		// Possible Errors
		'no-debugger': 'warn',
		'no-console': 'warn',

		// JavaScript Best Practices
		curly: ['error', 'multi-line'],
		'default-case': 'error',
		eqeqeq: 'error',
		'no-alert': 'error',
		'no-extra-bind': 'error',
		'no-implicit-globals': 'error',
		'no-lone-blocks': 'error',
		'no-multi-spaces': 'error',
		'no-return-assign': 'error',
		'no-self-compare': 'error',
		'no-sequences': 'error',
		'no-throw-literal': 'error',
		'no-unused-expressions': 'error',
		'vars-on-top': 'error',
		'wrap-iife': ['error', 'outside'],
		yoda: 'error',

		// JavaScript Variables
		'no-undef': 'error',
		'no-undef-init': 'error',
		'no-undefined': 'error',
		'no-use-before-define': ['error', {
			functions: false,
			classes: false,
		}],

		// JavaScript Stylistic Issues
		'array-bracket-spacing': ['error', 'never'],
		'block-spacing': 'error',
		'brace-style': ['error', 'stroustrup', {
			allowSingleLine: false,
		}],
		'comma-spacing': 'error',
		'comma-style': 'error',
		'computed-property-spacing': 'error',
		'eol-last': 'error',
		indent: ['error', 2],
		'key-spacing': 'error',
		'keyword-spacing': 'error',
		'lines-around-comment': 'error',
		'max-len': ['error', 120, 4, {
			ignoreUrls: true,
		}],
		'max-statements-per-line': 'error',
		'no-lonely-if': 'error',
		'no-multiple-empty-lines': ['error', {
			max: 1,
			maxEOF: 1,
		}],
		'no-nested-ternary': 'error',
		'no-spaced-func': 'error',
		'no-trailing-spaces': 'error',
		'no-unneeded-ternary': 'error',
		'no-whitespace-before-property': 'error',
		'object-curly-spacing': ['error', 'always'],
		'object-property-newline': ['error', {
			allowMultiplePropertiesPerLine: true,
		}],
		'one-var': ['error', 'never'],
		'one-var-declaration-per-line': ['error', 'always'],
		'operator-assignment': ['error', 'always'],
		'operator-linebreak': 'error',
		'quote-props': ['error', 'as-needed', {
			keywords: true,
		}],
		quotes: ['error', 'single', {
			avoidEscape: true,
		}],
		semi: 'error',
		'space-before-blocks': 'error',
		'space-before-function-paren': 'error',
		'space-in-parens': ['error', 'never'],
		'space-infix-ops': 'error',
		'space-unary-ops': 'error',

		// JavaScript ECMAScript 6
		'arrow-parens': ['error', 'always'],
		'arrow-spacing': 'error',
		'generator-star-spacing': ['error', 'after'],
		'no-duplicate-imports': 'error',
		'no-useless-computed-key': 'error',
		'no-useless-constructor': 'error',
		'no-var': 'error',
		'object-shorthand': 'error',
		'prefer-arrow-callback': 'error',
		'prefer-rest-params': 'error',
		'prefer-spread': 'error',
		'prefer-template': 'error',
		'require-yield': 'error',
		'template-curly-spacing': 'error',
		'yield-star-spacing': ['error', 'after'],
	}
};
