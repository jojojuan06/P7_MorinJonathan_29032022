//importe le package axios
import axios from 'axios';

//creation de l'intance par default d'axios
const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: { "Content-Type": "application/json" , 
            "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImFkbWluIjp0cnVlLCJpYXQiOjE2NDk2OTcxNDEsImV4cCI6MTY0OTc4MzU0MX0.ARjIVD96Cp6AeHi9l2B_99jD_yX21Y_2KSvNnMh1Clg"
            }
    });

//permet l'exportation du fichier    
export default instance;
