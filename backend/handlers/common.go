package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"fmt"
	"time"

	"backend/storage"
	"github.com/gorilla/mux"
	"github.com/golang-jwt/jwt/v5"
)

type APIServer struct {
	listenAddr string
	store      storage.Storage
}

func WriteJSON(w http.ResponseWriter, status int, v any) error {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(v)
}

type ApiError struct {
	Error string `json:"error"`
}

func permissionDenied(w http.ResponseWriter) {
	WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
}

func NewAPIServer(listenAddr string, store storage.Storage) *APIServer {
	return &APIServer{
		listenAddr: listenAddr,
		store:      store,
	}
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, x-jwt-token")

		// Handle preflight (OPTIONS) request
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func (s *APIServer) Run() {
	router := mux.NewRouter()
	router.Use(corsMiddleware)

	router.HandleFunc("/createRoom", makeHTTPHandleFunc(s.HandleCreateRoom))
	router.HandleFunc("/joinAsStudent", makeHTTPHandleFunc(s.HandleJoinAsStudent))
	router.HandleFunc("/joinAsAdmin", makeHTTPHandleFunc(s.HandleJoinAsAdmin))

	router.HandleFunc("/tasks", withJWTAuth(s.HandleGetAllTasks))
	//router.HandleFunc("/multichoices", withJWTAuth(makeHTTPHandleFunc(s.HandleMultipleChoice)))
	//router.HandleFunc("/shortTasks", withJWTAuth(makeHTTPHandleFunc(s.HandleShortTask)))
	//router.HandleFunc("/descriptions", withJWTAuth(makeHTTPHandleFunc(s.HandleDescriptions)))
	//router.HandleFunc("/tabletasks", withJWTAuth(makeHTTPHandleFunc(s.HandleTableTasks)))
	//router.HandleFunc("/maptasks", withJWTAuth(makeHTTPHandleFunc(s.HandleMapTasks)))
	//router.HandleFunc("/numbertasks", withJWTAuth(makeHTTPHandleFunc(s.HandleNumberTasks)))
    //http.HandleFunc("/shortTasks", getShortTasks)
    //http.HandleFunc("/descriptions", getDescriptions)
    //http.HandleFunc("/tabletasks", getTableTasks)
    //http.HandleFunc("/maptasks", getMapTasks)
    //http.HandleFunc("/numbertasks", getNumbersTasks)

	log.Println("JSON API server running on port: ", s.listenAddr)
	http.ListenAndServe(s.listenAddr, router)
}

type apiFunc func(http.ResponseWriter, *http.Request) error
type newApiFunc func(http.ResponseWriter, *http.Request, string) error


func makeHTTPHandleFunc(f apiFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := f(w, r); err != nil {
			WriteJSON(w, http.StatusBadRequest, ApiError{Error: err.Error()})
		}
	}
}

func withJWTAuth(f newApiFunc) http.HandlerFunc {
	// Tu stavit da handleFunc prima i od tokena username ili room_name sta vec treba da odradi svoj posao
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Calling jwt auth middleware")
		tokenString := r.Header.Get("x-jwt-token")
		token, err := validateJWT(tokenString)
		if err != nil {
			permissionDenied(w)
			return
		}
		if !token.Valid {
			permissionDenied(w)
			return
		}
		claims := token.Claims.(jwt.MapClaims)

		roomName, ok := claims["room_name"].(string)
		if !ok || roomName == "" {
			permissionDenied(w)
			return
		}
		f(w, r, roomName)
	}
}


func validateJWT(tokenString string) (*jwt.Token, error) {
	secret := "My BIG SECRET"
	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})
}

func createJWT(customClaims map[string]interface{}) (string, error) {
	expirationTime := time.Now().Add(5 * time.Hour).Unix()

	claims := jwt.MapClaims{
		"expiresAt": expirationTime,
	}
	for key, value := range customClaims {
		claims[key] = value
	}

	secret := "My BIG SECRET"


	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(secret))
}