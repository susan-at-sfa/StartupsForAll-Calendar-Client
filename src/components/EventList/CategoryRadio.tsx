import { FC, useState } from "react";
import styled from "@emotion/styled";

interface CategoryRadioProps {
  onChange: (a: any) => void;
  selectedCategory: string;
}

const CategoryRadio: FC<CategoryRadioProps> = (props) => {
  console.log("Category Radio component. Props:", props);

  return (
    <CategoryDiv>
      <label className="container">
        <div id="community">Community</div>
        <input
          type="radio"
          name="category"
          value="Community"
          checked={props.selectedCategory === "Community"}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <span className="checkmark"></span>
      </label>
      <label className="container">
        <div id="founders">Founders</div>
        <input
          type="radio"
          name="category"
          value="Founders"
          checked={props.selectedCategory === "Founders"}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <span className="checkmark"></span>
      </label>
      <label className="container">
        <div id="experts">Experts</div>
        <input
          type="radio"
          name="category"
          value="Experts"
          checked={props.selectedCategory === "Experts"}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <span className="checkmark"></span>
      </label>
    </CategoryDiv>
  );
};

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
    #community,
    #founders,
    #experts {
      color: white;
      padding: 1px 0px 2px 7px;
      width: 100%;
    }
    #community {
      background-color: #b6a5d3;
    }
    #founders {
      background-color: #9dd3c9;
    }
    #experts {
      background-color: #a0bad2;
    }
  }
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    &:checked ~ .checkmark {
      border: 4px solid #a36760;
      background-color: #7bb1a7;
    }
    &:checked ~ .checkmark::after {
      display: block;
    }
  }
  .checkmark {
    position: absolute;
    top: 0px;
    left: 1px;
    bottom: 1px;
    border: 4px solid #f1f1f1;
    border-radius: 50%;
    height: 25px;
    width: 25px;
    background-color: white;
  }
`;
