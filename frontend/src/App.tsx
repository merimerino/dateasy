import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/config";

import StudentLoginPage from "./pages/StudentLoginPage";
import ProfessorLoginPage from "./pages/ProfessorLoginPage";
import ProfessorTaskManagementPage from "./pages/ProfessorTaskManagementPage";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<StudentLoginPage />} />
            <Route path="/prof" element={<ProfessorLoginPage />} />

            {/* Protected Routes */}

            {/* Professor Task Management Routes */}
            <Route
              path="/room/:roomName/edit"
              element={
                <ProtectedRoute>
                  <ProfessorTaskManagementPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/room/:roomName/add-task"
              element={
                <ProtectedRoute>
                  <TaskForm mode="create" />
                </ProtectedRoute>
              }
            />

            <Route
              path="/room/:roomName/edit-task/:taskId"
              element={
                <ProtectedRoute>
                  <TaskForm mode="edit" />
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </I18nextProvider>
  );
}

export default App;
