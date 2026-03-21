import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
	eslint .configs.recommended,
	tseslint.configs.recommended,
	{ ignores: ['dist', 'node_modules'] },
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			globals: globals.browser
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'@stylistic': stylistic
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'@stylistic/eol-last': ['error', 'always'],
			'@stylistic/quotes': ['error', 'single'],
			'@stylistic/jsx-quotes': ['error', 'prefer-single'],
			'@stylistic/semi': ['error', 'always'],
			'@stylistic/semi-style': ['error', 'last'],
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/object-curly-spacing': ['error', 'always'],
			'@stylistic/member-delimiter-style': ['error', {
				multiline: {
					delimiter: 'semi',
					requireLast: true
				},
				singleline: {
					delimiter: 'semi',
					requireLast: true
				}
			}]
		},
	}
);
