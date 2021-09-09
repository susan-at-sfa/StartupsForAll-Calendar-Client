import { FC, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { events } from '../../containers/Events/DummyEvents';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setEventDetailsModalOpen, setSelectedEventID } from '../../store/slices/eventDetails/showEventDetailsSlice'
import { useSpring, animated } from 'react-spring';

interface EventDetailsModalProps {
  selectedEventID: string
  modalOpen: boolean
}

const EventDetailsModal: FC<EventDetailsModalProps> = (props) => {
  const { selectedEventID, modalOpen } = props;
  const event = events.filter(e => e.id === selectedEventID)
  const dispatch = useAppDispatch();

  const onClickingBack = () => {
    dispatch(setSelectedEventID(""));
    dispatch(setEventDetailsModalOpen(false));
  }

  const animation = useSpring({
    config: {
      duration: 350
    },
    opacity: modalOpen ? 1 : 0,
    transform: modalOpen ? `translateY(0%)` : `translateY(-100%)`
  })

  const topicEmojis: Record<string, string> = {
    '💵 Funding / Financial': '💵',
    '☕️ Action Cafe': '☕️',
    '🚀 Open Space': '🚀',
    '🌎 Social Impact': '🌎',
    '🧩 Strategy': '🧩',
    '🔍 User Research': '🔍',
  }

  const categoryBackgroundColor: Record<string, string> = {
    "Founder": "#9DD3C9",
    "Expert": "#A0BAD2",
    "Community": "#B6A5D3"
  }

  return (
    <>
      {modalOpen ? (
        <>
          {event.map((e) => {
            const { id, category, logo, location, title, start_date, start_time, end_time, creator_name, topics, description, url } = e;
            const eventDate = new Date(start_date).toDateString();
            return (
              <Background key={id}>
                <animated.div style={animation}>
                  <Wrapper>
                    <ButtonDiv>
                      <button id="back" type="button" onClick={() => onClickingBack()}>Back</button>
                      <button id="calendarAdd" type="button">+Cal</button>
                      <button id="viewPage" type="button"><a href={url}>View More Details</a></button>
                    </ButtonDiv>
                    <SmallHeader>
                      <SmallHeaderLeft>
                        <h2>{title}</h2>
                        <p>{creator_name}</p>
                      </SmallHeaderLeft>
                      <SmallHeaderRight>
                        <h2>{eventDate}</h2>
                        <p>{start_time} - {end_time}</p>
                        <ul>
                          {topics.map((topic, index) => {
                            return (
                              <li key={index}>
                                {topicEmojis[topic]}
                              </li>
                            )
                          })}
                        </ul>
                        <h3
                          style={{ backgroundColor: categoryBackgroundColor[category] }}>
                          {category}
                        </h3>
                      </SmallHeaderRight>
                    </SmallHeader>
                    <ModalImg>
                      <img src={logo} alt={title + "logo"} />
                    </ModalImg>
                    <ModalHeader>
                      <h2>{title}</h2>
                      <p>Referred by <span>{creator_name}</span></p>
                      <h4>{eventDate}</h4>
                      <p>{start_time} - {end_time}</p>
                      <h4>Location</h4>
                      <p>{location}</p>
                      <h4>Summary</h4>
                      <p>{description}</p>
                    </ModalHeader>
                    <ButtonDiv>
                      <button id="back" type="button" onClick={() => onClickingBack()}>Back</button>
                      <button id="calendarAdd" type="button">+Cal</button>
                      <button id="viewPage" type="button"><a href={url}>View More Details</a></button>
                    </ButtonDiv>
                  </Wrapper>
                </animated.div>
              </Background>
            )
          })
          }
        </>
      ) : null}
    </>
  )
}

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
  `
const Wrapper = styled.div`
display: flex;
flex-direction: column;
margin-top: 10px;
padding-top: 10px;
padding-left: 10px;
background-color: white;
height: 90vh;
width: 90vw;
z-index: 10;
`
const ButtonDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: right;
margin-top: 5px;
a{
  text-decoration: none;
  color: white;
  font-weight: 600;
  font-size: 14px;
}
#back{
  margin-right: 28px;
  padding: 1px 10px 1px 10px;
  border: none;
  height: 30px;
  background-color: #6073A3;
  color: white;
  font-weight: 600;
  font-size: 14px;
}
#calendarAdd {
  padding: 1px 10px 1px 10px;
  margin-right: 5px;
  border: none;
  height: 30px;
  background-color: #C79288;
  color: white;
  font-weight: 600;
  font-size: 14px;
}
#viewPage{
  border: none;
  padding: 1px 62px 1px 18px;
  height: 30px;
  background-color: #A36760;
}
`
const SmallHeader = styled.div`
display: flex;
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
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 12px;
}
li{
  display: flex;
  margin: 0 5px 0px 5px;
}
`
const SmallHeaderLeft = styled.div`
flex: 0.55;
`
const SmallHeaderRight = styled.div`
flex: 0.45;
display: flex;
flex-direction: row;
justify-content: flex-end;
flex-wrap: wrap;
p{
  margin-left: 25px;
}
`
const ModalImg = styled.div`
display: flex;
margin-right: 10px;
flex-direction: column;
align-items: center;
margin-top: 8px;
img{
width: 100%;
height: auto;
}
`
const ModalHeader = styled.div`
width: 325px;
margin-top: 15px;
margin-bottom: 20px;
h2{
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px 0 0;
  line-height: 22px;
}
p{
  font-size: 15px;
  margin: 0;
}
h4{
  font-size: 15px;
  font-weight: bold;
  margin: 10px 0px 0px;
}
span{
  color: #7BB1A7;
}
`