import { useSession } from "next-auth/react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
};
export const useUser = (): [User | null, string] => {
  const { data, status } = useSession();

  let user = null;
  if (status === "authenticated" && data?.user) {
    const json = data.user as any;
    const userData = json.data;
    user = {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      token: json.accessToken,
    } as User;
  }

  return [user, status];
};
