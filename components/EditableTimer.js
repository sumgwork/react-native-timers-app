import React, { useState } from "react";
import PropTypes from "prop-types";
import TimerForm from "./TimerForm";
import Timer from "./Timer";

const EditableTimer = ({
  id,
  title,
  project,
  elapsed,
  isRunning,
  onFormSubmit,
  onRemovePress,
  onStartStopPress
}) => {
  const [editFormOpen, setEditFormOpen] = useState(false);

  const handleEditPress = () => setEditFormOpen(true);

  const handleFormClose = () => setEditFormOpen(false);

  handleSubmit = timer => {
    onFormSubmit(timer);
    setEditFormOpen(false);
  };

  if (editFormOpen) {
    return (
      <TimerForm
        id={id}
        title={title}
        project={project}
        onFormSubmit={handleSubmit}
        onFormClose={handleFormClose}
      />
    );
  }
  return (
    <Timer
      id={id}
      title={title}
      project={project}
      elapsed={elapsed}
      isRunning={isRunning}
      onEditPress={handleEditPress}
      onRemovePress={onRemovePress}
      onStartStopPress={onStartStopPress}
    />
  );
};

EditableTimer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  elapsed: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onRemovePress: PropTypes.func.isRequired,
  onStartStopPress: PropTypes.func.isRequired
};

export default EditableTimer;
