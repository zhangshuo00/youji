import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import Login from './Components/Login'
import Admin from './Components/Admin'

export default class App extends Component {
	render() {
		return (
		<Router>
			<Route exact path='/' component={Login}/>
			<Route path='/admin' component={Admin}/>
		</Router>
		)
	}
}

