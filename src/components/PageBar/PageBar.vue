<template>
  <!--footer尾部上一页，下一页-->
  <div class="ui segment" v-if="page.total!=0">
    <div class="ui five column grid">
      <div class="column" :style="page.isFirstPage?'pointer-events: none':''" @click="goPage(page.navigateFirstPage)">
        <a
          class="ui basic button"
          :class="{teal : !page.isFirstPage}"
          >首页</a
        >
      </div>
      <div class="column" :style="!page.hasPreviousPage?'pointer-events: none':''" @click="goPage(page.pageNum-1)">
        <a
          class="ui basic button"
          :class="{teal : page.hasPreviousPage}"
          >上一页</a
        >
      </div>
      <span class="column" style="padding-top:20px; text-align:center"><h4>{{page.pageNum}}/{{page.pages}}</h4></span>
      <div class="column" :style="!page.hasNextPage?'pointer-events: none':''" @click="goPage(page.pageNum+1)">
        <a
          class="ui basic button"
          :class="{teal : page.hasNextPage}"
          >下一页</a
        >
      </div>
      <div class="column" :style="page.isLastPage?'pointer-events: none':''" @click="goPage(page.navigateLastPage)">
        <a
          class="ui basic button"
          :class="{teal : !page.isLastPage}"
          >尾页</a
        >
      </div>
    </div>
  </div>
  <div
    v-else
    style="font-family:宋体;font-size: 20px; font-weight: 600;!important;text-align: center;"
  >
    暂时没有数据
  </div>
</template>
<script>
export default {
  data() {
    return{
    }
  },
  props: {
    page: {
    }
  },
  mounted() {
  },
  methods: {
    goPage(pageVal) {
      this.$emit('goPage', pageVal);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    },
  }
};
</script>