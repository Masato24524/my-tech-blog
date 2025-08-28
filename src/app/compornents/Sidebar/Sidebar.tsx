import React from "react";
import Search from "../Search/Search";
import { Profile } from "../profile/Profile";
import Promotion from "../Promotion/Promotion";
import PopularArticles from "../PopularArticles/PopularArticles";
import { getPopularArticles } from "app/utils/popularArticles";
// import SearchJavascript from "../SearchJavascript/SearchJavascript";

const Sidebar = async ({ showPopularArticles = true }) => {
  let articles: any = [];

  // 人気記事を表示する場合のみAPIを呼び出し
  if (showPopularArticles) {
    articles = await getPopularArticles();
  }

  return (
    <div id="sidebar" className="flex flex-col w-full md:w-1/3 ml-8">
      {/* 検索欄の表示 */}
      <Search />
      {/* <SearchJavascript posts={posts} /> */}
      {/* プロフィール欄の表示 */}
      <Profile />
      {showPopularArticles && <PopularArticles articles={articles} />}
      <Promotion />
    </div>
  );
};

export default Sidebar;
