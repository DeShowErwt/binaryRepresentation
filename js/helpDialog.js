const helpList = [
    {'text': 'See this big number here? That\'s a bit (Binary Digit)! It can only be 1 and 0, try clicking it!', 'eventType':'normal', 'placementElement':'.bit'},
    {'text': 'Now look at this number under it. This is the value of the bit. It lights up when the bit is 1, that\'s because a 1 indicates the bit is \'on\' so we count its value to the total.', 'eventType':'normal', 'placementElement':'.legendNumber'},
    {'text':'Look at this counter at the top. You can see the total value of all the bits switched \'on\' here, currently it can only be 1 or 0, let\'s try more bits, click the byte!', 'eventType':'#byteSelect', 'placementElement':'.counter input'},
    {'text':'This is a Byte. A byte is 8 bits. For most modern computers it\'s the smallest thing way of storing something in it\'s memory.', 'eventType':'normal'},
    {'text':'Do you see the values under the current bits? The value is increasing pretty rapidly. As you can see the value of a bit can be calculated by multiplying the previous value. Try playing around with the bits to see how you can make every number from 0 to 255!','eventType':'normal'},
    {'text':'Pretty impressive right? Only 8 1s and 0s can make 256 numbers! But it gets even better than this, try the double Byte!','eventType':'#doubleByteSelect', 'placementElement':'.amountSelect'},
    {'text':'Wow, now this is massive! Two Bytes can account for huge numbers, with one Byte we could make 256 numbers, with two Bytes we can make 65,356 numbers! This is because of the values growing exponentially (every bit is the last one times 2). We can also see that all bits before a bit make up the value of that bit plus one (2=1 +1, 4=2+1 +1, 8=4+2+1 +1 and so on), this allows us to not skip a single number!', 'eventType':'normal'},
    {'text':'Now why are those bits and Bytes so interesting? It\'s because this is the way computers think and interpret things we tell them. A Byte for example can be used to create any character you want (\'h\' or \'7\' or even \'$\'). However, these Bytes can also be stringed together as far as you want to store something way bigger (most images are multiple megabytes(1024 kilobytes, which means 1024 times 1024 bytes) for example).', 'eventType':'normal'},
    {'text':'Alright, that was it for my explanation, i\'ll leave you to it! Have fun creating some binary numbers!', 'eventType':'ending'}
]

export class helpDialog extends HTMLElement {
    constructor(){
      super();
    }
    
    connectedCallback(){
        this.render()
        const num = this.dataset.helpnum
        const eventType = helpList[num].eventType
        if(helpList[num].placementElement != null){
            this._placeItemWithSelector(helpList[num].placementElement)
        } else{
            this._placeItemAtPrevious(this.dataset.prevleft, this.dataset.prevtop)
        }
        const continueButton = this.querySelector('.continueButton')
        if(eventType === 'normal'){
            continueButton.addEventListener('click', () => this._continueClick())
        } else if(eventType === 'ending'){
            continueButton.remove()
            this.querySelector('.closeButton').textContent = 'Thanks!'
        } else {
            document.querySelector(eventType).addEventListener('click', ()=>this._continueClick(), {once:true})
            continueButton.remove()    
        }
        this.querySelector('.closeButton').addEventListener('click', () => this.remove())
    }

    _placeItemWithSelector(placementSelector){
        const placementElement = document.querySelector(placementSelector)
        const elementRect = placementElement.getBoundingClientRect()
        this.style.position = 'absolute';
        // Place the box to the right of the specified element at the same height 
        this.style.left = elementRect.right + 5 +'px'
        this.style.top = elementRect.top + 'px';
    }

    _placeItemAtPrevious(rectLeft, rectTop){
        this.style.position = 'absolute'
        // Place the box at the exact same spot as the previous box's end spot
        this.style.left = rectLeft + 'px'
        this.style.top = rectTop + 'px'
    }

    _continueClick(){
        document.dispatchEvent(new CustomEvent('continueHelp', {bubbles:true, detail:{
            'num':this.dataset.helpnum, 
            'posleft':this.getBoundingClientRect().left,
            'postop':this.getBoundingClientRect().top
        }}))
        this.remove()
    }
  
    render(){
        this.innerHTML = `
            <dialog open>
                <p>${helpList[this.dataset.helpnum].text}</p>
                <button class="continueButton">Ok</button>
                <button class="closeButton">Close</button>
            </dialog>
        `
    }
  }
  customElements.define('help-dialog', helpDialog)