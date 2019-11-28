<template>
  <div class="home">
    <header class="home_main">
      <div class="home_main-con">
        <router-link to="/login" class="btn btn--white btn--animated">Discover more</router-link>
      </div>
    </header>

    <a href="http://www.beian.miit.gov.cn/" target="_Blank" class="home_beian">黑ICP备19006950号</a>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style scoped>
/* 全局 */
.home {
  padding: 30px 30px 10px;
}
/* 主体 */
.home_main {
  height: 95vh;
  background-image: linear-gradient(
      to right bottom,
      rgba(126, 213, 111, 0.6),
      rgba(40, 180, 133, 0.6)
    ),
    url(/img/homebg.jpg);
  background-size: cover;
  background-position: bottom;
  position: relative;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 80vh, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 80vh, 0 100%);
}
.home_main-con {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.home_beian {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 47%;
  bottom: 2%;
}
.btn,
.btn:link,
.btn:visited {
  text-transform: uppercase;
  text-decoration: none;
  padding: 16px 32px;
  display: inline-block;
  border-radius: 160px;
  transition: all 0.2s;
  position: relative;
  font-size: 20px;
  border: none;
  cursor: pointer;
}
.btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
}
.btn:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}
.btn:active,
.btn:focus {
  outline: none;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.btn--white {
  background-color: #fff;
  color: #777;
}
.btn--white::after {
  background-color: #fff;
}
.btn--animated {
  animation: moveInButtom 1s ease-out 0.75s;
  animation-fill-mode: backwards;
}
@keyframes moveInLeft {
  0% {
    opacity: 0;
    transform: translateX(-160px);
  }

  80% {
    transform: translateX(32px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}
@keyframes moveInRight {
  0% {
    opacity: 0;
    transform: translateX(160px);
  }

  80% {
    transform: translateX(-32px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}
@keyframes moveInButtom {
  0% {
    opacity: 0;
    transform: translateY(48px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}
</style>