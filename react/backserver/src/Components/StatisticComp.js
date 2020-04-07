import React, { Component } from 'react'
import { Statistic, Row, Col, Button } from 'antd'

export default class StatisticComp extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:''
        }
    }
    componentDidMount(){
        // 获取当前所用用户的数量和文章的数量以及分享的文章的数量
        fetch('/getUserCount',{
            method:'GET',
            mode:'cors',
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            this.setState({
                data:data
            })
        })
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <Col span={12} offset={3}>
                    <Statistic title="当前所有用户数量" value={this.state.data.userCount} />
                    </Col>

                    <Col span={5}>
                    <Statistic title="当前所有上传文章的数量" value={this.state.data.chapterCount} />
                    </Col>
                </Row>
            </div>
        )
    }
}
