import { FC, useCallback, useRef, useEffect } from "react";
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
  topicsText,
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
  const modalRef: any = useRef();

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

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      dispatch(setEventDetailsModalOpen(false));
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && modalOpen) {
        dispatch(setEventDetailsModalOpen(false));
      }
    },
    [setEventDetailsModalOpen, modalOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

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
              g_cal_link,
              start_date,
              logo,
              location,
              summary,
              title,
              topics,
              url,
            } = e;

            const dateOptions: any = {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            };
            const eventDate = new Date(start_date).toLocaleString(
              [],
              dateOptions
            );
            const localeCreatedAt = new Date(created_at).toLocaleString([], {
              year: "numeric",
              month: "numeric",
              day: "2-digit",
              hour: "numeric",
              minute: "2-digit",
            });
            // TODO: import this interface...
            // const timeOptions: DateTimeFormatOptions = {
            const timeOptions: any = {
              hour: "numeric",
              minute: "2-digit",
            };
            const start_time = new Date(start_date).toLocaleTimeString(
              [],
              timeOptions
            );
            const end_time = new Date(end_date).toLocaleTimeString([], {
              ...timeOptions,
              timeZoneName: "short",
            });

            return (
              <Background onClick={closeModal} ref={modalRef} key={id}>
                <animated.div style={animation}>
                  <Wrapper>
                    <TopButtonDiv>
                      <div className="topButtonsLeft">
                        <BackButton
                          id="back"
                          type="button"
                          onClick={() => onClickingBack()}
                        >
                          Back
                        </BackButton>
                      </div>
                      <div className="topButtonsRight">
                        <a
                          href={g_cal_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button id="calendarAdd" type="button">
                            + Cal
                          </button>
                        </a>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          <button id="viewPage" type="button">
                            View More Details
                          </button>
                        </a>
                      </div>
                    </TopButtonDiv>
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
                      <Centered>
                        <BiVideo /> {location}
                      </Centered>
                      <h4>Price</h4>
                      <p>
                        {cost}{" "}
                        <span id="cost">+ taxes & fees where applicable</span>
                      </p>
                      <h4>Summary</h4>
                      <p style={{ paddingLeft: "10px" }}>{summary}</p>
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
                        <a
                          href={g_cal_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button id="calendarAdd" type="button">
                            + Cal
                          </button>
                        </a>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          <button id="viewPage" type="button">
                            View More Details
                          </button>
                        </a>
                      </BottomButtonDiv>
                      {url && (
                        <>
                          <h4>Event Link</h4>
                          <p>
                            <a
                              id="link"
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ lineHeight: "17px" }}
                            >
                              {url}
                            </a>
                          </p>
                        </>
                      )}
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
                                <span className="emojiDisplay">
                                  {topicsEmojis[topic]}
                                </span>{" "}
                                {topicsText[topic]}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div>
                        <p>Posted</p>
                        <p>{localeCreatedAt}</p>
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
  width: 100%;
  height: 100%;
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
  min-width: 320px;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
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
      color: white;
      background-color: var(--add-button-hover);
      cursor: pointer;
      transition: 0.5s ease;
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
      color: white;
      background-color: var(--button-dark-hover);
      cursor: pointer;
      transition: 0.5s ease;
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
  flex: 1;
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
  flex: 1;
  .topicsAndCategories {
    display: flex;
    align-items: center;
    justify-content: right;
  }
  h2 {
    font-size: 12px;
  }
`;

const CustomBlurb = styled.div`
  align-self: flex-end;
  width: 100%;
  margin: 10px 0;
  background-color: #fdfbe4;
  padding: 15px 20px 15px 15px;
  h2 {
    font-size: 14px;
    line-height: 23px;
    font-weight: 600;
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
  margin: 10px 0;
  img {
    width: 100%;
    height: auto;
  }
`;
const ModalHeader = styled.div`
  width: 100%;
  margin-top: 15px;
  margin-bottom: 20px;
  margin-right: 10px;
  h2 {
    font-size: 18px;
    font-weight: 600;
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
    font-weight: 600;
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
    font-weight: 600;
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
  display: flex;
  width: 100%;
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
    &:hover {
      cursor: pointer;
      background-color: var(--back-button-hover);
      transition: 0.5s ease;
    }
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
      color: white;
      background-color: var(--add-button-hover);
      cursor: pointer;
      transition: 0.5s ease;
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
      color: white;
      background-color: var(--add-button-hover);
      cursor: pointer;
      transition: 0.5s ease;
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
  .emojiDisplay {
    background-color: white;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    padding: 1px 3px 0px 4px;
    margin-right: 6px;
  }
`;
const Centered = styled.p`
  display: flex;
  align-items: center;
  align-content: center;
  svg {
    margin-right: 4px;
  }
`;

const BackButton = styled.button`
  border: none;
  width: 75px;
  background-color: #6073a3;
  color: white;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &:hover {
    cursor: pointer;
    background-color: var(--back-button-hover);
    transition: 0.5s ease;
  }
`;
