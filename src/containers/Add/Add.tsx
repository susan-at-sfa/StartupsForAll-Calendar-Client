import { FC } from "react";
import FormInput from "../../components/FormInput";

import "./index.css";
import FormLabel from "../../components/FormLabel";

const Add: FC = () => {
  return (
    <div>
      <h1>Add</h1>
      <FormLabel text='Name' />
      <FormInput
        placeholder="Name"
        type="text"
      />
      <FormLabel text='Email Address' />
      <FormInput
        placeholder="Email Address"
        type="text"
      />
    </div>
  );
};

export default Add;

