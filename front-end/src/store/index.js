//import function pour crée un store
import { createStore } from 'vuex'
//importation de axios pour faire les requetes
import axios from '../axios';
// create a new instance store
export default createStore({
  //data global (status vide)gestion des données dans le store  
  state: {
    //recupere les users
    users: [],
    //recuperation des posts
    posts : [],
    //message succes / alert 
    message:'',
    // contiendra le payload 
    status: '',  
    //user charger depuis le localstorage
    //contient les infos envoyer de puis la reponse du controller login (userid,token,admin)
    user: JSON.parse(localStorage.getItem('user')) || {}, 
    // objet userinfo avec l'objet a recuperer
    userInfos: {
      id:-1,
      name: '',
      firstname: '',
      email:'',
      profile_img:'',
      admin:''
    },  
  },
  //getters sont destinés à être utilisés comme des propriétés calculées (retourne une valeur)
  getters: {
    
  },
  //mettre à jour / changer d'etat nos données dans Vuex  params le state et 2 payload
  //permet de de changer d'etat (le state)
  mutations: { 
    //nommage en MAJ par convention
    SETSTATUS(state , data) {   
      state.status = data.status;
      state.message = data.message;
    },
    lOGUSER(state, user) {
      //recuperation des infos utilisateur a la connections
      state.userInfos = user
      //passez le token dans authorization
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`; 
      //stocker le user dans le storage local
      //stringify pour enr dans le storage
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    //creation mutations userinfo
    USERINFOS(state, userInfos) {
      state.userInfos = userInfos;
    },
    //afficher les posts
    DISPLAYPOSTS(state, posts) {
      state.posts = posts;
    },
    //afficher les users
    DISPLAY_USERS(state, users) {
      state.users = users;
    },
    //LOGOUT  qui prend user  par default non conecter
    LOGOUT(state) {
      state.user = {}
      state.userInfos = {id: -1}
      //supprimer les ressource (user) , ainsi eviter la reconection
      localStorage.removeItem('user'); 
    },
  },
  //similaire a la proprieter methods (asynchrone pour communiquer avec l'api/acceder a l'etat)
  actions: {  
    //recuperation du commit (invoquer une mutation avec  2params) user info que l'on recupere
    createNewAccount: ({commit}, userInfos) => {
      //création d'un nouvelle promess
      return new Promise((resolve, reject) => {
        //Pour invoquer un gestionnaire de mutation, on commit , Payload en 2e argument 
        commit('SETSTATUS' , {status:'loading',message:''}); 
        //requete Post enregistrer l'utilisateur
        axios.post('/auth/signup', userInfos) 
        .then(function (response) {
          //rajouter un delai
          setTimeout(() => { 
            resolve(response); //resolved (promesse résolue )
          },1000 ) //delai en deuxieme argument 1000ms
          //si tout se pass bien
        })
        .catch(function (error) {
          commit('SETSTATUS' , {status:'error',message:`Désolé impossible de crée le compte mail deja utilisé !`}); //type et payload
          //retourne une erreur
          reject(error); //rejected (rompue) : l'opération a échoué.
        });
      });
    },
    //modifier le profile
    updateProfile: ({commit}, {userId,token}) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; //recupere le token
      //associer une action ultérieure à une promesse lorsque celle-ci devient acquittée 
      return new Promise((resolve, reject) => {
        //Pour invoquer   commit  mutation / Payload en 2e argument 
        commit('SETSTATUS' , {status:'loading',message:''}); 
        //requete Post enregistrer l'utilisateur
        axios.update(`/auth/${userId}`) 
        .then(function (response) {
          //rajouter un delai
          setTimeout(() => { 
            commit('SETSTATUS' , {status:'success',message:'Felicitation votre compte est mis a jour'}); //type et payload
            resolve(response); //resolved (promesse résolue )
          },1000 ) //delai en deuxieme argument 1000ms
          //si tout dse pass bien
        })
        .catch(function (error) {
          commit('SETSTATUS' , {status:'error',message:`Désolé impossible de crée le compte !`}); //type et payload
          //retourne une erreur
          reject(error); //rejected (rompue) : l'opération a échoué.
        });
      });
    },
    //suppression d'un profile
    deleteProfile:({commit},{userId,token}) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; //recupere le token
      axios.delete(`/auth/${userId}`)
      // attendre la reponse (comme fetch)
      .then(response => {
        commit('SETSTATUS' , {status:'success' , message: response.data.message});    
      }) //retourne la repose des data dans l'objet vi
      .catch(error => { 
        console.log(error); 
        commit('SETSTATUS' , {status:'error',message:`Nous faisons face à cette erreur ${error}`});
      });
    },
    //recuperation du commit (invoquer une mutation avec  2params)
    loginAccount: ({commit}, userInfos) => {
      //Pour invoquer   commit  mutation / Payload en 2e argument
      commit('SETSTATUS' , {status:'loading',message:''});
      //associer une action ultérieure à une promesse lorsque celle-ci devient acquittée 
      return new Promise((resolve, reject) => {
        //requete Post enregistrer l'utilisateur
        axios.post('/auth/login', userInfos) 
        .then(function (response) {
          //rajouter un delai
          setTimeout(() => { 
            //invoquer la mutation (commit)
            commit('SETSTATUS' , {status:'success',message:'Connexion reussie'});
          },500 ) //delai en deuxieme argument 500ms
          // commit pour stocker notre user  
          commit('lOGUSER', response.data) // deuxieme argument on recupere les data
          //si tout se pass bien
          resolve(response); //resolved (promesse résolue ) 
        })
        .catch(function (error) {
          commit('SETSTATUS' , {status:'error',message: error.response.data.error}); //type et payload
          //retourne une erreur
          reject(error); //rejected (rompue) : l'opération a échoué.
        });
      }); 
    },
    //recupere les info de l'utilisateur connecter
    getUserInfos: ({commit}, userId) => { //2eme argu userId dee la req
      axios.get(`/auth/${userId}`) //ajoute id a l'auth
      .then(function (response) { 
        //type et payload (recupere les info utilisateur)  
        commit('USERINFOS' , response.data); 
      })
      .catch(error => { 
        console.log(error); 
        commit('SETSTATUS' , {status:'error',message:`Nous faisons face à cette erreur ${error}`});
      });
    },
    //afficher tout les utilisateur
    getAllUser: ({commit}) => { //2eme argu userId dee la req
      axios.get(`/auth`) //ajoute id a l'auth
      .then(function (response) { 
        //type et payload (recupere les info utilisateur)  
        commit('DISPLAY_USERS' , response.data); 
      })
      .catch(error => { 
        console.log(error); 
        commit('SETSTATUS' , {status:'error',message:`Nous faisons face à cette erreur ${error}`});
      });
    },
    //afficher tout les posts
    getPosts:({commit, state}) => {
      axios.get('/post')
      // attendre la reponse (comme fetch)
      .then(response => {
        // mettre en ordre en fonction de leur id
        response.data.sort((a,b) => {
          // faire un calcul pour definir l'ordre du tableaux en function de leur id  
          //mettre le tableaux dans l'ordre selon id  1 2 3..ect 
          return a.id - b.id
        })
        response.data.forEach(post => {
          //par default liked false
          post.liked = false;
          post.Likes.forEach(like => {
            //pour chaque post on boucle dans les like pour voir si l'utilisateur a like les post
            if (like.userId == state.user.userId) {
              post.liked = true
            } 
          })
        });
        commit('DISPLAYPOSTS' , response.data.reverse());//inverse l'ordre (rendu descroissant)   
      }) //retourne la repose des data dans l'objet vi
      .catch(error => { 
        console.log(error); 
        commit('SETSTATUS' , {status:'error',message:`Nous faisons face à cette erreur ${error}`});
      });
    },
    createPost: ({commit}, posts) => {
      //création d'un nouvelle promess
      //associer une action ultérieure à une promesse lorsque celle-ci devient acquittée 
      return new Promise((resolve, reject) => {
        //Pour invoquer   commit  mutation / Payload en 2e argument
        commit('SETSTATUS' , {status:'loading',message:''}); 
        //envoi du formulaire en formdata (pour l'image)
        let form = new FormData()
        form.append("title", posts.title)
        form.append("content", posts.content)
        if (posts.image[0]) {
          form.append("image", posts.image[0])
        } else {
          //retire l'image (permet de retirer une propriété d'un objet)
          delete posts.image
          form = posts
        } 
        //requete Post enregistrer l'utilisateur
        axios.post('/post', form) 
        .then(function (response) {
          //rajouter un delai
          setTimeout(() => { 
            commit('SETSTATUS' , {status:'success',message:'Felicitation votre post est crée'}); //type et payload
            resolve(response); //resolved (promesse résolue )
          },1000 ) //delai en deuxieme argument 1000ms
          //si tout dse pass bien 
        })
        .catch(function (error) {
          commit('SETSTATUS' , {status:'error',message:`Désolé impossible de crée le post ! ${error.response.data.message ? error.response.data.message : error.response.data}`}); //type et payload
          //retourne une erreur
          //rejected (rompue) : l'opération a échoué.
          reject(error); 
        });
      });
    },
    //mettre a jour un post
    updatePost:({commit, state}, {postId,updatedPost}) => {
      //recherche un element dans un tableau poste qui correspond a sont id
      let oldPost = state.posts.find((post) => post.id == postId);
      let changePost = Object.assign({...oldPost},updatedPost);
      //envoi du formulaire en formdata (pour l'image)
      let form = new FormData()
      form.append("image", changePost.image)
      form.append("title", changePost.title)
      form.append("content", changePost.content)
      //retourne une reponse
      return axios.put(`/post/${postId}`,form)
      // attendre la reponse (comme fetch)
      .then(response => {
        // recupere las res du update post 
        // met a jour l'ancien post avec le contenue de la reponse 
        let post = response.data.post
        oldPost.title = post.title
        oldPost.content = post.content
        oldPost.image = post.image
        commit('SETSTATUS' , {status:'success' , message: response.data.message});    
      }) 
      .catch(error => { 
        console.log(error); 
        commit('SETSTATUS' , {status:'error',message:`Nous faisons face à cette erreur ${error.response.data.message}`});
      });
    },
    //delete un post
    deletePost:({commit, state},{postId}) => {
      //recupere le token directement depuis le  user destructuring
      const {token} = state.user
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; //recupere le token
      axios.delete(`/post/${postId}`)
      // attendre la reponse (comme fetch)
      .then(response => {
        commit('SETSTATUS' , {status:'success' , message: response.data.message});    
      }) //retourne la repose des data dans l'objet 
      .catch(error => { 
        console.log(error); 
        commit('SETSTATUS' , {status:'error',message:`Nous faisons face à cette erreur ${error}`});
      });
    },
    //creation commentaire
    createComment: ({commit, dispatch}, {postId, content}) => {
      //créeation d'un nouvelle promess
      //associer une action ultérieure à une promesse lorsque celle-ci devient acquittée 
      return new Promise((resolve, reject) => {
        //Pour invoquer   commit  mutation / Payload en 2e argument
        commit('SETSTATUS' , {status:'loading',message:''}); 
        //requete Post enregistrer l'utilisateur
        //envoi l'objet content
        axios.post(`/comment/${postId}`, {content}) 
        .then(function (response) {
          //si tout se pass bien
          commit('SETSTATUS' , {status:'success' , message: response.data.message});
          //refresh la page
          dispatch('getPosts') 
        })
        .catch(function (error) {
          commit('SETSTATUS' , {status:'error',message: error.response.data.message }); // payload
          //retourne une erreur
          reject(error); //rejected (rompue) : l'opération a échoué.
        });
      });
    },
    //delete un commentaire
    deleteComment:({commit,state,dispatch},postId) => {
      //recupere le token directement depuis le  user destructuring
      const {token} = state.user
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; //recupere le token
      axios.delete(`/comment/${postId}`)
      // attendre la reponse (comme fetch)
      .then(response => {
        commit('SETSTATUS' , {status:'success' , message: response.data.message}); 
        //refresh la page
        dispatch('getPosts')   
      }) //retourne la repose des data dans l'objet 
      .catch(error => { 
        console.log(error); 
        commit('SETSTATUS' , {status:'error',message:`Nous faisons face à cette erreur ${error}`});
      });
    },
    //ajout d'un like
    postLike: ({commit, dispatch }, postId) => {
      //créeation d'un nouvelle promess
      return new Promise((resolve, reject) => {
       //Pour invoquer   commit  mutation / Payload en 2e argument 
        commit('SETSTATUS' , {status:'loading',message:''}); 
        //requete Post enregistrer l'utilisateur
        axios.post(`/like/${postId}`) 
        .then(function (response) {
          commit('SETSTATUS' , {status:'success' , message: response.data.message}); 
          //refresh la page
          dispatch('getPosts')
          resolve(response); //resolved (promesse résolue )
          //si tout dse pass bien
        })
        .catch(function (error) {
          commit('SETSTATUS' , {status:'error',message:`impossible de liké ! ${error}`}); //type et payload
          //retourne une erreur
          reject(error); //rejected (rompue) : l'opération a échoué.
        });
      });
    },
    //supprimer un like
    deleteLike:({commit,dispatch},postId) => {
      axios.delete(`/like/${postId}`)
      // attendre la reponse (comme fetch)
      .then(response => {
        commit('SETSTATUS' , {status:'success' , message: response.data.message});
        //refresh la page
        dispatch('getPosts')    
      }) 
      .catch(error => { 
        console.log(error); 
        commit('SETSTATUS' , {status:'error',message: error.message});
      });
    }  
  },  
  modules: {
  }
})
