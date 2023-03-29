import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { navbar } from "../../utils/navbar";

import { Button } from "../Generic/Button";
import { Container, Link, Logo, Main, Menu, Section1,Section2, Section3,  Wrapper } from "./style";
import Footer from "../Footer";
import { Dropdown } from "antd";

export const Home = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/signin");
  };
  const onClickProfile = ({
    target: {
      dataset: { name },
    },
  }) => {
    if (name === "logout") {
      localStorage.removeItem("token");
      navigate(`/home`);
    } else {
      navigate(`${name}`);
    }
  };
  const menu = (
    <Menu>
      <Menu.Item data-name="myprofile" onClick={onClickProfile}>
        My profile
      </Menu.Item>
      <Menu.Item data-name="favourite" onClick={onClickProfile}>
        Favourites
      </Menu.Item>
      <Menu.Item data-name="logout" onClick={onClickProfile}>
        Log out
      </Menu.Item>
    </Menu>
  );
  return (
    <Container>
      <Main>
        <Wrapper>
          <Section1 onClick={() => navigate("/home")} logo>
            <Logo /> <h3 style={{ color: "white" }}>Uylar</h3>
          </Section1>
          <Section2>
            {navbar.map(({ title, path, hidden }, index) => {
              return (
                !hidden && (
                  <Link
                    className={({ isActive }) => isActive && "active"}
                    key={index}
                    to={path}
                  >
                    {title}
                  </Link>
                )
              );
            })}
          </Section2>
          <Section3>
            {token ? (
              <Dropdown
                overlay={menu}
                placement="topRight"
                arrow={{ pointAtCenter: true }}
                trigger="click"
              >
                <Button type="dark">
                  <div>Profile</div>
                </Button>
              </Dropdown>
            ) : (
              <Button onClick={onClick} type="dark">
                Sign In
              </Button>
            )}
          </Section3>
        </Wrapper>
      </Main>
      {/* <Filter /> */}
      
      <Outlet />
      <Footer />
    </Container>
  );
};

export default Home;
