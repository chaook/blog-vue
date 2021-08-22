import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Blog = () => import('../views/Blog.vue')
const Index = () => import('../views/Index.vue')
const Types = () => import('../views/Types.vue')
const Tags = () => import('../views/Tags.vue')
const Archives = () => import('../views/Archives.vue')
const Friends = () => import('../views/Friends.vue')


const routes = [
  {
    path: '/blog/:id',
    name: "Blog",
    component: Blog,
    props: true,
    meta: {
      title: "博客详情"
    }
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    meta: {
      index: 999,
      title: '博客首页'
    }
  },
  {
    path: '/types',
    name: 'Types',
    component: Types,
    meta: {
      index: 3,
      title: '分类'
    }
  },
  {
    path: '/archives',
    name: 'Archive',
    component: Archives,
    meta: {
      index: 3,
      title: '归档'
    }
  },
  {
    path: '/tags',
    name: 'Tags',
    component: Tags,
    meta: {
      title: '标签'
    }
  },
  {
    path: '/friends',
    name: 'Friends',
    component: Friends,
    meta: {
      index: 6,
      title: '友情链接'
    }
  },
  {
    path: '/',
    redirect: '/index'
  }
]

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "active",
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  routes
})
router.beforeEach((to, from, next) => {
  // to and from are both route objects
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router