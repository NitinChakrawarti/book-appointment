import { LayoutCompo } from '../componets/layout';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { message, Card, List, Typography, Spin, Row, Col } from 'antd';
import DoctorList from '../componets/doctorList';

const { Title, Text } = Typography;

export const HomePage = () => {
  const { user } = useSelector((state) => state.user);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const doctorList = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/get-all-doctors`, {
          withCredentials: true,
        });
        if (doctorList.data.success) {
          setDoctors(doctorList.data.doctors);
        } else {
          message.error(doctorList.data.message);
        }
      } catch (error) {
        console.error(error);
        message.error('Failed to fetch doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);
  return (
    <LayoutCompo>
      <div style={{ padding: '20px' }}>
        <Title level={2}>Welcome {user?.name}!</Title>
        <Text type="secondary" className=''>Explore the list of available doctors below:</Text>

        {loading ? (
          <Row justify="center" style={{ marginTop: '20px' }}>
            <Spin size="large" />
          </Row>
        ) : (
          <div>
            {
              doctors.map((doctor, index) => (
                <DoctorList key={index} doctor={doctor} />
              ))
            }
          </div>
        )}
        {!loading && doctors.length === 0 && (
          <Text type="danger">No doctors are available at the moment.</Text>
        )}
      </div>
    </LayoutCompo>
  );
};
