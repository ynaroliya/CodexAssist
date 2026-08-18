import { forwardRef, type ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "black" | "solidRed" | "redGradient" | "secondary" | "tertiary";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  loading?: boolean;
  loadingLabel?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    disabled = false,
    loading = false,
    loadingLabel = "Loading",
    type = "button",
    variant = "solidRed",
    ...props
  },
  ref,
) {
  const isUnavailable = disabled || loading;
  const buttonClassName = [styles.button, styles[variant], loading && styles.loading, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...props}
      ref={ref}
      aria-busy={loading || undefined}
      className={buttonClassName}
      disabled={isUnavailable}
      type={type}
    >
      {loading ? (
        <>
          <span aria-hidden="true" className={styles.spinner} />
          <span>{loadingLabel}</span>
        </>
      ) : children}
    </button>
  );
});

Button.displayName = "Button";
