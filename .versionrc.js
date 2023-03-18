/*
 * @Description: 格式化 log ，使 changelog 根据 Conventional Commits 规范更加语义化
 * @Author: Lyrelion
 * @Date: 2023-03-18 08:48:52
 * @LastEditTime: 2023-03-18 08:48:59
 * @FilePath: \ths-design-test1\.versionrc.js
 */

module.exports = {
    "types": [
      { "type": "feat", "section": "✨ Features | 新功能" },
      { "type": "fix", "section": "🐛 Bug Fixes | Bug 修复" },
      { "type": "init", "section": "🎉 Init | 初始化" },
      { "type": "docs", "section": "✏️ Documentation | 文档" },
      { "type": "style", "section": "💄 Styles | 风格" },
      { "type": "refactor", "section": "♻️ Code Refactoring | 代码重构" },
      { "type": "perf", "section": "⚡ Performance Improvements | 性能优化" },
      { "type": "test", "section": "✅ Tests | 测试" },
      { "type": "revert", "section": "⏪ Revert | 回退" },
      { "type": "build", "section": "📦‍ Build System | 打包构建" },
      { "type": "update", "section": "🚀 update | 构建/工程依赖/工具升级" },
      { "type": "tool", "section": "🚀 tool | 工具升级" },
      { "type": "ci", "section": "👷 Continuous Integration | CI 配置" }
    ]
  }