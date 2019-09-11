// 发布订阅模式
const fs = require('fs');
const school = {};
const e = {
  arr: [],
  on(fn) {
    this.arr.push(fn);
  },
  emit() {
    this.arr.forEach(fn => fn());
  }
}
e.on(() => { // 订阅
  console.log('ok');
});

e.on(() => { // 订阅 ，先写好叫订阅
  if (Object.keys(school).length === 2) {
    console.log(school);
  }
})
fs.readFile('d:\\project\\documentation\\name.txt', 'utf8', (err, data) => {
  school['name'] = data;
  e.emit(); // 发布
})

fs.readFile('d:\\project\\documentation\\name.txt', 'utf8', (err, data) => {
  school['age'] = data;
  e.emit(); // 发布
});

// 发布和订阅是没有直接联系的，他们要用的东西放在arr数组