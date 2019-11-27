import React, { Component } from 'react';
import './Person.css';
export default class AppHome extends Component {
    render() {
        return (
            <div>
            <div className="picture">
                <img src={require(`../images/2-191015104P02N.jpg`)} style={{width: '100%',height: '154px'}}></img>
            </div>
            <div className="p">
                <p>有纪</p>
                <p>做一份美食，看一场电影，
来一场说走就走的旅行，
谈一场轰轰烈烈的恋爱。
读万卷书，行万里路。
最好的时光遇见最好的你，
关注无，给你更多精彩。

</p>
            </div>
           <div className="but">
                <button className="but1">关注</button>
                <button className="but2">私信</button>
           </div>
                
            </div>
        )
    }
}

