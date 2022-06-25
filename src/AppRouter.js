import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Favorite } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import { usePeopleFetch, useLocalStorage } from "hooks";
const AppRouter = () => {
  const { users, isLoading } = usePeopleFetch();
  const [usersFavorites, setUsersFavorites] = useLocalStorage("user", "");
  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/favorite">
            <Favorite
              usersFavorites={usersFavorites}
              setUsersFavorites={setUsersFavorites}
            />
          </Route>
          <Route path="/">
            <Home
              users={users}
              isLoading={isLoading}
              usersFavorites={usersFavorites}
              setUsersFavorites={setUsersFavorites} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
