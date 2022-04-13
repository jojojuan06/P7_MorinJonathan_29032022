//importe le package axios
import axios from 'axios';

//creation de l'intance par default d'axios
const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: { "Content-Type": "application/json" ,
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Resource-Policy": "cross-origin",
        'Access-Control-Allow-Credentials':true,
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImFkbWluIjp0cnVlLCJpYXQiOjE2NDk3NjU2MDMsImV4cCI6MTY0OTg1MjAwM30.YiNNN12GlQo46kg90vQf7zWxSi9SCNX5VsZxA2F6TO8"
            }
    });

//permet l'exportation du fichier    
export default instance;
