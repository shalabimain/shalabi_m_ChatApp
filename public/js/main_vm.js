import ChatMessage from './modules/ChatMessage.js';

const socket =io();

function setUserId({sID, message}) {
    console.log('connected', sID, message);
    vm.socketID = sID;
}


function appenedMessage(message){
    vm.messages.push(message);
}



const vm = new Vue ({
    data: {
        connectedUsers: [],
        socketID: "",
        nickname: "",
        message:"",
        messages: [],
    },

    created: function (){
socket.on('user joined', function (socketId){
    this.connectedUsers.push(socketId);

    }.bind(this));
    },

methods:{
    dispatchMessage (){
        //send a chat message 
        socket.emit('chat message', { content :this.message, name: this.nickname || "Anonymous"} );

        this.message="";
        }
}, 
components:{
    newmessage: ChatMessage
}

}).$mount("#app");


socket.addEventListener('connected', setUserId);
socket.addEventListener('chat message', appenedMessage);
socket.addEventListener ('disconnect', appenedMessage);
socket.addEventListener ('disconnect', appenedMessage);


