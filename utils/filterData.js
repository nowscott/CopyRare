// utils/filterData.js
import _ from "lodash";
import pinyin from "pinyin";

export function filterData(data, searchTerm) {
  let filteredData = data;

  if (searchTerm) {
    // 使用 pinyin 将 searchTerm 转换为拼音，忽略空格
    const searchPinyin = pinyin(searchTerm, { style: pinyin.STYLE_NORMAL }).join("");

    // 使用 Lodash 的 _.filter 来过滤数据
    filteredData = _.filter(data, (item) => {
      // 将 content 和 keywords 转换为拼音
      const itemContentPinyin = pinyin(item.content, { style: pinyin.STYLE_NORMAL }).join("");
      const itemKeywordsPinyin = pinyin(item.keywords, { style: pinyin.STYLE_NORMAL }).join("");

      // 判断 searchTerm 是否出现在汉字或拼音中
      return (
        item.content.includes(searchTerm) ||
        item.keywords.includes(searchTerm) ||
        itemContentPinyin.includes(searchPinyin) ||
        itemKeywordsPinyin.includes(searchPinyin)
      );
    });
  }

  // 使用 Lodash 的 _.groupBy 按类别分组
  const categories = _.groupBy(filteredData, 'category');

  return categories;
}
