import { Box, Button, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { AppDispatch, RootState } from "../store/store";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { removeHabit } from "../store/habit-slice";

const HabitsList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {habits.map((habit) => {
        return (
          <Paper key={habit} elevation={3} sx={{ p: 2 }}>
            <Grid container alignItems="center">

              <Grid xs={12} sm={6}>
                <Typography variant="h6">{habit}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {habit}
                </Typography>
              </Grid>

              <Grid xs={12} sm={6}>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >



                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => dispatch(removeHabit({id:habit}))}
                  >
                    Delete
                  </Button>
                </Box>

              </Grid>
            </Grid>



          </Paper>
        );
      })}
    </Box>
  );
};

export default HabitsList;
