import { FC } from "react";
import styled from "@emotion/styled";

interface RedButtonProps {
  buttonText: string;
}

const RedButton: FC<RedButtonProps> = (props) => {
  return (
    <Button>{props.buttonText}</Button >
  )
}


const Button = styled.button`
  color: white;
  font-weight: bold;
  font-size: 14px;
  border: none;
  width: 100%;
  height: 35px;
  background-color:  #A36760;
`

export default RedButton;