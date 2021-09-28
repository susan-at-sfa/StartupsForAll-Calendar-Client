import { FC } from "react";
import { Topics } from "../../constants/Topics.enum";
import { topicsEmojiColors, topicsText, topicsEmojis } from "../../constants/TopicsEmojiColors";
import { SelectionDiv } from "./SelectionTheme";
import Checkmark from './Checkmark';
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
            <span className="emojiDisplay">{topicsEmojis[topic]}</span> {topicsText[topic]}
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
          <div className="checkmarkBox">
            <div className="checkmark"></div>
          </div>
        </label>
      ))}
    </SelectionDiv>
  );
};

export default TopicSelection;


