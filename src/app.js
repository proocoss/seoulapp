// npm modules
import React, {Component} from "react";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import ReduxThunk from 'redux-thunk';

class App extends Component {

	render() {
		return (
			<div>Test</div>
		);
	}
}

export default App;