const socket = io()

const formMessage = document.querySelector('#formMessage')
const usernameInput = document.querySelector('#usernameInput')
const messageInput = document.querySelector('#messageInput')
const messagesPool = document.querySelector('#messagesPool')

function sendMessage() {
  try {
    const email = usernameInput.value
    const message = messageInput.value

    socket.emit('client:message', { email, message })
  } catch (error) {
    console.log(`Hubo un error ${error}`)
  }
}

function renderMessages(messagesArray) {
  try {
    if (messagesArray.length === 0) {
      return (messagesPool.innerHTML = `<div> No hay mensajes en el chat
       </div>`)
    }
    const html = messagesArray
      .map(messageInfo => {
        return `<div class='mt-2'>
                <strong>${messageInfo.email}</strong>:
                <em class='bg-success bg-opacity-25 ps-3 pe-3 rounded-3'>${messageInfo.message}</em> </div>`
      })
      .join(' ')

    messagesPool.innerHTML = html
  } catch (error) {
    console.log(`Hubo un error ${error}`)
  }
}

formMessage.addEventListener('submit', event => {
  event.preventDefault()
  sendMessage()
  messageInput.value = ''
})

socket.on('server:message', renderMessages)