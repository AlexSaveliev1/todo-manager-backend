module.exports = {
  parse(queryParams) {
    const { dueDate, from, to, groupId, priority, noGroup } = queryParams,
      filter = {};
    
    if (noGroup) {
      filter.groupId = {
        $eq: null
      }
    }

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
