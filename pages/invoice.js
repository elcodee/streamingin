import MenuLayout from "../components/MenuLayout";
import { Breadcrumb, Tag, Alert } from "antd";
import { Card, Text, Row, Col, Button } from "@nextui-org/react";
import { WhatsAppOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Invoice() {
  const [order, setOrder] = useState({});
  const router = useRouter();

  const getDataOrder = async () => {
    const orders = JSON.parse(localStorage.getItem("orders"));
    if (orders) {
      setOrder(orders);
    } else {
      router.push("/", undefined, { shallow: true });
    }
  };

  useEffect(() => {
    getDataOrder();

    // if (JSON.parse(localStorage.getItem("orders"))) {
    //   localStorage.removeItem("orders");
    // }
  }, []);

  return (
    <>
      <MenuLayout>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Invoice</Breadcrumb.Item>
        </Breadcrumb>

        <Card bordered shadow={false} hoverable>
          <Row justify="space-between">
            <Text h3>Invoice</Text>
            <Image
              src="/assets/img/setreamingin-icon.png"
              width={35}
              height={35}
              alt=""
              style={{ display: "block", margin: "0 auto", marginTop: "1em" }}
            />
          </Row>

          <b style={{ marginTop: "1em", marginBottom: "1em" }}>
            <Alert
              message="Harap Simpan Kode Order Untuk Melihat Pesanan Anda"
              type="warning"
              showIcon
            />
          </b>

          <Row css={{ mb: "0.5em" }}>
            <Text b>Kode Order : &nbsp;</Text>
            <Text color="error" b>
              #{order.kode_order}
            </Text>
          </Row>
          <Row css={{ mb: "0.3em" }}>
            <Text b>Pembeli : &nbsp;</Text>
            <Text>{order.nama_pembeli}</Text>
          </Row>
          <Row css={{ mb: "0.3em" }}>
            <Text b>Whatsapp : &nbsp;</Text>
            <Text>{order.no_whatsapp}</Text>
          </Row>
          <Row css={{ mb: "0.3em" }}>
            <Col>
              <Text b>Produk : &nbsp;</Text>
              <Text>{order.product}</Text>
            </Col>
          </Row>
          <Row css={{ mb: "0.3em" }}>
            <Text b>Harga : &nbsp;</Text>
            <Text>Rp {parseInt(order.price).toLocaleString("id")}</Text>
          </Row>
          <Row css={{ mb: "0.3em" }}>
            <Col>
              <Text b>Pembayaran : &nbsp;</Text>
              <Text>
                <i style={{ color: "blue" }}>
                  {order.payment === "BCA"
                    ? "BCA | 740 1444 258 A/n Rama Aditya"
                    : order.payment === "GOPAY"
                    ? "GOPAY | 0819 3270 9954 A/n Rama Aditya"
                    : order.payment === "OVO"
                    ? "OVO | 0819 3270 9954 A/n Rama Aditya"
                    : order.payment === "DANA" &&
                      "DANA | 0851 5618 7157 A/n Danar D"}
                </i>
              </Text>
            </Col>
          </Row>
          <Row>
            <Text b>Status : &nbsp;</Text>
            <Text>
              {order.status === "PENDING" ? (
                <Tag color="orange">
                  <b>MENUNGGU PEMBAYARAN</b>
                </Tag>
              ) : order.status === "PROCESS" ? (
                <Tag color="blue">
                  <b>PROSES</b>
                </Tag>
              ) : order.status === "SUCCESS" ? (
                <Tag color="green">
                  <b>SUCCESS</b>
                </Tag>
              ) : (
                order.status === "CANCEL" && (
                  <Tag color="red">
                    <b>DIBATALKAN</b>
                  </Tag>
                )
              )}
            </Text>
          </Row>
        </Card>

        <Card
          bordered
          shadow={false}
          hoverable
          css={{ mt: "1em" }}
          color="default"
        >
          <Row justify="center">
            <Text h3>Konfirmasi Pesanan</Text>
          </Row>

          <b style={{ marginTop: "1em", marginBottom: "1em" }}>
            <Alert
              message="Segera Kirim Bukti Pembayaran Anda Agar Pesanan Dapat Di Proses"
              type="info"
              showIcon
            />
          </b>

          <div style={{ marginTop: "0.5em", marginBottom: "1em" }}></div>

          <a
            href={`https://api.whatsapp.com/send?phone=6285156187157&text=Hallo%20admin%20mau%20kirim%20bukti%20pembayaran%20${order?.product}%20kode%20order%20${order?.kode_order}%20total%20bayar%20Rp${order?.price}%20tolong%20segera%20di%20proses%2C%20terima%20kasih`}
            target="tab"
          >
            <Button
              size="lg"
              color="success"
              onClick={() => localStorage.removeItem("orders")}
            >
              <WhatsAppOutlined style={{ marginRight: "0.5em" }} />
              Konfirmasi Sekarang
            </Button>
          </a>
        </Card>
      </MenuLayout>
    </>
  );
}
