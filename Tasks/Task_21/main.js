
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

  
    const operations = {
        value1 : 0,
        value2 : 0,
        result : 0,
        
        sum() { this.result = this.value1 + this.value2 },
        sub() { this.result = this.value1 - this.value2 },
        multi() { this.result = this.value1 * this.value2 },
        pow() { this.result = this.value1 ** this.value2 },
        
        div() { 
            if (this.value2 === 0) {
                this.result = 'Error: Divide by 0';
            } else {
                this.result = this.value1 / this.value2;
            }
        },
        
        mod() { 
            if (this.value2 === 0) {
                this.result = 'Error: Divide by 0';
            } else {
                this.result = this.value1 % this.value2;
            }
        }
    }

    let result = 0;
 
    for (let key in operations) {
        if (operator === key) {
            operations.value1 = val_1;
            operations.value2 = val_2;
            operations[key]();
            result = operations.result;
            break;
        }
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

