import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from "eslint-plugin-react"
import { defineConfig, globalIgnores } from 'eslint/config'
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    // Указываем, для каких файлов действуют эти настройки
    files: ['**/*.{ts,tsx}'],

    // ВАЖНО: используем пресеты от typescript-eslint
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react': pluginReact,
    },

    languageOptions: {
      // Это ключевой момент для исправления ошибки "Unexpected token {"
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.browser,
    },

    rules: {
      // Ваши правила
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/consistent-type-imports": "warn", // Рекомендую для работы с 'import type'
    },
    prettierConfig,
  },
])