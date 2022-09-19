<template>
  <div class="container_block">
    <!-- {{ clientInfo }} -->
    <b-form>
      <b-form-group
        label="ФИО"
        label-for="name-input"
        label-align="left"
        invalid-feedback="Обязательное поле"
      >
        <b-form-input v-model="clientInfo.fullName"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Логин"
        label-for="name-input"
        label-align="left"
        invalid-feedback="Обязательное поле"
        aria-autocomplete="nones"
      >
        <b-form-input v-model="clientInfo.username"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Почта"
        label-for="name-input"
        label-align="left"
        invalid-feedback="Обязательное поле"
      >
        <b-form-input type="email" v-model="clientInfo.email"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Телефон"
        label-for="name-input"
        label-align="left"
        invalid-feedback="Обязательное поле"
      >
        <b-form-input
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          type="email"
          v-model="clientInfo.phone"
        ></b-form-input>
        <!-- <InputMask mask="+4\9 99 999 99" maskChar="{null}" /> -->
      </b-form-group>
      <b-form-group
        label="Роли пользователя"
        label-for="name-input"
        label-align="left"
        invalid-feedback="Обязательное поле"
      >
        <b-form-checkbox-group
          class="user_roles"
          v-model="selected"
          :options="options"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
        ></b-form-checkbox-group>
      </b-form-group>
      <b-form-group
        label="Состояние пользователя"
        label-for="name-input"
        label-align="left"
        invalid-feedback="Обязательное поле"
      >
        <div class="user_status">
          <b-checkbox v-model="clientInfo.locked">Заблокирован</b-checkbox>
        </div>
      </b-form-group>
      <div v-if="submit_visions === true" class="form_buttons">
        <b-button class="cancel" @click="cancelButton">Отменить</b-button>
        <b-button class="submit" @click="submit">Применить</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import authService from "../services/auth-service";
import clientsService from "../services/clients-service";
import InputMask from "vue-input-mask";
export default {
  name: "ClientPage",
  components: {
    InputMask,
  },
  data() {
    return {
      clientInfo: null,
      allroles: null,
      selected: [],
      options: [],
      submit_visions: false,
      counter: 0,
    };
  },
  watch: {
    clientInfo: {
      handler() {
        if (this.counter > 1) {
          this.submit_visions = true;
        }
        this.counter += 1;
      },
      deep: true,
    },
    selected: {
      handler() {
        if (this.counter > 1) {
          this.submit_visions = true;
        }
        this.counter += 1;
      },
      deep: true,
    },
  },
  methods: {
    async getClientInfo(mounted) {
      await clientsService
        .getClientInfo(JSON.stringify({ _id: this.$route.params.id }))
        .then((response) => {
          let data = response.data.resp;
          if (mounted === true) {
            this.counter = 1;
          }
          this.clientInfo = data;
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },
    async submit() {
      this.clientInfo.roles = this.selected;
      await clientsService
        .updateClientInfo(JSON.stringify(this.clientInfo))
        .then((response) => {
          this.submit_visions = false;
          console.log(response.data.message);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },
    async cancelButton() {
      this.submit_visions = false;
      await this.getClientInfo(true);
    },
  },
  async mounted() {
    await this.getClientInfo(false);
    await authService.getAllRoles().then((response) => {
      let data = response.data.roles;
      data.forEach((element) => {
        if (element.value === "USER") {
          this.options.push({ item: element, name: "Сотрудник" });
        } else {
          this.options.push({ item: element, name: "Администратор" });
        }
      });
      data.forEach((AllRoles) => {
        this.clientInfo.roles.forEach((userRoles) => {
          if (JSON.stringify(AllRoles) === JSON.stringify(userRoles)) {
            console.log(true);
            this.selected.push(AllRoles);
          }
        });
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.container_block {
  padding: 32px;
  width: 50%;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.3);
  border-radius: 25px;
}
.user_status,
.user_roles,
.form_buttons {
  display: flex;
}
.form_buttons {
  justify-content: space-between;
  & .cancel {
    background-color: rgb(217, 7, 7);
    font-family: "Monteserrat-Medium";
    color: white;
  }
  & .submit {
    color: white;
    font-family: "Monteserrat-Medium";
    background-color: rgb(7, 7, 148);
  }
}
</style>
