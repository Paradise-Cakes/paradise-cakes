import AnimatedBanner from "../../../components/extras/AnimatedBanner";

export default {
  component: AnimatedBanner,
};

export const Base = {
  args: {
    messages: [
      "Welcome to Paradise Cakes!",
      "Freshly baked every day.",
      "Order online for delivery or pickup.",
      "Special discounts on weekends!",
    ],
    cycleTime: 3000, // 3 seconds
  },
};
