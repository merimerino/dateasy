package handlers

import (
	"net/http"
	"sort"
	"log"

	types "backend/types"
)


// func (s *APIServer) HandleMultipleChoice(w http.ResponseWriter, r *http.Request) error {
// 	log.Println("Tu sam dosao")
// 	if r.Method == "GET" {
// 		return s.handleGetMultipleChoiceTasks(w, r)
// 	}
// 	//if r.Method == "POST" {
// 	//	return s.handleCreateAccount(w, r)
// 	//}

// 	return fmt.Errorf("method now allowed %s ", r.Method)
// }

// func (s *APIServer) HandleShortTask(w http.ResponseWriter, r *http.Request) error {
// 	log.Println("Tu sam dosao")
// 	if r.Method == "GET" {
// 		return s.handleGetShortTasks(w, r)
// 	}
// 	//if r.Method == "POST" {
// 	//	return s.handleCreateAccount(w, r)
// 	//}

// 	return fmt.Errorf("method now allowed %s ", r.Method)
// }

// func (s *APIServer) HandleNumberTasks(w http.ResponseWriter, r *http.Request) error {
// 	log.Println("Tu sam dosao")
// 	if r.Method == "GET" {
// 		return s.handleGetNumberTasks(w, r)
// 	}
// 	//if r.Method == "POST" {
// 	//	return s.handleCreateAccount(w, r)
// 	//}

// 	return fmt.Errorf("method now allowed %s ", r.Method)
// }

// func (s *APIServer) HandleMapTasks(w http.ResponseWriter, r *http.Request) error {
// 	log.Println("Tu sam dosao")
// 	if r.Method == "GET" {
// 		return s.handleGetMapTasks(w, r)
// 	}
// 	//if r.Method == "POST" {
// 	//	return s.handleCreateAccount(w, r)
// 	//}

// 	return fmt.Errorf("method now allowed %s ", r.Method)
// }

// func (s *APIServer) HandleTableTasks(w http.ResponseWriter, r *http.Request) error {
// 	log.Println("Tu sam dosao")
// 	if r.Method == "GET" {
// 		return s.handleGetTableTasks(w, r)
// 	}
// 	//if r.Method == "POST" {
// 	//	return s.handleCreateAccount(w, r)
// 	//}

// 	return fmt.Errorf("method now allowed %s ", r.Method)
// }

// func (s *APIServer) HandleDescriptions(w http.ResponseWriter, r *http.Request) error {
// 	log.Println("Tu sam dosao")
// 	if r.Method == "GET" {
// 		return s.handleGetDescription(w, r)
// 	}
// 	//if r.Method == "POST" {
// 	//	return s.handleCreateAccount(w, r)
// 	//}

// 	return fmt.Errorf("method now allowed %s ", r.Method)
// }


// func (s *APIServer) handleGetMultipleChoiceTasks(w http.ResponseWriter, r *http.Request) error {
// 	tasks, err := s.store.GetMultipleChoiceTasks()

// 	if err != nil {
// 		return err
// 	}
// 	log.Println("Vracam", len(tasks), "zadaka")

// 	return WriteJSON(w, http.StatusOK, tasks)
// }


// func (s *APIServer) handleGetShortTasks(w http.ResponseWriter, r *http.Request) error {
// 	tasks, err := s.store.GetShortTasks()

// 	if err != nil {
// 		return err
// 	}
// 	log.Println("Vracam", len(tasks), "zadaka")

// 	return WriteJSON(w, http.StatusOK, tasks)
// }
// func (s *APIServer) handleGetNumberTasks(w http.ResponseWriter, r *http.Request) error {
// 	tasks, err := s.store.GetNumberTasks()

// 	if err != nil {
// 		return err
// 	}
// 	log.Println("Vracam", len(tasks), "zadaka")

// 	return WriteJSON(w, http.StatusOK, tasks)
// }
// func (s *APIServer) handleGetMapTasks(w http.ResponseWriter, r *http.Request) error {
// 	tasks, err := s.store.GetMapTasks()

// 	if err != nil {
// 		return err
// 	}
// 	log.Println("Vracam", len(tasks), "zadaka")

// 	return WriteJSON(w, http.StatusOK, tasks)
// }
// func (s *APIServer) handleGetDescription(w http.ResponseWriter, r *http.Request) error {
// 	tasks, err := s.store.GetDescriptions()

// 	if err != nil {
// 		return err
// 	}
// 	log.Println("Vracam", len(tasks), "zadaka")

// 	return WriteJSON(w, http.StatusOK, tasks)
// }
// func (s *APIServer) handleGetTableTasks(w http.ResponseWriter, r *http.Request) error {
// 	tasks, err := s.store.GetTableTasks()

// 	if err != nil {
// 		return err
// 	}
// 	log.Println("Vracam", len(tasks), "zadaka")

// 	return WriteJSON(w, http.StatusOK, tasks)
// }
/*
func (s *APIServer) HandleGetAllTasks(w http.ResponseWriter, r *http.Request, room_name string) error {
	tasks := make(map[string]interface{})

	multipleChoiceTasks, err := s.store.GetMultipleChoiceTasks(room_name)
	if err != nil {
		return WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to retrieve multiple choice tasks"})
	}
	tasks["multiple_choice"] = multipleChoiceTasks

	shortTasks, err := s.store.GetShortTasks(room_name)
	if err != nil {
		return WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to retrieve short tasks"})
	}
	tasks["short_tasks"] = shortTasks

	numberTasks, err := s.store.GetNumberTasks(room_name)
	if err != nil {
		return WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to retrieve number tasks"})
	}
	tasks["number_tasks"] = numberTasks

	mapTasks, err := s.store.GetMapTasks(room_name)
	if err != nil {
		return WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to retrieve map tasks"})
	}
	tasks["map_tasks"] = mapTasks

	descriptions, err := s.store.GetDescriptions(room_name)
	if err != nil {
		return WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to retrieve descriptions"})
	}
	tasks["descriptions"] = descriptions

	tableTasks, err := s.store.GetTableTasks(room_name)
	if err != nil {
		return WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to retrieve table tasks"})
	}
	tasks["table_tasks"] = tableTasks

	return WriteJSON(w, http.StatusOK, tasks)
}
*/
type SortedTasks []types.Task

func (s SortedTasks) Len() int           { return len(s) }
func (s SortedTasks) Less(i, j int) bool { return s[i].OrderNumberField() < s[j].OrderNumberField() }
func (s SortedTasks) Swap(i, j int)      { s[i], s[j] = s[j], s[i] }

func (s *APIServer) HandleGetAllTasks(w http.ResponseWriter, r *http.Request, room_name string) error {
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