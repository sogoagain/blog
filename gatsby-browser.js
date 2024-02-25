import wrapWithProvider from "./src/WrapWithProvider";
import browserHydrate from "./src/browserHydrate";

export const wrapRootElement = wrapWithProvider;
export const replaceHydrateFunction = browserHydrate;
