import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const navigate = useNavigate();

  const onFinishHandler = (values) => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, values, {
      withCredentials: true,
    })
      .then((response) => {
        message.success('User logged in successfully!');
        document.cookie = `logintoken=${response.token}; path=/; secure; HttpOnly;`;
        navigate('/');
      })
      .catch((error) => {
        message.error('Invalid credentials');
        console.error(error);
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Login
        </h1>
        <Form
          className="space-y-4"
          layout="vertical"
          onFinish={onFinishHandler}
        >
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
              Login
            </Button>
          </Form.Item>
          <Form.Item className="text-center">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-indigo-500 hover:underline"
            >
              Register now
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
