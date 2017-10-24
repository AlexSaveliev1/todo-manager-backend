function serializeData(data) {
  const { _id, title, createdAt, updatedAt, deletedAt } = data;

  return {
    id: _id,
    title,
    createdAt,
    updatedAt,
    deletedAt
  };
}

module.exports = {
  serialize(data) {
    const isArrayOfGroups = Array.isArray(data),
      serializedGroups = isArrayOfGroups ? data.map(group => serializeData(group)) : serializeData(data);

    return {
      'groups': serializedGroups
    };
  }
};
