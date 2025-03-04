package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"sort"

	types "backend/types"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SortedTasks []types.Task

func (s SortedTasks) Len() int           { return len(s) }
func (s SortedTasks) Less(i, j int) bool { return s[i].OrderNumberField() < s[j].OrderNumberField() }
func (s SortedTasks) Swap(i, j int)      { s[i], s[j] = s[j], s[i] }

func (s *APIServer) HandleGetAllTasks(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	// Initialize an empty slice of TaskSortable to store all tasks
	var allTasks SortedTasks

	// Fetch each type of task, casting each to TaskSortable and appending to allTasks
	multipleChoiceTasks, err := s.store.GetMultipleChoiceTasks(room_name)
	if err != nil {
		return WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to retrieve multiple choice tasks"})
	}
	for _, task := range multipleChoiceTasks {
		allTasks = append(allTasks, task)
		log.Println(task.OrderNumber)
		log.Println(task.TaskType)
	}

	shortTasks, err := s.store.GetShortTasks(room_name)
	if err != nil {
		return WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to retrieve short tasks"})
	}
	for _, task := range shortTasks {
		allTasks = append(allTasks, task)
	}

	numberTasks, err := s.store.GetNumberTasks(room_name)
	if err != nil {
		return WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to retrieve number tasks"})
	}
	for _, task := range numberTasks {
		allTasks = append(allTasks, task)
	}

	mapTasks, err := s.store.GetMapTasks(room_name)
	if err != nil {
		return WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to retrieve map tasks"})
	}
	for _, task := range mapTasks {
		allTasks = append(allTasks, task)
	}
	mapTasksGpx, err := s.store.GetMapTasksGpx(room_name)
	if err != nil {
		return WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to retrieve map tasks"})
	}
	for _, task := range mapTasksGpx {
		allTasks = append(allTasks, task)
	}

	descriptions, err := s.store.GetDescriptions(room_name)
	if err != nil {
		return WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to retrieve descriptions"})
	}
	for _, task := range descriptions {
		allTasks = append(allTasks, task)
	}

	tableTasks, err := s.store.GetTableTasks(room_name)
	if err != nil {
		return WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to retrieve table tasks"})
	}
	for _, task := range tableTasks {
		log.Println(task.OrderNumber)
		log.Println(task.TaskType)
		allTasks = append(allTasks, task)
	}

	sort.Sort(allTasks)
	// Return the sorted tasks as JSON
	return WriteJSON(w, http.StatusOK, allTasks)
}

func (s *APIServer) HandleAddMultipleChoice(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	if username != "Admin" {
		return WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
	}
	add_multiple_req := new(types.AddMultipleChoice)
	if err := json.NewDecoder(r.Body).Decode(add_multiple_req); err != nil {
		return err
	}

	// Get the highest task order
	highestOrder, err := s.store.GetHighestTaskOrder(room_name)
	if err != nil {
		return err
	}

	// Create a new MultipleChoice task
	newTask := &types.MultipleChoice{
		RoomName:        room_name,
		Name:            add_multiple_req.Name,
		TaskType:        "multichoice",
		OrderNumber:     highestOrder + 1,
		MultipleAnswers: add_multiple_req.MultipleAnswers,
		Text:            add_multiple_req.Text,
		Options:         add_multiple_req.Options,
		Answers:         []types.Answer{},
	}

	// Save the new task to the database
	if err := s.store.AddMultipleChoiceTask(newTask); err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, "Successfully added a task")
}

