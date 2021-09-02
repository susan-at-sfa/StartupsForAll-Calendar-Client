import { FC } from "react";
import styled from "@emotion/styled";

interface RedButtonProps {
  buttonText: string;
  buttonType: "button" | "reset" | "submit";
  onClick?(value: string): void;
}

const RedButton: FC<RedButtonProps> = (props) => {
  return <Button type={props.buttonType}><span>{props.buttonText}</span></Button>;
};

const Button = styled.button`
display: flex;
  color: white;
  font-weight: bold;
  font-size: 14px;
  border: none;
  width: 100%;
  height: 35px;
  background-color: #a36760;
  /* span{
    position: relative;
    left: 50vw;
    top: 25%;
  } */
`;

export default RedButton;
