import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import styles from "./TextInput.module.css";

export type TextInputFocusVariant = "black" | "solidRed" | "redGradient";

export type TextInputProps = ComponentPropsWithoutRef<"input"> & {
  error?: boolean;
  focusVariant?: TextInputFocusVariant;
  leadingIcon?: ReactNode;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    "aria-invalid": ariaInvalid,
    className,
    error = false,
    focusVariant = "solidRed",
    leadingIcon,
    ...props
  },
  ref,
) {
  const inputClassName = [
    styles.input,
    styles[focusVariant],
    error && styles.error,
    leadingIcon && styles.withIcon,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={styles.root}>
      {leadingIcon && <span aria-hidden="true" className={styles.icon}>{leadingIcon}</span>}
      <input {...props} ref={ref} aria-invalid={error || ariaInvalid} className={inputClassName} />
    </span>
  );
});

TextInput.displayName = "TextInput";
