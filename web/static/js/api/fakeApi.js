export default {
  getAllMessages(){
    let payload = [
      {
        name: "General",
        messages: [ { 
            id: 1,
            user: "StevenNunez",
            content: "I Love Programming"
          }
        ]
      },
      {
        name: "React",
          messages: [
            { 
              id: 2,
              user: "StevenNunez",
              content: "Why are forms so hard?"
            }
          ]
      }
    ]

    return new Promise((resolve, reject) => {
      setTimeout(function(){
        promise.resolve(payload)
      }, 1000)
    })
  }
}
