'use strict';

const controller = require('./question.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/questions`,
  });

  router
    .get('/:userId', controller.getOne)
    // .get('/', controller.getAll)
    // .post('/', controller.createOne);

  return router;
};
