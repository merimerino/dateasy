package main

import (
	"log"

	"backend/handlers"
	"backend/storage"
)

func main() {
	store, err := storage.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}
	defer store.Close()

	if err := store.Init(); err != nil {
		log.Fatal(err)
	}
	server := handlers.NewAPIServer(":3000", store)
	server.Run()
}