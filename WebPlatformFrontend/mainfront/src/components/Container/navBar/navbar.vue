<template>
  <div id="container" class="container_sidebar">
    <b-navbar :class="{ backBtn: button.status }" toggleable="lg">
      <b-navbar-brand href="#">
        {{ title }}
        <a v-if="button.status == true" @click="back()" class="back-return">
          <svg
            class="back-return__arrow"
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.3329 6.50695H2.26824L7.13829 1.6369C7.39402 1.38117 7.39402 0.958652 7.13829 0.6918C6.88256 0.436067 6.46004 0.436067 6.19319 0.6918L0.18902 6.69597C0.18902 6.69597 0.18902 6.69597 0.177901 6.70709C0.166783 6.71821 0.155664 6.72933 0.144545 6.75156L0.133426 6.76268C0.122307 6.7738 0.111188 6.78492 0.100069 6.79604C0.100069 6.79604 0.100069 6.80716 0.0889506 6.80716C0.0778317 6.81828 0.066713 6.84052 0.066713 6.85163V6.86275C0.0555942 6.87387 0.0444753 6.89611 0.0444753 6.91835C0.0333565 6.94058 0.0333564 6.9517 0.0222375 6.97394C0.0222375 6.97394 0.0222375 6.97394 0.0222375 6.98506C0.0222375 7.0073 0.0111189 7.01842 0.0111189 7.04066V7.05177C0.0111189 7.06289 0 7.08513 0 7.09625C0 7.11849 0 7.14072 0 7.16296C0 7.1852 0 7.20744 0 7.22967C0 7.25191 4.28408e-08 7.26303 0.0111189 7.27415V7.28527C0.0111189 7.30751 0.0222375 7.31863 0.0222375 7.34086C0.0222375 7.34086 0.0222375 7.34086 0.0222375 7.35198C0.0333564 7.37422 0.0333565 7.38534 0.0444753 7.40758C0.0444753 7.40758 0.0444753 7.40758 0.0444753 7.41869C0.0555941 7.44093 0.0555942 7.45205 0.066713 7.47429V7.48541C0.0778319 7.49653 0.0889506 7.51876 0.0889506 7.52988C0.0889506 7.52988 0.0889506 7.541 0.100069 7.541C0.111188 7.55212 0.122307 7.56324 0.122307 7.57436L0.133426 7.58548C0.144545 7.5966 0.155664 7.60772 0.166782 7.61883L0.177901 7.62995L6.18207 13.6341C6.3155 13.7676 6.48228 13.8343 6.64906 13.8343C6.81585 13.8343 6.99375 13.7676 7.11605 13.6341C7.37179 13.3784 7.37179 12.9559 7.11605 12.689L2.26824 7.84121H15.3329C15.6998 7.84121 16 7.541 16 7.17408C16 6.80716 15.6998 6.50695 15.3329 6.50695Z"
              fill="#616293"
            />
          </svg>
          {{ button.title }}
        </a>
      </b-navbar-brand>
      <b-navbar-nav>
        <div
          v-if="
            this.$route.path ==
            '/userlist/clients/' + `${this.$route.params.id}`
          "
          class="d-flex"
        >
          <!-- <b-nav-item
            v-if="GET_USER_TYPE == true"
            key="add_admin"
            v-b-modal.add_user
            class="nav_button block_user"
            >Добавить пользователя</b-nav-item
          > -->
          <b-nav-item
            v-if="GET_USER_TYPE == true && GET_ROLE_AUTH('dp_admins')"
            key="block"
            v-b-modal.block_company
            class="block_user"
            >Заблокировать</b-nav-item
          >
          <b-nav-item
            v-if="GET_USER_TYPE == false"
            key="block"
            v-b-modal.block_user
            class="block_user"
            >Заблокировать</b-nav-item
          >
        </div>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto flex-row">
        <b-nav-item-dropdown class="ava_nav_dropdown" right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <div class="side_header_logo">{{ getAbbr }}</div>
          </template>
          <b-dropdown-item class="title_dropdown" disabled>
            <b>{{ getUserName }}</b>
          </b-dropdown-item>
          <b-dropdown-item href="#" @click="logout_service"
            >Выйти</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <!-- <AddAdmin />
      <AddUser />
      <BlockUser />
      <BlockAdmin /> -->
      <!-- <AddWell /> -->
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Navbar",
  components: {
    // AddWell,
    // AddCompanyModal,
    // AddAdmin,
    // AddUser,
    // BlockUser,
    // BlockAdmin,
  },
  data() {
    return {
      title_nav: "",
      button: {},
      // modal_show: false,
      // addAdmin_modal_show: false
    };
  },
  computed: {
    ...mapState("NavSideBar", ["title"]),
    ...mapGetters("NavSideBar", ["GET_BACK_BUTTON_INFO"]),
    ...mapGetters("Auth", ["getUserAbbr", "getUserName"]),
    getAbbr() {
      return this.getUserAbbr;
    },
  },
  methods: {
    ...mapActions("Auth", ["logout"]),
    logout_service() {
      localStorage.clear();
      sessionStorage.clear();
      this.$router.push({ name: "Login" });
    },
    back() {
      this.$router.go(-1);
    },
    push_dp_products() {
      document.location.href = process.env.VUE_APP_API_BASE_MCP_PRODUCT;
      this.$router.push({ path: `/products`, exact: true });
    },
    push_AIDrilling() {
      document.location.href = "https://f-aid.dptrlm.ru";
    },
    push_DeepCore() {
      document.location.href = "https://deepcore.petroleum.digital";
    },
    push_ForField() {
      document.location.href = "https://4field.dptrlm.ru";
    },
    push_settings_account() {
      document.location.href = process.env.VUE_APP_API_BASE_SETTING_ACCOUNT;
      this.$router.push({ path: `/settings`, exact: true });
    },
  },
  mounted() {
    this.button = this.GET_BACK_BUTTON_INFO;
  },
};
</script>

