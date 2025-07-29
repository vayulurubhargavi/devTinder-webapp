import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Profile from "./Profile";
import Login from "./Login";
import Feed from "./Feed";
import { Provider } from "react-redux";
import store from "../store/appStore";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
