//importe le package axios
import axios from 'axios';

//creation de l'intance par default d'axios
const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: { "Content-Type": "application/json" , 
            "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImFkbWluIjp0cnVlLCJpYXQiOjE2NDk3NjU2MDMsImV4cCI6MTY0OTg1MjAwM30.YiNNN12GlQo46kg90vQf7zWxSi9SCNX5VsZxA2F6TO8"
            }
    });

//permet l'exportation du fichier    
export default instance;
