const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/run-script', (req, res) => {
    const venvPath = path.join(__dirname, 'venv', 'bin', 'activate');
    const scriptPath = path.join(__dirname, 'script.py');

    const command = `bash -c "source ${venvPath} && python ${scriptPath}"`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send(error.message);
        }

        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).send(stderr);
        }

        console.log(`Stdout: ${stdout}`);
        res.send(stdout);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
