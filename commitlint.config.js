/*
 * @Description: commitlint 配置
 * @Author: Lyrelion
 * @Date: 2023-03-18 08:46:23
 * @LastEditTime: 2023-03-18 08:46:28
 * @FilePath: \ths-design-test1\commitlint.config.js
 */

module.exports = {
  extends: ['cz'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(.*?)\((.*?)\):\s?(.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  rules: {
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
  },
};
