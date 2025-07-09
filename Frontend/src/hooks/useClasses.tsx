import { useQuery } from "@tanstack/react-query";
const server_url = import.meta.env.VITE_API_URL;
const fetchClasses = async () => {
  console.log(`${server_url}/api/Class`);
  const res = await fetch(`${server_url}/api/Class`);
  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};

export const useClasses = () => {
  return useQuery({
    queryKey: ["classes"],
    queryFn: fetchClasses,
    staleTime: 60000,
    refetchOnWindowFocus: true,
    retry: 1,
  });
};
