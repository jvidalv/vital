import { forwardRef, ComponentProps } from "react";

import styles from "./card.module.css";

export interface CardProps
  extends Omit<ComponentProps<"div">, "className" | "children"> {
  title: string;
  description: string;
  Icon: (props: ComponentProps<"svg">) => JSX.Element;
  href: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, Icon, href, ...rest }, ref) => {
    return (
      <div ref={ref} className={styles.card} {...rest}>
        <div>
          <span className={styles.iconContainer}>
            <Icon className={styles.icon} aria-hidden="true" />
          </span>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.callToActionContainer}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className={styles.callToActionElement}
            >
              Visit documentation →
            </a>
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
