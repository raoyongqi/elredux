import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabits, Habit } from '../store/habit-slice';  // 引入 Redux 中的异步操作 `fetchHabits` 和 `Habit` 类型
import { LinearProgress, Paper, Typography } from '@mui/material';  // 引入 Material-UI 组件，显示加载进度条、纸张容器和文本

import { AppDispatch, RootState} from '../store/store';  // 引入应用的 dispatch 和 Redux 状态根类型

const HabitsStat: React.FC = () => {
   // 使用 `useSelector` 从 Redux store 中获取习惯数据状态
   const { habits, isLoading, error } = useSelector((state: RootState) => state.habits);  // 获取习惯数据、加载状态和错误信息
   const dispatch = useDispatch<AppDispatch>();  // 获取 dispatch 用于派发 Redux actions

   useEffect(() => {
       dispatch(fetchHabits());  // 组件加载时调用异步 action `fetchHabits` 获取数据
    }, []);  // 依赖数组为空，表示只在组件挂载时执行一次

   // 获取今天完成的习惯数量
   const getCompletedToday = () => {
         const today = new Date().toISOString().split("T")[0];  // 获取今天的日期，格式为 YYYY-MM-DD
         return habits.filter((habit) => habit.completedDates.includes(today)).length;  // 返回今天已完成的习惯数量
    };

   // 计算某个习惯的连续完成天数
   const getStreak = (habit: Habit) => {
      let streak = 0;  // 初始化连续天数
      const currentDate = new Date();  // 获取当前日期

      // 循环检查过去的每一天是否完成
      while(true){
          const dateString = currentDate.toISOString().split("T")[0];  // 获取当天的日期
          
          if(habit.completedDates.includes(dateString)){  // 如果习惯在当天完成
               streak++;  // 连续完成天数增加
               currentDate.setDate(currentDate.getDate() - 1);  // 日期减一，检查前一天
          } else {
             break;  // 如果某一天没有完成，跳出循环
          }
      }
 
      return streak;  // 返回该习惯的连续完成天数
   };

   // 获取所有习惯的最长连续完成天数
   const getLongestStreak = () => {
      return Math.max(...habits.map(getStreak), 0);  // 计算所有习惯的最长连续天数，并返回
   };

   // 如果数据正在加载中，显示进度条
   if(isLoading){
      return <LinearProgress />;  // 显示 Material-UI 提供的进度条
   }

   // 如果发生错误，显示错误信息
   if(error){
      return <Typography color="error">{error}</Typography>;  // 显示错误信息，字体颜色为红色
   }

};

export default HabitsStat;  // 导出该组件供其他地方使用
