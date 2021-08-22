<template>
<div>
  <blog-context :id="id" @articleToc="tocData"></blog-context>
  <!-- <comment></comment> -->
</div>
</template>
<script>
import BlogContext from '@/components/BlogContext/BlogContext.vue'
// import Comment from '@/components/Comment/Comment.vue'
export default {
  components: { BlogContext, Comment },
  props: {
    id: {
      required: true
    }
  },
  data () {
    return {
      
    }
  },
  mounted() {
  },
  methods: {
    tocData(tocData) {
      this.$emit("articleToc", tocData);
    }
  }
  
  
}
</script>