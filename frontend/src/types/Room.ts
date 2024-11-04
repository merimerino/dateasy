export interface Room {
  id: string;
  name: string;
  createdAt: Date;
}

export interface RoomResponse {
  success: boolean;
  message: string;
  room?: Room;
  token?: string;
}

export type UserRole = "professor" | "student";

export interface ProfessorRoomDTO {
  room_name: string;
  password: string;
}

export interface StudentRoomDTO {
  room_name: string;
  nickname: string;
}

export interface UserSession {
  token: string | null;
  roomId: string | null;
  role: UserRole | null;
  nickname?: string | null;
}
