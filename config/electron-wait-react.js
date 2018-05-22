const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3500;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();
let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
        client.end();
        if(!startedElectron) {
            console.log('Starting Electron NOW');
            startedElectron = true;
            const exec = require('child_process').exec;
            let proc = exec('yarn run electron');
            proc.stdout.on('data', function(data){
              console.log(data)
            })
        }
    }
);

tryConnection();

client.on('error', (error) => {
    setTimeout(tryConnection, 1000);
});
