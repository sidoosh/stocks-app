import React from 'react';
import { Layout, Modal } from 'antd';
import { AppHeader } from './components/AppHeader';
import Home from '../src/components/Home';
import { connect } from 'react-redux';

class App extends React.PureComponent {
  render() {
    const { hasError, errorMessage } = this.props;
    return hasError ? (
      Modal.error({ content: errorMessage, title: 'Error' })
    ) : (
      <div className='App'>
        <Layout className='appLayout'>
          <AppHeader />
          <Layout.Content>
            <Home />
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}

export default connect(({ hasError, errorMessage }) => ({
  hasError,
  errorMessage,
}))(App);
