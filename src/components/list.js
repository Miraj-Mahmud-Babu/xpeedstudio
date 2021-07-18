import {Table, Input} from 'antd'; // import and design

import {useEffect, useState} from 'react';

function List() {

    const [mainData, setMainData] = useState();
    const [dataSource, setDataSource] = useState();

    const [columns, setColumn] = useState();


    useEffect(() => { // pull data from api
        fetch("http://localhost/api/list.php").then(res => res.json()).then((result) => {
            console.log("skl ", result.data.rows);
            console.log("skl ", result.data.headers[0]);
            const ar = []
            Object.keys(result.data.headers[0]).map((val, index) => {
                ar.push({title: val, dataIndex: val, key: index})
                console.log("skl 2", val)
            })

            setColumn(ar)


            setDataSource(result.data.rows)
            setMainData(result.data.rows)
        }, (error) => {})

    }, [])
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    const onSearch = (e) => {
        console.log("on skl", isNumber(e.target.value));
        // if(typeof(e.target.value))
        if (e.target.value.length > 0) {
            let temp = [];

            if (isNumber(e.target.value) && parseInt(e.target.value) < 1000) {
                console.log("skl in  id")
                mainData.map((val, i) => {
                    if (mainData[i].id.toString().includes(e.target.value.toLowerCase())) {
                        temp.push(mainData[i]);
                    }
                })
            } else {
                console.log("skl in text or date")
                if (e.target.value.includes("-") || isNumber(e.target.value)) {
                    console.log("skl in  date")
                    mainData.map((val, i) => {
                        if ((mainData[i].created_at && mainData[i].created_at.toLowerCase().includes(e.target.value.toLowerCase()))) {
                            temp.push(mainData[i]);
                        }
                    })
                } else {
                    console.log("skl in  text")
                    mainData.map((val, i) => {
                        if ((mainData[i].name && mainData[i].name.toLowerCase().includes(e.target.value.toLowerCase())) || (mainData[i].message && mainData[i].message.toLowerCase().includes(e.target.value.toLowerCase()))) {
                            temp.push(mainData[i]);
                        }
                    })
                }

            }
            setDataSource(temp);
        } else {
            setDataSource(mainData)
        }


    }

    return (
        <div className="App">
            <Input onChange={onSearch}
                placeholder="Search Here"/>
            <Table dataSource={dataSource}
                columns={columns}/>;
        </div>
    );
}

export default List;
