import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { PropTypes } from "prop-types";
import TimerButton from "./TimerButton";

const TimerForm = props => {
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");

  const { id, onFormClose, onFormSubmit } = props;
  const submitText = id ? "Update" : "Create";

  const handleSubmit = () => {
    onFormSubmit({ id, title, project });
  };

  useEffect(() => {
    setTitle(props.title);
    setProject(props.project);
  }, []);

  return (
    <View style={styles.formContainer}>
      <View style={styles.attributeContainer}>
        <Text style={styles.textInputTitle}>Title</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            value={title}
            onChangeText={value => setTitle(value)}
          />
        </View>
      </View>

      <View style={styles.attributeContainer}>
        <Text style={styles.textInputTitle}>Project</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            value={project}
            onChangeText={value => setProject(value)}
          />
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <TimerButton
          small
          color="#21BA45"
          title={submitText}
          onPress={handleSubmit}
        />
        <TimerButton
          small
          color="#DB2828"
          title="Cancel"
          onPress={onFormClose}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "white",
    borderColor: "#D6D7DA",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0
  },
  attributeContainer: {
    marginVertical: 8
  },
  textInputTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5
  },
  textInput: {
    height: 30,
    padding: 5,
    fontSize: 12
  },
  textInputContainer: {
    borderColor: "#D6D7DA",
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 5
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

TimerForm.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  project: PropTypes.string,
  onFormSubmit: PropTypes.func.isRequired,
  onFormClose: PropTypes.func.isRequired
};

TimerForm.defaultProps = {
  id: null,
  title: "",
  project: ""
};

export default TimerForm;
