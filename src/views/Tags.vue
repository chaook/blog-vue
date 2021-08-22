<template>
  <div class="m-padded-tb-big" v-if="tagList.length > 0">
    <div class="ui container">
      <div class="ui top attached segment">
        <div class="ui middle aligned two column padded grid">
          <div class="column">
            <h3 class="ui teal header">标签</h3>
          </div>
          <div class="right aligned column">
            共
            <h2 class="ui m-inline-block orange header">
              {{ tagList.length }}
            </h2>
            个
          </div>
        </div>
      </div>

      <div class="ui attached segment m-padded-tb-large">
        <div
          v-for="(tag, index) in tagList"
          :key="index"
          class="ui labeled button m-margin-smalls"
        >
          <a
            @click.prevent="showTag(tag.tagId)"
            :class="{ teal: tag.tagId == tagId }"
            class="ui basic button"
            href="#"
            >{{ tag.name }}</a
          >
          <div
            :class="{ teal: tag.tagId == tagId }"
            class="ui basic left pointing label"
          >
            {{ tag.blogNum }}
          </div>
        </div>
      </div>
      <div v-if="blogList.length > 0">
        <div
          class="ui raised segment m-margin-small"
          v-for="(blog, index) in blogList"
          :key="index"
          @click.prevent="showBlog(blog.blogId)"
        >
          <div class="ui stackable mobile reversed grid">
            <!--占宽 11-->
            <div class="ui eleven wide column">
              <h3 class="ui header m-padded-tb-up">
                <a
                  href="#"
                  target="_blank"
                  style="font-family: 宋体; color: black !important"
                  >{{ blog.title }}</a
                >
              </h3>
              <a href="#" target="_blank" class="ui header">
                <p
                  class=""
                  style="
                    font-size: 15px;
                    font-weight: 500 !important;
                    letter-spacing: 1px !important;
                    line-height: 2.5;
                  "
                >
                  {{ blog.outline }}
                </p>
                <font style="font-size: 14px;!important;"
                  ><u><i>点击详情>></i></u></font
                ></a
              >
              <div class="ui divider"></div>
              <div class="ui middle aligned grid">
                <div class="row">
                  <div class="eleven wide column">
                    <div class="ui mini horizontal link list">
                      <div class="item">
                        <div class="content">
                          <h5 class="ui header m-opacity-mini">
                            {{ blog.author || "作者未知"}}
                          </h5>
                        </div>
                      </div>
                      <div class="item">
                        <i class="calendar icon"></i>
                        <span>{{ blog.createTime | date("YYYY-MM-DD") }}</span>
                      </div>
                      <div class="item">
                        <i class="eye icon"></i><span>{{ blog.views }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="right aligned five wide column" v-if="blog.type!=null">
                    <a
                      @click.stop.prevent="showType(blog.type.id)"
                      href="#"
                      target="_blank"
                      class="ui red basic label m-text-thin"
                      >{{ blog.type.name }}</a
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="column">
                    <a
                      v-for="(tag, tag_index) in blog.tags"
                      :key="tag_index"
                      href="#"
                      @click.stop.prevent="showTag(tag.tagId)"
                      class="ui basic left pointing label m-padded-mini m-text-thin teal"
                      >{{ tag.name }}</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <!--图片占 5 份-->
            <div class="five wide column">
              <a href="#">
                <img class="ui rounded image" :src="$imageUrl + blog.image" />
              </a>
            </div>
          </div>
        </div>
        <!-- 分页组件 -->
        <page-bar :page="page" @goPage="goPage"></page-bar>
      </div>
      <div
        v-else
        style="font-family:宋体;font-size: 20px; font-weight: 600;!important;"
        class="ui raised segment m-margin-small" 
      >
        暂时没有数据
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

import PageBar from "@/components/PageBar/PageBar.vue";

export default {
  data() {
    return {
      blogList: [],
      tagList: [],
      page: {},
      tagId: this.$route.query.id,
    };
  },
  components: { PageBar },
  mounted() {
    this.getTags();
    this.getBlogListByPage(this.$defaultPage.pageNum, this.$defaultPage.pageSize);
  },
  watch: {
    $route() {
      this.tagId = this.$route.query.id;
    },
    tagId() {
      this.getBlogListByPage(this.$defaultPage.pageNum, this.$defaultPage.pageSize);
    },
  },
  methods: {
    async getTags() {
      const res = await this.$http.get("/tag");
      this.tagList = res.data.data;
    },
    async getBlogListByPage(pageNum, pageSize) {
      const config = this.tagId == undefined ? null : { params: { tag: this.tagId } };
      const res = await this.$http.get(`/blog/${pageNum}/${pageSize}`, config);
      this.page = res.data.data;
      this.blogList = this.page.list;
    },
    goPage(pageVal) {
      this.getBlogListByPage(pageVal, this.page.pageSize);
    },
    showBlog(blogId) {
       this.$router.push(`/blog/${blogId}`);
    },
    showTag(tagId) {
      this.$router.push({ path: "/tags", query: { id: tagId }}).catch(err=>{});
    },
    showType(typeId) {
      this.$router.push({path: "/types", query: {id:typeId}}).catch(err=>{});
    },
  },
};
</script>