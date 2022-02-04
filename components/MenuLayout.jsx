import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  HomeOutlined,
  SearchOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Text } from "@nextui-org/react";
import { React, useContext, useState } from "react";
import { UserContext } from "../contex/user";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function MenuLayout({ children }) {
  const [collapsed, setCollapsed] = useState(true);
  const { state } = useContext(UserContext);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{ maxWidth: "1em" }}
      >
        <Header
          className="header"
          style={{ marginTop: "-0.5em", marginLeft: "0.2em" }}
        ></Header>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link href={`/`}>Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined />}>
            <Link href="/orders">Cari Pesanan</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<MenuUnfoldOutlined />} title="Menu">
            <Menu.Item key="3">
              <Link href="/">Contact</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link href="/">S & K</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="5" icon={<LoginOutlined />}>
            <Link href="/admin">Login</Link>
          </Menu.Item>
          {state.isLogin ? (
            <Menu.Item
              key="6"
              icon={<LogoutOutlined />}
              onClick={() => localStorage.removeItem("adminAuth")}
            >
              <Link href="/">Logout</Link>
            </Menu.Item>
          ) : null}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="header">
          <Text
            b
            h3
            css={{
              textAlign: "center",
              marginTop: "-0.1em",
              textGradient: "45deg, $blue500 -20%, $cyan500 60%",
            }}
            onClick={() => router.push("/", undefined, { shallow: true })}
          >
            Streamingin
          </Text>
        </Header>
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          2022 &copy; Streamingin <br /> All Rights Reserved
        </Footer>
      </Layout>
    </Layout>
  );
}
