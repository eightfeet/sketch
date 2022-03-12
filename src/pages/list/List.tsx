import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PullToRefresh from "rmc-pull-updown-to-refresh";
import Icons from "~/components/Icons";
import ArrowLeft from "~/components/Icons/ArrowLeft";
import IModels from "~/components/Icons/IModels";
import NavigateBar from "~/components/NavigateBar";
import PicList from "~/components/PicList";
import Space from "~/components/Space";
import s from "./List.module.scss";
import { useInfiniteQuery } from "react-query";
import { ModelType } from "~/types/models";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "~/store";
import SelectAll from "~/components/Icons/SelectAll";
import UnselectAll from "~/components/Icons/UnselectAll";
import { queryPicByModelId } from "~/api/sketch";
import PicFilter from "./components/PicFilter";

const winwidth = window.innerWidth * 0.98;
interface Props {}

const List: React.FC<Props> = ({}) => {
  const { dynamics } = useSelector((state: RootState) => state);
  const [selectallpic, setSelectallpic] = useState(false);
  useEffect(() => {
    if (!!dynamics.pictureList.length) {
      setSelectallpic(true);
    } else {
      setSelectallpic(false);
    }
  }, [dynamics.pictureList.length]);

  const { onTogglePictureList, setPictureList, initPictureList } =
    useDispatch<RootDispatch>().dynamics;

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    [
      "picture",
      dynamics.modelList.length,
      dynamics.pictureFilter.isX,
      dynamics.pictureFilter.isY,
    ],
    ({ pageParam = 0 }) => {
      return queryPicByModelId(pageParam).then((res) => {
        const data = [
          ...(dynamics.pictureFilter.isX
            ? res.filter((item) => item.isX === dynamics.pictureFilter.isX)
            : []),
          ...(dynamics.pictureFilter.isY
            ? res.filter((item) => item.isY === dynamics.pictureFilter.isY)
            : []),
        ];
        return data;
      });
    },
    {
      getNextPageParam: (_, allpage) => {
        if (dynamics.modelList.length > allpage.length) {
          return allpage.length;
        }
        return false;
      },
    }
  );

  const result = data?.pages.flat();
  const navigate = useNavigate();

  const onClickSelect = useCallback(
    (item: ModelType) => {
      onTogglePictureList(item);
    },
    [onTogglePictureList]
  );

  const onClickSelectAll = useCallback(() => {
    if (dynamics.pictureList.length > 0) {
      initPictureList();
      setSelectallpic(false);
    } else if (result) {
      setPictureList(result);
      setSelectallpic(true);
    }
  }, [dynamics.pictureList.length, initPictureList, result, setPictureList]);

  return (
    <div className={s.root}>
      <NavigateBar
        left={
          <>
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
        right={
          <>
            <PicFilter />
            &nbsp;
            <Icons
              type="dark"
              tip={
                dynamics.modelList.length
                  ? dynamics.modelList.length
                  : undefined
              }
              onClick={() => navigate("/contents")}
            >
              <IModels />
            </Icons>
          </>
        }
      >
        选择图片
      </NavigateBar>
      <PullToRefresh
        onPullUp={() => fetchNextPage()}
        disablePullDown
        disablePullUp={!hasNextPage}
      >
        <Space className={s.navspace} />
        <PicList
          column={3}
          width={winwidth}
          onClickSelect={onClickSelect}
          selectedData={dynamics.pictureList}
          data={result}
        />
        {hasNextPage === false ? (
          <div className={s.nodata}>没有内容了择更多类目</div>
        ) : null}
      </PullToRefresh>
    </div>
  );
};

export default List;
