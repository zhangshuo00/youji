import React, { Component } from 'react';
import { NavBar, Icon} from 'antd-mobile';
import '../css/Sionple.css';


export default class AppHome extends Component {
    
    constructor(props){
        super();
        this.state={
            data:[
                {img_path:'images/859040ae5adb082bb392a44f5187a55e.jpg',title:'如何做出一份美味的面包',p1:'1.首先准备好材料，面粉、鸡蛋、适量的水、黄油和盐。',
                p2:'2.将除黄油外的所有材料放在一起揉成团。',p3:'3.分成份放入烤箱发酵，刷上蛋液大火170度烤20分钟即可。',
                p4:'为了制作面团，将所有的面团配料放在装有面团钩的台式搅拌机的碗中。 低速搅拌3分钟，如果需要的话刮一下搅拌碗的一侧。 中速混合3分钟。 把面团转移到一个轻轻的面粉10英寸派或平板晚餐。 轻轻地将面团顶部涂上，用塑料包好，以免干燥。 冷藏过夜。'},           
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
        var copya = this.state.data;
        var list=[];
        for(var i=0;i<copya.length;i+=2){
            list.push(copya.slice(i,i+2));
        }
        console.log(list);
        this.setState({
            datacopy:list
        })
    }



    render() {
        return (
            <div>
                <div>
                <NavBar
                style={{backgroundColor:'pink',color:'white'}}
                onLeftClick={() => window.location='/sion'}
                leftContent={[
                    <Icon key="0" type="left" style={{ marginLeft: '16px' }} />,
                  ]}
                >页面内容</NavBar>      
                </div>
                {this.state.data.map(
                            (item,index)=>(
                                <div>
                                <div>
                                                <img src={require("../" +item.img_path)} style={{height:'196px',width:'100%'}}></img>
                                            </div>
                                            <div className='sion'>
                                                <p><span style={{marginRight:'60%'}}>吃的</span> <span style={{marginRight:'2%',color:'gray'}}>By</span> <span>yangfan</span></p>
                            <p className='p2'>{item.title}</p>
                                                <p>{item.p1}</p>
                                                <p>{item.p2}</p>
                                                <p>{item.p3}</p>
                                                <p>{item.p4}</p>
                                            </div>
                                            </div>
                            )
                            )}
            
            </div>
        )
    }
}

