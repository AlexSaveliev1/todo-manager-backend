function serializeData(data) {
  const { _id, body, createdAt, task } = data;

  return {
    id: _id,
    task,
    body,
    createdAt
  };
}

module.exports = {
  serialize(data) {
    const isArrayOfComments = Array.isArray(data),
      serializedComments = isArrayOfComments ? data.map(comment => serializeData(comment)) : serializeData(data);

    return {
      'comments': serializedComments
    };
  }
};
