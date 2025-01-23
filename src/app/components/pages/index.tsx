/* eslint-disable @typescript-eslint/no-explicit-any, react/jsx-key */

'use client';
import { Layout, Menu } from 'antd';
import { PieChartOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useState } from 'react';
import DataVisualization from './data-visualization';
import UserManagement from './user-management';
import TaskManagement from './task-management';


const { Header, Sider, Content } = Layout;

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('1');

    const renderContent = () => {
        switch (selectedKey) {
            case '1':
                return <DataVisualization />;
            case '2':
                return <UserManagement />;
            case '3':
                return <TaskManagement />;
            default:
                return <h2>Welcome to the Dashboard</h2>;
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="logo" style={{ color: 'white', textAlign: 'center', margin: '16px' }}>
                    {collapsed ? 'D' : 'Dashboard'}
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={(e) => setSelectedKey(e.key)}>
                    <Menu.Item key="1" icon={<PieChartOutlined />}>Data Visualization</Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>User Management</Menu.Item>
                    <Menu.Item key="3" icon={<UnorderedListOutlined />}>Task Management</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', textAlign: 'center' }}>Dashboard</Header>
                <Content style={{ margin: '16px', padding: '16px', background: '#fff' }}>
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
