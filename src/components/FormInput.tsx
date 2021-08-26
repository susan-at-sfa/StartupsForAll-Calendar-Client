import { FC } from "react"
import styled from "@emotion/styled"

interface FormInputProps {
  placeholder?: string;
  type?: string;
  required?: boolean;
}

const FormInput: FC<FormInputProps> = (props) => {
  return (
    <Input
      placeholder={props.placeholder}
      type={props.type}
      required={props.required}
    />
  )
}

const Input = styled.input`
  display: block;
  right: 0;
  float: right;
  border: 8px solid  #E8D9D6;
  border-right-width: 20px;
  height: 45px;
  padding-left: 15px;
  padding-right: 15px;
  width: 80%;
  margin-bottom: 2em;
  &::placeholder{
    color: #E8D9D6;
    font-weight: bold;
    }
  &:focus{
    outline: none;
    border-color: #A36760;
    transition: 0.75s ease;
    }
  &:focus::placeholder{
    color: #A36760;
    transition: 0.75s ease;
    }
`
export default FormInput