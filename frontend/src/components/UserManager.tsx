import { useState } from "react";
import { userApi } from "@/lib/api/client";
import { UserForm } from "@/components/UserForm";
import type { UserResponse, UserCreateRequest } from "@/lib/api/schema/api_schemas";

export const UserManager: React.FC = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (userData: UserCreateRequest) => {
    try {
      setLoading(true);
      const newUser = await userApi.create(userData);
      setUsers((prev) => [...prev, newUser]);
      alert("ユーザーが作成されました");
    } catch (error) {
      alert("エラーが発生しました");
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ユーザー管理</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">新規ユーザー作成</h2>
        <UserForm onSubmit={handleCreateUser} isLoading={loading} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">登録済みユーザー</h2>
        {users.length === 0 ? (
          <p className="text-gray-500">まだユーザーが登録されていません。</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="border border-gray-200 p-4 rounded-lg"
              >
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-gray-600">
                  {user.email} · {user.age}歳 · {user.role === "admin" ? "管理者" : "ユーザー"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};