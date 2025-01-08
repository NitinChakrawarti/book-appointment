import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { User, LogOut, Bell } from 'lucide-react';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import Spinner from './spinner';

const { Sider, Content, Header } = Layout;
import { adminMenu, doctorMenu } from ".//../data/data";
import { userMenu } from ".//../data/data";


export function LayoutCompo({ children }) {
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState(location.pathname);
    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };

    // RTK for user data
    const { user } = useSelector(state => state.user);

    if (user === null) {
        return setTimeout(() => {
            <Spinner />
        }, 3000);
    }

    return (
        <Layout className="h-screen">
            {/* Sidebar */}
            <Sider
                width={250}
                className="bg-[#001529] text-white p-6 fixed top-0 bottom-0 left-0 z-10"
            >
                <div className="logo text-center text-2xl font-semibold mb-12">
                    <h2> HealthSure  </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={handleMenuClick}
                    className="border-none"
                >
                    {
                        user.isAdmin ? adminMenu.map((item) => (
                            <Menu.Item
                                key={item.key}
                                icon={item.icon}
                                className="hover:bg-gray-700 transition duration-300"
                            >
                                <Link to={item.path} className="text-white hover:text-primary">
                                    {item.label}
                                </Link>
                            </Menu.Item>
                        ))
                            : user.isDoctor ?
                                doctorMenu.map((item) => (
                                    <Menu.Item
                                        key={item.key}
                                        icon={item.icon}
                                        className="hover:bg-gray-700 transition duration-300"
                                    >
                                        <Link to={item.path} className="text-white hover:text-primary">
                                            {item.label}
                                        </Link>
                                    </Menu.Item>
                                ))
                                :
                                userMenu.map((item) => (
                                    <Menu.Item
                                        key={item.key}
                                        icon={item.icon}
                                        className="hover:bg-gray-700 transition duration-300"
                                    >
                                        <Link to={item.path} className="text-white hover:text-primary">
                                            {item.label}
                                        </Link>
                                    </Menu.Item>
                                ))
                    }

                    <Menu.Item
                        onClick={() => {
                            document.cookie.split(";").forEach((c) => {
                                document.cookie = c
                                    .replace(/^ +/, "")
                                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                            });
                            message.success('Logout success');
                        }}
                        key='/logout'
                        icon={<LogOut />}
                        className="hover:bg-gray-700 transition duration-300"
                    >
                        <Link to='/login' className="text-white hover:text-primary">
                            Logout
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout style={{ marginLeft: 250 }}>
                <Header className="bg-blue-600 text-white p-4 flex justify-between items-center">
                    <div className="text-lg font-semibold">
                        Welcome, {user.name}
                    </div>
                    <div className="flex items-center space-x-4">

                        <Link to={'/notifications'} className="relative cursor-pointer">
                            <Bell className="w-6 h-6" />
                            {user && user.notification.length > 0 &&
                                <span className="absolute -top-1 -right-2 bg-red-500 text-xs text-white font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                                    {user.notification.length}
                                </span>
                            }
                        </Link>
                        <div className="flex items-center space-x-2">
                            <Link to="/profile" className="text-white hover:text-primary">
                                <User className="w-5 h-5" />
                            </Link>
                            <span>{user.isAdmin ? "Admin" : "User"}</span>
                        </div>

                        <Link to="/login" className="text-white hover:text-primary" onClick={() => {
                            document.cookie.split(";").forEach((c) => {
                                document.cookie = c
                                    .replace(/^ +/, "")
                                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                            });
                            message.success('Logout success');
                        }}>
                            <LogOut className="w-5 h-5" />
                        </Link>
                    </div>
                </Header>
                <Content className="bg-gray-100 p-6 overflow-auto">
                    {children}
                </Content>
            </Layout>
        </Layout >
    );
}
