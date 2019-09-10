  /* class类*/
  // ES5写法
  function Point(x, y){
    this.x = x;
    this.y = y;
  }

  Point.prototype.toString = function () {
    return `(${this.x},${this.y})`
  }

  var p = new Point(1, 2);
  /* 
  ES6写法，可以做只是一个语法糖，它的绝大部分功能ES5都能做到
  新的class写法只是让对象原型的写法更加清晰，更像面向对象编程的语法而已
  上面的代码，用ES6改写，就是下面这样
  */
  class Point{
    constructor(x, y){
      this.x = x;
      this.y = y;
    }

    toString() {
      return `(${this.x},${this.y})`
    }
  }
  /* 
  1.构造函数里面不要加","分隔，加了会报错
  2.方法的前面不要加function关键字
  3.constructor方法，里面的this关键字代表实例对象
  */
  class Point{
    //...
  }
  typeof Point // "function"
  Point === Point.prototype.constructor //true

  //class 定义的类，和构造函数的用法完全一致，直接用new命令使用
  //Object.assign 方法可以方便地一次向类添加多个方法

  /*
  类和构造函数区别：
  1. 类内部所有定义的方法都是不可枚举的，构造函数写的方法是可以枚举的
  2. 类必须使用new调用，构造函数不用new也可以执行
  3. 类和模块的内部默认就是严格模式的，不需要使用use strict
  4. 类不存在变量提升，构造函数会有
  */

  //constructor
  /*  
  constructor 方法是类的默认方法，通过new命令生成对象实例是，自动调用该方法。
  一个类必须有constructor方法，如果没有显示定义，一个空的constructor方法会被默认添加。
  */
  class Point{}
  // 等同于
  class Point{
    constructor () {};
  }

  //constructor 方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
  class Foo {
    constructor() {
        return Object.create(null);
    }
  }
  new Foo() instanceof Foo // false
  // 上面代码中，constructor 函数返回一个全新的对象，结果导致失利对象不是Foo类的实例

  //类必须使用new调用，构造函数不用new也可以执行
  class Foo{
    constructor(){
      return Object.create(null);
    }
  }

  Foo() //TypeError: Class constructor Foo cannot be invoked without 'new'

  function Foo() {
    return Object.create(null);
  }

  Foo() //无报错
  new Foo //无报错

  //静态方法
  //在方法前面加上static关键字，就变是该方法不会被实例继承，而是通过类来调用，这就称为静态方法
  class Foo{
    constructor(){}
    static classMethod(){}

  }

  //extends super
  //父类的静态方法可以被子类继承
  //class 子类 extends 父类
  class Foo {
    static classMethod(){
      return "hello"
    }
  }

  class Bar extends Foo {}
  Bar.classMethod() // "hello"

  // 静态方法可以用super这个属性调用
  class Foo {
    static classMethod() {
      return "hello"
    }
  }
  class Bar extends Foo {
    static classMethod() {
      return super.classMethod() + ',too'
    }
  }
  Bat.classMethod() // "hello,too"

  // 静态属性
  class Foo {
    static private = 3
  }
  Foo.private // 3

  // 实例属性的新写法
  // 好处：代码简洁，一目了然
  class Foo {
    constructor (){
      this.count = 3
      this.name = "haha"
      htis.age = 4
    }

    followMe() {}
  }

  // 新写法
  class Foo {
    count = 3
    name = 'haha'
    age = 4
    followMe() {}
  }