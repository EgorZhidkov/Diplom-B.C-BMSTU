<template>
  <b-modal
    id="createNewUser"
    ref="modal"
    title="Добавление нового сотрудника"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
    cancel-title="Отменить"
    ok-title="Создать"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        label="ФИО"
        label-for="name-input"
        invalid-feedback="Обязательное поле"
        :state="nameState"
      >
        <b-form-input
          id="name-input"
          :state="nameState"
          v-model="user.fullName"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Логин"
        label-for="name-input"
        invalid-feedback="Обязательное поле"
        :state="nameState"
      >
        <b-form-input v-model="user.username" :state="nameState" required>
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="Пароль"
        label-for="name-input"
        invalid-feedback="Обязательное поле"
        :state="nameState"
      >
        <b-form-input
          type="password"
          v-model="user.password"
          :state="nameState"
          required
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="Почта"
        label-for="name-input"
        invalid-feedback="Обязательное поле"
        :state="nameState"
      >
        <b-form-input
          type="email"
          v-model="user.email"
          :state="nameState"
          required
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="Телефон"
        label-for="name-input"
        invalid-feedback="Обязательное поле"
        :state="nameState"
      >
        <b-form-input
          type="tel"
          v-model="user.phone"
          :state="nameState"
          required
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="Роли"
        label-for="name-input"
        invalid-feedback="Обязательное поле"
        :state="nameState"
      >
        <b-checkbox-group>
          <b-checkbox
            v-for="(item, index) in roles"
            :key="index"
            :value="item"
            v-model="user.newRole"
            >{{ roleName(item.value) }}</b-checkbox
          >
        </b-checkbox-group>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
import authService from "../../services/auth-service.js";
export default {
  name: "createNewUser",
  data() {
    return {
      nameState: null,
      user: {
        fullName: null,
        username: null,
        password: null,
        email: null,
        phone: null,
        newRole: null,
      },
      roles: [],
    };
  },

  methods: {
    roleName(value) {
      if (value === "USER") {
        return "Сотрудник";
      } else {
        return "Администратор";
      }
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      //   this.name = "";
      //   this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      //   console.log(this.newNotation);
      this.handleSubmit();
    },
    async handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      authService
        .regisration(JSON.stringify(this.user))
        .then((response) => {
          this.$nextTick(() => {
            this.$emit("updateClients");
            this.$bvModal.hide("createNewUser");
          });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    getAllRoles() {
      authService
        .getAllRoles()
        .then((response) => {
          console.log(response.data);
          this.roles = response.data.roles;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.getAllRoles();
  },
};
</script>

<style></style>
