import { useReducer, useEffect } from "react";
import Display from "../Display/Display";
import ButtonGrid from "../ButtonGrid/ButtonGrid";
import styles from "./Calculator.module.scss";

interface CalculatorState {
  display: string;
  previousValue: number | null;
  operator: string | null;
  waitingForNewValue: boolean;
}

type CalculatorAction =
  | { type: "INPUT_NUMBER"; payload: string }
  | { type: "INPUT_OPERATOR"; payload: string }
  | { type: "CALCULATE" }
  | { type: "CLEAR" }
  | { type: "INPUT_DECIMAL" }
  | { type: "BACKSPACE" };

const initialState: CalculatorState = {
  display: "0",
  previousValue: null,
  operator: null,
  waitingForNewValue: false,
};

function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case "INPUT_NUMBER":
      if (state.waitingForNewValue) {
        return {
          ...state,
          display: action.payload,
          waitingForNewValue: false,
        };
      }
      return {
        ...state,
        display: state.display === "0" ? action.payload : state.display + action.payload,
      };

    case "INPUT_DECIMAL":
      if (state.waitingForNewValue) {
        return {
          ...state,
          display: "0.",
          waitingForNewValue: false,
        };
      }
      if (state.display.includes(".")) {
        return state;
      }
      return {
        ...state,
        display: state.display + ".",
      };

    case "INPUT_OPERATOR":
      const currentValue = parseFloat(state.display);

      if (state.previousValue === null) {
        return {
          ...state,
          previousValue: currentValue,
          operator: action.payload,
          waitingForNewValue: true,
        };
      }

      if (state.operator && state.waitingForNewValue) {
        return {
          ...state,
          operator: action.payload,
        };
      }

      const result = calculate(state.previousValue, currentValue, state.operator!);

      return {
        ...state,
        display: String(result),
        previousValue: result,
        operator: action.payload,
        waitingForNewValue: true,
      };

    case "CALCULATE":
      if (state.operator && state.previousValue !== null) {
        const currentValue = parseFloat(state.display);
        const result = calculate(state.previousValue, currentValue, state.operator);

        return {
          ...state,
          display: String(result),
          previousValue: null,
          operator: null,
          waitingForNewValue: true,
        };
      }
      return state;

    case "CLEAR":
      return initialState;

    case "BACKSPACE":
      if (state.waitingForNewValue) {
        return state;
      }
      if (state.display.length > 1) {
        return {
          ...state,
          display: state.display.slice(0, -1),
        };
      }
      return {
        ...state,
        display: "0",
      };

    default:
      return state;
  }
}

function calculate(firstValue: number, secondValue: number, operator: string): number {
  switch (operator) {
    case "+":
      return firstValue + secondValue;
    case "-":
      return firstValue - secondValue;
    case "*":
      return firstValue * secondValue;
    case "/":
      return secondValue !== 0 ? firstValue / secondValue : 0;
    default:
      return secondValue;
  }
}

function Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleNumber = (number: string) => {
    dispatch({ type: "INPUT_NUMBER", payload: number });
  };

  const handleOperator = (operator: string) => {
    dispatch({ type: "INPUT_OPERATOR", payload: operator });
  };

  const handleEquals = () => {
    dispatch({ type: "CALCULATE" });
  };

  const handleClear = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleDecimal = () => {
    dispatch({ type: "INPUT_DECIMAL" });
  };

  // Keyboard event handler
  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;

    // Numbers (both regular and numpad)
    if (/^[0-9]$/.test(key)) {
      handleNumber(key);
      event.preventDefault();
    }
    // Operators
    else if (key === "+") {
      handleOperator("+");
      event.preventDefault();
    } else if (key === "-") {
      handleOperator("-");
      event.preventDefault();
    } else if (key === "*") {
      handleOperator("*");
      event.preventDefault();
    } else if (key === "/") {
      handleOperator("/");
      event.preventDefault();
    }
    // Equals (Enter or = key)
    else if (key === "Enter" || key === "=") {
      handleEquals();
      event.preventDefault();
    }
    // Clear (Escape or Delete)
    else if (key === "Escape" || key === "Delete") {
      handleClear();
      event.preventDefault();
    }
    // Decimal point
    else if (key === "." || key === ",") {
      handleDecimal();
      event.preventDefault();
    }
    // Backspace (delete last digit)
    else if (key === "Backspace") {
      dispatch({ type: "BACKSPACE" });
      event.preventDefault();
    }
  };

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [state.display]); // Dependency needed for proper event handler updates

  const getDisplayText = () => {
    let displayText = "";

    if (state.previousValue !== null && state.operator) {
      displayText = `${state.previousValue} ${state.operator} `;
      if (!state.waitingForNewValue) {
        displayText += state.display;
      }
    } else {
      displayText = state.display;
    }

    return displayText;
  };

  return (
    <div className={styles.calculator} tabIndex={0}>
      <Display value={getDisplayText()} />
      <ButtonGrid onNumberClick={handleNumber} onOperationClick={handleOperator} onEqualsClick={handleEquals} onClearClick={handleClear} onDecimalClick={handleDecimal} />
    </div>
  );
}

export default Calculator;
