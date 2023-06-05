const chartOptions = {
  chart: {
    type: "bar",
    height: "100%",
  },
  series: [],
  noData: {
    text: "loading data. patience my young padawan...",
  },
};
const chart = new ApexCharts(document.querySelector("#chart"), chartOptions);
chart.render();

async function loadData() {
  let response = await axios.get("sales.json");
  let sales = response.data;
  console.log(sales);

  let earnings = sales.map(function (xy) {
    return {
      amount: xy.payment.amount,
      date: new Date(xy.completed_at),
    };
  });
  console.log(earnings);
}

loadData();
