import { FC } from "react";
import styled from "@emotion/styled";

interface AddEventFormInputProps {
  placeholder?: string;
  type?: string;
  required?: boolean;
  value?: string;
  name?: string;
  disabled?: boolean;
  defaultValue?: string;
}

const AddEventFormInput: FC<AddEventFormInputProps> = (props) => {
  return (
    <Input
      placeholder={props.placeholder}
      type={props.type}
      required={props.required}
      value={props.value}
      name={props.name}
      disabled={props.disabled}
    />
  );
};

const Input = styled.input`
  border: 8px solid #e8d9d6;
  border-right-width: 20px;
  height: 45px;
  padding-left: 15px;
  padding-right: 15px;
  width: 300px;
  margin-bottom: 15px;
  &::placeholder {
    color: #e8d9d6;
    font-weight: bold;
  }
  &:focus {
    outline: none;
    border-color: #a36760;
    transition: 0.75s ease;
  }
  &:focus::placeholder {
    color: #a36760;
    transition: 0.75s ease;
  }
`;

export default AddEventFormInput;
