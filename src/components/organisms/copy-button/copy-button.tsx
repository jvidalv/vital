import { ComponentProps, forwardRef } from "react";
import { DocumentDuplicateIcon } from "@heroicons/react/outline";

import styles from "./copy-button.module.css";

interface Props
  extends Omit<ComponentProps<"div">, "className" | "onClick" | "title"> {
  text: string;
}

const CopyButton = forwardRef<HTMLDivElement, Props>(
  ({ children, text, ...rest }, ref) => {
    const onClick = () => {
      navigator.clipboard?.writeText(text);
    };

    return (
      <div
        ref={ref}
        role="button"
        className={styles.button}
        onClick={onClick}
        title="Click to copy to clipboard"
        {...rest}
      >
        <span className={styles.buttonInner}>
          <span className={styles.dollar} aria-hidden="true">
            ${" "}
          </span>
          {text}
        </span>
        <span className={styles.srOnly}>(click to copy to clipboard)</span>
        <div>
          <DocumentDuplicateIcon className={styles.icon} />
        </div>
      </div>
    );
  }
);

export default CopyButton;
