package storage

import (
    "log"
	"context"
	
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "go.mongodb.org/mongo-driver/mongo/readpref"
)

type Storage interface {
	TeacherStore
	RoomStore
}

type MongoStore struct {
	client *mongo.Client
}

func (s *MongoStore) Close() {
	if s.client != nil {
		//s.db.Close()
		//nekako zatvorit konekciju
		log.Println("Zatvaram konekciju s bazom")
	}
}

func ConnectDB() (*MongoStore, error) {
    clientOptions := options.Client().ApplyURI("mongodb://mongo:27017")
    client, err := mongo.Connect(context.TODO(), clientOptions)
    if err != nil {
		return nil, err
    }

    err = client.Ping(context.TODO(), readpref.Primary())
    if err != nil {
        return nil, err
    }

    log.Println("Connected to MongoDB!")
	return &MongoStore{client: client}, nil
}


func (s *MongoStore) Init() error {
	log.Println("Initializing repo")
	return nil
}
