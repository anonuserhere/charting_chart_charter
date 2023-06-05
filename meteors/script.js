async function loadData() {
  let result = await axios.get("db.json");
  console.log(result);
  return result.data.yearly;
}

const chartOptions = {
  chart: {
    type: "line",
    height: "100%",
  },
  series: [],
  noData: {
    text: "Error 404... Just kidding. It's loading...",
  },
};


const chart = new ApexCharts(document.querySelector("#chart"), chartOptions);
chart.render();

window.addEventListener("DOMContentLoaded", async () => {
  let series = await loadData();
  chart.updateSeries([
    {
      name: "Sales",
      data: series,
    },
  ]);
});
