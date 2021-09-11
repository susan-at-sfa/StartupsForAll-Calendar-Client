import React, { FC } from "react";
import FormLabel from "../FormLabel";
import { Topics } from "../../constants/Topics.enum";

interface TopicsChooserProps {
  changeTopics(value: string): void;
  topics: string[];
}

const TopicsChooser: FC<TopicsChooserProps> = (props) => {
  return (
    <>
      <FormLabel htmlFor="topics" text="Topics" />
      <select
        multiple={true}
        value={props.topics}
        onChange={(e) => props.changeTopics(e.target.value)}
      >
        {Topics.map((topic) => (
          <option value={topic} key={topic}>
            {topic}
          </option>
        ))}
      </select>
    </>
  );
};

export default TopicsChooser;
