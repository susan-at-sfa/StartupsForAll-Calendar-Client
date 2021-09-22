import { FC } from "react";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  setEventDetailsModalOpen,
  setSelectedEventID,
} from "../../store/slices/eventDetails/showEventDetailsSlice";
import { useSpring, animated } from "react-spring";
import { BiVideo } from "react-icons/bi";
import {
  topicsEmojiColors,
  topicsEmojis,
} from "../../constants/TopicsEmojiColors";
import { categoryBackgroundColor } from "../../constants/CategoryColors";
interface EventDetailsModalProps {
  selectedEventID: string;
  modalOpen: boolean;
}

const EventDetailsModal: FC<EventDetailsModalProps> = (props) => {
  const events = useAppSelector(({ dbEvent }) => dbEvent.dbEvents);
  const { selectedEventID, modalOpen } = props;
  const event = events.filter((e: any) => e.id === selectedEventID);
  const dispatch = useAppDispatch();

  const onClickingBack = () => {
    dispatch(setSelectedEventID(""));
    dispatch(setEventDetailsModalOpen(false));
  };

  const animation = useSpring({
    config: {
      duration: 350,
    },
    opacity: modalOpen ? 1 : 0,
    transform: modalOpen ? `translateY(0%)` : `translateY(-100%)`,
  });

  return (
    <>
      {modalOpen ? (
        <>
          {event.map((e: any) => {
            const {
              id,
              category,
              cost,
              created_at,
              creator_name,
              custom_blurb,
              end_date,
              start_date,
              logo,
              location,
              summary,
              title,
              topics,
              url,
            } = e;

            const eventDate = new Date(start_date).toDateString();
            const localPostedBy = new Date(created_at).toLocaleString([], {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "numeric",
              minute: "2-digit",
            });
            // TODO: import this interface...
            // const timeOptions: DateTimeFormatOptions = {
            const timeOptions: any = {
              hour: "numeric",
              minute: "2-digit",
              timeZoneName: "short",
            };
            const start_time = new Date(start_date).toLocaleTimeString(
              [],
              timeOptions
            );
            const end_time = new Date(end_date).toLocaleTimeString(
              [],
              timeOptions
            );

            return (
              <Background key={id}>
                <animated.div style={animation}>
                  <Wrapper>
                    <TopButtonDiv>
                      <div className="topButtonsLeft">
                        <button
                          id="back"
                          type="button"
                          onClick={() => onClickingBack()}
                        >
                          Back
                        </button>
                      </div>
                      <div className="topButtonsRight">
                        <button id="calendarAdd" type="button">
                          Button
                        </button>
                        <button id="viewPage" type="button">
                          <a href={url} target="_blank" rel="noreferrer">
                            View More Details
                          </a>
                        </button>
                      </div>
                    </TopButtonDiv>
                    <SmallHeader>
                      <SmallHeaderLeft>
                        <div id="title">
                          <h2>{title}</h2>
                        </div>
                        <div id="creatorName">
                          <p>{creator_name}</p>
                        </div>
                      </SmallHeaderLeft>
                      <SmallHeaderRight>
                        <h2>{eventDate}</h2>
                        <p>
                          {start_time} - {end_time}
                        </p>
                        <div>
                          <div className="topicsAndCategories">
                            <ul>
                              {topics.map((topic: string, index: number) => {
                                return (
                                  <li key={index}>{topicsEmojis[topic]}</li>
                                );
                              })}
                            </ul>
                            <h3
                              style={{
                                backgroundColor:
                                  categoryBackgroundColor[category],
                              }}
                            >
                              {category}
                            </h3>
                          </div>
                        </div>
                      </SmallHeaderRight>
                    </SmallHeader>
                    <CustomBlurb>
                      <h2>Info from {creator_name}</h2>
                      <p>{custom_blurb}</p>
                    </CustomBlurb>
                    {logo ? (
                      <ModalImg>
                        <img src={logo} alt={title + "logo"} />
                      </ModalImg>
                    ) : null}
                    <ModalHeader>
                      <h2>{title}</h2>
                      <p>
                        Referred by <span>{creator_name}</span>
                      </p>
                      <h4>{eventDate}</h4>
                      <p>
                        {start_time} - {end_time}
                      </p>
                      <h4>Location</h4>
                      <p>
                        <BiVideo /> {location}
                      </p>
                      <h4>Price</h4>
                      <p>
                        {cost}{" "}
                        <span id="cost">+ taxes & fees where applicable</span>
                      </p>
                      <h4>Summary</h4>
                      <p>{summary}</p>
                    </ModalHeader>
                    <SecondSection>
                      <BottomButtonDiv>
                        <button
                          id="back"
                          type="button"
                          onClick={() => onClickingBack()}
                        >
                          Back
                        </button>
                        <button id="calendarAdd" type="button">
                          Button
                        </button>
                        <button id="viewPage" type="button">
                          <a href={url}>View More Details</a>
                        </button>
                      </BottomButtonDiv>
                      <h4>Event Link</h4>
                      <p>
                        <a id="link" href={url}>
                          {url}
                        </a>
                      </p>
                    </SecondSection>
                    <ModalFooter>
                      <div className="topics">
                        <ul>
                          {topics.map((topic: string, index: number) => {
                            return (
                              <li
                                key={index}
                                style={{
                                  backgroundColor: topicsEmojiColors[topic],
                                }}
                              >
                                {topic}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div>
                        <p>Posted</p>
                        <p>{localPostedBy}</p>
                        <p>by {creator_name}</p>
                      </div>
                    </ModalFooter>
                  </Wrapper>
                </animated.div>
              </Background>
            );
          })}
        </>
      ) : null}
    </>
  );
};

export default EventDetailsModal;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 7;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 10px 15px;
  background-color: white;
  height: 90vh;
  width: 90vw;
  max-width: 720px;
  max-height: 1055px;
  min-width: 357px;
  z-index: 10;
  overflow: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const TopButtonDiv = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: white;
    font-weight: 600;
    font-size: 14px;
  }
  #back {
    text-align: right;
    align-self: flex-start;
    padding: 0px 5px 5px 10px;
    border: none;
    height: 20px;
    width: 75px;
    background-color: #6073a3;
    color: white;
    font-weight: 600;
    font-size: 14px;
  }
  #calendarAdd {
    padding: 1px 10px 1px 10px;
    margin-right: 5px;
    border: none;
    height: 33px;
    width: 65px;
    background-color: #c79288;
    color: white;
    font-weight: 600;
    font-size: 14px;
    &:hover {
      background-color: #a36760;
    }
  }
  #viewPage {
    padding: 1px 10px 1px 10px;
    border: none;
    height: 33px;
    width: 172px;
    background-color: #a36760;
    color: white;
    font-weight: 600;
    font-size: 14px;
    &:hover {
      background-color: #c79288;
    }
  }
