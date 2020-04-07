import React, { Component } from 'react'
import { Form, Icon, Input, Button, Row, Col } from 'antd';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    handleSubmit = () => {
        const post = {
            aduser : document.getElementById('admin').value,
            adpassword : document.getElementById('pwd').value
        }

        fetch('/backLogin',{
            method : 'POST',
            mode :'cors',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.msg === 'success'){
                window.location = '/admin'
            }else if(data.msg === 'pwderror'){
                alert('密码错误');
            }else{
                alert('账户不存在')
            }
        })
    };
    render() {
        return (
            <div>
                <Row style={{marginTop:'10%'}} type="flex" align="middle">
                    <Col span={8} offset={10}>
                        <h1>有纪后台管理系统</h1>
                    </Col>
                </Row>
                <Row style={{marginTop:'100px'}} type="flex" align="middle">
                    <Col span={8} offset={8}>
                    {/* col-12 col-offset-6 */}
                        <Form className="login-form">
                        <Form.Item>
                            <Input id='admin'
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="管理员账号"
                            />
                        </Form.Item>
                        {/* 密码框 */}
                        <Form.Item>
                            <Input id='pwd'
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            />
                        </Form.Item>
                        {/* 登录按钮 */}
                        <Row type="flex" align="middle">
                            <Col span={8} offset={8}>
                                <Form.Item>
                                    <Button onClick={this.handleSubmit} style={{width:'100%'}} type="primary" className="login-form-button">
                                    登录
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                        
                        </Form>
                    </Col>
                </Row>
                
            </div>
        )
    }
}
