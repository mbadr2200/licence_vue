<template>
  <form @submit.prevent="editLicence">
    <label for="key">Key:</label>
    <div class="key_container">
      <input type="text" required v-model="key" disabled />
    </div>
    <label for="expiry_date"> Expiry date:</label>
    <input type="date" required v-model="expiry_date" />
    <label for="ip_address">Ip address: </label>
    <input type="text" v-model="ip_address" />
    <label for="status">Status:</label>
    <select v-model="status">
      <option value="valid">valid</option>
      <option value="invalid">invalid</option>
    </select>
    <button>Add New Licence</button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      key: "",
      expiry_date: "",
      ip_address: "",
      status: "",
    };
  },
  mounted() {
    // on mount get the data from database based on the id of the licence
    axios
      .get(
        "http://localhost/licence_api/api/licence/getLicences.php?id=" + this.id
      )
      .then((res) => {
        this.key = res.data.data.key;
        this.expiry_date = res.data.data.expiry_date;
        this.ip_address = res.data.data.ip;
        this.status = res.data.data.status;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    editLicence() {
      var newlicence = {
        id: this.id,
        key: this.key,
        expiry_date: this.expiry_date,
        ip_address: this.ip_address ? this.ip_address : "",
        status: this.status,
      };

      axios
        .put(
          "http://localhost:8080/licence_api/api/licence/editLicence.php",
          JSON.stringify(newlicence),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          this.$swal
            .fire({
              title: "Licence Updated .",
              text: "Licence has been updated successfully.",
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#F26627",
              confirmButtonText: "Ok!",
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.$router.push("/");
              }
            });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
