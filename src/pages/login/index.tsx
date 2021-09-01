import React, { useEffect, useState } from "react";
import "./index.less";
import { useHistory } from "react-router-dom";
import Login from "../../components/Login/index";
import { cloneDeep } from "lodash";
const initBackgroundList: {backgroundImage: string, display?: string}[] = [{
  backgroundImage:
    "url('https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg')",
},{
  backgroundImage:
    "url('https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg')"
},{
  backgroundImage:
    "url('https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg')"
}]
const LoginPage = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  const [backgroundList, setBackgroundList] = useState([{
    backgroundImage:
      "url('https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg')",
      display: 'block'
  },{
    backgroundImage:
      "url('https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg')"
  },{
    backgroundImage:
      "url('https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg')"
  }])
  let i = 0
  useEffect(() => {
    isLogin && history.push("/app");
    setInterval(() => {
      if(i === 3) i = 0
      const initList = cloneDeep(initBackgroundList)
      initList[i++].display = 'block'
      setBackgroundList(initList);
    }, 5000)
  }, [isLogin]);
  return (
    <div className="page-login">
      <div className="page-login__form">
        <Login
          login={(value) => {
            setIsLogin(value);
          }}
        ></Login>
      </div>
      <div className="back">
      <div className="items">
        {backgroundList.map((background) =>
          <div
            className={`item item1`}
            style={background}
          ></div>)}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
