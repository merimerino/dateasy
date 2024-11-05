import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/config";

import StudentLoginPage from "./pages/StudentLoginPage";
import ProfessorLoginPage from "./pages/ProfessorLoginPage";
import RoomEditPage from "./pages/RoomEditPage";
import RoomViewPage from "./pages/RoomViewPage";
import AddTaskPage from "./pages/AddTaskPage";
import ProtectedRoute from "./components/ProtectedRoute";

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
            <Route
              path="/room/:roomName/edit"
              element={
                <ProtectedRoute>
                  <RoomEditPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/room/:roomName/view"
              element={
                <ProtectedRoute>
                  <RoomViewPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/room/:roomName/addTask"
              element={
                <ProtectedRoute>
                  <AddTaskPage />
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
