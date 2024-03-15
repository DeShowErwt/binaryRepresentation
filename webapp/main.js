import './style.css'
import { binaryElement } from './js/binary.js'
import { setupCounter } from './js/counter.js'

setupCounter(document.querySelector('.counter'))
let byteList = [1,2,4,8,16,32,64,128]
for(let i = 0; i<byteList.length;i++){
    
}

document.querySelector('.binary').innerHTML += `
    <binary-element data-value="1"></binary-element>
    <binary-element data-value="2"></binary-element>
    <binary-element data-value="4"></binary-element>
    <binary-element data-value="8"></binary-element>
`