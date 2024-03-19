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
  }
}
customElements.define('binary-element', binaryElement)