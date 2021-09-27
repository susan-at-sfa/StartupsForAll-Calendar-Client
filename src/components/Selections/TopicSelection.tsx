import { FC } from "react";
import { Topics } from "../../constants/Topics.enum";
import { topicsEmojiColors } from "../../constants/TopicsEmojiColors";
import { SelectionDiv } from "./SelectionTheme";

interface TopicSelectionProps {
  onClick: (a: string) => void;
  selectedState?: string[];
}

const TopicSelection: FC<TopicSelectionProps> = (props) => {
  return (
    <SelectionDiv>
      {Topics.map((topic: string) => (
        <label key={topic} className="container">
          <div
            style={{
              backgroundColor: topicsEmojiColors[topic],
              color: "#A36760",
            }}
            id="displayText"
          >
            {topic}
          </div>
          {props.selectedState ? (
            <input
              type="checkbox"
              checked={props.selectedState.includes(topic)}
              onClick={() => props.onClick(topic)}
            />
          ) : (
            <input type="checkbox" onClick={() => props.onClick(topic)} />
          )}
          <span className="checkmark"></span>
        </label>
      ))}
    </SelectionDiv>
  );
};

export default TopicSelection;
