<template>
    <navFilter @filterChange="this.current_filter = $event" :filter="this.current_filter"/>
    <div v-if="licences.length" class="licences_container">
      <div v-for="licence in filteredLicences" :key = "licence.id" class="licence_card">
        <singleLicence :licence="licence" @deleteLicence="handelDelete" @changeLicenceStatus="handleChangeStatus"/>
      </div>  
    </div>
</template>

<script>
import axios from "axios";
import singleLicence from "../components/singleLicence.vue"
import navFilter from "../components/navFilter.vue"
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
    singleLicence,
    navFilter
  },
  data(){
    return  {
      licences : [],
      message : "",
      current_filter : "all"
    }
  },
  methods:{
      handelDelete (id)
      {
        this.licences = this.licences.filter((licence) => {
          return licence.id !== id ;
        })
      },
      handleChangeStatus (data)
      {
        let selectedLicence = this.licences.find((licence) => {
          return licence.id === data.id
        })
        selectedLicence.status = data.newStatus
      }
  },
  mounted(){
    axios.get("http://localhost/licence_api/api/licence/getLicences.php")
    .then((res) => {

      this.licences = res.data.data;
      this.message = res.data.message;

    })
    .catch((err) => console.log(err));
  },
  computed:{
    filteredLicences () {
      if(this.current_filter === "yes")
      {
        return this.licences.filter((licence) => {
          return licence.status == "valid";
        })
      }
      else if (this.current_filter === "no")
      {
       return this.licences.filter((licence) => {
          return licence.status === "invalid";
        })
      }else
      {
        return this.licences
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700;900&family=Tajawal:wght@300;400;700;900&display=swap');


h1
{
    margin: 10px;
    color: var(--main_orange_color);
    font-weight: bold;
}
.licences_container
{
    display: flex;
    padding: 20px;
    width: 80vw;
    margin: 0 auto ;
    align-items: center;
    flex-direction: column;
}
.licence_card
{
    background: white;
    width: 95%;
    padding: 15px;
    border-radius: 8px;
    display: flex;
    margin: 8px auto ;

}
</style>
