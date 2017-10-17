// npm modules
import React, {Component} from "react";
import classNames from 'classnames/bind';

// style
import content from "./content.css";

const st = classNames.bind(content);

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
                    <div className={ st("content-wrap") }>
                        <table className={ st("table-wrap") }>
                            <tbody>
                               <tr className={ st("row-wrap") }>
                                  <th className={ st("title") }>프로그램명</th>
                                  <td className={ st("value") }>{item.pgmNm}</td>
                               </tr>
                               <tr className={ st("row-wrap") }>
                                  <th className={ st("title") }>참가비</th>
                                  <td className={ st("value") }>{item.price}</td>
                               </tr>
                               <tr className={ st("row-wrap") }>
                                  <th className={ st("title") }>참가대상</th>
                                  <td className={ st("value") }>{item.target}</td>
                               </tr>
                               <tr className={ st("row-wrap") }>
                                  <th className={ st("title") }>담당장</th>
                                  <td className={ st("value") }>{item.managerNm}</td>
                               </tr>
                               <tr className={ st("row-wrap") }>
                                  <th className={ st("title") }>이메일</th>
                                  <td className={ st("value") }>{item.email}</td>
                               </tr>
                               <tr className={ st("row-wrap") }>
                                  <th className={ st("title") }>전화번호</th>
                                  <td className={ st("value") }>{item.tel}</td>
                               </tr>
                           </tbody>
                        </table>
                        <div className={ st("detail-wrap") }>
                            <div className={ st("detail") } dangerouslySetInnerHTML={{ __html : item.info1.replace(/\n/g, "<br>") }}></div>
                            <div className={ st("detail") } dangerouslySetInnerHTML={{ __html : item.info2.replace(/\n/g, "<br>") }}></div>
                        </div>
                    </div>
                );
                break;
            case "serve" :
                content = (
                    <div className={ st("content-wrap") }>
                        <table className={ st("table-wrap") }>
                            <tbody>
                               <tr className={ st("row-wrap") }>
                                  <th className={ st("title") }>프로그램명</th>
                                  <td className={ st("value") }>{item.pgmNm}</td>
                               </tr>
                               <tr className={ st("row-wrap") }>
                                  <th className={ st("title") }>참가비</th>
                                  <td className={ st("value") }>{item.price}</td>
                               </tr>
                               <tr className={ st("row-wrap") }>
                                  <th className={ st("title") }>참가대상</th>
                                  <td className={ st("value") }>{item.target}</td>
                               </tr>
                               <tr className={ st("row-wrap") }>
                                  <th className={ st("title") }>담당장</th>
                                  <td className={ st("value") }>{item.managerNm}</td>
                               </tr>
                               <tr className={ st("row-wrap") }>
                                  <th className={ st("title") }>주소</th>
                                  <td className={ st("value") }>{item.addr}</td>
                               </tr>
                               <tr className={ st("row-wrap") }>
                                  <th className={ st("title") }>전화번호</th>
                                  <td className={ st("value") }>{item.tel}</td>
                               </tr>
                           </tbody>
                        </table>
                        <div className={ st("detail-wrap") }>
                            <div className={ st("detail") } dangerouslySetInnerHTML={{ __html : item.info1.replace(/\n/g, "<br>") }}></div>
                            <div className={ st("detail") } dangerouslySetInnerHTML={{ __html : item.info2.replace(/\n/g, "<br>") }}></div>
                        </div>
                    </div>
                    /*
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
                    */
                );
                break;
            case "international" :
                content = (
                    <div className={ st("custom-detail") } dangerouslySetInnerHTML={{ __html : item.arContent.replace(/\n/g, "<br>") }}></div>
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