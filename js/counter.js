let decimalNum;
// We use this one function to set up the counter and have it behave as the item we want
export function setupCounter(element) {
  let counter = 0

  const addValue = (count) => {
    counter += count
    element.innerHTML = `Decimal number: <input id="changableVal" min="0" max="255" value="${counter}">`
    element.addEventListener("keyup", (e)=>{
      if(decimalNum == parseInt(document.querySelector('#changableVal').value)){return}
      decimalNum = parseInt(document.querySelector('#changableVal').value)
      let decimalToBinaryEvent = new CustomEvent('calculateBinary', {bubbles: true, detail:decimalNum})
      document.dispatchEvent(decimalToBinaryEvent);
    })
  }

  document.querySelector('.center').addEventListener('click', () => {
    counter =  0
    // Create a bool to check if anything has changed, if not, the counter won't be updated and 
    // therefore the previous value will still be displayed, we use this bool to update it in that case
    let empty = true
    const rows = document.getElementsByClassName('row')
    let bits = []
    for(let rowIndex = 0; rowIndex < rows.length; rowIndex++){
      for(let childIndex = 0; childIndex < rows[rowIndex].children.length; childIndex++){
        bits.push(rows[rowIndex].children[childIndex])
      }      
    }
    for(let bitIndex = 0; bitIndex < bits.length; bitIndex++){
      let bitVal = bits[bitIndex].state 
      if(bitVal == true){
        addValue(parseInt(bits[bitIndex].dataset.value))
        empty = false;
      }
    }
    // If every bit is switched off run the function to display 0
    if(empty){addValue(0)}
  })
  
  // To init the counter run the addValue function with 0
  addValue(0)
}