func (s *APIServer) HandleAddNumbersTask(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	if username != "Admin" {
		return WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
	}
	add_multiple_req := new(types.AddNumbersTask)
	if err := json.NewDecoder(r.Body).Decode(add_multiple_req); err != nil {
		return err
	}

	// Get the highest task order
	highestOrder, err := s.store.GetHighestTaskOrder(room_name)
	if err != nil {
		return err
	}

	// Create a new MultipleChoice task
	newTask := &types.NumbersTask{
		RoomName:    room_name,
		Name:        add_multiple_req.Name,
		TaskType:    "numbers_task",
		OrderNumber: highestOrder + 1,
		Text:        add_multiple_req.Text,
		MinNum:      add_multiple_req.MinNum,
		MaxNum:      add_multiple_req.MaxNum,
		Answers:     []types.Answer{},
	}

	// Save the new task to the database
	if err := s.store.AddNumbersTask(newTask); err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, "Successfully added a task")
}
func (s *APIServer) HandleAddShortTask(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	if username != "Admin" {
		return WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
	}
	add_multiple_req := new(types.AddShortTask)
	if err := json.NewDecoder(r.Body).Decode(add_multiple_req); err != nil {
		return err
	}

	// Get the highest task order
	highestOrder, err := s.store.GetHighestTaskOrder(room_name)
	if err != nil {
		return err
	}

	// Create a new MultipleChoice task
	newTask := &types.ShortTask{
		RoomName:             room_name,
		Name:                 add_multiple_req.Name,
		TaskType:             "short_task",
		OrderNumber:          highestOrder + 1,
		Text:                 add_multiple_req.Text,
		MaxCharactersAllowed: add_multiple_req.MaxCharactersAllowed,
		Answers:              []types.Answer{},
	}

	// Save the new task to the database
	if err := s.store.AddShortTask(newTask); err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, "Successfully added a task")
}
func (s *APIServer) HandleAddDescription(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	if username != "Admin" {
		return WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
	}
	add_multiple_req := new(types.AddDescription)
	if err := json.NewDecoder(r.Body).Decode(add_multiple_req); err != nil {
		return err
	}

	// Get the highest task order
	highestOrder, err := s.store.GetHighestTaskOrder(room_name)
	if err != nil {
		return err
	}

	// Create a new MultipleChoice task
	newTask := &types.Description{
		RoomName:    room_name,
		Text:        add_multiple_req.Text,
		TaskType:    "description",
		OrderNumber: highestOrder + 1,
	}

	// Save the new task to the database
	if err := s.store.AddDescription(newTask); err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, "Successfully added a task")
}
func (s *APIServer) HandleAddMapTask(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	if username != "Admin" {
		return WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
	}
	add_multiple_req := new(types.AddMapTask)
	if err := json.NewDecoder(r.Body).Decode(add_multiple_req); err != nil {
		return err
	}

	// Get the highest task order
	highestOrder, err := s.store.GetHighestTaskOrder(room_name)
	if err != nil {
		return err
	}

	// Create a new MultipleChoice task
	newTask := &types.MapTask{
		RoomName:    room_name,
		Name:        add_multiple_req.Name,
		TaskType:    "map_task",
		OrderNumber: highestOrder + 1,
		Text:        add_multiple_req.Text,
		AddMark:     add_multiple_req.AddMark,
		CoordX:      add_multiple_req.CoordX,
		CoordY:      add_multiple_req.CoordY,
		Answers:     []types.Answer{},
	}

	// Save the new task to the database
	if err := s.store.AddMapTask(newTask); err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, "Successfully added a task")
}
func (s *APIServer) HandleAddTableTask(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	if username != "Admin" {
		return WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
	}
	add_multiple_req := new(types.AddTableTask)
	if err := json.NewDecoder(r.Body).Decode(add_multiple_req); err != nil {
		return err
	}

	// Get the highest task order
	highestOrder, err := s.store.GetHighestTaskOrder(room_name)
	if err != nil {
		return err
	}

	// Create a new MultipleChoice task
	newTask := &types.TableTask{
		RoomName:          room_name,
		Name:              add_multiple_req.Name,
		TaskType:          "table_task",
		Text:              add_multiple_req.Text,
		OrderNumber:       highestOrder + 1,
		Columns:           add_multiple_req.Columns,
		Rows:              add_multiple_req.Rows,
		ShowGraf:          add_multiple_req.ShowGraf,
		AllowAddingOfRows: add_multiple_req.AllowAddingOfRows,
		NewRowName:        add_multiple_req.NewRowName,
		Answers:           []types.Answer{},
	}

	// Save the new task to the database
	if err := s.store.AddTableTask(newTask); err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, "Successfully added a task")
}

