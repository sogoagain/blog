import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "node:util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// eslint-disable-next-line no-underscore-dangle
global.___loader = { enqueue: jest.fn() };
