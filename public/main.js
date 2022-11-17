const socket = io();

///////////////////////////SECCION CHAT//////////////////////

const formMessage = document.querySelector('#formMessage')
const usernameInput = document.querySelector('#usernameInput')
const messageInput = document.querySelector('#messageInput')
const messagesPool = document.querySelector('#messagesPool')

const tiempoTranscurrido = Date.now()
const hoy = new Date(tiempoTranscurrido)
const fecha= hoy.toLocaleDateString()
const tiempo = new Date()
const VenHora=tiempo.toLocaleTimeString('it-IT')

function sendMessage() {
    try {
        const email = usernameInput.value
        const message = messageInput.value
        const tiempochat = `${fecha}, ${VenHora}`
        socket.emit('client:message', { email, message, tiempochat })
    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}

function renderMessages(messagesArray) {
    try {
        const html = messagesArray.map(messageInfo => {
            return(`<div>
            <strong style="color: blue;" >${messageInfo.email}</strong>
            [<span style="color: brown;">${fecha}, ${VenHora}</span>]:
            <em style="color: green;font-style: italic;">${messageInfo.message}</em> </div>`)
        }).join(" ");

        messagesPool.innerHTML = html
    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}

formMessage.addEventListener('submit', event => {
    event.preventDefault()
    sendMessage()
    messageInput.value = "" 
})

socket.on('server:message', renderMessages);