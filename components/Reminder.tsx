import React, { useEffect, useReducer, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import AppUtil from "../util/AppUtil";
import Action from "../model/Action";
import Time from "../model/Time";

const oneMinute = 60; // 60 seconds
const maxMinutes = 2700000; // 45 minutes

const initialState: Time = { seconds: 0, minutes: 0, hours: 0 };

const reducer = (state: Time, action: Action): Time => {
  switch (action.type) {
    case "INCREMENT_SEC":
      return { ...state, seconds: state.seconds + 1 };
    case "RESET_SEC":
      return { ...state, seconds: 0 };
    case "INCREMENT_MIN":
      return { ...state, minutes: state.minutes + 1 };
    case "RESET_MIN":
      return { ...state, minutes: 0 };
    case "RESET_TIMER":
      return initialState;
    default:
      return state;
  }
};

const Reminder = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [toggleTimer, setToggleTimer] = useState(false);

  const tick = () => {
    dispatch({ type: "INCREMENT_SEC" });
  };

  const toggle = () => {
    let isTimerRunning = !toggleTimer;
    setToggleTimer(isTimerRunning);
  };

  const resetTimer = () => {
    dispatch({type: "RESET_TIMER"});
  };

  useEffect(() => {
    let interval;
    if (toggleTimer) {
      interval = setInterval(tick, 1000);
    }

    if (state.seconds >= oneMinute) {
      dispatch({ type: "INCREMENT_MIN" });
      dispatch({ type: "RESET_SEC" });
    }

    return () => {
      clearInterval(interval);
    };
  }, [state.seconds, toggleTimer]);

  return (
    <View>
      <Text style={styles.timer}>{`${AppUtil.leftFillNum(
        state.hours
      )}:${AppUtil.leftFillNum(state.minutes)}:${AppUtil.leftFillNum(
        state.seconds
      )}`}</Text>
      <View>
        <Button title={toggleTimer ? "STOP" : "START"} onPress={() => toggle()} />
      </View>
      <View style={styles.btnReset}>
        <Button title="RESET" onPress={() => resetTimer()} disabled={state.seconds === 0 || toggleTimer}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    fontSize: 80,
  },
  btnReset: {
    marginTop: 10,
    color: 'red'
  }
});

export default Reminder;
