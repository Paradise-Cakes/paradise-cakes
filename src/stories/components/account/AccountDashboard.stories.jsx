import AccountDashboard from "../../../components/account/AccountDashboard";
import { getUserAttributes } from "../../../utils/amplify.mock";

export default {
  component: AccountDashboard,
};

export const WithUser = {
  async beforeEach() {
    getUserAttributes.mockReturnValue({
      given_name: "John",
      family_name: "Doe",
    });
  },
};
