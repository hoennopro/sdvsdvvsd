import React from "react";
import { Provider } from "react-redux";
import { store } from "../server/src/app/store";
import Tasks from "../server/src/features/Tasks";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Tasks />
    </Provider>
  );
};

export default App;
