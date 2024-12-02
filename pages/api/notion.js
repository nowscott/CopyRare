import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  const databaseId = process.env.NOTION_DATABASE_ID;

  try {
    const response = await notion.databases.query({ database_id: databaseId });
    const data = response.results
      .map((item) => ({
        category: item.properties["类别"]?.select?.name || null, // 类别必须存在
        content: item.properties["内容"]?.title?.[0]?.text?.content || null, // 内容必须存在
        remark: item.properties["备注"]?.rich_text?.[0]?.text?.content || "", // 备注可以为空
        keywords: item.properties["检索词"]?.rich_text?.[0]?.text?.content || "", // 检索词可以为空
      }))
      .filter((item) => item.category && item.content); // 过滤掉类别或内容为空的条目

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from Notion:", error);
    res.status(500).json({ error: error.message });
  }
}
