export class binaryElement extends HTMLElement {
  constructor(){
    super();
    this.state = false;
  }

  connectedCallback(){
    this.render()
  }

  render(){
    this.innerHTML = `<div class="bit">${+ this.state}</div><div class="legendNumber">${this.dataset.value}</div>`
    // this.querySelector('.legendNumber').classList.add('legendNumberUntoggled')
    this.addEventListener('mousedown', () => {
      // Have the button get animated on a click
      let bit = this.querySelector('.bit')
      if(bit.classList.contains('animate')){bit.classList.remove('animate')}
      else{bit.classList.add('animate')}
    })
  }
}
customElements.define('binary-element', binaryElement)