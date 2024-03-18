import { binaryElement } from './js/binary.js'
import { setupCounter } from './js/counter.js'

const counter = document.querySelector('.counter')

const binary = document.querySelector('.binary')
// TODO: automate the creation of byte lists
let doubleByteList = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768]
let byteList = [1,2,4,8,16,32,64,128]
let bitList = [1]
// Global var to be able to use the list in more functions
let chosenList
function displayList(list){
    setupCounter(counter)
    chosenList = list
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
displayList(bitList)
// Setup eventListeners for changing the size of the bytes
document.querySelector('#bitSelect').addEventListener('click', function(){
    if(document.getElementsByTagName('binary-element').length > 1){
        displayList(bitList)
    }
})
document.querySelector('#byteSelect').addEventListener('click', function(){
    const bitAmount = document.getElementsByTagName('binary-element').length
    if(bitAmount < 2 || bitAmount > 8){
        displayList(byteList);
    }
})
document.querySelector('#doubleByteSelect').addEventListener('click', function(){
    const bitAmount = document.getElementsByTagName('binary-element').length
    if(bitAmount < 9){
        displayList(doubleByteList);
        const legendNumberList = document.getElementsByClassName('legendNumber')
        for(let i=0;i<legendNumberList.length;i++){
            legendNumberList[i].style.fontSize = "var(--semi-font)";
        }
    }
})

function _setBinary(target){
    let legendClasses = target.querySelector('.legendNumber').classList
    // For the correct color representation of the legendNumber use this toggle with the classname to be used if it is not
    let toggle = 'legendNumberUntoggled'
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


document.addEventListener("calculateBinary", function(decimalEvent){
    if(document.getElementsByTagName('binary-element').length < 2){
        if(decimalEvent.detail > 1){
            setupCounter(counter)
        }
        const bitEl = document.querySelector('binary-element')
        // Calculation method for 1 bit
        if(decimalEvent.detail == 0){
            if(bitEl.querySelector('.bit').textContent === '1'){
                _setBinary(bitEl)
            }
        }else{
            _setBinary(bitEl)
        }
    }
    if(document.getElementsByTagName('binary-element').length > 1){
        // Calculation method for more bits (no input validation as calculateBinary handles that)
        calculateBinary(decimalEvent.detail)
    }
})

function calculateBinary(decimalNumber){
    let total = decimalNumber
    const bitEls = document.getElementsByTagName('binary-element')
    for(let i = chosenList.length-1; i>=0;i--){
        if(total-chosenList[i] >= 0){
            // Turn bit with dataset.value == chosenList[i] on
            for(let elementNum = 0;elementNum<bitEls.length;elementNum++){
                const bitEl = bitEls[elementNum]
                if(bitEl.dataset.value == chosenList[i]){
                    if(bitEl.querySelector('.bit').textContent != '1'){
                        _setBinary(bitEl)
                    }
                }
            }
            total -= chosenList[i]
        } else{
            for(let elementNum = 0;elementNum<bitEls.length;elementNum++){
                const bitEl = bitEls[elementNum]
                if(bitEl.dataset.value == chosenList[i]){
                    if(bitEl.querySelector('.bit').textContent != '0'){
                        _setBinary(bitEl)
                    }
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