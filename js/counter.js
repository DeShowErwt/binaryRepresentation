
export function setupCounter(element) {
  let counter = 0
  const addValue = (count) => {
    counter += count
    element.innerHTML = `Decimal number: <input id="changableVal" min="0" max="255" value="${counter}">`
    element.addEventListener("keyup", (e)=>{
      let decimalNum = parseInt(document.querySelector('#changableVal').value)
      if(decimalNum >= 0 && decimalNum <= 255){
        let decimalToBinaryEvent = new CustomEvent('calculateBinary', {bubbles: true, detail:decimalNum})
        document.dispatchEvent(decimalToBinaryEvent);
      }
    })
  }
  document.querySelector('.center').addEventListener('click', () => {
    counter =  0
    // Create a bool to check if anything has changed, if not, the counter won't be updated and 
    // therefore the previous value will still be displayed, we use this bool to update it in that case
    let empty = true
    const bits = document.querySelector('.binary').children
    let i = 0
    while(i < bits.length){
      let bitVal = bits[i].firstChild.textContent 
      if(bitVal == '1'){
        addValue(parseInt(bits[i].dataset.value))
        empty = false;
      }
      i++
    }
    // If every bit is switched off run the function to display 0
    if(empty){addValue(0)}
  })
  // To init run the addValue function with 0
  addValue(0)
}
