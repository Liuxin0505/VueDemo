<template>
  <div>
    <div class="container">
    <form class="well form-inline" v-on:submit="formSubmit">
      <input class="form-group" type="text" placeholder="请输入你要翻译的内容" v-model.trim="textToTranslate"/>
      <select class="form-group" v-model="lang">
        <option value="en">English</option>
        <option value="ko">Korean</option>
      </select>
     <input class="btn btn-primary" type="submit" value="翻译"/>
    </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
    export default {
        name: "translate-form",
      data(){
          return{
            textToTranslate:"",
            lang:""
          }
      },
      methods:{
        formSubmit(e){
          this.$emit("formSubmit",this.textToTranslate,this.lang)
          e.preventDefault();
        }
      },
      mounted(){
          this.lang='en'
      }
    }
</script>

<style scoped>

</style>
