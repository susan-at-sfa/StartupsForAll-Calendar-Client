import { FC } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks";
import { FiList } from "react-icons/fi";
import { setFilterModalOpen } from "../../store/slices/filterModal/showFilterModalSlice";
import EventsList from "../../components/EventList/EventsList";
import GoogleCalendar from "../../components/Google/GoogleCalendar";
// import AdminGoogle from "../../components/Google/AdminGoogle";

const Events: FC = () => {
  const dispatch = useAppDispatch();

  return (
    // <Wrapper>
    //   <ListEventContainer>
    //     <FilterButton>
    //       <div
    //         id="filterClick"
    //         onClick={() => dispatch(setFilterModalOpen(true))}
    //       >
    //         <FiList id="filterIcon" />
    //         <p> Filters</p>
    //       </div>
    //     </FilterButton>
    //     <EventsList />
    //   </ListEventContainer>
    // </Wrapper >
    <Wrapper>
      <div className="eventBox">
        <ListEventContainer>
          <FilterButton>
            <div
              id="filterClick"
              onClick={() => dispatch(setFilterModalOpen(true))}
            >
              <FiList id="filterIcon" />
              <p> Filters</p>
            </div>
          </FilterButton>
          <EventsList />
        </ListEventContainer>
      </div>
      <CalendarDiv>
        <GoogleCalendar />
      </CalendarDiv>
    </Wrapper >
    //   <Wrapper>
    //     <AdminGoogle />
    //   </Wrapper>
  );
};

export default Events;

const CalendarDiv = styled.div`
@media (max-width: 900px){
  display: none;
}
`
const Wrapper = styled.div`
display: flex;
padding-top: 5%;
align-items: center;
justify-content: space-evenly;
@media (max-width: 700px){
  align-items: center;
  justify-content: center;
}
.eventBox{
  @media(min-width: 700px){
max-height: 600px;
overflow: scroll;
}
}
`;
const ListEventContainer = styled.div`
      width: 340px;
      `;
const FilterButton = styled.div`
@media (max-width: 700px){
  top: 90px; /* logo header + navbar */
}
  position: sticky;
  top: 10px; /* logo header + navbar */
  width: 100%;
  text-align: right;
  z-index: 3;
  background: white;
  #filterClick {
    display: flex;
    background-color: white;
    position: absolute;
    right: 0;
    margin: 0;
    width: 75px;
    padding-left: 12px;
  }
      p {
        display: inline;
      color: #c79288;
      font-size: 14px;
      font-weight: bold;
  }
      #filterIcon {
        color: #c79288;
      margin: 2px 2px 0 0px;
  }
      `;
