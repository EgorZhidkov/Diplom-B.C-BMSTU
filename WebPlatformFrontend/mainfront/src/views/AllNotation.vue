<template>
  <div>
    <div class="notation">
      <div class="notation-header">
        <div class="notation-header__filter">
          <b-input
            class="input"
            placeholder="Название маршрута"
            v-model="pagination.filter.name"
          ></b-input>
          <!-- <b-button class="filter_btn">
            <b-icon-filter font-scale="2"></b-icon-filter>
          </b-button> -->
        </div>
        <div class="notation-header__addButton">
          <b-button @click="createNewNotation">Создать новый маршрут</b-button>
        </div>
      </div>
      <div class="notation-table">
        <b-table
          :fields="tableField"
          :items="tableItems"
          bordered
          hover
          head-variant="dark"
          @row-clicked="rowClicked"
          :current-page="currentPage"
        ></b-table>
        <b-pagination
          :per-page="perPage"
          :total-rows="Notationlocal.totalDocs"
          first-number
          last-number
          v-model="currentPage"
          @change="changePage"
        ></b-pagination>
      </div>
      <create-notation
        :key="modalKey"
        @updateNotation="updateNotation"
      ></create-notation>
    </div>
  </div>
</template>

<script>
import createNotation from "../components/modal/createNotation.vue";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "AllNotation",
  components: {
    createNotation,
  },
  data() {
    return {
      pagination: {
        offset: 0,
        limit: 5,
        filter: {
          name: "",
        },
      },
      modalKey: 0,
      perPage: 5,
      currentPage: 0,
      Notationlocal: {},
      tableItems: [],
      tableField: [
        { key: "name", label: "Название" },
        { key: "dataCreated", label: "Дата создания" },
        { key: "userCreated", label: "Создатель" },
        { key: "categories.value", label: "Категория" },
      ],
    };
  },
  computed: {
    ...mapGetters("Notation", ["getNotation"]),
  },
  methods: {
    ...mapActions("Notation", ["getAllNotation", "getAllCategories"]),
    rowClicked(e) {
      console.log(e);
      this.$router.push({ path: `${e._id}`, params: { id: e._id } });
    },
    async requestNotation(pagination) {
      await this.getAllNotation(pagination)
        .then((responce) => {
          this.Notationlocal = this.getNotation;
          this.tableItems = this.Notationlocal.docs;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async changePage(e) {
      console.log("e", e);
      this.pagination.offset =
        e * this.pagination.limit - this.pagination.limit;
      await this.requestNotation(this.pagination);
    },
    async updateNotation() {
      this.pagination.offset = 0;
      this.pagination.limit = 5;
      await this.requestNotation(this.pagination);
      this.modalKey++;
    },
    createNewNotation() {
      this.$bvModal.show("createNotation");
    },
  },
  watch: {
    pagination: {
      handler() {
        this.requestNotation(this.pagination);
      },
      deep: true,
    },
  },
  async mounted() {
    await this.requestNotation(this.pagination);
    await this.getAllCategories();

    this.Notationlocal = JSON.stringify(this.Notationlocal);
    this.Notationlocal = JSON.parse(this.Notationlocal);

    // this.currentPage = Number(this.Notationlocal.page);
  },
  async created() {},
};
</script>

<style lang="scss" scoped>
.notation {
  &-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 17px;
    &__filter {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-grow: 1;
      //   height: 10px;
      & .input {
        max-width: 410px;
        min-width: 100px;
        margin-right: 8px;
        height: 40px;
      }
      & .filter_btn {
        background: white;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        // padding: 3px;
      }
    }
  }
}
</style>
