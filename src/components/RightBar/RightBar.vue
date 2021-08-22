<template>
  <!--右边栏-->
  <div>
    <!--水平分割线-->
    <div class="m-text-a ui horizontal divider">my Voice</div>

    <!--分类-->
    <div class="ui raised segments m-margin">
      <div class="ui segment">
        <div class="ui two column grid">
          <div class="column"><i class="fas fa-cat"></i>分类</div>
          <div class="right aligned column">
            <a @click.prevent="moreType" target="_blank">more</a>
          </div>
        </div>
      </div>
      <div class="ui orange segment">
        <div class="ui fluid vertical menu">
            <a
            v-for="(type, index) in typeList"
            :key="index"
            @click.prevent="goToType(type.typeId)"
            class="item"
            target="_blank"
          >
            <span>{{type.name}}</span>
            <div
              class="ui orange basic left pointing label"
            >
              {{type.blogNum}}
            </div>
          </a>
        </div>
      </div>
    </div>

    <!--标签-->
    <div class="ui raised segments m-margin">
      <div class="ui segment">
        <div class="ui two column grid">
          <div class="column"><i class="fas fa-dove"></i>标签</div>
          <div class="right aligned column">
            <a @click.prevent="moreTag" target="_blank">more</a>
          </div>
        </div>
      </div>
      <div class="ui teal segment">
        <a
          v-for="(tag, index) in tagList"
          :key="index"
          @click.prevent="goToTag(tag.tagId)"
          target="_blank"
          class="ui basic left pointing label m-margin-tiny teal"
        >
          <span>{{tag.name}}</span>
          <div class="detail">{{tag.blogNum}}</div>
        </a>
      </div>
    </div>

    <!--本站信息-->
    <div class="ui raised segments m-margin">
      <div class="ui segment">
        <div class="ui two column grid">
          <div class="column"><i class="info icon"></i>本站信息</div>
        </div>
      </div>
      <div class="ui red segment">
        <div class="menu">
          <div class="item m-padded-tb">
            <i class="sticky note outline icon"></i>文章总数:<span
              >{{blogTotal}}</span
            >篇
          </div>
          <div class="item m-padded-tb">
            <i class="tasks icon"></i>分类总数:<span
              >{{typeList.length}}</span
            >个
          </div>
          <div class="item m-padded-tb">
            <i class="tags icon"></i>标签:<span>{{tagList.length}}</span
            >个
          </div>
          <div class="item m-padded-tb">
            <i class="comments outline icon"></i>评论总数:<span
              >{{commentTotal}}</span
            >条
          </div>
        </div>
      </div>
    </div>
    <slot id="toc"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeList: [],
      tagList: [],
      blogTotal: 0,
      commentTotal: 0,
    };
  },
  mounted() {
    this.getTypes();
    this.getTags();
    this.getBlogTotal();
    this.getCommentTotal();
  },
  methods: {
    async getTypes() {
      const res = await this.$http.get("/type");
      this.typeList = res.data.data;
    },
    async getTags() {
      const res = await this.$http.get("/tag");
      this.tagList = res.data.data;
    },
    async getBlogTotal() {
      const res = await this.$http.get("/blog/total");
      this.blogTotal = res.data.data;
    },
    async getCommentTotal() {
      const res = await this.$http.get("/comment/total");
      this.commentTotal = res.data.data;
    },
    goToType(typeId) {
      this.$router.push({path: "/types", query: {id:typeId}}).catch(err=>{});
    },
    goToTag(tagId) {
      this.$router.push({path: "/tags", query: {id:tagId}}).catch(err=>{});
    }
  },
};
</script>