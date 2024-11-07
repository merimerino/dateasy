package storage

import (
    "context"
    "fmt"
	types "backend/types"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type RoomStore interface {
	GetRoomByName(string) (*types.Room, error)
	CreateRoom(*types.Room) (*types.Room, error)
	UpdateRoom(*types.Room) error

}

func (s *MongoStore) GetRoomByName(roomName string) (*types.Room, error) {
    collection := s.client.Database("taskdb").Collection("Rooms") // Use "Rooms" collection for rooms

    var room types.Room
    filter := bson.M{"room_name": roomName}

    err := collection.FindOne(context.Background(), filter).Decode(&room)
    if err == mongo.ErrNoDocuments {
        return nil, fmt.Errorf("room not found")
    } else if err != nil {
        return nil, fmt.Errorf("error retrieving room: %v", err)
    }

    return &room, nil
}

func (s *MongoStore) CreateRoom(room *types.Room) (*types.Room, error) {
    collection := s.client.Database("taskdb").Collection("Rooms") // Use "Rooms" collection for rooms

    _, err := collection.InsertOne(context.Background(), room)
    if err != nil {
        return nil, fmt.Errorf("error creating room: %v", err)
    }

    return room, nil
}

func (s *MongoStore) UpdateRoom(room *types.Room) error {
	collection := s.client.Database("taskdb").Collection("Rooms")

	// Define the filter to find the room by room_name
	filter := bson.M{"room_name": room.RoomName}

	// Define the update operation to set the room's users map
	update := bson.M{
		"$set": bson.M{
			"users": room.Users,
		},
	}

	// Perform the update operation
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("error updating room: %v", err)
	}

	// Check if any document was actually updated
	if result.MatchedCount == 0 {
		return fmt.Errorf("no room found with the specified name")
	}

	return nil
}