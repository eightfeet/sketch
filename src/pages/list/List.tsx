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
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "~/store";

const winwidth = window.innerWidth * 0.98;
interface Props {}

const List: React.FC<Props> = ({}) => {
  const { dynamics } = useSelector((state: RootState) => state);
  const { onTogglePictureList } = useDispatch<RootDispatch>().dynamics;

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

  const onClickSelect = useCallback(
    (item: ModelType) => {
      onTogglePictureList(item);
    },
    [onTogglePictureList]
  );

  return (
    <div className={s.root}>
      <NavigateBar
        left={
          <Icons
            type="dark"
            tip={
              dynamics.pictureList.length
                ? dynamics.pictureList.length
                : undefined
            }
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
          </Icons>
        }
        right={
          <Icons
            type="dark"
            tip={
              dynamics.modelList.length ? dynamics.modelList.length : undefined
            }
            onClick={() => navigate("/contents")}
          >
            <IModels />
          </Icons>
        }
      >
        选择图片
      </NavigateBar>
      <PullToRefresh onPullUp={fetchNextPage}>
        <Space className={s.navspace} />
        <PicList
          column={8}
          width={winwidth}
          onClickSelect={onClickSelect}
          selectedData={dynamics.pictureList}
          data={result}
        />
      </PullToRefresh>
    </div>
  );
};

export default List;
