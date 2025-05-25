import { Grid } from "@mui/material";
import Dessert from "../../../components/dessert/Dessert";
import { desserts } from "../../mocks/mockDesserts";

export default {
  component: Dessert,
};

export const UserView = {
  args: {
    dessert: desserts[0],
  },
};

export const AdminView = {
  args: {
    dessert: desserts[0],
    inAdminView: true,
  },
};

export const Skeleton = {
  args: {
    dessert: {},
    inAdminView: false,
    isLoading: true,
  },
};
