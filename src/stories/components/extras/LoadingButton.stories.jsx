import LoadingButton from "../../../components/extras/LoadingButton";

export default {
  component: LoadingButton,
};

export const Base = {
  args: {
    isLoading: false,
    label: "Submit",
    fullWidth: false,
    isDisabled: false,
  },
};

export const Loading = {
  args: {
    isLoading: true,
    label: "Loading...",
    fullWidth: false,
    isDisabled: false,
  },
};

export const Disabled = {
  args: {
    isDisabled: true,
    label: "Disabled",
    fullWidth: false,
  },
};

export const FullWidth = {
  args: {
    isLoading: false,
    label: "Full Width",
    fullWidth: true,
    isDisabled: false,
  },
};
