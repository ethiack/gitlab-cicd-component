export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [1, 'always', 100], // warning
    'header-max-length': [1, 'always', 100], // warning
    'footer-max-line-length': [1, 'always', 100], // warning
    'subject-case': [1, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']], // warning
  },
}
