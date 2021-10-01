import { FC, useCallback, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import FilterIcon from "../../assets/images/icon_filters_grey.svg";
import { useSpring, animated } from "react-spring";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setFilterModalOpen } from "../../store/slices/filterModal/showFilterModalSlice";
import {
  setTopicFilters,
  setCategoryFilters,
  getDbEventsByFilter,
} from "../../store/slices/dbEvent/dbEventSlice";
import TopicSelection from "./TopicSelection";
import CategorySelection from "./CategorySelection";

interface FilterModalProps {
  modalOpen: boolean;
}

const FilterModal: FC<FilterModalProps> = (props) => {
  const topicFilters = useAppSelector(({ dbEvent }) => dbEvent.topicFilters);
  const categoryFilters = useAppSelector(
    ({ dbEvent }) => dbEvent.categoryFilters
  );
  const dispatch = useAppDispatch();
  const { modalOpen } = props;
  const modalRef: any = useRef();

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      dispatch(setFilterModalOpen(false));
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && modalOpen) {
        dispatch(setFilterModalOpen(false));
      }
    },
    [setFilterModalOpen, modalOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  const animation = useSpring({
    config: {
      duration: 350,
    },
    opacity: modalOpen ? 1 : 0,
    transform: modalOpen ? `translateY(0%)` : `translateY(-100%)`,
  });

  const onClickingTopic = (topic: string) => {
    topicFilters.includes(topic)
      ? dispatch(
          setTopicFilters(
            topicFilters.filter((topicFilter) => topicFilter !== topic)
          )
        )
      : dispatch(setTopicFilters([...topicFilters, topic]));
  };

  const onClickingCategory = (category: string) => {
    categoryFilters.includes(category)
      ? dispatch(
          setCategoryFilters(
            categoryFilters.filter(
              (categoryFilter) => categoryFilter !== category
            )
          )
        )
      : dispatch(setCategoryFilters([...categoryFilters, category]));
  };

  const onClickingExit = () => {
    dispatch(setFilterModalOpen(false));
  };

  const clearFilters = () => {
    let payload: any = {};
    dispatch(setTopicFilters([]));
    dispatch(setCategoryFilters([]));
    dispatch(getDbEventsByFilter(payload));
  };

  const submitFilterQuery = () => {
    let payload: any = {};
    if (topicFilters.length > 0) {
      payload.topics = [...topicFilters];
    }
    if (categoryFilters.length > 0) {
      payload.categories = [...categoryFilters];
    }
    dispatch(getDbEventsByFilter(payload));
  };

  return (
    <>
      {modalOpen ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <Wrapper>
              <FilterButton>
                <div className="left" onClick={() => onClickingExit()}>
                  <FilterIconImg src={FilterIcon} alt="filter list" />
                  <p>Filters</p>
                </div>
                <div className="right">
                  <span onClick={clearFilters}>Clear</span>
                  <button className="close" onClick={onClickingExit}></button>
                </div>
              </FilterButton>
              <div className="categories">
                <h2>Category</h2>
                <CategorySelection onClick={onClickingCategory} />
              </div>
              <div className="topics">
                <h2>Topics</h2>
                <TopicSelection onClick={onClickingTopic} />
              </div>
              <div id="updateButtonDiv">
                <button id="update" type="button" onClick={submitFilterQuery}>
                  Update Results
                </button>
              </div>
            </Wrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

export default FilterModal;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 7;
  overflow-x: hidden;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 90vw;
  max-width: 263px;
  z-index: 10;
  #updateButtonDiv {
    display: flex;
    position: relative;
    justify-content: flex-end;
    padding-top: 45px;
    padding-bottom: 24px;
  }
  #update {
    color: white;
    font-weight: 600;
    font-size: 14px;
    border: none;
    width: 95%;
    max-width: 245px;
    padding-right: 30px;
    height: 36px;
    background-color: #a36760;
    &:hover {
      color: white;
      background-color: var(--button-dark-hover);
      cursor: pointer;
      transition: 0.5s ease;
    }
  }
  .topics,
  .categories {
    padding-top: 24px;
    padding-left: 5%;
    padding-right: 18px;
    max-width: 263px;
    h2 {
      text-align: center;
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: 600;
      color: #a36760;
    }
  }
`;
const FilterButton = styled.div`
  display: flex;
  justify-content: space-between;
  .close {
    position: absolute;
    right: 0;
    top: 0;
    border: 4px solid #cbcbcb;
    background-color: white;
    width: 27px;
    height: 27px;
    opacity: 0.8;
    &::after {
      transform: rotate(-45deg);
    }
    &::before {
      transform: rotate(45deg);
    }
    &:hover {
      opacity: 1;
      cursor: pointer;
    }
    &::before,
    ::after {
      position: absolute;
      top: 2px;
      left: 8px;
      content: " ";
      height: 15px;
      width: 3px;
      background-color: #cbcbcb;
    }
  }
  .left {
    flex: 1;
    padding: 3px;
    display: flex;
    &:hover {
      cursor: pointer;
    }
  }
  .right {
    flex: 1;
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    span {
      position: absolute;
      right: 32px;
      font-weight: bold;
      color: #cbcbcb;
      cursor: pointer;
    }
  }
  p {
    color: #cbcbcb;
    margin-left: 4px;
    font-size: 16px;
    font-weight: 600;
  }
  #filterIcon {
    color: #cbcbcb;
    margin: 0;
    font-size: 17px;
    position: relative;
    top: 11px;
    left: 15px;
  }
`;

const FilterIconImg = styled.img`
  width: 23px;
  height: 23px;
  padding: 3px;
  margin-left: 4px;
`;
