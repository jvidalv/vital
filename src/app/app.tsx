import Logos from "components/atoms/logos";
import Card from "components/molecules/card";
import {
  BookmarkAltIcon,
  CubeTransparentIcon,
  PencilIcon,
  PhotographIcon,
  PuzzleIcon,
} from "@heroicons/react/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

import styles from "./app.module.css";

const features = [
  {
    name: "Vite",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    logo: CubeTransparentIcon,
    docs: "https://vitejs.dev/",
  },
  {
    name: "React",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    logo: PencilIcon,
    docs: "https://reactjs.org/",
  },
  {
    name: "TypeScript",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    logo: BookmarkAltIcon,
    docs: "https://www.typescriptlang.org/",
  },
  {
    name: "Tailwind",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    logo: PhotographIcon,
    docs: "https://tailwindcss.com/",
  },
  {
    name: "PostCSS",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    logo: PuzzleIcon,
    docs: "https://postcss.org/",
  },
  {
    name: "Jest",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    logo: QuestionMarkCircleIcon,
    docs: "https://jestjs.io/#",
  },
];

const App = (): JSX.Element => {
  return (
    <main className={styles.main}>
      <Logos.Vite className={styles.viteLogo} />
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          React + TypeScript + Tailwind @ Vite template
        </h1>
      </div>
      <div className={styles.content}>
        <section className={styles.features}>
          {features.map((props, index) => (
            <div
              key={index}
              className={styles.cardWrapper}
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              <Card
                title={props.name}
                description={props.description}
                Icon={props.logo}
                cta={
                  <div>
                    <a className={styles.cta} href={props.docs} target="_blank">
                      Visit documentation →
                    </a>
                  </div>
                }
              />
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default App;
