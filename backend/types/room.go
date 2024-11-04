package types

type CreateRoomRequest struct {
    RoomName string `json:"room_name"`
    Password string `json:"password"`
}

type JoinRoomRequest struct {
    RoomName string `json:"room_name"`
    Username string `json:"username"`
}

type Room struct {
    RoomName string            `bson:"room_name" json:"room_name"`
    Password string            `bson:"password" json:"-"`
    Users    map[string]bool   `bson:"users" json:"-"`
}

func NewRoom(roomName string) *Room {
    return &Room{
        RoomName: roomName,
        Users:    make(map[string]bool),
    }
}