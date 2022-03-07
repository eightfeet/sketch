import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PullToRefresh from "rmc-pull-updown-to-refresh";
import Icons from "~/components/Icons";
import ArrowLeft from "~/components/Icons/ArrowLeft";
import NavigateBar from "~/components/NavigateBar";
import PicList from "~/components/PicList";
import Space from "~/components/Space";
import mkdata from "./modelsIndex.json";
import s from "./Contents.module.scss";
import { useInfiniteQuery } from "react-query";
import { ModelType } from "~/types/models";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "~/store";
import SelectAll from "~/components/Icons/SelectAll";
import UnselectAll from "~/components/Icons/UnselectAll";

const winwidth = window.innerWidth * 0.98;
interface Props {}

const List: React.FC<Props> = ({}) => {
  const { dynamics } = useSelector((state: RootState) => state);
  const [selectallpic, setSelectallpic] = useState(false);
  useEffect(() => {
    if (!!dynamics.modelList.length) {
      setSelectallpic(true);
    } else {
      setSelectallpic(false);
    }
  }, [dynamics.modelList.length]);

  const { onToggleModelList, setModelList, initModelList } =
    useDispatch<RootDispatch>().dynamics;

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
      onToggleModelList(item);
    },
    [onToggleModelList]
  );

  const onClickSelectAll = useCallback(() => {
    if (dynamics.modelList.length > 0) {
      initModelList();
      setSelectallpic(false);
    } else if (result) {
      setModelList(result);
      setSelectallpic(true);
    }
  }, [dynamics.modelList.length, initModelList, result, setModelList]);

  return (
    <div className={s.root}>
      <NavigateBar
        left={
          <>
            <Icons
              type="dark"
              tip={
                dynamics.modelList.length
                  ? dynamics.modelList.length
                  : undefined
              }
              onClick={() => navigate(-1)}
            >
              <ArrowLeft />
            </Icons>
            &nbsp;
            {selectallpic ? (
              <Icons type={"light"} onClick={onClickSelectAll}>
                <UnselectAll />
              </Icons>
            ) : null}
            {selectallpic ? null : (
              <Icons type={"light"} onClick={onClickSelectAll}>
                <SelectAll />
              </Icons>
            )}
          </>
        }
      >
        选择模特
      </NavigateBar>
      <PullToRefresh onPullUp={fetchNextPage} disablePullDown>
        <Space className={s.navspace} />
        <PicList
          column={3}
          width={winwidth}
          onClickSelect={onClickSelect}
          selectedData={dynamics.modelList}
          data={result}
        />
      </PullToRefresh>
    </div>
  );
};

export default List;
