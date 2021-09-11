import { FC, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useSpring, animated } from 'react-spring';
import { setFilterModalOpen } from "../../store/slices/filterModal/showFilterModalSlice";

interface FilterModalProps {
  modalOpen: boolean;
}
const FilterModal: FC<FilterModalProps> = (props) => {
  const dispatch = useAppDispatch();
  const { modalOpen } = props;
  const animation = useSpring({
    config: {
      duration: 350
    },
    opacity: modalOpen ? 1 : 0,
    transform: modalOpen ? `translateY(0%)` : `translateY(-100%)`
  })

  return (
    <>
      {modalOpen
        ? (<Background>
          <animated.div style={animation}>
            <Wrapper>
              <button onClick={() => dispatch(setFilterModalOpen(false))} >Close</button>
            </Wrapper>
          </animated.div>
        </Background>)
        : null}
    </>
  )
}

export default FilterModal;

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
  width: 65vw;
  z-index: 10;
  overflow: scroll;
`