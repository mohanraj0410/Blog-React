import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button, message, Form, Input, Select } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

const initialState = {
    title: "",
    description: "",
    category: "",
    imageURL: "",
    date: ""
};

const options = ['Travel', 'Fashion', 'Fitness', 'Sports', 'Food', 'Tech'];

const AddBlog = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [editMode, setEditMode] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setEditMode(true);
            getSingleBlog(id);
        } else {
            setEditMode(false);
            setFormValue(initialState);
            form.resetFields();
        }
    }, [id]);

    const getSingleBlog = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/blogs/${id}`);
            if (response.status === 200) {
                setFormValue(response.data);
                form.setFieldsValue(response.data);
            } else {
                message.error('Failed to fetch the blog details!');
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            message.error('Failed to fetch the blog details.');
        }
    };

    const getDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    };

    const handleSubmit = async () => {
        const currentDate = getDate();
        const updatedFormValue = { ...formValue, date: currentDate };
        console.log(updatedFormValue);
        try {
            if (editMode) {
                const response = await axios.put(`http://localhost:5000/blogs/${id}`, formValue);
                if (response.status === 200) {
                    message.success('Blog post updated successfully!');
                } else {
                    message.error('Failed to update the blog post!');
                }
            } else {
                const response = await axios.post("http://localhost:5000/blogs", updatedFormValue);
                if (response.status === 201) {
                    message.success('Blog post submitted successfully!');
                } else {
                    message.error('Failed to submit the blog post!');
                }
            }
            setFormValue(initialState);
            form.resetFields();
            navigate('/');
        } catch (error) {
            console.error('Submit Error:', error);
            message.error('Failed to submit the blog post.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    };

    const handleCategoryChange = (value) => {
        setFormValue({
            ...formValue,
            category: value
        });
    };


    console.log(formValue)

    const handleUploadChange = async (info) => {
        try {
            const file = info.file.originFileObj;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'bzk1m0uz');

            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dia59bbjn/image/upload",
                formData
            );
            console.log(response);

            const imgURL = response.data.secure_url;
            setFormValue({
                ...formValue,
                imageURL: imgURL
            });
        } catch (error) {
            console.error('Upload Error:', error);
            message.error({ content: `${info.file.name} upload failed.`, key: 'upload' });
        }
    };

    const handleGoBack = () => {
        navigate("/");
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };

    return (
        <div className="addBlog-container">
            <h2>{editMode ? "Edit Blog" : "Add Blog"}</h2>
            <Form
                {...formItemLayout}
                form={form}
                initialValues={formValue}
                onValuesChange={(changedValues, allValues) => {
                    setFormValue(allValues);
                }}
                onFinish={handleSubmit}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        { required: true, message: 'Please provide a title!' }
                    ]}
                >
                    <Input className="form-item-input" name="title" value={formValue.title} onChange={handleInputChange} />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        { required: true, message: 'Please provide a description!' }
                    ]}
                >
                    <Input.TextArea rows={5} className="form-item-input" name="description" value={formValue.description} onChange={handleInputChange} />
                </Form.Item>

                {!editMode && (
                    <Form.Item
                        label="Image"
                        rules={[
                            { required: true, message: 'Please select an image!' }
                        ]}
                    >
                        <Upload
                            listType="picture"
                            maxCount={1}
                            onChange={handleUploadChange}
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                )}

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                        { required: true, message: 'Please select a category!' }
                    ]}
                >
                    <Select className="form-item-input" value={formValue.category} onChange={handleCategoryChange}>
                        {options.map((option, index) => (
                            <Select.Option key={index} value={option}>{option}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 6, span: 16 }}
                    className="submit-buttons"
                >
                    <Button type="primary" htmlType="submit">
                        {editMode ? "Update" : "Add"}
                    </Button>
                    <Button type="primary" style={{ marginLeft: '10px' }} danger onClick={handleGoBack}>
                        Go Back
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddBlog;
