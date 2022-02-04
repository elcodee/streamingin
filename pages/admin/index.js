import MenuLayout from "../../components/MenuLayout";
import {
  Card,
  Text,
  Loading,
  Button,
  Grid,
  Input,
  Row,
  Col,
} from "@nextui-org/react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import {
  ShoppingCartOutlined,
  CheckOutlined,
  SyncOutlined,
  Loading3QuartersOutlined,
  BankOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserContext } from "../../contex/user";

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(UserContext);
  const router = useRouter();

  const checkauth = async () => {
    if (JSON.parse(localStorage.getItem("adminAuth"))?.isLogin) {
      dispatch({
        type: "AUTH_SUCCESS",
        userData: JSON.parse(localStorage.getItem("adminAuth")),
      });
    } else {
      router.push("/auth/login", undefined, { shallow: true });
    }
  };

  useEffect(() => {
    checkauth();
  }, []);
  return (
    <>
      <MenuLayout>
        <Text
          h3
          b
          css={{ textAlign: "center", marginTop: "1em", marginBottom: "1em" }}
        >
          Dashboard
        </Text>

        {/* <Alert
          message="Warning"
          description="This is a warning notice about copywriting."
          type="warning"
          showIcon
          style={{ marginTop: "1em", marginBottom: "1em" }}
          closable
        /> */}

        <Grid.Container gap={2}>
          <Grid xs={12} md={3}>
            <Card shadow>
              <Text
                css={{ fontWeight: "$bold", color: "black" }}
                transform="capitalize"
              >
                <ShoppingCartOutlined style={{ marginRight: "0.5em" }} />
                TOTAL ORDERS
              </Text>
              <Text css={{ color: "black" }} span>
                291 Pesanan
              </Text>
            </Card>
          </Grid>

          <Grid xs={12} md={3}>
            <Card shadow>
              <Text
                css={{ fontWeight: "$bold", color: "black" }}
                transform="capitalize"
              >
                <BankOutlined style={{ marginRight: "0.5em" }} />
                BERSIH
              </Text>
              <Text css={{ color: "black" }} span>
                Rp 2.880.000
              </Text>
            </Card>
          </Grid>

          <Grid xs={12} md={3}>
            <Card shadow>
              <Text
                css={{ fontWeight: "$bold", color: "black" }}
                transform="capitalize"
              >
                <BankOutlined style={{ marginRight: "0.5em" }} />
                KOTOR
              </Text>
              <Text css={{ color: "black" }} span>
                Rp 4.320.000
              </Text>
            </Card>
          </Grid>

          <Grid xs={12} md={3}>
            <Card shadow>
              <Text
                css={{ fontWeight: "$bold", color: "black" }}
                transform="capitalize"
              >
                <CheckOutlined style={{ marginRight: "0.5em" }} />
                SUCCESS
              </Text>
              <Text css={{ color: "black" }} span>
                128 Pesanan
              </Text>
              <Link href={`/admin/orders/success`}>
                <Button flat color="success" size="xs" css={{ mt: "1em" }}>
                  CEK
                </Button>
              </Link>
            </Card>
          </Grid>

          <Grid xs={12} md={3}>
            <Card shadow>
              <Text
                css={{ fontWeight: "$bold", color: "black" }}
                transform="capitalize"
              >
                <SyncOutlined style={{ marginRight: "0.5em" }} />
                PROSES
              </Text>
              <Text css={{ color: "black" }} span>
                39 Pesanan
              </Text>
              <Link href={`/admin/orders/process`}>
                <Button flat color="default" size="xs" css={{ mt: "1em" }}>
                  CEK
                </Button>
              </Link>
            </Card>
          </Grid>

          <Grid xs={12} md={3}>
            <Card shadow>
              <Text
                css={{ fontWeight: "$bold", color: "black" }}
                transform="capitalize"
              >
                <Loading3QuartersOutlined style={{ marginRight: "0.5em" }} />
                PENDING
              </Text>
              <Text css={{ color: "black" }} span>
                19 Pesanan
              </Text>
              <Link href={`/admin/orders/pending`}>
                <Button flat color="warning" size="xs" css={{ mt: "1em" }}>
                  CEK
                </Button>
              </Link>
            </Card>
          </Grid>

          <Grid xs={12} md={3}>
            <Card shadow>
              <Text
                css={{ fontWeight: "$bold", color: "black" }}
                transform="capitalize"
              >
                <CloseOutlined style={{ marginRight: "0.5em" }} />
                CANCEL
              </Text>
              <Text css={{ color: "black" }} span>
                8 Pesanan
              </Text>
              <Link href={`/admin/orders/cancel`}>
                <Button flat color="error" size="xs" css={{ mt: "1em" }}>
                  CEK
                </Button>
              </Link>
            </Card>
          </Grid>
        </Grid.Container>
      </MenuLayout>
    </>
  );
}
