import { FC } from "react";
import FormInput from "../../components/FormInput";

import "./index.css";

const Add: FC = () => {
  return (
    <div className="App">
      <h1>Add.tsx</h1>
      <FormInput
        placeholder="Add Event"
        type="text"
      />
    </div>
  );
};

export default Add;