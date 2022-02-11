import MenuLayout from "../../../components/MenuLayout";
import {
  Card,
  Collapse,
  Text,
  Loading,
  Button,
  Grid,
  Input,
  Textarea,
  Radio,
  Row,
  Col,
} from "@nextui-org/react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import {
  SearchOutlined,
  ArrowLeftOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

import { Alert, Form, Tag } from "antd";
import Link from "next/link";
import { UserContext } from "../../../contex/user";
import { getAllOrder, updateOrder } from "../../../req/order";

export default function Orders() {
  const [inputs, setInputs] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(UserContext);
  const router = useRouter();
  const { type } = router.query;

  const handleInputs = async (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    if (inputs.desc || inputs.status || inputs.id_product) {
      const res = await updateOrder(inputs.id_product, inputs);
      console.log("RES UPTSDE : ", res);
    }

    setLoading(false);
  };

  const loadData = async () => {
    setLoading(true);
    const res = await getAllOrder();

    if (res) {
      setOrders(res.data);
      setLoading(false);
    } else {
      console.log("ERR DATA  ");
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    if (JSON.parse(localStorage.getItem("adminAuth"))?.status) {
      dispatch({
        type: "LOGIN",
        userData: JSON.parse(localStorage.getItem("adminAuth")).user,
      });
    } else {
      router.push("/auth/login", undefined, { shallow: true });
    }
  };

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);
  return (
    <>
      <MenuLayout>
        <Link passHref href="/admin">
          <Button flat color="primary" size="xs" css={{ mt: "1.5em" }}>
            <ArrowLeftOutlined />
            &nbsp; Kembali
          </Button>
        </Link>
        <Text
          h3
          b
          css={{ textAlign: "center", marginTop: "1em", marginBottom: "0.5em" }}
        >
          {type === "SUCCESS"
            ? "Success"
            : type === "PROCESS"
            ? "Process"
            : type === "PENDING"
            ? "Pending"
            : type === "CANCEL" && "Cancel"}
          Orders
        </Text>

        <Col
          css={{ textAlign: "center", marginTop: "1em", marginBottom: "0.5em" }}
        >
          <Input
            underlined
            clearable
            labelPlaceholder="Cari Kode Order"
            color="primary"
            contentRight={<SearchOutlined />}
          />
          <Grid.Container css={{ mt: "2em" }}>
            {orders ? (
              orders.map((item) => {
                if (
                  item.order_status ===
                  JSON.parse(localStorage.getItem("adminAuth")).type
                ) {
                  return (
                    <Grid>
                      <Collapse.Group splitted>
                        <Collapse title={item.order_code}>
                          <Alert
                            message={
                              <Text>
                                <b>Pembeli :</b> {item.buyer} <br />
                                <b>Product :</b> {item.product} <br />
                                <b>ID :</b> {item.id} <br />
                                <b>Price :</b> Rp{" "}
                                {item.total_price.toLocaleString("id")}
                                <br />
                                <b>Pembayaran :</b> {item.payment} <br />
                                <b>Status :</b>{" "}
                                {item.order_status === "DONE" ? (
                                  <Text color="success">SUCCESS</Text>
                                ) : item.order_status === "PROCESS" ? (
                                  <Text color="primary">PROSES</Text>
                                ) : item.order_status === "PENDING" ? (
                                  <Text color="warning">PENDING</Text>
                                ) : (
                                  item.order_status === "CANCEL" && (
                                    <Text color="error">CANCEL</Text>
                                  )
                                )}
                              </Text>
                            }
                            type="info"
                            closable
                            style={{ marginBottom: "1em", textAlign: "left" }}
                          />
                          <Input
                            required
                            underlined
                            clearable
                            onChange={(e) => handleInputs(e)}
                            initialValue={item.id}
                            name="id_product"
                            placeholder="id"
                            color="primary"
                            size="sm"
                            type="number"
                            css={{ mb: "1em" }}
                          />
                          <Textarea
                            required
                            clearable
                            placeholder="Akun ..."
                            name="desc"
                            minRows={2}
                            maxRows={10}
                            onInput={(e) => handleInputs(e)}
                          />
                          <Form.Item
                            label="Status"
                            style={{
                              marginTop: "2em",
                              marginBottom: "-1em",
                              fontColor: "blue",
                            }}
                          />
                          <Radio.Group>
                            <Radio
                              value="DONE"
                              name="status"
                              size="xs"
                              onInput={(e) => handleInputs(e)}
                              squared
                            >
                              <Tag color="success">
                                <b>SUCCESS</b>
                              </Tag>
                            </Radio>
                            <Radio
                              value="PROCESS"
                              name="status"
                              size="xs"
                              onInput={(e) => handleInputs(e)}
                              squared
                            >
                              <Tag color="blue">
                                <b>PROSES</b>
                              </Tag>
                            </Radio>
                            <Radio
                              value="PENDING"
                              name="status"
                              size="xs"
                              onInput={(e) => handleInputs(e)}
                              squared
                            >
                              <Tag color="warning">
                                <b>PENDING</b>
                              </Tag>
                            </Radio>
                            <Radio
                              value="CANCEL"
                              name="status"
                              size="xs"
                              onInput={(e) => handleInputs(e)}
                              squared
                            >
                              <Tag color="error">
                                <b>CANCEL</b>
                              </Tag>
                            </Radio>
                          </Radio.Group>
                          <Button
                            flat
                            color="primary"
                            size="md"
                            css={{ mt: "1.5em" }}
                            onClick={() => handleUpdate()}
                            disabled={loading}
                          >
                            {loading ? (
                              <Loading type="points" size="md" />
                            ) : (
                              `update`
                            )}
                          </Button>
                        </Collapse>
                      </Collapse.Group>
                    </Grid>
                  );
                }
              })
            ) : (
              <Loading
                type="default"
                size="xl"
                css={{ ml: "6.5em", marginTop: "5em", margin: "3em auto" }}
              />
            )}
          </Grid.Container>
        </Col>
      </MenuLayout>
    </>
  );
}
