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
import BlockLoading from "~/components/BlockLoading";
import ArrowRight from "~/components/Icons/ArrowRight";
import { filterModel, isMobile } from "~/core/utils";
import Button from "~/components/Button";
import Play from "~/components/Icons/Play";
import dayjs from "dayjs";
import SketchTimer from "~/components/SketchTimer";

const winwidth = window.innerWidth * 0.98;
interface Props {}

const List: React.FC<Props> = ({}) => {
  const { dynamics } = useSelector((state: RootState) => state);
  const [selectallpic, setSelectallpic] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!!dynamics.pictureList.length) {
      setSelectallpic(true);
    } else {
      setSelectallpic(false);
    }
  }, [dynamics.pictureList.length]);

  const { onTogglePictureList, setPictureList, initPictureList } =
    useDispatch<RootDispatch>().dynamics;

  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery(
    ["picture", dynamics.modelList.length, dynamics.pictureFilter],
    async ({ pageParam = 0 }) => {
      const res = await queryPicByModelId(pageParam);
      const result = filterModel(res, dynamics.pictureFilter);
      return result;
    },
    {
      getNextPageParam: (_, allpage) => {
        if (dynamics.modelList.length > allpage.length) {
          return allpage.length;
        }
        return false;
      },
      enabled: !!dynamics.modelList.length,
    }
  );

  const result = data?.pages.flat();

  const onPlay = useCallback(() => {
    navigate("/view");
  }, [navigate]);

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
      {isLoading === true ? <BlockLoading /> : null}
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
              onClick={() => navigate("/", { replace: true })}
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
              tipOpacity={0.2}
              onClick={() => navigate("/contents", { replace: true })}
            >
              <IModels />
            </Icons>
          </>
        }
      >
        {dynamics.pictureList.length ? (
          <div className={s.start}>
            <div className={s.info}>
              速写将耗时
              <SketchTimer>
                <span>
                  {dayjs
                    .duration(
                      dayjs()
                        .add(
                          (dynamics.keepingTime || 0) *
                            dynamics.pictureList.length,
                          "minute"
                        )
                        .diff(dayjs())
                    )
                    .format("HH时mm分ss秒")}
                </span>
              </SketchTimer>
            </div>
            <span className={s.icon} onClick={onPlay}>
              <Play />
            </span>
          </div>
        ) : (
          "选择图片"
        )}
      </NavigateBar>
      <PullToRefresh
        onPullUp={() => fetchNextPage()}
        disablePullDown
        disablePullUp={!hasNextPage}
      >
        <Space className={s.navspace} />
        <PicList
          column={isMobile ? 3 : 6}
          width={winwidth}
          onClickSelect={onClickSelect}
          selectedData={dynamics.pictureList}
          data={result}
        />
        {!dynamics.modelList?.length ? (
          <div className={s.nodata}>
            没有选择类目,请选择模特类目
            <br />
            <Icons
              type="light"
              onClick={() => navigate("/contents", { replace: true })}
            >
              <ArrowRight />
            </Icons>
          </div>
        ) : null}
        {hasNextPage === false ? (
          <div className={s.nodata}>
            没有内容了,您可以择更多图片类目
            <br />
            <Icons
              type="light"
              onClick={() => navigate("/contents", { replace: true })}
            >
              <ArrowRight />
            </Icons>
          </div>
        ) : null}
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
