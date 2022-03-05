import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import s from "./Search.module.scss";

interface Props {
  onSearch?: (value: string) => void;
  onClick?(): void;
  focus?: boolean;
  disabled?: boolean;
  cancle?: boolean;
  placeholder?: string;
}

const Search: React.FC<Props & React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  className,
  style,
  disabled = false,
  onSearch,
  onClick,
  placeholder,
  focus = true,
  cancle = true,
  ...other
}) => {
  const ref = useRef<any>(null);
  const navigate = useNavigate();
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    if (focus && !disabled) {
      ref.current.focus();
    }
  }, [disabled, focus]);

  const onInput = useCallback((e) => {
    setHasValue(!!e.target?.value.length);
  }, []);

  return (
    <div className={s.root}>
      <form
        className={classNames(s.wrap, className)}
        style={style}
        onClick={onClick}
        action=""
        onSubmit={() => false}
      >
        {!hasValue ? (
          <Icon className={s.searchicon} onClick={() => ref.current?.focus()} />
        ) : null}
        <input
          ref={ref}
          placeholder={placeholder || "请输入要查找的内容"}
          type="search"
          disabled={disabled}
          enterKeyHint="search"
          onInput={onInput}
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.keyCode === 13) {
              ref.current?.blur();
              onSearch && onSearch(ref.current?.value);
            }
          }}
          {...other}
        />
      </form>
      {cancle ? (
        <div className={s.cancel} onClick={() => navigate(-1)}>
          取消
        </div>
      ) : null}
    </div>
  );
};

export default Search;
