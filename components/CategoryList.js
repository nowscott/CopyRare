// components/CategoryList.js
import React from "react";
import TagButton from "./TagButton";

const CategoryList = ({ categories }) => {
  return (
    <div className="max-w-[92%] mx-auto flex flex-col gap-6">
      {Object.entries(categories).map(([category, items]) => (
        <div key={category} className="w-full bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-center mb-4">{category}</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {items.map((item, index) => (
              <TagButton key={index} content={item.content} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
