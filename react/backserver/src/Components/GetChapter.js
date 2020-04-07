import React, { Component } from 'react'

export default class GetChapter extends Component {
    constructor(props){
        super(props);
        this.state ={
            data:[]
        }
    }

    componentDidMount(){
        fetch('/backGetChapter',{
            method:'GET',
            mode:'cors',
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({
                data : data
            })
        })
    }

    render() {
        return (
            <div>
                <table border="1">
                    <tr>
                        <th>chid</th>
                        <th>uid</th>
                        <th>文章标题</th>
                        <th>文章内容</th>
                        <th>收藏数</th>
                        <th>喜欢数</th>
                    </tr>
                    {
                        this.state.data.map((item,idx)=>(
                            <tr>
                                <td>{item.chid}</td>
                                <td>{item.uid}</td>
                                <td>{item.title}</td>
                                <td>{item.context}</td>
                                <td>{item.favorites}</td>
                                <td>{item.likes}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        )
    }
}
