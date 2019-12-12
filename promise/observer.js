// 观察者要存在被观察者里面

class Subject { // 被观察者
  constructor(name) {
    this.arr = [];
    this.state = "我很开心";
  }

  attach(o) { // 订阅
    this.arr.push(o);
  }
  setState(newState) { // 发布
    this.state = newState;
    this.arr.forEach(o => o.update(newState));
  }
}

class Observer { // 观察者
  constructor(name) {
    this.name = name;
  }

  update(newState) {
    console.log(this.name + ':小宝宝.' + newState);
  }
}

let o1 = new Observer('我');
let o2 = new Observer('我媳妇');
let s = new Subject('小宝宝');
s.attach(o1);
s.attach(o2);
s.setState('不开心了')
console.log(s);