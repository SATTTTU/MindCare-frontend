import { AppProvider } from "./provider";
import { AppRouter } from "./router";
import { NotFoundPage } from "./routes/not-found";

export const App = () => {
  return(
    <AppProvider>
      <AppRouter />
      <NotFoundPage/>
    </AppProvider>
  );
}