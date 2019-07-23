import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
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

  handleRemove = timerId => {
    setTimers(timers.filter(t => t.id !== timerId));
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Timers</Text>
      </View>
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
          />
        ))}
      </ScrollView>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  timerList: {
    paddingBottom: 15
  }
});
