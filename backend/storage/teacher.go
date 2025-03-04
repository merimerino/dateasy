package storage

import (
	"context"
	"fmt"
	"log"

	types "backend/types"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type TeacherStore interface {
	GetMultipleChoiceTasks(string) ([]*types.MultipleChoice, error)
	GetNumberTasks(string) ([]*types.NumbersTask, error)
	GetShortTasks(string) ([]*types.ShortTask, error)
	GetDescriptions(string) ([]*types.Description, error)
	GetMapTasks(string) ([]*types.MapTask, error)
	GetMapTasksGpx(string) ([]*types.MapTaskGpx, error)
	GetTableTasks(string) ([]*types.TableTask, error)
	AddNumbersTask(*types.NumbersTask) error
	AddShortTask(*types.ShortTask) error
	AddDescription(*types.Description) error
	AddMapTask(*types.MapTask) error
	AddMapTaskGpx(*types.MapTaskGpx) error
	AddTableTask(*types.TableTask) error
	AddMultipleChoiceTask(*types.MultipleChoice) error
	GetHighestTaskOrder(string) (int, error)
	GetTaskByID(primitive.ObjectID) (types.Task, string, error)
	UpdateTaskWithAnswer(string, types.Task, string, string) error
	UpdateTaskWithNewOrder(string, types.Task, int) error
	UpdateTaskAnswers(string, types.Task, []types.Answer) error
	DeleteTask(string, primitive.ObjectID) error
	UpdateMultipleChoice(types.MultipleChoice) error
	UpdateNumbersTask(types.NumbersTask) error
	UpdateShortTask(types.ShortTask) error
	UpdateDescription(types.Description) error
	UpdateMapTask(types.MapTask) error
	UpdateMapTaskGpx(types.MapTaskGpx) error
	UpdateTableTask(types.TableTask) error
}

func (s *MongoStore) UpdateShortTask(task types.ShortTask) error {
	collection := s.client.Database("taskdb").Collection("ShortTask")

	filter := bson.M{"_id": task.ID}
	update := bson.M{
		"$set": bson.M{
			"room_name":              task.RoomName,
			"name":                   task.Name,
			"order_number":           task.OrderNumber,
			"task_type":              task.TaskType,
			"text":                   task.Text,
			"max_characters_allowed": task.MaxCharactersAllowed,
			"answers":                task.Answers,
		},
	}

	_, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("error updating short task: %v", err)
	}

	return nil
}

func (s *MongoStore) UpdateDescription(task types.Description) error {
	collection := s.client.Database("taskdb").Collection("Description")

	filter := bson.M{"_id": task.ID}
	update := bson.M{
		"$set": bson.M{
			"room_name":    task.RoomName,
			"text":         task.Text,
			"task_type":    task.TaskType,
			"order_number": task.OrderNumber,
			"answers":      task.Answers,
		},
	}

	_, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("error updating description task: %v", err)
	}

	return nil
}

func (s *MongoStore) UpdateTableTask(task types.TableTask) error {
	collection := s.client.Database("taskdb").Collection("TableTask")

	filter := bson.M{"_id": task.ID}
	update := bson.M{
		"$set": bson.M{
			"room_name":            task.RoomName,
			"name":                 task.Name,
			"order_number":         task.OrderNumber,
			"text":                 task.Text,
			"task_type":            task.TaskType,
			"columns":              task.Columns,
			"rows":                 task.Rows,
			"show_graf":            task.ShowGraf,
			"allow_adding_of_rows": task.AllowAddingOfRows,
			"new_row_name":         task.NewRowName,
			"answers":              task.Answers,
		},
	}

	_, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("error updating table task: %v", err)
	}

	return nil
}
func (s *MongoStore) UpdateMapTaskGpx(task types.MapTaskGpx) error {
	collection := s.client.Database("taskdb").Collection("MapTaskGpx")

	filter := bson.M{"_id": task.ID}
	update := bson.M{
		"$set": bson.M{
			"room_name":    task.RoomName,
			"name":         task.Name,
			"order_number": task.OrderNumber,
			"task_type":    task.TaskType,
			"text":         task.Text,
			"answers":      task.Answers,
		},
	}

	_, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("error updating map task: %v", err)
	}

	return nil
}

func (s *MongoStore) UpdateMapTask(task types.MapTask) error {
	collection := s.client.Database("taskdb").Collection("MapTask")

	filter := bson.M{"_id": task.ID}
	update := bson.M{
		"$set": bson.M{
			"room_name":    task.RoomName,
			"name":         task.Name,
			"order_number": task.OrderNumber,
			"task_type":    task.TaskType,
			"text":         task.Text,
			"add_mark":     task.AddMark,
			"coord_x":      task.CoordX,
			"coord_y":      task.CoordY,
			"answers":      task.Answers,
		},
	}

	_, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("error updating map task: %v", err)
	}

	return nil
}

