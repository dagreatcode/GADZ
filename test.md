/* eslint-env node */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        // 'prettier',
      ],

      
      rules: {


      
      },
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
        tsconfigRootDir: __dirname,
        extraFileExtensions: ['.react'],
        ecmaVersion: '12',
 
      },
      root: true,
      overrides: [
        {
          files: ['*.js', '*.ts', '*.mts', '*.cts', '*.jsx', '*.tsx'],
          extends: ['plugin:@typescript-eslint/disable-type-checked'],
        },
      ],
      env: {
        browser: true,
        commonjs: true,
        es2021: true
      },
  };

//   https://typescript-eslint.io/linting/troubleshooting