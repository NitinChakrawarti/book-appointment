import { useEffect, useState, memo } from 'react';
import { LayoutCompo } from '../../componets/layout';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import Spinner from '../../componets/spinner';
import { Table, Button, Tag, Tooltip, Space } from 'antd';
import { StopOutlined, CheckOutlined } from '@ant-design/icons';

const Doctors = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getalldoctors`, {
                    withCredentials: true,
                });

                if (response.data.success) {
                    const doctors = response.data.doctors;
                    setUsers(doctors);
                } else {
                    message.error(response.data.message || "Failed to fetch users.");
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                message.error("An error occurred while fetching users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [dispatch]);

    const approveUser = async (userId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/admin/doctor/approve`,
                { docId: userId },
                { withCredentials: true }
            );

            if (response.data.success) {
                message.success('User Approved successfully.');
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === userId ? { ...user, status: 'Approved' } : user
                    )
                );
            } else {
                message.error(response.data.message || "Failed to Approve user.");
            }
        } catch (error) {
            console.log(error);
            message.error("An error occurred while Approving the user.");
        }
    }

    if (loading) return <Spinner />;

    const columns = [
        {
            title: 'Name',
            key: 'name',
            render: (_, user) => (
                <strong>{`${user.firstName} ${user.lastName}`}</strong>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => (
                <a href={`mailto:${text}`} style={{ color: '#1890ff' }}>
                    {text}
                </a>
            ),
        },
        {
            title: 'Specialization',
            dataIndex: 'specialization',
            key: 'specialization',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => (
                <Tag
                    color={
                        text === 'pending'
                            ? 'orange'
                            : text === 'approved'
                                ? 'green'
                                : 'red'
                    }
                >
                    {text.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Timings',
            key: 'timings',
            render: (_, user) => (
                <Space wrap>
                    {user.timings.map((time, index) => (
                        <Tag key={index} color="blue">
                            {new Date(time).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </Tag>
                    ))}
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, user) => (
                <Space>
                    {user.status === 'pending' && (
                        <Tooltip title="Approve">
                            <Button
                                type="primary"
                                icon={<CheckOutlined />}
                                size="small"
                                onClick={() => approveUser(user._id)}
                            />
                        </Tooltip>
                    )}
                    <Tooltip title="Block/Remove">
                        <Button
                            type="primary"
                            danger
                            icon={<StopOutlined />}
                            size="small"
                            // onClick={() => blockUser(user._id)}
                            disabled={user.status === 'blocked'}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <LayoutCompo>
            <Table
                columns={columns}
                dataSource={users}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
                loading={loading}
                scroll={{ x: 'max-content' }}
                bordered
            />
        </LayoutCompo>
    );
};

export default memo(Doctors);
