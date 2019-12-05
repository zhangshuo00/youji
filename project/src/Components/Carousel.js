import React from 'react';
import { Carousel, WingBlank,WhiteSpace} from 'antd-mobile';
import '../css/carousel.css'

export default class Carousels extends React.Component {

  skip(){
    // const Storage=window.localStorage;
    // if(Storage.uid){
    //   window.location='./login'
    // }else{
    //   window.location='./sort'
    // }
    window.location='./login';
  }

  render() {
    return (
      <div className='car-d'>
      <WhiteSpace size="lg" />
      <WingBlank size="lg">
        <Carousel
          autoplay={true}
          infinite
        >
          <div className='car-1'>
            <img  src={require(`../images/sort-test1.jpg`)}/>
            <h1>做一份面包</h1>
            <p>面包的制作流程和心得体会</p>
          </div>
            <div className='car-1'>
            <img  src={require(`../images/sort-test2.jpg`)}/>
            <h1>唯美的旅游胜地</h1>
            <p>记录美好旅行回忆</p>
          </div>
          <div className='car-1'>
            <img  src={require(`../images/2-191015104P02N.jpg`)}/>
            <h1>做最美的自己</h1>
            <p>如何保养皮肤用合适的方法</p>
          </div>
          <div className='car-1'>
            <img  src={require(`../images/tagsImgTest.jpg`)}/>
            <h1>视觉享受</h1>
            <p>看，你又添加了一批想看的
            电影,快一睹精彩</p>
          </div>
        </Carousel>
      </WingBlank>
      <button className='car-b' onClick={this.skip} ><p className='car-p' >跳过</p></button>
      </div>
    );
  }
}
