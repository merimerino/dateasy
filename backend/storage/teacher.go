package storage

import (
	"context"
	"fmt"
	"log"

	types "backend/types"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type TeacherStore interface {
	GetMultipleChoiceTasks(string) ([]*types.MultipleChoice, error)
	GetNumberTasks(string) ([]*types.NumbersTask, error)
	GetShortTasks(string) ([]*types.ShortTask, error)
	GetDescriptions(string) ([]*types.Description, error)
	GetMapTasks(string) ([]*types.MapTask, error)
	GetTableTasks(string) ([]*types.TableTask, error)
	AddNumbersTask(*types.NumbersTask) error
	AddShortTask(*types.ShortTask) error
	AddDescription(*types.Description) error
	AddMapTask(*types.MapTask) error
	AddTableTask(*types.TableTask) error
	AddMultipleChoiceTask(*types.MultipleChoice) error
	GetHighestTaskOrder(string) (int, error)
	getHighestOrderFromCollection(string, types.Task, string) (int, error)
}

func (s *MongoStore) AddNumbersTask(task *types.NumbersTask) error {
	collection := s.client.Database("taskdb").Collection("NumbersTask")

	_, err := collection.InsertOne(context.Background(), task)
	if err != nil {
		return fmt.Errorf("error inserting numbers task: %v", err)
	}
	return nil
}
func (s *MongoStore) AddShortTask(task *types.ShortTask) error {
	collection := s.client.Database("taskdb").Collection("ShortTask")

	_, err := collection.InsertOne(context.Background(), task)
	if err != nil {
		return fmt.Errorf("error inserting short task: %v", err)
	}
	return nil
}
func (s *MongoStore) AddDescription(task *types.Description) error {
	collection := s.client.Database("taskdb").Collection("Description")

	_, err := collection.InsertOne(context.Background(), task)
	if err != nil {
		return fmt.Errorf("error inserting description: %v", err)
	}
	return nil
}
func (s *MongoStore) AddMapTask(task *types.MapTask) error {
	collection := s.client.Database("taskdb").Collection("MapTask")

	_, err := collection.InsertOne(context.Background(), task)
	if err != nil {
		return fmt.Errorf("error inserting map task: %v", err)
	}
	return nil
}
func (s *MongoStore) AddTableTask(task *types.TableTask) error {
	collection := s.client.Database("taskdb").Collection("TableTask")

	_, err := collection.InsertOne(context.Background(), task)
	if err != nil {
		return fmt.Errorf("error inserting table task: %v", err)
	}
	return nil
}
func (s *MongoStore) AddMultipleChoiceTask(task *types.MultipleChoice) error {
	collection := s.client.Database("taskdb").Collection("MultipleChoice")

	_, err := collection.InsertOne(context.Background(), task)
	if err != nil {
		return fmt.Errorf("error inserting multiple choice task: %v", err)
	}
	return nil
}
func (s *MongoStore) getHighestOrderFromCollection(collectionName string, taskType types.Task, roomName string) (int, error) {
	collection := s.client.Database("taskdb").Collection(collectionName)

	filter := bson.M{"room_name": roomName}
	opts := options.FindOne().SetSort(bson.D{{Key: "order_number", Value: -1}})

	err := collection.FindOne(context.Background(), filter, opts).Decode(taskType)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return 0, nil // No documents found in this collection
		}
		return 0, fmt.Errorf("error finding the highest task order in collection %s: %v", collectionName, err)
	}

	return taskType.OrderNumberField(), nil
}
func (s *MongoStore) GetHighestTaskOrder(roomName string) (int, error) {
	// Create a map of collection names to corresponding task types
	collections := map[string]types.Task{
		"MultipleChoice": &types.MultipleChoice{},
		"ShortTask":      &types.ShortTask{},
		"Description":    &types.Description{},
		"TableTask":      &types.TableTask{},
		"MapTask":        &types.MapTask{},
		"NumbersTask":    &types.NumbersTask{},
	}

	highestOrder := 0

	for collectionName, taskType := range collections {
		order, err := s.getHighestOrderFromCollection(collectionName, taskType, roomName)
		if err != nil {
			return 0, err
		}
		if order > highestOrder {
			highestOrder = order
		}
	}

	log.Printf("Highest order number retrieved: %d\n", highestOrder)
	return highestOrder, nil
}

//func (s *MongoStore) GetHighestTaskOrder(roomName string) (int, error) {
//	collection := s.client.Database("taskdb").Collection("MultipleChoice")
//
//	filter := bson.M{"room_name": roomName}
//	opts := options.FindOne().SetSort(bson.D{{Key: "order_number", Value: -1}})
//
//	var task types.MultipleChoice
//	err := collection.FindOne(context.Background(), filter, opts).Decode(&task)
//	if err != nil {
//		if err == mongo.ErrNoDocuments {
//			return 0, nil // No documents found, return 0 as the highest order number
//		}
//		return 0, fmt.Errorf("error finding the highest task order: %v", err)
//	}
//	log.Print("I get as highest order number ->", task.OrderNumber)
//
//	return task.OrderNumber, nil
//}

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
