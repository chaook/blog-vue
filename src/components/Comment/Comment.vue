<template>
  <!--评论-->
  <div class="ui bottom attached segment">
    <div id="comment-container" class="ui teal segment">
      <div class="ui threaded comments" style="max-width: 100%">
        <h3 class="ui dividing header">评论</h3>
        <div v-if="commentList.length>0">
          <div
            class="comment"
            v-for="(comment, index) in commentList"
            :key="index"
          >
            <!-- 头像 -->
            <a class="avatar">
              <!-- <img
                src=""
              /> -->
            </a>
            <div class="content">
              <span class="author">{{ comment.name }}</span>
              <!-- <div
                class="ui mini basic teal left pointing label m-padded-mini"
                v-if="comment.isAdmin"
              >
                博主
              </div> -->
              <div class="metadata">
                <span class="date">{{
                  comment.createTime | date("YYYY-MM-DD HH:mm:ss")
                }}</span>
              </div>
              <div class="text" v-if="!comment.isDeleted">
                {{ comment.content }}
              </div>
              <div class="text" v-else>该评论已被删除！</div>

              <div class="actions">
                <a
                  class="reply"
                  @click="reply(comment.coId, comment.name)"
                  >回复</a
                >
              </div>
            </div>
            <div class="comments">
              <div class="comment" v-for="(child, i) in comment.childComments" :key="i">
                <a class="avatar">
                  <!-- <img
                    src=""
                  /> -->
                </a>
                <div class="content">
                  <div class="author">
                    <span>{{ child.name }}</span>
                    <!-- <div
                      class="ui mini basic teal left pointing label m-padded-mini"
                      v-if="child.isAdmin"
                    >
                      博主
                    </div> -->
                    &nbsp;<span class="m-teal" v-if="child.parentComment!==null">@ {{ child.parentComment.name }}</span>
                  </div>

                  <div class="metadata">
                    <span class="date">{{
                      child.createTime | date("YYYY-MM-DD HH:mm:ss")
                    }}</span>
                  </div>

                  <div class="text" v-if="!child.isDeleted">
                    {{ child.content }}
                  </div>
                  <div class="text" v-else>该评论已被删除！</div>

                  <div class="actions">
                    <a
                      class="reply"
                      @click="reply(child.coId, child.name)"
                      >回复</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="comment-form" class="ui form">
      <!--这里使用了一个隐藏域来保存当前评论的博客id-->
      <input type="hidden" name="blog.blId" th:value="${blog.blId}" />
      <!--这里表示回复的父节点，如果没有父节点区域，就为-1-->
      <input type="hidden" name="parentcomment.coId" value="-1" />
      <div class="field">
        <textarea ref="ipt" v-model="formData.content" :placeholder="ContentPlace!=null?ContentPlace : '请输入评论信息...'" name="content" ></textarea>
      </div>
      <div class="fields">
        <div class="m-margin-bottom-small m-mobile-wide field">
          <div class="ui m-margin-bottom-small m-mobile-wide left icon input">
            <i class="user icon"></i>
            <input
              v-model="formData.name"
              type="text"
              name="name"
              placeholder="昵称"
            />
          </div>
        </div>
        <div class="m-margin-bottom-small m-mobile-wide field">
          <div class="ui m-margin-bottom-small m-mobile-wide left icon input">
            <i class="envelope square icon"></i>
            <input
              v-model="formData.email"
              type="text"
              name="email"
              placeholder="邮箱"
            />
          </div>
        </div>
        <div class="m-margin-bottom-small m-mobile-wide filed">
          <button
            type="button"
            id="commentpost-btn"
            @click="submitCom"
            class="ui m-margin-bottom-small m-mobile-wide teal button"
          >
            <i class="edit icon"></i>发布
          </button>
          <button
            type="button"
            id="clear-btn"
            @click="clearAll"
            class="ui m-margin-bottom-small m-mobile-wide grey button"
          >
            <i class="edit icon"></i>清除
          </button>
          <span v-for="(msg, i) in resultMessage" :key="i" style="color: red; padding-left: 10px">{{msg}}!</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    blogId: null,
  },
  data() {
    return {
      ContentPlace: null,
      formData: {
        name: "",
        email: "",
        content: "",
        blogId: this.blogId,
        parentId: null
      },
      resultMessage: "",
      commentList: [],
    }
  },
  mounted() {
    this.getComments(this.blogId);
  },
  methods: {
    reply(coId, coName) {
      this.formData.parentId = coId;
      this.ContentPlace = "@ " + coName;
      this.$refs.ipt.focus();
    },
    async submitCom() {
      const res = await this.$http.post("/comment", this.formData);
      this.resultMessage = res.data.data;
      //评论成功
      if (res.data.code===200) {
        this.resultMessage = new Array(res.data.data);
        this.getComments(this.blogId);
        this.clearAll();
      }
    },
    clearAll() {
      this.formData.content = "";
      this.formData.name = "";
      this.formData.email = ""
      this.formData.coId = null;
      this.ContentPlace = null;
      this.resultMessage = '';
    },
    async getComments(blogId) {
      const res = await this.$http.get(`/comment/${blogId}`);
      this.commentList = res.data.data;
    }
  }
};
</script>