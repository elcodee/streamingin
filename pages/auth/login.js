import MenuLayout from "../../components/MenuLayout";
import { Card, Text, Loading, Button, Grid, Input } from "@nextui-org/react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Alert } from "antd";
import { useRouter } from "next/router";
import { UserContext } from "../../contex/user";
import { loginAction } from "../../req/auth";

export default function Home() {
  const [dataLogin, setDataLogin] = useState({});
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const { dispatch } = useContext(UserContext);

  const handleInputs = async (e) => {
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(async () => {
      if (!dataLogin.email || !dataLogin.password) {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 6000);
        setLoading(false);
      } else {
        const res = await loginAction(dataLogin);
        console.log("RES LOGIN : ", res);

        if (res?.data?.status) {
          dispatch({
            type: "LOGIN",
            payload: {
              isLogin: true,
              userData: dataLogin,
            },
          });

          router.push("/admin", undefined, { shallow: true });
          setLoading(false);
        }
      }
    }, 3000);
  };

  return (
    <>
      <MenuLayout>
        <Grid.Container
          gap={1}
          justify="space-between"
          css={{ margin: "2em  auto" }}
        >
          <Card css={{ w: "30em", margin: "0 auto" }}>
            <Text h4 color="black" css={{ textAlign: "center", mb: "2em" }}>
              Login Admin
            </Text>
            {isError ? (
              <Alert
                message="Invalid Credentials"
                type="error"
                showIcon
                closable
                style={{ marginBottom: "3em", marginTop: "-2em" }}
              />
            ) : null}

            <Input
              underlined
              labelPlaceholder="Email"
              name="email"
              onInput={(e) => handleInputs(e)}
              color="primary"
              css={{ mb: "2.5em" }}
            />
            <Input.Password
              underlined
              labelPlaceholder="Password"
              name="password"
              onInput={(e) => handleInputs(e)}
              color="primary"
            />
            <Card.Footer>
              <Button
                color="primary"
                auto
                onClick={handleLogin}
                clickable={!loading}
              >
                {loading ? (
                  <Loading color="white" type="points" size="md" />
                ) : (
                  `Login`
                )}
              </Button>
            </Card.Footer>
          </Card>
        </Grid.Container>
      </MenuLayout>
    </>
  );
}
