    /**
     *
     * @param fn 需要返回一个 布尔值 用来关闭轮训
     * @param time 轮训时间
     * @returns {Promise<*>}
     */
    let handleCloseLoop = false;
    let loopTimer;
    let count = 1;
    let countTimer;

    // 关闭轮询方法
    let closeLoop = () => {
      console.log('closeLoop', 手动关闭, loopTimer);
      handleCloseLoop = true;
    };

    // 轮询方法
    const loop = async function (fn, time = 3000) {
      console.log('arguments', arguments)
      const resolveIns = arguments[2]
      const rejectIns = arguments[3]
      // 内部轮询
      if (resolveIns && rejectIns) {
        try {
          console.log("进入了带有resolve和reject的专区")
          if (handleCloseLoop) {
            console.log('手动关闭 loop')
            console.log("轮询函数定时器", loopTimer)
            clearTimeout(loopTimer)
            return rejectIns('手动关闭 loop')
          }
          // 是否关闭 轮训
          const closeLoop = await fn()
          if (closeLoop) {
            console.log("轮询函数定时器", loopTimer)
            clearTimeout(loopTimer)
            return resolveIns(closeLoop)
          }
          console.log("轮询函数定时器", loopTimer)
          loopTimer = setTimeout(async () => {
            await loop(fn, time, resolveIns, rejectIns)
          }, time)
        } catch (e) {
          clearTimeout(loopTimer)
          return
        }
        return
      }
      return new Promise(async (resolve, reject) => {
        try {
          if (handleCloseLoop) {
            console.log("轮询函数定时器", loopTimer)
            clearTimeout(loopTimer)
            return reject('手动关闭 loop')
          }
          // 是否关闭 轮训
          const closeLoop = await fn()
          if (closeLoop) {
            console.log("轮询函数定时器", loopTimer)
            clearTimeout(loopTimer)
            return resolve(closeLoop)
          }
          console.log("轮询函数定时器", loopTimer)
          loopTimer = setTimeout(async () => {
            await loop(fn, time, resolve, reject)
          }, time)
        } catch (e) {
          console.log('e', e)
          clearTimeout(loopTimer)
          return
        }
      })
    }

    let testFun = () => {
      let flag = false;
      countTimer = setTimeout(() => {
        count += 1;
        if (count === 50) {
          clearInterval(countTimer);
          flag = true;
        }
      }, 1000)
      console.log('测试函数计时器', countTimer);
      return flag;
    }

    let result = loop(testFun, 1000);
    console.log("轮询结果", result);