import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import Login from './Components/Login'

export default class App extends Component {
	render() {
		return (
		<Router>
			<Route path='/' component={Login}/>
		</Router>
		)
	}
}

