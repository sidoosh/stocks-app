import React from 'react';
import { Modal } from 'antd';

const UnsafeScriptsWarning = () =>
  Modal.info({
    title: 'Content Blocked',
    content:
      "Click on Load Unsafe Scripts to proceed. It's just an app showing stocks",
  });

export default UnsafeScriptsWarning;
