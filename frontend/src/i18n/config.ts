// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      createRoom: "Create Room",
      joinRoom: "Join Room",
      roomName: "Room Name",
      password: "Password",
    },
  },
  hr: {
    translation: {
      createRoom: "Stvori sobu",
      joinRoom: "Udi u sobu",
      roomName: "Naziv sobe",
      password: "Lozinka",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "hr", // default language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
