<template>
  <div
    :id="id"
    :style="{ width: width + 'px', height: height + 'px', margin: '34px auto' }"
    class="m-map"
  />
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    point: {
      type: Array,
      default() {
        return [116.46, 39.92]
      }
    }
  },
  data() {
    return {
      id: `map`,
      key: 'f75a1c7012d5cab7bad0e4bb804a5d54'
    }
  },
  mounted() {
    const self = this
    self.id = `map${Math.random()
      .toString()
      .slice(4, 6)}`

    window.onmaploaded = () => {
      const map = new window.AMap.Map(self.id, {
        resizeEnable: true,
        zoom: 11,
        center: self.point
      })
      self.map = map
      window.AMap.plugin('AMap.ToolBar', () => {
        const toolbar = new window.AMap.ToolBar()
        map.addControl(toolbar)
        const marker = new window.AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: self.point
        })
        self.marker = marker
        marker.setMap(map)
      })
    }
    const url = `https://webapi.amap.com/maps?v=1.4.10&key=${
      self.key
    }&callback=onmaploaded`
    const jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  }
}
</script>
<style lang="scss"></style>
