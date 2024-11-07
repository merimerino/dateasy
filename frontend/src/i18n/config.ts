import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      createRoom: "Create Room",
      joinRoom: "Join Room",
      roomName: "Room Name",
      password: "Password",
      username: "Nickname",
      enterRoomName: "Enter room name",
      enterPassword: "Enter password",
      enterUsername: "Enter your nickname",
      error: {
        roomRequired: "Room name is required",
        passwordRequired: "Password is required",
        usernameRequired: "Nickname is required",
        usernameTaken: "Nickname already taken in this room",
        failedToJoin: "Failed to join room",
        failedToCreate: "Failed to create room",
        invalidCredentials: "Invalid credentials",
        roomNotFound: "Room not found",
        serverError: "Server error occurred",
        failedRequest: "Failed to process request",
        invalidPassword: "Invalid password",
        roomAlreadyExists: "Room already exists",
        userNotFound: "User not found",
        unauthorized: "Unauthorized access",
        connectionError: "Connection error, please try again",
      },
      success: {
        roomCreated: "Room created successfully",
        joinedRoom: "Joined room successfully",
      },
    },
  },
  hr: {
    translation: {
      createRoom: "Stvori sobu",
      joinRoom: "Uđi u sobu",
      roomName: "Naziv sobe",
      password: "Lozinka",
      username: "Nadimak",
      enterRoomName: "Unesite naziv sobe",
      enterPassword: "Unesite lozinku",
      enterUsername: "Unesite svoj nadimak",
      taskType: "Tip zadatka",
      shortText: "Kratki tekst",
      longText: "Dugi tekst",
      taskTitle: "Naziv zadatka",
      taskDescription: "Tekst zadatka",
      save: "Spremi",
      cancel: "Odustani",
      error: {
        roomRequired: "Naziv sobe je obavezan",
        passwordRequired: "Lozinka je obavezna",
        usernameRequired: "Nadimak je obavezan",
        usernameTaken: "Nadimak je već zauzet u ovoj sobi",
        failedToJoin: "Neuspješan ulazak u sobu",
        failedToCreate: "Neuspješno stvaranje sobe",
        invalidCredentials: "Nevažeći podaci za prijavu",
        roomNotFound: "Soba nije pronađena",
        serverError: "Došlo je do pogreške na poslužitelju",
        failedRequest: "Neuspješan zahtjev",
        invalidPassword: "Nevažeća lozinka",
        roomAlreadyExists: "Soba već postoji",
        userNotFound: "Korisnik nije pronađen",
        unauthorized: "Neovlašten pristup",
        connectionError: "Greška u povezivanju, molimo pokušajte ponovno",
      },
      success: {
        roomCreated: "Soba uspješno stvorena",
        joinedRoom: "Uspješno ste ušli u sobu",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "hr", // default language
  fallbackLng: "en", // use en if hr key is missing
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
