import { useState } from "react";
import { LayoutCompo } from "../componets/layout";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, List, Typography, Tabs, message } from "antd";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { setuser } from "../redux/features/userslice";
const { TabPane } = Tabs;

const AllNotification = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [activeTab, setActiveTab] = useState("unread");
    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/notification/mark-all-read`, { userId: user._id },
                {
                    withCredentials: true,
                }
            )
            console.log(response);
            message.success("All notifications marked as read.");
            const newUser = response.data.data;
            dispatch(setuser(newUser));
            dispatch(hideLoading());
        } catch (error) {
            console.log(error);
            message.error("Something went wrong");
            dispatch(hideLoading());
        }
    };

    const handleDeleteAll = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/notification/delete-all-notification`, { userId: user._id },{
                withCredentials: true,
            }
            )
            if (response.data.success) {
                message.success("All notifications deleted.");
                const newUser = response.data.data;
                dispatch(setuser(newUser));
                dispatch(hideLoading());
            }
            else {
                message.error(response.data.message);
                dispatch(hideLoading());
            }

        } catch (error) {
            console.log(error);
            message.error("Something went wrong");
            dispatch(hideLoading());
        }
    };

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    return (
        <LayoutCompo>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <Typography.Title level={3} style={{ margin: 0 }}>
                        Notifications
                    </Typography.Title>
                    <div>
                        <Button
                            type="primary"
                            icon={<CheckOutlined />}
                            onClick={handleMarkAllRead}
                            style={{ marginRight: 8 }}
                        >
                            Mark All as Read
                        </Button>
                        <Button
                            type="danger"
                            icon={<DeleteOutlined />}
                            onClick={handleDeleteAll}
                        >
                            Delete All
                        </Button>
                    </div>
                </div>

                <Card>
                    <Tabs activeKey={activeTab} onChange={handleTabChange}>
                        <TabPane tab="Unread" key="unread">
                            <List
                                dataSource={user?.notification}
                                renderItem={(notification) => (
                                    <List.Item
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div>
                                            <Typography.Text strong>
                                                {notification.title}
                                            </Typography.Text>
                                            <Typography.Paragraph style={{ margin: 0 }}>
                                                {notification.message}
                                            </Typography.Paragraph>
                                        </div>
                                        <Button
                                            type="link"
                                            onClick={() =>
                                                message.info(`Marked "${notification.title}" as read.`)
                                            }
                                        >
                                            Mark as Read
                                        </Button>
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                        <TabPane tab="Read" key="read">
                            <List
                                dataSource={user?.seennotification}
                                renderItem={(notification) => (
                                    <List.Item
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div>
                                            <Typography.Text strong>
                                                {notification.title}
                                            </Typography.Text>
                                            <Typography.Paragraph style={{ margin: 0 }}>
                                                {notification.message}
                                            </Typography.Paragraph>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        </LayoutCompo>
    );
};

export default AllNotification;