func (s *MongoStore) UpdateNumbersTask(task types.NumbersTask) error {
	collection := s.client.Database("taskdb").Collection("NumbersTask")

	filter := bson.M{"_id": task.ID}
	update := bson.M{
		"$set": bson.M{
			"room_name":    task.RoomName,
			"name":         task.Name,
			"order_number": task.OrderNumber,
			"task_type":    task.TaskType,
			"text":         task.Text,
			"min_num":      task.MinNum,
			"max_num":      task.MaxNum,
			"answers":      task.Answers,
		},
	}

	_, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("error updating numbers task: %v", err)
	}

	return nil
}

func (s *MongoStore) UpdateMultipleChoice(task types.MultipleChoice) error {
	collection := s.client.Database("taskdb").Collection("MultipleChoice")

	filter := bson.M{"_id": task.ID}
	update := bson.M{
		"$set": bson.M{
			"room_name":        task.RoomName,
			"name":             task.Name,
			"order_number":     task.OrderNumber,
			"task_type":        task.TaskType,
			"multiple_answers": task.MultipleAnswers,
			"text":             task.Text,
			"options":          task.Options,
			"answers":          task.Answers,
		},
	}

	_, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("error updating task: %v", err)
	}

	return nil
}

func (s *MongoStore) DeleteTask(collectionName string, id primitive.ObjectID) error {
	collection := s.client.Database("taskdb").Collection(collectionName)

	filter := bson.M{"_id": id}
	_, err := collection.DeleteOne(context.Background(), filter)
	if err != nil {
		return fmt.Errorf("error deleting task: %v", err)
	}

	return nil
}

func (s *MongoStore) GetTaskByID(taskID primitive.ObjectID) (types.Task, string, error) {
	collections := map[string]types.Task{
		"MultipleChoice": &types.MultipleChoice{},
		"ShortTask":      &types.ShortTask{},
		"Description":    &types.Description{},
		"TableTask":      &types.TableTask{},
		"MapTask":        &types.MapTask{},
		"MapTaskGpx":     &types.MapTaskGpx{},
		"NumbersTask":    &types.NumbersTask{},
	}

	for collectionName, taskType := range collections {
		task, err := s.getTaskFromCollectionByID(collectionName, taskType, taskID)
		if err != nil {
			return nil, "", err
		}
		if task != nil {
			return task, collectionName, nil
		}
	}

	return nil, "", fmt.Errorf("no task found with id %s", taskID.Hex())
}

func (s *MongoStore) getTaskFromCollectionByID(collectionName string, taskType types.Task, taskID primitive.ObjectID) (types.Task, error) {
	collection := s.client.Database("taskdb").Collection(collectionName)

	filter := bson.M{"_id": taskID}
	err := collection.FindOne(context.Background(), filter).Decode(taskType)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil // No documents found in this collection
		}
		return nil, fmt.Errorf("error finding task in collection %s: %v", collectionName, err)
	}

	return taskType, nil
}
func (s *MongoStore) UpdateTaskAnswers(collectionName string, task types.Task, answers []types.Answer) error {
	collection := s.client.Database("taskdb").Collection(collectionName)

	filter := bson.M{"_id": task.GetID()}
	update := bson.M{
		"$set": bson.M{"answers": answers},
	}

	_, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("error updating task with new order number: %v", err)
	}

	return nil
}
func (s *MongoStore) UpdateTaskWithAnswer(collectionName string, task types.Task, username string, answer string) error {
	collection := s.client.Database("taskdb").Collection(collectionName)

	filter := bson.M{"_id": task.GetID()}
	update := bson.M{
		"$push": bson.M{"answers": bson.M{"username": username, "answer": answer}},
	}

	_, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("error updating task with answer: %v", err)
	}

	return nil
}
func (s *MongoStore) UpdateTaskWithNewOrder(collectionName string, task types.Task, orderNumber int) error {
	collection := s.client.Database("taskdb").Collection(collectionName)

	filter := bson.M{"_id": task.GetID()}
	update := bson.M{
		"$set": bson.M{"order_number": orderNumber},
	}

	_, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("error updating task with new order number: %v", err)
	}

	return nil
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
func (s *MongoStore) AddMapTaskGpx(task *types.MapTaskGpx) error {
	collection := s.client.Database("taskdb").Collection("MapTaskGpx")

	_, err := collection.InsertOne(context.Background(), task)
	if err != nil {
		return fmt.Errorf("error inserting map task: %v", err)
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
		"MapTaskGpx":     &types.MapTaskGpx{},
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

func (s *MongoStore) GetMapTasksGpx(roomName string) ([]*types.MapTaskGpx, error) {
	collection := s.client.Database("taskdb").Collection("MapTaskGpx")

	var tasks []*types.MapTaskGpx
	filter := bson.M{"room_name": roomName}

	cursor, err := collection.Find(context.Background(), filter)
	if err != nil {
		return nil, fmt.Errorf("error trying to get multiple choice tasks: %v", err)
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var task types.MapTaskGpx
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
