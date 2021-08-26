import { FC } from "react";
import FormInput from "../../components/FormInput";
import FormLabel from "../../components/FormLabel";

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
      <h1>Add</h1>
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
    </div>
  );
};

export default Add;

