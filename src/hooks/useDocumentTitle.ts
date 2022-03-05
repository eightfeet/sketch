import { useEffect, useRef } from "react";

/**
 *
 * @param title 标题
 * @param retainOnUnmount 卸载时保留
 */
function useDocumentTitle(title: string, retainOnUnmount: boolean = false) {
  console.log(title);
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  useEffect(() => {
    return () => {
      if (!retainOnUnmount) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        document.title = defaultTitle.current;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useDocumentTitle;
