//importe le package axios
import axios from 'axios';

//creation de l'intance par default d'axios
const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: { "Content-Type": "application/json" ,
        "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImFkbWluIjp0cnVlLCJpYXQiOjE2NDk4NTIyNjYsImV4cCI6MTY0OTkzODY2Nn0.PfVZS4uBelZaRCpwv9cwmxyIdntaS9NW0w5iVivgLgM"
            }
    });

//permet l'exportation du fichier    
export default instance;
