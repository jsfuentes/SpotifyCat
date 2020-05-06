defmodule SsWeb.RoomChannel do
  use Phoenix.Channel
  alias SsWeb.Presence

  def join("room:lobby", _message, socket) do
    send(self(), :after_join)
    {:ok, :hiii, socket}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_info(:after_join, socket) do
    IO.puts "HANDLE INFO"
    {:ok, _} = Presence.track(socket, socket.assigns.user_id, %{
      online_at: inspect(System.system_time(:second)),
      user_id: socket.assigns.user_id
    })

    push(socket, "presence_state", Presence.list(socket))
    {:noreply, socket}
  end

  def handle_in("new_msg", %{"body" => body}, socket) do
    broadcast!(socket, "new_msg", %{body: body})
    if body === "tick" do
      IO.puts "BITCH"
      IO.puts "Start it"
    end
    {:noreply, socket}
  end
end