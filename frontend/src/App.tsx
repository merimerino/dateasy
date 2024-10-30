import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/config";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import AddTaskPage from "./pages/AddTaskPage";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ChakraProvider>
        <CSSReset />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/main" element={<LoginPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/addTask" element={<AddTaskPage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </I18nextProvider>
  );
}

export default App;
