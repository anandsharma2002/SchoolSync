import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const server_url = import.meta.env.VITE_API_URL;

const fetchClasses = async () => {
  const res = await fetch(`${server_url}/api/Class`);
  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};

const createClass = async (newClass) => {
  const res = await fetch(`${server_url}/api/Class`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newClass),
  });
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};

const updateClass = async (updatedClass) => {
  const res = await fetch(`${server_url}/api/Class/${updatedClass.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedClass),
  });
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};

const removeClass = async (id) => {
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
    staleTime: 60000,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  const addClass = useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });

  const editClass = useMutation({
    mutationFn: updateClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });

  const deleteClass = useMutation({
    mutationFn: removeClass,
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
