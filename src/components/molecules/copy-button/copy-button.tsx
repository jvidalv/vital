import { ComponentProps, forwardRef, useMemo, useState } from "react";
import {
  CheckCircleIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

import styles from "./copy-button.module.css";

interface Props
  extends Omit<ComponentProps<"div">, "className" | "onClick" | "title"> {
  text: string;
}

const CopyButton = forwardRef<HTMLDivElement, Props>(
  ({ text, ...rest }, ref) => {
    const [copied, setCopied] = useState(false);
    const onClick = () => {
      navigator.clipboard?.writeText(text).then(() => setCopied(true));
    };

    const Icon = useMemo(
      () => (copied ? CheckCircleIcon : DocumentDuplicateIcon),
      [copied]
    );
    const title = copied ? "Copied" : "Click to copy to clipboard";

    return (
      <div
        {...rest}
        ref={ref}
        role="button"
        className={styles.button}
        onClick={onClick}
        title={title}
      >
        <span className={styles.buttonInner}>
          <span className={styles.dollar} aria-hidden="true">
            ${" "}
          </span>
          {text}
        </span>
        <span className={styles.srOnly}>(click to copy to clipboard)</span>
        <div>
          <Icon className={styles.icon} />
        </div>
      </div>
    );
  }
);

export default CopyButton;
