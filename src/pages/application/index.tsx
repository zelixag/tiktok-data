import { Button, Layout, Menu, Spin } from "antd";
import Cookies from "js-cookie";
import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import {
  MenuUnfoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import "./index.less";
import TalentByIdBatchSearch from "../../components/TalentIdBatchSearch";
const { Header, Sider, Content, Footer } = Layout;
const ProductList = lazy(() => import("../product/list"));
const TalentBaseInfo = lazy(() => import("../talent/base-info"));
const TalentDetailINfo = lazy(() => import("../talent/detail-info"));
const TalentBatchList = lazy(() => import("../talent/batch-list"));
const TalentBatchInfoList = lazy(() => import("../talent/batch-info-list"));
const BrandTalentInfoList = lazy(() => import("../brand/talent-list"));
const AwemeList = lazy(() => import("../aweme/list"));
const Test = lazy(() => import("../test"));
const routes = [
  {
    path: "/product/list",
    component: ProductList,
    icon: <PieChartOutlined />,
    name: "商品列表",
  },
  {
    path: "/talent/base-info",
    component: TalentBaseInfo,
    icon: <MenuUnfoldOutlined />,
    name: "达人基本信息列表",
  },
  {
    path: "/talent/detail-info",
    component: TalentDetailINfo,
    icon: <DesktopOutlined />,
    name: "达人详细信息列表",
  },
  {
    path: "/talent/batch-list",
    component: TalentBatchList,
    icon: <DesktopOutlined />,
    name: "达人批量ID或抖音昵称列表",
  },
  {
    path: "/talent/batch-info—list",
    component: TalentBatchInfoList,
    icon: <DesktopOutlined />,
    name: "达人批量ID或抖音昵称详细列表",
  },
  {
    path: "/brand/talent-list",
    component: BrandTalentInfoList,
    icon: <ContainerOutlined />,
    name: "品牌达人列表",
  },
  {
    path: "/aweme/list",
    component: AwemeList,
    icon: <ContainerOutlined />,
    name: "商品视频",
  },
  {
    path: "/test/index",
    component: Test,
    icon: <ContainerOutlined />,
    name: "联系页面",
  },
];
const Application = () => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const match = useRouteMatch();
  useEffect(() => {
    history.push(`${match.url}${routes[0].path}`);
  }, []);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo">
          <h1 style={{ color: "#fff" }}>特赞</h1>
          <img src="" alt="" />
        </div>
        <Menu
          defaultSelectedKeys={["/product/list"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          onClick={(e) => {
            history.push(`${match.url}${e.key}`);
          }}
        >
          {routes.map((item) => (
            <Menu.Item key={item.path} icon={item.icon}>
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <Button
              onClick={() => {
                Cookies.set("LOGIN-TOKEN-FORSNS", "", {});
                window.location.href = "/";
              }}
            >
              登出
            </Button>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Switch>
              {routes.map((item) => (
                <Route
                  key={item.path}
                  path={`${match.url}${item.path}`}
                  component={item.component}
                ></Route>
              ))}
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Application;
