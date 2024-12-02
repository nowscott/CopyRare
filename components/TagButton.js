// components/TagButton.js
import React from "react";

const TagButton = ({ content, remark }) => {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(content)} // 复制到剪贴板
      className="py-2 px-4 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition"
      title={remark} // 鼠标悬浮时显示备注
    >
      {content}
    </button>
  );
};

export default TagButton;
