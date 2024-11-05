export interface Task {
  id: string;
  type: "kratki_tekst" | "dugi_tekst";
  title: string;
  description: string;
  createdAt: Date;
}

export type TaskCreateDTO = Omit<Task, "id" | "createdAt">;
