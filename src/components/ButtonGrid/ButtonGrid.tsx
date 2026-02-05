import Button from "../Button/Button";
import styles from "./ButtonGrid.module.scss";

interface ButtonGridProps {
  onNumberClick: (number: string) => void;
  onOperationClick: (operation: string) => void;
  onEqualsClick: () => void;
  onClearClick: () => void;
  onDecimalClick: () => void;
}

const ButtonGrid = ({ onNumberClick, onOperationClick, onEqualsClick, onClearClick, onDecimalClick }: ButtonGridProps) => {
  return (
    <div className={styles.buttonGrid}>
      <Button variant="clear" onClick={onClearClick}>
        C
      </Button>
      <Button variant="operator" onClick={() => onOperationClick("/")}>
        /
      </Button>
      <Button variant="operator" onClick={() => onOperationClick("*")}>
        ×
      </Button>
      <Button variant="operator" onClick={() => onOperationClick("-")}>
        -
      </Button>

      <Button variant="number" onClick={() => onNumberClick("7")}>
        7
      </Button>
      <Button variant="number" onClick={() => onNumberClick("8")}>
        8
      </Button>
      <Button variant="number" onClick={() => onNumberClick("9")}>
        9
      </Button>
      <Button variant="operator" onClick={() => onOperationClick("+")} wide={false}>
        +
      </Button>

      <Button variant="number" onClick={() => onNumberClick("4")}>
        4
      </Button>
      <Button variant="number" onClick={() => onNumberClick("5")}>
        5
      </Button>
      <Button variant="number" onClick={() => onNumberClick("6")}>
        6
      </Button>

      <Button variant="number" onClick={() => onNumberClick("1")}>
        1
      </Button>
      <Button variant="number" onClick={() => onNumberClick("2")}>
        2
      </Button>
      <Button variant="number" onClick={() => onNumberClick("3")}>
        3
      </Button>
      <Button variant="equals" onClick={onEqualsClick}>
        =
      </Button>

      <Button variant="number" onClick={() => onNumberClick("0")} wide>
        0
      </Button>
      <Button variant="number" onClick={onDecimalClick}>
        ,
      </Button>
    </div>
  );
};

export default ButtonGrid;
