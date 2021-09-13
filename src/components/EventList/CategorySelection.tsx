import { FC } from 'react';
import { categories, categoryBackgroundColor } from '../../constants/CategoryColors';
import { SelectionDiv } from '../EventList/SelectionTheme'

interface CategorySelectionProps {
  textColor: string;
  onClick: (a: string) => void
}

const CategorySelection: FC<CategorySelectionProps> = (props) => {
  const { textColor, onClick } = props;
  return (
    <SelectionDiv>
      {categories.map((category: string) => (
        <label
          key={category}
          className="container"
        >
          <div
            style={{
              backgroundColor: categoryBackgroundColor[category],
              color: textColor
            }}
            id="displayText">
            {category}
          </div>
          <input type="checkbox"
            onClick={() => onClick(category)}
          />
          <span className="checkmark"></span>
        </label>
      ))
      }
    </SelectionDiv>
  )
}

export default CategorySelection;
