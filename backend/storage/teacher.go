package storage

import (
	"fmt"
	"context"

	types "backend/types"
	"go.mongodb.org/mongo-driver/bson"
)

type TeacherStore interface {
	GetMultipleChoiceTasks(string) ([]*types.MultipleChoice, error)
	GetNumberTasks(string) ([]*types.NumbersTask, error)
	GetShortTasks(string) ([]*types.ShortTask, error)
	GetDescriptions(string) ([]*types.Description, error)
	GetMapTasks(string) ([]*types.MapTask, error)
	GetTableTasks(string) ([]*types.TableTask, error)
}




func (s *MongoStore) GetMultipleChoiceTasks(roomName string) ([]*types.MultipleChoice, error) {
    collection := s.client.Database("taskdb").Collection("MultipleChoice")

    var tasks []*types.MultipleChoice
	filter := bson.M{"room_name": roomName}

    cursor, err := collection.Find(context.Background(), filter)
    if err != nil {
        return nil, fmt.Errorf("error trying to get multiple choice tasks: %v", err)
    }
    defer cursor.Close(context.Background())

    for cursor.Next(context.Background()) {
        var task types.MultipleChoice
        if err := cursor.Decode(&task); err != nil {
            return nil, fmt.Errorf("error decoding task: %v", err)
        }
        // Append a pointer to the task
        tasks = append(tasks, &task)
    }
    if err := cursor.Err(); err != nil {
        return nil, err
    }

    return tasks, nil
}

func (s *MongoStore) GetShortTasks(roomName string) ([]*types.ShortTask, error) {
    collection := s.client.Database("taskdb").Collection("ShortTask")

    var tasks []*types.ShortTask
	filter := bson.M{"room_name": roomName}

    cursor, err := collection.Find(context.Background(), filter)
    if err != nil {
        return nil, fmt.Errorf("error trying to get multiple choice tasks: %v", err)
    }
    defer cursor.Close(context.Background())

    for cursor.Next(context.Background()) {
        var task types.ShortTask
        if err := cursor.Decode(&task); err != nil {
            return nil, fmt.Errorf("error decoding task: %v", err)
        }
        // Append a pointer to the task
        tasks = append(tasks, &task)
    }
    if err := cursor.Err(); err != nil {
        return nil, err
    }

    return tasks, nil
}

func (s *MongoStore) GetDescriptions(roomName string) ([]*types.Description, error) {
    collection := s.client.Database("taskdb").Collection("Description")

    var tasks []*types.Description
	filter := bson.M{"room_name": roomName}

    cursor, err := collection.Find(context.Background(), filter)
    if err != nil {
        return nil, fmt.Errorf("error trying to get multiple choice tasks: %v", err)
    }
    defer cursor.Close(context.Background())

    for cursor.Next(context.Background()) {
        var task types.Description
        if err := cursor.Decode(&task); err != nil {
            return nil, fmt.Errorf("error decoding task: %v", err)
        }
        // Append a pointer to the task
        tasks = append(tasks, &task)
    }
    if err := cursor.Err(); err != nil {
        return nil, err
    }

    return tasks, nil
}

func (s *MongoStore) GetNumberTasks(roomName string) ([]*types.NumbersTask, error) {
    collection := s.client.Database("taskdb").Collection("NumbersTask")

    var tasks []*types.NumbersTask
	filter := bson.M{"room_name": roomName}

    cursor, err := collection.Find(context.Background(), filter)
    if err != nil {
        return nil, fmt.Errorf("error trying to get multiple choice tasks: %v", err)
    }
    defer cursor.Close(context.Background())

    for cursor.Next(context.Background()) {
        var task types.NumbersTask
        if err := cursor.Decode(&task); err != nil {
            return nil, fmt.Errorf("error decoding task: %v", err)
        }
        // Append a pointer to the task
        tasks = append(tasks, &task)
    }
    if err := cursor.Err(); err != nil {
        return nil, err
    }

    return tasks, nil
}

func (s *MongoStore) GetMapTasks(roomName string) ([]*types.MapTask, error) {
    collection := s.client.Database("taskdb").Collection("MapTask")

    var tasks []*types.MapTask
	filter := bson.M{"room_name": roomName}

    cursor, err := collection.Find(context.Background(), filter)
    if err != nil {
        return nil, fmt.Errorf("error trying to get multiple choice tasks: %v", err)
    }
    defer cursor.Close(context.Background())

    for cursor.Next(context.Background()) {
        var task types.MapTask
        if err := cursor.Decode(&task); err != nil {
            return nil, fmt.Errorf("error decoding task: %v", err)
        }
        // Append a pointer to the task
        tasks = append(tasks, &task)
    }
    if err := cursor.Err(); err != nil {
        return nil, err
    }

    return tasks, nil
}

func (s *MongoStore) GetTableTasks(roomName string) ([]*types.TableTask, error) {
    collection := s.client.Database("taskdb").Collection("TableTask")

    var tasks []*types.TableTask
	filter := bson.M{"room_name": roomName}

    cursor, err := collection.Find(context.Background(), filter)
    if err != nil {
        return nil, fmt.Errorf("error trying to get multiple choice tasks: %v", err)
    }
    defer cursor.Close(context.Background())

    for cursor.Next(context.Background()) {
        var task types.TableTask
        if err := cursor.Decode(&task); err != nil {
            return nil, fmt.Errorf("error decoding task: %v", err)
        }
        // Append a pointer to the task
        tasks = append(tasks, &task)
    }
    if err := cursor.Err(); err != nil {
        return nil, err
    }

    return tasks, nil
}