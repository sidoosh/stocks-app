import { Modal } from 'antd';

const { info } = Modal;

const UnsafeScriptsWarning = () =>
  info({
    title: 'Allow Content',
    content:
      "Click on Load Unsafe Scripts to proceed. It's just an app showing stocks",
  });

export default UnsafeScriptsWarning;
