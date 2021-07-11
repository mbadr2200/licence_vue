<template>
  <form @submit.prevent="addLicence">
    <label for="key">Key:</label>
    <div class="key_container">
      <input type="text" required v-model="key" />
      <a class="generate_key" @click="generateKey"
        ><span class="material-icons">restart_alt</span></a
      >
    </div>
    <label for="expiry_date"> Expiry date:</label>
    <input type="date" required v-model="date" />
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
  data() {
    return {
      key: "",
      date: "",
      ip_address: "",
      status: "",
    };
  },
  methods: {
    generateKey() {
      var length = 20;
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      this.key = result;
    },
    addLicence() {
      const newLicence = {
        key: this.key,
        expiry_date: this.date,
        ip_address: this.ip_address,
        status: this.status,
      };
      axios
        .post(
          "http://localhost:8080/licence_api/api/licence/createLicence.php",
          JSON.stringify(newLicence),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          this.$swal.fire({
            icon: "success",
            title: "Done",
            text: "Licence added !",
          });
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
form {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  width: 80%;
  border-radius: 8px;
  margin: 0 auto;
  padding: 20px;
}
label {
  color: var(--main_orange_color);
  font-weight: bold;
  font-size: 20px;
  margin: 10px;
}
input,
select {
  background: #eee;
  outline: none;
  border: none;
  padding: 10px;
  border-radius: 8px;
  width: 50%;
  text-align: left;
  font-size: 15px;
  color: black;
}
.key_container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background:#eee;
  width: 50%;
}
.key_container input {
  flex: 1;
}
.generate_key {
  height: 100%;
  width:40px;
  margin-left: 10px;
  border-radius: 8px;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1) 200ms all;
  color: var(--deep_blue_color);
}
.generate_key:hover {
  cursor: pointer;
  color: var(--main_orange_color);
  background: #eee;
}
button {
  width: 50%;
  margin: 20px;
  padding: 10px;
  background: var(--main_orange_color);
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1) 200ms all;
}
button:hover {
  cursor: pointer;
  background: var(--deep_blue_color);
}
</style>
