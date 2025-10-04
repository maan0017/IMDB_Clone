package main

import (
	"context"
	"log"
	"os"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/maan0017/movie-streaming-app/server/stream-movies-server/database"
	"github.com/maan0017/movie-streaming-app/server/stream-movies-server/routes"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

func main() {
	router := gin.Default()

	err := godotenv.Load(".env")
	if err != nil {
		log.Println("Warning: unable to find .env file")
	}

	// Load allowed origins from environment
	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")

	var origins []string
	if allowedOrigins != "" {
		origins = strings.Split(allowedOrigins, ",")
		for i := range origins {
			origins[i] = strings.TrimSpace(origins[i])
			log.Println("Allowed Origin:", origins[i])
		}
	} else {
		origins = []string{"http://localhost:5173", "https://imdb-clone-opal-eta.vercel.app/"}
		log.Println("Allowed Origin: http://localhost:5173")
	}

	origins = append(origins, "https://imdb-clone-opal-eta.vercel.app/")

	// Apply CORS middleware
	router.Use(cors.New(cors.Config{
		AllowOrigins:     origins,
		AllowMethods:     []string{"GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	var client *mongo.Client = database.DbInstance()

	if err := client.Ping(context.Background(), nil); err != nil {
		log.Fatalln("Failed to reach server: ", err.Error())
	}

	defer func() {
		if err := client.Disconnect(context.Background()); err != nil {
			log.Fatalln("Failed to disconnect mongodb: ", err.Error())
		}
	}()

	routes.AuthRoutes(router, client)
	routes.MovieRoutes(router, client)

	if err := router.Run(":8080"); err != nil {
		log.Fatalln("Server Failed.")
	}
}
