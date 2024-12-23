export class binaryElement extends HTMLElement {
  constructor(){
    super();
    this.state = false;
  }

  connectedCallback(){
    this.render()
  }

  render(){
    this.innerHTML = `<div class="bit"><div class="bitDisplay">0</div></div><div class="legendNumber">${this.dataset.value}</div>`
  }
}
customElements.define('binary-element', binaryElement)