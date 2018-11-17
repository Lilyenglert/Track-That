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
      trackers:[],
      entryData:[],
      entryValues:[],
      entryDates:[],
      unitSelector: '',
    }
  },
  mounted () {
    var usedDates = []
    this.unitSelector = 0
    if (localStorage.getItem('entries')) {
      try {
        this.entries = JSON.parse(localStorage.getItem('entries'))
        this.trackers = JSON.parse(localStorage.getItem('trackers'))
      } catch (e) {
        localStorage.removeItem('entries')
        localStorage.removeItem('trackers')
      }
    }
     for (let index = 0; index < this.entries.length; index++) {
      if(this.entries[index].trackerID == this.trackerID)
      {
        if(usedDates.includes(this.entries[index].date) == false && this.entries[index].value[this.unitSelector] != null){
          usedDates.push(this.entries[index].date)
          this.entryData.push({value: this.entries[index].value[this.unitSelector], date: new Date(this.entries[index].date)})
          this.entryValues.push(this.entries[index].value[this.unitSelector])
          this.entryDates.push(new Date(this.entries[index].date))
          this.entryData.sort(function(a,b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
        }
      }}
    this.entryData.sort(function(a,b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
    const svg = d3.select(this.$el)
      .append('svg')
      .attr('id', 'dataChart')
      .attr('width', 350)
      .attr('height', 250)
      .append('g')
      .attr('transform', 'translate(0, 10)')
    if(this.entryData.length >= 2){
    var x = d3.scaleTime().domain([new Date(Math.min.apply(null,this.entryDates)), new Date(Math.max.apply(null,this.entryDates))]).range([35, 340])
    var y = d3.scaleLinear().domain([d3.min(this.entryValues), d3.max(this.entryValues)]).range([210, 0]).nice()

    var createPath = d3.line()
      .x(function (d) { return x(d.date) })
      .y(function (d) { return y(d.value) })
    var bottomAxis = d3.axisBottom(x).ticks(5)
    var leftAxis = d3.axisLeft(y).ticks(5)
    svg.append('text').attr("x", -85).attr("y", 10).text(this.trackers[this.trackerID].unit[this.unitSelector]).style("text-anchor", "middle").attr('transform', 'rotate(270)').style("font-size", "10pt")
    svg.append('text').attr("x", 180).attr("y", 240).text("Date").style("text-anchor", "middle").style("font-size", "10pt")
    svg.append('g').call(bottomAxis)
      .attr("class", "axis")
      .attr('transform', 'translate(0,210)')
    svg.append('g').call(leftAxis)
      .attr("class", "axis")
      .attr('transform', 'translate(35,0)')
    svg.append('path').attr('d', createPath(this.entryData)).attr('id', 'dataPath')
    }
    else{
      svg.append('text').attr("x", 180).attr("y", 125).text("Please add at least two").style("text-anchor", "middle")
      svg.append('text').attr("x", 180).attr("y", 145).text("entries to see your progress!").style("text-anchor", "middle")
    }

    EventBus.$on('switchUnits', function (ID) {
      this.trackerID = ID;
      if (localStorage.getItem('entries')) {
      try {
        this.entries = JSON.parse(localStorage.getItem('entries'))
        this.trackers = JSON.parse(localStorage.getItem('trackers'))
      } catch (e) {
        localStorage.removeItem('entries')
        localStorage.removeItem('trackers')
      }
    }
      this.entryValues=[]
      this.entryData = []
      this.entryDates = []
      usedDates = []
      if (this.unitSelector == 0 || this.unitSelector == null){
        this.unitSelector = 1;
      }
      else{
        this.unitSelector = 0;
      }
      for (let index = 0; index < this.entries.length; index++) {
      if(this.entries[index].trackerID == this.trackerID)
      {
        if(usedDates.includes(this.entries[index].date) == false && this.entries[index].value[this.unitSelector] != null){
          
          usedDates.push(this.entries[index].date)
          this.entryData.push({value: this.entries[index].value[this.unitSelector], date: new Date(this.entries[index].date)})
          this.entryValues.push(this.entries[index].value[this.unitSelector])
          this.entryDates.push(new Date(this.entries[index].date))
          this.entryData.sort(function(a,b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
        }
      }}
    this.entryData.sort(function(a,b){return new Date(a.date).getTime() - new Date(b.date).getTime()});

      svg.selectAll('*').remove()
      svg.append('g')
        .attr('transform', 'translate(0, 10)')
      if(this.entryData.length >= 2){
    var x = d3.scaleTime().domain([new Date(Math.min.apply(null,this.entryDates)), new Date(Math.max.apply(null,this.entryDates))]).range([35, 340])
    var y = d3.scaleLinear().domain([d3.min(this.entryValues), d3.max(this.entryValues)]).range([210, 0]).nice()

    var createPath = d3.line()
      .x(function (d) { return x(d.date) })
      .y(function (d) { return y(d.value) })
    var bottomAxis = d3.axisBottom(x).ticks(5)
    var leftAxis = d3.axisLeft(y).ticks(5)
    svg.append('text').attr("x", -85).attr("y", 10).text(this.trackers[this.trackerID].unit[this.unitSelector]).style("text-anchor", "middle").attr('transform', 'rotate(270)').style("font-size", "10pt")
    svg.append('text').attr("x", 180).attr("y", 240).text("Date").style("text-anchor", "middle").style("font-size", "10pt")
    svg.append('g').call(bottomAxis)
      .attr("class", "axis")
      .attr('transform', 'translate(0,210)')
    svg.append('g').call(leftAxis)
      .attr("class", "axis")
      .attr('transform', 'translate(35,0)')
    svg.append('path').attr('d', createPath(this.entryData)).attr('id', 'dataPath')
    }
    else{
      svg.append('text').attr("x", 180).attr("y", 125).text("Please add at least two").style("text-anchor", "middle")
      svg.append('text').attr("x", 180).attr("y", 145).text("entries to see your progress!").style("text-anchor", "middle")
    }
    })
  },
  beforeDestroy(){
    EventBus.$off('switchUnits')
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
  stroke-width: 1.5px;
}
#dataPath{
  fill: none;
  stroke:grey;
  stroke-width: 1.5px;
}
.axis{
  font-size: 8px;
}

</style>
