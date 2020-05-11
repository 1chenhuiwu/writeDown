/*
 * @Author: your name
 * @Date: 2020-05-11 19:07:10
 * @LastEditTime: 2020-05-11 19:07:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \documentation\scroll\index.js
 */
/**
 *元素的滚动动画
 *
 * @export
 * @param {*} ele 滚动的元素
 * @param {*} value 子元素到父元素（滚动元素）的offsetTop
 * @param {*} self 组件本身这样的引用空间的对象，用来清除自己本身的定时器
 * @param {*} durantion 动画时间，默认0.5秒
 */
// eslint-disable-next-line import/prefer-default-export
export function scrollAnimation(ele, value, self, durantion = 500) {
  // 清除定时器
  clearInterval(self.pTimer)
  if (!ele || value === undefined) {
    throw new Error('请指定滚动元素或滚动距离')
  }

  // 频率 10毫秒滚动一步长
  const frequency = 10

  // 被平分的份数
  const average = Math.round(durantion / 10) || 50

  // 滚动步长
  const step = (value - ele.scrollTop) / average

  // 上一次的滚动距离  用来解决世界的scrollTop达到不了子元素的offsetTop问题
  let preScrollTop

  // 理论上每次滚动后的scrollTop，为了解决下一条时，每次实际的步长就加了一半的问题，比如18 + 2 = 19 ，我也是很无奈啊，不知道为啥
  let theroyScrollTop = ele.scrollTop

  const clearTimer = () => {
    clearInterval(self.pTimer)
    self.pTimer = null

    // 解决因步长太大导致滚动位置出现大偏差问题
    ele.scrollTop = value
  }

  const addStep = () => {
    preScrollTop = ele.scrollTop
    theroyScrollTop = ele.scrollTop = theroyScrollTop + step
  }

  // 用来解决增加一次步长不滚动的事情
  let num = 2
  self.pTimer = setInterval(() => {
    if (ele.scrollTop === value) {
      clearTimer()
    } else if (ele.scrollTop - value < 0 && ele.scrollTop - value > step) {
      clearTimer()
    } else if (ele.scrollTop - value < 0 && ele.scrollTop - value > step) {
      clearTimer()
    } else if (preScrollTop === ele.scrollTop) {
      ;(num -= 1) === 0 ? clearTimer() : addStep()
    } else {
      addStep()
    }
  }, frequency)
}
