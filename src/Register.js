import React from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext, useContext } from "./context";
import './registerPage.css'

function Register() {
  const { setUserMail,setToken } = useContext(UserContext);

  const [messageApi, contextHolder] = message.useMessage();

  const signup = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/kullanici/kayit",
        { kullaniciMail: values.usermail, kullaniciSifre: values.password }
      );
      if (response.status == 201) {
        setUserMail(response.data.kullaniciMail) 
        setToken(response.data.token)
        messageApi.open({
            type: "success",
            content: "Kayıt Başarılı",
          });
       
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
      <Form
        className="registerForm"
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={signup}
        autoComplete="off"
      >
       <Form.Item wrapperCol={{ span: 7 }}
          label="Email"
          name="usermail"
          rules={[
            {
              required: true,
              message: "Lütfen mail adresinizi giriniz!",
            },
          ]}
        >
          <Input style={{ borderColor:"black", borderWidth:"2px"}}/>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 7 }}
          label="Şifre &nbsp;"
          name="password"
          rules={[
            {
              required: true,
              message: "Lütfen şifrenizi giriniz!",
            },
          ]}
        >
          <Input.Password style={{ borderColor:"black", borderWidth:"2px"}} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 8 }}>
          
          <Button style={{ borderColor:"red", borderWidth:"3px",}} htmlType="submit">
            Kayıt Ol
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default Register;