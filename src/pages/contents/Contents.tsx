import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PullToRefresh from "rmc-pull-updown-to-refresh";
import Icons from "~/components/Icons";
import ArrowLeft from "~/components/Icons/ArrowLeft";
import NavigateBar from "~/components/NavigateBar";
import PicList from "~/components/PicList";
import Space from "~/components/Space";
import s from "./Contents.module.scss";
import { useInfiniteQuery } from "react-query";
import { ModelType } from "~/types/models";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "~/store";
import SelectAll from "~/components/Icons/SelectAll";
import UnselectAll from "~/components/Icons/UnselectAll";
import MdFilter from "./compomemys/MdFilter";
import BlockLoading from "~/components/BlockLoading";
import { filterModel, isMobile } from "~/core/utils";
import { queryContByPage } from "~/api/sketch";
import useLoading from "~/hooks/useLoading";
import Button from "~/components/Button";

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
  const loading = useLoading();

  const { onToggleModelList, setModelList, initModelList } =
    useDispatch<RootDispatch>().dynamics;

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchedAfterMount } =
    useInfiniteQuery(
      ["models", dynamics.modelFilter],
      ({ pageParam = 1 }) =>
        queryContByPage(pageParam).then((res) => {
          const { modelFilter } = dynamics;
          const data: ModelType[] = filterModel(res.items, modelFilter);
          if (!data.length)
            setTimeout(() => {
              fetchNextPage();
            });
          return res;
        }),
      {
        getNextPageParam: (lastPage, allPages) => {
          if (allPages.length < lastPage.total) {
            return allPages.length + 1;
          }
          return false;
        },
      }
    );

  useEffect(() => {
    if (isLoading) {
      loading.show();
    } else {
      loading.hide();
    }
  }, [isLoading, loading]);

  const result = data?.pages.map((item) => item.items).flat();
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
      {isFetchedAfterMount ? null : <BlockLoading className={s.pageloading} />}
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
              onClick={() => navigate("/models", { replace: true })}
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
        right={<MdFilter />}
      >
        选择模特
      </NavigateBar>
      <PullToRefresh
        onPullUp={fetchNextPage}
        disablePullDown
        disablePullUp={!hasNextPage}
      >
        <Space className={s.navspace} />
        <PicList
          column={isMobile ? 3 : 6}
          width={winwidth}
          onClickSelect={onClickSelect}
          selectedData={dynamics.modelList}
          data={result}
        />
        {!result?.length ? <div className={s.nodata}>没有图片</div> : null}
        {!isMobile && hasNextPage ? (
          <div className={s.pcmore}>
            <Button onClick={() => fetchNextPage()} type="dark">
              加载更多
            </Button>
          </div>
        ) : null}
      </PullToRefresh>
    </div>
  );
};

export default List;
