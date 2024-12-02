/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,  // 确保每个页面有一个后缀 "/"
  output: 'export',     // 指定为静态导出
  reactStrictMode: true, // 启用 React 严格模式
};
