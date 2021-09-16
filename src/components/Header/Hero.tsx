import { FC } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router";
import { useAppSelector } from "../../hooks";
import stars from "../../assets/images/stars.png";

const Hero: FC = () => {
  const menuOpen = useAppSelector(({ menu }) => menu.menuOpen);
  const location = useLocation();

  return (
    <HeroContainer>
      {!menuOpen && location.pathname === "/" && <Title>Events</Title>}
      {!menuOpen && location.pathname === "/add" && <Title>Add Event</Title>}
      {!menuOpen && location.pathname === "/login" && <Title>Login</Title>}
      {!menuOpen && location.pathname === "/admin" && (
        <Title>Admin Events</Title>
      )}
    </HeroContainer>
  );
};

export default Hero;

const HeroContainer = styled.div`
  height: 200px;
  background-image: url(${stars});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 54px;
  text-align: center;
  color: #c79288;
`;
