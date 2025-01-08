import { useEffect, useState } from 'react';
import { LayoutCompo } from './layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, DatePicker, TimePicker, Button, message } from 'antd';
import moment from 'moment';

const Bookingpage = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState({});
  const [date, setDate] = useState('');
  const [time, setTime] = useState([]);

  // Fetch doctor details
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/getadoctor/${doctorId}`,
          { withCredentials: true }
        );

        if (response.data.doctor) {
          setDoctor(response.data.doctor);
        } else {
          message.error("No doctor found");
        }
      } catch (error) {
        message.error("Error in fetching doctor details");
        console.error(error);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  const handleFormSubmit = (values) => {
    const selectedDate = values.date.format('DD-MM-YYYY');
    setDate(selectedDate);
    const selectedTime = values.time.map((time) => time.format('HH:mm'));
    setTime(selectedTime);
  };

  return (
    <LayoutCompo>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h3 className="text-2xl font-semibold text-center mb-6">Book Appointment Now</h3>
        {doctor ? (
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Dr. {doctor.firstName} {doctor.lastName}</h4>
            <p className="text-lg text-gray-700">Specialization: {doctor.specialization}</p>
            <p className="text-lg text-gray-700">Experience: {doctor.experience} years</p>
            <p className="text-lg text-gray-700">Consultation Fees: ₹{doctor.fees}</p>

            <Form onFinish={handleFormSubmit} layout="vertical" className="space-y-4">
              <Form.Item
                label="Select Date"
                name="date"
                rules={[{ required: true, message: 'Please select a date!' }]}
              >
                <DatePicker className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" format="DD-MM-YYYY" />
              </Form.Item>

              <Form.Item
                label="Select Time"
                name="time"
                rules={[{ required: true, message: 'Please select a time range!' }]}
              >
                <TimePicker.RangePicker
                  className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  format="HH:mm"
                />
              </Form.Item>

              <div className="text-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Check Availability
                </Button>
              </div>
              <div>
                <Button
                  type="text"
                  htmlType="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Book Appointment
                </Button>
              </div>
            </Form>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading doctor details...</p>
        )}
      </div>
    </LayoutCompo>
  );
};

export default Bookingpage;
