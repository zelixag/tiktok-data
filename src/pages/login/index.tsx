import React, { useEffect, useState } from 'react';
import './index.less'
import { useHistory } from "react-router-dom";
import Login from '../../components/Login/index';
const LoginPage = () => {
    const history = useHistory();
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
      isLogin && history.push('/app')
    }, [isLogin])
    return <div className="page-login">
      <div className="page-login__form">
        <Login login={(value) => {
          setIsLogin(value)
        }}></Login>
      </div>
      <div className="back">
        <div className="items">
          <div className="item item2" style={{ backgroundImage: "url('https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg')" }}></div>
          <div className="item item3" style={{ backgroundImage: "url('https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg')", display: 'block' }}></div>
          <div className="item item1" style={{ backgroundImage: "url('https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg')", display: 'block' }}></div>
        </div>
      </div>
    </div>
  }

export default LoginPage;