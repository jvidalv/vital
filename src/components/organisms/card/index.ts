import Card, { CardProps } from "./card";
import CallToAction, { CallToActionProps } from "./card.call-to-action";

export interface ICard {
  (props: CardProps): JSX.Element;
  CallToAction?: <Tag extends keyof JSX.IntrinsicElements>(
    props: CallToActionProps<Tag>
  ) => JSX.Element;
}

const C: ICard = Card;
C.CallToAction = CallToAction();

export default C;
