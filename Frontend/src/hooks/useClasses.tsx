import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { log } from "console";
import { useEffect } from "react";

const server_url = import.meta.env.VITE_API_URL;
const schoolId = import.meta.env.VITE_SCHOOL_ID;

const fetchClasses = async () => {
  const res = await fetch(`${server_url}/api/Class`);
  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content ?? []; 
};


const createClass = async ({ newClass }: {newClass: any }) => {
  const payload = {
    ...newClass,
    schoolId
  }
  console.log(payload);
  
  const res = await fetch(`${server_url}/api/Class`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};

const updateClass = async ({ updatedClass }: { updatedClass: any }) => {
  console.log("Updating class with data:", updatedClass); 

  const res = await fetch(`${server_url}/api/Class/${updatedClass.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedClass),
  });
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};


const removeClass = async ({ id }: { id: string }) => {
  const res = await fetch(`${server_url}/api/Class/${id}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};

export const useClasses = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["classes"], 
    queryFn: fetchClasses,
    
  });

  const addClass = useMutation({
    mutationFn: ({ newClass }: { newClass: any }) => createClass({newClass }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });

  const editClass = useMutation({
    mutationFn: ({ updatedClass }: { updatedClass: any }) => updateClass({updatedClass}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });

  const deleteClass = useMutation({
    mutationFn: ({ id }: { id: string }) => removeClass({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });

  return {
    ...query,
    addClass: addClass.mutateAsync,
    editClass: editClass.mutateAsync,
    deleteClass: deleteClass.mutateAsync,
  };
};