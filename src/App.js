import React from 'react';
import { Layout } from 'antd';
import { AppHeader } from './components/AppHeader';
import Home from '../src/components/Home';
import UnsafeScriptWarning from './components/UnsafeScriptWarning';

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
    console.log(error, info);
  }

  render() {
    const { hasError } = this.state;
    return hasError ? (
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

export default App;
