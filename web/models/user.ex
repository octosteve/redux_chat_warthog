defmodule ReduxChatWarthog.User do
  use ReduxChatWarthog.Web, :model

  schema "users" do
    field :username, :string
    has_many :messages, ReduxChatWarthog.Message

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:username])
    |> validate_required([:username])
  end
end
