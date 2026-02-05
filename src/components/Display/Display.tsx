import styles from "./Display.module.scss";

interface DisplayProps {
  value: string;
}

function Display({ value }: DisplayProps) {
  return (
    <div className={styles.display}>
      <span className={styles.displayText}>{value}</span>
    </div>
  );
}

export default Display;
