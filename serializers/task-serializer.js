function serializeData(data) {
  const { _id, title, createdAt, dueDate, subtasks, finishedAt, updatedAt } = data;
  
    return {
      id: _id,
      title,
      dueDate,
      createdAt,
      updatedAt,
      finishedAt,
      subtasks
    };
}

module.exports = {
  serialize(data, async = true) {
    const isArrayOfTasks = Array.isArray(data),
      serializedTasks = isArrayOfTasks ? data.map(task => serializeData(task)) : serializeData(data);

    if (async) {
      return new Promise(resolve => {
        return resolve({
          "tasks": serializedTasks 
        });
      })
    }
    
    return {
      "tasks": serializedTasks
    }
  }
}
