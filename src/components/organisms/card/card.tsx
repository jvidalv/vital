import { forwardRef, ComponentProps } from "react";

import styles from "./card.module.css";

export interface CardProps
  extends Omit<ComponentProps<"div">, "className" | "children"> {
  title: string;
  description: string;
  Icon: (props: ComponentProps<"svg">) => JSX.Element;
  callToAction: JSX.Element;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, callToAction, Icon, ...rest }, ref) => {
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
          {callToAction}
        </div>
      </div>
    );
  }
);

export default Card;
