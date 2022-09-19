<template>
  <div class="container_block">
    <b-form>
      <b-form-group
        label="Название поезда"
        label-for="name-input"
        label-align="left"
        invalid-feedback="Обязательное поле"
      >
        <b-form-input v-model="Notation.name"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Ссылка на поезд"
        label-for="name-input"
        label-align="left"
        invalid-feedback="Обязательное поле"
      >
        <b-form-input v-model="Notation.url_link"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Описание маршрута"
        label-for="name-input"
        label-align="left"
        invalid-feedback="Обязательное поле"
      >
        <b-form-textarea v-model="Notation.description"></b-form-textarea>
      </b-form-group>
      <b-form-group
        label="Время создания(обновления)"
        label-for="name-input"
        label-align="left"
        invalid-feedback="Обязательное поле"
      >
        <b-form-datepicker
          id="ex-disabled-readonly"
          v-model="Notation.dataCreated"
        ></b-form-datepicker>
      </b-form-group>
      <b-form-group
        label="Категория маршрута"
        label-for="name-input"
        label-align="left"
      >
        <b-form-select v-model="Notation.categories._id" id="chooseCategory">
          <b-form-select-option
            v-for="(item, index) in categories"
            :key="index"
            :value="item._id"
            >{{ item.value }}</b-form-select-option
          >
        </b-form-select>
      </b-form-group>
      <b-form-group
        label="Фотография маршрута"
        label-for="name-input"
        label-align="left"
      >
        <b-form-file
          @input="handleFileUpload()"
          v-model="fileSource"
          browse-text="Обзор"
          placeholder="Файл не выбран"
          class="mb-2"
          ref="file"
        ></b-form-file>
        <b-img :src="image" style="width: 100%; height: 100%"></b-img>
      </b-form-group>
    </b-form>
    <div class="d-flex justify-content-between">
      <b-button @click="saveNewNotation">Сохранить</b-button>
      <b-button
        v-if="getUserRoleAccess(['ADMIN'])"
        variant="danger"
        @click="openDeleteModal"
        >Удалить</b-button
      >
    </div>
    <b-modal
      @cancel="cancelDeleteNotation"
      @ok="deleteNotation"
      v-model="modalShow"
      >Вы уверены что хотите удалить данный маршрут?
      <template #modal-footer="{ ok, cancel }">
        <b-button size="sm" @click="cancel()"> Отменить </b-button>
        <b-button size="sm" variant="danger" @click="ok()"> Удалить </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import helperService from "../services/helper-service";
import notationService from "../services/notation-service";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "NotationPage",
  data() {
    return {
      id: {
        _id: null,
      },
      Notation: null,
      categories: null,
      chooseCat: null,
      image: null,
      fileSource: null,
      modalShow: false,
    };
  },
  computed: {
    ...mapGetters("Notation", ["getCategories"]),
    ...mapGetters("Auth", ["getUserRoleAccess", "getUserName"]),
    getCategoryChoosen() {
      this.categories.forEach((item) => {
        if (item.value === this.Notation.categories) {
          return item;
        }
      });
    },
  },
  methods: {
    ...mapActions("Notation", [
      "getOneNotation",
      "getAllCategories",
      "updateNotation",
    ]),
    async deleteNotation() {
      console.log(true);
      await notationService
        .deleteNotation(JSON.stringify(this.id))
        .then((response) => {
          this.modalShow = false;
          this.$router.push({ name: "AllNotation" });
        });
    },
    cancelDeleteNotation() {
      this.modalShow = false;
    },
    openDeleteModal() {
      this.modalShow = true;
    },
    async getNotation(id) {
      await this.getOneNotation(id)
        .then((response) => {
          this.Notation = response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleFileUpload() {
      // this.fileSource = this.$refs.file.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          this.image = reader.result;
        }.bind(this),
        false
      );
      if (this.fileSource) {
        if (/\.(jpe?g|png|gif)$/i.test(this.fileSource.name)) {
          reader.readAsDataURL(this.fileSource);
        }
      }
    },
    async saveNewNotation() {
      console.log(this.fileSource);
      if (this.fileSource != null) {
        this.Notation.imageName = this.fileSource.name;
      }
      this.categories.forEach((item) => {
        if (item._id === this.Notation.categories._id) {
          this.Notation.categories.value = item.value;
        }
      });
      this.Notation.dataCreated = moment(this.Notation.dataCreated).format();
      let payload = {};
      this.Notation.userCreated = this.getUserName;
      payload.Notation = this.Notation;

      if (this.fileSource === null) {
        await this.updateNotation(payload);
        this.$router.push({ name: "AllNotation" });
      } else {
        await helperService
          .saveImage(this.fileSource)
          .then(async (response) => {
            await this.updateNotation(payload)
              .then((response) => {
                this.$router.push({ name: "AllNotation" });
                console.log("response", response);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }

      let test = {};
      test.Notation = this.Notation;
      test = JSON.stringify(test);
      console.log(test);
    },
    getImage(filePath) {
      helperService
        .getImage(filePath)
        .then((response) => {
          this.image = window.URL.createObjectURL(new Blob([response.data]));
        })
        .catch((error) => {
          error;
        });
    },
  },
  async mounted() {
    console.log(this.$route);
    this.id._id = this.$route.params.id;
    this.categories = this.getCategories;
    await this.getNotation(this.id);
    this.getImage(this.Notation.imageName);
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
</style>
