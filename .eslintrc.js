module.exports = {
  'extends': [
    'eslint-config-alloy/react', 
    'eslint-config-alloy/typescript'
  ],
  'globals': {
    // 全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    '__DEV__': false
  },
  'parserOptions': {
    'ecmaVersion': 7,
    'sourceType': 'module',
    'ecmaFeatures': {
        'jsx': true,
    }
  },
  'rules': {
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    '@typescript-eslint/indent': ['error', 2, { 'SwitchCase': 1, 'flatTernaryExpressions': true }],
    '@typescript-eslint/prefer-function-type': 'off',
    '@typescript-eslint/prefer-for-of': 'off',
  }
};
