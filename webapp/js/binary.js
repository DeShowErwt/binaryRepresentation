export class binaryElement extends HTMLElement {
  constructor(){
    super();
    this.state = false;
  }

  _setBinary(target){
    console.log(target.name)
    this.state = !this.state
    target.innerHTML = `<span class="bit">${+ this.state}</span><span class="legendNumber">${target.dataset.value}</span>`
  }

  connectedCallback(){
    this.render()
  }

  render(){
    this.innerHTML = `<span class="bit">${+ this.state}</span><span class="legendNumber">${this.dataset.value}</span>`
    this.addEventListener('click', () => this._setBinary(this))
  }
}
customElements.define('binary-element', binaryElement)