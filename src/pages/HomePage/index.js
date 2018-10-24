import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Icon, Layout, Menu } from 'antd';
import { Route } from 'react-router-dom';

import VideoRoute from 'src/routes/VideoRoute';
import { VIDEO_PATH } from 'src/routes/paths';

const { Header, Footer, Sider, Content } = Layout;

const HomePage = ({ serviceCalls }) => (
  <>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={false} onCollapse={f => f}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {serviceCalls &&
            serviceCalls.allIds.map(serviceCallId => (
              <Menu.Item key={serviceCallId}>
                <Icon type="pie-chart" />
                <span>{serviceCalls.byId[serviceCallId].id}</span>
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
    <Route component={VideoRoute} path={VIDEO_PATH} />
  </>
);

HomePage.propTypes = {
  serviceCalls: PropTypes.shape({
    allIds: PropTypes.array,
    byId: PropTypes.object,
  }),
};

HomePage.defaultProps = {
  serviceCalls: null,
};

export default HomePage;
