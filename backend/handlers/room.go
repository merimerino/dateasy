package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	types "backend/types"

	"golang.org/x/crypto/bcrypt"
)

func (s *APIServer) HandleCreateRoom(w http.ResponseWriter, r *http.Request) error {
	c_r_req := new(types.CreateRoomRequest)
	if err := json.NewDecoder(r.Body).Decode(c_r_req); err != nil {
		return err
	}

	// Validate room name and password
	if len(c_r_req.RoomName) < 4 {
		return WriteJSON(w, http.StatusBadRequest, ApiError{Error: "Room name must be longer than 4 characters"})
	}
	if len(c_r_req.Password) < 4 {
		return WriteJSON(w, http.StatusBadRequest, ApiError{Error: "Password must be longer than 4 characters"})
	}

	// Check if the room already exists
	if _, err := s.store.GetRoomByName(c_r_req.RoomName); err == nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{Error: "Room name already taken"})
	}

	// Create the new room with hashed password
	room := types.NewRoom(c_r_req.RoomName)
	room.Password = hashPassword(c_r_req.Password)
	room.Users = make(map[string]bool) // Initialize users map

	// Save the room in the store
	if _, err := s.store.CreateRoom(room); err != nil {
		return err
	}

	// Create a JWT token storing room_name
	tokenString, err := createJWT(map[string]interface{}{
		"room_name": c_r_req.RoomName,
	})
	if err != nil {
		return err
	}

	// Return the token
	return WriteJSON(w, http.StatusOK, map[string]interface{}{
		"token": tokenString,
	})
}

// JoinRoom endpoint - /joinRoom
func (s *APIServer) HandleJoinRoom(w http.ResponseWriter, r *http.Request) error {
	j_r_req := new(types.JoinRoomRequest)
	if err := json.NewDecoder(r.Body).Decode(j_r_req); err != nil {
		return err
	}

	// Retrieve the room by name
	room, err := s.store.GetRoomByName(j_r_req.RoomName)
	if err != nil {
		return WriteJSON(w, http.StatusNotFound, ApiError{Error: "Room not found"})
	}

	// Check if the username is unique in the room
	if room.Users[j_r_req.Username] {
		return WriteJSON(w, http.StatusBadRequest, ApiError{Error: "Username already taken in this room"})
	}

	// Add the username to the room's users and save the updated room
	room.Users[j_r_req.Username] = true
	if err := s.store.UpdateRoom(room); err != nil {
		return err
	}

	// Create a JWT token with the username stored in it
	tokenString, err := createJWT(map[string]interface{}{
		"username": j_r_req.Username,
		"room_name": j_r_req.RoomName,
	})
	if err != nil {
		return err
	}

	// Return the token
	return WriteJSON(w, http.StatusOK, map[string]interface{}{
		"token": tokenString,
	})
}


func hashPassword(password string) string {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal(err)
	}
	return string(hashedPassword)
}