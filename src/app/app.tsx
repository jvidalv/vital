import Logos from "components/atoms/logos";
import Card from "components/organisms/card";
import {
  BeakerIcon,
  BookmarkIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  PhoneXMarkIcon,
  Bars3Icon,
  PencilIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Button from "components/atoms/button";
import CopyButton from "components/molecules/copy-button";

const features = [
  {
    name: "Vite 7",
    description:
      "Next-generation frontend tooling with lightning-fast HMR and optimized builds.",
    logo: CubeTransparentIcon,
    docs: "https://vitejs.dev/",
  },
  {
    name: "React 19",
    description: "Latest React with improved performance and new features.",
    logo: PencilIcon,
    docs: "https://react.dev/",
  },
  {
    name: "TypeScript 5.9",
    description:
      "Strict type checking for robust and maintainable code.",
    logo: BookmarkIcon,
    docs: "https://www.typescriptlang.org/",
  },
  {
    name: "Tailwind CSS v4",
    description: "CSS-first utility framework with new directives and improved DX.",
    logo: PhotoIcon,
    docs: "https://tailwindcss.com/",
  },
  {
    name: "ESLint 9",
    description: "Flat config format for modern JavaScript and TypeScript linting.",
    logo: BeakerIcon,
    docs: "https://eslint.org/",
  },
  {
    name: "Prettier 3",
    description: "Opinionated code formatter for consistent code style.",
    logo: Bars3Icon,
    docs: "https://prettier.io/",
  },
  {
    name: "Atomic Design",
    description:
      "Structured component architecture from atoms to organisms.",
    logo: PhoneXMarkIcon,
    docs: "https://bradfrost.com/blog/post/atomic-web-design/",
  },
  {
    name: "Path Aliases",
    description:
      "Clean imports using path aliases for components, app, and hooks.",
    logo: ChevronDownIcon,
    docs: "https://github.com/vitejs/vite/issues/88#issuecomment-762415200",
  },
];

function App() {
  return (
    <main>
      <header className="pt-16 z-10 relative max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <h3 className="text-2xl sm:text-4xl leading-none font-bold tracking-tight text-purple-200">
          <span className="text-[gold] opacity-75">Vital</span> @ Vite Template
        </h3>
        <h1 className="text-6xl lg:text-7xl leading-none font-extrabold tracking-tight mb-8 sm:mb-10 text-purple-400">
          React 19 + TypeScript + Tailwind v4
        </h1>
        <p className="max-w-screen-lg text-lg sm:text-xl  text-gray-300 font-medium mb-10 sm:mb-11">
          Bootstrap your web projects faster than ever. Comes with:{" "}
          <code className="font-mono text-blue-500 font-bold">Tailwind CSS v4</code>
          , <code className="font-mono text-blue-500 font-bold">Commitlint</code>
          , <code className="font-mono text-blue-500 font-bold">ESLint</code>,{" "}
          <code className="font-mono text-blue-500 font-bold">Prettier</code>,{" "}
          <code className="font-mono text-blue-500 font-bold">lint-staged</code>{" "}
          and{" "}
          <code className="font-mono text-blue-500 font-bold">
            Atomic Design pattern
          </code>
          . Configured and ready to go.
        </p>
        <div className="absolute top-12 right-12 opacity-10 lg:opacity-50">
          <Logos.Vite className="w-56 h-56" />
        </div>
      </header>
      <section className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="sm:flex sm:space-x-6 space-y-4 sm:space-y-0 items-center">
          <a href="https://github.com/jvidalv/vital">
            <Button>Visit on Github</Button>
          </a>
          <CopyButton text="npx degit jvidalv/vital my-app" />
        </div>
      </section>
      <section className="max-w-screen-lg xl:max-w-screen-xl mx-auto grid grid-cols-10 gap-4">
        {features.map((props, index) => (
          <div key={index} className="col-span-10 sm:col-span-5">
            <Card
              title={props.name}
              description={props.description}
              Icon={props.logo}
              href={props.docs}
            />
          </div>
        ))}
      </section>
      <footer className="pb-16 max-w-screen-lg xl:max-w-screen-xl mx-auto text-center sm:text-right text-gray-400 font-bold">
        <a href="https://github.com/jvidalv">
          Josep Vidal @ {new Date().getFullYear()}
        </a>
      </footer>
    </main>
  );
}

export default App;
