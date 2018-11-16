<template>
    <div></div>
</template>
<script>
import * as d3 from 'd3'
import Vue from 'vue'
import EventBus from '../eventBus.js'

//console.log(entryData)
export default {
  name: 'Chart',
  props: {trackerID:''},
  data()
  {
    return {
      entries:[],
      entryData:[],
      entryValues:[],
      entryDates:[]
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

    console.log(this.trackerID)
     for (let index = 0; index < this.entries.length; index++) {
      if(this.entries[index].trackerID == this.trackerID)
      {
        this.entryData.push({value: this.entries[index].value, date: new Date(this.entries[index].date)})
        this.entryValues.push(this.entries[index].value)
        this.entryDates.push(new Date(this.entries[index].date))
        this.entryData.sort(function(a,b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
      }}
    this.entryData.sort(function(a,b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
    const svg = d3.select(this.$el)
      .append('svg')
      .attr('id', 'dataChart')
      .attr('width', 300)
      .attr('height', 250)
      .append('g')
      .attr('transform', 'translate(0, 10)')
    var x = d3.scaleTime().domain([new Date(Math.min.apply(null,this.entryDates)), new Date(Math.max.apply(null,this.entryDates))]).range([25, 260])
    var y = d3.scaleLinear().domain([d3.min(this.entryValues), d3.max(this.entryValues)]).range([170, 0])

    var createPath = d3.line()
      .x(function (d) { return x(d.date) })
      .y(function (d) { return y(d.value) })
    var bottomAxis = d3.axisBottom(x).ticks(5)
    var leftAxis = d3.axisLeft(y).ticks(5)
    svg.append('g').call(bottomAxis)
      .attr('transform', 'translate(0,170)')
    svg.append('g').call(leftAxis)
      .attr('transform', 'translate(25,0)')
    svg.append('path').attr('d', createPath(this.entryData))
    EventBus.$on('refreshGraph', function () {

      svg.selectAll('*').remove()
      svg.append('g')
        .attr('transform', 'translate(0, 10)')
      x = d3.scaleLinear().domain(d3.extent(this.entryData, (d, i) => i)).range([25, 260])
      y = d3.scaleLinear().domain([d3.min(this.entryData), d3.max(data)]).range([170, 0])
      createPath = d3.line()
        .x(function (d, i) { return x(i) })
        .y(function (d) { return y(d) })
      var bottomAxis = d3.axisBottom(x).ticks(10)
      var leftAxis = d3.axisLeft(y).ticks(10)
      svg.append('g').call(bottomAxis)
        .attr('transform', 'translate(0,210)')
      svg.append('g').call(leftAxis)
        .attr('transform', 'translate(50,0)')
      svg.append('path').attr('d', createPath(this.entryData))
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
