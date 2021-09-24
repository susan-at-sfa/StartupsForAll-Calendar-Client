import { FC } from "react";
import { Topics } from "../../constants/Topics.enum";
import { topicsEmojiColors } from "../../constants/TopicsEmojiColors";
import { SelectionDiv } from "./SelectionTheme";

interface TopicSelectionProps {
  onClick: (a: string) => void;
}

const TopicSelection: FC<TopicSelectionProps> = (props) => {
  const { onClick } = props;
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
          <input type="checkbox" onClick={() => onClick(topic)} />
          <span className="checkmark"></span>
        </label>
      ))}
    </SelectionDiv>
  );
};

export default TopicSelection;
