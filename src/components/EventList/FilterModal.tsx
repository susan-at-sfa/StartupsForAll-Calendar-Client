import { FC } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch } from '../../hooks';
import { useSpring, animated } from 'react-spring';
import { setFilterModalOpen } from "../../store/slices/filterModal/showFilterModalSlice";
import { Topics } from '../../constants/Topics.enum';
import { categories, categoryBackgroundColor } from '../../constants/CategoryColors';
import { FiList } from 'react-icons/fi';

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
              <FilterButton>
                <div className="left">
                  <FiList id="filterIcon" />
                  <p> Filters</p>
                </div>
                <div className="right">
                  <button type="button" className="close" onClick={() => dispatch(setFilterModalOpen(false))} ></button>
                </div>
              </FilterButton>
              <SelectionDiv className="categories">
                <h2>Category</h2>
                {categories.map((category, index) => (
                  <label key={index} className="container">{category}
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                ))}
              </SelectionDiv>
              <SelectionDiv className="topics">
                <h2>Topics</h2>
                {Topics.map((topic, index) => (
                  <label key={index} className="container"><span id="topicText">{topic}</span>
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                ))}
              </SelectionDiv>
              <button id="update" type="button">Update Results</button>
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
background-color: white;
height: 90vh;
width: 75vw;
z-index: 10;
overflow: scroll;
#update{
  position: fixed;
  bottom: 60px;
  right: 0;
  color: white;
  font-weight: bold;
  font-size: 14px;
  border: none;
  width: 260px;
  padding-right: 30px;
  height: 35px;
  background-color: #a36760;
}
`
const FilterButton = styled.div`
display: flex;
justify-content: space-between;
  .close {
    position: absolute;
    right: 5px;
    top: 15px;
    border: 3px solid #CBCBCB;
    background-color: white;
    width: 23px;
    height: 23px;
    opacity: 0.8;
    &::after{
      transform: rotate(-45deg);
    }
    &::before{
      transform: rotate(45deg);
    }
    &:hover {
      opacity: 1;
    }
    &::before, ::after {
      position: absolute;
      top: 0px;
      left: 7px;
      content: ' ';
      height: 18px;
      width: 3px;
      background-color: #CBCBCB;
}
}
&.left{
  flex: 0.5;
  align-items: center;
  justify-content: center;
  position: absolute;
}
&.right{
  flex: 0.5;
}
  p{
    color: #CBCBCB;
    margin: 0;
    position: relative;
    top: 0px;
    left: 14px;
    font-size: 16px;
    font-weight: bold;
    padding: 0;
    display: inline;
  }
  #filterIcon{
    color: #CBCBCB;
    margin: 0;
    font-size: 17px;
    position: relative;
    top: 3px;
    left: 15px;

  }
`
const SelectionDiv = styled.div`
h2{
  text-align: center;
  margin-bottom: 10px;
  font-size: 17px;
  font-weight: 600;
  color: #A36760;
}
#topicText{
  background-color: red;
}
&.categories{
margin-top: 45px;
}
&.topics{
  margin-top: 15px;
}
.container {
  display: block;
  position: relative;
  padding-left: 50px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 15px;
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
    border: 4px solid #A36760;
  }
  &:checked ~ .checkmark::after{
    display: block;
  }
}
.checkmark {
  position: absolute;
  margin-left: 15px;
  top: 1px;
  left: 3px;
  border: 4px solid #F1F1F1;
  height: 15px;
  width: 15px;
  background-color: white;
  &::after{
    content: "";
    position: absolute;
    display: none;
    left: 8px;
    top: -8px;
    width: 5px;
    height: 18px;
    border: solid #7BB1A7;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}
`