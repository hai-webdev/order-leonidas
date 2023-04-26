<template>
  <div class="baidu-map-container">
    <div style="margin: 5px">
      <baidu-map
        class="map"
        ref="map"
        :center="{ lng: data.lng, lat: data.lat }"
        :zoom="mapZoom"
        @ready="map_handler"
        @mousemove="mousemovePolyline"
        @rightclick="rightPolyline"
      >
        <!--定位-->
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
        ></bm-geolocation>
        <!--比例尺-->
        <bm-scale anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-scale>
        <!--缩放-->
        <bm-navigation anchor="BMAP_ANCHOR_TOP_left"></bm-navigation>
        <!--地图右下角加入定位控件-->
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
        ></bm-geolocation>
        <!--地图类型-->
        <bm-map-type
          :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
          anchor="BMAP_ANCHOR_TOP_RIGHT"
        ></bm-map-type>

        <bm-polyline
          :path="path"
          v-for="path of polyline.paths"
          :key="path"
        ></bm-polyline>
        <bm-polygon
          :path="polygonPath"
          stroke-color="blue"
          :stroke-opacity="0.5"
          :stroke-weight="2"
          :editing="true"
          @lineupdate="updatePolygonPath"
        />

        <bm-local-search
          :keyword="address"
          :auto-viewport="true"
          style="display: none"
        ></bm-local-search>
      </baidu-map>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
// 引入异步引入地图的方法
//import { loadBaiDuDrawMap } from "@/util/bmpgl_lib.js";

export default {
  name: "Map",
  data() {
    return {
      location: "湘潭市九华经开区", //百度地图默认优先检索地区
      keyword: "", //百度地图搜索值
      coordinate: "", //
      polygonPath: [], // 多边形集合
      address: "", // 百度地图搜索框值
      mapZoom: 18, //百度地图展示层级
      selectFirstResult: true, //百度地图是否选择第一个检索结果
      pageCapacity: 1, //百度地图设置每页容量，取值范围：1 - 100，对于多关键字检索，每页容量表示每个关键字返回结果的数量（例如当用2个关键字检索时，实际结果数量范围为：2 - 200）。此值只对下一次检索有效
      polyline: {
        // 折线的对象
        editing: false,
        paths: [],
      },
      enableDrawingTool: "",
      drawingManager: "",
    };
  },
  methods: {
    map_handler({ BMap, map }) {
      var marker = new BMap.Marker(
        new BMap.Point(this.data.lng, this.data.lat),
        {
          icon: new BMap.Icon(
            "http://api.map.baidu.com/lbsapi/createmap/images/icon.png",
            new BMap.Size(20, 25),
            {
              imageOffset: new BMap.Size(20, 25),
            }
          ),
        }
      );
      var label = new BMap.Label(this.data.gsmc, {
        offset: new BMap.Size(25, 5),
      });
      var opts = {
        width: 200,
        title: this.data.gsmc,
        enableMessage: false,
      };
      var infoWindow = new BMap.InfoWindow(this.data.map_address, opts);
      marker.setLabel(label);
      this.addClickHandler(marker, infoWindow);
      map.addOverlay(marker);
    },
    addClickHandler(target, window) {
      target.addEventListener("click", function () {
        target.openInfoWindow(window);
      });
    },
    // 按钮控制 是否启用线编辑
    toggle(name) {
      this[name].editing = !this[name].editing;
    },
    // 鼠标移除的时候   当鼠标进入折线区域时会触发此事件
    mousemovePolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      if (!paths.length) {
        return;
      }
      const path = paths[paths.length - 1];
      if (!path.length) {
        return;
      }
      if (path.length === 1) {
        path.push(e.point);
      }
      this.$set(path, path.length - 1, e.point);
      //console.log(12,e.point)
    },
    // 鼠标右击结束划区域 右键单击地图时触发此事件
    rightPolyline() {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      if (!paths.length) {
        paths.push([]);
      }
      const path = paths[paths.length - 1];

      path.pop();
      if (path.length) {
        paths.push([]);
        this.map.clearOverlays(); // 去除覆盖物
        this.polygonPath = path;
      }
    },
    // 多边形的更新  覆盖物的属性发生变化时触发
    updatePolygonPath(e) {
      this.polygonPath = e.target.getPath();
    },
  },
  computed: {
    ...mapState("label", ["data", "loading"]),
  },
};
</script>
<style scoped>
.rowMap {
  margin-bottom: 15px;
}
.map {
  height: 300px;
}
</style>
