// npm modules
import React, {Component} from "react";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import ReduxThunk from 'redux-thunk';

// user modules
import Reducer from "modules/index";
import {Main, Activity, International, Serve, Detail, Content} from "views/pages";

let store = createStore(
    Reducer, 
    compose(
        applyMiddleware(ReduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route exact path="/" component={Main}>
                        <IndexRoute component={Activity} />
                        <Route path="serve" component={Serve} />
                        <Route path="international" component={International} />
                    </Route>
                    <Route path="/detail" component={Detail}>
                        <Route path=":page/:id" component={Content} />
                    </Route>
                </Router>
            </Provider>
        );
    }
}

export default App;