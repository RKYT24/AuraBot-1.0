let prompt=document.querySelector("#prompt");
let chatContainer=document.querySelector(".chat-container");

function createChatBox(html,classes){
    let div=document.createElement("div");
    div.innerHTML=html;
    div.classList.add(classes);
    return div;
}

function handlechatResponse(message){
    let html=`<img src="./media/User 2.png" alt="User-img" id="user-logo" width="40vh">
                <div class="user-chat-area">
                    <p>${message}</p>
                </div>`;
    let userChatbox=createChatBox(html,"user-chatbox");
chatContainer.appendChild(userChatbox);
}
prompt.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
    // console.log(prompt.value);
    chatResponse(prompt.value);
    prompt.value=" ";
    }
})