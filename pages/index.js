// pages/index.js
import MainPage from "../components/MainPage"; // 引入 MainPage 组件
import { fetchNotionData } from "../lib/fetchNotionData";

export default function Home({ data }) {
  return <MainPage data={data} />;
}

export async function getStaticProps() {
  const data = await fetchNotionData();

  return {
    props: {
      data,
    },
    revalidate: 1800,
  };
}
