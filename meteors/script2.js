// async function loadSights() {
//   let meteor = await axios.get("meteors.json");
//   let sight = await axios.get("sightings.json");

//   return {
//     meteor: meteor.data,
//     sight: sight.data,
//   };
// }

// const chartOptions = {
//   chart: {
//     type: "line",
//     height: "100%",
//   },
//   series: [],
//   noData: {
//     text: "Error 404... Just kidding. It's loading...",
//   },
// };

// const chart = new ApexCharts(document.querySelector("#chart"), chartOptions);
// chart.render();

// window.addEventListener("DOMContentLoaded", () => {
//   loadSights()
//     .then((data) => {
//       const meteorData = data.meteor;
//       const sightData = data.sight;

//       chart.updateSeries([
//         {
//           name: "Meteors",
//           data: meteorData,
//         },
//         {
//           name: "Sightings",
//           data: sightData,
//         },
//       ]);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

// window.addEventListener("DOMContentLoaded", () => {
//   axios
//     .all([axios.get("meteors.json"), axios.get("sightings.json")])
//     .then(
//       axios.spread((meteor, sight) => {
//         const meteorData = meteor.data;
//         const sightData = sight.data;

//         chart.updateSeries([
//           {
//             name: "Meteors",
//             data: meteorData,
//           },
//           {
//             name: "Sightings",
//             data: sightData,
//           },
//         ]);
//       })
//     )
//     .catch((error) => {
//       console.error(error);
//     });
// });

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

window.addEventListener("DOMContentLoaded", () => {
  Promise.all([axios.get("meteors.json"), axios.get("sightings.json")])
    .then(([meteor, sight]) => {
      const meteorData = meteor.data;
      const sightData = sight.data;

      chart.updateSeries([
        {
          name: "Meteors",
          data: meteorData,
        },
        {
          name: "Sightings",
          data: sightData,
        },
      ]);
    })
    .catch((error) => {
      console.error(error);
    });
});
