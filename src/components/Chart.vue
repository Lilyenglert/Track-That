<template>
    <div></div>
</template>
<script>
import * as d3 from 'd3'
import Vue from 'vue'
import EventBus from '../eventBus.js'

var entryData = [4, 6, 8, 9, 1, 4, 7, 9]
console.log(entryData)
export default {
  name: 'Chart',
  props: ['trackerID'],
  data()
  {
    return {
      entries:[]
    }
  },
  mounted () {
    if (localStorage.getItem('entries')) {
      try {
        this.entries = JSON.parse(localStorage.getItem('entries'))
      } catch (e) {
        localStorage.removeItem('entries')
      }
    }
    
    const svg = d3.select(this.$el)
      .append('svg')
      .attr('id', 'dataChart')
      .attr('width', 300)
      .attr('height', 250)
      .append('g')
      .attr('transform', 'translate(0, 10)')
    var x = d3.scaleLinear().domain(d3.extent(entryData, (d, i) => i)).range([25, 260])
    var y = d3.scaleLinear().domain([d3.min(entryData), d3.max(entryData)]).range([170, 0])
    var createPath = d3.line()
      .x(function (d, i) { return x(i) })
      .y(function (d) { return y(d) })
    var bottomAxis = d3.axisBottom(x).ticks(5)
    var leftAxis = d3.axisLeft(y).ticks(5)
    svg.append('g').call(bottomAxis)
      .attr('transform', 'translate(0,170)')
    svg.append('g').call(leftAxis)
      .attr('transform', 'translate(25,0)')
    svg.append('path').attr('d', createPath(entryData)).attr('id', 'dataPath')
    EventBus.$on('refreshGraph', function () {

      svg.selectAll('*').remove()
      svg.append('g')
        .attr('transform', 'translate(0, 10)')
      x = d3.scaleLinear().domain(d3.extent(entryData, (d, i) => i)).range([25, 260])
      y = d3.scaleLinear().domain([d3.min(entryData), d3.max(data)]).range([170, 0])
      createPath = d3.line()
        .x(function (d, i) { return x(i) })
        .y(function (d) { return y(d) })
      var bottomAxis = d3.axisBottom(x).ticks(10)
      var leftAxis = d3.axisLeft(y).ticks(10)
      svg.append('g').call(bottomAxis)
        .attr('transform', 'translate(0,210)')
      svg.append('g').call(leftAxis)
        .attr('transform', 'translate(50,0)')
      svg.append('path').attr('d', createPath(entryData)).attr('id', 'dataPath')
    })
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
  stroke-width: 2px;
}
#dataPath{
  fill: none;
  stroke:grey;
  stroke-width: 1px;
}

</style>
