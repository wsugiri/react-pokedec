import axios from 'axios';

const app = {};
const baseUrl = 'https://pokeapi.co/api/v2'

app.getDetail = async (id) => {
    const url = `${baseUrl}/pokemon/${id}`;
    const { data: resp } = await axios.get(url);
    return resp;
}

export default app;