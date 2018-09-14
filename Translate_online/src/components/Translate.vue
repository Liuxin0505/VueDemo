<template>
    <div>
      <h1>在线翻译</h1>
      <h5 class="text-muted">简单/易用</h5>
      <translate-form @formSubmit="translateText"></translate-form>
      <translate-out-put v-text="translateResult"></translate-out-put>
    </div>
</template>

<script>
/* eslint-disable */
import TranslateForm from './TranslateForm'
import TranslateOutPut from './TranslateOutPut'
    export default {
        name: "translate",
      components:{TranslateForm,TranslateOutPut},
      data(){
        return{
          translateResult:""
        }
      },
      methods:{
        translateText(text,lang){
          let mine=this;
          // console.log('text:'+text,'lang:'+lang)
          mine.$axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180913T074202Z.ca5a4c6dc721b3b0.bd73c4891a6c34a3bfbd3b03c24f56ac10f4a331&lang='+lang+'&text='+text)
            .then(function (response) {
              mine.translateResult=response.data.text[0];
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
</script>

<style scoped>

</style>
