package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/maan0017/movie-streaming-app/server/stream-movies-server/controllers"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

func AuthRoutes(router *gin.Engine, client *mongo.Client) {
	// these routes don't require any middlewares...
	router.POST("/login", controllers.LoginUser(client))
	router.POST("/register", controllers.RegisterUser(client))
	router.POST("/logout", controllers.LogoutHandler(client))
}
