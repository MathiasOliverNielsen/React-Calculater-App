import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "number" | "operator" | "equals" | "clear";
  wide?: boolean;
}

function Button({ children, onClick, variant = "number", wide = false }: ButtonProps) {
  const buttonClass = [styles.button, styles[variant], wide ? styles.wide : ""].filter(Boolean).join(" ");

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
