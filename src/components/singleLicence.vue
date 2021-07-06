<template>
  <div class="card_body">
    <div class="data">
      <!-- <p><strong>id :</strong> {{ licence.id }}</p> -->
      <p><strong>key :</strong> {{ licence.key }}</p>
      <p><strong>Expiry Date :</strong> {{ licence.expiry_date }}</p>
      <p><strong>Ip address :</strong> {{ licence.ip }}</p>
    </div>
    <div class="licence_status">
      <p :class="{ valid: isValid }" @click="changeStatus">
        {{ licence.status }}
      </p>
    </div>
  </div>
  <div class="licence_card_buttons">
    <div class="edit">
      <router-link :to="{ name: 'editLicence', params: { id: licence.id } }">
        <span class="material-icons-outlined">edit</span>
      </router-link>
    </div>
    <div class="delete" @click="deleteLicence">
      <span class="material-icons-outlined">delete</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["licence"],
  emits: ["deleteLicence", "changeLicenceStatus"],
  data() {
    return {
      isValid: this.licence.status === "valid",
      newStatus: "",
    };
  },
  methods: {
    deleteLicence() {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You will not be able to recover this licence!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, keep it",
        })
        .then((result) => {
          if (result.isConfirmed) {
            fetch(
              "http://localhost:8080/licence_api/api/licence/deleteLicence.php",
              {
                method: "DELETE",
                body: JSON.stringify({
                  id: this.licence.id,
                }),
              }
            )
              .then((res) => {
                this.$emit("deleteLicence", this.licence.id);
              })
              .catch((err) => console.log(err));

            this.$swal.fire(
              "Deleted!",
              "Your imaginary licence has been deleted.",
              "success"
            );
          } else if (result.dismiss === this.$swal.DismissReason.cancel) {
            this.$swal.fire(
              "Cancelled",
              "Your licence is not deleted  :)",
              "error"
            );
          }
        });
    },
    changeStatus() {
      if (this.licence.status === "valid") {
        this.newStatus = "invalid";
      } else {
        this.newStatus = "valid";
      }
      var newlicence = {
        id: this.licence.id,
        key: this.licence.key,
        expiry_date: this.licence.expiry_date,
        ip_address: this.licence.ip ? this.licence.ip : "",
        status: this.newStatus,
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
          if (this.newStatus === "valid") {
            this.isValid = true;
          } else {
            this.isValid = false;
          }
          this.$emit("changeLicenceStatus", {
            id: this.licence.id,
            newStatus: this.newStatus,
          });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
.card_body {
  width: 95%;
  line-height: 0.8em;
  display: flex;
  flex-direction: row;
}
.data {
  width: 70%;
  text-align: left;
  padding-left: 20px;
}
.data p {
  background: whitesmoke;
  padding: 10px 10px;
  border-radius: 8px;
}
.data p:hover {
  background: var(--faded_orange_color);
  color: white;
}
.data strong {
  color: var(--main_orange_color);
}
.licence_status {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-weight: bold;
}
.licence_status p:hover {
  cursor: pointer;
}
.licence_status p {
  background: #eee;
  padding: 20px 30px;
  border-radius: 8px;
  color: red;
}
.valid {
  color: green !important;
}
.licence_card_buttons {
  width: 5%;
  padding: 0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.licence_card_buttons div {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
  width: 100%;
  margin: 1px;
  border-radius: 0 5px 5px 5px;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1) 300ms all;
}
.licence_card_buttons div:hover , .edit a:hover{
  background: var(--main_orange_color);
  color: var(--main_white_color);
  cursor: pointer;
}
.edit a
{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color:#2c3e50;
}

</style>
