package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/maan0017/movie-streaming-app/server/stream-movies-server/controllers"
	"github.com/maan0017/movie-streaming-app/server/stream-movies-server/middlewares"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

func MovieRoutes(router *gin.Engine, client *mongo.Client) {
	router.GET("/movies", controllers.GetMovies(client))
	router.PATCH("/update-review/:imdb_id", controllers.AdminReviewUpdate(client))
	router.GET("/genres", controllers.GetGenres(client))
	router.POST("/refresh", controllers.RefreshTokenHandler(client))

	// protected routes are blow--->
	router.Use(middlewares.AuthMiddleware())
	// movies
	router.GET("/movie/:imdb_id", controllers.GetMovie(client))
	router.POST("/movie", controllers.AddMovie(client))
	router.GET("/recommanded-movies", controllers.GetRecommendedMovies(client))
}
