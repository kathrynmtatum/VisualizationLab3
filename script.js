//Load data
d3.csv('cities.csv').then(data => {
    console.log('cities ', data);
  }) 

let info;
//Convert to integers
d3.csv('cities.csv', d=>{
    return {
      ...d, // spread operator
      eu: d.eu==='true', // convert to boolean
      population: +d.population,
      x: +d.x,
      y: +d.y,
    }
  }).then(data=>{
      console.log('cities', data);
      info=data;
  })

//Filter out non-european cities
let euro;
d3.csv('cities.csv').then(function(data) {
    euro = info.filter(c => c.eu == true);
    console.log("euro",euro);  
}).then(function(d) {
  d3.select('.city-count').text('The Largest European Cities: ' + euro.length);
//Create svg
  const width = 700;
  const height = 550;
  const svg = d3.select('.population-plot')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
  
//Add a circle
let circle;
circle = svg.selectAll("population-plot")
    .data(euro)
    .enter()
    .append("circle")
    .attr('cx', euro=> {
      return euro.x;
    })
    .attr('cy', euro=> {
        return euro.y;
    })
    .attr('r', euro => {
        if (euro.population < 1000000) return 4;
        else return 8;
    })
    .attr("fill", euro=> {
        if (euro.population >= 1000000) return "#e60000";
        else return "#ff9999";
    });
  
let largeCities;
largeCities = euro.filter(e => (e.eu == true && e.population >= 1000000));

//Add labels to cities
let text;
text = circle.select("text")
      .data(largeCities)
      .enter()
      .append("text")
      .attr('x', largeCities => largeCities.x)
      .attr('y', largeCities => largeCities.y-10)
      .text( largeCities => largeCities.city)
      .attr('font-size', "11px")
      .attr('text-anchor', 'middle')
      .attr('font-wight', 'bold')
      .attr('fill', 'gray');   
});


//BAR CHART

//load data
let buildings;
d3.csv('buildings.csv').then(b => {
  buildings = b;
  console.log('building info ', b);
}).then(b =>{
  //Sort based on building height
  buildings.sort(function(a,b){
    return b.height_m - a.height_m;
  })
  console.log('buildings', buildings);
}).then(b => {
  d3.select('.buildings-intro').text("The Tallest Buildings in the World:");
                                     
  //Create svg
  const barheight = 500;
  const barwidth = 500;
  const svg2 = d3.select('.building-height')
      .append('svg')
      .attr('width', barwidth)
      .attr('height', barheight)
  
  //Create bars
  let bars;
  bars = svg2.selectAll('.bar')
      .data(buildings)
      .enter()
      .append("rect")
      .attr("fill", "#00b3b3")
      .attr("width", buildings=>buildings.height_px)
      .attr("height", 40)
      .attr("x", 250)
      .attr("y", function(buildings,i){
        return 45*(i+1);
      })
      .on("click", function(d) {
        console.log("click")
        let data = d.path[0].__data__;
        //let build = buildings;
        //Image
        console.log("[https://cdn.glitch.com/94fb472b-7022-4ba1-852a-3030aab52cde%2F1.jpg?v=1601512121978]"+1);
        document.querySelector(".image").src = "[https://cdn.glitch.com/94fb472b-7022-4ba1-852a-3030aab52cde%2F1.jpg?v=1601512121978]"+1;
        //Building name
			  d3.select(".name")
				  .text(d=>data.building)
			  //Height
			  d3.select('.height')
				  .text(d=>data.height_ft);
			  //City
			  d3.select('.city')
				  .text(d=>data.city);
        //Country
			  d3.select('.country')
				  .text(d=>data.country);
        //Floors
			  d3.select('.floors')
				  .text(d=>data.floors);
        //Completed
			  d3.select('.completed')
				  .text(d=>data.completed);
        
  });
  
  //Make labels
  //Building titles
  let bartext;
  bartext = bars.select("text")
        .data(buildings)
        .enter()
        .append("text")
        .attr('x', 240)
        .attr('y', function(buildings,i){
          return 45*(i+1)+22.5;
        })
        .attr('text-anchor', 'end')
        .text(buildings => buildings.building);
  
  //Height label
  let heightlabel;
  heightlabel = bars.select("text")
      .data(buildings)
      .enter()
      .append("text")
      .attr('x', 340)
      .attr('y', function(buildings,i){
        return 45*(i+1)+22.5;
      })
      .attr('text-anchor', 'end')
      .attr('fill', 'white')
      .text(buildings => buildings.height_ft + " ft");

  });