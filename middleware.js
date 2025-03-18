// middleware.js (プロジェクトのルートディレクトリに配置)
export const config = {
  // すべてのパスに適用するか、必要なパスのみ指定
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

// Edge Runtimeを指定
export const runtime = "edge";

export default function middleware(request) {
  // 必要に応じてリクエストを処理
  // ここでは単にリクエストを通過させるだけ
  return;
}
