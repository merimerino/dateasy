package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"sort"

	types "backend/types"
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
		log.Println("HEJ")
		log.Println(task.OrderNumber)
		log.Println(task.TaskType)
		log.Println("HEJ")
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
		Description: add_multiple_req.Description,
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
		OrderNumber:       highestOrder + 1,
		Columns:           add_multiple_req.Columns,
		Rows:              add_multiple_req.Rows,
		ShowGraf:          add_multiple_req.ShowGraf,
		AllowAddingOfRows: add_multiple_req.AllowAddingOfRows,
		NewRowName:        add_multiple_req.NewRowName,
	}

	// Save the new task to the database
	if err := s.store.AddTableTask(newTask); err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, "Successfully added a task")
}
