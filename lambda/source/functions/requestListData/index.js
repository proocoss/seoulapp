const request = require("request");
const xml2js = require('xml2js');

exports.handler = (_event, _context, _callback) => {
    let url = "http://openapi.youth.go.kr/openapi/service/";
    let key = "HF1eUr96KfQkuZe3Pl1v0stWJvCU8eH72E%2BPGfe%2BiUOMDUlk0P1%2FMgO4SpXf0qq74hzOF7ctuBDJl2L7aXXOsw%3D%3D";
    let path = _event.params.path;
    let apiPath = path.method;
    let pageNo = path.count / 10;
    let year;
    let options = {
        url : url,
        method : "GET",
        timeout : 20 * 1000
    };
    
    _context.callbackWaitsForEmptyEventLoop = false;

    switch(apiPath) {
        case "getCertiProgrmList" :
            options.url = options.url + "YouthActivInfoCertiSrvc/" + apiPath + "?serviceKey=" + key + "&numOfRows=10&pageNo=" + pageNo; 
            break;
        case "getVolProgrmList" :
            options.url = options.url + "YouthActivInfoVolSrvc/" + apiPath + "?serviceKey=" + key + "&numOfRows=10&pageNo=" + pageNo; 
            break;
        case "getVacationProgrmList" :
            options.url = options.url + "YouthActivInfoVacationSrvc/" + apiPath + "?serviceKey=" + key + "&numOfRows=10&pageNo=" + pageNo; 
            break;
    }

    request(options, (_reqError, _response, _body) => {
        let statusCode = _response.statusCode;
        let parser = new xml2js.Parser();
        let result;

        if (statusCode === 200) {
            parser.parseString(_body, (_parserErr, _result) => {
                let header = _result.response.header[0];
                let body = _result.response.body[0];
                let item = body.items[0].item;

                result = {
                    resultCode : header.resultCode[0],
                    resultMsg : header.resultMsg[0],
                    numOfRows : body.numOfRows[0],
                    pageNo : body.pageNo[0],
                    totalCount : body.totalCount[0],
                    data : []
                };

                if (item) {
                    switch(apiPath) {
                        case "getCertiProgrmList" :
                            item.map((_item, _idx) => {
                                result.data.push(
                                    {
                                        key1 : _item.key1 ? _item.key1[0] : "",
                                        key2 : _item.key2 ? _item.key2[0] : "",
                                        nums : _item.nums ? _item.nums[0] : "",
                                        organNm : _item.organNm ? _item.organNm[0] : "",
                                        pgmNm : _item.pgmNm ? _item.pgmNm[0] : "",
                                        price : _item.price ? _item.price[0] : "",
                                        target : _item.target ? _item.target[0] : "",
                                        sdate : _item.sdate ? _item.sdate[0] : ""
                                    }
                                );
                            });
                            break;
                        case "getVolProgrmList" :
                            item.map((_item, _idx) => {
                                result.data.push(
                                    {
                                        key1 : _item.key1 ? _item.key1[0] : "",
                                        nums : _item.nums ? _item.nums[0] : "",
                                        organNm : _item.organNm ? _item.organNm[0] : "",
                                        pgmNm : _item.pgmNm ? _item.pgmNm[0] : "",
                                        price : _item.price ? _item.price[0] : "",
                                        target : _item.target ? _item.target[0] : "",
                                        sdate : _item.sdate ? _item.sdate[0] : ""
                                    }
                                );
                            });
                            break;
                        case "getVacationProgrmList" :
                            item.map((_item, _idx) => {
                                result.data.push(
                                    {
                                        key1 : _item.key1 ? _item.key1[0] : "",
                                        organNm : _item.organNm ? _item.organNm[0] : "",
                                        pgmNm : _item.pgmNm ? _item.pgmNm[0] : "",
                                        price : _item.price ? _item.price[0] : "",
                                        target : _item.target ? _item.target[0] : "",
                                        sdate : _item.sdate ? _item.sdate[0] : "",
                                        edate : _item.edate ? _item.edate[0] : "",
                                        certYn : _item.certYn ? _item.certYn[0] : ""
                                    }
                                );
                            });
                            break;
                    }   
                }
            });
        }

        _callback(null, result);
    });
};