;(window._iconfont_svg_string_4441347 =
  '<svg><symbol id="icon-python" viewBox="0 0 1024 1024"><path d="M429.824 128c-60.672 0-109.824 49.152-109.824 109.824v64.512h164.7616c14.9504 0 27.2384 21.9136 27.2384 36.864H237.824c-60.672 0-109.824 49.152-109.824 109.824v145.2032c0 60.672 49.152 109.824 109.824 109.824h45.312v-102.912c0-60.672 48.7936-109.824 109.4656-109.824h201.5744a109.5168 109.5168 0 0 0 109.8752-109.4656V237.824c0-60.672-49.152-109.824-109.8752-109.824h-164.352z m-27.648 61.8496c15.36 0 27.648 4.608 27.648 27.2384 0 22.6816-12.288 34.2016-27.648 34.2016-14.9504 0-27.2384-11.52-27.2384-34.1504 0-22.6816 12.288-27.2896 27.2384-27.2896z" fill="#3C78AA" ></path><path d="M740.864 320v102.912a109.4656 109.4656 0 0 1-109.4656 109.824H429.824a109.5168 109.5168 0 0 0-109.824 109.4144v144.0256A109.824 109.824 0 0 0 429.824 896h164.352a109.824 109.824 0 0 0 109.824-109.7728v-64.512h-164.7616c-15.0016 0-27.2384-21.9136-27.2384-36.864h274.176a109.824 109.824 0 0 0 109.8752-109.8752V429.824a109.824 109.824 0 0 0-109.8752-109.824h-45.312zM370.688 493.312l-0.1536 0.1536c0.512-0.0512 0.9728 0 1.4848-0.1536H370.688z m251.136 279.3984c15.0016 0 27.2896 11.52 27.2896 34.2016a27.2384 27.2384 0 0 1-27.2896 27.2384c-15.36 0-27.648-4.608-27.648-27.2384 0-22.6816 12.288-34.2016 27.648-34.2016z" fill="#FDD835" ></path></symbol></svg>'),
  (function (n) {
    var t = (t = document.getElementsByTagName('script'))[t.length - 1],
      e = t.getAttribute('data-injectcss'),
      t = t.getAttribute('data-disable-injectsvg')
    if (!t) {
      var o,
        i,
        c,
        a,
        d,
        s = function (t, e) {
          e.parentNode.insertBefore(t, e)
        }
      if (e && !n.__iconfont__svg__cssinject__) {
        n.__iconfont__svg__cssinject__ = !0
        try {
          document.write(
            '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
          )
        } catch (t) {
          console && console.log(t)
        }
      }
      ;(o = function () {
        var t,
          e = document.createElement('div')
        ;(e.innerHTML = n._iconfont_svg_string_4441347),
          (e = e.getElementsByTagName('svg')[0]) &&
            (e.setAttribute('aria-hidden', 'true'),
            (e.style.position = 'absolute'),
            (e.style.width = 0),
            (e.style.height = 0),
            (e.style.overflow = 'hidden'),
            (e = e),
            (t = document.body).firstChild ? s(e, t.firstChild) : t.appendChild(e))
      }),
        document.addEventListener
          ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
            ? setTimeout(o, 0)
            : ((i = function () {
                document.removeEventListener('DOMContentLoaded', i, !1), o()
              }),
              document.addEventListener('DOMContentLoaded', i, !1))
          : document.attachEvent &&
            ((c = o),
            (a = n.document),
            (d = !1),
            r(),
            (a.onreadystatechange = function () {
              'complete' == a.readyState && ((a.onreadystatechange = null), l())
            }))
    }
    function l() {
      d || ((d = !0), c())
    }
    function r() {
      try {
        a.documentElement.doScroll('left')
      } catch (t) {
        return void setTimeout(r, 50)
      }
      l()
    }
  })(window)
