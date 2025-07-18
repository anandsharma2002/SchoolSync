import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const server_url = import.meta.env.VITE_API_URL;
const schoolId = import.meta.env.VITE_SCHOOL_ID;

// Fetch all students
const fetchStudents = async () => {
  const res = await fetch(`${server_url}/api/Student`);
  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content ?? [];
};

// Create a student
const createStudent = async ({ newStudent }: { newStudent: any }) => {
  const payload = {
    ...newStudent,
    schoolId,
  };

  const res = await fetch(`${server_url}/api/Student`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  console.log("createStudent response:", json);

  if (!json.isSuccess) throw new Error(json.errorMessage);

  return json.content;
};



const updateStudent = async ({ updatedStudent }: { updatedStudent: any }) => {
  const res = await fetch(`${server_url}/api/Student/${updatedStudent.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedStudent),
  });
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};
 
const removeStudent = async ({ id }: { id: string }) => {
  const res = await fetch(`${server_url}/api/Student/${id}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.errorMessage);
  return json.content;
};

export const useStudents = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
    staleTime: 60000,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  const addStudent = useMutation({
    mutationFn: ({ newStudent }: { newStudent: any }) => createStudent({ newStudent }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  const editStudent = useMutation({
    mutationFn: ({ updatedStudent }: { updatedStudent: any }) => updateStudent({ updatedStudent }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  const deleteStudent = useMutation({
    mutationFn: ({ id }: { id: string }) => removeStudent({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  return {
    ...query,
    addStudent: addStudent.mutateAsync,
    editStudent: editStudent.mutateAsync,
    deleteStudent: deleteStudent.mutateAsync,
  };
};
