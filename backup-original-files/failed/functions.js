function updateDateTime() {
    const now = new Date();
    const currentDateTime = now.toLocaleString();
    console.log(currentDateTime);
    const datetimeElement = document.querySelector('#datetime');
    if (datetimeElement) {
        datetimeElement.textContent = currentDateTime;
    }
}
setInterval(updateDateTime, 1000);

document.addEventListener("DOMContentLoaded", () =>{
    const ChatForm = get(".text-inputarea");
    const InputData = get(".text-input");
    const MainChatBox = get(".main-chat");
    
    const BOT_NAME = "Maia";
    const PERSON_NAME = "You";

    ChatForm.addEventListener("submit", event =>{
        event.preventDefault();
    
        const TextInput = InputData.value;
        if (TextInput.trim() !== "") {
            appendUserMessage(PERSON_NAME, TextInput);
            InputData.value = "";
            showTypingIndicator();
            setTimeout(() => {
                botResponse(TextInput);
            }, 2000);
        }
    });

    function appendUserMessage(name, text){
        const HTMLcode = `
        <div class="flex flex-end items-stretch mb-2.5">
                <div class="flex flex-end gap-3 my-4 text-gray-600 text-sm flex-1">
                    <div class="pr-5 flex justify-between items-center mb-2.5 rounded-full">
                        <p class="leading-relaxed"> ${text}</p>
                        <span class="block font-bold text-gray-700">:${name} </span>                        
                    </div> 
                </div>
                <div class="rounded-full bg-gray-100 border p-1">
                    <svg stroke="none" fill="black" stroke-width="0" viewBox="0 0 16 16" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                    </svg>
                </div>
            </div>`;

    MainChatBox.insertAdjacentHTML("beforeend", HTMLcode);
    MainChatBox.scrollTop += 500;
    }

    function appendBotMessage(name, text){
        
        const HTMLcode = `
        <div class="flex items-stretch mb-2.5">
                <div class="rounded-full bg-gray-100 border p-1">
                    <svg stroke="none" fill="black" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path>
                    </svg>
                </div>
                <div class="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                    <div class="pr-5 flex justify-between items-center mb-2.5 rounded-full">
                        <span class="block font-bold text-gray-700">${name}: </span>
                        <p> </p>
                        <p class="leading-relaxed"> ${text}</p>
                    </div> 
                </div>
            </div>`;

    MainChatBox.insertAdjacentHTML("beforeend", HTMLcode);
    MainChatBox.scrollTop += 500;
    }

    function showTypingIndicator() {
        const typingHTML = `
        <div class="typing-indicator" id="typing-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>`;
        MainChatBox.insertAdjacentHTML("beforeend", typingHTML);
        MainChatBox.scrollTop += 50;
    }

    function removeTypingIndicator() {
        const typingIndicator = document.querySelector("#typing-indicator");
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function botResponse(rawText){
        $.get("/get", { text: rawText }).done(function (data) {
            let botResponse = data.response;
            appendBotMessage(BOT_NAME, botResponse);
            
        });
    }

    function get(selector, root = document) {
        return root.querySelector(selector);
    }

    function formatDate(date){
        const hours = "0" + date.getHours();
        const mins = "0" + date.getMinutes();
        return `${hours.slice(-2)}:${mins.slice(-2)}`;
    }
});   
