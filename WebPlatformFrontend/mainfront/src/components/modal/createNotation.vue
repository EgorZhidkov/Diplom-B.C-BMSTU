<template>
  <b-modal
    id="createNotation"
    ref="modal"
    title="Создание нового маршрута"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
    cancel-title="Отменить"
    ok-title="Создать"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        label="Название маршрута"
        label-for="name-input"
        invalid-feedback="Обязательное поле"
        :state="nameState"
      >
        <b-form-input
          id="name-input"
          v-model="newNotation.name"
          :state="nameState"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Ссылка на поезд"
        label-for="name-input"
        invalid-feedback="Обязательное поле"
        :state="nameState"
      >
        <b-form-input
          id="url_link"
          v-model="newNotation.url_link"
          :state="nameState"
          required
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="Описание маршрута"
        label-for="name-input"
        invalid-feedback="Обязательное поле"
        :state="nameState"
      >
        <b-form-textarea
          id="url_link"
          v-model="newNotation.description"
          :state="nameState"
          required
        >
        </b-form-textarea>
      </b-form-group>
      <b-form-group
        label="Категория"
        label-for="name-input"
        invalid-feedback="Обязательное поле"
        :state="nameState"
        v-if="createCategory === false"
      >
        <b-form-select v-model="newNotation.category" id="chooseCategory">
          <b-form-select-option
            v-for="(item, index) in allCategories"
            :key="index"
            :value="item"
            >{{ item.value }}</b-form-select-option
          >
        </b-form-select>
        <b-button
          class="mt-2"
          @click="changeFieldCategory"
          v-model="createCategory"
          v-if="getUserRoleAccess(['ADMIN'])"
          >Cоздать новую категорию</b-button
        >
      </b-form-group>
      <b-form-group
        label="Категория"
        label-for="name-input"
        invalid-feedback="Обязательное поле"
        :state="nameState"
        v-if="createCategory === true"
      >
        <div class="d-flex flex-row justify-content-between align-items-center">
          <b-form-input
            id="newCategory"
            v-model="newNotation.category.value"
            :state="nameState"
            required
          >
          </b-form-input>
          <b-icon-x-circle
            class="ml-2"
            style="cursor: pointer"
            @click="backToChooseCategory"
          ></b-icon-x-circle>
        </div>
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
          ref="file"
        ></b-form-file>
      </b-form-group>
      <b-form-group>
        <b-img
          class="previewImage"
          v-bind:src="imagePreview"
          v-show="showPreview"
        />
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import helperService from "../../services/helper-service";
export default {
  name: "createNotation",
  data() {
    return {
      name: "",
      nameState: null,
      submittedNames: [],
      file1: null,
      file2: null,
      allCategories: null,
      createCategory: false,
      newNotation: {
        id: "",
        name: "",
        description: "",
        url_link: "",
        category: {},
        imageName: "",
      },
      fileSource: null,
      fileName: "",
      showPreview: false,
      imagePreview: "",
    };
  },
  computed: {
    ...mapGetters("Notation", ["getCategories"]),
    ...mapGetters("Auth", ["getUserId", "getUserRoleAccess"]),
    userId() {
      return this.getUserId;
    },
  },
  methods: {
    ...mapActions("Notation", ["createNewNotation"]),

    handleFileUpload() {
      // this.fileSource = this.$refs.file.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );
      if (this.fileSource) {
        if (/\.(jpe?g|png|gif)$/i.test(this.fileSource.name)) {
          reader.readAsDataURL(this.fileSource);
        }
      }
    },

    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    fileChange() {
      this.fileName = this.fileSource.name;
      // this.fileSource = new FormData().append("file", this.fileSource);
    },
    validateName() {
      return this.newNotation.name.length > 5;
    },
    changeFieldCategory() {
      this.newNotation.category = {};
      this.createCategory = true;
    },
    backToChooseCategory() {
      this.newNotation.category = {};
      this.createCategory = false;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      console.log(this.newNotation);
      this.handleSubmit();
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      this.newNotation.id = this.getUserId;
      if (this.newNotation.category._id === undefined) {
        this.newNotation.category._id = "";
      }
      const formdata = new FormData();
      formdata.append("file", this.fileSource);
      await helperService
        .saveImage(this.fileSource)
        .then(async (response) => {
          let data = response.data;
          this.newNotation.imageName = data.filename;
          await this.createNewNotation(this.newNotation)
            .then((resp) => {
              this.newNotation.name = "";
              this.newNotation.url_link = "";
              this.fileSource = null;
              this.fileName = "";
              this.showPreview = false;
              this.newNotation.imageName = "";
              this.imagePreview = "";
              this.$nextTick(() => {
                this.$emit("updateNotation");
                this.$bvModal.hide("createNotation");
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.allCategories = this.getCategories;
  },
};
</script>

<style lang="scss" scoped>
.previewImage {
  width: 100%;
  height: 100%;
}
</style>
