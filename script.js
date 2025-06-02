const numberButtons = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const equal = document.querySelector(".equal")
const clear = document.querySelector(".clear>button")
let primary = document.querySelector(".primary")
let secondary = document.querySelector(".secondary")

let currentOperator;
let a, b;
let ans = 0
primary.textContent = ""
secondary.textContent = ""

numberButtons.forEach((number)=> number.addEventListener("click", (e)=>{
    if(primary.textContent ==="Error") {
        return
    } else {
        if(primary.textContent.length <=7) {
        primary.textContent += e.target.textContent
    }
    }
}))

clear.addEventListener("click", ()=> {
    primary.textContent = ""
    secondary.textContent = ""
    a = undefined
    b = undefined
    currentOperator = undefined
})

operators.forEach((operator)=>operator.addEventListener("click", (e)=>{
    if(primary.textContent==="Error" || primary.textContent ==="MathError") return
    else {

    if(secondary.textContent ===  "" && primary.textContent === "") return
    if(primary.textContent==="" && currentOperator!=undefined && a!=undefined) {
        currentOperator = e.target.textContent   
        secondary.textContent = a + " " + currentOperator
        return
    } 
    
    if(a!=undefined && currentOperator!=undefined) {
        b = parseFloat(primary.textContent)
        if(isNaN(b)) {
            primary.textContent = "Error"
            secondary.textContent = ""
            return
        }
        if(currentOperator == '+') ans = add(a,b)
        if(currentOperator == '-') ans = subtract(a,b)
        if(currentOperator == '×') ans = multiply(a,b)
        if(currentOperator == '÷') ans = divide(a,b)  
        if(ans === undefined)  return
        currentOperator = e.target.textContent   
        a = ans
        secondary.textContent = a + " " +currentOperator
        primary.textContent = ""
    return
    }
    a = parseFloat(primary.textContent)
    currentOperator = e.target.textContent
    secondary.textContent = primary.textContent + " " + e.target.textContent
    primary.textContent = ""
    
    } 
})
)

equal.addEventListener('click', ()=> {
    if(secondary.textContent === "") return 
    if(secondary.textContent!=="" && primary.textContent==="") {
        primary.textContent="Error"
        secondary.textContent = ""
        return
    }
    b = parseFloat(primary.textContent)
    if(isNaN(b)) {
        primary.textContent = "Error"
        secondary.textContent = ""
        return
    }
    if(currentOperator == '+') ans = add(a,b)
    if(currentOperator == '-') ans = subtract(a,b)
    if(currentOperator == '×') ans = multiply(a,b)
    if(currentOperator == '÷') ans = divide(a,b)    
    if(ans === undefined)  return  
    a = ans
    secondary.textContent=""
    primary.textContent = a 
    b = undefined
    a = undefined
})

// operation functions 
function add (a, b) {
    return a+b;
}
function subtract (a, b) {
    return a-b;
}
function multiply (a, b) {
    return a*b;
}
function divide (a, b) {
    if(b==0) {
        primary.textContent = "MathError"
        secondary.textContent =""
        return
    }
    return (a/b).toFixed(2)
}   