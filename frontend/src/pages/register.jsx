import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const Register = () => {

  const navigate = useNavigate(); // Use navigate for navigation


  const onFinishHandler = (values) => {
  
    axios.post(`${import.meta.env.VITE_BASE_URL}/user/sign-up`, values)
      .then((response) => {
        alert('User registered successfully!');
        navigate('/login');
      })
      .catch((error) => {
        alert('Try again');
        console.error(error);
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Register Form
        </h1>
        <Form
          className="space-y-4"
          layout="vertical"
          onFinish={onFinishHandler}
        >
          <Form.Item
            label={<span className="text-gray-600">First Name</span>}
            name="name"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input
              className="border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              // onChange={onchangeHandler}
              // value={fromData.name}
              // name='name'
              required
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-600">Email</span>}
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              type="email"
              className="border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-600">Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              type="password"
              className="border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 border-none text-white font-medium py-2 px-4 rounded-md"
            >
              Register
            </Button>
          </Form.Item>

          <Form.Item className="text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-indigo-500 hover:underline"
            >
              Back to Login
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
