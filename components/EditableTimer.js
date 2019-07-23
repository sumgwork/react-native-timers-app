import React, { useState } from "react";
import TimerForm from "./TimerForm";
import Timer from "./Timer";

const EditableTimer = ({
  id,
  title,
  project,
  elapsed,
  isRunning,
  onFormSubmit,
  onRemovePress
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
    />
  );
};

export default EditableTimer;
