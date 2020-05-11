defmodule ReactPhoenixWeb.Router do
  use ReactPhoenixWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :fetch_cookies
    plug :accepts, ["json"]
  end

  scope "/auth", ReactPhoenixWeb do
    pipe_through :browser

    get "/spotify", SpotifyController, :authorize
    get "/spotify/callback", SpotifyController, :callback
    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
    post "/:provider/callback", AuthController, :callback
  end

  # Other scopes may use custom stacks.
  scope "/api", ReactPhoenixWeb do
    pipe_through :api

    get "/spotify/top", SpotifyController, :top
    get "/", ApiController, :index
    post "/join", ApiController, :join
    resources "/users", UserController, except: [:new, :edit]
  end

  scope "/", ReactPhoenixWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end
end
