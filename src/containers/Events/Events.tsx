import { FC } from "react";
import styled from "styled-components";
import EventsList from "../../components/EventList/EventsList";
import AdminGoogle from "../../components/Google/AdminGoogle";
import GoogleCalendar from "../../components/Google/GoogleCalendar";
import FilterButton from "../../components/Selections/Filter Button";
import { device } from "../../constants/Device";

const Events: FC = () => {

  return (
    // <Wrapper>
    //   <div className="eventBox">
    //     <ListEventContainer>
    //       <FilterButton />
    //       <EventsList />
    //     </ListEventContainer>
    //   </div>
    //   <CalendarDiv>
    //     <GoogleCalendar />
    //   </CalendarDiv>
    // </Wrapper >
    <Wrapper>
      <AdminGoogle />
    </Wrapper>
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
z-index: 2;
position: relative;
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
`;
const CalendarDiv = styled.div`
display: none;
@media ${device.desktop}{
  display: block;
}
`
