import React from "react";
import { PropTypes } from "prop-types";
import { StyleSheet, Text, View } from "react-native";

import { millisecondsToHuman } from "../utils/TimerUtils";
import TimerButton from "./TimerButton";

const Timer = ({
  title,
  project,
  elapsed,
  onEditPress,
  onRemovePress,
  id,
  isRunning,
  onStartStopPress
}) => {
  const elapsedString = millisecondsToHuman(elapsed);

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text>{project}</Text>
      <Text style={styles.elapsedTime}>{elapsedString}</Text>
      <View style={styles.buttonGroup}>
        <TimerButton color="blue" small title="Edit" onPress={onEditPress} />
        <TimerButton
          color="blue"
          small
          title="Remove"
          onPress={() => onRemovePress(id)}
        />
      </View>
      <TimerButton
        color={isRunning ? "#DB2828" : "#21B445"}
        title={isRunning ? "Stop" : "Start"}
        onPress={() => onStartStopPress(id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: "white",
    borderColor: "#d6d7da",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0
  },
  title: { fontSize: 14, fontWeight: "bold" },
  elapsedTime: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 15
  },
  buttonGroup: { flexDirection: "row", justifyContent: "space-between" }
});

Timer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  elapsed: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  onEditPress: PropTypes.func.isRequired,
  onRemovePress: PropTypes.func.isRequired,
  onStartStopPress: PropTypes.func.isRequired
};

export default Timer;
