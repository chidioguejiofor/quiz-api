import axiosInstance from "./axiosInstance";

export type FetcherArgs = {
  endpoint: string | null;
  args: {
    urlArgs?: object;
    token?: string;
  };
};

export const fetcher = async ({ endpoint, args }: FetcherArgs) => {
  if (!endpoint) return null;
  const res = await axiosInstance.get(endpoint, {
    params: args.urlArgs,
    headers: {
      Authorization: `Bearer ${args.token}`,
    },
  });
  return res.data;
};
