/*
 * @Author: your name
 * @Date: 2020-05-11 19:07:10
 * @LastEditTime: 2020-05-18 11:44:51
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
 * @param {*} durantion 动画时间，默认0.2秒
 */
// eslint-disable-next-line import/prefer-default-export
export function scrollAnimation(ele, value, durantion = 200) {
  // 清除定时器
  clearInterval(ele.pTimer)
  if (!ele || value === undefined) {
    throw new Error('请指定滚动元素或滚动距离')
  }

  // 频率 10毫秒滚动一步长
  const frequency = 10

  // 被平分的份数
  const average = Math.floor(durantion / frequency) || 30

  // 滚动步长
  const step = (value - ele.scrollTop) / average

  // 上一次的滚动距离  用来解决世界的scrollTop达到不了子元素的offsetTop问题
  let preScrollTop

  // 理论上每次滚动后的scrollTop，为了解决下一条时，每次实际的步长就加了一半的问题，比如18 + 2 = 19 ，javaScript自己的bug
  let theroyScrollTop = ele.scrollTop

  const clearTimer = () => {
    clearInterval(ele.pTimer)
    ele.pTimer = null

    // 解决因步长太大导致滚动位置出现大偏差问题
    ele.scrollTop = value
  }

  const addStep = () => {
    preScrollTop = ele.scrollTop
    theroyScrollTop = ele.scrollTop = theroyScrollTop + step
  }

  // 用来解决增加一次步长不滚动的事情
  let num = 2
  ele.pTimer = setInterval(() => {
    if (ele.scrollTop === value) {
      clearTimer()

      // JavaScript对小数运算会先转成二进制，运算完毕再转回十进制，过程中会有丢失，不过不是所有的小数间运算会有这个问题。比如： 0.1 + 0.2 = 0.30000000000000004
      // 举例：目的值101, 100 + 1算成100.999或101.1111那么101 < (100.999 || 101.111) < 102
    } else if (ele.scrollTop - value > 0 && ele.scrollTop - value < step) {
      clearTimer()

      // 举例：目的值101, 102 - 1算成101.111或100.999那么101 < (100.999 || 101.111) < 102
    } else if (ele.scrollTop - value < 0 && ele.scrollTop - value > step) {
      clearTimer()

      // 上次滚动长度 = 当前滚动长度，说明已经不能再滚动了
      // 另外这个判断还可以兼容切出页面的情况
    } else if (preScrollTop === ele.scrollTop) {
      // javaScript自己的bug增加scrollTop，不滚动
      ;(num -= 1) === 0 ? clearTimer() : addStep()
    } else {
      addStep()
    }
  }, frequency)
}