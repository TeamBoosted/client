
<script>
import VueCharts from "vue-chartjs";
import { Bar, Doughnut } from "vue-chartjs";

export default {
  name: "PersonalityChart",
  extends: Doughnut,
  mixins: [VueCharts.mixins.reactiveProp],
  props: ["data", "options", "chartData"],
  mounted() {
    this.renderChart(this.data, this.options);
  }
};
</script>

<style >
</style>