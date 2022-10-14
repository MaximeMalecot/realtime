import { io } from "socket.io-client"

const socket = io("ws://localhost:9000")

socket.on("connect", () => {
    console.log("Connected to the socket")
})

socket.on('calculated', (value) => {
    console.log(value);
    document.getElementById('result').textContent = "Result : " + value
})

const btn = document.getElementById('btn')
btn.addEventListener('click', () => {
    const num1 = document.getElementById('number1')
    const num2 = document.getElementById('number2')
    if (!isNaN(num1.value) && !isNaN(num2.value)){
        socket.emit('calculate', num1.value,num2.value);
    } else {
        alert('not integers')
        num1.value = "";
        num2.value = "";
    }
})