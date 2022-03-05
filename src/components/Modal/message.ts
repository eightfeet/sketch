import Modal from "@eightfeet/modal";
import s from "./Modal.module.scss";
import { content, close, overlay } from "../../core/defaultTheme";
const style: any = {
  overlay,
  content,
  close,
};

const parames = {
  closable: true, // modal是否可关闭 默认true
  style,
};

const modal = new Modal(parames);

export interface MessageParames {
  /**弹窗标题 */
  title?: string;
  /**内容 */
  content: React.ReactNode;
  /**按钮 */
  onOk?: (modal: Modal) => void;
  /**按钮文字*/
  okText?: string;
  onCancel?: () => void;
  cancelText?: string;
  closable?: boolean;
}
export const message = async ({
  content,
  title,
  onOk,
  okText,
  onCancel,
  cancelText,
  closable = true,
}: MessageParames) => {
  try {
    modal.state.closable = true;
    if (closable !== undefined) modal.state.closable = closable;
    await modal.create({
      article: `<div class="${s.root}"> ${
        title?.length ? `<header>${title}</header>` : ""
      }
      <section class="${s.message} ${
        typeof onOk !== "function" &&
        typeof onCancel !== "function" &&
        title?.length
          ? s.offsetbottom
          : ""
      }">
        ${content}
      </section>
      <footer>
        ${
          typeof onOk === "function"
            ? `<button class="modalsubmit ${s.submit}">${
                okText || "确定"
              }</button>`
            : ""
        }
        ${
          typeof onCancel === "function"
            ? `<button class="modalcancel ${s.cancel}">${
                cancelText || "取消"
              }</button>`
            : ""
        }
      </footer>
      </div>`,
    });

    if (typeof onOk === "function") {
      const button: any = modal.state.contentDom?.querySelector(".modalsubmit");
      if (button) button.onclick = () => onOk(modal);
    }
    if (typeof onCancel === "function") {
      const button: any = modal.state.contentDom?.querySelector(".modalcancel");
      if (button)
        button.onclick = () => {
          onCancel();
          modal.remove();
        };
    }
    return modal;
  } catch (error) {
    console.error(error);
  }
};

export default message;
