import { FC } from "react";
// import { useAppDispatch, useAppSelector } from '../hooks';
import styled from "@emotion/styled";
import headerImage from '../assets/images/s4aHEADER.png';


const Header: FC = () => {
  // const dispatch = useAppDispatch();
  // const useSelector = useAppSelector();
  return (
    <Wrapper>
      <Title>Events</Title>
    </Wrapper>
  )
}

export default Header;

const Title = styled.div`
font-style: normal;
font-weight: 600;
font-size: 36px;
line-height: 54px;
text-align: center;
color: #C79288;
`

const Wrapper = styled.div`
position: absolute;
  height: 225px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${headerImage});
  background-size: cover;
`