const taskSerializer = require('./task-serializer');

function serializeData(data) {
  let { _id, title, createdAt, updatedAt, deletedAt} = data;

    return {
      id: _id,
      title,
      createdAt,
      updatedAt,
      deletedAt
    };
}

module.exports = {
  serialize(data, async = true) {
    const isArrayOfGroups = Array.isArray(data),
      serializedGroups = isArrayOfGroups ? data.map(group => serializeData(group)) : serializeData(data);

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
