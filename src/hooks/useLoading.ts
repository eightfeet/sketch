import Loading from "@eightfeet/loading";

const loading = new Loading({
  cycleTime: 1,
  parentId: "parentId",
  length: 50,
  style: {
    // 定义样式 {overlay: 覆盖层, content: 内容区, vertices: 组成节点}
    overlay: {
      backgroundColor: "rgba(0,0,0,0)",
    },
    content: {
      backgroundColor: "rgba(0,0,0,0)",
    },
    vertices: {
      height: ".65vw",
      width: ".65vw",
      borderRadius: ".2vw",
      backgroundColor: "rgba(0,0,0,0.1)",
      animationDuration: "1", // 动画周期
      size: "3.5vw",
    },
  },
});

const useLoading = () => loading;

export default useLoading;
