<template>
  <div class="form-container">
    <div class="form-box">
      <div class="title-box">
        <span>提交表單</span>
        <div class="close" @click="close"></div>
      </div>
      <form class="form" @submit.prevent="handleSubmit">
        <label for="" class="inp">
          <div class="title">
            <span>姓名</span>
            <i>*</i>
          </div>
          <input type="text" v-model="form.name" placeholder="请输入您的姓名" />
        </label>
        <label for="" class="inp">
          <div class="title">
            <span>联系方式</span>
            <i>*</i>
          </div>
          <input type="text" v-model="form.tel" placeholder="请输入您的电话" />
        </label>
        <label for="" class="inp">
          <div class="title">
            <span>預約留言</span>
            <i>*</i>
          </div>
          <input type="text" v-model="form.message" placeholder="請留言" />
        </label>
        <button class="submit">提交</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        tel: "",
        message: "",
      },
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.form.name) {
        alert("请输入姓名");
        return;
      }
      if (!this.form.tel) {
        alert("请输入联系方式");
        return;
      }
      if (!this.form.message) {
        alert("请输入预约留言");
        return;
      }
    const resp = await this.$api.postMsg(this.form);
    if(resp.data){
        alert(resp.data);
        this.close();
    }
    },
    close(){
        this.$emit("closeForm", false);
        this.form.name = "";
        this.form.tel = "";
        this.form.message = "";
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixins.less";
.form-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  .flex();
  .form-box {
    width: 90%;
    max-width: 900px;
    margin: 0 auto;
    background-color: #fff;
    .title-box {
      height: 66px;
      line-height: 66px;
      border-bottom: 1px solid #f5f5f5;
      padding: 0 24px;
      box-sizing: border-box;
      .flex(space-between);
      span {
        font-size: 16px;
      }
      .close {
        width: 20px;
        height: 20px;
        cursor: pointer;
        position: relative;
        &::before,
        &::after {
          content: "";
          position: absolute;
          width: 20px;
          height: 1px;
          background-color: #666;
          transform-origin: center center;
        }
        &::before {
          transform: translateY(10px) rotate(45deg);
        }
        &::after {
          transform: translateY(10px) rotate(-45deg);
        }
      }
    }
    .form {
      padding: 30px 20px;
      box-sizing: border-box;
      .inp {
        display: block;
        margin-bottom: 20px;
        .title {
          margin-bottom: 12px;
          span {
            font-size: 14px;
            color: #666;
          }
          i {
            font-size: 14px;
            color: red;
            margin-left: 5px;
          }
        }
        input {
          width: 100%;
          height: 44px;
          border: none;
          outline: none;
          background-color: #f7f7f7;
          padding-left: 15px;
          box-sizing: border-box;
        }
      }
      .submit {
        margin-top: 40px;
        width: 300px;
        height: 44px;
        .flex(center);
        font-size: 16px;
        border: none;
        outline: none;
        background-color: #000;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>