import { forwardRef, ComponentProps } from "react";

import styles from "./card.module.css";

interface CardProps
  extends Omit<ComponentProps<"div">, "className" | "children"> {
  title: string;
  description: string;
  Icon: (props: ComponentProps<"svg">) => JSX.Element;
  cta: JSX.Element;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, cta, Icon, ...rest }, ref) => {
    return (
      <div ref={ref} className={styles.card} {...rest}>
        <div>
          <span className={styles.iconContainer}>
            <Icon className={styles.icon} aria-hidden="true" />
          </span>
        </div>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        {cta}
      </div>
    );
  }
);

export default Card;
