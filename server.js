// /////server js
 const http=require("http")
 const app=require("./app")
 
 
  const port=process.env.port||2000
  
 

  const server=http.createServer(app)
// //Socket Logic
 const io = require('socket.io')(server);
 io.on('connection', socket => {
  
  chatID =  socket.handshake.query['chatRoomId']; 
  console.log("newchat")
  console.log("chat id is"+ chatID);
socket.join(chatID)
  console.log(socket.id)
   
  //Leave the room if the user closes the socket
  socket.on('disconnect', () => {
    console.log("leaved chating");
      socket.leave(chatID)
      
       
      
       
      
  })
  
  //Send message to only a particular user
  socket.on('sendmessage', async message => {

      receiverChatID = message.rid
      senderChatID = message.sid
      content = message.message
      console.log("rec id:"+receiverChatID)
      //Send message to only that particular roo
     var tf=[receiverChatID,senderChatID]

for(x in tf){
  console.log(tf[x])
  io.to(tf[x]).emit('recievemessage', {
          'message': content,
          'sid': senderChatID,
          'rid':receiverChatID,
      })
}


      
  })
  
});
  server.listen(port)
  console.log(port)
