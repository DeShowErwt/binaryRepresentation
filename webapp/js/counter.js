export function setupCounter(element) {
    let counter = 0
    const addValue = (count) => {
      counter += count
      element.innerHTML = `Total: ${counter}`
    }
    document.addEventListener('click', () => {
      counter =  0
      const bits = document.querySelector('.binary').children
      let i = 0
      while(i < bits.length){
        let bitVal = bits[i].firstChild.textContent 
        if(bitVal == '1'){
          addValue(parseInt(bits[i].dataset.value))
        }
        i++
      }
    })
    addValue(0)
  }
  