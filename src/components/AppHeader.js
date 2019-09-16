import React from 'react';
import { Layout, Button } from 'antd';
import './AppHeader.css';
import { Detector } from 'react-detect-offline';

const { Header } = Layout;

export const AppHeader = props => (
  <Header className='appHeader'>
    <div className='headerLeft'>
      <div className='logo'></div>
      <div className='pageTitle'>Live Stock</div>
    </div>
    <div className='headerRight'>
      <Detector
        render={({ online }) => (
          <Button type={online ? 'primary' : 'danger'}>
            {online ? 'Live' : 'Offline'}
          </Button>
        )}
      />
    </div>
  </Header>
);
