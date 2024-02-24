import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Result } from "antd";

import { useAppDispatch } from "../redux/hooks";
import { changeMenuItem } from "../redux/sider/siderSlice";

const NotFound = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Страница не найдена | ТопДомДок";
  }, []);

  const handleClick = () => {
    dispatch(changeMenuItem(["0"]));
    navigate("/");
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, запрашиваемая вами страница не найдена."
      extra={<button onClick={handleClick}>На главную</button>}
    />
  );
};

export default NotFound;
