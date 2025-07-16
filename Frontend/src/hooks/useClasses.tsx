import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const server_url = import.meta.env.VITE_API_URL;

const fetchClasses = async () => {
  const res = await fetch(`${server_url}/api/Class`);
  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content ?? []; 
};


const createClass = async ({ schoolId, newClass }: { schoolId: string; newClass: any }) => {
  const res = await fetch(`${server_url}/api/Class?schoolId=${schoolId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newClass),
  });
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};

const updateClass = async ({ schoolId, updatedClass }: { schoolId: string; updatedClass: any }) => {
  const res = await fetch(`${server_url}/api/Class/${updatedClass.id}?schoolId=${schoolId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedClass),
  });
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};

const removeClass = async ({ schoolId, id }: { schoolId: string; id: string }) => {
  const res = await fetch(`${server_url}/api/Class/${id}?schoolId=${schoolId}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};

export const useClasses = (schoolId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["classes", schoolId], // Include schoolId in queryKey
    queryFn: fetchClasses,
    
  });
 useEffect(() => {
  console.log("Classes Cache:", queryClient.getQueryData(["classes"]));
}, []);
  const addClass = useMutation({
    mutationFn: ({ newClass }: { newClass: any }) => createClass({ schoolId, newClass }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes", schoolId] });
    },
  });

  const editClass = useMutation({
    mutationFn: ({ updatedClass }: { updatedClass: any }) => updateClass({ schoolId, updatedClass }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes", schoolId] });
    },
  });

  const deleteClass = useMutation({
    mutationFn: ({ id }: { id: string }) => removeClass({ schoolId, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes", schoolId] });
    },
  });

  return {
    ...query,
    addClass: addClass.mutateAsync,
    editClass: editClass.mutateAsync,
    deleteClass: deleteClass.mutateAsync,
  };
};