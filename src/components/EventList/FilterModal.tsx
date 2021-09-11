import { FC, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useSpring, animated } from 'react-spring';
import { setFilterModalOpen } from "../../store/slices/filterModal/showFilterModalSlice";
import { Topics } from '../../constants/Topics.enum';
import { categories, categoryBackgroundColor } from '../../constants/CategoryColors';

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
              <SelectionDiv id="categories">
                {categories.map((category, index) => (
                  <label key={index} className="container">{category}
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                ))}
              </SelectionDiv>
              <SelectionDiv id="topics">
                {Topics.map((topic, index) => (
                  <label key={index} className="container">{topic}
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                ))}
              </SelectionDiv>
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
const SelectionDiv = styled.div`
margin-top: 100px;
#categories{
}
#topics{
}
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  &:checked ~ .checkmark{
    background-color: #2196F3;
  }
  &:checked ~ .checkmark::after{
    display: block;
  }
}
.checkmark {
  position: absolute;
  top: 4px;
  left: 4px;
  height: 20px;
  width: 20px;
  background-color: #eee;
  &::after{
    content: "";
    position: absolute;
    display: none;
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid #7BB1A7;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}
`