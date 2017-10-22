module.exports = {
  parse(queryParams) {
    const { dueDate, from, to, groupId, priority, noGroup, task } = queryParams,
      filter = {};

    if (noGroup) {
      filter.groupId = {
        $eq: null
      };
    }

    if (from && to) {
      filter.dueDate = {
        $gte: from,
        $lte: to
      };
    }

    if (dueDate) {
      filter.dueDate = {
        $eq: dueDate
      };
    }

    if (groupId) {
      filter.groupId = {
        $eq: groupId
      };
    }

    if (priority) {
      filter.priority = {
        $eq: priority
      };
    }

    if (task) {
      filter.task = {
        $eq: task
      };
    }

    return filter;
  }
};
