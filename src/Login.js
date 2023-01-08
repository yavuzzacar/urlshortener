import React from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext, useContext } from "./context";
import './loginPage.css'



function Login() {
  const { setUserMail, setToken } = useContext(UserContext);

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const navigateToShorten = () => {
    navigate("/shorten");
  };
  const signin = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/kullanici/giris",
        { kullaniciMail: values.usermail, kullaniciSifre: values.password }
      );
      if (response.status == 200) {
        setUserMail(response.data.kullaniciMail);
        setToken(response.data.token);
        navigateToShorten();
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data.message,
      });
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      {contextHolder}
      <div>
      <Form 
        name="basic"
        className="loginForm"
        initialValues={{ remember: true }}
        onFinish={signin}
        autoComplete="off"
      >
        <Form.Item wrapperCol={{ span: 7 }}
          label="Email"
          name="usermail"
          rules={[{ required: true, message: "Lütfen mail adresinizi giriniz!" }]}
        >
          <Input style={{ borderColor:"black", borderWidth:"2px"}}  />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 7 }}
          label="Şifre &nbsp;"
          name="password"
          rules={[{ required: true, message: "Lütfen şifrenizi giriniz!" }]}
        >
          <Input.Password  style={{ borderColor:"black", borderWidth:"2px"}} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 8 }}>
          <Button style={{ borderColor:"red", borderWidth:"3px",}} htmlType="submit">
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>
      </div>
    </>
  );
}
export default Login;
