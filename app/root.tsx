import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import type { LinksFunction } from "remix";
import { Form } from "react-light-form";
import { Box, defaultInputClassNames, Footer, Navbar, ToTop } from "~/shared";
import tailwindStyles from "~/styles/tailwind.css";
import { RemixIcon, TailwindIcon } from "~/icons";
import { AppProviders } from "~/providers";

Form.configure({
  input: {
    default: {
      container: ({
        errorContainerRender,
        inputContainerRender,
        labelContainerRender,
      }) => (
        <Box className="my-4">
          <Box>
            <Box>{labelContainerRender()}</Box>
            <Box>{inputContainerRender()}</Box>
          </Box>
          {errorContainerRender()}
        </Box>
      ),
      inputContainer: (props) => (
        <input
          {...props}
          className={`input ${defaultInputClassNames}`} //appearance-none rounded-md relative block px-3 py-2 border border-gray-300 placeholder-primary-content text-primary-content focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
      ),
      labelContainer: ({ label, name }) => (
        // <label htmlFor={name} className="label">
        //   <span className="label-text">{label}</span>
        // </label>
        <></>
      ),
      errorContainer: () => (
        // <label className="label">
        //   <span className="label-text-alt">Your bio</span>
        //   <span className="label-text-alt">Alt label</span>
        // </label>
        <></>
      ),
    },
  },
});

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: tailwindStyles,
    },
  ];
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box className="overflow-hidden">
      <Box className="min-h-screen">{children}</Box>
      <ToTop />
    </Box>
  );
}
