// pages/index.js
import { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import CategoryList from "../components/CategoryList";

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // 获取 Notion 数据
    fetch("/api/notion")
      .then((res) => res.json())
      .then((data) => {
        // 按字符编码升序排序
        const sortedData = data.sort((a, b) => a.content.localeCompare(b.content));
        setData(sortedData);
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredData(
        data.filter(
          (item) =>
            item.content.includes(searchTerm) ||
            item.keywords.includes(searchTerm)
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [searchTerm, data]);

  // 按类别分组
  const categories = filteredData.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-center text-3xl font-bold text-black mb-6">Copy Rare</h1>
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CategoryList categories={categories} />
    </div>
  );
}
