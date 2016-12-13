defmodule ReduxChatWarthog.Channel do
  use ReduxChatWarthog.Web, :model

  schema "channels" do
    field :name, :string
    has_many :messages, ReduxChatWarthog.Message
    has_many :users, through: [:messages, :user]

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name])
    |> validate_required([:name])
  end
end
