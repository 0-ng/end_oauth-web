import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const logout = r => require.ensure([], () => r(require('@/page/logout')), 'logout');

const routes = [
	{
		path: '/login',
		component: login
	},
    // {
	// 	path: '/logout',
	// 	component: login
	// },
    {
		path: '/',
		component: login
	}

    // {
    //     path: '/',
    //     name: 'login',
    //     component: login,
    //     children: [
    //       {
    //         path: '/',
    //         name: 'login',
    //         component: login
    //       },
    //       {
    //         path: 'logout',
    //         name: 'logout',
    //         component: logout
    //       }
    //     ]
    // }
]

export default new Router({
	routes,
	// strict: process.env.NODE_ENV !== 'production',
})
