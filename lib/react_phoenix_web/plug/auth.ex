defmodule ReactPhoenixWeb.Auth do
  import Plug.Conn
  import Phoenix.Controller
  alias ReactPhoenixWeb.Router.Helpers

  def init(opts), do: opts

  def call(conn, _opts) do
    # user_id = get_session(conn, :user_id)
    # spotify_access = conn.cookies["spotify_access_token"]
    conn
  end

  def logged_in_user(conn = %{assigns: %{current_user: %{}}}, _), do: conn

  def logged_in_user(conn, _opts) do
    conn
    |> put_flash(:error, "You must be logged in to access that page")
    # |> redirect(to: Helpers.page_path(conn, :index))
    |> halt()
  end
end
