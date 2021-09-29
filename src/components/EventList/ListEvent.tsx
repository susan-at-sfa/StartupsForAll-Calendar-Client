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
  changed?: string;
  created?: string;
  creator_name: string;
  cost?: string | number;
  date: string;
  end_time: string;
  id: string;
  isAdmin?: boolean;
  in_google_cal?: boolean;
  location?: string;
  start?: string;
  start_date?: string;
  start_time: string;
  end?: string;
  end_date?: string;
  selectEvent?(id: string): () => void;
  summary?: string;
  title: string;
  topics: string[];
  url?: string;
  viewed?: boolean;
}

const ListEvent: FC<ListEventProps> = (props) => {
  const {
    id,
    category,
    creator_name,
    date,
    isAdmin,
    start_time,
    end_time,
    title,
    topics,
  } = props;
  const dispatch = useAppDispatch();
  const eventDate = new Date(date).toDateString();

  const onClickingEvent = (eventID: string) => {
    dispatch(setSelectedEventID(eventID));
    dispatch(setEventDetailsModalOpen(true));
  };

  const editEvent = (id: string) => {
    if (props.selectEvent) props.selectEvent(id);
  };

  return (
    <Wrapper
      key={id}
      onClick={() => {
        isAdmin ? editEvent(id) : onClickingEvent(id);
      }}
    >
      <SmallHeader>
        <SmallHeaderLeft>
          <div className="title">
            <h2>{title}</h2>
          </div>
          <div className="creatorName">
            <p>{creator_name}</p>
          </div>
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
  height: 78px;
  width: 100%;
  margin-top: 5px 0;
  padding: 10px 5px;
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
  max-width: 350px;
  h2 {
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
  }
  h3 {
    line-height: 17px;
    font-size: 12px;
    color: white;
    height: 19px;
    padding-left: 4px;
    padding-right: 4px;
  }
  p {
    font-size: 12px;
    margin: 0;
    line-height: 17px;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  li {
    font-size: 12px;
    padding: 0 3px 0 0;
    margin: 0 3px 0 0;
    display: inline;
  }
`;
const SmallHeaderLeft = styled.div`
  flex: 0.55;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  h2 {
    max-width: 175px;
    overflow-wrap: break-word;
    margin: 0;
    padding: 0;
  }
  .title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const SmallHeaderRight = styled.div`
  text-align: right;
  flex: 0.45;
  .topicsAndCategories {
    display: flex;
    align-items: center;
    justify-content: right;
  }
`;
