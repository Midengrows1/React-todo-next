import s from "./App.module.sass";
import Tasks from "./components/Tasks/Tasks";
import TodoForm from "./components/TodoForm/TodoForm";
import Layout from "./Layout/Layout";
function App() {
  return (
    <div className={s.app}>
      <Layout>
        <div className={s.container_app}>
          <Tasks />
          <TodoForm />
        </div>
      </Layout>
    </div>
  );
}

export default App;
