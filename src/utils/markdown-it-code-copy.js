'use strict'
var _this = this
Object.defineProperty(exports, '__esModule', { value: true })
var clipboard_1 = require('clipboard')
var lodash_es_1 = require('lodash-es')
var clipboard = new clipboard_1.default('.markdown-it-code-copy')
// 未 copy 时按钮的 innerHTML
var copyInnerHTML =
  '\n  <svg aria-hidden="true" focusable="false" role="img" class="octicon octicon-copy" viewBox="0 0 16 16" width="12" height="12" fill="currentColor" style="display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>\n  <span>Copy</span>\n'
// copy 后按钮的 innerHTML
var copiedInnerHTML =
  '\n  <svg aria-hidden="true" focusable="false" role="img" class="octicon octicon-check" viewBox="0 0 16 16" width="12" height="12" fill="currentColor" style="display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>\n  <span>Copied!</span>\n'
clipboard.on('success', function (e) {
  var trigger = e.trigger
  e.clearSelection()
  trigger.innerHTML = copiedInnerHTML
  setTimeout(function () {
    trigger.innerHTML = copyInnerHTML
  }, 3000)
})
// 用正则提取出 code 的语言
var getCodeLangFragment = function (htmlString) {
  var regex = /<code class="hljs (language-([a-z]+))">/
  var match = htmlString.match(regex)
  return (match === null || match === void 0 ? void 0 : match[2]) || ''
}
var renderCode = function (renderer) {
  return function () {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    var tokens = args[0],
      idx = args[1]
    var content = (0, lodash_es_1.escape)(tokens[idx].content)
    var origRendered = renderer.apply(_this, args)
    if (content.length === 0) return origRendered
    var lang = getCodeLangFragment(origRendered)
    return '\n      <div class="code-enhance">\n        <div class="code-enhance-header">\n          <span>'
      .concat(
        lang,
        '</span>\n          <span class="markdown-it-code-copy code-enhance-copy" data-clipboard-text="'
      )
      .concat(content, '">\n            ')
      .concat(
        copyInnerHTML,
        '\n          </span>\n        </div>\n        <div class="code-enhance-content">\n          '
      )
      .concat(origRendered, '\n        </div>\n      </div>\n    ')
  }
}
/**
 * markdown-it 的插件，添加代码语言显示和 copy 代码按钮
 */
exports default = function (md) {
  if (md.renderer.rules.code_block != null) {
    md.renderer.rules.code_block = renderCode(md.renderer.rules.code_block)
  }
  if (md.renderer.rules.fence != null) {
    md.renderer.rules.fence = renderCode(md.renderer.rules.fence)
  }
}
