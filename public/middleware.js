// const proxy = require('http-proxy-middleware');
// const express = require('express');

// https://github.com/storybooks/storybook/issues/208#issuecomment-306953718
module.exports = function (router) {
  /* router.use('/api', proxy({
    target: 'https://api-endpoint.com',
    changeOrigin: true
  })) */

  router.use('/api/:kind/:id', route);
  router.use('/api/:kind', route);
};

function route(req, res) {
  try {
    const data = require(`../data/${req.params.kind}.json`);
    let content = {
      content: 'the requested type is not possible for this request.',
    };

    if (req.params.id) {
      if (req.method === 'GET' || req.method === 'POST') {
        content = data.find(item => item.id === req.params.id) || {
          content: 'no item with target id exists.',
        };
      }
    } else if (
      req.method === 'GET'
      || req.method === 'PUT'
      || req.method === 'DELETE'
    ) {
      content = data || [];
    }

    res.json(content);
  } catch (err) {
    res.json({
      content: 'target service do not exist or you dont have access.',
    });
  }
}
