import { helpList } from "./helpList";
export class helpDialog extends HTMLElement {
    constructor(){
      super();
    }
    
    connectedCallback(){
        this.render()
        const num = this.dataset.helpnum
        const continueButton = this.querySelector('.continueButton')
        if(helpList[num].eventType === 'normal'){
            continueButton.addEventListener('click', () => this._continueClick())
        } else if(helpList[num].eventType === 'byteClick'){
            document.querySelector('#byteSelect').addEventListener('click', ()=>this._continueClick())
            continueButton.remove()
        } else {
            document.querySelector('#doubleByteSelect').addEventListener('click', ()=>this._continueClick())
            continueButton.remove()    
        }
        this.querySelector('.closeButton').addEventListener('click', () => this.remove())
    }

    _continueClick(){
        document.dispatchEvent(new CustomEvent('continueHelp', {bubbles:true, detail:this.dataset.helpnum}))
        this.remove()
    }
  
    render(){
        this.innerHTML = `
            <dialog open>
                <button class="closeButton">&#10005;</button>
                <p>${helpList[this.dataset.helpnum].text}</p>
                <button class="continueButton">&#8594;</button>
            </dialog>
        `
    }
  }
  customElements.define('help-dialog', helpDialog)