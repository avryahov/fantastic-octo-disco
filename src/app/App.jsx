import React, {useState} from 'react';
import styles from './app.module.css';

const buttonValues = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
];

const operationSymbols = ['+', '-', '*', '/'];

export const App = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleButtonClick = (value) => {
        if (value === 'C') {
            setInput('');
            setResult('');
            return;
        }

        if (operationSymbols.includes(value)) {
            handleOperation(value);
            return;
        }

        if (value === '=') {
            calculateResult();
            return;
        }

        // Prevent leading zeros except for the first digit after 'C'
        if (input === '' && value !== '0') {
            setInput(value);
        } else if (input === '0' && value === '0') {
            setInput('0');
        } else {
            setInput(input + value);
        }
    };

    const handleOperation = (operation) => {
        if (input !== '') {
            setResult(input + operation);
            setInput(''); // Clear input after pressing an operator
        }
    };

    const calculateResult = () => {
        try {
            const expr = result + input;
            const calculatedResult = eval(expr);
            setResult(calculatedResult.toString());
            setInput('');
        } catch {
            setResult('Error');
            setInput('');
        }
    };

    return (
            <div className={styles.container}>
                <div className={styles.display}>{input || result}</div>
                <div className={styles.buttonContainer}>
                    {buttonValues.map((value) => (
                            <button
                                    key={value}
                                    className={`${styles.button} ${operationSymbols.includes(value) ? styles.operation : ''} ${value === '=' ? styles.equal : ''} ${value === 'C' ? styles.clear : ''}`}
                                    onClick={() => handleButtonClick(value)}
                            >
                                {value}
                            </button>
                    ))}
                </div>
            </div>
    );
};

