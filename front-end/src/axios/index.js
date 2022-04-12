//importe le package axios
import axios from 'axios';

//creation de l'intance par default d'axios
const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: { "Content-Type": "application/json" , 
            "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImFkbWluIjp0cnVlLCJpYXQiOjE2NDk3NTY5NzMsImV4cCI6MTY0OTg0MzM3M30.a2w48_9A1SFc4dcFJsEzZYNil2ZiW8ZlxmkSMXi6EBY"
            }
    });

//permet l'exportation du fichier    
export default instance;