`;
const SmallHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 10px;
  h2 {
    margin-bottom: 5px;
    font-size: 14px;
    font-style: normal;
    font-weight: bold;
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
    margin-bottom: 5px;
    font-size: 12px;
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
  h2 {
    max-width: 175px;
    overflow-wrap: break-word;
  }
  #title {
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

const CustomBlurb = styled.div`
  align-self: flex-end;
  width: 100%;
  margin: 5px 0px 20px 0;
  background-color: #fdfbe4;
  padding: 15px 20px 15px 15px;
  h2 {
    font-size: 14px;
    line-height: 23px;
    font-weight: bold;
  }
  p {
    margin: 0;
    font-size: 12px;
  }
`;
const ModalImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
  img {
    width: 100%;
    height: auto;
  }
`;
const ModalHeader = styled.div`
  width: 100%;
  margin-top: 25px;
  margin-bottom: 20px;
  margin-right: 10px;
  h2 {
    font-size: 18px;
    font-weight: bold;
    margin: 0 10px 8px 0;
    line-height: 22px;
  }
  p {
    font-size: 14px;
    line-height: 17px;
    word-wrap: break-word;
  }
  h4 {
    font-size: 14px;
    line-height: 19px;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 5px;
  }
  span {
    font-size: 14px;
    line-height: 17px;
    font-weight: 600;
    color: #7bb1a7;
  }
  #cost {
    font-size: 12px;
  }
`;
const SecondSection = styled.div`
  margin-top: 20px;
  h4 {
    font-size: 14px;
    line-height: 17px;
    font-weight: bold;
    margin-bottom: 1px;
  }
  p {
    font-size: 14px;
    margin-right: 10px;
    word-break: break-all;
  }
  #link {
    color: #7bb1a7;
    text-decoration: none;
  }
`;
const BottomButtonDiv = styled.div`
  margin-bottom: 35px;
  a {
    text-decoration: none;
    color: white;
    font-weight: 600;
    font-size: 14px;
  }
  #back {
    margin: 0px 5px 10px 0px;
    align-self: flex-start;
    padding: 1px 10px 1px 10px;
    border: none;
    height: 36px;
    width: 64px;
    background-color: #6073a3;
    color: white;
    font-weight: 600;
    font-size: 14px;
  }
  #calendarAdd {
    padding: 1px 10px 1px 10px;
    margin-right: 5px;
    border: none;
    height: 36px;
    width: 65px;
    background-color: #c79288;
    color: white;
    font-weight: 600;
    font-size: 14px;
    &:hover {
      background-color: #a36760;
    }
  }
  #viewPage {
    padding: 1px 10px 1px 10px;
    border: none;
    height: 36px;
    width: 198px;
    background-color: #a36760;
    color: white;
    font-weight: 600;
    font-size: 14px;
    &:hover {
      background-color: #c79288;
    }
  }
`;
const ModalFooter = styled.div`
  align-self: flex-end;
  margin-top: 35px;
  margin-bottom: 25px;
  max-width: 275px;
  width: 50%;
  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 5px 0;
    font-size: 14px;
    line-height: 28px;
    font-weight: 600;
  }
  li {
    margin-bottom: 10px;
    padding-left: 10px;
    color: #a36760;
  }
  p {
    padding-right: 0;
    font-size: 12px;
    line-height: 17px;
  }
`;
