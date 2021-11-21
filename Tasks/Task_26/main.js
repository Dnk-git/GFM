
const   FIRST_LETTER = 'м',
        MAX_LENGTH = 10;

function showVerticalMessage(incString) {
    let validString = (typeof incString === 'string');

    if (!validString) {
        console.log('Not valid incoming string');
        return;
    }
 
    let outString = incString.trim();
    
    if (outString.length > MAX_LENGTH) {
        outString = outString.slice(0, MAX_LENGTH);
    }

    if (outString[0] === FIRST_LETTER) {
        outString = FIRST_LETTER.toUpperCase() + outString.slice(1, outString.length);
    }
    
    for (let i=0; i<outString.length; i++) {
        console.log(outString[i]);
    }
    console.log('\n');
}


//   --------------    Tests    ---------------

showVerticalMessage('   um edweeweewed       ');
showVerticalMessage('   мum edweeweewed       ');       // м - rusian letter!
showVerticalMessage('marafon');
showVerticalMessage('марафон');
showVerticalMessage('марафон фронтенда');
showVerticalMessage('');
showVerticalMessage(null);
showVerticalMessage(undefined);
showVerticalMessage(Infinity);





