import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import PullToRefresh from "rmc-pull-updown-to-refresh";
import Icons from "~/components/Icons";
import ArrowLeft from "~/components/Icons/ArrowLeft";
import IModels from "~/components/Icons/IModels";
import NavigateBar from "~/components/NavigateBar";
import PicList from "~/components/PicList";
import Space from "~/components/Space";
import mkdata from "./models01.json";
import s from "./List.module.scss";
import { useInfiniteQuery } from "react-query";
import { ModelType } from "~/types/models";

const winwidth = window.innerWidth * 0.98;
interface Props {}
const List: React.FC<Props> = ({}) => {
  const queryData: (pageParam: number) => Promise<ModelType[]> = useCallback(
    (pageParam) =>
      new Promise((resove) => {
        setTimeout(() => {
          console.log(pageParam);
          resove(mkdata as ModelType[]);
        }, 1000);
      }),
    []
  );

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    "models",
    ({ pageParam = 1 }) => queryData(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    }
  );
  console.log("hasNextPage", hasNextPage);

  const result = data?.pages.flat();
  const navigate = useNavigate();

  return (
    <div className={s.root}>
      <NavigateBar
        left={
          <Icons type="dark" tip="50" onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Icons>
        }
        right={
          <Icons type="dark" tip="5" onClick={() => navigate("/contents")}>
            <IModels />
          </Icons>
        }
      >
        选择图片
      </NavigateBar>
      <PullToRefresh onPullUp={fetchNextPage}>
        <Space className={s.navspace} />
        <PicList column={3} width={winwidth} data={result} />
      </PullToRefresh>
    </div>
  );
};

export default List;
