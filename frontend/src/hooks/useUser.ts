import { useSession } from "next-auth/react";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
};
export const useUser = (): [User | null, string] => {
  const { data, status } = useSession();

  let user = null;
  if (data?.user) {
    const userData = (data.user as any).data;
    user = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      token: userData.accessToken,
    } as User;
  }

  return [user, status];
};
