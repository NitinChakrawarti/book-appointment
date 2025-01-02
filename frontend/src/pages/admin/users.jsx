import { useEffect, useState, memo } from 'react';
import { LayoutCompo } from '../../componets/layout';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import Spinner from '../../componets/spinner';
import { Table, Button, Tag } from 'antd';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getallusers`, {
                    withCredentials: true,
                });

                if (response.data.success) {
                    setUsers(response.data.users);
                } else {
                    message.error(response.data.message || "Failed to fetch users.");
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

    const blockUser = async (userId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/admin/blockuser`,
                { userId },
                { withCredentials: true }
            );

            if (response.data.success) {
                message.success('User blocked successfully.');
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === userId ? { ...user, isBlocked: true } : user
                    )
                );
            } else {
                message.error(response.data.message || "Failed to block user.");
            }
        } catch (error) {
            console.log(error);
            message.error("An error occurred while blocking the user.");
        }
    };

    if (loading) return <Spinner />;

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <a href={`mailto:${text}`}>{text}</a>,
        },
        {
            title: 'Role',
            key: 'role',
            render: (text, user) => (
                <Tag color={user.isAdmin ? 'green' : 'volcano'}>
                    {user.isAdmin ? 'Admin' : 'User'}
                </Tag>
            ),
        },
        {
            title: 'Doctor',
            key: 'doctor',
            render: (text, user) => (
                <Button type="primary" shape="round" size="small">
                    {user.isDoctor ? 'Yes' : 'No'}
                </Button>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, user) => (
                <Button
                    type=""
                    danger
                    size="small"
                    onClick={() => blockUser(user._id)}
                    disabled={user.isBlocked}
                >
                    {user.isBlocked ? 'Blocked' : 'Block User'}
                </Button>
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
            />
        </LayoutCompo>
    );
};

export default memo(Users);
