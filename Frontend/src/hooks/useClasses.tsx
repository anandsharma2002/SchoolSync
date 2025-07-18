import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
<<<<<<< HEAD
import { log } from "console";
import { useEffect } from "react";
=======
>>>>>>> c81bde9900f0454065b56c5fd5582dc641d9076e

const server_url = import.meta.env.VITE_API_URL;
const schoolId = import.meta.env.VITE_SCHOOL_ID;

const fetchClasses = async () => {
  const res = await fetch(`${server_url}/api/Class`);
  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};

<<<<<<< HEAD

const createClass = async ({ newClass }: {newClass: any }) => {
  const payload = {
    ...newClass,
    schoolId
  }
  console.log(payload);
  
=======
const createClass = async (newClass) => {
>>>>>>> c81bde9900f0454065b56c5fd5582dc641d9076e
  const res = await fetch(`${server_url}/api/Class`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};

<<<<<<< HEAD
const updateClass = async ({ updatedClass }: { updatedClass: any }) => {
  console.log("Updating class with data:", updatedClass); 

=======
const updateClass = async (updatedClass) => {
>>>>>>> c81bde9900f0454065b56c5fd5582dc641d9076e
  const res = await fetch(`${server_url}/api/Class/${updatedClass.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedClass),
  });
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};

<<<<<<< HEAD

const removeClass = async ({ id }: { id: string }) => {
=======
const removeClass = async (id) => {
>>>>>>> c81bde9900f0454065b56c5fd5582dc641d9076e
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
<<<<<<< HEAD
    queryKey: ["classes"], 
=======
    queryKey: ["classes"],
>>>>>>> c81bde9900f0454065b56c5fd5582dc641d9076e
    queryFn: fetchClasses,
    staleTime: 60000,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  const addClass = useMutation({
<<<<<<< HEAD
    mutationFn: ({ newClass }: { newClass: any }) => createClass({newClass }),
=======
    mutationFn: createClass,
>>>>>>> c81bde9900f0454065b56c5fd5582dc641d9076e
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });

  const editClass = useMutation({
<<<<<<< HEAD
    mutationFn: ({ updatedClass }: { updatedClass: any }) => updateClass({updatedClass}),
=======
    mutationFn: updateClass,
>>>>>>> c81bde9900f0454065b56c5fd5582dc641d9076e
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });

  const deleteClass = useMutation({
<<<<<<< HEAD
    mutationFn: ({ id }: { id: string }) => removeClass({ id }),
=======
    mutationFn: removeClass,
>>>>>>> c81bde9900f0454065b56c5fd5582dc641d9076e
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
