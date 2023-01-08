function Charts() {
  return (
    <section style={{backgroundColor:"white", height:"100%", width:"100%"}}>
      <iframe
        title="chart1"
        width="940"
        height="880"
        src="https://charts.mongodb.com/charts-project-0-arqyp/embed/charts?id=63bab26b-11ab-4a38-806d-f0332e4105c5&maxDataAge=60&theme=light&autoRefresh=true"
      ></iframe>
      {/* <br></br> */}
      <iframe
        title="chart2"
        width="940"
        height="880"
        src="https://charts.mongodb.com/charts-project-0-arqyp/embed/charts?id=63bad41c-14d0-43e7-87b4-ec4c7acedddc&maxDataAge=60&theme=light&autoRefresh=true"
      ></iframe>
    </section>
  );
}
export default Charts;
