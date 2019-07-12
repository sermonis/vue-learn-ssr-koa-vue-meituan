import Router       from 'koa-router'
import axios        from 'axios'
import sign         from './util/sign'

let router = new Router({prefix:'/search'});

// 顶部搜索功能
router.get('/top',async (ctx)=>{
    let {status,data:{ top }} = await axios.get('http://cp-tools.cn/search/top',{
        params: {
            input: ctx.query.input,
            city: ctx.query.city,
            sign
        }
    })
    ctx.body = {
        code:status === 200 ? 0:-1,
        top :status === 200 ? top:[]
    }
})
// 热门搜索
router.get('/hotPlace',async (ctx)=>{
    const city = ctx.store? ctx.store.state.geo.position.city:ctx.query.city;
    let {status,data:{result}} = await axios.get('http://cp-tools.cn/search/hotPlace',{
        params: {
            city,
            sign
        }
    })
    ctx.body = {
        code: status === 200 ? 0:-1,
        hotPlace: status === 200 ? result:[]
    }
})

export default router;