import axios from "axios";
import {
  ProfessorRoomDTO,
  StudentRoomDTO,
  RoomResponse,
  UserRole,
  UserSession,
} from "../types/Room";

const API_BASE_URL = "http://localhost:3000";

export class RoomHandler {
  private static instance: RoomHandler;
  private session: UserSession = {
    token: null,
    roomId: null,
    role: null,
    nickname: null,
  };

  private constructor() {
    this.loadSession();
  }

  public static getInstance(): RoomHandler {
    if (!RoomHandler.instance) {
      RoomHandler.instance = new RoomHandler();
    }
    return RoomHandler.instance;
  }

  private getHeaders() {
    return {
      "Content-Type": "application/json",
      ...(this.session.token && {
        Authorization: `Bearer ${this.session.token}`,
      }),
    };
  }

  private saveSession(): void {
    localStorage.setItem("roomSession", JSON.stringify(this.session));
  }

  private loadSession(): void {
    const savedSession = localStorage.getItem("roomSession");
    if (savedSession) {
      this.session = JSON.parse(savedSession);
    }
  }

  private updateSession(
    response: RoomResponse,
    role: UserRole,
    nickname?: string
  ): void {
    this.session = {
      token: response.token || null,
      roomId: response.room?.id || null,
      role,
      nickname: nickname || null,
    };
    this.saveSession();
  }

  public async professorCreateRoom(
    roomData: ProfessorRoomDTO
  ): Promise<RoomResponse> {
    try {
      const response = await axios.request({
        method: "post",
        url: `${API_BASE_URL}/createRoom`,
        headers: this.getHeaders(),
        data: roomData,
      });

      if (response.data) {
        this.updateSession(response.data, "professor");
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to create room"
        );
      }
      throw error;
    }
  }

  public async professorJoinRoom(
    roomData: ProfessorRoomDTO
  ): Promise<RoomResponse> {
    try {
      const response = await axios.request({
        method: "post",
        url: `${API_BASE_URL}/joinAsAdmin`,
        headers: this.getHeaders(),
        data: roomData,
      });

      if (response.data) {
        this.updateSession(response.data, "professor");
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to join room");
      }
      throw error;
    }
  }

  public async studentJoinRoom(
    roomData: StudentRoomDTO
  ): Promise<RoomResponse> {
    try {
      const response = await axios.request({
        method: "post",
        url: `${API_BASE_URL}/joinAsStudent`,
        headers: this.getHeaders(),
        data: roomData,
      });

      if (response.data) {
        this.updateSession(response.data, "student", roomData.nickname);
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to join room");
      }
      throw error;
    }
  }

  public async leaveRoom(): Promise<boolean> {
    if (!this.session.roomId || !this.session.token) {
      return false;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/leaveRoom`,
        { room_id: this.session.roomId },
        { headers: this.getHeaders() }
      );

      this.clearSession();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public getSession(): UserSession {
    return { ...this.session };
  }

  public isLoggedIn(): boolean {
    return !!this.session.token && !!this.session.roomId;
  }

  public clearSession(): void {
    this.session = {
      token: null,
      roomId: null,
      role: null,
      nickname: null,
    };
    localStorage.removeItem("roomSession");
  }
}

export const roomHandler = RoomHandler.getInstance();
