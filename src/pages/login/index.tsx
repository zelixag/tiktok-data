import React, { useEffect, useMemo, useState } from "react";
import "./index.less";
import { useHistory } from "react-router-dom";
import Login from "../../components/Login/index";
import { cloneDeep } from "lodash";
import Cookies from 'js-cookie';
type BackgroundImage = {backgroundImage: string, display: string}
let arr: BackgroundImage[] = []
const getBackgroundImageList = () => {
  for(let i = 0; i < 200; i++) {
    arr.push({
      backgroundImage:
      `url('https://picsum.photos/1600/820?random=${i}')`,
      display: 'none'
    })
  }
}
const LoginPage = () => {
  let i = 0
  const history = useHistory();
  getBackgroundImageList()
  const [isLogin, setIsLogin] = useState(false);
  const list = cloneDeep(arr);
  list[i].display = 'block'
  list[i+1].display = 'block'
  list[i+2].display = 'block'
  const [backgroundImageList, setBackgroundImageList] = useState<BackgroundImage[]>(list)
  useEffect(() => {
  (isLogin || Cookies.get('LOGIN-TOKEN-FORSNS')) && history.push("/app");
  setInterval(() => {
    i++
    setBackgroundImageList(items => {
      let list = cloneDeep(arr)
      list[i].display = 'block'
      list[i+1].display = 'block'
      list[i+2].display = 'block'
      return list
    })
    if(i === 200) {
      i=0
    }
  },10000)
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
        {backgroundImageList.map((item, index) => <div
            className={`item item${index}`}
            style={item}
          ></div>)}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
