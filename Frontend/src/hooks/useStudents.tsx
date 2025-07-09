import { useQuery } from "@tanstack/react-query";
const server_url = import.meta.env.VITE_API_URL;

const fetchData = async () => {
  const res = await fetch(`${server_url}/api/Student`);
  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};

export const useStudent = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: fetchData,
    staleTime: 60000,
    refetchOnWindowFocus: true,
    retry: 1,
  });
};
