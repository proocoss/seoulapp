// npm modules
import React, {Component} from "react";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import ReduxThunk from 'redux-thunk';

// user modules
import Reducer from "modules/index";
import {Main, Home, Activity, International, Serve, Detail, DetailContent, Search, SearchContent} from "views/pages";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
    Reducer, 
    composeEnhancers(
        applyMiddleware(ReduxThunk)
    )
);

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route exact path="/" component={Main}>
                        <IndexRoute component={Home} />
                        <Route path="activity" component={Activity} />
                        <Route path="serve" component={Serve} />
                        <Route path="international" component={International} />
                    </Route>
                    <Route path="/detail" component={Detail}>
                        <Route path=":page/:id" component={DetailContent} />
                    </Route>
                    <Route path="/search" component={Search}>
                        <Route path=":page" component={SearchContent} />
                    </Route>
                </Router>
            </Provider>
        );
    }
}

export default App;