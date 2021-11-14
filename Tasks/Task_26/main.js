
function showVerticalMessage(incString) {
    let validString = (typeof incString === 'string');

    if (!validString) {
        console.log('Not valid incoming string');
        return;
    }
 
    let outString = incString.trim();
    
    if (outString.length > 10) {
        outString = outString.slice(0, 10);
    }

    if (outString[0] === 'м') {
        outString = 'М' + outString.slice(1, outString.length);
    }
    
    for (let i=0; i<outString.length; i++) {
        console.log(outString[i] + '\n');
    }
    console.log('\n');

    return;
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





