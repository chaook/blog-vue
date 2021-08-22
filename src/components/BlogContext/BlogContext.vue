<template>
  <div id="waypoint" class="m-container-small m-padded-tb-big animated fadeIn" v-if="blog!==null">
    <div class="ui container">
      <!--头部的文章信息部分-->
      <div class="ui top attached segment">
        <div class="ui stackable middle aligned two column grid">
          <div class="row">
            <div class="column">
              <div class="ui horizontal link list">
                <div class="middle aligned item">
                  <!-- <img
                    th:src="${user.avatar}"
                    src="https://unsplash.it/100/100?image=1005"
                    alt=""
                    class="ui avatar image"
                  /> -->
                  <div class="content">{{blog.author || "未知作者"}}</div>
                </div>
                <div class="middle aligned item">
                  <i class="calendar icon"></i
                  ><span>{{blog.createTime | date("YYYY-MM-DD hh:mm:ss")}}</span
                  >
                </div>
                <div class="middle aligned item">
                  <i class="eye icon"></i
                  ><span>{{blog.views || 0}}</span>
                </div>
              </div>
            </div>
            <div class="right aligned column">
              <a
                @click="showType(blog.type.typeId)"
                class="ui orange basic label"
                v-if="blog.type"
              >
                {{blog.type.name}}
              </a>
            </div>
          </div>
        </div>
      </div>
      <!--文章的图片-->
      <div class="ui attached segment">
        <img
          :src="$imageUrl + blog.image" 
          alt=""
          class="ui fluid rounded image"
        />
      </div>
      <!--文章的内容部分-->
      <div class="ui attached padded segment">
        <!--文章的标题-->
        <h2 class="ui center aligned header">
          {{blog.title}}
        </h2>
        <br />
        <!--文章的主要内容-->
        <div
          class="
            m-padded-tb-large m-padded-lr-responsive
            typo typo-selection
            js-toc-content"
            v-html="blog.content"
        ></div>
        <!--标签-->
        <div class="m-padded-lr-responsive">
          <a
            class="ui basic teal left pointing label"
            v-for="(tag, index) in blog.tags"
            :key="index"
            @click="showTag(tag.tagId)"
            >{{tag.name}}</a
          >
        </div>
      </div>
      <!--文章的信息-->
      <div class="ui attached positive message">
        <div class="ui middle aligned grid">
          <div class="eleven wide column">
            <div class="list">
              <li>作者：<span>{{blog.author || "未知作者"}}</span></li>
              <li>
                发表时间：<span
                  >{{blog.createTime | date("YYYY-MM-DD hh:mm:ss")}}</span
                >
              </li>
              <li>
                版权声明：自由转载-非商用-非衍生-保持署名(创意共享3.0许可证)
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
    <comment :blogId="id"></comment>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/tomorrow-night-eighties.css";

import Toc from "@/plugins/Toc.js";

import Comment from "@/components/Comment/Comment.vue";

const renderer = new marked.Renderer();
// marked配置项
marked.setOptions({
  renderer: renderer,
  // 默认：true， 启用Github的风格
  gfm: true,
  // 默认：true，启动表格， 前提必须gfm: true
  tables: true,
  // 默认：false，启用回车换行，前提必须gfm: true
  breaks: true,
  // 默认：false，尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
  pedantic: false,
  // 默认：false，对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  sanitize: false,
  // 默认：true，使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉
  smartLists: true,
  // 默认：false，使用更为时髦的标点，比如在引用语法中加入破折号。
  smartypants: false,
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  },
});

export default {
  components: {
    Comment,
  },
  props: {
    id: { required: true },
  },
  data() {
    return {
      blog: null,
      articleToc: {}
    }
  },
  mounted() {
    this.getBlogById();
  },
  methods: {
    async getBlogById() {
      const res = await this.$http.get(`blog/${this.id}`);
      const tempBlog = res.data.data;
      // 引用marked工具调整文章 添加ID前缀
      let tocData = Toc(marked(tempBlog.content));
      // 输出文章
      tempBlog.content = tocData.article;
      // 输出目录
      this.articleToc = tocData.toc;
      //发送自定义事件，将目录数据发送到父组件（Blog-->App）
      this.$emit("articleToc", tocData.toc);
      this.blog = tempBlog;
      // 调用代码复制功能
      /*this.$nextTick(() => {
        addLineAndCopy();
      });*/
    },
    showTag(tagId) {
      this.$router.push({ path: "/tags", query: { id: tagId } });
    },
    showType(typeId) {
      this.$router.push({path: "/types", query: {id:typeId}}).catch(err=>{});
    },
  },
};
</script>
<style>
</style>