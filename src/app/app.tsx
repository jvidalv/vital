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
    name: "Vite",
    description:
      "Faster and leaner development experience for modern web projects.",
    logo: CubeTransparentIcon,
    docs: "https://vitejs.dev/",
  },
  {
    name: "React",
    description: "JavaScript library for building user interfaces.",
    logo: PencilIcon,
    docs: "https://reactjs.org/",
  },
  {
    name: "TypeScript",
    description:
      "Strongly typed programming language that builds on JavaScript.",
    logo: BookmarkIcon,
    docs: "https://www.typescriptlang.org/",
  },
  {
    name: "Tailwind",
    description: "A utility-first CSS framework packed with classes.",
    logo: PhotoIcon,
    docs: "https://tailwindcss.com/",
  },
  {
    name: "ESLint",
    description: "Find and fix problems in your JavaScript code.",
    logo: BeakerIcon,
    docs: "https://eslint.org/",
  },
  {
    name: "Prettier",
    description: "An opinionated code formatter.",
    logo: Bars3Icon,
    docs: "https://prettier.io/",
  },
  {
    name: "Atomic design",
    description:
      "We’re not designing pages, we’re designing systems of components.",
    logo: PhoneXMarkIcon,
    docs: "https://bradfrost.com/blog/post/atomic-web-design/",
  },
  {
    name: "Relative imports",
    description:
      "Import resource using its full path from the project’s src folder.",
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
          React + TypeScript + Tailwind
        </h1>
        <p className="max-w-screen-lg text-lg sm:text-xl  text-gray-300 font-medium mb-10 sm:mb-11">
          Bootstrap your web projects faster than ever. Comes with:{" "}
          <code className="font-mono text-blue-500 font-bold">CSS-Modules</code>
          , <code className="font-mono text-blue-500 font-bold">Jest</code>,{" "}
          <code className="font-mono text-blue-500 font-bold">Husky</code>,{" "}
          <code className="font-mono text-blue-500 font-bold">Commit-lint</code>
          , <code className="font-mono text-blue-500 font-bold">ESLint</code>,{" "}
          <code className="font-mono text-blue-500 font-bold">Prettier</code>{" "}
          and{" "}
          <code className="font-mono text-blue-500 font-bold">
            Atomic organization for components
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
