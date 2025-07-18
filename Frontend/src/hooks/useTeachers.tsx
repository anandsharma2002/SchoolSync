import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const server_url = import.meta.env.VITE_API_URL;
const schoolId = import.meta.env.VITE_SCHOOL_ID;

const fetchTeachers = async () => {
  const res = await fetch(`${server_url}/api/Teacher`);
  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  console.log(json.content);
  return json.content ?? [];
};

const createTeacher = async ({ newTeacher }: { newTeacher: any }) => {
  const payload = {
    ...newTeacher,
    schoolId,
  };
  const res = await fetch(`${server_url}/api/Teacher`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};

const updateTeacher = async ({ updatedTeacher }: { updatedTeacher: any }) => {
  console.log(updatedTeacher);

  const res = await fetch(`${server_url}/api/Teacher/${updatedTeacher.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTeacher),
  });
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};

const removeTeacher = async ({ id }: { id: string }) => {
  const res = await fetch(`${server_url}/api/Teacher/${id}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};

export const useTeachers = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
    staleTime: 60000,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  const addTeacher = useMutation({
    mutationFn: ({ newTeacher }: { newTeacher: any }) =>
      createTeacher({ newTeacher }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });

  const editTeacher = useMutation({
    mutationFn: ({ updatedTeacher }: { updatedTeacher: any }) =>
      updateTeacher({ updatedTeacher }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });

  const deleteTeacher = useMutation({
    mutationFn: ({ id }: { id: string }) => removeTeacher({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });

  return {
    ...query,
    addTeacher: addTeacher.mutateAsync,
    editTeacher: editTeacher.mutateAsync,
    deleteTeacher: deleteTeacher.mutateAsync,
  };
};
