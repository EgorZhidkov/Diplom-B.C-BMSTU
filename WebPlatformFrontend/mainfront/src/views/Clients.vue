<template>
  <div>
    <div class="notation">
      <div class="notation-header">
        <div class="notation-header__filter">
          <b-input
            class="input"
            placeholder="Запись"
            v-model="pagination.filter.name"
          ></b-input>
          <b-checkbox v-model="pagination.filter.locked"
            >Только не активные пользователи</b-checkbox
          >
        </div>
        <div class="notation-header__addButton" @click="createNewUser">
          <b-button v-if="getUserRoleAccess(['ADMIN'])"
            >Добавить нового сотрудника</b-button
          >
        </div>
      </div>
      <div class="notation-table">
        <b-table
          :fields="tableField"
          :items="Clients.docs"
          bordered
          hover
          head-variant="dark"
          :current-page="currentPage"
          @row-clicked="rowClicked"
        >
          <template #cell(locked)="data">
            <b v-if="data.item.locked === true">Заблокирован</b>
            <b v-else>Активный</b>
          </template>
        </b-table>
        <b-pagination
          :per-page="perPage"
          :total-rows="Clients.totalDocs"
          first-number
          last-number
          v-model="currentPage"
          @change="changePage"
        ></b-pagination>
      </div>
    </div>
    <create-new-user @updateClients="updateClients"></create-new-user>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import createNewUser from "../components/modal/createNewUser.vue";
export default {
  name: "Clients",
  components: {
    createNewUser,
  },
  data() {
    return {
      pagination: {
        offset: 0,
        limit: 5,
        filter: {
          name: "",
          locked: null,
        },
      },
      perPage: 5,
      currentPage: 0,
      Clients: {},
      tableItems: [],
      tableField: [
        { key: "fullName", label: "ФИО" },
        { key: "email", label: "Почта" },
        { key: "phone", label: "Телефон" },
        { key: "locked", label: "Активный" },
      ],
    };
  },
  computed: {
    ...mapGetters("Clients", ["getClients"]),
    ...mapGetters("Auth", ["getUserRoleAccess"]),
  },
  methods: {
    ...mapActions("Clients", ["getAllClients"]),
    createNewUser() {
      this.$bvModal.show("createNewUser");
    },
    rowClicked(e) {
      if (this.getUserRoleAccess(["ADMIN"]) === false) {
        return;
      }
      this.$router.push({ path: `${e._id}`, params: { id: e._id } });
    },
    async updateClients() {
      this.pagination.offset = 0;
      this.pagination.limit = 5;
      await this.getClientsFromServer(this.pagination);
    },
    async getClientsFromServer(object) {
      await this.getAllClients(object).then(() => {
        this.Clients = this.getClients;
      });
    },
    async changePage(e) {
      console.log("e", e);
      this.pagination.offset =
        e * this.pagination.limit - this.pagination.limit;
      await this.getClientsFromServer(this.pagination);
    },
  },
  watch: {
    pagination: {
      handler() {
        this.getClientsFromServer(this.pagination);
      },
      deep: true,
    },
    filter: {
      handler() {
        let object = JSON.parse(JSON.stringify(this.pagination));
        object.filter = this.filter;
        this.getClientsFromServer(object);
      },
      deep: true,
    },
  },
  async mounted() {
    await this.getClientsFromServer(this.pagination);
  },
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
