import * as ReactDOM from "react-dom/client";

const browserHydrate = () => (element, container) => {
  const root = ReactDOM.createRoot(container);
  root.render(element);
};

export default browserHydrate;
