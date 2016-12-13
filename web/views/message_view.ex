defmodule ReduxChatWarthog.MessageView do
  use ReduxChatWarthog.Web, :view

  def render("index.json", %{channels: channels}) do
    render_many(channels, ReduxChatWarthog.MessageView, "message.json")
  end

  def render("show.json", %{message: message}) do
    %{
      channel: message.channel.name,
      id: message.id,
      user: message.user.username,
      content: message.content
     }
  end

  def render("message.json", %{message: channel}) do
    messages = for m <- channel.messages do
      %{
        id: m.id,
        user: m.user.username,
        content: m.content
      }
    end
    %{name: channel.name,
     messages: messages
    }
  end
end
