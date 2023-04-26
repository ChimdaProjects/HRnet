module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    indent: ['error', 4],
     // utilisation de guillemets simples pour les chaînes de caractères
     'quotes': ['error', 'double'],
     // pas d'espaces en fin de ligne
     'no-trailing-spaces': 'error',
     // utilisation de la virgule en dernier dans les objets et tableaux
     'comma-dangle': ['error', 'always-multiline'],
     // utilisation des accolades pour les blocs même s'ils ne sont pas nécessaires
     'curly': ['error', 'all'],
     // utilisation des ; même s'ils ne sont pas nécessaires
     'semi': ['error', 'always'],
     // pas de console.log dans le code final
     'no-console': 'warn',
     // pas de variables inutilisées
     'no-unused-vars': 'warn',
  },
};
