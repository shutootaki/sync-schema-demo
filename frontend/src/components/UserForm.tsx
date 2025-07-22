import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCreateRequest } from "@/lib/api/schema/api_schemas";

export const UserForm: React.FC<{
  onSubmit: (data: UserCreateRequest) => Promise<void>;
  isLoading: boolean;
}> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreateRequest>({
    resolver: zodResolver(UserCreateRequest),
    defaultValues: { role: "user" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          名前
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          placeholder="名前を入力してください"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          メールアドレス
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          placeholder="メールアドレスを入力してください"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium">
          年齢
        </label>
        <input
          {...register("age", { valueAsNumber: true })}
          type="number"
          id="age"
          placeholder="年齢を入力してください"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.age && (
          <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium">
          ロール
        </label>
        <select
          {...register("role")}
          id="role"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="user">ユーザー</option>
          <option value="admin">管理者</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? "作成中..." : "ユーザーを作成"}
      </button>
    </form>
  );
};
