import type { CategorySelectorProps } from "../../services/productService";

const CategorySelector = ({
  categories,
  selectedCategories,
  onChange,
}: CategorySelectorProps) => {

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
        <label className="label" key={category.id}>
          <input 
          type="checkbox" 
          className="checkbox primary bg-base-100" 
          value={category.id}
          checked={selectedCategories.includes(category.id)}
          onChange = {(e) => {
            const id = Number(e.target.value);
            if(e.target.checked){
                onChange([...selectedCategories,id]);
            }else{
                onChange(selectedCategories.filter((categoryId) => categoryId !== id));
            }
          }}
          
          />
          {category.name}
        </label>
      ))}
    </div>
  );
};
export default CategorySelector;