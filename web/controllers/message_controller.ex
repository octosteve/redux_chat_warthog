defmodule ReduxChatWarthog.MessageController do
  use ReduxChatWarthog.Web, :controller

  alias ReduxChatWarthog.{ Message, Channel, User}

  def index(conn, _params) do
    channels = Repo.all(Channel) 
    grouped_channels = for c <- channels, do: c |> Repo.preload(:messages) |> Repo.preload(:users)
    render(conn, "index.json", channels: grouped_channels)
  end

  def create(conn, %{"message" => %{"channel" => channel_name, "user" => username, "content" => content}}) do
    user = case Repo.get_by(User, username: username) do
      nil ->
        %User{username: username} |> Repo.insert!
      u -> u
    end

    channel = case Repo.get_by(Channel, name: channel_name) do
      nil ->
        %Channel{name: channel_name} |> Repo.insert!
      c -> c
    end

    message = Ecto.build_assoc(channel, :messages, user: user)

    changeset = Message.changeset(message, %{"content" => content})

    case Repo.insert(changeset) do
      {:ok, message} ->
        message = message |> Repo.preload(:channel) |> Repo.preload(:user)
        ReduxChatWarthog.Endpoint.broadcast("chat:#{channel_name}", "new_message", ReduxChatWarthog.MessageView.render("show.json", %{message: message}))
        conn
        |> put_status(:created)
        |> put_resp_header("location", message_path(conn, :show, message))
        |> render("show.json", message: message)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(ReduxChatWarthog.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    message = Repo.get!(Message, id) |> Repo.preload(:user) |> Repo.preload(:channel)
    render(conn, "show.json", message: message)
  end

  def update(conn, %{"id" => id, "message" => message_params}) do
    message = Repo.get!(Message, id)
    changeset = Message.changeset(message, message_params)

    case Repo.update(changeset) do
      {:ok, message} ->
        render(conn, "show.json", message: message)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(ReduxChatWarthog.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    message = Repo.get!(Message, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(message)

    send_resp(conn, :no_content, "")
  end
end
