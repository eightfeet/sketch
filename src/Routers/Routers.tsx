import React, { JSXElementConstructor, useEffect } from "react";
import { Routes, Route, Outlet, HashRouter } from "react-router-dom";
import pages from "./pages";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import { QueryClientProvider, QueryClient } from "react-query";
import BlockLoading from "~/components/BlockLoading";
import { trackPageView } from "~/core/tracking";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: process.env.REACT_APP_PRO === "true",
    },
  },
});
interface Props {
  key: string;
  element:
    | React.ReactElement<any, string | JSXElementConstructor<any>>
    | null
    | undefined;
  index?: boolean;
  path?: string;
}

interface PagesProps {
  component: React.ComponentType;
  name: string;
}
const Pages: React.FC<PagesProps> = ({ component: Component, name }) => {
  useDocumentTitle(name, true);
  useEffect(() => {
    setTimeout(() => trackPageView(document.title), 1000);
  }, []);
  return <Component />;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <React.Suspense
          fallback={
            <BlockLoading style={{ width: "100vw", height: "100vh" }} />
          }
        >
          <Routes>
            <Route path="/" element={<Outlet />}>
              {pages.map(({ page, name, path, component }) => {
                const props: Props = {
                  key: page,
                  element: <Pages name={name} component={component} />,
                };
                page === "home"
                  ? (props.index = true)
                  : (props.path = path || page);
                return <Route {...props} />;
              })}
              <Route path="*" element={<div>页面不存在</div>} />
            </Route>
          </Routes>
        </React.Suspense>
      </HashRouter>
    </QueryClientProvider>
  );
}
