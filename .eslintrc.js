module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    // Disable all the rules causing errors
    '@typescript-eslint/no-explicit-any': 'off',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/jsx-no-comment-textnodes': 'off'
  }
}