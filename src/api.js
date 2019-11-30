import io from 'socket.io-client';

const socket = io('https://noun-game-server.now.sh/');

export default socket;