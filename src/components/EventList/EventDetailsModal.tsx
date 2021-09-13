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
              custom_blurb,
              logo,
              location,
              title,
              start_date,
              start_time,
              end_time,
              creator_name,
              topics,
              description,
              url,
            } = e;
            const eventDate = new Date(start_date).toDateString();
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
                        <button id="calendarAdd" type="button">+ Cal</button>
                        <button id="viewPage" type="button" >
                          <a href={url}>View More Details </a>
                        </button>
                      </div>
                    </TopButtonDiv>
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
                        <div>
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
                    <CustomBlurb>
                      <h2>Info from {creator_name}</h2>
                      <p>{custom_blurb}</p>
                    </CustomBlurb>
                    <ModalImg>
                      <img src={logo} alt={title + "logo"} />
                    </ModalImg>
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
                      <p>{description}</p>
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
                        <button id="calendarAdd" type="button">+ Cal</button>
                        <button id="viewPage" type="button">
                          <a href={url}>View More Details</a>
                        </button>
                      </BottomButtonDiv>
                      <h4>Event Link</h4>
                      <p>
                        <a href={url}>{url}</a>
                      </p>
                    </SecondSection>
                    <ModalFooter>
                      <div className="topics">
                        <ul>
                          {topics.map((topic: string, index: number) => {
                            return (
                              <li key={index}
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
                        <p>{created_at}</p>
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
  padding: 10px 0 10px 10px;
  background-color: white;
  height: 90vh;
  width: 90vw;
  max-width: 720px;
  max-height: 1055px;
  min-width: 357px;
  z-index: 10;
  overflow: scroll;
`;
const TopButtonDiv = styled.div`
  margin-top: 5px;
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
    align-self: flex-start;
    padding: 1px 10px 1px 10px;
    border: none;
    height: 30px;
    background-color: #6073a3;
    color: white;
    font-weight: 600;
    font-size: 14px;
  }
  #calendarAdd {
    padding: 1px 10px 1px 10px;
    margin-right: 5px;
    border: none;
    height: 30px;
    width: 65px;
    background-color: #c79288;
    color: white;
    font-weight: 600;
    font-size: 14px;
  }
  #viewPage {
    padding: 1px 10px 1px 10px;
    border: none;
    height: 30px;
    width: 172px;
    background-color: #a36760;
    color: white;
    font-weight: 600;
    font-size: 14px;
  }
`;
const SmallHeader = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin-top: 15px;
margin-bottom: 5px;
margin-right: 10px;
h2{
  font-size: 15px;
  margin: 0;
  line-height: 17px;
}
h3 {
  font-size: 13px;
  color: white;
  height: 19px;
  padding-left: 5px;
  padding-right: 5px;
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
`;
const SmallHeaderLeft = styled.div`
  flex: 0.55;
`;
const SmallHeaderRight = styled.div`
  flex: 0.45;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CustomBlurb = styled.div`
  align-self: flex-end;
  width: 100%;
  margin: 5px 0px 10px 0;
  background-color: #fdfbe4;
  padding: 15px 20px 15px 15px;
  h2 {
    font-size: 15px;
    font-weight: bold;
    margin: 0;
  }
  p {
    margin: 0;
    font-size: 12px;
  }
`;
const ModalImg = styled.div`
  display: flex;
  margin-right: 10px;
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
  margin-top: 15px;
  margin-bottom: 20px;
  h2 {
    font-size: 20px;
    font-weight: bold;
    margin: 0 10px 0 0;
    line-height: 22px;
  }
  p {
    font-size: 15px;
    margin: 0 10px 0 0;
    word-wrap: break-word;
  }
  h4 {
    font-size: 15px;
    font-weight: bold;
    margin: 10px 0px 0px;
  }
  span {
    color: #7bb1a7;
  }
  #cost {
    font-size: 12px;
  }
`;
const SecondSection = styled.div`
  margin-top: 10px;
  h4 {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 1px;
  }
  p {
    font-size: 15px;
    margin: 0;
    word-break: break-all;
  }
  a {
    color: #7bb1a7;
    text-decoration: none;
  }
`;
const BottomButtonDiv = styled.div`
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
    height: 30px;
    background-color: #6073a3;
    color: white;
    font-weight: 600;
    font-size: 14px;
  }
  #calendarAdd {
    padding: 1px 10px 1px 10px;
    margin-right: 5px;
    border: none;
    height: 30px;
    width: 65px;
    background-color: #c79288;
    color: white;
    font-weight: 600;
    font-size: 14px;
  }
  #viewPage {
    padding: 1px 10px 1px 10px;
    border: none;
    height: 30px;
    width: 172px;
    background-color: #a36760;
    color: white;
    font-weight: 600;
    font-size: 14px;
  }
`
const ModalFooter = styled.div`
  align-self: flex-end;
  margin-top: 20px; 
  max-width: 275px;
  width: 50%;
  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 5px 0;
  }
  li{
    padding-left: 5px;
    font-weight: 600;
    font-size: 14px;
    color: #a36760;
  }
p {
  padding-right: 0;
  font-size: 14px;
  margin: 0;
  line-height: 20px;
}
`;
