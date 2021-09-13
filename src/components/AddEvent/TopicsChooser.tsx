import React, { FC } from "react";
import styled from "@emotion/styled";
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
      <SelectList
        multiple={true}
        value={props.topics}
        onChange={(e) => props.changeTopics(e.target.value)}
      >
        {Topics.map((topic) => (
          <option value={topic} key={topic}>
            {topic}
          </option>
        ))}
      </SelectList>
    </>
  );
};

const SelectList = styled.select`
  color: #e8d9d6;
  font-weight: bold;
  border: 8px solid #e8d9d6;
  border-right-width: 20px;
  height: 162px;
  margin-bottom: 15px;
  max-width: 100%;
  max-width: 100vw;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Option = styled.option`
  width: 100%;
`;

export default TopicsChooser;
