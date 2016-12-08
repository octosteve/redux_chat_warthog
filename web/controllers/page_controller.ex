defmodule ReduxChatWarthog.PageController do
  use ReduxChatWarthog.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
