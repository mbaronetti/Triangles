import React, { Component } from 'react';
import {Layout , Menu , Breadcrumb , Button , Modal } from 'antd';
import Canvas from './Canvas';

const { Header, Content, Footer } = Layout;

class UI extends Component{
    about = () => {
      Modal.info({
        title: 'About drawShape',
        content: (
          <div>
            <p>This is an easy-to-use and fun application where you can draw triangles and get information about them...</p>
            <p><strong>Click on the gray area to start drawing</strong></p>
            <p>Enjoy!</p>
          </div>
        ),
        onOk() {},
      });
    }
render(){
    return (
        <Layout className="layout">
            <Header>
              <div className="logo" />
              <Button onClick={() => this.about()} type="primary">ABOUT</Button>
            </Header>
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>drawShape</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <Canvas />
              </div>
            </Content>
            <Footer className="ui-footer">
              mbaronetti
            </Footer>
        </Layout>
        );
    }
}
export default UI