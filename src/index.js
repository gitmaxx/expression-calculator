function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
        let stack = [];
        let output = [];
        let currentSym = '';
        let input = [];
        let currentChar='';
        let currentNumber='';
        let operations = {'+': 1, '-': 1, '*': 2, '/': 2};

        for (let i=0; i<=expr.length-1; i++) {
            currentChar=expr[i];
            if (!isNaN(currentChar) && currentChar!=' ' ) {
                currentNumber=currentNumber+currentChar;
                let j=1;
                while ((i+j)<=(expr.length-1) && (!isNaN(expr[i+j]) && expr[i+j]!=' ' )) {
                    currentNumber=currentNumber+expr[i+j];
                    j++;
                }
                i=i+j-1;
                input.push(currentNumber);
                currentNumber=''
            } else {
                if ((currentChar in operations) || currentChar == '(' || currentChar == ')') {
                    input.push(currentChar);
                }
            }
        }
        for (let i=0; i<=input.length - 1; i++) {
            currentSym = input[i];
            if (!isNaN(currentSym)) {
                output.push(currentSym);
            }
            if (currentSym in operations) {
                while (stack[stack.length-1] in operations && operations[currentSym] <= operations[stack[stack.length-1]])
                  output.push(stack.pop());
                stack.push(currentSym);
              }
            if (currentSym == '(') {
                stack.push(currentSym);
              }

            if (currentSym == ')') {
                
                while (stack[stack.length-1] != '(') {
                    output.push(stack.pop());
                    if (stack.length == 0) { throw new TypeError('ExpressionError: Brackets must be paired');}
                }
                 
                stack.pop();
               
            }
        }
        
        if (stack.includes('(')) {
            throw new TypeError('ExpressionError: Brackets must be paired');
        }
        output= output.concat(stack.reverse());
        stack=[]; 
        for (let i=0; i<=output.length-1;i++) {
            currentSym = output[i];
            if (!isNaN(currentSym)) {
                stack.push(currentSym);
            } else {
             
                switch(currentSym) {
                    case '+':  
                        stack.push(Number(stack.splice(-2,1)[0]) + Number(stack.pop()));
                    break;
                  
                    case '-': 
                         stack.push(Number(stack.splice(-2,1)[0]) - Number(stack.pop()));
                    break;
                  
                    case '*': 
                      stack.push(Number(stack.splice(-2,1)[0]) * Number(stack.pop()));
                    break;
                    case '/': 
                      let f1 = Number(stack.splice(-2,1)[0]);
                      let f2 = Number(stack.pop());
                      if (f2!=0) {
                          stack.push(f1/f2);
                      } else {
                          throw new TypeError('TypeError: Division by zero.');
                      }
                    break;
                  }
            }

        }

        return +stack[0];
}

module.exports = {
    expressionCalculator
}