module.exports = {
  parse(queryParams) {
    const { dueDate, from, to, groupId, priority } = queryParams,
      filter = {};

    if (from && to) {
      filter.dueDate = {
        dueDate: { $gte: from, $lte: to }
      }
    }

    if (dueDate) {
      filter.dueDate = { 
        $eq: dueDate
      }
    }

    if (groupId) {
      filter.groupId = { 
        $eq: groupId
      }
    }

    if (priority) {
      filter.priority = { 
        $eq: priority
      }
    }

    return filter;
  }
}
