function serializeData(data) {
  const { _id, title, createdAt, dueTime, subtasks, finishedAt, updatedAt } = data;
  
    return {
      id: _id,
      title,
      dueTime,
      createdAt,
      updatedAt,
      finishedAt,
      subtasks
    };
}

module.exports = {
  serialize(data) {
    return new Promise(resolve => {
      const isArrayOfTasks = Array.isArray(data),
        serializedTasks = isArrayOfTasks ? data.map(task => serializeData(task)) : serializeData(data);
     
      return resolve({
        "tasks": serializedTasks 
      });
    })
  }
}
