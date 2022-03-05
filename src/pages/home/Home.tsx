import React from "react";
import s from "./Home.module.scss";

import pages from "~/Routers/pages";
import { useNavigate } from "react-router-dom";
import WingBlank from "~/components/WingBlank";
import Button from "~/components/Button";
import Space from "~/components/Space";

interface Props {}

const Home: React.FC<Props> = () => {
  const navigate = useNavigate();
  return (
    <>
      <Space />
      <WingBlank>
        <h3>静态页面</h3>
        {pages.map((item) =>
          item.page !== "home" ? (
            <Button
              className={s.button}
              size="mini"
              key={item.page}
              type="outlineorange"
              onClick={() =>
                navigate(
                  item?.page === "home" ? "/" : item?.path || item?.page || "/"
                )
              }
            >
              {item.name}
            </Button>
          ) : null
        )}
      </WingBlank>
    </>
  );
};

export default Home;
