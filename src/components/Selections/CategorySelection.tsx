import { FC } from "react";
import {
  categories,
  categoryBackgroundColor,
} from "../../constants/CategoryColors";
import { SelectionDiv } from "./SelectionTheme";

interface CategorySelectionProps {
  onClick: (a: string) => void;
}

const CategorySelection: FC<CategorySelectionProps> = (props) => {
  return (
    <SelectionDiv>
      {categories.map((category: string) => (
        <label key={category} className="container">
          <div
            style={{
              backgroundColor: categoryBackgroundColor[category],
              color: "white",
            }}
            id="displayText"
          >
            {category}
          </div>
          <input type="checkbox" onClick={() => props.onClick(category)} />
          <span className="checkmark"></span>
        </label>
      ))}
    </SelectionDiv>
  );
};

export default CategorySelection;
