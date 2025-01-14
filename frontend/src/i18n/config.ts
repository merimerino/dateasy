import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      respondent: "Response",
      forProfessors: "For professors",
      forStudents: "For students",
      createRoom: "Create Room",
      joinRoom: "Join Room",
      roomName: "Room Name",
      password: "Password",
      username: "Nickname",
      enterRoomName: "Enter room name",
      enterPassword: "Enter password",
      enterUsername: "Enter your nickname",
      noTasksAvailable: "No tasks available",
      checkBackLater: "Check back later for new tasks",
      enterText: "Enter your answer",
      answers: "Answers",
      characters: "characters",
      numberBetween: "Enter a number between",
      and: "and",
      selectLocation: "Select location",
      taskSubmitted: "Task submitted successfully",
      errorSubmittingTask: "Error submitting task",
      unknownError: "An unknown error occurred",
      tasksList: "Tasks List",
      addNewTask: "Add New Task",
      present: "Present",
      noTasksYet: "No tasks created yet",
      anonymous: "Anonymous",
      showUsernames: "Show Usernames",
      clickAddToCreate:
        "Click the Add New Task button to create your first task",
      editTask: "Edit Task",
      deleteTask: "Delete Task",
      createTask: "Create Task",
      saveChanges: "Save Changes",
      saving: "Saving...",
      taskType: "Task Type",
      taskName: "Task Name",
      taskText: "Task Description",
      maxCharacters: "Maximum Characters",
      minNumber: "Minimum Number",
      maxNumber: "Maximum Number",
      multipleAnswers: "Allow Multiple Answers",
      options: "Options",
      addOption: "Add Option",
      removeOption: "Remove Option",
      option: "Option",
      numberOfRows: "Number of Rows",
      tableHeaders: "Table Headers",
      addHeader: "Add Header",
      removeHeader: "Remove Header",
      header: "Header",
      defaultZoom: "Default Zoom Level",
      defaultLatitude: "Default Latitude",
      defaultLongitude: "Default Longitude",
      cancel: "Cancel",
      save: "Save",
      answerLocations: "Answer Locations ({{count}} responses)",
      user: "User",
      latitude: "Latitude",
      longitude: "Longitude",
      coordinate: "Coordinate",
      pieDistribution: "Distribution (Pie)",
      barDistribution: "Distribution (Bar)",
      statistics: "Statistics",
      average: "Average",
      median: "Median",
      min: "Min",
      max: "Max",
      submitAllAnswers: "Submit All Answers",
      submissionSuccessful: "Successfuly submitted all answers",
      numberOfAnswers: "Number of Answers",
      distributionOfAnswers: "Distribution of Answers",
      wordCloudAnswers: "Word Cloud of Answers",
      allAnswers: "All answers",
      analysis: "Analysis",
      answer: "Answer",
      charts: {
        user: "User",
        row: "Row",
        statistics: "Statistics",
        allData: "All data",
        column: "Column",
        average: "Average",
        min: "Minimum",
        max: "Maximum",
        count: "Count",
        columnStatistics: "Column statistics",
        averageValues: "Average values",
      },
      taskTypes: {
        multichoice: "Multiple Choice",
        numbers_task: "Number Task",
        short_task: "Short Answer",
        table_task: "Table Task",
        map_task: "Map Task",
        description: "Description",
      },
      noAnswersYet: "No answers yet.",

      error: {
        roomRequired: "Room name is required",
        passwordRequired: "Password is required",
        usernameRequired: "Nickname is required",
        usernameTaken: "Nickname already taken in this room",
        failedToJoin: "Failed to join room",
        failedToCreate: "Failed to create room",
        failedLogin: "Room name or password is incorrect",

        invalidCredentials: "Invalid credentials",
        roomNotFound: "Room not found",
        serverError: "Server error occurred",
        failedRequest: "Failed to process request",
        invalidPassword: "Invalid password",
        roomAlreadyExists: "Room already exists",
        userNotFound: "User not found",
        unauthorized: "Unauthorized access",
        connectionError: "Connection error, please try again",
        nameRequired: "Task name is required",
        textRequired: "Task description is required",
        minimumTwoOptions: "At least two options are required",
        emptyOptions: "Options cannot be empty",
        maxGreaterThanMin: "Maximum must be greater than minimum",
        headersRequired: "At least one header is required",
        emptyHeaders: "Headers cannot be empty",
        validationFailed: "Please check the form for errors",
        pleaseLogin: "Please log in to access this page",
        accessDenied: "Access Denied",
        insufficientPermissions:
          "You don't have permission to access this page",
        sessionExpired: "Your session has expired",
        pleaseLoginAgain: "Please log in again",
      },

      success: {
        roomCreated: "Room created successfully",
        joinedRoom: "Joined room successfully",
        taskSubmitted: "Task submitted successfully",
        taskSaved: "Task saved successfully",
      },
      nameRequired: "Task name is required",
      textRequired: "Task description is required",
      minimumTwoOptions: "At least two options are required",
      emptyOptions: "Options cannot be empty",
      duplicateOptions: "Options must be unique",
      invalidMinNumber: "Invalid minimum number",
      invalidMaxNumber: "Invalid maximum number",
      maxGreaterThanMin: "Maximum must be greater than minimum",
      invalidMaxCharacters: "Invalid maximum characters",
      maxCharactersTooLarge: "Maximum characters cannot exceed 1000",
      headersRequired: "At least one header is required",
      emptyHeaders: "Headers cannot be empty",
      duplicateHeaders: "Headers must be unique",
      invalidRows: "Invalid number of rows",
      invalidColumns: "Invalid number of columns",
      invalidLatitude: "Latitude must be between -90 and 90",
      invalidLongitude: "Longitude must be between -180 and 180",
      invalidZoomLevel: "Zoom level must be between 1 and 20",
      invalidNumber: "Please enter a valid number",
      columnStatistics: "Column Statistics",
      column: "Column",
      count: "Count",
      averageValue: "Average Value",
      minValue: "Min Value",
      maxValue: "Max Value",
      valueTrends: "Value Trends",
      rawAnswers: "Raw Answers",
    },
  },
  hr: {
    translation: {
      respondent: "Odgovor",
      forProfessors: "Za profesore",
      forStudents: "Za učenike",
      createRoom: "Stvori sobu",
      joinRoom: "Uđi u sobu",
      roomName: "Naziv sobe",
      password: "Lozinka",
      username: "Nadimak",
      anonymous: "Anonimni odgovori",
      showUsernames: "Pokaži nadimke",
      enterRoomName: "Unesite naziv sobe",
      enterPassword: "Unesite lozinku",
      enterUsername: "Unesite svoj nadimak",
      noTasksAvailable: "Nema dostupnih zadataka",
      checkBackLater: "Provjerite kasnije za nove zadatke",
      enterText: "Unesite svoj odgovor",
      answers: "Odgovori",
      characters: "znakova",
      numberBetween: "Unesite broj između",
      and: "i",
      selectLocation: "Odaberite lokaciju",
      taskSubmitted: "Zadatak uspješno predan",
      errorSubmittingTask: "Greška pri predaji zadatka",
      unknownError: "Došlo je do nepoznate greške",
      taskType: "Vrsta zadatka",
      shortText: "Kratki tekst",
      longText: "Dugi tekst",
      taskTitle: "Naziv zadatka",
      taskDescription: "Tekst zadatka",
      save: "Spremi",
      cancel: "Odustani",
      tasksList: "Popis zadataka",
      addNewTask: "Dodaj novi zadatak",
      present: "Prezentiraj",
      noTasksYet: "Još nema zadataka",
      clickAddToCreate:
        "Kliknite gumb Dodaj novi zadatak za stvaranje prvog zadatka",
      editTask: "Uredi zadatak",
      deleteTask: "Izbriši zadatak",
      createTask: "Stvori zadatak",
      saveChanges: "Spremi promjene",
      saving: "Spremanje...",
      taskName: "Naziv zadatka",
      taskText: "Opis zadatka",
      maxCharacters: "Maksimalan broj znakova",
      minNumber: "Minimalni broj",
      maxNumber: "Maksimalni broj",
      multipleAnswers: "Dozvoli više odgovora",
      options: "Opcije",
      addOption: "Dodaj opciju",
      removeOption: "Ukloni opciju",
      option: "Opcija",
      numberOfRows: "Broj redova",
      tableHeaders: "Zaglavlja tablice",
      addHeader: "Dodaj zaglavlje",
      removeHeader: "Ukloni zaglavlje",
      header: "Zaglavlje",
      defaultZoom: "Zadana razina zumiranja",
      defaultLatitude: "Zadana širina",
      defaultLongitude: "Zadana dužina",
      nameRequired: "Naziv zadatka je obavezan",
      textRequired: "Opis zadatka je obavezan",
      minimumTwoOptions: "Potrebne su barem dvije opcije",
      emptyOptions: "Opcije ne mogu biti prazne",
      duplicateOptions: "Opcije moraju biti jedinstvene",
      invalidMinNumber: "Nevažeći minimalni broj",
      invalidMaxNumber: "Nevažeći maksimalni broj",
      maxGreaterThanMin: "Maksimum mora biti veći od minimuma",
      invalidMaxCharacters: "Nevažeći maksimalni broj znakova",
      maxCharactersTooLarge:
        "Maksimalni broj znakova ne može biti veći od 1000",
      headersRequired: "Potrebno je barem jedno zaglavlje",
      emptyHeaders: "Zaglavlja ne mogu biti prazna",
      duplicateHeaders: "Zaglavlja moraju biti jedinstvena",
      invalidRows: "Nevažeći broj redova",
      invalidColumns: "Nevažeći broj stupaca",
      invalidLatitude: "Širina mora biti između -90 i 90",
      invalidLongitude: "Dužina mora biti između -180 i 180",
      invalidZoomLevel: "Razina zumiranja mora biti između 1 i 20",
      invalidNumber: "Unesite važeći broj",
      answerLocations: "Oznake na karti ({{count}} odgovora)",
      user: "Korisnik",
      latitude: "Dužina",
      longitude: "Širina",
      coordinate: "Koordinata",
      pieDistribution: "Distribucija (Kružna)",
      barDistribution: "Distribucija (Stupčasta)",
      statistics: "Statistika",
      average: "Prosjek",
      median: "Medijan",
      min: "Min",
      max: "Max",
      numberOfAnswers: "Broj odgovora",
      distributionOfAnswers: "Distribucija odgovora",
      wordCloudAnswers: "Oblak riječi iz odgovora",
      allAnswers: "Svi odgovori",
      analysis: "Analiza",
      answer: "Odgovor",
      wordAppears: "{{word}} se pojavljuje {{count}} puta",
      columnStatistics: "Statistika stupaca",
      column: "Stupac",
      submitAllAnswers: "Predaj sve odgovore",
      count: "Broj",
      averageValue: "Prosječna vrijednost",
      minValue: "Minimalna vrijednost",
      maxValue: "Maksimalna vrijednost",
      valueTrends: "Trendovi vrijednosti",
      rawAnswers: "Izvorni odgovori",
      submissionSuccessful: "Uspješno predani svi odgovori",

      charts: {
        user: "Korisnik",
        row: "Redak",
        statistics: "Statistika",
        all: "Svi podatci",
        column: "Stupac",
        average: "Prosjek",
        min: "Minimum",
        max: "Maksimum",
        count: "Količina",
        columnStatistics: "Statistika po stupcima",
        averageValues: "Prosječne vrijednosti",
      },
      taskTypes: {
        multichoice: "Višestruki izbor",
        numbers_task: "Numerički zadatak",
        short_task: "Kratki odgovor",
        table_task: "Tablični zadatak",
        map_task: "Zadatak s kartom",
        description: "Opis",
      },
      noAnswersYet: "Još nema odgovora",

      error: {
        roomRequired: "Naziv sobe je obavezan",
        passwordRequired: "Lozinka je obavezna",
        usernameRequired: "Nadimak je obavezan",
        usernameTaken: "Nadimak je već zauzet u ovoj sobi",
        failedToJoin: "Neuspješan ulazak u sobu",
        failedLogin: "Naziv sobe ili lozinka nisu točni",
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
        nameRequired: "Naziv zadatka je obavezan",
        textRequired: "Opis zadatka je obavezan",
        minimumTwoOptions: "Potrebne su barem dvije opcije",
        emptyOptions: "Opcije ne mogu biti prazne",
        maxGreaterThanMin: "Maksimum mora biti veći od minimuma",
        headersRequired: "Potrebno je barem jedno zaglavlje",
        emptyHeaders: "Zaglavlja ne mogu biti prazna",
        validationFailed: "Molimo provjerite obrazac za greške",
        pleaseLogin: "Prijavite se za pristup ovoj stranici",
        accessDenied: "Pristup zabranjen",
        insufficientPermissions:
          "Nemate potrebne ovlasti za pristup ovoj stranici",
        sessionExpired: "Vaša sesija je istekla",
        pleaseLoginAgain: "Molimo prijavite se ponovno",
      },

      success: {
        roomCreated: "Soba uspješno stvorena",
        joinedRoom: "Uspješno ste ušli u sobu",
        taskSubmitted: "Zadatak uspješno predan",
        taskSaved: "Zadatak uspješno spremljen",
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
