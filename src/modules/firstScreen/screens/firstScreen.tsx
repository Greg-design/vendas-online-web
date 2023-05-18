import { Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthorizationToken } from "../../../shared/functions/connection/auth";
import { ProductRoutesEnum } from "../../product/routes";

const FirstScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthorizationToken();
    if (token) {
      navigate(ProductRoutesEnum.PRODUCT);
    } else {
      navigate("/login");
    }
  }, []);

  return <Spin />;
};

export default FirstScreen;
