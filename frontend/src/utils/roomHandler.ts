import i18next from "i18next";

interface RoomCredentials {
  room_name: string;
  password?: string;
  username?: string;
}

interface ApiResponse {
  token: string;
}

class RoomHandler {
  private baseUrl = "http://localhost:3000";

  private async handleRequest(
    endpoint: string,
    credentials: RoomCredentials,
    isProfessor: boolean
  ): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.text();
        try {
          const parsedError = JSON.parse(error);
          const errorKey = this.getErrorTranslationKey(parsedError.error);
          throw new Error(i18next.t(errorKey));
        } catch {
          throw new Error(i18next.t("error.failedToJoin"));
        }
      }

      const data: ApiResponse = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("roomName", credentials.room_name);
      localStorage.setItem("isProfessor", String(isProfessor));

      if (credentials.username) {
        localStorage.setItem("username", credentials.username);
      }
    } catch (error) {
      this.logout();
      throw error;
    }
  }

  private getErrorTranslationKey(apiError: string): string {
    // Map API error messages to translation keys
    const errorMap: { [key: string]: string } = {
      "Username already taken in this room": "error.usernameTaken",
      "Invalid credentials": "error.invalidCredentials",
      "Room not found": "error.roomNotFound",
      "Invalid password": "error.invalidPassword",
      "Room already exists": "error.roomAlreadyExists",
      "User not found": "error.userNotFound",
      Unauthorized: "error.unauthorized",
    };

    if (errorMap[apiError]) {
      return errorMap[apiError];
    }

    if (apiError.toLowerCase().includes("server error")) {
      return "error.serverError";
    }

    if (
      apiError.toLowerCase().includes("failed to fetch") ||
      apiError.toLowerCase().includes("network error")
    ) {
      return "error.connectionError";
    }

    return "error.failedRequest";
  }

  async professorCreateRoom(credentials: RoomCredentials): Promise<void> {
    if (!credentials.room_name) {
      throw new Error(i18next.t("error.roomRequired"));
    }
    if (!credentials.password) {
      throw new Error(i18next.t("error.passwordRequired"));
    }
    await this.handleRequest("/createRoom", credentials, true);
  }

  async professorJoinRoom(credentials: RoomCredentials): Promise<void> {
    if (!credentials.room_name) {
      throw new Error(i18next.t("error.roomRequired"));
    }
    if (!credentials.password) {
      throw new Error(i18next.t("error.passwordRequired"));
    }
    await this.handleRequest("/joinAsAdmin", credentials, true);
  }

  async studentJoinRoom(credentials: {
    room_name: string;
    username: string;
  }): Promise<void> {
    if (!credentials.username) {
      throw new Error(i18next.t("error.usernameRequired"));
    }
    if (!credentials.room_name) {
      throw new Error(i18next.t("error.roomRequired"));
    }
    await this.handleRequest("/joinAsStudent", credentials, false);
  }

  getCurrentRoom(): string | null {
    return localStorage.getItem("roomName");
  }

  getUsername(): string | null {
    return localStorage.getItem("username");
  }

  isProfessor(): boolean {
    return localStorage.getItem("isProfessor") === "true";
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    const roomName = localStorage.getItem("roomName");

    console.log("Checking authentication:");
    console.log("- Token exists:", !!token);
    console.log("- Room name exists:", !!roomName);

    if (!token || !roomName) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now();
      const expiryTime = payload.expiresAt * 1000;

      console.log("Token validation:");
      console.log("- Current time:", new Date(currentTime).toLocaleString());
      console.log("- Expiry time:", new Date(expiryTime).toLocaleString());
      console.log("- Is valid:", currentTime < expiryTime);

      const isValid = currentTime < expiryTime;

      if (!isValid) {
        console.log("Token expired, logging out");
        this.logout();
      }

      return isValid;
    } catch (error) {
      console.error("Error validating token:", error);
      this.logout();
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("roomName");
    localStorage.removeItem("username");
    localStorage.removeItem("isProfessor");
  }
}

export const roomHandler = new RoomHandler();
