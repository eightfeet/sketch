import { parse } from "query-string";
import { message } from "~/components/Modal";
import { store } from "~/store";
const { jwt, tenantId } = parse(window.location.search);

const bootstrap = async () => {
  if (jwt && Number(tenantId)) {
    try {
      const member = await store.dispatch.member.loginByToken({
        jwtToken: jwt as string,
        tenantId: Number(tenantId),
      });
      if (member?.orgId)
        await store.dispatch.organization.bindByIdOrNo({ orgId: member.orgId });
    } catch (error: any) {
      message({
        title: "对不起",
        content: error.message || "系统异常！",
      });
      console.error(error);
    }
  } else {
    console.warn("缺少参数jwt、tenantId或参数格式不正确");
  }
};
export default bootstrap;
