var app = new Vue({
  el: '#app',
  data: {
    sortBy: "ID",
    table: [],
    filterBySegment: 0,
  },
  mounted: function(){
    fetch('/data').then(res=>res.json()).then(json=>{
        console.log(json)
        this.table=json
    })
  },
  computed: {
    filteredTable: function(){
        return this.table.filter(row => {
            let segment= parseInt(this.filterBySegment);
            return segment==0 || row.segment == segment;
        });
    },
    sortedTable: function(){
        return this.filteredTable.sort((a,b)=>{
            var first, second;
            switch(this.sortBy){
                case "ID":
                    first=parseInt(a.id)
                    second=parseInt(b.id)
                    break;
                case "Number of complaints":
                    second=parseInt(a.no_of_complaints)
                    first=parseInt(b.no_of_complaints)
                    break;
            }
            return first-second;
        });
    },
    chartData: function(){
        return this.filteredTable.map(row => ([strToFloat(row.years_customer), parseInt(row.no_of_complaints)]))
    },
    dataColor: function(){
        return this.filteredTable.sort((a,b)=>{
            return strToFloat(a.years_customer)-strToFloat(b.years_customer);
        }).map(row => {
            switch(parseInt(row.segment)){
                case 1:
                    return '#ff0000';
                case 2:
                    return '#0000ff';
                case 3:
                    return '#00ff00';
                case 4:
                    return '#ffa500';
                case 5:
                    return '#551a8b';
            }
        })
    }
  }
});

function strToFloat(str){
    return parseFloat(str.replace(',', '.'));
}