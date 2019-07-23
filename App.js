import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import uuidv4 from "uuid/v4";
import { newTimer } from "./utils/TimerUtils";
import ToggleableTimerForm from "./components/ToggleableTimerForm";
import EditableTimer from "./components/EditableTimer";

export default function App() {
  const [timers, setTimers] = useState([
    {
      title: "Mow the lawn",
      project: "House Chores",
      id: uuidv4(),
      elapsed: 5456099,
      isRunning: true
    },
    {
      title: "Bake squash",
      project: "Kitchen Chores",
      id: uuidv4(),
      elapsed: 1273998,
      isRunning: false
    }
  ]);

  let intervalId;

  useEffect(() => {
    const TIME_INTERVAL = 1000; //1 sec refresh

    intervalId = setInterval(() => {
      setTimers(
        timers.map(timer => {
          const { isRunning, elapsed } = timer;
          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed
          };
        })
      );
    }, TIME_INTERVAL);
    return () => clearInterval(intervalId);
  });

  // useEffect(() => {
  //   return clearInterval(intervalId);
  // });

  const handleCreateFormSubmit = timer => {
    setTimers([newTimer(timer), ...timers]);
  };

  const handleFormSubmit = attrs => {
    let newTimers = timers.map(timer => {
      if (timer.id === attrs.id) {
        return { ...timer, title: attrs.title, project: attrs.project };
      }
      return timer;
    });

    setTimers(newTimers);
  };

  const handleRemove = timerId => {
    setTimers(timers.filter(t => t.id !== timerId));
  };

  const toggleTimer = id => {
    setTimers(
      timers.map(timer => {
        if (timer.id === id) {
          return { ...timer, isRunning: !timer.isRunning };
        }
        return timer;
      })
    );
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Timers</Text>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.timerListContainer}
      >
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm onFormSubmit={handleCreateFormSubmit} />
          {timers.map(({ id, title, project, elapsed, isRunning }) => (
            <EditableTimer
              id={id}
              key={id}
              title={title}
              project={project}
              elapsed={elapsed}
              isRunning={isRunning}
              onFormSubmit={handleFormSubmit}
              onRemovePress={handleRemove}
              onStartStopPress={toggleTimer}
            />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D6D7DA"
  },
  timerListContainer: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  timerList: {
    paddingBottom: 15
  }
});
