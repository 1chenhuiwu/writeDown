// 我们希望读取数据
const fs = require('fs');
const school = {};
fs.readFile('d:\\project\\documentation\\name.txt', 'utf8', (err,data) => {
  console.log(err);
  school['name'] = data;
})

fs.readFile('d:\\project\\documentation\\name.txt', 'utf8', (err,data) => {
  school['age'] = data;
console.log(school);
})