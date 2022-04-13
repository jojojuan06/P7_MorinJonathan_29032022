import { createStore } from 'vuex'

//importation de axios pour faire les requetes
import axios from '../axios';



export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {  //similaire a la proprieter methods
    //recuperation du commit (invoquer une mutation avec  2params) nom a la creation du compte et 2e param le payload user info que l'on recupere
    createNewAccount: ({commit}, userInfos) => {
      commit;  
      //requete Post enregistrer l'utilisateur
      axios.post('/auth/signup', userInfos) 
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  modules: {
  }
})
