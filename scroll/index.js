/*
 * @Author: your name
 * @Date: 2020-05-11 19:07:10
 * @LastEditTime: 2020-06-04 11:26:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \documentation\scroll\index.js
 */ 
/**
 *元素的滚动动画
 *滚动的实现原理是增加scrollTop的值，这个值的增量按照MDN的文档要求是整数，不是整数的时候会存在些问题：增加无反应，增加了增量的一半，等
 *滚动的频率（frequency）是10毫秒每次；持续的时间(duration)小于等于0.2秒，因为会对滚动的步长取整
 * @export
 * @param {*} ele 滚动的元素
 * @param {*} value 子元素到父元素（滚动元素）的offsetTop
 */
// eslint-disable-next-line import/prefer-default-export
export function scrollAnimation(ele, value) {
  // 清除定时器
  clearInterval(ele.pTimer)
  if (!ele || value === undefined) {
    throw new Error('请指定滚动元素或滚动距离')
  }

  // 频率 10毫秒滚动一步长
  const frequency = 10

  // 被平分的份数
  const average = 20

  // 理论滚动步长
  const theroyStep = (value - ele.scrollTop) / average

  // 实际滚动步长
  const step = theroyStep > 0 ? Math.ceil(theroyStep) : Math.floor(theroyStep)

  // 上一次的滚动距离  解决实际场景中：父元素不存在滚动场景；父元素滚动的部分很小，不是子元素到到父元素的距离
  let preScrollTop

  // 理论上每次滚动后的scrollTop，为了解决下一条时，每次实际的步长就加了一半的问题，比如18 + 2 = 19 ，javaScript自己的bug
  // let theroyScrollTop = Math.round(ele.scrollTop)

  const clearTimer = () => {
    clearInterval(ele.pTimer)
    ele.pTimer = null

    // 解决因步长太大导致滚动位置出现大偏差问题
    ele.scrollTop = value
  }

  const addStep = () => {
    preScrollTop = ele.scrollTop
    ele.scrollTop = preScrollTop + step

    // theroyScrollTop = ele.scrollTop = theroyScrollTop + step
  }

  // const num = 2
  ele.pTimer = setInterval(() => {
    if (ele.scrollTop === value) {
      clearTimer()

      // JavaScript对小数运算会先转成二进制，运算完毕再转回十进制，过程中会有丢失，不过不是所有的小数间运算会有这个问题。比如： 0.1 + 0.2 = 0.30000000000000004
      // 举例：目的值101, 100 + 1算成100.999或101.1111那么101 < (100.999 || 101.111) < 102
      // 额外，因为step取整，那么基本上ele.scrollTop !== value
    } else if (ele.scrollTop - value > 0 && ele.scrollTop - value < step) {
      clearTimer()

      // 同上
    } else if (ele.scrollTop - value < 0 && ele.scrollTop - value > step) {
      clearTimer()

      // 上次滚动长度 = 当前滚动长度，说明已经不能再滚动了
      // 另外这个判断还可以兼容切出页面的情况
    } else if (preScrollTop === ele.scrollTop) {
      // ;(num -= 1) === 0 ? clearTimer() : addStep()
      clearTimer()
    } else {
      addStep()
    }
  }, frequency)
}