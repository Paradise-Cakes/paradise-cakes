import React, { useContext } from "react";
import { Container, Box, Typography, useTheme, Drawer } from "@mui/material";
import { CgClose } from "react-icons/cg";
import { IngredientsContext } from "../../context/IngredientsContext";
import _ from "lodash";

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
    return ingredients.some((ingredient) =>
      allergens.some((allergen) => ingredient.includes(allergen))
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
        },
      }}
    >
      <Container sx={{ height: "100%", width: { xs: "100vw", sm: "600px" } }}>
        <Box
          px={3}
          py={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
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
            }}
            onClick={toggleIngredients(false)}
          />
          {doIngredientsContainAllergens() && (
            <Box>
              <Typography variant="h6" fontWeight={1000} fontSize="1rem">
                This dessert contains:
              </Typography>
              <Box display={"flex"}>
                {ingredients.map(
                  (ingredient, index) =>
                    isIngredientAllergen(ingredient) && (
                      <Box key={ingredient}>{ingredient}</Box>
                    )
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Drawer>
  );
}
