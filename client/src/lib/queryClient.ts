import { QueryClient } from "@tanstack/react-query";

async function handleResponse(response: Response) {
  const text = await response.text();
  
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = text;
  }

  if (!response.ok) {
    const errorMessage =
      typeof data === "object" && data?.message
        ? data.message
        : typeof data === "string"
        ? data
        : response.statusText || `HTTP error! status: ${response.status}`;
    throw new Error(errorMessage);
  }

  return data;
}

async function fetchFn(url: string) {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    headers,
    credentials: "include",
  });

  return handleResponse(response);
}

export async function apiRequest(
  method: string,
  url: string,
  data?: any
): Promise<any> {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
    credentials: "include",
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  return handleResponse(response);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = queryKey[0] as string;
        return fetchFn(url);
      },
      staleTime: 1000 * 60,
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});
