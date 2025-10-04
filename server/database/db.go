package database

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func DbInstance() *mongo.Client {
	err := godotenv.Load()
	if err != nil {
		log.Println("Failed to load .env file")
	}

	// MongoDbUri := os.Getenv("MONGO_DB_URI")
	MongoDbUri := os.Getenv("ATLAS_URI")

	if MongoDbUri == "" {
		log.Fatalln("Mongo DB Uri is empty")
	}

	// fmt.Println("Mongo Connection Uri >", MongoDbUri)

	clientOptions := options.Client().ApplyURI(MongoDbUri)

	client, err := mongo.Connect(clientOptions)

	if err != nil {
		log.Fatal("failed to create a mongodb client.")
	}

	return client
}

func OpenCollection(collectionName string, client *mongo.Client) *mongo.Collection {
	err := godotenv.Load()
	if err != nil {
		log.Println("failed to load .env file")
	}

	dbName := os.Getenv("DB_NAME")
	// fmt.Println("DB Name >", dbName)

	collection := client.Database(dbName).Collection(collectionName)

	if collection == nil {
		log.Println("collection is empty")
	}

	return collection
}