func (s *APIServer) HandleGiveAnswer(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	answersReq := new([]types.GiveAnswer)
	if err := json.NewDecoder(r.Body).Decode(answersReq); err != nil {
		return err
	}
	log.Println(answersReq)

	for _, answerReq := range *answersReq {
		taskID := answerReq.ID

		// Get the task by ID
		task, collectionName, err := s.store.GetTaskByID(taskID)
		if err != nil {
			log.Println(err)
			return WriteJSON(w, http.StatusInternalServerError, err)
		}
		if task == nil {
			log.Printf("No task found with id %s", taskID.Hex())
			continue
		}

		// Update the task with the answer
		err = s.store.UpdateTaskWithAnswer(collectionName, task, username, answerReq.Answer)
		if err != nil {
			log.Println(err)
			return WriteJSON(w, http.StatusInternalServerError, err)
		}
	}

	return WriteJSON(w, http.StatusOK, "Added all answers")
}

func (s *APIServer) HandleDeleteTask(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	if r.Method != http.MethodDelete {
		return WriteJSON(w, http.StatusMethodNotAllowed, "Invalid request method")
	}
	deleteReq := new(types.Delete)
	if err := json.NewDecoder(r.Body).Decode(deleteReq); err != nil {
		return err
	}

	taskID := deleteReq.ID

	// Get the task by ID
	_, collectionName, err := s.store.GetTaskByID(taskID)
	if err != nil {
		log.Println(err)
		return WriteJSON(w, http.StatusInternalServerError, err)
	}

	// Update the task with the answer
	err = s.store.DeleteTask(collectionName, taskID)
	if err != nil {
		log.Println(err)
		return WriteJSON(w, http.StatusInternalServerError, err)
	}

	return WriteJSON(w, http.StatusOK, "Task successfully deleted!")
}

func (s *APIServer) HandleEditMultipleChoice(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	if r.Method != http.MethodPut {
		return WriteJSON(w, http.StatusMethodNotAllowed, "Invalid request method")
	}
	if username != "Admin" {
		return WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
	}
	edit_multiple_req := new(types.EditMultipleChoice)
	if err := json.NewDecoder(r.Body).Decode(edit_multiple_req); err != nil {
		return err
	}

	// Create a new MultipleChoice task
	task := &types.MultipleChoice{
		ID:              edit_multiple_req.ID,
		RoomName:        room_name,
		Name:            edit_multiple_req.Name,
		TaskType:        "multichoice",
		OrderNumber:     edit_multiple_req.OrderNumber,
		MultipleAnswers: edit_multiple_req.MultipleAnswers,
		Text:            edit_multiple_req.Text,
		Options:         edit_multiple_req.Options,
		Answers:         []types.Answer{},
	}
	err_update := s.store.UpdateMultipleChoice(*task)
	if err_update != nil {
		return WriteJSON(w, http.StatusInternalServerError, err_update.Error())
	}

	return WriteJSON(w, http.StatusOK, "Successfully edited a task")
}
func (s *APIServer) HandleEditShortTask(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	if r.Method != http.MethodPut {
		return WriteJSON(w, http.StatusMethodNotAllowed, "Invalid request method")
	}
	if username != "Admin" {
		return WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
	}
	edit_short_req := new(types.EditShortTask)
	if err := json.NewDecoder(r.Body).Decode(edit_short_req); err != nil {
		return err
	}

	// Create a new ShortTask
	task := &types.ShortTask{
		ID:                   edit_short_req.ID,
		RoomName:             room_name,
		Name:                 edit_short_req.Name,
		TaskType:             "short_task",
		OrderNumber:          edit_short_req.OrderNumber,
		Text:                 edit_short_req.Text,
		MaxCharactersAllowed: edit_short_req.MaxCharactersAllowed,
		Answers:              []types.Answer{},
	}
	err_update := s.store.UpdateShortTask(*task)
	if err_update != nil {
		return WriteJSON(w, http.StatusInternalServerError, err_update.Error())
	}

	return WriteJSON(w, http.StatusOK, "Successfully edited a task")
}
func (s *APIServer) HandleEditDescription(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	if r.Method != http.MethodPut {
		return WriteJSON(w, http.StatusMethodNotAllowed, "Invalid request method")
	}
	if username != "Admin" {
		return WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
	}
	edit_description_req := new(types.EditDescription)
	if err := json.NewDecoder(r.Body).Decode(edit_description_req); err != nil {
		return err
	}

	// Create a new DescriptionTask
	task := &types.Description{
		ID:          edit_description_req.ID,
		RoomName:    room_name,
		Text:        edit_description_req.Text,
		TaskType:    "description",
		OrderNumber: edit_description_req.OrderNumber,
		Answers:     []types.Answer{},
	}
	err_update := s.store.UpdateDescription(*task)
	if err_update != nil {
		return WriteJSON(w, http.StatusInternalServerError, err_update.Error())
	}

	return WriteJSON(w, http.StatusOK, "Successfully edited a task")
}

