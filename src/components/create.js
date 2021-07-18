import {
    Table,
    Input,
    Row,
    Col,
    Form,
    Radio,
    Button,
    Select
} from "antd"; // import and design

import {useEffect, useState} from "react";

function List() {
    const [fields, setFields] = useState();
    const {Option} = Select;
    const [basicTitle, setBasicTitle] = useState()

    useEffect(() => { // pull data from api
        fetch("http://localhost/api/get_form.php").then((res) => res.json()).then((result) => {
            console.log("skl new", result.data.fields[0]);
            // const ar = []
            // Object.keys(result.data.headers[0]).map((val, index) => {
            //     ar.push({title: val, dataIndex: val, key: index})
            //     console.log("skl 2", val)
            // })

            // setColumn(ar)

            setFields(result.data.fields[0]);
            // setMainData(result.data.rows)
        }, (error) => {});
    }, []);

    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const addInput = (rep) => {
        if (basicTitle.length > 0) {
            console.log("rep", rep)
            let item = {
                ...fields
            };
            item[rep].repeater_fields[basicTitle] = {
                "title": basicTitle,
                "type": "text",
                "required": true
            }

            setFields(item)
        }


    }

    const onInputChange = (e) => {
        console.log(e.target.value)
        let val = e.target.value;


        setBasicTitle(val)
    }

    const FieldGeneartor = ({
        field,
        name,
        index,
        length,
        repeater
    }) => {
        console.log("skl fileds 2 ", field);

        return (
            <div> {" "}
                {
                index === 0 && (
                    <h1> {
                        fields[repeater].title
                    } </h1>
                )
            }


                {
                (field.type === "text" || field.type === "email") && (
                    <Form.Item label={
                            field.title
                        }
                        name={name}
                        rules={
                            [{ // type: field.type,
                                    required: field.required,
                                    message: "Please input your " + field.title + "!"
                                },]
                    }>
                        <Input/>
                    </Form.Item>
                )
            }

                {
                (field.type === "textarea") && (
                    <Form.Item name={name}
                        label="Introduction">
                        <Input.TextArea/>
                    </Form.Item>
                )
            }


                {
                field.type === "select" && (
                    <Form.Item name={name}
                        label={
                            field.title
                        }
                        rules={
                            [{
                                    required: field.required
                                },]
                    }>
                        <Select placeholder="Select a option and change input text above"
                            //   onChange={this.onGenderChange}
                            //   allowClear
                        >
                            {
                            field.options.map((option) => (
                                <Option key={
                                        option.key
                                    }
                                    value={
                                        option.key
                                }>
                                    {
                                    option.label
                                }</Option>
                            ))
                        }
                            {" "} </Select>
                    </Form.Item>
                )
            }

{
                field.type === "radio" && (
                    <Form.Item name={name}
                        label={
                            field.title
                        }
                        rules={
                            [{
                                    required: field.required
                                },]
                    }>
                        <Radio.Group 
                            //   onChange={this.onGenderChange}
                            //   allowClear
                        >
                            {
                            field.options.map((option) => (
                                <Radio  key={
                                        option.key
                                    }
                                    value={
                                        option.key
                                }>
                                    {
                                    option.label
                                }</Radio >
                            ))
                        }
                            {" "} </Radio.Group>
                    </Form.Item>
                )
            }

                {
                (field.type === "repeater") && (field && field.repeater_fields && Object.keys(field.repeater_fields).map((item, index) => <FieldGeneartor key={item}
                    repeater={name}
                    field={
                        field.repeater_fields[item]
                    }
                    name={item}
                    index={index}
                    length={
                        Object.keys(field.repeater_fields).length
                    }/>))
            }


                {" "} </div>
        );
    };

    return (
        <div className="App">
            <Row>
                <Col span={12}>
                    <Form name="basic"
                        labelCol={
                            {span: 9}
                        }
                        wrapperCol={
                            {span: 10}
                        }
                        initialValues={
                            {remember: true}
                        }
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        {
                        fields && Object.keys(fields).map((field) => <FieldGeneartor key={field}
                            field={
                                fields[field]
                            }
                            name={field}/>)
                    }


                        <Form.Item wrapperCol={
                            {
                                offset: 8,
                                span: 16
                            }
                        }>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default List;
