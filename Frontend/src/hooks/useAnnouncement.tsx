import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


const server_url = import.meta.env.VITE_API_URL;
const schoolId = import.meta.env.VITE_SCHOOL_ID;

const fetchAnnouncement = async () => {
  const res = await fetch(`${server_url}/api/Announcement`);
  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  console.log(json.content);
  
  return json.content ?? []; 
};


export const useAnnouncement = () => {

  const query = useQuery({
    queryKey: ["announcements"], 
    queryFn: fetchAnnouncement,
    
  });

  return{
    ...query
  }
}