import MenuLayout from "../components/MenuLayout";
import { Breadcrumb, message, Timeline } from "antd";
import {
  Card,
  Text,
  Row,
  Col,
  Collapse,
  Button,
  Loading,
  Input,
} from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ShoppingCartOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useEffect } from "react/cjs/react.development";
import { searchOrder } from "../req/order";

export default function Order() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});

  const handleInput = async (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    if (!data.order_code) {
      setVisible(false);
    }
  };

  console.log("DATA : ", data);
  localStorage.removeItem("orders");

  const handleSubmit = async () => {
    setLoading(true);

    if (!data.order_code || data?.order_code.length < 7) {
      setTimeout(() => {
        setVisible(false);
        message.error("Kode Pesanan Tidak Ditemukan !", 5);
        setLoading(false);
      }, 2000);
    } else {
      setTimeout(async () => {
        const res = await searchOrder({ kode_order: data.order_code });
        console.log("RES : ", res);
        setVisible(true);
        message.success("Pesanan Ditemukan !", 5);
        setLoading(false);
      }, 4000);
    }
  };

  const statusOrder = (
    <Timeline style={{ marginTop: "2em" }}>
      <Timeline.Item dot={<ShoppingCartOutlined />} color="lime">
        Menunggu Pembayaran
      </Timeline.Item>
      <Timeline.Item dot={<SyncOutlined spin />} color="blue">
        Sedang Di Proses
      </Timeline.Item>
      <Timeline.Item dot={<CheckCircleOutlined />} color="green">
        Pesanan Selesai
      </Timeline.Item>
      <Timeline.Item dot={<CloseCircleOutlined />} color="red">
        Pesanan Dibatalkan
      </Timeline.Item>
    </Timeline>
  );

  const orderData = (
    <>
      <Collapse title={<Text h4>Sharing 1 Bulan</Text>} subtitle="NETFLIX">
        <Text>
          ------------------------- <br />
          Email : mail@mail.com <br />
          Password : abc123 <br />
          Profile : 1 <br />
          Pin : 2211 <br />
          Exp : 5 Feb 2022 <br />
          -------------------------
        </Text>
      </Collapse>
    </>
  );

  return (
    <>
      <MenuLayout>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Pesanan Saya</Breadcrumb.Item>
        </Breadcrumb>

        <Card bordered shadow={false} hoverable css={{ mt: "1em" }}>
          <Text h3>Cari Pesanan</Text>
          <div style={{ marginBottom: "1.5em" }}></div>
          <Input
            required
            underlined
            clearable
            bordered
            fullWidth
            onChange={(e) => handleInput(e)}
            name="order_code"
            label="Kode Pesanan"
            placeholder="#xxxxxx"
            color="primary"
            size="lg"
            type="text"
          />

          <Button disabled={loading} onClick={handleSubmit} css={{ mt: "1em" }}>
            {loading ? (
              <Loading
                type="points"
                size="md"
                // css={{
                //   ml: "5em",
                // }}
              />
            ) : (
              `Cari`
            )}
          </Button>

          <div style={{ marginTop: "1.5em", marginBottom: "1.5em" }}></div>

          <Collapse.Group>
            {!loading && !visible ? (
              <div></div>
            ) : (
              visible && !loading && orderData
            )}
          </Collapse.Group>
        </Card>
      </MenuLayout>
    </>
  );
}
