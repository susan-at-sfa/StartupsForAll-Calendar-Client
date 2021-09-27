import { FC } from "react";
import { useAppDispatch } from "../../hooks";
import { setFilterModalOpen } from "../../store/slices/filterModal/showFilterModalSlice";
import { FiList } from "react-icons/fi";
import styled from "@emotion/styled";
import { device } from "../../constants/Device";

const FilterButton: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      <div id="filterClick" onClick={() => dispatch(setFilterModalOpen(true))}>
        <FiList id="filterIcon" />
        <p> Filters</p>
      </div>
    </Wrapper>
  );
};

export default FilterButton;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 0;
  margin-bottom: -21px;
  z-index: 8;
  position: sticky;
  top: 49px;
  @media ${device.desktop} {
    position: sticky;
    top: 0;
  }
  #filterClick {
    align-self: flex-end;
    display: flex;
    text-align: right;
    background-color: white;
    width: 75px;
    margin: 0;
    padding-left: 12px;
    z-index: 8;
    position: sticky;
    top: 0px;
  }
  p {
    display: inline;
    color: #c79288;
    font-size: 14px;
    font-weight: 600;
  }
  #filterIcon {
    color: #c79288;
    margin: 2px 2px 0 0px;
  }
`;
