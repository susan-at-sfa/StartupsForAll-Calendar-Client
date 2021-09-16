import { FC } from "react";
import styled from "@emotion/styled";
import { useAppDispatch } from "../../hooks";
import {
  setEventDetailsModalOpen,
  setSelectedEventID,
} from "../../store/slices/eventDetails/showEventDetailsSlice";
import { topicsEmojis } from "../../constants/TopicsEmojiColors";
import { categoryBackgroundColor } from "../../constants/CategoryColors";

export interface ListEventProps {
  category: string;
  creator_name: string;
  date: string;
  end_time: string;
  id: string;
  start_time: string;
  title: string;
  topics: string[];
}

const ListEvent: FC<ListEventProps> = (props) => {
  const {
    id,
    category,
    title,
    date,
    start_time,
    end_time,
    creator_name,
    topics,
  } = props;
  const dispatch = useAppDispatch();
  const eventDate = new Date(date).toDateString();
  console.log("START TIME", start_time);

  const onClickingEvent = (eventID: string) => {
    dispatch(setSelectedEventID(eventID));
    dispatch(setEventDetailsModalOpen(true));
  };

  return (
    <Wrapper key={id} onClick={() => onClickingEvent(id)}>
      <SmallHeader>
        <SmallHeaderLeft>
          <h2>{title}</h2>
          <p>{creator_name}</p>
        </SmallHeaderLeft>
        <SmallHeaderRight>
          <h2>{eventDate}</h2>
          <p>
            {start_time} - {end_time}
          </p>
          <div className="topicsAndCategories">
            <ul>
              {topics.map((topic: string, index: number) => {
                return <li key={index}>{topicsEmojis[topic]}</li>;
              })}
            </ul>
            <h3
              style={{
                backgroundColor: categoryBackgroundColor[category],
              }}
            >
              {category}
            </h3>
          </div>
        </SmallHeaderRight>
      </SmallHeader>
    </Wrapper>
  );
};

export default ListEvent;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 80px;
  width: 100%;
  padding: 0px 10px;
  margin-top: 10px;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
    background-color: #f1f1f1;
  }
`;
const SmallHeader = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin-top: 15px;
margin-bottom: 5px;
h2{
  font-size: 15px;
  margin: 0;
  line-height: 17px;
}
h3 {
  font-size: 13px;
  color: white;
  height: 19px;
  padding-left: 4px;
  padding-right: 4px;
  margin: 0;
}
p{
  font-size: 12px;
  margin: 0;
  line-height: 17px;
}
ul{
  padding: 0;
  margin: 0;
  list-style: none;
}
li{
  font-size: 12px;
  padding: 0 3px 0 0;
  margin: 0 3px 0 0;
  display: inline;
}
`;
const SmallHeaderLeft = styled.div`
  flex: 0.55;
`;
const SmallHeaderRight = styled.div`
  text-align: right;
  flex: 0.45;
  .topicsAndCategories{
    display: flex;
    align-items: center;
    justify-content: right;
}
`;