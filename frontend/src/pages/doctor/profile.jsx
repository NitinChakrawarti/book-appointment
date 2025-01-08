import { useEffect, useState } from 'react';
import { LayoutCompo } from '../../componets/layout';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Spinner from '../../componets/spinner';
import { Form, Input, Button, InputNumber, TimePicker, message, Card, Row, Col } from "antd";
import moment from 'moment';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const docfetch = async () => {
      setLoading(true);
      try {
        const docDetails = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/doctor/getdoctor/${user._id}`,
          {
            withCredentials: true,
          }
        );
        const response = docDetails.data.docProfile
        if (response) {
          setDoc(response);
        } else {
          setDoc(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    docfetch();
  }, [user._id]);

  const handleSave = async (values) => {
    try {
      setLoading(true);
      const timings = [
        values.timings[0].format("HH:mm"),
        values.timings[1].format("HH:mm"),
      ];
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/doctor/updateprofile/${user._id}`,
        { ...values, timings },
        { withCredentials: true }
      );
  
      if (response.data.success) {
        message.success("Doctor details updated successfully.");
        setDoc(values);
      } else {
        message.error("User not found");
      }
    } catch (error) {
      console.error("Save failed:", error);
      message.error("Failed to update doctor details.");
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) return <Spinner />;

  return (
    <LayoutCompo>
      {doc ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Doctor Profile</h2>
          <Form
            layout="vertical"
            onFinish={handleSave}
            initialValues={{
              firstName: doc?.firstName || 'hello',
              lastName: doc?.lastName || '',
              email: doc?.email || '',
              phone: doc?.phone || '',
              specialization: doc?.specialization || '',
              experience: doc?.experience || 0,
              fees: doc?.fees || 0,
              address: doc?.address || '',
              website: doc?.website || '',
              timings: doc?.timings
                ? [moment(doc.timings[0], "HH:mm"), moment(doc.timings[1], "HH:mm")]
                : [],
              status: doc?.status || 'pending',
            }}
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
                    <TimePicker.RangePicker
                      format="HH:mm"
                      minuteStep={15}
                      allowClear={false}
                      popupClassName="custom-time-picker"
                    />                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Form.Item style={{ textAlign: "center", marginTop: 16 }}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <h1 className="text-center text-xl font-semibold mt-10">No doctor details found.</h1>
      )}
    </LayoutCompo>
  );
};

export default Profile;
