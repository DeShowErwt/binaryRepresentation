const helpList = [
    {'text': 'See this big number here? That\'s a bit! It can only be 1 and 0, try clicking it!', 'eventType':'normal', 'placementElement':'.bit'},
    {'text': 'Now look at this number under it. This is the value of the bit. It lights up when the bit is 1, that\'s because a 1 indicates the bit is \'on\' so we count its value to the total.', 'eventType':'normal', 'placementElement':'.legendNumber'},
    {'text':'Look at this counter at the top. You can see the total value of all the bits switched \'on\' here, currently it can only be 1 or 0, let\'s try more bits, click the byte!', 'eventType':'byteClick', 'placementElement':'.counter input'},
    {'text':'This is a byte. A byte is 8 bits. For most modern computers it\'s the smallest thing it can store in it\'s memory', 'eventType':'normal', 'placementElement':'.binary'},
    {'text':'Do you see the values under the current bits? The value is increasing pretty rapidly. As you can see the value of a bit can be calculated by multiplying the previous value. Try playing around with the bits to see how you can make every number from 0 to 255!','eventType':'normal', 'placementElement':'.binary'},
    {'text':'Pretty impressive right? Only 8 1s and 0s can make 256 numbers! But it gets even better than this, try the double byte!','eventType':'doubleByteClick', 'placementElement':'#doubleByteSelect'},
    {'text':'Wow, now this is massive! Two bytes can account for huge numbers, with one byte we could make 256 numbers, with two bytes we can make 65,356 numbers! This is because of the values growing exponentially (every bit is the last one times 2). We can also see that all bits before a bit make up the value of that bit plus one (2=1 +1, 4=2+1 +1, 8=4+2+1 +1 and so on), this allows us to not skip a single number!', 'eventType':'normal', 'placementElement':'.binary'}
]

export class helpDialog extends HTMLElement {
    constructor(){
      super();
    }
    
    connectedCallback(){
        this.render()
        const num = this.dataset.helpnum
        this._placeItem(helpList[num].placementElement)
        const continueButton = this.querySelector('.continueButton')
        if(helpList[num].eventType === 'normal'){
            continueButton.addEventListener('click', () => this._continueClick())
        } else if(helpList[num].eventType === 'byteClick'){
            document.querySelector('#byteSelect').addEventListener('click', ()=>this._continueClick(), {once:true})
            continueButton.remove()
        } else {
            document.querySelector('#doubleByteSelect').addEventListener('click', ()=>this._continueClick(), {once:true})
            continueButton.remove()    
        }
        this.querySelector('.closeButton').addEventListener('click', () => this.remove())
    }

    _placeItem(placementSelector){
        const placementElement = document.querySelector(placementSelector)
        const elementRect = placementElement.getBoundingClientRect()
        this.style.position = 'absolute';
        // If we used the binary selector we just want the dialog above our binary so we place it differently
        if(placementSelector === '.binary'){
            // Place it to the left of the element
            this.style.right = elementRect.right + 'px'
            this.style.top =  elementRect.top + 'px'
            return
        } else {
            this.style.left = elementRect.right + 5 +'px'
            this.style.top = elementRect.top + 'px';
        }
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