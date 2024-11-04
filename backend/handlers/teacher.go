package handlers

import (
	"net/http"
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
