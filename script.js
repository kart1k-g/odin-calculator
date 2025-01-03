function createCalculator(){
    const calculatorContainer=document.createElement("div");
    calculatorContainer.id="calculator-container";

    const display=createDisplay();
    const btns=createBtns();

    calculatorContainer.appendChild(display);
    calculatorContainer.appendChild(btns);
    
    return calculatorContainer;
}
function createDisplay(){
    const displayContainer=document.createElement("div");
    displayContainer.id="display-container";

    return displayContainer;
}
function createBtns(){
    const btnLabels=[["AC", "Del", "%", "/"],
    ["9", "8", "7", "X"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],    
    ["0", ".", "="]];
    
    const btnIDs=[["ac", "delete", "modulus", "divide"],
    ["nine", "eight", "seven", "multiply"],
    ["four", "five", "six", "subtract"],
    ["one", "two", "three", "add"],    
    ["zero", "point", "equals"]];

    const btnContainer=document.createElement("div");
    btnContainer.id="btn-container";

    btnLabels.forEach((btnRow, row)=>{
        const rowContainer=document.createElement("div");
        rowContainer.id=`row-${row+1}`;
        rowContainer.classList.add("row-container");
    
        btnRow.forEach((btnLabel, col)=>{
            const btn=document.createElement("button");
            btn.id=btnIDs[row][col];
            btn.classList.add("btn");
    
            btn.textContent=btnLabels[row][col];

            rowContainer.appendChild(btn);
        });
    
        btnContainer.appendChild(rowContainer);
    });
    return btnContainer;
}

function initialise(){
    console.log("Hia");
    const topContainer=document.querySelector("#top-container");
    const calculator=createCalculator();
    topContainer.appendChild(calculator);
}

window.addEventListener("load", initialise);
