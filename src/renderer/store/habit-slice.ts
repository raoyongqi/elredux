import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Habit {
    id: string;
    name: string;
    frequency: 'daily' | 'weekly';
    completedDates: string[];
    createdAt: string;
}

interface HabitState {
    habits: Habit[];
    isLoading: boolean;
    error: string | null;
}

const initialState: HabitState = {
    habits: [],
    isLoading: false,
    error: null,
}

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
    // Await the result from the IPC call and get the data
    console.log('electronAPI:', window.electronAPI);
    console.log('readJson function:', window.electronAPI.readJson);

    const habits = await window.electronAPI.readJson();  // Await the promise here
    return habits;  // Return the data
  });
  
const habitSlice = createSlice({
    name: "habits",
    initialState,
    reducers: {
        addHabit: (state, action: PayloadAction<{ name: string; frequency: 'daily' | 'weekly' }>) => {
            const newHabit: Habit = {
                id: Date.now().toString(),
                name: action.payload.name,
                frequency: action.payload.frequency,
                completedDates: [],
                createdAt: new Date().toISOString(),
            }

            state.habits.push(newHabit)
        },


        toggleHabit: (
            state,
            action: PayloadAction<{ id: string; date: string }>
        ) => {
            const habit = state.habits.find((h) => h.id === action.payload.id)

            if (habit) {
                const index = habit.completedDates.indexOf(action.payload.date);

                if (index > -1) {
                    habit.completedDates.splice(index, 1);
                }
                else {
                    habit.completedDates.push(action.payload.date);
                }
            }

        },


        removeHabit: (
            state,
            action: PayloadAction<{ id: string }>
        ) => {
            // Find the index of the habit to be removed
            const index = state.habits.findIndex((h) => h.id === action.payload.id);

            // If the habit is found (index is not -1), remove it
            if (index > -1) {
                state.habits.splice(index, 1);
            }
        },

    },



    extraReducers: (builder) => {
        builder
          .addCase(fetchHabits.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchHabits.fulfilled, (state, action) => {
            state.isLoading = false;
            state.habits = action.payload;
          })
          .addCase(fetchHabits.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "Failed to fetch habits";
          });
      },

})

export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;