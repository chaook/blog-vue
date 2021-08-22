<template>

<!-- 头部导航栏 -->
<div class="ui attached segment m-padded-tb-mini m-shadow-small animated fadeInDown">
    <div class="ui container">

      <!--使用一个菜单来放我们所有的导航链接-->
      <div class="ui secondary stackable menu">
        <a class="item">
          <img
            class="ui circular image mestyle image"
            src="@/assets/image/logo.png"
            style="width: 50px; height: 50px"
          />
        </a>
          <router-link
          class="item m-item m-mobile-hide"
          tag="div" to="/index">首页</router-link>

          <router-link
          class="item m-item m-mobile-hide"
          tag="div" to="/types">分类</router-link>

          <router-link
          class="item m-item m-mobile-hide"
          tag="div" to="/tags">标签</router-link>

          <router-link
          class="item m-item m-mobile-hide"
          tag="div" to="/archives">归档</router-link>

          <router-link
          class="item m-item m-mobile-hide"
          tag="div" to="/friends">友链</router-link>

          <div class="right m-item item m-mobile-hide">
            <div class="ui icon inverted input">
              <input type="text" v-model="searchText" placeholder="搜索" />
              <i class="search link icon" id="searchbtn"></i>
            </div>
          </div>
      
      </div>
    </div>
</div>
</template>

<script>

export default {
  data() {
    return {
      searchText: "",
    }
  },
  props: {

  },
  methods: {
  }

};
</script>

<style scoped>

</style>
