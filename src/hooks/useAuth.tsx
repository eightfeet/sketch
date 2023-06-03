import MD from "@eightfeet/modal";
import { useCallback } from "react";
import { auth } from "~/core/utils";
import s from "./useAuth.module.scss";
import wx from "./WechatIMG1.jpeg";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { message } from "~/components/Modal";
import useToast, { useSuccessToast } from "./useToast";

export const useAuth = () => {
  const { runtime } = useSelector((state: RootState) => state);

  const toast = useToast();
  const successToast = useSuccessToast();

  const authFormSubmit = useCallback(
    async ({ name, license }) => {
      try {
        await auth(name, license);
        successToast.create(
          decodeURI("%E6%BF%80%E6%B4%BB%E6%88%90%E5%8A%9F%EF%BC%81")
        );
        window.localStorage.setItem("sn", JSON.stringify({ name, license }));
      } catch (error) {
        throw new Error("用户名或激活码不正确");
      }
    },
    [successToast]
  );

  const getSN = useCallback(() => {
    message({
      title: `<div class="${s.title}">请加微信号申请</div>`,
      content: `<div><img style="width: 100%" src="${wx}" /></div>`,
    });
  }, []);

  const onOk = useCallback(
    async (modal: MD) => {
      const name = (
        modal.state.contentDom?.querySelector(`#${s.name}`) as HTMLInputElement
      )?.value;
      const sn = (
        modal.state.contentDom?.querySelector(`#${s.sn}`) as HTMLInputElement
      )?.value;
      if (!name) {
        toast.create(new Error("请输入用户名！") as any);
        return;
      }
      if (!sn) {
        toast.create(new Error("请输入序列号！") as any);
        return;
      }
      try {
        await authFormSubmit({ name, license: sn });
        await modal.remove();
      } catch (error) {
        toast.create(error as string);
      }
    },
    [authFormSubmit, toast]
  );

  const checkAuth = useCallback(() => {
    if (runtime.auth) return;
    message({
      title: `<div class="${s.title}">请输入激活码<span id="${s.getsn}">获取激活码</span></div>`,
      content: `<div class="${s.wrap}">
        <div><label>用户名</label><input type="text" id="${s.name}" /></div>
        <div><label>激活码</label><input type="text" id="${s.sn}" /></div>
      <div>
      `,
      onOk,
    }).then((modal) => {
      // console.log(modal?.hide(false));

      const getsn = modal?.state.contentDom?.querySelector(
        `#${s.getsn}`
      ) as HTMLDivElement;
      if (getsn) {
        getsn.onclick = async () => {
          await modal?.remove();
          getSN();
        };
      }
    });
  }, [getSN, onOk, runtime.auth]);

  return checkAuth;
};
