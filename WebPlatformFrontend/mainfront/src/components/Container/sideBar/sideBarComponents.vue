<template>
  <div class="sidebar_items">
    <button @click="monitoringPage()" class="separator_sideBar">
      <svg
        :class="{ sideBardActive: GET_SIDEVAR_ACTIVE === 0 }"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="white" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M27.5 16C27.5 17.933 25.933 19.5 24 19.5C22.067 19.5 20.5 17.933 20.5 16C20.5 14.067 22.067 12.5 24 12.5C25.933 12.5 27.5 14.067 27.5 16ZM27.7742 20.6646C29.132 19.5645 30 17.8836 30 16C30 12.6863 27.3137 10 24 10C20.6863 10 18 12.6863 18 16C18 17.8836 18.868 19.5645 20.2258 20.6646C18.558 21.2737 17.079 22.2751 15.9004 23.5571C15.4364 23.2079 14.9321 22.9095 14.3956 22.6701C15.3823 21.7568 16 20.4505 16 19C16 16.2386 13.7614 14 11 14C8.23858 14 6 16.2386 6 19C6 20.4505 6.61768 21.7568 7.60437 22.6701C4.89114 23.8806 3 26.6018 3 29.7647C3 31.5515 4.44849 33 6.23529 33H13.126C13.5701 34.7252 15.1362 36 17 36H31C32.8638 36 34.4299 34.7252 34.874 33H41.7647C43.5515 33 45 31.5515 45 29.7647C45 26.6018 43.1089 23.8806 40.3956 22.6701C41.3823 21.7568 42 20.4505 42 19C42 16.2386 39.7614 14 37 14C34.2386 14 32 16.2386 32 19C32 20.4505 32.6177 21.7568 33.6044 22.6701C33.0679 22.9095 32.5636 23.2079 32.0996 23.5571C30.921 22.2751 29.442 21.2737 27.7742 20.6646ZM33.5728 25.5776C34.4041 27.0419 34.909 28.7156 34.9888 30.5H41.7647C42.1708 30.5 42.5 30.1708 42.5 29.7647C42.5 26.8571 40.1429 24.5 37.2353 24.5H36.7647C35.5646 24.5 34.4583 24.9015 33.5728 25.5776ZM13.0112 30.5C13.091 28.7156 13.5959 27.0419 14.4272 25.5776C13.5417 24.9015 12.4354 24.5 11.2353 24.5H10.7647C7.85709 24.5 5.5 26.8571 5.5 29.7647C5.5 30.1708 5.8292 30.5 6.23529 30.5H13.0112ZM32.5 31V32C32.5 32.8284 31.8284 33.5 31 33.5H17C16.1716 33.5 15.5 32.8284 15.5 32V31C15.5 26.3056 19.3056 22.5 24 22.5C28.6944 22.5 32.5 26.3056 32.5 31ZM11 21.5C12.3807 21.5 13.5 20.3807 13.5 19C13.5 17.6193 12.3807 16.5 11 16.5C9.61929 16.5 8.5 17.6193 8.5 19C8.5 20.3807 9.61929 21.5 11 21.5ZM37 21.5C38.3807 21.5 39.5 20.3807 39.5 19C39.5 17.6193 38.3807 16.5 37 16.5C35.6193 16.5 34.5 17.6193 34.5 19C34.5 20.3807 35.6193 21.5 37 21.5Z"
          fill="#242424"
        />
      </svg>
    </button>

    <button @click="wellsPage()" class="separator_sideBar">
      <svg
        :class="{ sideBardActive: GET_SIDEVAR_ACTIVE === 2 }"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="white" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 32.1541L8 39.9999L15.8458 39.9999C16.8573 39.9999 17.8273 39.5981 18.5426 38.8829L38.883 18.5425C40.3724 17.0531 40.3723 14.6383 38.8829 13.1489L34.851 9.11702C33.3616 7.62765 30.9469 7.62766 29.4575 9.11704L9.11705 29.4574C8.40182 30.1726 8 31.1427 8 32.1541ZM15.8458 37.4573L10.5425 37.4573L10.5426 32.1541C10.5426 31.817 10.6765 31.4936 10.9149 31.2552L25.7979 16.3723L31.6277 22.202L16.7447 37.085C16.5063 37.3234 16.183 37.4573 15.8458 37.4573ZM33.4255 20.4042L37.0851 16.7446C37.5816 16.2481 37.5816 15.4432 37.0851 14.9467L33.0532 10.9149C32.5567 10.4184 31.7518 10.4184 31.2553 10.9149L27.5958 14.5744L33.4255 20.4042Z"
          fill="#242424"
        />
      </svg>
    </button>
    <button @click="dashboardPage()" class="separator_sideBar">
      <svg
        width="48"
        height="48"
        :class="{ sideBardActive: GET_SIDEVAR_ACTIVE === 1 }"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="white" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.5 11.5V22.5H20.5V11.5H11.5ZM22.6451 9.86225C22.284 9.34124 21.6819 9 21 9H11C9.89543 9 9 9.89543 9 11V23C9 23.6819 9.34124 24.284 9.86225 24.6451C10.1852 24.8689 10.5773 25 11 25H21C21.4227 25 21.8148 24.8689 22.1377 24.6451C22.2979 24.5341 22.441 24.4004 22.5625 24.2486C22.8363 23.9064 23 23.4723 23 23V11C23 10.5773 22.8689 10.1852 22.6451 9.86225ZM25.4375 23.7514C25.1637 24.0936 25 24.5277 25 25V37C25 37.4227 25.1311 37.8148 25.3549 38.1377C25.716 38.6588 26.3181 39 27 39H37C38.1046 39 39 38.1046 39 37V25C39 24.3181 38.6588 23.716 38.1377 23.3549C37.8148 23.1311 37.4227 23 37 23H27C26.5773 23 26.1852 23.1311 25.8623 23.3549C25.7021 23.4659 25.559 23.5996 25.4375 23.7514ZM25.3549 9.86225C25.1311 10.1852 25 10.5773 25 11V19C25 19.5072 25.1888 19.9703 25.5 20.3229C25.6071 20.4443 25.7288 20.5526 25.8623 20.6451C26.1852 20.8689 26.5773 21 27 21H37C37.4227 21 37.8148 20.8689 38.1377 20.6451C38.6588 20.284 39 19.6819 39 19V11C39 9.89543 38.1046 9 37 9H27C26.3181 9 25.716 9.34124 25.3549 9.86225ZM22.6451 38.1377C22.8689 37.8148 23 37.4227 23 37V29C23 28.4928 22.8112 28.0297 22.5 27.6771C22.3929 27.5557 22.2712 27.4474 22.1377 27.3549C21.8148 27.1311 21.4227 27 21 27H11C10.5773 27 10.1852 27.1311 9.86225 27.3549C9.34124 27.716 9 28.3181 9 29V37C9 38.1046 9.89543 39 11 39H21C21.6819 39 22.284 38.6588 22.6451 38.1377ZM27.5 11.5V18.5H36.5V11.5H27.5ZM11.5 29.5V36.5H20.5V29.5H11.5ZM27.5 25.5V36.5H36.5V25.5H27.5Z"
          fill="#242424"
        />
      </svg>
    </button>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "SideBarComponents",
  data() {
    return {
      sideBardActive: 0,
    };
  },
  methods: {
    ...mapMutations("NavSideBar", ["SET_TITLE_PAGE", "SET_SIDEVAR_ACTIVE"]),
    wellsPage() {
      this.SET_TITLE_PAGE("?????????????????????????? ????????????????");
      this.SET_SIDEVAR_ACTIVE(2);
      this.$router.push({ name: "AllNotation", exact: true });
    },
    dashboardPage() {
      this.SET_TITLE_PAGE("???????????????? ????????????");
      this.SET_SIDEVAR_ACTIVE(1);
      this.$router.push({ name: "Dashboard", exact: true });
    },
    monitoringPage() {
      this.SET_TITLE_PAGE("????????????????????");
      this.SET_SIDEVAR_ACTIVE(0);
      this.$router.push({ name: "Clients", exact: true });
    },
  },
  computed: {
    ...mapGetters("NavSideBar", ["GET_SIDEVAR_ACTIVE"]),
  },
};
</script>

<style lang="scss" scoped>
.sidebar_items {
  display: flex;
  flex-direction: column;
  width: 64px;
  align-items: center;
}
.sidebar_items button {
  border: none;
  background: none;
  margin-bottom: 24px;
}
.sideBardActive {
  background: #5459e8;
  box-shadow: 0px 3px 10px rgba(84, 89, 232, 0.5);
  //box-shadow: 0 0.5rem 1rem rgba(84, 89, 232, 0.2) !important;
  border-radius: 8px;
  fill: #ffffff !important;
}
.separator_sideBar:focus {
  outline: none;
}
.sidebar_items svg {
  fill: #616293;
  &:hover {
    border-radius: 8px;
    fill: #9e9e9e;
  }
  &:active {
    background: #5459e8;
    border-radius: 8px;
    fill: #ffffff;
  }
}
</style>
