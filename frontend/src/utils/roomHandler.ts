interface RoomCredentials {
  room_name: string;
  password?: string;
  nickname?: string;
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
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to process request");
    }

    const data: ApiResponse = await response.json();

    // Store the token and room name
    localStorage.setItem("token", data.token);
    localStorage.setItem("roomName", credentials.room_name);
    localStorage.setItem("isProfessor", String(isProfessor));

    // Store nickname if provided
    if (credentials.nickname) {
      localStorage.setItem("nickname", credentials.nickname);
    }
  }

  async professorCreateRoom(credentials: RoomCredentials): Promise<void> {
    await this.handleRequest("/createRoom", credentials, true);
  }

  async professorJoinRoom(credentials: RoomCredentials): Promise<void> {
    await this.handleRequest("/joinAsAdmin", credentials, true);
  }

  async studentJoinRoom(credentials: RoomCredentials): Promise<void> {
    if (!credentials.nickname) {
      throw new Error("Nickname is required");
    }
    await this.handleRequest("/joinAsStudent", credentials, false);
  }

  getCurrentRoom(): string | null {
    return localStorage.getItem("roomName");
  }

  getNickname(): string | null {
    return localStorage.getItem("nickname");
  }

  isProfessor(): boolean {
    return localStorage.getItem("isProfessor") === "true";
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    const roomName = localStorage.getItem("roomName");

    if (!token || !roomName) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return Date.now() < payload.expiresAt * 1000;
    } catch {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("roomName");
    localStorage.removeItem("nickname");
    localStorage.removeItem("isProfessor");
  }
}

export const roomHandler = new RoomHandler();
