
function Calc(operator, val_1, val_2) {
    
    let isOkParameters = true;
    if (operator === undefined) {
        isOkParameters = false;
    }
    if (typeof(val_1) !== 'number') {
        isOkParameters = false;
    }
    if (typeof(val_2) !== 'number') {
        isOkParameters = false;
    }
    if (!isOkParameters) return 'Error';

    let result = 0;
    switch (operator) {
        case 'sum':
            result = val_1 + val_2;
            break;
        case 'sub':
            result = val_1 - val_2;
            break;
        case 'multi':
            result = val_1 * val_2;
            break;
        case 'div':
            if (val_2 === 0) {
                result = 'Error: Divide by 0';
            } else {
                result = val_1 / val_2;
            }
            break;
        case 'mod':
            if (val_2 === 0) {
                result = 'Error: Divide by 0';
            } else {
                result = val_1 % val_2;
            }
            break;    
        case 'pow':
            result = val_1 ** val_2;
            break;
        default :
            result = 'Unknown operation';
    }

    return result;
}


//   --------------    Tests    ---------------

console.log(Calc('sum', 1, 'd2'));
console.log(Calc('sum', 1, 2));
console.log(Calc('sub', 1, '2'));
console.log(Calc('multi', 5, ''));
console.log(Calc('divs', 10, 2));
console.log(Calc('div', 10, 2));
console.log(Calc('div', 10, 0));
console.log(Calc('sbmmum', 1, 2));
console.log(Calc('pow', 4, 2));
console.log(Calc('mod', 4, 1));
