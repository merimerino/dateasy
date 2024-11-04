export const ROUTES = {
  HOME: "/",
  PROFESSOR_LOGIN: "/professor",
  MAIN: "/main",
  ADD_TASK: "/addTask",
} as const;

export const getHomeRouteForRole = (
  role: "professor" | "student" | null
): string => {
  switch (role) {
    case "professor":
      return ROUTES.MAIN;
    case "student":
      return ROUTES.MAIN;
    default:
      return ROUTES.HOME;
  }
};
