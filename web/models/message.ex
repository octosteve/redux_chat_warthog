defmodule ReduxChatWarthog.Message do
  use ReduxChatWarthog.Web, :model

  schema "messages" do
    field :content, :string
    belongs_to :user, ReduxChatWarthog.User
    belongs_to :channel, ReduxChatWarthog.Channel

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:content])
    |> validate_required([:content])
  end
end
