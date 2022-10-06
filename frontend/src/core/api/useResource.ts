import useSWR from "swr";
import { fetcher, FetcherArgs } from "./fetcher";

export function useMakeAPICall<T>(
  endpoint: string | null,
  args: FetcherArgs["args"] = {},
  revalidate = false
) {
  const {
    data: json,
    error,
    mutate,
  } = useSWR<T>({ endpoint, args }, fetcher, {
    revalidateOnMount: revalidate,
    revalidateOnFocus: false,
  });

  const refetch = async () => {
    mutate();
  };

  return {
    json,
    loading: !json,
    error,
    refetch,
  };
}
