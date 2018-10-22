import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Icon, Layout, Menu } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const HomePage = ({ serviceCalls }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={false} onCollapse={f => f}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        {serviceCalls.map(serviceCall => (
          <Menu.Item key={serviceCall.id}>
            <Icon type="pie-chart" />
            <span>{serviceCall.id}</span>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          Bill is a cat.
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  </Layout>
);

HomePage.propTypes = {
  serviceCalls: PropTypes.arrayOf(PropTypes.object),
};

HomePage.defaultProps = {
  serviceCalls: [],
};

export default HomePage;
