<template>
    <v-container class="--container">
        <h1 class="--title">{{ msg }}</h1>   
        <v-card>
            <v-card-text class="--subtitle" v-if="mode=='create'">
                <strong>Bienvenue sur le site je vous invite a vous s'inscrire</strong> 
            </v-card-text>
            <v-card-title>
                <!-- affichage vrai en mode login sinon inscription -->
                <h1 v-if="mode == 'login'">Connexion</h1>
                <h1 v-else>Inscription</h1>   
            </v-card-title>
            <v-card-text v-if="mode == 'login'">
                Tu as deja un compte ?
                <v-btn  class="btn--first" v-on:click="switchToCreateAccount">Crée un compte</v-btn>   <!--href="#" target="_blank" -->
            </v-card-text>
            <v-card-text v-else>
                Tu n'as pas encore de compte ?
                <v-btn  class="btn--first" v-on:click="switchToLogin">Se connecter</v-btn>   
            </v-card-text>
            <FormHome/>
        </v-card>
    </v-container>
</template>
<script>

// mélange les getters en calcul avec l'opérateur de propagation d'objet
import { mapState } from 'vuex'
//import component
import  FormHome from '../components/FormHome.vue'


export default { 
    name:'Login',
    components:{
    FormHome,
},
    data() {
        return {
                valid:true,
                nameRules: [ //v=>value
                v => v != '' || 'Le Nom est requis',
                v => (v && v.length <= 10) || 'le nom ne doit pas dépasser 10 caractères',
                v => v.length >= 3 || 'Minimum 3 caractères',
                ],
                emailRules: [
                v => v != '' || 'Un E-mail est requis',
                v => /.+@.+\..+/.test(v) || `E-mail n'est pas valid`,
                ],
                passwordRules: [
                v => v != '' || 'Le password est requis',
                v => (v && v.length <= 14) || 'le password ne doit pas dépasser 14 caractères',
                v => v.length >= 3 || 'Minimum 3 caractères',
                v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Le mot de passe doit contenir au moins une lettre minuscule, un chiffre, un caractère spécial et une lettre majuscule'
                ],
                mode: 'login',  //etat login
                form : {
                    name: "",
                    firstname: "",
                    password: "",
                    email:""
                }
            }
        },
    //moment ou la vue et afficher    
    mounted() {
        //si l'utilisateur n'est pas null, donc connecter donc on retourne sur le profile
        if(this.$store.state.user.userId) {
            this.$router.push({path: '/posts'}) 
            return;    
        } 
    },    
    props: { //Props  est un attribut que vous pouvez définir au niveau du composant qui sera transmis directement au template
        msg: {
            type: String,
        default:'Bonjour Groupomania', // ou require true
        }
    },
    computed: {
            //importation de l'objet depuis state
            ...mapState(['status']) 
        },
    methods: { 
        //function pour different etat sur l'affichage des buttons
        switchToCreateAccount() {    // <------: function()
            this.mode = 'create';
        },
        switchToLogin() {                      
            this.mode = 'login';
        },
        loginAccount(){
            //sous element pas acces au this je renome une variabale pour appeler en dessous
            const This = this; 
            //ref fait reference au ref de l'element du dom pour lier
            //validate verifie les rules avant validation du formulaire res =>resultat
            this.$refs.form.validate().then(res => {
                let valid = res.valid;
                valid = false;
                console.log("info--> 01",valid);
                if(res.valid) {
                    valid = true;  
                    console.log("info--> 02",valid);  
                    //un terme spécial pour invoquer les mutations depuis le store - actions (dispatch) asynchrone  
                    //précédées du signe dollar afin de garantir que ces méthodes sont bien utilisées comme prévu
                    this.$store.dispatch('loginAccount',{
                            email:this.form.email,
                            password:this.form.password
                        }).then(function (){
                            //accès à l'instance du routeur en tant que $router
                            //redirection vers la route apres login
                            This.$router.push({path: '/profile'}); 
                        }).catch(error => (console.log(error))) 
                }else {
                    console.error(res);
                }
            })        
        },                                                
        createNewAccount(){ 
            //sous element pas acces au this je renome une variabale pour appeler en dessous
            const This = this; 
            //contenue du formulaire
            const body = {
                email:this.form.email,
                name:this.form.name,
                firstname:this.form.firstname,
                password:this.form.password
            }; 
            //ref fait reference au ref de l'element du dom pour lier
            //validate verifie les rules avant validation du formulaire res =>resultat
            this.$refs.form.validate().then(res => {
                    let valid = res.valid;
                    valid = false;
                    console.log("info-->01",valid);
                    if(res.valid) {
                            valid = true;
                            console.log("info-->02",valid);
                            //dispatch asyncrone appelle les action
                            this.$store.dispatch('createNewAccount', body).then(() => {
                                this.loginAccount();
                                //redirection vers la route apres creation d'un compte (path en argument)
                                This.$router.push({path: '/'})
                            }).catch(error => {console.log(error)}); 
                    } else {
                    console.error(res);
                }  
            })
        }
    },
}
</script>
<style scoped>
@import url('../style/home.css');
</style>
