const React = require("react");
require("@testing-library/jest-dom");

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    const { src, alt, ...rest } = props;
    const resolvedSrc = typeof src === "string" ? src : src?.src || "";
    return React.createElement("img", { src: resolvedSrc, alt, ...rest });
  },
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }) =>
    React.createElement("a", { href, ...rest }, children),
}));
