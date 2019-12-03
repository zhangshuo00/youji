import React, {Component} from 'react';
// import '../css/listSort.css';
import { NavBar } from 'antd-mobile';
// import store from './UserId';
//笔记分类页

export default class ListSort extends Component {
    constructor(props){
        super(props)
        this.state={
            data:[
                {img_path:'images/sort-test1.jpg',item:'美食'},           
                {img_path:'images/sort-test2.jpg',item:'旅行'},
            ],
        }
    }

    componentDidMount(){
        // const user =store.getState();
        // console.log(user);
        // fetch('')
        // .then((res)=>res.json())
        // .then((res)=>{
        //     this.setState({data:res.data});
        // })
    }


    render() {
        return (
            <div>
                <NavBar
                mode="light"
                onLeftClick={() => window.location='/'}
                leftContent={[
                    <img key='0' className='sort-header-person'></img>
                ]}
                rightContent={[
                    <img key='0' className='sort-header-add' onClick={() => window.location='/addTag'}></img>
                ]}  style={{paddingTop:'10px'}}
                >笔记分类</NavBar>
                <div className='sort-center'>
                {
                    this.state.data.map((tag,idx)=>
                    <li key={idx} className="sort-li" style={{background:"url(" + require("../" +tag.img_path) + ")"}} onClick={() => window.location='/'}>
                    {/* <li key={idx} className="sort-li" style={{background:"url(" + require('../images/sort-test1.jpg') + ")"}} 
                    onClick={() => window.location='/'} >  */}
                        <p>{tag.item}</p>
                    </li>)
                }
                </div>
            </div>
        )
    }
}
