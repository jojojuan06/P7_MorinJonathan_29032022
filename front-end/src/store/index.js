import { createStore } from 'vuex'

//importation de axios pour faire les requetes
import axios from '../axios';



export default createStore({
  state: {
    //data global (status vide)
    status: '',  // contiendra le payload 
    user: {
      userId: -1,
      token:'',
    },
    // objet userinfo avec l'objet a recuperer
    userInfos: {
      name: '',
      firstname: '',
      email:'',
      profile_Img:''
    }
  },
  getters: {
  },
  //mettre à jour et modifier nos données dans Vuex avec les mutations en paramettre le state et 2 payload
  mutations: {
    //------> : function()
    setStatus(state , status) {   
        state.status = status;
      },
    logUser(state, user) {
    // Important : Si axios est utilisé avec plusieurs domaines, le AUTH_TOKEN sera envoyé à tous.
    // Voir ci-dessous pour un exemple utilisant les valeurs par défaut de l'instance personnalisée à la place.
    axios.defaults.headers.common['Authorization'] = user.token;
        state.user = user;
    },
    //creation mutations userinfo
    userInfos(state, userInfos) {
      state.userInfos = userInfos;
    }   
  },
  //similaire a la proprieter methods (asynchrone pour communiquer avec l'api/acceder a l'etat)
  actions: {  
    //recuperation du commit (invoquer une mutation avec  2params) nom a la creation du compte et 2e param le payload user info que l'on recupere
    createNewAccount: ({commit}, userInfos) => {
      //créeation d'un nouvelle promess
      //associer une action ultérieure à une promesse lorsque celle-ci devient acquittée 
      return new Promise((resolve, reject) => {
        //Pour invoquer un gestionnaire de mutation, vous devez appeler store.commitavec son type en un et Valider avec Payload en 2e argument 
        commit('setStatus' , 'loading'); 
        //requete Post enregistrer l'utilisateur
        axios.post('/auth/signup', userInfos) 
        .then(function (response) {
        //rajouter un delai
        setTimeout(() => { 
        commit('setStatus' , 'created'); //type et payload
        },2000 ) //delai en deuxieme argument 2000ms
        //si tout dse pass bien
        resolve(response); //resolved (promesse résolue ) 
        })
        .catch(function (error) {
        commit('setStatus' , 'error_create'); //type et payload
        //retourne une erreur
        reject(error); //rejected (rompue) : l'opération a échoué.
        });
      });
    },
    //recuperation du commit (invoquer une mutation avec  2params)
    loginAccount: ({commit}, userInfos) => {
    //Pour invoquer un gestionnaire de mutation, vous devez appeler store.commitavec son type en un et Valider avec Payload en 2e argument 
      commit('setStatus' , 'loading');
      //créeation d'un nouvelle promess
      //associer une action ultérieure à une promesse lorsque celle-ci devient acquittée 
      return new Promise((resolve, reject) => {
        //requete Post enregistrer l'utilisateur
        axios.post('/auth/login', userInfos) 
        .then(function (response) {
          //rajouter un delai
          setTimeout(() => { 
          //invoquer la mutation (commit)
            commit('setStatus' , '')
          },500 ) //delai en deuxieme argument 500ms
          // commit pour stocker notre user
          commit('logUser', response.data) // deuxieme argument on recupere les data
          //si tout se pass bien
          resolve(response); //resolved (promesse résolue ) 
        })
        .catch(function (error) {
          commit('setStatus' , 'error_login'); //type et payload
          //retourne une erreur
          reject(error); //rejected (rompue) : l'opération a échoué.
        });
      }); 
    },
    getUserInfos: ({commit}, userId) => { //2eme argu userId dee la req
          axios.get(`/auth/${userId}`) //ajoute id a l'auth
        .then(function (response) { 
        //type et payload (recupere les info utilisateur)  
        commit('userInfos' , response.data); 
        })
        .catch(function (error) {
        });
    }
  },
  modules: {
  }
})
