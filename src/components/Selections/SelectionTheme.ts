import styled from "@emotion/styled";

export const SelectionDiv = styled.div`
#displayText{
  color: #A36760;
  padding: 2px;
  padding-left: 6px;
}
.container {
  display: block;
  position: relative;
  padding-left: 39px;
  margin-bottom: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  last-of-type: {
    margin-bottom: 0;
  }
}
input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  &:checked ~ .checkmarkBox{
    border: 4px solid #A36760;
  }
  &:checked ~ .checkmarkBox::after{
display: block;
  }
  &:checked ~ .marksTheSpot{
    display: block;
  }
}

.checkmarkBox {
  position: absolute;
  top: 0px;
  left: 0px;
  border: 4px solid #F1F1F1;
  height: 28px;
  width: 28px;
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
.emojiDisplay{
  background-color: white;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  padding: 1px 3px 0px 4px;
  margin-right: 6px;
}
`