import React, { useEffect } from "react"
import { Form, Input, Button, Checkbox } from 'antd';
import { login } from "../../services/userServices";
import './index.less'

type Props = {
  login: (isLogin: boolean) => void
}
const  Login = (props: Props) => {
  const onFinish = async (values: {username: string; password: string}) => {
    const {username, password} = values;
    const data = await login(username, password);
    props.login(!!data.token)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="dd-login">
      <h2 style={{color: "#fff"}}>抖DATA</h2>
      <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="请输入手机号" style={{width: 280}}/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="请输入密码" style={{width: 280}}/>
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox style={{color: "#fff"}}>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}

export default Login