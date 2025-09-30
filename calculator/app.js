const input = document.getElementById("input");
const btn = document.querySelectorAll("button");
let string = "";

const arr = Array.from(btn)
arr.forEach((buttons) => {
    buttons.addEventListener("click", (e) => {
        if (e.target.innerHTML == "=") {
            string = eval(string)
            input.value = string
        } else if (e.target.innerHTML == "AC") {
            string = "";
            input.value = string
        } else if (e.target.innerHTML == "DEL") {
            string = string.substring(0, string.length - 1)
            input.value = string
        }
        else {
            string += e.target.innerHTML;
            input.value = string
        }
    })
    console.log(buttons.innerHTML)
})

document.addEventListener("keydown", (e) => {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '%']
    if (allowedKeys.includes(e.key)) {
        string += e.key;
        input.value = string
    } else if (e.key === "Backspace") {
        string = string.substring(0, string.length - 1)
        input.value = string
    } else if (e.key === "Enter") {
        string = eval(string)
        input.value = string
    } else if (e.key === 'c') {
        string = "";
        input.value = string
    }
})
