import axios from 'axios';

axios.get('http://localhost:3000/users/1').then(res => console.log(res.data));