func (s *APIServer) HandleEditTableTask(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	if r.Method != http.MethodPut {
		return WriteJSON(w, http.StatusMethodNotAllowed, "Invalid request method")
	}
	if username != "Admin" {
		return WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
	}
	edit_table_req := new(types.EditTableTask)
	if err := json.NewDecoder(r.Body).Decode(edit_table_req); err != nil {
		return err
	}

	// Create a new TableTask
	task := &types.TableTask{
		ID:                edit_table_req.ID,
		RoomName:          room_name,
		Name:              edit_table_req.Name,
		Text:              edit_table_req.Text,
		TaskType:          "table_task",
		OrderNumber:       edit_table_req.OrderNumber,
		Columns:           edit_table_req.Columns,
		Rows:              edit_table_req.Rows,
		ShowGraf:          edit_table_req.ShowGraf,
		AllowAddingOfRows: edit_table_req.AllowAddingOfRows,
		NewRowName:        edit_table_req.NewRowName,
		Answers:           []types.Answer{},
	}
	err_update := s.store.UpdateTableTask(*task)
	if err_update != nil {
		return WriteJSON(w, http.StatusInternalServerError, err_update.Error())
	}

	return WriteJSON(w, http.StatusOK, "Successfully edited a task")
}

func (s *APIServer) HandleEditMapTask(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	if r.Method != http.MethodPut {
		return WriteJSON(w, http.StatusMethodNotAllowed, "Invalid request method")
	}
	if username != "Admin" {
		return WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
	}
	edit_map_req := new(types.EditMapTask)
	if err := json.NewDecoder(r.Body).Decode(edit_map_req); err != nil {
		return err
	}

	// Create a new MapTask
	task := &types.MapTask{
		ID:          edit_map_req.ID,
		RoomName:    room_name,
		Name:        edit_map_req.Name,
		TaskType:    "map_task",
		OrderNumber: edit_map_req.OrderNumber,
		Text:        edit_map_req.Text,
		AddMark:     edit_map_req.AddMark,
		CoordX:      edit_map_req.CoordX,
		CoordY:      edit_map_req.CoordY,
		Answers:     []types.Answer{},
	}
	err_update := s.store.UpdateMapTask(*task)
	if err_update != nil {
		return WriteJSON(w, http.StatusInternalServerError, err_update.Error())
	}

	return WriteJSON(w, http.StatusOK, "Successfully edited a task")
}
func (s *APIServer) HandleEditNumbersTask(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	if r.Method != http.MethodPut {
		return WriteJSON(w, http.StatusMethodNotAllowed, "Invalid request method")
	}
	if username != "Admin" {
		return WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
	}
	edit_numbers_req := new(types.EditNumbersTask)
	if err := json.NewDecoder(r.Body).Decode(edit_numbers_req); err != nil {
		return err
	}

	// Create a new NumbersTask
	task := &types.NumbersTask{
		ID:          edit_numbers_req.ID,
		RoomName:    room_name,
		Name:        edit_numbers_req.Name,
		TaskType:    "numbers_task",
		OrderNumber: edit_numbers_req.OrderNumber,
		Text:        edit_numbers_req.Text,
		MinNum:      edit_numbers_req.MinNum,
		MaxNum:      edit_numbers_req.MaxNum,
		Answers:     []types.Answer{},
	}
	err_update := s.store.UpdateNumbersTask(*task)
	if err_update != nil {
		return WriteJSON(w, http.StatusInternalServerError, err_update.Error())
	}

	return WriteJSON(w, http.StatusOK, "Successfully edited a task")
}

// GPX task

