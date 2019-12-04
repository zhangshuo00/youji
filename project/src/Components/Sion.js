import React, { Component } from 'react';
import { NavBar, Icon, Tabs, WingBlank, Flex} from 'antd-mobile';
import {Link,Route} from 'react-router-dom'; 
import Sionple from './Sionple'

export default class Sion extends Component {
    constructor(props){
        super();
        this.state={
            datacopy:[],
            data:[
                // {img_path:'images/b7ac218a5ff18bb0d7df7b1c955c0d8f.jpg',chdate:'11月22号',title:'做一份美味面包'},           
                // {img_path:'images/b7ac218a5ff18bb0d7df7b1c955c0d8f.jpg',chdate:'11月22号',title:'做一份美味炒菜'},
                // {img_path:'images/b7ac218a5ff18bb0d7df7b1c955c0d8f.jpg',chdate:'11月22号',title:'做一份美味炒菜2'},
                // {img_path:'images/b7ac218a5ff18bb0d7df7b1c955c0d8f.jpg',chdate:'11月22号',title:'做一份美味炒菜3'},
                // {img_path:'images/b7ac218a5ff18bb0d7df7b1c955c0d8f.jpg',chdate:'11月22号',title:'做一份美味炒菜4'},
                // {img_path:'images/b7ac218a5ff18bb0d7df7b1c955c0d8f.jpg',chdate:'11月22号',title:'做一份美味炒菜5'},
            ],
        }
    }

    componentDidMount(){
        // const user =this.getState();
        // console.log(user);
        // fetch('')
        // .then((res)=>res.json())
        // .then((res)=>{
        //     this.setState({data:res.data});
        // })
        var storage = window.localStorage;
        const post ={
            uid:'k3i297def',
            tags:1
        }
        console.log(post);
        fetch('/sion',{
            method:'POST',
            mode:'cors',
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



    render() {
        return (
            <div>
            <div>
                {/* <Link className="back">></Link> */}
                
                            <NavBar
                style={{backgroundColor:'pink',color:'white'}}
                onLeftClick={() => window.location='/sign'}
                onRightClick={() => window.location='/sionnew'}
                leftContent={[
                    <Icon key="0" type="left" style={{ marginLeft: '16px' }} />,
                  ]}
                rightContent={[
                    <Icon onClick={()=>{window.location='/sionnew'}} key="0" type="plus" style={{ marginRight: '16px' }}></Icon>
                    
                  ]}
                >美食记录</NavBar>
                {/* <img src=''></img> */}
                {/* <link clsaaName='add'>+</link> */}
                
            </div>
            {/* <div>
                <Grid data={data} columnNum={3} />
            </div> */}
            <div style={{marginTop:'3%'}}>
            {/* <WingBlank> 
                <Flex>   */}
                   
            {this.state.datacopy.map(
                            (item,index)=>(
                                <WingBlank> 
                                <Flex>
                                    {
                                         item.map((ita)=>(
                                            <Flex.Item> 
                                                <div>
                                                    <Link to={{pathname:'sionple'}}><img src={require("../" +ita.ch_headimg)} style={{height:'120px',width:'150px',borderRadius: '10px'}}></img></Link>
                                                <p>{ita.chdate}</p>
                                                <p>{ita.title}</p>
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
//                     <li key={idx} className="sort-li" style={{background:"url(" + require("../" +tag.img_path) + ")"}} onClick={() => window.location='/'}>
//                     {/* <li key={idx} className="sort-li" style={{background:"url(" + require('../images/sort-test1.jpg') + ")"}} 
//                     onClick={() => window.location='/'} >  */}
//                         <p>{tag.item}</p>
//                     <>)
//                 }
//                 </div>
//             </div>
//         )
//     }
// }
