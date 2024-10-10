const { WebSocketServer } = require("ws");

const sockserver = new WebSocketServer({ port: 3000 });
// 터미널에 node main.js 작성시 터미널 창에 뜨는 로그
console.log("socket server 구동 : 3000");

let msgId = 0;

sockserver.on("connection", (ws) => {
  console.log("New client connected!");
  ws.send(
    JSON.stringify({
      gubun: "connect",
      msg: "서버와 접속에 성공했습니다.!",
      state: "ok",
    })
  );
  ws.on("close", () => console.log("Client has disconnected!"));
  ws.on("message", (data) => {
    let receiveObj = JSON.parse(data);
    if (receiveObj.gubun == "msg") {
      receiveObj.msgId = ++msgId; // 🚨 이제는 프론트가 아닌, 서버사이드에서 msgId 추가해줘야 함!
    }
    let sendStr = JSON.stringify(receiveObj);
    // 현재 연결된 모든 유저에게 send message
    sockserver.clients.forEach((client) => {
      console.log(`send message: ${sendStr}`);
      client.send(`${sendStr}`);
    });
  });
  ws.onerror = function () {
    console.log("websocket error");
  };
});
