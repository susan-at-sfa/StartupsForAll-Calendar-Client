import { FC } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks";
import { FiList } from 'react-icons/fi'
import { setFilterModalOpen } from "../../store/slices/filterModal/showFilterModalSlice";
import OrganizedEventsComponent from "../../components/OrganizedEvents/OrganizedEvents";

const Events: FC = () => {
const dispatch = useAppDispatch();

  return (
    <Wrapper>
      <ListEventContainer>
        <FilterButton >
          <div id='filterClick' onClick={() => dispatch(setFilterModalOpen(true))}>
          <FiList id="filterIcon" />
          <p> Filters</p>
          </div>
        </FilterButton>
        <OrganizedEventsComponent/>
      </ListEventContainer>
    </Wrapper>
  )
};

export default Events;

const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
`
const ListEventContainer = styled.div`
  width: 340px;
  `
const FilterButton = styled.div`
position: sticky;
top: 15px;
width: 100%;
text-align: right;
z-index: 2;
#filterClick{
  display: flex;
  background-color: white;
  position: absolute;
  right: 0;
  margin: 0;
  width: 75px;
  padding-left: 12px;
}
p{
    display: inline;
    color: #C79288;
    font-size: 14px; 
    font-weight: bold;
  }
  #filterIcon{
    color: #C79288;
    margin: 2px 2px 0 0px;
  }
`