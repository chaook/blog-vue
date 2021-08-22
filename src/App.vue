<template>
  <div id="app">
    <top-bar></top-bar>
    <div class="ui stackable grid m-padded-tb-small">
      <!-- 占位 -->
      <div class="ui two wide column m-column"></div>
      <router-view class="ui ten wide column m-padded-lr-small" @articleToc="tocData"></router-view>
      <right-bar class="ui three wide column" v-if="showRightBar">
        <div class="blogs-menu" v-if="isBlogContent">
          <h2>目录</h2>
          <div
            class="menu-title"
            v-for="item in articleToc"
            :title="item.text"
            :key="item.id"
            :style="{ paddingLeft: `${item.indent}em` }"
            @click="scrollTo(item.id)"
          >
            {{ item.text }}
          </div>
        </div>
      </right-bar>
    </div>
    <bottom-bar v-if="showRightBar"></bottom-bar>
  </div>
</template>

<script>
import Comment from "@/components/Comment/Comment.vue";
import RightBar from "@/components/RightBar/RightBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import BottomBar from "@/components/BottomBar/BottomBar.vue";

export default {
  name: "App",
  components: {
    TopBar,
    RightBar,
    Comment,
    BottomBar,
  },
  data() {
    return {
      showRightBar: true,
      isBlogContent: false,
      articleToc: []
    }
  },
  watch: {
    $route(r) {
      this.showRightBar = r.path !== '/archives';
      this.isBlogContent = r.name === 'Blog';
    }
  },
  methods: {
    tocData(tocData) {
      this.articleToc = tocData;
    },
    scrollTo(id) {
      // 绑定 toc 点击事件
      let node = document.querySelector('[data-id="' + id + '"]');
      if (!node) {
        return;
      }
      node.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    },
  }
};
</script>

<style lang="scss" scoped>

@import "/src/assets/scss/_variables.scss";

  // 目录的样式 
  .blogs-menu {
    max-width: 300px;
    line-height: 1.3;
    .menu-title {
      padding: 6px 0;
      color: map-get($colors, "blue");
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
