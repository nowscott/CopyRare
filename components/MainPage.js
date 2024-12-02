// components/MainPage.js
import { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import CategoryList from "./CategoryList";
import { filterData } from "../utils/filterData"; // 引入 Lodash 处理的函数

const MainPage = ({ data }) => {
  const [filteredData, setFilteredData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const categories = filterData(data, searchTerm);
    setFilteredData(categories);
  }, [searchTerm, data]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <header className="mb-6">
        <h1 className="text-center text-3xl font-bold text-black">
          <a
            href="https://github.com/nowscott/CopyRare"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            Copy Rare
          </a>
        </h1>
      </header>
      
      <main className="flex-grow">
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CategoryList categories={filteredData} />
      </main>

      {/* Footer 部分 */}
      <footer className="text-black p-6 mt-8 text-center">
        <a
          href="https://nowscott.notion.site/150f941cf9b880ffa459fbf44dd9feb4?pvs=105"
          className="text-sm hover:text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          投稿链接
        </a>
        <p className="text-sm mb-2">Copyright © 2024 - NowScott</p>
      </footer>
    </div>
  );
};

export default MainPage;
