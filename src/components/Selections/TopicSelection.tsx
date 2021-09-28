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
          {/* This is the span with the imported svg component, I tried having the checkmark inside the span initially that didn't work. This displays the svg and changes border color on input:checked but the svg is not in the right spot */}
          <span className="markBox"></span>
          <Checkmark />
          {/*This empty span is where the checkmark is being shown and hidden based on input:checked ~ .markBox::after*/}
          {/* <span className="markBox"></span> */}
        </label>
      ))}
    </SelectionDiv>
  );
};

export default TopicSelection;


