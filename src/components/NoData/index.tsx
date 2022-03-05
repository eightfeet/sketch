import img from "./nodata.png";
import s from "./style.module.scss";

export default function NoData({ children, className, ...other }: any) {
  return (
    <div className={`${s.wrap} ${className || ""}`} {...other}>
      <img src={img} alt="暂无数据" />
      <br />
      {children}
    </div>
  );
}
