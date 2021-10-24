import styles from "./app.module.css";
import Button from "components/atoms/button";

const App = (): JSX.Element => {
  return (
    <div className={styles.app}>
      <div>
        <Button>This is a button</Button>
      </div>
    </div>
  );
};

export default App;
