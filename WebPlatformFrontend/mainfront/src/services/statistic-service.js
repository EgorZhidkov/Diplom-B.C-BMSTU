import axios from "axios";

export default {
    getStatistic() {
        return axios.post('/statistic/categoryStatistic')
    }
}