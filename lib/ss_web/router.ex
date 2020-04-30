defmodule SsWeb.Router do
  use SsWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  # Other scopes may use custom stacks.
  scope "/api", SsWeb do
    pipe_through :api
  end

  scope "/", SsWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end

end
