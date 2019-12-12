// 高阶函数
// 两种方式，一个是函数的参数是一个函数（回调）
// 一个是 返回一个函数（拆分函数）

// 函数的before
// 希望核心的逻辑提取出来，在外面  
const say= () => {

}

// 柯理化函数：将一个函数拆分成多个函数
// 高阶函数中包含柯理化函数
// 函数的长度就是参数的个数

const add = (a,b,c,d,e) => {
  return a + b + c + d + e
}

const curring = (fn , arr = []) => {
  let len = fn.length
  return (...args) => {
    console.log(args);
    arr = arr.concat(args);
    console.log(arr);
    if(arr.length < len){
      return curring(fn, arr)
    }
    return fn(...arr)
  }
}
let r = curring(add)(1)(2)(3)(4)(5)
console.log(r)

 const checkType = (type, content) => {
   return Object.prototype.toString.call(content) === `[object ${type}]`;
 }

 let types = ['Number', "String", "Boolean"];
 let utils = {};
 types.forEach( type => {
   utils["is" + type] = curring(checkType)(type);
 });
 console.log(utils.isString('hello'))