import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

// ESLint 10 usa flat config; eslint-config-next 16 ya exporta arrays planos,
// por lo que no hace falta FlatCompat.
const config = [
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    // La autodetección de eslint-plugin-react llama a context.getFilename(),
    // eliminada en ESLint 10. Fijar la versión evita esa ruta de código.
    settings: { react: { version: '19.0' } },
    rules: {
      // El guion bajo marca argumentos y bindings ignorados a propósito
      // (destructuring posicional en las simulaciones).
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
]

export default config
