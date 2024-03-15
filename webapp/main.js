import { binaryElement } from './js/binary.js'
import { setupCounter } from './js/counter.js'

setupCounter(document.querySelector('.counter'))
let byteList = [1,2,4,8,16,32,64,128]
let bitList = [1]
function displayList(chosenList){
    const binary = document.querySelector('.binary')
    binary.innerHTML = ''
    for(let i = chosenList.length-1; i>=0;i--){
         binary.innerHTML += `
            <binary-element data-value="${byteList[i]}"></binary-element>
        `
    }
}
displayList(bitList)
// Setup eventListeners for changing the size of the bytes
document.querySelector('#bitSelect').addEventListener('click', () => {displayList(bitList)})
document.querySelector('#byteSelect').addEventListener('click', () => {displayList(byteList)})