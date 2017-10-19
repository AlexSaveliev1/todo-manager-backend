function serializeData(data) {
  const { _id, title, createdAt, finishedAt, updatedAt, task } = data;

  return {
    id: _id,
    title,
    task,
    createdAt,
    updatedAt,
    finishedAt
  };
}

module.exports = {
  serialize(data) {
    const isArrayOfSubtasks = Array.isArray(data),
      serializedSubtasks = isArrayOfSubtasks ? data.map(subtask => serializeData(subtask)) : serializeData(data);

    return {
      'subtasks': serializedSubtasks
    };
  }
};
