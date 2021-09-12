import { FC } from 'react';
import styled from '@emotion/styled';
import { FiList } from 'react-icons/fi';
import { useSpring, animated } from 'react-spring';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilterModalOpen } from "../../store/slices/filterModal/showFilterModalSlice";
import { setTopicFilters } from '../../store/slices/dbEvent/dbEventSlice';
import { Topics } from '../../constants/Topics.enum';
import { categories, categoryBackgroundColor } from '../../constants/CategoryColors';
import { topicsEmojiColors } from '../../constants/TopicsEmojiColors';

interface FilterModalProps {
  modalOpen: boolean;
}

const FilterModal: FC<FilterModalProps> = (props) => {
  const topicFilters = useAppSelector(({ dbEvent }) => dbEvent.topicFilters)
  const dispatch = useAppDispatch();
  console.log("Topics", topicFilters);
  const { modalOpen } = props;

  const animation = useSpring({
    config: {
      duration: 350
    },
    opacity: modalOpen ? 1 : 0,
    transform: modalOpen ? `translateY(0%)` : `translateY(-100%)`
  })

  const onClickingTopic = (topic: string) => {
    topicFilters.includes(topic)
      ? dispatch(setTopicFilters(topicFilters.filter(topicFilter => topicFilter !== topic)))
      : dispatch(setTopicFilters([...topicFilters, topic]))
  }

  const onClickingExit = () => {
    dispatch(setTopicFilters([]));
    dispatch(setFilterModalOpen(false));
  }

  return (
    <>
      {modalOpen
        ? (<Background>
          <animated.div style={animation}>
            <Wrapper>
              <FilterButton>
                <div className="left" onClick={() => onClickingExit()}>
                  <FiList id="filterIcon" />
                  <p> Filters</p>
                </div>
                <div className="right">
                  <button
                    type="button"
                    className="close"
                    onClick={() => onClickingExit()}
                  />
                </div>
              </FilterButton>
              <SelectionDiv className="categories">
                <h2>Category</h2>
                {categories.map((category, index) => (
                  <label key={index} className="container">
                    <div
                      style={{ backgroundColor: categoryBackgroundColor[category] }}
                      id="categoryText">
                      {category}
                    </div>
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                ))}
              </SelectionDiv>
              <SelectionDiv className="topics">
                <h2>Topics</h2>
                {Topics.map((topic, index) => (
                  <label
                    key={index}
                    className="container"
                  >
                    <div
                      style={{ backgroundColor: topicsEmojiColors[topic] }}
                      id="topicText">
                      {topic}
                    </div>
                    <input type="checkbox"
                      onClick={() => onClickingTopic(topic)}
                    />
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
overflow-x: hidden;
`
const Wrapper = styled.div`
display: flex;
flex-direction: column;
background-color: white;
height: 90vh;
width: 75vw;
z-index: 10;
#update{
  position: fixed;
  bottom: 110px;
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
  right: 4px;
  top: 4px;
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
    top: 1px;
    left: 7px;
    content: ' ';
    height: 15px;
    width: 3px;
    background-color: #CBCBCB;
  }
}
&.left{
  flex: 0.5;
}
&.right{
  flex: 0.5;
}
p{
  color: #CBCBCB;
  margin: 0;
  position: relative;
  top: 8px;
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
  top: 11px;
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
  color: #A36760;
  padding-bottom: 2px;
  padding-left: 8px;
}
#categoryText{
  color: white;
  padding-bottom: 2px;
  padding-left: 8px;
}
&.categories{
  margin-top: 35px;
}
&.topics{
  margin-top: 15px;
}
.container {
  display: block;
  position: relative;
  padding-left: 50px;
  margin-bottom: 8px;
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