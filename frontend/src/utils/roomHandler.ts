import i18next from "i18next";

interface RoomCredentials {
  room_name: string;
  password?: string;
  username?: string;
}

interface ApiResponse {
  token: string;
}

interface LoginResponse {
  token: string;
  room_name: string;
}

type UserRole = "student" | "professor";

class RoomHandler {
  private baseUrl = "http://localhost:3000";

  private async handleRequest(
    endpoint: string,
    credentials: RoomCredentials,
    role: UserRole
  ): Promise<LoginResponse> {
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
      localStorage.setItem("userRole", role);

      if (credentials.username) {
        localStorage.setItem("username", credentials.username);
      }

      // Return the format expected by the login hooks
      return {
        token: data.token,
        room_name: credentials.room_name,
      };
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

  async professorCreateRoom(
    credentials: RoomCredentials
  ): Promise<LoginResponse> {
    if (!credentials.room_name) {
      throw new Error(i18next.t("error.roomRequired"));
    }
    if (!credentials.password) {
      throw new Error(i18next.t("error.passwordRequired"));
    }
    return this.handleRequest("/createRoom", credentials, "professor");
  }

  async professorJoinRoom(
    credentials: RoomCredentials
  ): Promise<LoginResponse> {
    if (!credentials.room_name) {
      throw new Error(i18next.t("error.roomRequired"));
    }
    if (!credentials.password) {
      throw new Error(i18next.t("error.passwordRequired"));
    }
    return this.handleRequest("/joinAsAdmin", credentials, "professor");
  }

  async studentJoinRoom(credentials: {
    room_name: string;
    username: string;
  }): Promise<LoginResponse> {
    if (!credentials.username) {
      throw new Error(i18next.t("error.usernameRequired"));
    }
    if (!credentials.room_name) {
      throw new Error(i18next.t("error.roomRequired"));
    }
    return this.handleRequest("/joinAsStudent", credentials, "student");
  }

  getCurrentRoom(): string | null {
    return localStorage.getItem("roomName");
  }

  getUsername(): string | null {
    return localStorage.getItem("username");
  }

  getUserRole(): UserRole | null {
    return localStorage.getItem("userRole") as UserRole | null;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    const roomName = localStorage.getItem("roomName");
    const userRole = localStorage.getItem("userRole");

    if (!token || !roomName || !userRole) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now();
      const expiryTime = payload.expiresAt * 1000;

      const isValid = currentTime < expiryTime;

      if (!isValid) {
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
    localStorage.removeItem("userRole");
  }
}

export const roomHandler = new RoomHandler();
