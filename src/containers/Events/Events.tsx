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
        <FilterButton onClick={() => dispatch(setFilterModalOpen(true))}>
          <FiList id="filterIcon" />
          <p> Filter</p>
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
top: 20px;
width: 75px;
text-align: right;
z-index: 2;
background-color: white;
p{
    display: inline;
    color: #C79288;
    font-size: 14px; 
    font-weight: bold;
  }
  #filterIcon{
    color: #C79288;
    margin: 2px 2px 0 0;
  }
`