// Add gpx task
func (s *APIServer) HandleAddMapTaskGpx(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	if username != "Admin" {
		return WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
	}

	add_gpx_req := new(types.AddMapTaskGpx)
	if err := json.NewDecoder(r.Body).Decode(add_gpx_req); err != nil {
		return err
	}

	// Get the highest task order
	highestOrder, err := s.store.GetHighestTaskOrder(room_name)
	if err != nil {
		return err
	}

	// Read and encode GPX file
	//gpxFile, err := io.ReadAll(r.Body)
	//if err != nil {
	//	return err
	//}

	// Create a new MapTaskGpx
	newTask := &types.MapTaskGpx{
		RoomName:    room_name,
		Name:        add_gpx_req.Name,
		TaskType:    "map_task_gpx",
		OrderNumber: highestOrder + 1,
		Text:        add_gpx_req.Text,
		Answers:     []types.Answer{},
	}

	// Save the new task to the database
	if err := s.store.AddMapTaskGpx(newTask); err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, "Successfully added a GPX task")
}

func (s *APIServer) HandleEditMapTaskGpx(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	if r.Method != http.MethodPut {
		return WriteJSON(w, http.StatusMethodNotAllowed, "Invalid request method")
	}
	if username != "Admin" {
		return WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
	}
	edit_map_gpx_req := new(types.EditMapTaskGpx)
	if err := json.NewDecoder(r.Body).Decode(edit_map_gpx_req); err != nil {
		return err
	}

	// Create a new MapTaskGpx
	task := &types.MapTaskGpx{
		ID:          edit_map_gpx_req.ID,
		RoomName:    room_name,
		Name:        edit_map_gpx_req.Name,
		TaskType:    "map_task_gpx",
		OrderNumber: edit_map_gpx_req.OrderNumber,
		Text:        edit_map_gpx_req.Text,
		Answers:     []types.Answer{},
	}

	err_update := s.store.UpdateMapTaskGpx(*task)
	if err_update != nil {
		return WriteJSON(w, http.StatusInternalServerError, err_update.Error())
	}

	return WriteJSON(w, http.StatusOK, "Successfully edited a GPX task")
}

func (s *APIServer) HandleUpdateTaskOrder(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	if username != "Admin" {
		return WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
	}
	newOrdersReq := new([]types.NewOrderNumber)
	if err := json.NewDecoder(r.Body).Decode(newOrdersReq); err != nil {
		return WriteJSON(w, http.StatusBadRequest, err)
	}

	for _, newOrderReq := range *newOrdersReq {
		taskID := newOrderReq.ID
		log.Println("Uso sam unutra s %d", taskID)

		// Get the task by ID
		task, collectionName, err := s.store.GetTaskByID(taskID)
		if err != nil {
			log.Println(err)
			return WriteJSON(w, http.StatusInternalServerError, err)
		}
		if task == nil {
			log.Printf("No task found with id %s", taskID.Hex())
			continue
		}

		// Update the task with the new order number
		err = s.store.UpdateTaskWithNewOrder(collectionName, task, newOrderReq.OrderNumber)
		if err != nil {
			log.Println(err)
			return WriteJSON(w, http.StatusInternalServerError, err)
		}
	}

	return WriteJSON(w, http.StatusOK, "Order number of task changed successfully")
}

func (s *APIServer) HandleEditAnswers(w http.ResponseWriter, r *http.Request, room_name string, username string) error {
	if username != "Admin" {
		return WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
	}
	newAnswers := new(types.EditAnswers)
	if err := json.NewDecoder(r.Body).Decode(newAnswers); err != nil {
		return WriteJSON(w, http.StatusBadRequest, err)
	}

	objectID, err := primitive.ObjectIDFromHex(newAnswers.ID)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, "Invalid ID format")
	}

	// Get the task by ID
	task, collectionName, err := s.store.GetTaskByID(objectID)
	if err != nil {
		log.Println(err)
		return WriteJSON(w, http.StatusInternalServerError, err)
	}
	if task == nil {
		log.Printf("No task found with id %s", &newAnswers.ID)
		return WriteJSON(w, http.StatusBadRequest, "You provided id that doesn't exist")
	}

	// Update the task with the answer
	err = s.store.UpdateTaskAnswers(collectionName, task, newAnswers.Answers)
	if err != nil {
		log.Println(err)
		return WriteJSON(w, http.StatusInternalServerError, err)
	}

	return WriteJSON(w, http.StatusOK, "Answers successfully changed!")
}
