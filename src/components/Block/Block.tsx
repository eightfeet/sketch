import classNames from "classnames";
import React from "react";
import s from "./Block.module.scss";

interface BlockProps {}

interface BlockSubProps {
  /**spaceBetween 两端对齐；center 居中对齐 */
  align?: "spaceBetween" | "center";
}

type SubProps = React.FC<BlockSubProps & React.HTMLAttributes<HTMLDivElement>>;

const subClassName = (
  className?: string,
  align?: "spaceBetween" | "center"
) => {
  return classNames(
    {
      [s["jc-space-between"]]: align === "spaceBetween",
      [s["jc-center"]]: align === "center",
    },
    className
  );
};

/**
 * 标准头部
 * @param align spaceBetween 两端对齐；center 居中对齐
 * @returns
 */
const Header: SubProps = ({ children, className, align, ...other }) => {
  return (
    <header className={subClassName(className, align)} {...other}>
      {children}
    </header>
  );
};
Header.displayName = "BlockHeader";

/**
 * 标准底部
 * @param align spaceBetween 两端对齐；center 居中对齐
 * @returns
 */
const Footer: SubProps = ({ children, className, align, ...other }) => {
  return (
    <footer className={subClassName(className, align)} {...other}>
      {children}
    </footer>
  );
};
Footer.displayName = "BlockFooter";

interface BlockType
  extends React.FC<BlockProps & React.HTMLAttributes<HTMLDivElement>> {
  Header: typeof Header;
  Footer: typeof Footer;
}

/**
 * 默认ui基础圆角Block
 * @static Header 标准头部
 * @static Footer 标准脚步
 * @returns
 */
const Block: BlockType = ({ children, className, ...other }) => {
  const renderContent = () => {
    let childrenHeader: null | React.ReactNode,
      childrenFooter: null | React.ReactNode = null;
    const childrenContent = React.Children.map(children, (child) => {
      if ((child as any)?.type?.displayName === "BlockHeader") {
        childrenHeader = child;
      } else if ((child as any)?.type?.displayName === "BlockFooter") {
        childrenFooter = child;
      } else {
        return child;
      }
    });
    return (
      <>
        {childrenHeader}
        {childrenContent}
        {childrenFooter}
      </>
    );
  };

  return (
    <section className={classNames(s.root, className)} {...other}>
      {renderContent()}
    </section>
  );
};

Block.Header = Header;
Block.Footer = Footer;

export default Block;
