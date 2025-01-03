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

    const innerDisplay=document.createElement("div");
    innerDisplay.id="inner-display";

    const displayPara=document.createElement("p");
    displayPara.id="display-para";

    innerDisplay.appendChild(displayPara);
    displayContainer.appendChild(innerDisplay);
    return displayContainer;
}
function createBtns(){
    const btnLabels=[["AC", "Del", "%", "/"],
    ["9", "8", "7", "X"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],    
    ["0", ".", "+/-", "="]];
    
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
    
            btn.textContent=btnLabel;
            
            btn.addEventListener("click", handleClick);

            rowContainer.appendChild(btn);
        });
    
        btnContainer.appendChild(rowContainer);
    });
    return btnContainer;
}

function limitAndDisplay(expression){
    const displayPara=document.querySelector("#display-para");
    if(expression.length>charDisplayLimit){
        expression=expression.slice(-charDisplayLimit);
    }
    displayPara.textContent=expression;
}

function clearDisplay(){
    document.querySelector("#display-para").textContent="";
}

function handleClick(event){
    const btnLabel=event.target.textContent;
    if(Number(btnLabel)>=0){
        handleOperand(btnLabel);
    }else if(btnLabel==="AC" || btnLabel==="Del" || btnLabel==="." || btnLabel==="+/-"){
        handleFunction(btnLabel);
    }else if(btnLabel==="="){
        handleEquals();
    }else{
        handleOperator(btnLabel);
    }
}

function handleOperand(btnLabel){
    if(toClearDisplay){
        clearDisplay();
        toClearDisplay=false;
    }
    let expression=document.querySelector("#display-para").textContent;
    if(expression==="0")
        expression="";
    limitAndDisplay(expression+btnLabel);
}

function handleFunction(btnLabel){
    const displayPara=document.querySelector("#display-para");
    let expression=displayPara.textContent;
    if(btnLabel==="AC"){
        resetVariables();
        clearDisplay();
    }else if(btnLabel==="Del"){
        displayPara.textContent=expression.substring(0, expression.length-1);
    }else if(btnLabel==="."){
        if(toClearDisplay){
            clearDisplay();
            toClearDisplay=false;
        }
        if(!expression.includes(".")){
            if(expression==="")
                expression="0";

            limitAndDisplay(expression+".");
        }
    }else{
        limitAndDisplay(Number(expression)*-1);
    }
}

function handleOperator(btnLabel){
    const displayPara=document.querySelector("#display-para");
    const expression=displayPara.textContent;
    
    if(expression==="" && !operand1)
        return;

    if(operator){
        if(toClearDisplay || expression===""){
            operator=btnLabel;
        }else{
            operand2=Number(expression);
            handleEvaluation();
            operator=btnLabel;
        }
    }else{
        operator=btnLabel;
        toClearDisplay=true;

        operand1=Number(expression);
    }
}

function handleEquals(){
    const displayPara=document.querySelector("#display-para");
    const expression=displayPara.textContent;
    if(!operand1 || !operator || expression==="")
        return;

    operand2=Number(expression);
    handleEvaluation();
}

function handleEvaluation(){
    const result=evalExp();
    limitAndDisplay(result);

    operand1=result;
    operand2=null;
    operator=null;
}

function evalExp(){
    switch(operator){
        case "+": return operand1+operand2;
        case "-": return operand1-operand2;
        case "X": return operand1*operand2;
        case "/": return operand1/operand2;
        case "%": return operand1%operand2;
    }
    return NaN;
}

function resetVariables(){
    operand1=null;
    operand2=null;
    operator=null;
    toClearDisplay=false;
}

function initialise(){
    charDisplayLimit=23;
    resetVariables();

    const topContainer=document.querySelector("#top-container");
    const calculator=createCalculator();
    topContainer.appendChild(calculator);
}

let operand1,
    operand2,
    operator,
    toClearDisplay,
    charDisplayLimit;

window.addEventListener("load", initialise);
