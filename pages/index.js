import MenuLayout from "../components/MenuLayout";
import CardLanding from "../components/atom/CardLanding";
import { Card, Text, Loading, Col, Grid } from "@nextui-org/react";
import Image from "next/image";
import { getProducts } from "../req/products";
import { useContext, useEffect, useState } from "react";
import { Alert } from "antd";
import Marquee from "react-fast-marquee";
import { UserContext } from "../contex/user";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useContext(UserContext);

  const getProductsData = async () => {
    const res = await getProducts();
    setProducts(res?.data);

    if (products) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    localStorage.removeItem("orders");
    localStorage.removeItem("adminAuth");
    dispatch({
      type: "LOGOUT",
    });
    getProductsData();
  }, []);

  return (
    <>
      <MenuLayout>
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb> */}

        <Alert
          banner
          type="info"
          style={{ marginTop: "1em" }}
          message={
            <Marquee pauseOnHover gradient={false} speed={80}>
              Elcode Baru Saja Membeli NETFLIX Sharing 1 Bulan&nbsp;|&nbsp;Ram
              Baru Saja Membeli SPOTIFY Individu 1 Bulan&nbsp;|&nbsp;
            </Marquee>
          }
        />

        <Card css={{ marginTop: "1.2em", w: "auto", marginBottom: "1.5em" }}>
          <Col css={{ justifyItems: "center", textAlign: "center" }}>
            <Image
              src="/assets/img/setreamingin-icon.png"
              width={100}
              height={100}
              alt=""
              style={{ display: "block", margin: "0 auto" }}
            />
            <Text h3>STREAMINGIN</Text>
          </Col>
          <Card.Footer css={{ justifyItems: "center", textAlign: "center" }}>
            <Text>
              Platform Firsthand Premium Account di Indonesia yang memberikan
              layanan berlangganan untuk mendapatkan fitur premium seperti
              Netflix, Spotify, Youtube dan lainnya.
            </Text>
          </Card.Footer>
        </Card>

        <Text h2 b css={{ textAlign: "center" }}>
          Produk
        </Text>

        <Grid.Container
          gap={1}
          justify="space-between"
          css={{ margin: "0 auto" }}
        >
          {loading ? (
            <Loading
              type="default"
              size="xl"
              css={{ ml: "6.5em", marginTop: "5em", margin: "3em auto" }}
            />
          ) : (
            products.map((item, index) => {
              return (
                <Grid sm={4} key={index}>
                  <CardLanding
                    price={item.price}
                    stock={item.stock}
                    category={item.category_name}
                    name={item.product_name}
                    status={item.product_status}
                    desc={item.desc}
                  />
                </Grid>
              );
            })
          )}
        </Grid.Container>
      </MenuLayout>
    </>
  );
}
