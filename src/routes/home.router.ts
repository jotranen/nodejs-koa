const Router = require('@koa/router');

const router = new Router({
    prefix: '/home'
});

router.get('/', (ctx:any) => {
    ctx.body = 'Hello home';
})

router.post('/', (ctx:any) => {
    ctx.body = 'Hello home - post';
})

module.exports = router;

