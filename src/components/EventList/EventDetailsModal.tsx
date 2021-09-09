import { FC, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { events } from '../../containers/Events/DummyEvents';
import { useAppSelector } from '../../hooks';

interface EventDetailsModalProps {
  id: string
}

const EventDetailsModal: FC<EventDetailsModalProps> = (props) => {
  // const eventID = parseInt(props.id)
  const event = events.filter(e => e.id === props.id)
  console.log("MODAL EVENT", event)
  return (
    <>
      {event.map((e) => {
        return (
          <Background key={e.id}>
            <Wrapper>
              <ModalImg src={e.logo} alt={e.title + "logo"} />
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
background-color: white;
height: 95vh;
width: 95vw;
`
const ModalImg = styled.img`
`