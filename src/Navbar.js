import React, { useState } from 'react';
import { LoginOutlined,MailOutlined,AreaChartOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
  {
    label: (
      <a href="http://localhost:3000/charts" target="_self" >
        İstatistikler
      </a>
    ),
    key: 'charts',
    icon:<AreaChartOutlined />
  },
  {
    label: (
      <a href="http://localhost:3000/login" target="_self" >
        Giriş
      </a>
    ),
    key: 'login',
    icon:<LoginOutlined />
  },
  {
    label: (
      <a href="http://localhost:3000/register" target="_self" >
        Kayıt
      </a>
    ),
    key: 'register',
    icon:<MailOutlined />
  },
];
function Navbar () {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}
export default Navbar;