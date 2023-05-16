const textareaC = document.getElementById('message-c')
const msgCounter = document.getElementById('msg-counter')

textareaC.addEventListener('input', ()=> {
    msgCounter.textContent = textareaC.value.length;
    if(textareaC.value.length >= 1 ) {
        textareaC.style.height = "220px";
    } else {
        textareaC.style.height = "28px";
    }
})