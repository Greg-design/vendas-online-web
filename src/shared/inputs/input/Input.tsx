import { Input as InputAntd, InputProps as InputPropsAntd } from "antd";
import { BoxInput, TitleInput } from "./input.styles";

// fazemos isso na interface pra lá na chamado existir todas as funções que tem no input
interface Props extends InputPropsAntd {
  title?: string;
  margin?: string;
}

const Input = ({ margin, title, ...props }: Props) => {
  return (
    <BoxInput style={{ margin }}>
      {title && <TitleInput>{title}</TitleInput>}
      <InputAntd {...props} />
    </BoxInput>
  );
};

export default Input;
