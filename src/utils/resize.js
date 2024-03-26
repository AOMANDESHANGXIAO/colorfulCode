// //封装指令，可以手动拉伸和缩小盒子
// // import { ref } from 'vue'

// export default {
//   beforeMount(el, binding, vnode, prevVnode) {
//     let startX
//     let startWidth

//     const mouseDownHandler = function (e) {
//       startX = e.pageX
//       startWidth = parseFloat(
//         document.defaultView.getComputedStyle(el, null).width.replace('px', '')
//       )
//       document.documentElement.addEventListener('mousemove', mouseMoveHandler)
//       document.documentElement.addEventListener('mouseup', mouseUpHandler)
//     }

//     const mouseMoveHandler = function (e) {
//       el.style.width = `${startWidth + e.pageX - startX}px`
//     }

//     const mouseUpHandler = function () {
//       document.documentElement.removeEventListener('mousemove', mouseMoveHandler)
//       document.documentElement.removeEventListener('mouseup', mouseUpHandler)
//     }

//     el.addEventListener('mousedown', mouseDownHandler)
//   }
// }
