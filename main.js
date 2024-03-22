import { binaryElement } from './js/binary.js'
import { helpDialog } from './js/helpDialog.js'
import { setupCounter } from './js/counter.js'


const counter = document.querySelector('.counter')

const binary = document.querySelector('.binary')
// Global var to be able to use the list in more functions
let chosenList

setUpApp()

function listCreator(length){
    let list = []
    let newVal;
    for(let i = 0; i < length; i++){
        // If we have the first value we cant access the one before it, however it is always 1
        if(i==0){list.push(1);continue}
        // In binary the next value is always twice the last value
        newVal = 2*list[(i-1)]
        list.push(newVal)
    }
    return list
}

function displayList(listLength){
    setupCounter(counter)
    chosenList = listCreator(listLength)
    binary.innerHTML = ''
    const rowAmount = Math.ceil(chosenList.length/8)
    for(let i=1;i<=rowAmount;i++){
        let rowDiv = document.createElement('div')
        rowDiv.id = 'row' + i
        rowDiv.classList.add('row')
        rowDiv.style.gridRow = i
        binary.appendChild(rowDiv)
    }
    let currentRow = document.querySelector('#row1')
    for(let i = chosenList.length-1; i>=0;i--){
        // If i is a multiple of 8 we go to a new row (as we display one byte per row)
        // However we dont want to do this for the first item in the list, so we check if i isn't at the point where it started 
        if((i+1) % 8 == 0 && i != chosenList.length-1){
            let newRowIndex = parseInt(currentRow.id.slice(3)) + 1
            currentRow = document.querySelector('#row' + newRowIndex)
        }
        currentRow.innerHTML += `
            <binary-element data-value="${chosenList[i]}"></binary-element>
        `
    }
    for(let rowIndex = 0; rowIndex < binary.children.length; rowIndex++){
        const row = binary.children[rowIndex]
        for(let elementIndex = 0; elementIndex < row.children.length; elementIndex++){
            row.children[elementIndex].addEventListener('click', (e)=>_setBinary(e.currentTarget))
        }
    }
}

// Setup eventListeners for changing the size of the bytes
document.querySelector('#bitSelect').addEventListener('click', function(){
    if(document.getElementsByTagName('binary-element').length != 1){
        displayList(1)
    }
})
document.querySelector('#byteSelect').addEventListener('click', function(){
    const bitAmount = document.getElementsByTagName('binary-element').length
    if(bitAmount != 8){
        displayList(8);
    }
})
document.querySelector('#doubleByteSelect').addEventListener('click', function(){
    const bitAmount = document.getElementsByTagName('binary-element').length
    if(bitAmount < 9){
        displayList(16);
        const legendNumberList = document.getElementsByClassName('legendNumber')
        for(let i=0;i<legendNumberList.length;i++){legendNumberList[i].style.fontSize = "var(--semi-font)";}
    }
})

// Function for handling binary clicks
function _setBinary(target){
    let legendClasses = target.querySelector('.legendNumber').classList
    // For the correct color representation of the legendNumber use this toggle with the classname to be used if it is not
    let toggle = 'legendNumberUntoggled'
    // Have the bit get animated on a click
    let bit = target.querySelector('.bit')
    if(bit.classList.contains('animate')){bit.classList.remove('animate')}
    else{bit.classList.add('animate')}
    // Change the state, if it was 1 it becomes 0 and vice versa
    target.state = !target.state
    // If the state is true we want to show its toggled, also with the legendNumber
    if(target.state){
        if(legendClasses.contains('legendNumberUntoggled')){legendClasses.remove('legendNumberUntoggled')}
        toggle = 'legendNumberToggled'
    }
    else{legendClasses.remove('legendNumberToggled')}
    target.querySelector('.bit').innerHTML = `${+ target.state}`
    legendClasses.add(toggle)
}

// Eventlistener to be able to handle value changes in the counter
document.addEventListener("calculateBinary", function(decimalEvent){
    calculateBinary(decimalEvent.detail)
})

// Function for getting the right sequence of ones and zeroes
function calculateBinary(decimalNumber){
    let total = decimalNumber
    let wantedValue;
    const bitEls = document.getElementsByTagName('binary-element')
    for(let i = chosenList.length-1; i>=0;i--){
        // We check if the bit is to be turned on or off, and specify what we want the value of the bit to be based on that
        if(total-chosenList[i] >= 0){
            wantedValue = '1';
            total -= chosenList[i]    
        } else{
            wantedValue = '0'
        }

        // Turn bit with dataset.value == chosenList[i] on or off based on if it already has the wantedValue
        for(let elementNum = 0;elementNum<bitEls.length;elementNum++){
            const bitEl = bitEls[elementNum]
            if(bitEl.dataset.value == chosenList[i]){
                if(bitEl.querySelector('.bit').textContent != wantedValue){
                    _setBinary(bitEl)
                }
            }
        }
        
    }
    if(total > 0){
        for(let elementNum=0; elementNum<bitEls.length;elementNum++){
            const bitEl = bitEls[elementNum]
            if(bitEl.querySelector('.bit').textContent != '0'){
                _setBinary(bitEl)
            }
        }
        setupCounter(counter)
    }
}

function displayHelp(helpElementNum){
    let helpEl = document.createElement('help-dialog')
    helpEl.setAttribute('data-helpnum', helpElementNum)
    document.body.appendChild(helpEl)
}

document.addEventListener('continueHelp', function(event){
    const newIndex = parseInt(event.detail) +1
    if(newIndex < 7){displayHelp(newIndex)}
    console.log(newIndex)
})

function setUpHelpSequence(){
    document.querySelector('#helpButton').addEventListener('click', function(e){
        // First remove all open dialogs if they exist
        let openDialogs = document.getElementsByTagName('help-dialog')
        if(openDialogs !== null){
            while(0<openDialogs.length){
                document.body.removeChild(openDialogs[0])
            }
        }
        displayHelp(0)
    })
}

function setUpApp(){
    displayList(1)
    setUpHelpSequence()
}
