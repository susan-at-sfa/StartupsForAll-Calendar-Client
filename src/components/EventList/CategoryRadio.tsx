import { FC } from 'react'
import styled from '@emotion/styled'

const CategoryRadio: FC = () => {
  return (
    <CategoryDiv>
      <label className="container"><div id="community">Community</div>
        <input type="radio" name="radio1" />
        <span className="checkmark"></span>
      </label>
      <label className="container"><div id="founders">Founders</div>
        <input type="radio" name="radio1" />
        <span className="checkmark"></span>
      </label>
      <label className="container"><div id="experts">Experts</div>
        <input type="radio" name="radio1" />
        <span className="checkmark"></span>
      </label>
    </CategoryDiv>
  )
}

export default CategoryRadio;

const CategoryDiv = styled.div`
.container {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  last-of-type: {
    margin-bottom: 0;
  }
  #community, #founders, #experts{
    color: white;
    padding: 1px 0px 2px 7px;
    width: 100%
  }
  #community{
    background-color: #B6A5D3;
  }
  #founders{
    background-color: #9DD3C9;
  }
  #experts{
    background-color: #A0BAD2;
  }
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
  top: 0px;
  left: 1px;
  bottom: 1px;
  border: 4px solid #F1F1F1;
  height: 25px;
  width: 25px;
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
