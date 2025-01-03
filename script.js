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
    // displayPara.textContent="987654321098765432109876543210";

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
    const displayPara=document.querySelector("#display-para");
    let expression=displayPara.textContent;
    if(expression==="0")
        expression="";
    displayPara.textContent=expression+btnLabel;
}

function handleFunction(btnLabel){
    const displayPara=document.querySelector("#display-para");
    let expression=displayPara.textContent;
    if(btnLabel==="AC"){
        initialiseVariables();
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

            displayPara.textContent=expression+".";
        }
    }else{
        displayPara.textContent=Number(expression)*-1;
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
    const displayPara=document.querySelector("#display-para");
    displayPara.textContent=result;

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

function initialiseVariables(){
    operand1=null;
    operand2=null;
    operator=null;
    toClearDisplay=false;
}

function initialise(){
    console.log("Hia");
    const topContainer=document.querySelector("#top-container");
    const calculator=createCalculator();
    topContainer.appendChild(calculator);
}

let operand1,
    operand2,
    operator,
    toClearDisplay;

window.addEventListener("load", initialise);
