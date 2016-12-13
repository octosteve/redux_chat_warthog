# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     ReduxChatWarthog.Repo.insert!(%ReduxChatWarthog.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias ReduxChatWarthog.{User, Channel, Repo}
jess =   %User{username: "JessRudder"} |> Repo.insert!
steven = %User{username: "StevenNunez"}|> Repo.insert!

general = %Channel{name: "General"}    |> Repo.insert!
random  = %Channel{name: "Random"}     |> Repo.insert!

messages = [{jess, general, "OMG I LOVE TEACHING"}, {steven, general, "Settle Down"}, {steven, random, "WHY IS PROGRAMMING SO HARD?!"}]

for {user, channel, message} <- messages do
  Ecto.build_assoc(user, :messages, content: message, channel: channel) |> Repo.insert!
end

