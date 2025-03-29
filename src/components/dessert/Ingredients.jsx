import React, { useContext } from "react";
import {
  Container,
  Box,
  Typography,
  useTheme,
  Drawer,
  Button,
} from "@mui/material";
import { CgClose } from "react-icons/cg";
import { IngredientsContext } from "../../context/IngredientsContext";
import _ from "lodash";
import { Link } from "react-router-dom";

export default function Ingredients({ ingredients }) {
  const theme = useTheme();
  const allergens = [
    "milk",
    "eggs",
    "wheat",
    "soy",
    "nuts",
    "almonds",
    "pecans",
    "pisatchios",
    "cashews",
    "sesame",
  ];
  const { ingredientsOpen, setIngredientsOpen } =
    useContext(IngredientsContext);

  const toggleIngredients = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIngredientsOpen(open);
  };

  const isIngredientAllergen = (ingredient) => {
    return _.some(allergens, (allergen) => ingredient.includes(allergen));
  };

  const doIngredientsContainAllergens = () => {
    return ingredients?.some((ingredient) =>
      allergens?.some((allergen) => ingredient.includes(allergen))
    );
  };

  return (
    <Drawer
      hideBackdrop={false}
      anchor="right"
      open={ingredientsOpen}
      onClose={toggleIngredients(false)}
      sx={{
        position: "relative",
      }}
      PaperProps={{
        sx: {
          overflowX: "hidden",
          padding: "4rem",
        },
      }}
    >
      <Container
        sx={{
          height: "90%",
          width: { xs: "100%", sm: "500px", md: "600px" },
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <CgClose
            style={{
              cursor: "pointer",
              width: "25px",
              height: "25px",
              marginBottom: "1rem",
              marginRight: "1rem",
              color: `${theme.palette.primary.main}`,
              position: "absolute",
              left: "1rem",
              top: "1rem",
            }}
            onClick={toggleIngredients(false)}
          />
          {doIngredientsContainAllergens() && (
            <Box marginBottom={"2rem"}>
              <Typography variant="h6" fontSize="1rem">
                This dessert contains:
              </Typography>
              <Box display={"flex"} width="100%" sx={{ flexWrap: "wrap" }}>
                {ingredients?.map(
                  (ingredient, index) =>
                    isIngredientAllergen(ingredient) && (
                      <Box
                        sx={{ marginRight: "2rem", marginBottom: "1rem" }}
                        key={ingredient}
                      >
                        {_.startCase(ingredient)}
                      </Box>
                    )
                )}
              </Box>
            </Box>
          )}
          <Typography variant="h6" fontSize="1rem">
            Ingredients:
          </Typography>
          <Box
            display={"flex"}
            width="100%"
            sx={{ flexWrap: "wrap", marginBottom: "2rem" }}
          >
            {ingredients?.map((ingredient, index) => (
              <Box sx={{ marginRight: "1rem" }} key={ingredient}>
                {_.upperCase(ingredient)}
                {index !== ingredients.length - 1 ? "," : ""}
              </Box>
            ))}
          </Box>
          <Typography
            variant="h6"
            fontSize="1rem"
            sx={{ marginBottom: "1rem", textAlign: "center" }}
          >
            Have a food allergy? Request a custom order below!
          </Typography>
          <Button
            color="info"
            variant="contained"
            sx={{ width: "fit-content", margin: "0 auto" }}
            component={Link}
            to="/custom-order"
          >
            Custom Order
          </Button>
        </Box>
      </Container>
    </Drawer>
  );
}
