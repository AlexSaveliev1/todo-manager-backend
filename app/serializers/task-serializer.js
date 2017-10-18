function serializeData(data) {
  const { _id, group, title, createdAt, dueDate, subtasks, finishedAt, updatedAt, priority } = data;
  
    return {
      id: _id,
      group,
      title,
      dueDate,
      priority,
      createdAt,
      updatedAt,
      finishedAt,
      subtasks
    };
}

module.exports = {
  serialize(data) {
    const isArrayOfTasks = Array.isArray(data),
      serializedTasks = isArrayOfTasks ? data.map(task => serializeData(task)) : serializeData(data);
    
    return {
      "tasks": serializedTasks
    }
  }
}
