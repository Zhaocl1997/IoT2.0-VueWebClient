<template>
  <div>
    <h1>操作流程：</h1>
    <div class="container">
      <v-block :block="arr"></v-block>
    </div>

    <!-- <div class="line">
      <canvas class="drawcv" id="canvas">An alternative text describing what your canvas displays.</canvas>
    </div>-->
  </div>
</template>

<script>
//https://www.cnblogs.com/lvonve/p/11937705.html
//https://www.beyondjava.net/how-to-connect-html-elements-with-an-arrow-using-svg
import vBlock from "./block";

export default {
  components: {
    vBlock
  },
  data() {
    return {
      arr: [
        {
          href: "/svg/icon_1.svg",
          title: "采集导入清单",
          info: "最新消息1",

          style: {
            top: "120px",
            left: "20px"
          },

          size: {
            cx: "83",
            cy: "99",
            r: "3"
          },

          arrow: [],

          line: [
            {
              id: "horizontal",
              style: {
                stroke: "#1E4246"
              },
              pos: {
                x1: "60",
                y1: "99",
                x2: "80",
                y2: "99"
              }
            },
            {
              id: "vertical",
              style: {
                stroke: "#1E4246"
              },
              pos: {
                x1: "83",
                y1: "102",
                x2: "83",
                y2: "278"
              }
            }
          ],

          circle: [
            {
              id: "right_circle",
              style: {
                stroke: "#1E4246",
                fill: "white"
              },
              size: {
                cx: "83",
                cy: "99",
                r: "3"
              }
            }
          ]
        },
        {
          href: "/svg/icon_1.svg",
          title: "手工录入清单",
          info: "最新消息2",

          style: {
            top: "230px",
            left: "20px"
          },

          arrow: [],

          line: [
            {
              id: "horizontal",
              style: {
                stroke: "#1E4246"
              },
              pos: {
                x1: "60",
                y1: "210",
                x2: "80",
                y2: "210"
              }
            }
          ],

          circle: [
            {
              id: "right_circle",
              style: {
                stroke: "#1E4246",
                fill: "white"
              },
              size: {
                cx: "83",
                cy: "210",
                r: "3"
              }
            }
          ]
        },
        {
          href: "/svg/icon_1.svg",
          title: "手工补入凭证",
          info: "最新消息3",

          style: {
            top: "60px",
            left: "140px"
          },

          arrow: [],

          line: [
            {
              id: "vertical",
              style: {
                stroke: "#1E4246"
              },
              pos: {
                x1: "226",
                y1: "39",
                x2: "226",
                y2: "178"
              }
            },
            {
              id: "horizontal",
              style: {
                stroke: "#1E4246"
              },
              pos: {
                x1: "170",
                y1: "36",
                x2: "223",
                y2: "36"
              }
            }
          ],

          circle: [
            {
              id: "right_circle",
              style: {
                stroke: "#1E4246",
                fill: "white"
              },
              size: {
                cx: "226",
                cy: "36",
                r: "3"
              }
            }
          ]
        },
        {
          href: "/svg/icon_1.svg",
          title: "自动生成凭证",
          info: "最新消息4",

          style: {
            top: "170px",
            left: "140px"
          },

          arrow: [
            {
              id: "left_arrow",
              degree: "0",
              style: {
                left: "82px",
                top: "146px"
              }
            }
          ],

          line: [
            {
              id: "horizontal",
              style: {
                stroke: "#1E4246"
              },
              pos: {
                x1: "83",
                y1: "146",
                x2: "223",
                y2: "146"
              }
            }
          ],

          circle: [
            {
              id: "left_circle",
              style: {
                stroke: "#1E4246",
                fill: "white"
              },
              size: {
                cx: "83",
                cy: "146",
                r: "3"
              }
            },
            {
              id: "right_circle",
              style: {
                stroke: "#1E4246",
                fill: "white"
              },
              size: {
                cx: "226",
                cy: "146",
                r: "3"
              }
            }
          ]
        },
        {
          href: "/svg/icon_1.svg",
          title: "国地税盛情表",
          info: "最新消息5",

          style: {
            top: "300px",
            left: "140px"
          },

          arrow: [
            {
              id: "left_arrow",
              degree: "0",
              style: {
                left: "82px",
                top: "278px"
              }
            }
          ],

          line: [
            {
              id: "horizontal",
              style: {
                stroke: "#1E4246"
              },
              pos: {
                x1: "86",
                y1: "278",
                x2: "585",
                y2: "278"
              }
            }
          ],

          circle: [
            {
              id: "left_circle",
              style: {
                stroke: "#1E4246",
                fill: "white"
              },
              size: {
                cx: "83",
                cy: "278",
                r: "3"
              }
            }
          ]
        },
        {
          href: "/svg/icon_1.svg",
          title: "凭证审核",
          info: "最新消息6",

          style: {
            top: "200px",
            left: "280px"
          },

          arrow: [
            {
              id: "left_arrow",
              degree: "0",
              style: {
                left: "222px",
                top: "178px"
              }
            }
          ],

          line: [
            {
              id: "horizontal",
              style: {
                stroke: "#1E4246"
              },
              pos: {
                x1: "230",
                y1: "178",
                x2: "476",
                y2: "178"
              }
            }
          ],

          circle: [
            {
              id: "left_circle",
              style: {
                stroke: "#1E4246",
                fill: "white"
              },
              size: {
                cx: "226",
                cy: "176",
                r: "3"
              }
            }
          ]
        },
        {
          href: "/svg/icon_1.svg",
          title: "会计表表",
          info: "最新消息7",

          style: {
            top: "200px",
            left: "380px"
          },

          arrow: [
            {
              id: "left_arrow",
              degree: "0",
              style: {
                left: "322px",
                top: "178px"
              }
            }
          ],

          line: [],

          circle: []
        },
        {
          href: "/svg/icon_1.svg",
          title: "国地税申请表",
          info: "最新消息8",

          style: {
            top: "200px",
            left: "480px"
          },

          arrow: [
            {
              id: "left_arrow",
              degree: "0",
              style: {
                left: "422px",
                top: "178px"
              }
            }
          ],

          line: [
            {
              id: "down_line",
              style: {
                stroke: "#1E4246"
              },
              pos: {
                x1: "500",
                y1: "200",
                x2: "500",
                y2: "266"
              }
            }
          ],

          circle: []
        },
        {
          href: "/svg/icon_1.svg",
          title: "自动报税",
          info: "最新消息9",

          style: {
            top: "300px",
            left: "480px"
          },

          arrow: [
            {
              id: "left_arrow",
              degree: "0",
              style: {
                left: "422px",
                top: "278px"
              }
            },
            {
              id: "up_arrow",
              degree: "90",
              style: {
                left: "460px",
                top: "242px"
              }
            }
          ],

          line: [],

          circle: []
        },
        {
          href: "/svg/icon_1.svg",
          title: "一键结账/反结账",
          info: "最新消息10",

          style: {
            top: "300px",
            left: "580px"
          },

          arrow: [
            {
              id: "left_arrow",
              degree: "0",
              style: {
                left: "522px",
                top: "278px"
              }
            }
          ],

          line: [],

          circle: []
        }
      ]
    };
  },
  mounted() {
    // this.createSVG();
    // this.drawCircle(90, 90, 5, "blue");
    //  var canvas = document.getElementById("canvas");
    //  var ctx = canvas.getContext("2d"); // gets that element's context—the thing onto which the drawing will be rendered
    //draw axis lines
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   ctx.fillStyle = "rgb(171, 207, 216)";
    //   ctx.lineWidth = 4;
    //   ctx.strokeStyle = "rgb(171, 207, 216)";
    // this.drawarrow(ctx, { x: 100, y: 100 }, { x: 100, y: 0 }, 10); //上箭头
    // this.drawarrow(ctx, { x: 100, y: 100 }, { x: 100, y: 200 }, 10); //下箭头
    // this.drawarrow(ctx, { x: 100, y: 100 }, { x: 300, y: 100 }, 10); //右箭头
    // this.drawarrow(ctx, { x: 100, y: 100 }, { x: 0, y: 100 }, 10); //左箭头
    //this.drawlinejoin(ctx, "square", 2);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    gorouter() {
      alert("U click me");
    }

    // drawarrow(ctx, p1, p2, size) {
    //   var angle = Math.atan2(p2.y - p1.y, p2.x - p1.x); //返回从原点(0,0)到(x,y)点的线段与x轴正方向之间的平面角度(弧度值)，
    //   var hyp = Math.sqrt(
    //     (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y)
    //   ); //返回一个数的平方根

    //   ctx.save();
    //   ctx.translate(p1.x, p1.y); //原点 x 水平方向、原点 y 垂直方向
    //   ctx.rotate(angle); //表示一个顺时针旋转角度并且用弧度表示

    //   // line
    //   ctx.beginPath();
    //   ctx.lineWidth = 4;
    //   ctx.moveTo(0, 0);
    //   ctx.lineTo(hyp - size, 0);

    //   ctx.stroke();

    //   // triangle
    //   ctx.beginPath();
    //   ctx.lineTo(hyp - size, size);
    //   ctx.lineTo(hyp, 0);
    //   ctx.lineTo(hyp - size, -size);
    //   ctx.fill();
    //   ctx.restore();
    // },

    // drawlinejoin(ctx, jointype) {
    //   ctx.lineCap = "square"; //butt-不加线帽  round-加圆角线帽    square-加直角线帽
    //   ctx.lineJoin = "round"; //round 圆角    bevel 折角    miter 尖角
    //   ctx.lineWidth = 2;

    //   ctx.moveTo(100.5, 100.5);
    //   ctx.lineTo(200.5, 100.5);
    //   ctx.lineTo(200.5, 200.5);
    //   // ctx.lineTo(100.5,200.5);
    //   // ctx.lineTo(100.5,100.5);
    //   ctx.closePath();

    //   ctx.stroke();
    // },

    // createSVG() {
    //   var svg = document.getElementById("svg-canvas");
    //   if (null == svg) {
    //     svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //     svg.setAttribute("id", "svg-canvas");
    //     svg.setAttribute(
    //       "style",
    //       "position:absolute;top:0px;left:0px;  border: dashed green;"
    //     );
    //     svg.setAttribute("width", 400);
    //     svg.setAttribute("height", 400);
    //     svg.setAttributeNS(
    //       "http://www.w3.org/2000/xmlns/",
    //       "xmlns:xlink",
    //       "http://www.w3.org/1999/xlink"
    //     );
    //     document.body.appendChild(svg);
    //   }
    //   return svg;
    // },

    // drawCircle(x, y, radius, color) {
    //   var svg = this.createSVG();
    //   var shape = document.createElementNS(
    //     "http://www.w3.org/2000/svg",
    //     "circle"
    //   );
    //   shape.setAttributeNS(null, "cx", x);
    //   shape.setAttributeNS(null, "cy", y);
    //   shape.setAttributeNS(null, "r", radius);
    //   shape.setAttributeNS(null, "fill", color);
    //   svg.appendChild(shape);
    // },

    // //查询html元素的定位
    // findAbsolutePosition(htmlElement) {
    //   var x = htmlElement.offsetLeft;
    //   var y = htmlElement.offsetTop;
    //   for (
    //     var x = 0, y = 0, el = htmlElement;
    //     el != null;
    //     el = el.offsetParent
    //   ) {
    //     x += el.offsetLeft;
    //     y += el.offsetTop;
    //   }
    //   return {
    //     x: x,
    //     y: y
    //   };
    // },

    // connectDivs(leftId, rightId, color, tension) {
    //   var left = document.getElementById(leftId);
    //   var right = document.getElementById(rightId);

    //   var leftPos = findAbsolutePosition(left);
    //   var x1 = leftPos.x;
    //   var y1 = leftPos.y;
    //   x1 += left.offsetWidth;
    //   y1 += left.offsetHeight / 2;

    //   var rightPos = findAbsolutePosition(right);
    //   var x2 = rightPos.x;
    //   var y2 = rightPos.y;
    //   y2 += right.offsetHeight / 2;

    //   var width = x2 - x1;
    //   var height = y2 - y1;

    //   drawCircle(x1, y1, 3, color);
    //   drawCircle(x2, y2, 3, color);
    //   drawCurvedLine(x1, y1, x2, y2, color, tension);
    // },

    // drawCurvedLine(x1, y1, x2, y2, color, tension) {
    //   var svg = createSVG();
    //   var shape = document.createElementNS(
    //     "http://www.w3.org/2000/svg",
    //     "path"
    //   );
    //   var delta = (x2 - x1) * tension;
    //   var hx1 = x1 + delta;
    //   var hy1 = y1;
    //   var hx2 = x2 - delta;
    //   var hy2 = y2;
    //   var path =
    //     "M " +
    //     x1 +
    //     " " +
    //     y1 +
    //     " C " +
    //     hx1 +
    //     " " +
    //     hy1 +
    //     " " +
    //     hx2 +
    //     " " +
    //     hy2 +
    //     " " +
    //     x2 +
    //     " " +
    //     y2;
    //   shape.setAttributeNS(null, "d", path);
    //   shape.setAttributeNS(null, "fill", "none");
    //   shape.setAttributeNS(null, "stroke", color);
    //   svg.appendChild(shape);
    // }
  }
};
</script>


<style scoped>
.container {
  position: absolute;
  width: 800px;
  height: 500px;
  border: dashed red;
  left: 100px;
  top: 100px;
}
</style>