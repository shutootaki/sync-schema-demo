# Schema Sync Demo

FastAPI + Pydantic + Zod + openapi-zod-client を使用した API の型とバリデーションルール一元管理のデモプロジェクトです。

## プロジェクト構成

```
.
├── backend/                 # FastAPI バックエンド
│   ├── app/
│   │   ├── models/         # Pydantic モデル
│   │   ├── routers/        # FastAPI ルーター
│   │   └── main.py         # メインアプリケーション
│   └── pyproject.toml      # Poetry 設定
└── frontend/               # React フロントエンド
    ├── src/
    │   ├── components/     # React コンポーネント
    │   └── lib/api/        # API クライアント
    ├── package.json        # npm 設定
    └── schema-format.hbs   # openapi-zod-client テンプレート
```

## セットアップ手順

### バックエンド（FastAPI）

1. 依存関係のインストール

```bash
cd backend
poetry install --no-root
```

2. サーバーの起動

```bash
poetry run uvicorn app.main:app --reload
```

サーバーは http://localhost:8000 で起動します。

### フロントエンド（React）

1. 依存関係のインストール

```bash
cd frontend
pnpm install
```

2. スキーマの生成（バックエンドが起動中に実行）

```bash
pnpm codegen
```

3. 開発サーバーの起動

```bash
pnpm dev
```

フロントエンドは http://localhost:5173 で起動します。

## 主要ファイル

### バックエンド

- `backend/app/models/user.py`: Pydantic モデル定義
- `backend/app/routers/users.py`: FastAPI ルーター
- `backend/app/main.py`: メインアプリケーション設定

### フロントエンド

- `frontend/src/components/UserForm.tsx`: React Hook Form 連携コンポーネント
- `frontend/src/lib/api/client.ts`: 型安全な API クライアント
- `frontend/schema-format.hbs`: openapi-zod-client テンプレート

## 使用技術

### バックエンド

- FastAPI: Python Web フレームワーク
- Pydantic: データ検証とシリアライゼーション
- Poetry: Python パッケージ管理

### フロントエンド

- React: UI ライブラリ
- TypeScript: 型安全性の確保
- Zod: スキーマ検証ライブラリ
- React Hook Form: フォーム管理
- openapi-zod-client: OpenAPI から Zod スキーマ生成
- Tailwind CSS: スタイリング
- Vite: ビルドツール

## 開発フロー

1. バックエンドで Pydantic モデルを定義・変更
2. FastAPI が OpenAPI スキーマを自動生成
3. フロントエンドで `pnpm codegen` を実行
4. Zod スキーマが自動生成され、型安全性が確保される

このフローにより、型の不整合を早期に検知し、バリデーションロジックの二重実装を回避できます。
