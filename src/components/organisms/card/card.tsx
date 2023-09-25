import {
  forwardRef,
  ComponentProps,
  RefAttributes,
  ForwardRefExoticComponent,
  SVGProps,
} from "react";

export interface CardProps
  extends Omit<ComponentProps<"div">, "className" | "children"> {
  title: string;
  description: string;
  Icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
  href: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, Icon, href, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-white bg-opacity-5 rounded-md shadow p-4 relative overflow-hidden h-full"
        {...rest}
      >
        <div>
          <span className="absolute right-3 bottom-3 flex items-center justify-center rounded-md opacity-10">
            <Icon className="h-12 w-12 text-white" aria-hidden="true" />
          </span>
        </div>
        <div className="flex flex-col h-full">
          <h3 className="text-2xl font-bold text-blue-500">{title}</h3>
          <p className="mt-2 text-base text-gray-300 flex-1">{description}</p>
          <div className="pt-6">
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-white font-bold transition tracking-wide hover:text-blue-400"
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
