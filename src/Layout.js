import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Game from './Game';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {Test, TestRoute} from './Test'
import AnotherTest from './AnotherTest'
import Start from './Start'
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


class BasicLayout extends React.Component{
    constructor(props){
      super(props)
      this.state={
        started:false
      }
      this.startClick=this.startClick.bind(this)
    }

    startClick(){
      this.setState({
        started:!this.state.started
      })
    }

  render(){
    return(
  <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
              <Menu.Item key="1">
                <Link to="/test">Tic-Tac-Toe</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/reset" >Strategy</Link>
              </Menu.Item>
              <Menu.Item key="3">
              <Link to="/">Nothing</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          {this.state.started?
            <Game  started = {this.state.started} onClick={this.startClick}/>:
            <Start started = {this.state.started} onClick={this.startClick}/>}
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Tic-Tac-Toe ©2020 Created by Luo Liyuan</Footer>
  </Layout>
  )
    }
}

export default BasicLayout;