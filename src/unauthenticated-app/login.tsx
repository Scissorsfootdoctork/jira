import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";

export const LoginScreen = () => {
  const { login } = useAuth();
  const handleSubmit = async (values: { username: string, password: string }) => {
    await login(values);
  };
  return <Form onFinish={handleSubmit}>
    <Form.Item name={"username"} rules={[{ required: true, message: "请输入用户名" }]}>
      <Input type="text" placeholder={"用户名"} id={"username"} />
    </Form.Item>
    <Form.Item name={"password"} rules={[{ required: true, message: "请输入密码" }]}>
      <Input placeholder={"密码"} id={"password"} type={"password"} />
    </Form.Item>
    <Form.Item>
      <LongButton htmlType={"submit"} type={"primary"}>登录</LongButton>
    </Form.Item>
  </Form>;
};
