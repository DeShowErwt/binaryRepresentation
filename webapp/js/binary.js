export class binaryElement extends HTMLElement {
  constructor(){
    super();
    this.state = false;
  }

  _setBinary(target){
    let legendClasses = target.querySelector('.legendNumber').classList
    // For the correct color representation of the legendNumber use this toggle with the classname to be used if it is not
    let toggle = 'legendNumberUntoggled'
    this.state = !this.state
    // If the state is true we want to show its toggled, also with the legendNumber
    if(this.state){legendClasses.remove('legendNumberUntoggled');toggle = 'legendNumberToggled'}
    else{legendClasses.remove('legendNumberToggled')}
    target.querySelector('.bit').innerHTML = `${+ this.state}`
    legendClasses.add(toggle)
  }

  connectedCallback(){
    this.render()
  }

  render(){
    this.innerHTML = `<div class="bit">${+ this.state}</div><div class="legendNumber">${this.dataset.value}</div>`
    this.querySelector('.legendNumber').classList.add('legendNumberUntoggled')
    this.addEventListener('click', () => this._setBinary(this))
  }
}
customElements.define('binary-element', binaryElement)