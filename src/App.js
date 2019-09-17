import React from 'react';
import { Layout } from 'antd';
import { AppHeader } from './components/AppHeader';
import Home from '../src/components/Home';
import UnsafeScriptWarning from './components/UnsafeScriptWarning';
import { connect } from 'react-redux';

class App extends React.PureComponent {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { hasConnectionError } = this.props;
    return hasConnectionError || hasError ? (
      <UnsafeScriptWarning />
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

export default connect(({ hasConnectionError }) => ({
  hasConnectionError,
}))(App);
