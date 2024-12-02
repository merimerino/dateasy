import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/config";

import StudentLoginPage from "./pages/StudentLoginPage";
import ProfessorLoginPage from "./pages/ProfessorLoginPage";
import ProfessorTaskManagementPage from "./pages/ProfessorTaskManagementPage";
import StudentRoomViewPage from "./pages/StudentRoomViewPage";
import TaskViewPage from "./pages/TaskViewPage";
import ProtectedRoute from "./modules/ProtectedRoute";

import AddTaskPage from "./pages/AddTaskPage";
import EditTaskPage from "./pages/EditTaskPage";
import { UserProvider } from "./contexts/UserProvider";

//

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ChakraProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<StudentLoginPage />} />
              <Route path="/prof" element={<ProfessorLoginPage />} />

              {/* Professor Routes */}
              <Route
                path="/room/:roomName/edit"
                element={
                  <ProtectedRoute allowedRoles={["professor"]}>
                    <ProfessorTaskManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/room/:roomName/view/:orderNumber"
                element={
                  <ProtectedRoute allowedRoles={["professor"]}>
                    <TaskViewPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/room/:roomName/add-task"
                element={
                  <ProtectedRoute allowedRoles={["professor"]}>
                    <AddTaskPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/room/:roomName/edit-task/:orderNumber"
                element={
                  <ProtectedRoute allowedRoles={["professor"]}>
                    <EditTaskPage />
                  </ProtectedRoute>
                }
              />

              {/* Student Routes */}
              <Route
                path="/room/:roomName/view"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <StudentRoomViewPage />
                  </ProtectedRoute>
                }
              />

              {/* Redirect unauthorized access */}
              <Route
                path="/room/:roomName/*"
                element={<Navigate to="/" replace />}
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </ChakraProvider>
    </I18nextProvider>
  );
}

export default App;
