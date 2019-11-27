import React, { Component } from 'react';
import { NavBar, Icon, Tabs, WingBlank, Carousel, Grid, Flex, WhiteSpace} from 'antd-mobile';
import './Sionple.css';


export default class AppHome extends Component {
    render() {
        return (
            <div>
                <div>
                <NavBar
                style={{backgroundColor:'pink',color:'white'}}
                leftContent={[
                    <Icon key="0" type="left" style={{ marginLeft: '16px' }} />,
                  ]}
                >页面内容</NavBar>
                </div>
            <div>
                <img src={require(`../images/859040ae5adb082bb392a44f5187a55e.jpg`)}></img>
            </div>
            <div className='sion'>
                <p className='p1'><span style={{marginRight:'60%'}}>吃的</span> <span style={{marginRight:'2%',color:'gray'}}>By</span> <span>yangfan</span></p>
                <p className='p2'>如何做出一份美味的面包</p>
                <p>1.首先准备好材料，面粉、鸡蛋、适量的水、黄油和盐。</p>
                  <p>2.将除黄油外的所有材料放在一起揉成团。</p>
                  <p>3.分成份放入烤箱发酵，刷上蛋液大火170度烤20分钟即可。</p>
                  <p>为了制作面团，将所有的面团配料放在装有面团钩的台式搅拌机的碗中。 低速搅拌3分钟，如果需要的话刮一下搅拌碗的一侧。 中速混合3分钟。 把面团转移到一个轻轻的面粉10英寸派或平板晚餐。 轻轻地将面团顶部涂上，用塑料包好，以免干燥。 冷藏过夜。</p>

            </div>
            </div>
        )
    }
}

