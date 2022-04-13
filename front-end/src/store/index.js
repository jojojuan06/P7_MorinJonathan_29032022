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
      //créeation d'un nouvelle promess
      //associer une action ultérieure à une promesse lorsque celle-ci devient acquittée 
      return new Promise((resolve, reject) => {
        commit;  
        //requete Post enregistrer l'utilisateur
        axios.post('/auth/signup', userInfos) 
        .then(function (response) {
        //si tout dse pass bien
        resolve(response); //resolved (promesse résolue ) 
        })
        .catch(function (error) {
        //retourne une erreur
        reject(error); //rejected (rompue) : l'opération a échoué.
        });
      });
    },
    //recuperation du commit (invoquer une mutation avec  2params)
    loginAccount: ({commit}, userInfos) => {
      //créeation d'un nouvelle promess
      //associer une action ultérieure à une promesse lorsque celle-ci devient acquittée 
      return new Promise((resolve, reject) => {
        commit;
        //requete Post enregistrer l'utilisateur
        axios.post('/auth/login', userInfos) 
        .then(function (response) {
          //si tout dse pass bien
          resolve(response); //resolved (promesse résolue ) 
        })
        .catch(function (error) {
          //retourne une erreur
          reject(error); //rejected (rompue) : l'opération a échoué.
        });
      }); 
    },
  },
  modules: {
  }
})
