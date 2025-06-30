import {useState} from 'react';
import s from './app.module.css';

const buttonValues = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
];

const operations = ['+', '-', '*', '/'];

export const App = () => {
    const [operand1, setOperand1] = useState('');
    const [operand2, setOperand2] = useState('');
    const [operator, setOperator] = useState('');
    const [isResult, setIsResult] = useState(false);

    const handleButtonClick = (value) => {
        if (value === 'C') {
            setOperand1('');
            setOperand2('');
            setOperator('');
            setIsResult(false);
            return;
        }

        if (value === '=') {
            if (operand1 && operator && operand2) {
                const num1 = parseFloat(operand1);
                const num2 = parseFloat(operand2);
                let result = '';

                switch (operator) {
                    case '+':
                        result = num1 + num2;
                        break;
                    case '-':
                        result = num1 - num2;
                        break;
                    case '*':
                        result = num1 * num2;
                        break;
                    case '/':
                        result = num2 !== 0 ? num1 / num2 : 'Error';
                        break;
                    default:
                        result = 'Error';
                }

                setOperand1(result.toString());
                setOperand2('');
                setOperator('');
                setIsResult(true);
            }
            return;
        }

        if (operations.includes(value)) {
            if (operand1 && !operator) {
                setOperator(value);
                setIsResult(false);
            }
            return;
        }

        if (isResult) {
            setOperand1(value);
            setOperand2('');
            setOperator('');
            setIsResult(false);
            return;
        }

        if (!operator) {
            setOperand1((prev) => prev === '0' && value !== '.' ? value : prev + value);
        } else {
            setOperand2((prev) => prev === '0' && value !== '.' ? value : prev + value);
        }
    };

    const getDisplay = () => {
        if (isResult) return operand1;
        if (operator && !operand2) return '';
        return operator ? operand2 : operand1;
    };

    return (
            <div className={s.container}>
                <div className={`${s.display} ${isResult ? s.result : ''}`}>
                    {getDisplay() || '0'}
                </div>
                <div className={s.buttonContainer}>
                    {buttonValues.map((val) => (
                            <button
                                    key={val}
                                    className={`
              ${s.button}
              ${operations.includes(val) ? s.operation : ''}
              ${val === '=' ? s.equal : ''}
              ${val === 'C' ? s.clear : ''}
            `}
                                    onClick={() => handleButtonClick(val)}
                            >
                                {val}
                            </button>
                    ))}
                </div>
            </div>
    );
};