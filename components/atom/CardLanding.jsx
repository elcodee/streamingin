import {
  Card,
  Row,
  Col,
  Text,
  Button,
  Modal,
  Input,
  Checkbox,
  Mail,
  Password,
} from "@nextui-org/react";
import { Tag } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { notification } from "antd";
import { useRouter } from "next/router";
import { CloseOutlined } from "@ant-design/icons";
import ModalLanding from "./ModalLanding";

export default function CardLanding({
  price,
  stock,
  category,
  name,
  status,
  desc,
}) {
  const [credentials, setCredentials] = useState({});
  const router = useRouter();

  const nootifFailed = (msg) => {
    notification.open({
      icon: <CloseOutlined twoToneColor="#f21361" />,
      message: msg,
      description: "Silahkan Masuk / Daftar Untuk Membeli.",
    });
  };

  const handleClick = async (params) => {
    console.log("PARAM :", params);
    if (!credentials?.token) {
      nootifFailed("Unauthorized");
    } else {
      router.push("/order", undefined, { shallow: true });
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      setCredentials(JSON.parse(localStorage.getItem("auth")));
    } else {
      localStorage.removeItem("auth");
    }
  }, []);
  return (
    <Card cover css={{ w: "auto", p: 0 }}>
      <Card.Header css={{ position: "absolute" }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
            <Tag icon={<CheckCircleOutlined />} color="success">
              {status}
            </Tag>
          </Text>
          <Text h3 color="white">
            {category}
          </Text>
          <Text h4 color="white">
            {name}
          </Text>
        </Col>
      </Card.Header>
      <Card.Body>
        <Card.Image
          src={
            category == "Netflix"
              ? "https://data.whicdn.com/images/345656338/original.png?t=1592837478"
              : category == "Spotify"
              ? "https://theoakdalepost.com/wp-content/uploads/2021/01/Spotify-logo.png"
              : category == "Viu" &&
                "https://www.jagatreview.com/wp-content/uploads/2016/07/Viu-logo.png"
          }
          height={400}
          width="100%"
          alt="Relaxing app background"
        />
      </Card.Body>
      <Card.Footer
        blur
        css={{
          position: "absolute",
          bgBlur: "#0f1114",
          borderTop: "$borderWeights$light solid $gray700",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Row justify="space-between">
              <Col>
                <Text h5 color="white" css={{ marginTop: "0.5em" }}>
                  Rp {parseInt(price).toLocaleString("id")}
                </Text>
                <Text h6 color="white" css={{ marginBottom: "0.5em" }}>
                  Stock {stock}
                </Text>
              </Col>

              {credentials ? (
                <ModalLanding
                  price={price}
                  stock={stock}
                  category={category}
                  name={name}
                  status={status}
                  desc={desc}
                />
              ) : (
                <Button
                  flat
                  auto
                  // rounded
                  justify="flex-end"
                  css={{
                    color: "#94f9f0",
                    bg: "#94f9f026",
                    textAlign: "end",
                    marginTop: "0.5em",
                  }}
                  onClick={() =>
                    handleClick({ price, stock, category, name, status })
                  }
                >
                  <Text
                    css={{ color: "inherit" }}
                    size={13}
                    weight="bold"
                    transform="uppercase"
                  >
                    Beli
                  </Text>
                </Button>
              )}
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}
