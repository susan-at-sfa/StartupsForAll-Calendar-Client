import { FC, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { events } from '../../containers/Events/DummyEvents';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setEventDetailsModalOpen, setSelectedEventID } from '../../store/slices/eventDetails/showEventDetailsSlice'

interface EventDetailsModalProps {
  id: string
}

const EventDetailsModal: FC<EventDetailsModalProps> = (props) => {
  const event = events.filter(e => e.id === props.id)
  const dispatch = useAppDispatch();

  const onClickingExit = () => {
    dispatch(setSelectedEventID(""));
    dispatch(setEventDetailsModalOpen(false));
  }

  return (
    <>
      {event.map((e) => {
        return (
          <Background key={e.id}>
            <Wrapper>
              <ButtonDiv>
                <button type="button" onClick={() => onClickingExit()}>Exit</button>
              </ButtonDiv>
              <ModalImg>
                <img src={e.logo} alt={e.title + "logo"} />
              </ModalImg>
            </Wrapper>
          </Background>
        )
      })
      }
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
background-color: white;
height: 90vh;
width: 95vw;
`
const ButtonDiv = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
`
const ModalImg = styled.div`
display: flex;
flex-direction: column;
align-items: center;
img{
width: 95%;
height: auto;
}
`