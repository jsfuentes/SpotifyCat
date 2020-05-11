defmodule ReactPhoenixWeb.SpotifyController do
  use ReactPhoenixWeb, :controller

  def authorize(conn, _params) do
    redirect(conn, external: Spotify.Authorization.url())
  end

  def callback(conn, params) do
    IO.puts("SPOTIFY CALLBACK")

    case Spotify.Authentication.authenticate(conn, params) do
      {:ok, conn} ->
        IO.inspect(conn.cookies)
        redirect(conn, to: "/top")

      {:error, reason, conn} ->
        conn 
        |> put_flash(:error, "Spotify authentication failed: #{reason}")
        |> redirect(to: "/")
    end
  end

  def top(%{cookies: %{"spotify_access_token" => spotify_access}} = conn, params) do
    IO.puts("Cookieee")
    limit = Map.get(params, "limit", 1)
    IO.puts("TOP #{limit} Token #{spotify_access}")

    headers = [
      Accept: "Application/json; Charset=utf-8",
      "Content-Type": "Application/json; charset=utf-8",
      Authorization: "Bearer #{spotify_access}"
    ]

    # ensure the token is active
    case HTTPoison.get("https://api.spotify.com/v1/me", headers) do
      #Valid Token
      {:ok, %HTTPoison.Response{status_code: 200}} ->
        types = ["artists", "tracks"]
        ranges = ["short_term", "medium_term", "long_term"]

        all_results =
          Enum.map(types, fn type ->
            range_results =
              Enum.map(ranges, fn range ->
                url =
                  "https://api.spotify.com/v1/me/top/#{type}?time_range=#{range}&limit=#{limit}"

                %HTTPoison.Response{status_code: 200, body: rawBody} =
                  HTTPoison.get!(url, headers)

                body = Jason.decode!(rawBody)
                {range, body["items"]}
              end)
              |> Map.new()

            {type, range_results}
          end)
          |> Map.new()
          |> IO.inspect()

        json(conn, all_results)

      #Expired Token
      {:ok, %HTTPoison.Response{status_code: 401}} ->
        conn
        |> put_status(401)
        |> text("Expired Spotify Token")

      {:error, %HTTPoison.Error{reason: reason}} ->
        conn
        |> put_status(500)
        |> text(reason)
    end
  end

  def top(conn, _params) do
    IO.puts("No Cookie")
    conn
    |> put_status(401)
    |> text("No Spotify Token")
  end
end
