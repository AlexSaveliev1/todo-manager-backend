const { assert } = require('chai'),
  taskSerializer = require('../../app/serializers/task-serializer'),
  fakeData = [
    { _id: 0,
      group: 0,
      title: 'Test',
      createdAt: 1231231235,
      dueDate: 7700000,
      finishedAt: 90012413123,
      updatedAt: 123515423,
      priority: 1,
      order: 1 },

    { _id: 1,
      group: 2,
      title: 'Test2',
      createdAt: 14435345,
      dueDate: 21312355,
      finishedAt: 345345345,
      updatedAt: 123515123123,
      priority: 2,
      order: 1}];

  describe('TaskSerializer', function () {
    it('should return typeof object', function () {
      let result = taskSerializer.serialize(fakeData[0]);

      assert.typeOf(result, 'object');
    })

    it('should return array', function () {
      let result = taskSerializer.serialize(fakeData);

      assert.isArray(result.tasks, 'array of objects');
    })

    it('should be a defined function', function () {
      let result = taskSerializer.serialize;

      assert.isFunction(result, 'serialize function');
    })
  })
