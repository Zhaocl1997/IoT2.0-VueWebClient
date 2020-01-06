<template>
  <div class="de">
    <div style="margin:30px;">
      <el-row :gutter="50">
        <el-col :span="4">
          <div class="de-col">
            <v-base></v-base>
          </div>
        </el-col>

        <el-col :span="4">
          <div class="de-col" style="height:250px;">
            <v-time></v-time>
          </div>
        </el-col>

        <!-- <el-col :span="8">
          <div class="de-col">
            
          </div>
        </el-col>-->
      </el-row>
    </div>

    <div class="de-foot">
      <a href="https://github.com/Zhaocl1997" target="_Blank">
        <img src="/icon/github.png" style="cursor: pointer" />
      </a>
    </div>
  </div>
</template>

<script>
import vBase from "./components/base";
import vTime from "./components/time";

export default {
  name: "v-default",
  components: {
    vBase,
    vTime
  }
};
</script>

<style scoped>
.de-col {
  min-width: 200px;
  padding: 20px;
  background-color: rgb(211, 211, 211);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}

.de-foot {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translate(-50%, -50%);
}
</style>