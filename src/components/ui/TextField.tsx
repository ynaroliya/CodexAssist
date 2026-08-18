import { forwardRef, type ReactNode, useId } from "react";
import { TextInput, type TextInputProps } from "./TextInput";
import styles from "./TextField.module.css";

export type TextFieldProps = Omit<TextInputProps, "error"> & {
  errorMessage?: ReactNode;
  helperText?: ReactNode;
  label: ReactNode;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    "aria-describedby": ariaDescribedBy,
    errorMessage,
    helperText,
    id,
    label,
    ...inputProps
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const description = errorMessage ?? helperText;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const describedBy = [ariaDescribedBy, descriptionId].filter(Boolean).join(" ") || undefined;
  const hasError = Boolean(errorMessage);

  return (
    <div className={styles.root}>
      <label className={styles.label} htmlFor={inputId}>{label}</label>
      <TextInput
        {...inputProps}
        ref={ref}
        aria-describedby={describedBy}
        error={hasError}
        id={inputId}
      />
      {description && (
        <p className={hasError ? styles.error : styles.helper} id={descriptionId}>
          {description}
        </p>
      )}
    </div>
  );
});

TextField.displayName = "TextField";
