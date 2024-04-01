import React from "react";
import {Grid} from "@mui/material";
import Navbar from "./components/navigation/Navbar";
import NavSideDrawer from "./components/navigation/NavSideDrawer";
import Cart from "./components/navigation/cart/Cart";
import About from "./components/about/About";
import Shop from "./components/shop/Shop";
import {DrawerProvider} from "./context/DrawerContext";
import {CartProvider} from "./context/CartContext";
import {AccountProvider} from "./context/AccountContext";
import {Route, Routes} from "react-router-dom";
import DessertDetail from "./components/dessert/DessertDetail";
import CreateDessert from "./components/admin/CreateDessert";
import {QueryClient, QueryClientProvider} from "react-query";
import {Container} from "@mui/system";
import {IngredientsProvider} from "./context/IngredientsContext";
import CustomOrderForm from "./components/forms/custom-order/CustomOrderForm";
import SignIn from "./components/navigation/auth/SignIn";
import SignUp from "./components/navigation/auth/SignUp";
import ConfirmationCode from "./components/navigation/auth/ConfirmationCode";
import LoggedInModal from "./components/navigation/auth/LoggedInModal";
import AccountDashboard from "./components/account/AccountDashboard";

const queryClient = new QueryClient();

function App() {
	return (
		<Container
			sx={{
				my: {xs: 16, sm: 16, md: 24},
			}}
			maxWidth={"false"}
		>
			<QueryClientProvider client={queryClient}>
				<DrawerProvider drawerOpen={false}>
					<AccountProvider
						signInModalOpen={false}
						signUpModalOpen={false}
						confirmationCodeModalOpen={false}
					>
						<CartProvider cartOpen={false} cartItems={[]}>
							<IngredientsProvider ingredientsOpen={false}>
								<Navbar/>
								<NavSideDrawer/>
								<SignIn/>
								<ConfirmationCode/>
								<LoggedInModal/>
								<SignUp/>
								<Cart/>
								<Routes>
									<Route path="/" element={<Shop/>}/>
									<Route path="/about-me" element={<About/>}/>
									<Route
										path="/admin/create-dessert"
										element={<CreateDessert/>}
									/>
									<Route
										path="/desserts/cakes/:dessertId/:dessertName"
										element={<DessertDetail/>}
									/>
									<Route path="/custom-order" element={<CustomOrderForm/>}/>
									<Route path="/account" element={<AccountDashboard/>}/>
								</Routes>
							</IngredientsProvider>
						</CartProvider>
					</AccountProvider>
				</DrawerProvider>
			</QueryClientProvider>
		</Container>
	);
}

export default App;
