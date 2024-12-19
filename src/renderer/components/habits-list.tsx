import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { AppDispatch, RootState } from "../store/store";
import React, { useEffect, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { removeHabit } from "../store/habit-slice";

const HabitsList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch<AppDispatch>();

  // 使用 useRef 保存前一个习惯列表
  const prevHabitsRef = useRef<string[]>([]);

  useEffect(() => {
    // 如果习惯数减少，才保存文件
    const saveHabits = async () => {
      if (prevHabitsRef.current.length > habits.length) {
        const updatedHabits = habits.join("\n");
        try {
          // 调用异步保存方法
          window.electronAPI.saveHabits(updatedHabits);
          console.log('Habits saved successfully');
        } catch (error) {
          console.error('Error saving habits:', error);
        }
      }
    };

    saveHabits();

    // 更新 previous habits for next comparison
    prevHabitsRef.current = habits;
  }, [habits]); // 只有 habits 更新时触发

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {/* 显示习惯数组的长度 */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Total Habits: {habits.length}
      </Typography>

      {habits.map((habit) => {
        return (
          <Paper key={habit} elevation={3} sx={{ p: 2 }}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">{habit}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {habit}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => dispatch(removeHabit({id: habit}))}
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
