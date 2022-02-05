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

export default function Orders() {
  const [inputs, setInputs] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(UserContext);
  const router = useRouter();
  const { type } = router.query;

  console.log("INPUTS : ", inputs);

  const handleInputs = async (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const checkAuth = async () => {
    if (JSON.parse(localStorage.getItem("adminAuth")).isLogin) {
      dispatch({
        type: "AUTH_SUCCESS",
        userData: JSON.parse(localStorage.getItem("adminAuth")),
      });
    } else {
      router.push("/auth/login", undefined, { shallow: true });
    }
  };

  useEffect(() => {
    checkAuth();
  });
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
          {type === "success"
            ? "Success"
            : type === "process"
            ? "Process"
            : type === "pending"
            ? "Pending"
            : type === "cancel" && "Cancel"}{" "}
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
            <Grid>
              <Collapse.Group splitted>
                <Collapse title="#123321">
                  <Alert
                    message={
                      <Text>
                        <b>Pembeli :</b> elcode <br />
                        <b>Product :</b> NETFLIX Sharing 1 Bulan <br />
                        <b>Price :</b> Rp 45.000 <br />
                        <b>Pembayaran :</b> BCA <br />
                        <b>Status :</b> <Text color="success">SUCCESS</Text>{" "}
                        <Text color="primary">PROSES</Text>{" "}
                        <Text color="warning">PENDING</Text>{" "}
                        <Text color="error">CANCEL</Text>
                      </Text>
                    }
                    type="info"
                    closable
                    style={{ marginBottom: "1em", textAlign: "left" }}
                  />
                  <Textarea
                    placeholder="Akun ..."
                    name="akun"
                    minRows={1}
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
                      value="success"
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
                      value="process"
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
                      value="pending"
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
                      value="cancel"
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
                  <Button flat color="primary" size="md" css={{ mt: "1.5em" }}>
                    <RedoOutlined />
                    &nbsp; Update
                  </Button>
                </Collapse>
              </Collapse.Group>
            </Grid>
          </Grid.Container>
        </Col>
      </MenuLayout>
    </>
  );
}
