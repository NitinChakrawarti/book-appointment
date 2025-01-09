import { useEffect, useState, memo } from 'react';
import { LayoutCompo } from '../../componets/layout';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Spinner from '../../componets/spinner';
import { message, Tag, Table, Button } from 'antd';
import moment from 'moment';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/appointment/get-all-appointments`,
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
    }, [user._id]);

    const handleApprove = async (appointmentId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/appointment/approve`,
                { _id: appointmentId },
                { withCredentials: true }
            );

            if (response.data.success) {
                message.success('Appointment approved successfully.');
                setAppointments((prevAppointments) =>
                    prevAppointments.map((appointment) =>
                        appointment._id === appointmentId
                            ? { ...appointment, status: 'confirmed' }
                            : appointment
                    )
                );
            } else {
                message.error(response.data.message || "Failed to approve appointment.");
            }
        } catch (error) {
            console.error(error);
            message.error("An error occurred while approving the appointment.");
        }
    };

    const handleCancel = async (appointmentId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/appointment/cancel`,
                { _id: appointmentId },
                { withCredentials: true }
            );

            if (response.data.success) {
                message.success('Appointment cancelled successfully.');
                setAppointments((prevAppointments) =>
                    prevAppointments.filter((appointment) => appointment._id !== appointmentId)
                );
            } else {
                message.error(response.data.message || "Failed to cancel appointment.");
            }
        } catch (error) {
            console.error(error);
            message.error("An error occurred while cancelling the appointment.");
        }
    };

    const columns = [
        {
            title: 'Patient',
            key: 'patient',
            render: (_, appointment) => (
                <strong>
                    {appointment.userinfo.name}
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
        {
            title: 'Action',
            key: 'action',
            render: (_, appointment) => (
                <div className="flex space-x-2">
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => handleApprove(appointment._id)}
                        disabled={appointment.status === 'confirmed'}
                    >
                        Approve
                    </Button>
                    <Button
                        type="primary"
                        danger
                        size="small"
                        onClick={() => handleCancel(appointment._id)}
                    >
                        Reject
                    </Button>
                </div>
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

export default memo(Appointments);
