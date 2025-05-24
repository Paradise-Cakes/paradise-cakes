import { fn } from "@storybook/test";

import * as actual from "./amplify";

export const getUserAttributes = fn(actual.getUserAttributes).mockName(
  "getUserAttributes"
);
