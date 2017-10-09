// npm modules
import React, {Component} from "react";

// user modules


class Content extends Component {
    constructor(props) {
        console.log("constructor Content");
        super(props);

        this.createContent = this.createContent.bind(this);
    }

    componentWillMount() {
        console.log("componentWillMount Content");
    }

    componentDidMount() {
        console.log("componentDidMount Content");
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps Content");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate Content");
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate Content");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate Content");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount Content");
    }

    /**
     * User func
     */
    createContent() {
        let content;
        let item = this.props.detailData;

        switch(this.props.page) {
            case "activity" :
                content = (
                    <ul>
                        <li>{item.nums}</li>
                        <li>{item.organNm}</li>
                        <li>{item.price}</li>
                        <li>{item.target}</li>
                        <li>{item.managerNm}</li>
                        <li>{item.email}</li>
                        <li>{item.tel}</li>
                        <li dangerouslySetInnerHTML={{ __html : item.info1.replace(/\n/g, "<br>") }}></li>
                        <li dangerouslySetInnerHTML={{ __html : item.info2.replace(/\n/g, "<br>") }}></li>
                    </ul>
                );
                break;
            case "serve" :
                content = (
                    <ul>
                        <li>{item.organNm}</li>
                        <li>{item.price}</li>
                        <li>{item.target}</li>
                        <li>{item.sdate}</li>
                        <li>{item.managerNm}</li>
                        <li>{item.addr}</li>
                        <li>{item.zip}</li>
                        <li>{item.place}</li>
                        <li>{item.tel}</li>
                        <li dangerouslySetInnerHTML={{ __html : item.info1.replace(/\n/g, "<br>") }}></li>
                        <li dangerouslySetInnerHTML={{ __html : item.info2.replace(/\n/g, "<br>") }}></li>
                    </ul>
                );
                break;
            case "international" :
                content = (
                    <div dangerouslySetInnerHTML={{ __html : item.arContent.replace(/\n/g, "<br>") }}></div>
                );
                break;
            default :
                break;
        }

        return content;
    }

    render() {
        return (
            <section>
                { this.createContent() }
            </section>
        );
    }
}

export default Content;