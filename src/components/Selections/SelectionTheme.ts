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
  &:checked ~ .markBox{
    border: 4px solid #A36760;
  }
  &:checked ~ svg{
    display: inline;
    position: absolute;
    top: 2px;
    left: 6px;
  }
}
svg{
  display: none;
}
.markBox {
  position: absolute;
  top: 0px;
  left: 0px;
  border: 4px solid #F1F1F1;
  height: 28px;
  width: 28px;
  background-color: white;
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