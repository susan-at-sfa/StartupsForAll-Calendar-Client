import { FC } from "react";
import styled from "@emotion/styled";

interface FormInputProps {
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChange(value: any | null): void;
  onBlur?(value: any): void;
  value?: string | number | Date | string[] | any;
  name?: string;
  disabled?: boolean;
  defaultValue?: string;
  rows?: string;
}

const FormInput: FC<FormInputProps> = (props) => {
  return (
    <Input
      placeholder={props.placeholder}
      type={props.type}
      required={props.required}
      onChange={(e) => props.onChange(e.target.value)}
      value={props.value}
      name={props.name}
      onFocus={(e) => window.scrollTo(0, e.target.offsetTop - 125)}
    />
  );
};

const Input = styled.input`
  border: 8px solid #e8d9d6;
  border-right-width: 20px;
  height: 45px;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 20px;
  &::placeholder {
    color: #e8d9d6;
    font-weight: 600;
  }
  &:focus {
    outline: none;
    border-color: var(--input-focus);
    transition: 0.75s ease;
  }
  &:focus::placeholder {
    color: var(--input-focus);
    transition: 0.75s ease;
  }
`;
export default FormInput;