<style lang="scss">
.text-product-header__application {
  -moz-osx-font-smoothing: grayscale;
  //font-weight: lighter !important;
  font-family: "Monteserrat-SemiBold";
  font-style: normal;

  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.5px;

  color: #2d5bd0;
  margin-right: 8px;
  &:hover {
    text-decoration-line: underline;
  }
}
.application__header {
  display: flex;
  padding-left: 16px;
  padding-right: 20px;
  padding-bottom: 12px;
  & a {
    padding: 0px !important;
  }
}
.application__padding {
  & a {
    padding: 8px 20px 8px 16px !important;
  }
}
.application_menu {
  padding: 12px 0px 0px 0px !important;
}
.icon_product__application {
  margin-right: 8px;
}
.text-product__application {
  font-family: "Monteserrat-Medium";
  font-style: normal;
  //font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #242424;
}
.block_user {
  border: 2px solid #242424;
  box-sizing: border-box;
  border-radius: 4px;
  & a {
    color: black !important;
    padding: 6px 16px !important;
  }
}
.ml-auto {
  margin-left: auto;
  align-items: center;
  //padding-top: 24px;
}
.nav_button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
  position: static;
  // width: 201px;
  // height: 40px;
  // left: 161px;
  // top: 0px;
  background: #2d5bd0;
  border: 2px solid #2d5bd0;
  box-sizing: border-box;
  border-radius: 4px;
}
.nav-link {
  font-family: Monteserrat-SemiBold;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.5px;
  color: #ffffff !important;
  border: none;
  outline: none;
}
.nav-item:not(:last-child) {
  margin-right: 24px;
}
.nav-item:first-child {
  margin-left: 40px;
}
.dropdown-toggle::after {
  display: none;
}
.navbar {
  padding-top: 17px;
  padding-left: 0 !important;
  padding-bottom: 0px;
  margin-bottom: 30px;
  &.backBtn {
    padding-bottom: 0px;
    margin-bottom: 44px;
  }
}
.navbar:focus-visible {
  outline: none;
}
.back-return {
  text-decoration: none;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 1;
  left: 0%;
  font-family: "Monteserrat-Medium";
  font-style: normal;
  //font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.5px;
  color: #616293;
  &:hover {
    color: #616293;
  }
}
.back-return__arrow {
  margin-right: 12px;
}
.navbar-brand {
  position: relative;
  font-family: Monteserrat-Bold;
  font-style: normal;
  font-size: 25px;
  line-height: 32px;
}
.nav-item:focus-visible {
  outline: none;
}
.ava_nav_dropdown {
  font-family: "Monteserrat-Medium";
  // align-items: center;
  border-radius: 100%;
  // font-size: 14px;
  // padding-right: 35px;
  // padding-left: 0px;
  // margin-bottom: 4px;
  // margin-top: 4px;
  // height: 32px;
  // width: 32px;
  // color: #242424;
  background: #b4e1ff;
  // line-height: 17px;
  // justify-content: center;
}
.separator {
  border-left: 1px solid #dadada;
  height: 36px;
}
.notice_dropdown ul {
  width: 410px;
  max-height: 600px;
  overflow-y: scroll;
}
.notice_dropdown li:first-child {
  a {
    border-radius: 8px 8px 0 0;
    margin-top: -0.5px;
    font-family: "Monteserrat-SemiBold";
    font-size: 25px;
    line-height: 30px;
    color: #242424;
    display: flex;
    flex-direction: column;
  }
}
.notice_dropdown li {
  a {
    padding-left: 24px;
  }
}
.notice_dropdown li:first-child:hover {
  a {
    background: none;
    cursor: initial;
  }
}
.notice_dropdown span {
  font-family: "Monteserrat-Medium";
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.5px;
  color: #5e5e5e;
  margin-left: 24px;
}
.link_notice {
  font-family: "Monteserrat-Medium" !important;
  font-size: 12px !important;
  line-height: 15px !important;
  color: #616293 !important;
  margin-top: 6px !important;
  text-decoration: none !important;
  padding: 0 !important;
}
.link_notice:hover {
  text-decoration: underline !important;
  cursor: pointer !important;
}
.notice {
  display: flex;
  align-items: center;
}
.text_notice {
  font-family: "Monteserrat-Medium";
  font-size: 14px;
  line-height: 18px;
  color: #242424;
  flex: 50%;
  flex-wrap: wrap;
  margin-left: 8px;
}
.marker {
  align-items: center;
  border-radius: 100%;
  height: 8px;
  width: 8px;
  background: #b4e1ff;
}
.products_dropdown ul {
  width: 218px;
}
.products_dropdown li:first-child {
  a {
    border-radius: 8px 8px 0 0;
    text-align: center;
    margin-top: -0.5px;
    font-family: "Monteserrat-SemiBold";
    //font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #2d5bd0;
    letter-spacing: -0.5px;
    padding-top: 12px;
    padding-right: 18px;
  }
}
.products_dropdown li:first-child:hover {
  a {
    background: none;
    text-decoration: underline;
  }
}

.dropdown-menu {
  min-width: 204px;
  left: unset;
  right: 0;
  margin-top: 10px;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0 0;
}
.dropdown-menu li:last-child {
  a {
    border-radius: 0 0 8px 8px;
    margin-bottom: -0.5px;
  }
}
.title_dropdown {
  background: #616293;
  border-radius: 8px 8px 0 0;
  text-align: center;
  margin-top: -0.5px;
  margin-right: -0.5px;
  margin-left: -0.5px;
}
.title_dropdown b {
  font-family: Monteserrat-SemiBold;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
}
.title_dropdown p {
  font-family: Montserrat-Light;
  font-style: normal;
  //font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  margin-bottom: 5px;
  text-align: start;
  color: #ffffff;
}
.dropdown-item {
  font-family: Monteserrat-Medium;
  font-size: 12px;
  line-height: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.dropdown-item:hover,
.dropdown-item:focus {
  background-color: #e8e8e8;
}
.btn_padding {
  padding: 8px 16px;
}
</style>
