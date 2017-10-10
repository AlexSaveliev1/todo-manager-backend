const taskSerializer = require('./task-serializer');

function serializeData(data, populated) {
  let { _id, title, createdAt, tasks, updatedAt, deletedAt} = data,
    populatedTasks = populated ? taskSerializer.serialize(tasks, false) : tasks;

    return {
      id: _id,
      title,
      tasks,
      createdAt,
      updatedAt,
      deletedAt
    };
}

module.exports = {
  serialize(data, { async = true, populated }) {
    const isArrayOfGroups = Array.isArray(data),
      serializedGroups = isArrayOfGroups ? data.map(group => serializeData(group, populated)) : serializeData(data, populated);

    if (async) {
      return new Promise(resolve => {
        return resolve({
          "groups": serializedGroups 
        });
      })
    }

    return {
      "groups": serializedGroups 
    }
  }
}
