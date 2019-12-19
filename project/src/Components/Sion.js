import React, { Component } from 'react';
import { NavBar, Icon, Tabs, WingBlank, Flex,Modal} from 'antd-mobile';
import {Link,Route} from 'react-router-dom'; 
import Sionple from './Sionple';
const alert = Modal.alert;
let press;

export default class Sion extends Component {
    constructor(props){
        super(props);
        this.state={
            datacopy:[],
            data:[],
        }
    }

    componentDidMount(){
        const post ={
            uid:localStorage.getItem('uid'),
            tags:decodeURI(window.location.hash.split('=')[1])
        }
        // localStorage.setItem('tags',decodeURI(window.location.hash.split('=')[1]))
        console.log(post);
        console.log(localStorage)
        fetch('https://majia.hbsdduckhouse.club/sion',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState((state)=>{
                return {
                    data:data
                }
            },()=>{
                var copya = this.state.data;
                var list=[];
                for(var i=0;i<copya.length;i+=2){
                    list.push(copya.slice(i,i+2));
                }
                // console.log(list);
                this.setState({
                    datacopy:list
                })
            })
            console.log(this.state.data);
            // var copya = this.state.data;
            // var list=[];
            // for(var i=0;i<data.length;i+=2){
            //     list.push(data.slice(i,i+2));
            // }
            // this.setState({
            //         datacopy:list
            //     })
            // 根据返回的消息，渲染响应的页面
        })

        
    }

    jumpToSionple = (e) =>{
        // 跳转到笔记详情页，获取点击文章的chid
        // const chid = e.target.getAttribute('data-index');
        // console.log(e.target.getAttribute('data-index'))
        window.location = './index.html#/sionple?chid=' + e;
    }
    handleTouchEnd(){
        clearTimeout(press)
    }

    touchStart(e){
        const that = this;
        press = setTimeout(function(){
            alert('是否删除该分类', '并删除该分类下所有笔记', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => that.delTags(e)},
                ])
        }, 500);
    }
    delTags=(e)=>{
        // console.log(e)
        const storage = window.localStorage;
        const post ={
            uid:storage.uid,
            chid:e
        }
        console.log(post);
        fetch('https://majia.hbsdduckhouse.club/delSionple',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            window.location.reload(); //重新刷新该页面
            // this.setState({
            //     datas:data
            // })
            // 根据返回的消息，渲染响应的页面
        })
    }


    render() {
        return (
            <div>
            <div>
                {/* <Link className="back">></Link> */}
                
                            <NavBar
                            style={{backgroundColor:'#FAA755'}}
                mode="light"
                onLeftClick={() => window.history.back(-1)}
                // onRightClick={() => window.location='/index.html#/sionnew'}
                leftContent={[
                    <Icon key="0" type="left" style={{ color:'#FFF'}} />,
                  ]}
                rightContent={[
                    <Icon key="0" onClick={()=>{window.location='/index.html#/sionnew?tags='+decodeURI(window.location.hash.split('=')[1])}} key="0" type="plus" style={{ marginRight: '16px',color:'#FFF'}}></Icon>
                    
                  ]}
                >{decodeURI(window.location.hash.split('=')[1])}</NavBar>
                {/* <img src=''></img> */}
                {/* <link clsaaName='add'>+</link> */}
                
            </div>
            {/* <div>
                <Grid data={data} columnNum={3} />
            </div> */}
            <div style={{marginTop:'3%',paddingLeft:'3%'}}>
            {/* <WingBlank> 
                <Flex>   */}                   
            {this.state.datacopy.map(
                (item,index)=>(
                    <WingBlank style={{textAlign:'center'}}> 
                    <Flex>
                        {
                        item.map((ita)=>(
                            <Flex.Item style={{backgroundColor:'#fff',paddingLeft:'2%',paddingTop:'5px',borderRadius:'2px',marginBottom:'5px'
                            }} onTouchStart={()=>this.touchStart(ita.chid)} onTouchEnd={this.handleTouchEnd}> 
                                <div onClick={()=>this.jumpToSionple(ita.chid)}>
                                    <img data-index={ita.chid} src={require("../" +ita.ch_headimg)} style={{height:'120px',width:'150px',borderRadius: '10px'}}></img>
                                    <p>{ita.chdate}</p>
                                    <p style={{marginBottom:'5px'}}>{ita.title}</p>
                                </div>
                            </Flex.Item>
                        ))
                        }
                    </Flex> 
                    </WingBlank> 
                )
            )}
            <div>
        <Route path={`sionple`} component={Sionple} />
      </div>
            {/* )} */}
            
              {/* </Flex> 
              </WingBlank>  */}
              {/* <Flex.Item> 
                    <div><img src={require(`../images/20180805121533_tjjgs.jpeg`)} style={{height:'30%',width:'100%',borderRadius: '10px'}}></img>
                    <p>11月22号</p>
                    <p>做一份美味面包</p>
                    </div>
                </Flex.Item>
                <Flex.Item>
                    <div><img src={require(`../images/20180805121533_tjjgs.jpeg`)} style={{height:'30%',width:'100%',borderRadius: '10px'}}></img>
                    <p>11月22号</p>
                    <p>做一份美味炒菜</p>
                    </div>
                </Flex.Item> */}
                
                {/* <Flex>
                <Flex.Item> <div><img src={require(`../images/20180805121533_tjjgs.jpeg`)} style={{height:'30%',width:'100%',borderRadius: '10px'}}></img><p>11月22号</p>
                    <p>做一份美味面包</p></div></Flex.Item>
                <Flex.Item><div><img src={require(`../images/20180805121533_tjjgs.jpeg`)} style={{height:'30%',width:'100%',borderRadius: '10px'}}></img><p>11月22号</p>
                    <p>做一份美味炒菜</p></div></Flex.Item>
                </Flex>
                <Flex>
                <Flex.Item> <div><img src={require(`../images/20180805121533_tjjgs.jpeg`)} style={{height:'30%',width:'100%',borderRadius: '10px'}}></img><p>11月22号</p>
                    <p>做一份美味面包</p></div></Flex.Item>
                <Flex.Item><div><img src={require(`../images/20180805121533_tjjgs.jpeg`)} style={{height:'30%',width:'100%',borderRadius: '10px'}}></img><p>11月22号</p>
                    <p>做一份美味炒菜</p></div></Flex.Item>
                </Flex>
                <Flex>
                <Flex.Item> <div><img src={require(`../images/20180805121533_tjjgs.jpeg`)} style={{height:'30%',width:'100%',borderRadius: '10px'}}></img><p>11月22号</p>
                    <p>做一份美味面包</p></div></Flex.Item>
                <Flex.Item><div><img src={require(`../images/20180805121533_tjjgs.jpeg`)} style={{height:'30%',width:'100%',borderRadius: '10px'}}></img><p>11月22号</p>
                    <p>做一份美味炒菜</p></div></Flex.Item>
                </Flex> */}
            </div>

            </div>
        )
    }
}

//笔记分类页

// export default class ListSort extends Component {
    

    


//     render() {
//         return (
//             <div>
//                 <div className='sort-center'>
//                 {
//                     this.state.data.map((tag,idx)=>
//                     <li key={idx} className="sort-li" style={{background:"url(" + require("../" +tag.img_path) + ")"}} onClick={() => window.location='/index.html#/'}>
//                     {/* <li key={idx} className="sort-li" style={{background:"url(" + require('../images/sort-test1.jpg') + ")"}} 
//                     onClick={() => window.location='/index.html#/'} >  */}
//                         <p>{tag.item}</p>
//                     <>)
//                 }
//                 </div>
//             </div>
//         )
//     }
// }
