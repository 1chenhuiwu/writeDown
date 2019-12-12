const after = (times, fn) => { // after 可以生成新的函数等待函数执行次数达到我的预期时执行
  return () => {
    if (--times === 0) {
      fn();
    }
  }
}

let newAfter = after(3, () => {
  console.log('三次后调用');
})
newAfter();
newAfter();
newAfter();