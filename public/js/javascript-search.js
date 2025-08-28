(function () {
  let posts = [];

  function loadCSS() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/css/javascript-search.css";
    document.head.appendChild(link);
    console.log("CSS loaded");
  }

  async function loadPosts() {
    const res = await fetch("/data/search.json");
    const posts = await res.json();
    console.log("posts", posts);
    return posts;
  }

  // 検索バーでの初期化
  function initSearchBar() {
    loadCSS();

    const container = document.getElementById("javascript-search-container");
    if (!container) return;

    // 検索UIのHTML構造を動的生成
    container.innerHTML = `
        <div class="vanilla-search-form">
          <input type="text" id="search-input" placeholder="検索...">
          <button id="search-button-js" type="button">検索</button>
        </div>
        `;

    setupSearchBarEvents();
  }

  // 検索実行＆結果表示ページでの初期化
  async function initSearchPage() {
    loadCSS();

    // URLパラメータから検索クエリを取得
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");
    console.log("perform query:", query);
    console.log("取得したquery:", `"${query}"`);
    console.log("queryの長さ:", query.length);
    console.log("最初の文字コード:", query.charCodeAt(0)); // 32なら半角スペース

    const result = await loadPosts();
    posts = result;
    console.log("loadPosts完了時のposts:", posts.length);
    performSearch(posts, query);
  }

  // 検索ボタンを押した時点でリダイレクト
  function clickSearch() {
    const searchInput = document.getElementById("search-input");

    const query = searchInput.value.toLowerCase().trim();
    if (query) {
      // 検索結果ページにリダイレクト

      console.log("query", query);
      location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  }

  // 検索バーでのイベント設定
  function setupSearchBarEvents() {
    const searchButton = document.getElementById("search-button-js");

    // イベント設定
    if (searchButton) {
      searchButton.addEventListener("click", clickSearch);
    }
  }

  // 検索実行関数
  async function performSearch(posts, query) {
    console.log("=== performSearch開始 ===");
    console.log("posts配列:", posts);
    console.log("検索query:", query);

    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    console.log("filtered", filtered);

    const searchResults = document.getElementById("search-results-js");
    if (!searchResults) return;

    // 検索結果のHTML構造を動的生成
    const resultsHTML = filtered
      .map((post) => `<h3>${post.title}</h3>`)
      .join("");

    searchResults.innerHTML = `
        <div>
          <div id="search-results-js">${resultsHTML}</div>
        </div>
        `;
  }

  // DOMが完全に読み込まれてから実行
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initJavaScriptSearch);
  } else {
    //すでに読み込み済みの場合は即実行
    initSearchBar();
    initSearchPage();
  }
})();
