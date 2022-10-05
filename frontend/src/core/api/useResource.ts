import useSWR from "swr";
import { fetcher, FetcherArgs } from "./fetcher";

export function useMakeAPICall<T>(
  endpoint: string | null,
  args: FetcherArgs["args"] = {}
) {
  const {
    data: json,
    error,
    mutate,
  } = useSWR<T>({ endpoint, args }, fetcher, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
  });

  const refetch = async () => {
    // const data = await fetcher({ endpoint, args });
    mutate();
  };

  return {
    json,
    loading: !json,
    error,
    refetch,
  };
}
