import MenuLayout from "../components/MenuLayout";
import { Breadcrumb, message, Timeline, Tag } from "antd";
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
  BankOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  FieldTimeOutlined,
  ShoppingCartOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { searchOrder } from "../req/order";
import { useEffect } from "react/cjs/react.development";

export default function Order() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const [initAcc, setinitAcc] = useState({});

  const handleInput = async (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    if (!data.order_code) {
      setVisible(false);
    }
  };

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

        console.log("RES SEARCH ORDER : ", res);
        if (res?.status) {
          setinitAcc(res.data);
          setVisible(true);
          message.success("Pesanan Ditemukan !", 5);
        } else {
          setVisible(false);
          message.error("Kode Pesanan Tidak Ditemukan !", 5);
          setLoading(false);
        }
        setLoading(false);
      }, 4000);
    }
  };

  useEffect(() => {
    localStorage.removeItem("orders");
  }, []);

  const orderData = (
    <>
      {initAcc.order_status === "DONE" ? (
        <Collapse
          title={
            <>
              <Text h4>{initAcc ? initAcc.product : "Error System"}</Text>{" "}
              <Tag color="green">
                <b>SELESAI</b>
              </Tag>
            </>
          }
          subtitle={
            initAcc ? moment(initAcc.updated_at).format("LLLL") : "Error System"
          }
        >
          <Text css={{ whiteSpace: "pre" }}>
            {initAcc ? initAcc?.desc : "Error System"}
          </Text>
        </Collapse>
      ) : initAcc.order_status === "PROCESS" ? (
        <Timeline>
          <Timeline.Item dot={<ShoppingCartOutlined />} color="blue">
            Pesanan Dibuat
          </Timeline.Item>
          <Timeline.Item dot={<FieldTimeOutlined />} color="blue">
            Menunggu Pembayaran
          </Timeline.Item>
          <Timeline.Item dot={<CheckOutlined />} color="blue">
            Pembayaran Diterima
          </Timeline.Item>
          <Timeline.Item dot={<SyncOutlined spin />} color="blue">
            Sedang Di Proses
          </Timeline.Item>
        </Timeline>
      ) : initAcc.order_status === "PENDING" ? (
        <Timeline>
          <Timeline.Item dot={<ShoppingCartOutlined />} color="blue">
            Pesanan Dibuat
          </Timeline.Item>
          <Timeline.Item dot={<FieldTimeOutlined />} color="blue">
            Menunggu Pembayaran
          </Timeline.Item>
        </Timeline>
      ) : (
        initAcc.order_status === "CANCEL" && (
          <Timeline>
            <Timeline.Item dot={<ShoppingCartOutlined />} color="blue">
              Pesanan Dibuat
            </Timeline.Item>
            <Timeline.Item dot={<FieldTimeOutlined />} color="blue">
              Menunggu Pembayaran
            </Timeline.Item>
            <Timeline.Item dot={<CloseCircleOutlined />} color="red">
              Pesanan Dibatalkan
            </Timeline.Item>
          </Timeline>
        )
      )}
    </>
  );

  // Email : mail@mail.com
  // Password : abc123
  // Profile : 1
  // Pin : 2211
  // Exp : 5 Feb 2022

  // useEffect(() => {
  //   if (localStorage.getItem("orders")) {
  //     localStorage.removeItem("orders");
  //   } else {
  //     return null;
  //   }
  // }, []);

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
