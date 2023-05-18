import { ChangeEvent, useState } from "react";
import Button from "../../../shared/components/buttons/button/Button";
import Input from "../../../shared/components/inputs/input/Input";
import { useGlobalContext } from "../../../shared/hooks/useGlobalContext";
import { useRequests } from "../../../shared/hooks/useRequests";
import {
  BackgroundImage,
  ContainerLogin,
  ContainerLoginScreen,
  LimitedContainer,
  LogoImage,
  TitleLogin,
} from "../styles/loginScreen.styles";
import { UserType } from "../types/UserType";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { postRequest, loading } = useRequests();

  const { accessToken, setAccessToken } = useGlobalContext();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    //e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const user = await postRequest<UserType>("http://localhost:8080/auth", {
      email: email,
      password: password,
    });
    //quando fizer login e der sucesso aparece o accessToken
    setAccessToken(user?.accessToken || "");
  };

  return (
    <ContainerLoginScreen>
      <BackgroundImage src="./background.png" />
      <ContainerLogin>
        <LimitedContainer>
          <LogoImage src="./logo.png" />
          <TitleLogin level={2} type="secondary">
            LOGIN ({accessToken})
          </TitleLogin>
          <Input title="USUÁRIO" margin="32px 0px 0px" onChange={handleEmail} value={email} />
          <Input type="password" title="SENHA" margin="32px 0px 0px" onChange={handlePassword} value={password} />
          <Button loading={loading} type="primary" margin="64px 0px 16px 0px" onClick={handleLogin}>
            ENTRAR
          </Button>
        </LimitedContainer>
      </ContainerLogin>
    </ContainerLoginScreen>
  );
};

export default LoginScreen;
