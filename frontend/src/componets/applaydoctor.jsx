import { LayoutCompo } from './layout';
import { useState } from "react";
import { Form, Input, Button, InputNumber, TimePicker, message, Card, Row, Col } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
const ApplyDoctor = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
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

    return (
        <LayoutCompo>
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
        </LayoutCompo>
    );
};

export default ApplyDoctor;
