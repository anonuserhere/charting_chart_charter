const chart1Options = {
  chart: {
    type: "line",
    height: "100%",
  },
  series: [],
  noData: {
    text: "loading... patience please",
  },
};

const chart1 = new ApexCharts(document.querySelector("#chart"), chart1Options);
chart1.render();

async function loadData() {
  let response = await axios.get("data.csv");
  let json = await csv().fromString(response.data);
  console.log(json);
  return transformData(json);
}

function transformData(rawData) {
  let shortlisted = [];
  let shortlisted1 = [];
  for (let record of rawData) {
    if (record.ethnic_group == "Chinese") {
      shortlisted.push(record);
    }
    if (record.ethnic_group == "Indians") {
      shortlisted1.push(record);
    }
  }

  let series = [];
  for (let xy of shortlisted) {
    series.push({
      x: parseInt(xy.year),
      y: parseFloat(xy.live_births),
    });
  }
  console.log(series);

  let series1 = [];
  for (let xy of shortlisted1) {
    series1.push({
      x: parseInt(xy.year),
      y: parseFloat(xy.live_births),
    });
  }
  console.log(series1);

  return { series, series1 };
}

window.addEventListener("DOMContentLoaded", async () => {
  let { series, series1 } = await loadData();
  chart1.updateSeries([
    {
      name: "live births (Chinese)",
      data: series,
    },
    {
      name: "live births (Indians)",
      data: series1,
    },
  ]);
});
