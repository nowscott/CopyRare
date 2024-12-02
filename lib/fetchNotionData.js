// lib/fetchNotionData.js
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';  // 引入 uuid 库

const notionApiKey = process.env.NOTION_API_KEY;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

export const fetchNotionData = async () => {
  const url = `https://api.notion.com/v1/databases/${notionDatabaseId}/query`;

  const headers = {
    "Authorization": `Bearer ${notionApiKey}`,
    "Content-Type": "application/json",
    "Notion-Version": "2021-08-16",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        page_size: 100,
      }),
    });

    const data = await response.json();

    // 为每一条数据添加唯一的 id
    const formattedData = data.results.map((page) => {
      const status = page.properties["状态"]?.select?.name || ""; // 获取状态
      const category = page.properties["类别"]?.select?.name || ""; // 获取类别
      const content = page.properties["内容"]?.title[0]?.text?.content || ""; // 获取内容
      const remark = page.properties["备注"]?.rich_text[0]?.text?.content || ""; // 获取备注
      const keywords = page.properties["检索词"]?.rich_text[0]?.text?.content || ""; // 获取检索词

      return {
        id: uuidv4(), // 为每条数据添加一个唯一的 id
        category,
        content,
        remark,
        keywords,
        status, // 添加状态
      };
    });

    // 筛选出状态、类别、内容和备注都不为空的数据
    const filteredData = formattedData.filter((item) => 
      item.status !== "" && item.category !== "" && item.content !== "" && item.remark !== ""
    );

    // 排序
    const sortedData = filteredData.sort((a, b) => a.content.localeCompare(b.content));

    return sortedData;
  } catch (error) {
    console.error("Failed to fetch Notion data", error);
    return [];
  }
};
