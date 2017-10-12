// npm modules
import React, {Component} from "react";

// user modules


class Home extends Component {

    /**
     * Life cycle func
    */
    constructor(props) {
        console.log("constructor Home");
        super(props);
    }

    componentWillMount() {
        console.log("componentWillMount Home");
    }

    componentDidMount() {
        console.log("componentDidMount Home");
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps Home");

    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate Home");
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate Home");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate Home");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount Home");

    }

    /**
     * User func
     */

    render() {
        return(
            <section>
                Home
            </section>
        );
    }
}

export default Home;