import React, { useState } from "react";
import {
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
  Chip,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Skeleton, Button, Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useDeleteDessert,
  usePatchDessert,
} from "../../hooks/dessert/DessertHook";

export default function Dessert({
  dessert,
  inAdminView = false,
  isLoading = false,
  isVisible: initialVisible = false,
}) {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const deleteDessertQuery = useDeleteDessert(dessert?.dessert_id);
  const theme = useTheme();
  const {
    mutateAsync: deleteDessert,
    isLoading: isDeleteDessertLoading,
    error: deleteDessertError,
  } = deleteDessertQuery;
  const patchDessertQuery = usePatchDessert(dessert?.dessert_id);
  const {
    mutateAsync: patchDessert,
    isLoading: isPatchDessertLoading,
    error: patchDessertError,
  } = patchDessertQuery;

  const navigate = useNavigate();

  return (
    <Card
      data-testid="dessert-card"
      key={dessert?.dessert_id}
      sx={{
        borderRadius: "12px",
        boxShadow: 3,
        position: "relative",
        border: `2px solid ${theme.palette.primary.main}`,
      }}
      onClick={() =>
        navigate(`/desserts/${dessert?.dessert_id}/${dessert?.name}`)
      }
    >
      <CardActionArea>
        {isLoading || isDeleteDessertLoading ? (
          <Skeleton
            data-testid="dessert-card-image-skeleton"
            variant="rectangular"
            animation="wave"
            sx={{
              aspectRatio: "1/1",
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <CardMedia
            component="img"
            image={dessert?.images[0]?.url}
            sx={{ aspectRatio: "1/1" }}
          />
        )}
        <CardContent
          sx={{
            fontSize: "1rem",
            textAlign: "center",
            borderTop: `2px solid ${theme.palette.primary.main}`,
          }}
        >
          {isLoading || isDeleteDessertLoading ? (
            <Skeleton
              data-testid="dessert-card-name-skeleton"
              variant="text"
              animation="wave"
              sx={{ fontSize: "1.25rem", width: "80%", mx: "auto" }}
            />
          ) : (
            <Typography
              variant="h6"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {dessert?.name?.toUpperCase()}
              {dessert?.special_tag && (
                <Chip
                  label={dessert?.special_tag}
                  sx={{
                    top: "2rem",
                    left: "2rem",
                    position: "absolute",
                    backgroundColor: "white",
                    fontSize: "1rem",
                    "& .MuiChip-label": {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              )}
            </Typography>
          )}
          {isLoading || isDeleteDessertLoading ? (
            <Skeleton
              data-testid="dessert-card-description-skeleton"
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem", width: "60%", mx: "auto" }}
            />
          ) : (
            <Typography
              variant="body"
              component="div"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {dessert?.description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      {inAdminView && !isLoading && (
        <Box
          display={"flex"}
          justifyContent="space-between"
          position={"absolute"}
          width={"100%"}
          sx={{
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
          p={2}
          onClick={(event) => event.stopPropagation()}
        >
          {dessert?.special_tag && (
            <Chip
              label={dessert?.special_tag}
              sx={{
                top: "5.5rem",
                left: "2rem",
                position: "absolute",
                backgroundColor: "white",
                fontSize: "1rem",
                "& .MuiChip-label": {
                  color: theme.palette.primary.main,
                },
              }}
            />
          )}

          <Box display={"flex"} justifyContent={"flex-start"}>
            <Button
              variant="contained"
              color="success"
              sx={{
                marginRight: "1rem",
              }}
              onClick={(event) =>
                navigate(`/admin/desserts/edit-dessert/${dessert?.dessert_id}`)
              }
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteDessert()}
            >
              Remove
            </Button>
          </Box>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isVisible}
                  onChange={async (event) => {
                    const newVal = event.target.checked;
                    try {
                      await patchDessert({
                        dessert: {
                          visible: newVal,
                        },
                      });
                      setIsVisible(newVal);
                    } catch (error) {
                      console.error(
                        "Failed to update dessert visibility:",
                        error
                      );
                    }
                  }}
                  sx={{
                    "& .MuiSwitch-thumb": {
                      fontSize: "1.25rem",
                      color: "white",
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: "red",
                    },
                    "& .Mui-checked .MuiSwitch-thumb": {
                      color: "white",
                    },
                    "& .Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "green",
                    },
                  }}
                />
              }
              label={isVisible ? "Visible" : "Hidden"}
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "1.25rem",
                  color: isVisible ? "green" : "red",
                },
              }}
            />
          </FormGroup>
        </Box>
      )}
    </Card>
  );
}
