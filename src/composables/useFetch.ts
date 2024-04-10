// import useToken from "@/composables/useToken";
export const useFetch = () => {
  // const {token, username: userName} = useToken();
  async function fetchBase<T>(
    url: string,
    method: string,
    headers: Record<string, string> = {},
    body?: BodyInit | null,
    signal?: AbortSignal | null
  ): Promise<T> {
    const options: RequestInit = {
      method,
      headers: Object.assign(headers, {
        "X-Auth-Token": "token.value",
        "Content-type": "application/json",
      }),
      body,
      signal,
    };
    const resp = await fetch(url, options);
    if (resp.status < 400) {
      return resp.json();
    }

    throw new Error(`Failed to fetch. Error status: ${resp?.status}`);
  }

  return {
    fetchBase,
  };
}
