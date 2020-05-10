defmodule ReactPhoenixWeb.SpotifyController do
  use ReactPhoenixWeb, :controller
  def authorize(conn, _params) do
    IO.puts("SPOTIFY AUTHORIAE")
    redirect conn, external: Spotify.Authorization.url
  end

  def callback(conn, params) do
    IO.puts("SPOTIFY CALLBACK")
    case Spotify.Authentication.authenticate(conn, params) do
      {:ok, conn } ->
        IO.puts "AUTHED"
        IO.inspect conn.cookies
        redirect conn, to: "/"
      { :error, reason, conn }-> redirect conn, to: "/error"
    end
  end

  def top(conn, params) do
    limit = Map.get(params, "limit", 1)
    IO.puts "TOP #{limit}"
    conn = fetch_cookies(conn)
    spotify_access = conn.cookies["spotify_access_token"]
    IO.puts "COOKIE#{spotify_access}"
    headers = [
      Accept: "Application/json; Charset=utf-8",
      "Content-Type": "Application/json; charset=utf-8",
      Authorization: "Bearer #{spotify_access}"
    ]
    IO.inspect(headers)

    types = ["artists", "tracks"]
    ranges = ["short_term", "medium_term", "long_term"]
    all_results = Enum.map(types, fn type ->
      range_results = Enum.map(ranges, fn range -> 
        url = "https://api.spotify.com/v1/me/top/#{type}?time_range=#{range}&limit=#{limit}"
        %HTTPoison.Response{status_code: 200, body: rawBody} = HTTPoison.get!(url, headers)
        body = Jason.decode!(rawBody)
        {range, body["items"]}
      end) |>
      Map.new

      {type, range_results}
    end) |>
    Map.new

    IO.inspect(all_results)
    json conn, all_results
  end
end
