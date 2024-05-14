import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  }
});

interface IOnlineUser {
  userId: string
  socketId: string
}

interface IMessagesInTimeReal {
  _id: string
  chatId: string
  senderId: string
  text: string
  createdAt: string
  recipientId: string
}

let onlineUsers: IOnlineUser[] = [];

io.on('connection', (socket) => {
  // console.log('new conection:', socket.id);
  
  socket.on("addNewUser", function(userId: string) {
    console.log('userId:', userId);
    !onlineUsers.some(function(user) {
      return user.userId === userId
    }) && onlineUsers.push({
      userId,
      socketId: socket.id,
    });
    // console.log('onlineUsers:', onlineUsers);
    
    io.emit("getOnlineUsers", onlineUsers);
  });
  
  // ? ADD MESSAGE
  socket.on("sendMessage", function(message: IMessagesInTimeReal) {
    console.log('message:', message);
    const user = onlineUsers.find(function(user) {
      return user.userId === message.recipientId;
    });

    // ! PRIVATE MESSAGE
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  });

  socket.on("disconnect", function() {
    onlineUsers = onlineUsers.filter(function(user) {
      return user.socketId !== socket.id;
    });

    io.emit("getOnlineUsers", onlineUsers);
  })
});

io.listen(3000);