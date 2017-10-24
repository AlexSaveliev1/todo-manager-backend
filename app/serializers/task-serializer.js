function serializeData(data) {
  const { _id, group, title, createdAt, dueDate, finishedAt, updatedAt, priority, order, comments } = data;

  return {
    id: _id,
    group,
    title,
    dueDate,
    priority,
    order,
    createdAt,
    updatedAt,
    finishedAt,
    comments
  };
}

module.exports = {
  serialize(data) {
    const isArrayOfTasks = Array.isArray(data),
      serializedTasks = isArrayOfTasks ? data.map(task => serializeData(task)) : serializeData(data);
    
    return {
      'tasks': serializedTasks
    };
  }
};
