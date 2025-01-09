import { useEffect, useState } from 'react';
import { LayoutCompo } from './layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, DatePicker, TimePicker, Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice'

const Bookingpage = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState({});
  const [date, setDate] = useState('');
  const [time, setTime] = useState("");
  const [docavailability, setDocavailability] = useState(false);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  }, []);

  const checkAvailability = async () => {
    // e.preventDefault();
    if (!date || !time) {
      message.error("Please select date and time");
      return;
    }

    try {
      // dispatch(showLoading())
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/appointment/check-availabality`,
        {
          doctorId: doctorId,
          date: date,
          time: time
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        message.success(response.data.message);
        setDocavailability(response.data.docavailable);

      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Error in checking availability");
      console.error(error);
    }
  }

  const bookAppointment = async () => {
    if (!date || !time) {
      message.error("Please select date and time");
      return;
    }
    try {
      dispatch(showLoading())
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/appointment/book-appointment`,
        {
          userId: user._id,
          doctorId: doctorId,
          doctorinfo: doctor,
          userinfo: user,
          date: date,
          time: time,
        },
        { withCredentials: true }
      );

      if (response.data.data) {
        dispatch(hideLoading())
        navigate('/user/appointments');
        message.success(response.data.message);
      } else {
        dispatch(hideLoading())
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      message.error("Error in booking appointment");
      console.error(error);
    }
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

            <Form
              layout="vertical"
              onFinish={checkAvailability} // Link form submission to checkAvailability
              className="space-y-4"
            >
              <Form.Item
                label="Select Date"
                name="date"
                rules={[{ required: true, message: 'Please select a date!' }]}
              >
                <DatePicker
                  className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDocavailability(false);
                    if (value) {
                      setDate(value.format('DD-MM-YYYY'));
                    } else {
                      setDate('');
                    }
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Select Time"
                name="time"
                rules={[{ required: true, message: 'Please select a time range!' }]}
              >
                <TimePicker
                  className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  format="HH:mm"
                  onChange={(values) => {
                    setDocavailability(false);
                    if (values) {
                      setTime(values.format('HH:mm'));
                    } else {
                      setTime("");
                    }
                  }}
                />
              </Form.Item>

              <div className="text-center">
                <Button
                  type="primary"
                  htmlType="submit" // Triggers the form's onFinish
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Check Availability
                </Button>
              </div>
              {docavailability && (
                <div>
                  <Button
                    onClick={bookAppointment}
                    className="w-full py-2 hover:text-white rounded-md hover:bg-blue-700"
                  >
                    Book Appointment
                  </Button>
                </div>
              )}
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
