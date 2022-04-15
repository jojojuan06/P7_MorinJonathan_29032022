import { createStore } from 'vuex'

//importation de axios pour faire les requetes
import axios from '../axios';

//recuperer le user dans le storage local
let user = localStorage.getItem('user');
//si le user est vide il est agale  cette condition
if (!user) {
  user = {
    userId: -1,
    token:'',
  };
} else {
  //verification des different erreur
  try {
  //sinon l'utilisateur exist on le parse pour recuperer l'user (l'ojet user)
  //car le local storage coutient un string
    user = JSON.parse(user);
  // quand ont recuper le user on definit le header de l'autorisation  pour utiliser le token
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
  }catch(error){
  // en cas d'ereur on definit sa valeur initial  
    user = {
      userId: -1,
      token:'',
    };
  }
}
// create a new instance store
export default createStore({
//state responsable de la gestion des données dans le store  
  state: {
    //data global (status vide)
    status: '',  // contiendra le payload 
    user: user, //user charger depuis le localstorage
    // objet userinfo avec l'objet a recuperer
    userInfos: {
      name: '',
      firstname: '',
      email:'',
      profile_img:''
    },
    posts : []  // recuperation des posts
  },
  //getters sont destinés à être utilisés comme des propriétés calculées
  getters: {
  },
  //mettre à jour (changer d'etat)et modifier nos données dans Vuex avec les mutations en paramettre le state et 2 payload
  mutations: {
    //------> : function()
    setStatus(state , status) {   
        state.status = status;
      },
    logUser(state, user) {
    // Important : Si axios est utilisé avec plusieurs domaines, le AUTH_TOKEN sera envoyé à tous.
    // Voir ci-dessous pour un exemple utilisant les valeurs par défaut de l'instance personnalisée à la place.
    // dit  a axios que l'autorisation c'est bearer espace le token , une fois l'utilisateur loger
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`; //recupere le token
    //stocker le user dans le storage local
    //stringify pour enr dans le storage
    localStorage.setItem('user', JSON.stringify(user));   
    state.user = user;
    },
    //creation mutations userinfo
    userInfos(state, userInfos) {
      state.userInfos = userInfos;
    },
    //afficher les post
    displayPosts(state, posts) {
      state.posts = posts;
    }, 
    //logout  qui prend user  par default non conecter
    logout(state) {
        state.user = {
          userId: -1,
          token: ''
      }
     //supprimer les ressource (user) , aisin eviter la reconection
     localStorage.removeItem('user'); 
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
    },
    getPosts:({commit}) => {
      axios.get('/post')
      // attendre la reponse (comme fetch)
      .then(response => {
        commit('displayPosts' , response.data);    
      }) //retourne la repose des data dans l'objet vi
      .catch(error => console.log(error));
    }  
  },  
  modules: {
  }
})
