import { JSDOM } from "jsdom";

// HTMLタグを安全に表示する関数
export const sanitizeHtml = (htmlString: string): string => {
  const { window } = new JSDOM();
  const { DOMParser } = window;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  return doc.body.innerHTML;
};

// 文字列を指定の文字数でカットする関数
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + "...";
};
