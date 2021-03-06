let handleCloseLoop = false;// 手动关闭轮训方法
let loopTimer;// 轮询定时器
let reduce = 20;// 模拟请求次数
let countTimer;// 模拟后端异步
let data = null;// 模拟后端数据

// 关闭轮询方法
let closeLoop = () => {
  console.log('closeLoop', 手动关闭, loopTimer);
  handleCloseLoop = true;
};

// 轮询方法
const loop = async function (fn, time = 3000) {
  const resolveIns = arguments[2]
  const rejectIns = arguments[3]
  // 内部轮询
  if (resolveIns && rejectIns) {
    try {
      console.log("进入了带有resolve和reject的专区")
      if (handleCloseLoop) {
        console.log('手动关闭 loop')
        console.log("loop定时器", loopTimer)
        clearTimeout(loopTimer)
        return rejectIns('手动关闭 loop')
      }
      // 是否关闭 轮训
      const closeLoop = await fn()
      if (closeLoop) {
        console.log("loop定时器", loopTimer)
        clearTimeout(loopTimer)
        return resolveIns(closeLoop)
      }
      console.log("loop定时器", loopTimer)
      loopTimer = setTimeout(() => {
        loop(fn, time, resolveIns, rejectIns)
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
        console.log("loop定时器", loopTimer)
        clearTimeout(loopTimer)
        return reject('手动关闭 loop')
      }
      // 是否关闭 轮训
      const closeLoop = await fn()
      if (closeLoop) {
        console.log("loop定时器", loopTimer)
        clearTimeout(loopTimer)
        return resolve(closeLoop)
      }
      console.log("loop定时器", loopTimer)
      loopTimer = setTimeout(() => {
        loop(fn, time, resolve, reject)
      }, time)
    } catch (e) {
      console.log('e', e)
      clearTimeout(loopTimer)
      return
    }
  })
}

let fn = () => {
  countTimer = setTimeout(() => {
    reduce = reduce -1;
    if (reduce === 15) {
      clearTimeout(countTimer);
      data = {
        code: 200,
        status: 200,
        data: {
          list: [],
          name: "",
          acount: ""
        }
      };
    }
  }, 1000)
  console.log('fn定时器', countTimer);
  console.log('倒计时', reduce);
  console.log('data', data);
  return data;
}

let testLoop = async () => {
  let result = await loop(fn, 1000);
  console.log("轮询结果", result);
}

// testLoop();;