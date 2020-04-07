import React, { Component } from 'react'

export default class GetUsers extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : []
        }
    }

    componentDidMount(){
        fetch('/backGetUsers',{
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
        console.log(this.state.data)
    }

    render() {
        return (
            <div>
                <table border="1">
                    <tr>
                        <th>uid</th>
                        <th>注册邮箱</th>
                        <th>昵称</th>
                        <th>性别</th>
                        <th>个性签名</th>
                        <th>密码</th>
                    </tr>
                    {
                        this.state.data.map((item,idx)=>(
                            <tr>
                                <td>{item.uid}</td>
                                <td>{item.uemail}</td>
                                <td>{item.uname}</td>
                                <td>{item.usex}</td>
                                <td>{item.signature}</td>
                                <td>{item.upassword}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        )
    }
}
