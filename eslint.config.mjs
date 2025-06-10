import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'
import globals from 'globals'

function trimKeys(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key.trim(), value])
  )
}

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: trimKeys(globals.browser),
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
  },
]
