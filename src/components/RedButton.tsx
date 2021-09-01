import { FC } from "react";
import styled from "@emotion/styled";

interface RedButtonProps {
  buttonText: string;
  buttonType: "button" | "reset" | "submit";
  onClick?(value: string): void;
}

const RedButton: FC<RedButtonProps> = (props) => {
  return <Button type={props.buttonType}>{props.buttonText}</Button>;
};

const Button = styled.button`
  color: white;
  font-weight: bold;
  font-size: 14px;
  border: none;
  width: 50%;
  height: 35px;
  background-color: #a36760;
`;

export default RedButton;
