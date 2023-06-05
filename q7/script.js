const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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

  let filtered = earnings.filter(function (xy) {
    return xy.date.getFullYear() == 2020;
  });
  console.log(filtered);

  let byMonth = filtered.map(function (xy) {
    return {
      amount: parseInt(xy.amount),
      month: xy.date.getMonth(),
    };
  });

  // reference for groupBy. good to learn
  var groupBy = function (data, key) {
    return data.reduce(function (storage, item) {
      var group = item[key];
      storage[group] = storage[group] || [];
      storage[group].push(item);
      return storage;
    }, {});
  };
  let groups = groupBy(byMonth, "month");
  console.log(groups);

  // i thought the groupBy was bad enough...
  let series = Object.values(groups).map(function (group, month) {
    return {
      x: months[month],
      y: group.reduce((a, b) => a + b.amount, 0),
    };
  });
  console.log(series);

  chart.updateSeries([
    {
      name: "Sales",
      data: series,
    },
  ]);
}

window.addEventListener("DOMContentLoaded", async () => {
  await loadData();
});
