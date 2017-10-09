// npm modules
import React, {Component} from "react";

// user modules
import {MainHeader} from "views/components";

class Main extends Component {
    constructor(props) {
        console.log("constructor Main");
        super(props);
    }

    componentWillMount() {
        console.log("componentWillMount Main");
    }

    componentDidMount() {
        console.log("componentDidMount Main");
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps Main");

    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate Main");
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate Main");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate Main");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount Main");
    }

    render() {
        return (
            <div>
                <MainHeader />
                {this.props.children}
            </div>
        );
    }
}

export default Main;