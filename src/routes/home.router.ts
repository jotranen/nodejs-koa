import Koa from 'koa'

import Router from '@koa/router'

const router = new Router({
    prefix: '/home'
});

router.get('/', (ctx: Koa.ParameterizedContext) => {
    ctx.body = 'Hello home';
})

router.post('/', (ctx: Koa.ParameterizedContext) => {
    ctx.body = 'Hello home - post';
})

module.exports = router;

function kala(kala: Number) {
    console.log(kala);
}

