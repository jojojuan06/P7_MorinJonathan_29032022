//importe le package axios
import axios from 'axios';

//creation de l'intance par default d'axios (permet de faire la liaison entre le back et le front)
const instance = axios.create({ baseURL: 'http://localhost:3000/api/'});

//permet l'exportation du fichier    
export default instance;
