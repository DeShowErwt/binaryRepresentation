export const helpList = [
    {'text': 'See this big number here? That\'s a bit! It can only be 1 and 0, try clicking it!', 'eventType':'normal'},
    {'text': 'Now look at the number under it. That is the value of the bit. It lights up whe the bit is 1, that\'s because a 1 indicates the bit is \'on\' so we count its value to the total.', 'eventType':'normal'},
    {'text':'Look at this counter at the top. You can see the total value of all the bits switched \'on\' here, currently it can only be 1 or 0, let\'s try more bits, click the byte!', 'eventType':'byteClick'},
    {'text':'This is a byte. A byte is 8 bits. For most modern computers it\'s the smallest thing it can store in it\'s memory', 'eventType':'normal'},
    {'text':'Do you see the values under the current bits? The value is increasing pretty rapidly. As you can see the value of a bit can be calculated by multiplying the previous value. Try playing around with the bits to see how you can make every number from 0 to 255!','eventType':'normal'},
    {'text':'Pretty impressive right? Only 8 1s and 0s can make 256 numbers! But it gets even better than this, try the double byte!','eventType':'doubleByteClick'},
    {'text':'Wow, now this is massive! Two bytes can account for huge numbers, with one byte we could make 256 numbers, with two bytes we can make 65,356 numbers! This is because of the values growing exponentially (the doubling). We can also see that all bits before a bit make up the value of that bit plus one (2=1 +1, 4=2+1 +1, 8=4+2+1 +1 and so on)!', 'eventType':'normal'}
]