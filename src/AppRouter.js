import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Favorite } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import { usePeopleFetch } from "hooks";
const AppRouter = () => {
  const { users, isLoading } = usePeopleFetch();
  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/favorite">
            <Favorite />
          </Route>
          <Route path="/">
            <Home users={users} isLoading={isLoading} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
