import React, { PureComponent } from "react";

// 装饰器为,组件添加age属性
function addAge(Target: Function) {
    Target.prototype.age = 111
}
// 使用装饰圈
@addAge
class Class extends PureComponent {

    age?: number

    render() {
        return (
            <h2>This is a Class component---{this.age}</h2>
        )
    }
}

export default Class
