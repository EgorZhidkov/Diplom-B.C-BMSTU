<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <b-alert
            :show="alertTimeCount"
            dismissible
            fade
            :variant="alertVariant"
            @dismissed="alertTimeCount = 0"
            @dismiss-count-down="countDownChanged"
          >
            {{ alertText }}
          </b-alert>
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Авторизация</h1>
                  <p class="text-muted">Войдите в аккаунт</p>
                  <CInput
                    placeholder="Логин"
                    autocomplete="username email"
                    v-model="userData.username"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Пароль"
                    type="password"
                    autocomplete="curent-password"
                    v-model="userData.password"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4" @click="login()"
                        >Войти</CButton
                      >
                    </CCol>
                    <CCol col="6" class="text-right">
                      <!-- <CButton color="link" class="px-0"
                        >Forgot password?</CButton
                      >
                      <CButton color="link" class="d-lg-none"
                        >Register now!</CButton
                      > -->
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      username: null,
      userData: {
        username: null,
        password: null,
      },
      alertTimeCount: 0,
      alertTimeSeconds: 5,
      alertText: "",
      alertVariant: "",
    };
  },
  methods: {
    ...mapMutations("NavSideBar", ["SET_TITLE_PAGE", "SET_SIDEVAR_ACTIVE"]),
    ...mapActions("Auth", ["Auth"]),
    login() {
      this.Auth(this.userData)
        .then((responce) => {
          this.SET_TITLE_PAGE("Обзорная панель");
          this.$router.push({ name: "Dashboard" });
        })
        .catch((error) => {
          this.alertVariant = "danger";
          this.alertText = error;
          this.showAlert();
        });
    },
    countDownChanged(alertCountDown) {
      this.alertTimeCount = alertCountDown;
    },
    showAlert() {
      this.alertTimeCount = this.alertTimeSeconds;
    },
  },
};
</script>
