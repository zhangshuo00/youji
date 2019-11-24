import './index.css'
import './index.less'
import {render} from 'react-dom'
import React from 'react'
import App from './App'

// let app = <div>
//     <h1>hello webpack</h1>
//     <img src={require('./imgs/暴风截图2018597130078.jpg')}/>
// </div>
render(<App/>,document.getElementById('root'));