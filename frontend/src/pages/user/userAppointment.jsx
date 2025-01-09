import { useEffect, useState, memo } from 'react';
import { LayoutCompo } from '../../componets/layout';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Spinner from '../../componets/spinner';
import { message, Tag, Table } from 'antd';
import moment from 'moment';

const UserAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/appointment/get-my-appointments`,
                    { userId: user._id },
                    { withCredentials: true }
                );

                if (response.data.data) {
                    setAppointments(response.data.data);
                } else {
                    message.error(response.data.message || "Failed to fetch appointments.");
                }
            } catch (error) {
                console.error(error);
                message.error("An error occurred while fetching appointments.");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [user?._id]);

    const columns = [
        {
            title: 'Doctor',
            key: 'doctor',
            render: (_, appointment) => (
                <strong>
                    Dr. {appointment.doctorinfo.firstName} {appointment.doctorinfo.lastName}
                </strong>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => moment(text).format("DD-MM-YYYY"),
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (text) => moment(text).format("HH:mm"),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag
                    color={
                        status === 'confirmed'
                            ? 'green'
                            : status === 'pending'
                            ? 'yellow'
                            : 'red'
                    }
                >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Tag>
            ),
        },
    ];

    if (loading) return <Spinner />;

    return (
        <LayoutCompo>
            <Table
                columns={columns}
                dataSource={appointments}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
                loading={loading}
                scroll={{ x: 'max-content' }}
            />
        </LayoutCompo>
    );
};

export default memo(UserAppointment);
