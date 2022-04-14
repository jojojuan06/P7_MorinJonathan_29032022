//importe le package axios
import axios from 'axios';

//creation de l'intance par default d'axios
const instance = axios.create({ baseURL: 'http://localhost:3000/api/'});

//permet l'exportation du fichier    
export default instance;
