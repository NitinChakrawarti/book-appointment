import { LayoutCompo } from '../componets/layout';
import { useEffect, useState } from "react";
import { Form, Input, Button, InputNumber, TimePicker, message, Card, Row, Col } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Alert } from 'antd';
import Spinner from '../componets/spinner';

const ApplyDoctor = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [showFrom, setshowFrom] = useState(false);

    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/applydoctor`, { ...values, userId: user.id }, {
                withCredentials: true,
            });
            dispatch(hideLoading());
            if (response.data.message) {
                message.success(response.data.message);
                navigate('/')
            }
            else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong");
        }
    };

    useEffect(() => {
        const fetchdoctors = async () => {
            setLoading(true);
            try {
                const docstatus = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/docstatus`,
                    {
                        withCredentials: true,
                    });
                if (docstatus.data.data) {
                    setshowFrom(false);
                    setLoading(false)
                } else {
                    setshowFrom(true);
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                console.log(error)
                message.error("Try again ")
            }
        }
        fetchdoctors();
    }, [])

    return (
        <LayoutCompo>
            {
                loading ?
                    <Spinner />
                    :
                    (
                        showFrom ?
                            <Form
                                layout="vertical"
                                onFinish={onFinish}
                                style={{ maxWidth: 800, margin: "0 auto" }}
                            >
                                <Card title="Personal Details" style={{ marginBottom: 16 }}>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="firstName"
                                                label="First Name"
                                                rules={[{ required: true, message: "First Name is required" }]}
                                            >
                                                <Input placeholder="Enter first name" />
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item
                                                name="lastName"
                                                label="Last Name"
                                                rules={[{ required: true, message: "Last Name is required" }]}
                                            >
                                                <Input placeholder="Enter last name" />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="phone"
                                                label="Phone"
                                                rules={[{ required: true, message: "Phone is required" }]}
                                            >
                                                <Input placeholder="Enter phone number" />
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item
                                                name="email"
                                                label="Email"
                                                rules={[
                                                    { required: true, message: "Email is required" },
                                                    { type: "email", message: "Enter a valid email" },
                                                ]}
                                            >
                                                <Input placeholder="Enter email address" />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item name="website" label="Website">
                                        <Input placeholder="Enter website URL (optional)" />
                                    </Form.Item>

                                    <Form.Item
                                        name="address"
                                        label="Address"
                                        rules={[{ required: true, message: "Address is required" }]}
                                    >
                                        <Input.TextArea rows={3} placeholder="Enter address" />
                                    </Form.Item>
                                </Card>

                                <Card title="Professional Details">
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="specialization"
                                                label="Specialization"
                                                rules={[{ required: true, message: "Specialization is required" }]}
                                            >
                                                <Input placeholder="Enter specialization" />
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item
                                                name="experience"
                                                label="Experience (Years)"
                                                rules={[{ required: true, message: "Experience is required" }]}
                                            >
                                                <InputNumber min={0} max={50} placeholder="Enter experience" />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="fees"
                                                label="Fees (₹)"
                                                rules={[{ required: true, message: "Fees is required" }]}
                                            >
                                                <InputNumber min={0} placeholder="Enter fees" />
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item
                                                name="timings"
                                                label="Timings"
                                                rules={[{ required: true, message: "Timings are required" }]}
                                            >
                                                <TimePicker.RangePicker format="HH:mm" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Card>
                                <Form.Item style={{ textAlign: "center", marginTop: 16 }}>
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                            :
                            user.isDoctor ? (
                                <Alert
                                    message="🎉 Application is Approved"
                                    description="Congratulations! Your application to become doctor on our platform has been approved. You can now access the doctor's dashboard."
                                    type="success"
                                    showIcon
                                    style={{
                                        margin: '20px 0',
                                        borderRadius: '8px',
                                        padding: '16px',
                                        backgroundColor: '#f6fff1',
                                        border: '1px solid #d4edda',
                                        color: '#155724',
                                    }}
                                />
                            ) : (
                                <Alert
                                    message="📋 Application Submitted"
                                    description="You have already applied to become a doctor. Our team will review your application and get back to you soon."
                                    type="info"
                                    showIcon
                                    style={{
                                        margin: '20px 0',
                                        borderRadius: '8px',
                                        padding: '16px',
                                        backgroundColor: '#f6f9fc',
                                        border: '1px solid #d9e3f0',
                                        color: '#0c5460',
                                    }}
                                />
                            )
                    )
            }


        </LayoutCompo>
    );
};

export default ApplyDoctor;
