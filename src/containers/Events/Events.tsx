import { FC } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks";
import { FiList } from "react-icons/fi";
import { setFilterModalOpen } from "../../store/slices/filterModal/showFilterModalSlice";
import EventsList from "../../components/EventList/EventsList";
import GoogleCalendar from "../../components/Google/GoogleCalendar";
import { device } from "../../constants/Device";

const Events: FC = () => {
  const dispatch = useAppDispatch();

  return (
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
  );
};

export default Events;

const Wrapper = styled.div`
display: flex;
padding-top: 2%;
align-items: center;
justify-content: center;
background-color: white;
width: 100%;
z-index: 3;
@media ${device.mobile}{
  align-items: center;
  justify-content: center;
}
.eventBox{
  @media ${device.desktop}{
    max-height: 600px;
    overflow: scroll;
    margin-right: 2%;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar{
      display: none;
    }
  }
}
`;
const ListEventContainer = styled.div`
width: 340px;
position: sticky;
top: 95px;
`;
const FilterButton = styled.div`
position: sticky;
top: 0px;
width: 100%;
text-align: right;
z-index: 3;
background: white;
@media ${device.mobile}{
  top: 0px;
}
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
const CalendarDiv = styled.div`
display: none;
@media ${device.desktop}{
  display: block;
}
`
