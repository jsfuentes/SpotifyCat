defmodule SsWeb.PageController do
  use SsWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
