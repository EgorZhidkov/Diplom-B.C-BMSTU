<template>
  <div>
    <b-card
      body-class="cardDashboard"
      title="Статистика по самым просматриваемым категориям туристических маршртуов"
      align="left"
    >
      <PieChart :chartDatas="chartData" />
    </b-card>

    <b-card
      body-class="cardDashboard"
      align="left"
      title="Самый просматриваемый маршрут"
    >
      <div class="trainCard d-flex justify-content-between">
        <div
          class="first d-flex flex-column flex-start justify-content-between"
        >
          <h1 class="d-flex flex-start">{{ topTrain.name }}</h1>
          <span class="d-flex flex-start">{{ topTrain.categories.value }}</span>
        </div>
        <div class="second d-flex flex-column flex-end justify-content-between">
          <span class="d-flex justify-content-end">{{
            topTrain.dataCreated
          }}</span>
          <span class="goRoute" @click="goToTopTrain">Перейти к маршруту</span>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import statistic_service from "../services/statistic-service";
import moment from "moment";
import PieChart from "../components/PieChart/PieChart.vue";
export default {
  name: "Dashboard",
  components: { PieChart },
  data() {
    return {
      labels: null,
      nubmers: null,
      colors: null,
      topTrain: null,
      chartData: {
        labels: null,
        datasets: [
          {
            backgroundColor: null,
            data: null,
          },
        ],
      },
    };
  },
  methods: {
    getStatistic() {
      statistic_service
        .getStatistic()
        .then((response) => {
          let data = response.data;
          this.chartData.labels = data.labels;
          this.chartData.datasets[0].data = data.numbers;
          this.chartData.datasets[0].backgroundColor = data.colors;
          this.colors = data.colors;
          data.topTrain[0].dataCreated = moment(
            data.topTrain[0].dataCreated
          ).format("DD.MM.YYYY");
          this.topTrain = data.topTrain[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goToTopTrain() {
      this.$router.push({
        path: `notation/${this.topTrain._id}`,
        params: { id: this.topTrain._id },
      });
    },
  },
  mounted() {
    this.getStatistic();
  },
};
</script>

<style lang="scss" scoped>
.first {
  flex: 1;
}
.goRoute {
  cursor: pointer;
  color: #616293;
}
.cardDashboard {
  border-radius: 16px;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.1);
}
</style>
