import { FC } from "react";
import RedButton from "../../components/RedButton";
import FormInput from "../../components/FormInput";
import FormLabel from "../../components/FormLabel";
import styled from "@emotion/styled";

const Add: FC = () => {
  const inputList = [
    {
      id: 1,
      text: "SFA Password",
      placeholder: "Enter Password",
      type: "text"
    },
    {
      id: 2,
      text: "Name",
      placeholder: "Name",
      type: "text"
    },
    {
      id: 3,
      text: "Email Address",
      placeholder: "Email Address",
      type: "text"
    }
  ]

  return (
    <div>
      {inputList.map((item) => {
        const { id, text, placeholder, type } = item;
        return (
          <div key={id}>
            <FormLabel text={text} />
            <FormInput
              placeholder={placeholder}
              type={type}
            />
          </div>
        )
      })}
      <ButtonDiv>
        <RedButton buttonText='Submit' />
      </ButtonDiv>
    </div>
  );
};

export default Add;

const ButtonDiv = styled.div`

`




