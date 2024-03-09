export class binaryElement extends HTMLElement {
  static observedAttributes = ['name'];

  constructor(){
    super();
    this.state = false;
    // this.name = '0';
  }

  _setBinary(target){
    console.log(target.name)
    this.state = !this.state
    target.innerHTML = `${+ this.state}<br><span class="legendNumber">${target.name}</span>`
  }

  connectedCallback(){
    this.render()
  }

  render(){
    this.innerHTML = `${+ this.state}<br><span class="legendNumber">${this.name}</span>`
    this.addEventListener('click', () => this._setBinary(this))
  }
}
customElements.define('binary-element', binaryElement)