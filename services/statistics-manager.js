let taskModel = require('../models/task'),
  statisticsCounter = 0;

module.exports = {
  tasksInfoByFilter(filter) {
    return taskModel.find(filter)
      .then(tasks => {
        return {
          statistic: {
            id: statisticsCounter++,
            total: tasks.length,
            summaryEstimated: tasks.filter(({ dueDate }) => dueDate).reduce((sum, { dueDate, createdAt }) => sum + (dueDate - createdAt), 0),
            summaryRemaining: tasks.filter(({ done }) => !done).length,
            completed: tasks.filter(({ done }) => done).length
          }
        }
      })
  }
}
