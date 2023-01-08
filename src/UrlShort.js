import React, { useState } from "react";
import {
  Button,
  Form,
  DatePicker,
  Input,
  Tooltip,
  Row,
  Col,
  message,
  Table,
  Modal,
} from "antd";
import { ScissorOutlined } from "@ant-design/icons";
import { CopyOutlined } from "@ant-design/icons";
import axios from "axios";
import { UserContext, useContext } from "./context";
import "./urlPage.css";

function UrlShort() {
  const [shortUrl, setShortUrl] = useState();
  const { usermail, token } = useContext(UserContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [urllist, setUrlList] = useState();
  let result;
  let url_list;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    list();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Url",
      dataIndex: "long_url",
      key: "long_url",
    },
    {
      title: "Kısa Url",
      dataIndex: "short_url",
      key: "short_url",
    },
    {
      title: "Bitiş Tarihi",
      dataIndex: "endDate",
      key: "endDate",
    },
  ];

  const CopytoClickBoard = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const list = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/url/urlListeleme/" + usermail,
        config
      );

      if (response.status == 200) {
        console.log("result.data", response.data);
        url_list = response.data.map((value) => ({
          key: value._id,
          long_url: value.long_url,
          short_url: value.short_url,
          endDate: value.endDate,
        }));
        setUrlList(url_list);
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data.message,
      });
      console.log(error.response.data.message);
    }
  };
  const getshortUrl = async (values) => {
    let urltag = values.urlTag ? values.urlTag : "";
    result = await axios.post(
      "http://localhost:8000/api/url/urlOlustur",
      {
        long_url: values.longUrl,
        kullaniciMail: usermail,
        urlTag: urltag,
        endDate: values.endDate,
      },
      config
    );
    setShortUrl("http://localhost:8000/" + result.data.short_url);
  };

  return (
    <>
      {contextHolder}
      <section>
        <div className="body">
          <Form
            className="urlForm"
            name="basic"
            onFinish={getshortUrl}
            autoComplete="off"
          >
            <Form.Item wrapperCol={{ span: 7 }} label="Uzun Url" name="longUrl">
              <Input style={{ borderColor:"black", borderWidth:"2px"}}/>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 7 }} label="Özel Url &nbsp;" name="urlTag">
              <Input style={{ borderColor:"black", borderWidth:"2px"}} />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 7 }} label="Son Tarih" name="endDate">
              <DatePicker style={{ borderColor:"black", borderWidth:"2px"}} />
            </Form.Item>

            <Form.Item  wrapperCol={{ offset: 3, span: 2}}>
              <Button
                style={{ borderColor:"red", borderWidth:"3px",}}
                shape="round"
                icon={<ScissorOutlined />}
                size={"large"}
                htmlType="submit"
              >
                Kısalt
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 7 }} label="Kısa Url" name="inputgroup">
          <Input.Group compact>
            <Input
              style={{ width: "calc(100% - 200px)",borderColor:"black", borderWidth:"2px"}}
              value={shortUrl}
            ></Input>
            <Tooltip title="copy url">
              <Button onClick={CopytoClickBoard} icon={<CopyOutlined />} />
            </Tooltip>
          </Input.Group>
</Form.Item>
          <Button style={{ borderColor:"red", borderWidth:"3px",}} onClick={showModal}>
            Listele
          </Button>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1300}
          >
            <Table
              dataSource={urllist}
              columns={columns}
              scroll={{ x: "max-content" }}
            ></Table>
          </Modal>
          </Form>
          {/* <Button onClick={list}>Listele</Button>
        <Table dataSource={urllist} columns={columns}></Table> */}
        </div>
      </section>
    </>
  );
}
export default UrlShort;
