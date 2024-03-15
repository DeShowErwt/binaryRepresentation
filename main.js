import { binaryElement } from './js/binary.js'
import { setupCounter } from './js/counter.js'

const counter = document.querySelector('.counter')
setupCounter(counter)
const binary = document.querySelector('.binary')
let byteList = [1,2,4,8,16,32,64,128]
let bitList = [1]
// Global var to be able to use the list in more functions
let chosenList
function displayList(list){
    chosenList = list
    binary.innerHTML = ''
    for(let i = chosenList.length-1; i>=0;i--){
         binary.innerHTML += `
            <binary-element data-value="${byteList[i]}"></binary-element>
        `
    }
    let i= 0
    while(i<binary.children.length){
        binary.children[i].addEventListener('click', (e)=>_setBinary(e.currentTarget))
        i++
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
    if(document.getElementsByTagName('binary-element').length < 2){
        displayList(byteList);
    }
})

function _setBinary(target){
    let legendClasses = target.querySelector('.legendNumber').classList
    // For the correct color representation of the legendNumber use this toggle with the classname to be used if it is not
    let toggle = 'legendNumberUntoggled'
    target.state = !target.state
    // If the state is true we want to show its toggled, also with the legendNumber
    if(target.state){legendClasses.remove('legendNumberUntoggled');toggle = 'legendNumberToggled'}
    else{legendClasses.remove('legendNumberToggled')}
    target.querySelector('.bit').innerHTML = `${+ target.state}`
    legendClasses.add(toggle)
}


document.addEventListener("calculateBinary", function(decimalEvent){
    console.log('yo')
    if(document.getElementsByTagName('binary-element').length < 2){
        if(decimalEvent.detail > 1){
            setupCounter(counter)
        }
        const bitEl = document.querySelector('binary-element')
        // Calculation method
        if(decimalEvent.detail == 0){
            if(bitEl.querySelector('.bit').textContent === '1'){
                _setBinary(bitEl)
            }
        }else{
            _setBinary(bitEl)
        }
    }
    if(document.getElementsByTagName('binary-element').length > 1){
        // Calculation method for more digits (no input validation as this means we have a byte and we already check our input for that in the counter method)
        console.log('run')
        calculateBinary(decimalEvent.detail)
    }
})

function calculateBinary(decimalNumber){
    let total = decimalNumber
    for(let i = chosenList.length-1; i>=0;i--){
        if(total-chosenList[i] >= 0){
            // Turn bit with dataset.value === chosenList[i] on
            console.log(chosenList[i])
            const bitEls = document.getElementsByTagName('binary-element')
            for(let elementNum = 0;elementNum<bitEls.length;i++){
                const bitEl = bitEls[elementNum] 
                if(bitEl.dataset.value === chosenList[i]){
                    if(bitEl.querySelector('.bit').textContent !== '1'){
                        _setBinary(bitEl)
                    }
                }
            }
            total-=chosenList[i]
        } 
        if(total === 0){break}
   }
}