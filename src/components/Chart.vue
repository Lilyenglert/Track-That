<template>
    <div></div>
</template>
<script>
import * as d3 from 'd3'
import Vue from 'vue'
import Storage from 'vue-web-storage'
Vue.use(Storage)
var data = Vue.$localStorage.get('gValues')
export default {
  name: 'Chart',
  mounted () {
    const svg = d3.select(this.$el)
      .append('svg')
      .attr('id', 'dataChart')
      .attr('width', 500)
      .attr('height', 270)
      .append('g')
      .attr('transform', 'translate(0, 10)')
    console.log(d3.min(data))
    console.log(d3.max(data))
    var x = d3.scaleLinear().domain(d3.extent(data, (d, i) => i)).range([50, 430])
    var y = d3.scaleLinear().domain([d3.min(data), d3.max(data)]).range([210, 0])
    var createPath = d3.line()
      .x(function (d, i) { return x(i) })
      .y(function (d) { return y(d) })
    var bottomAxis = d3.axisBottom(x).ticks(10)
    var leftAxis = d3.axisLeft(y).ticks(10)
    svg.append('g').call(bottomAxis)
      .attr('transform', 'translate(0,210)')
    svg.append('g').call(leftAxis)
      .attr('transform', 'translate(50,0)')
    svg.append('path').attr('d', createPath(data))
  },
  methods: {
    refreshGraph () {
      console.log('test')
    }
  }
}
</script>
<style>
svg {
  margin: 25px;
}
path{
    fill: none;
    stroke:black;
    stroke-width: 3px;
}

</style>
