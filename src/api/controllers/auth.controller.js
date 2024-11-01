const conn = require("../../config/db.connection")
let tempUsername
const login = (req, res) => {
    tempUsername = req.body.username
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }
    const searchData = "SELECT name, role FROM user WHERE username = ? AND password = ?";
    const params = [username, password];
    conn.query(searchData, params, (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        if (results.length === 0) {
            return res.status(401).send('Invalid username or password');
        }
        const insertLog = "INSERT INTO log (username,action) VALUES (?,?)";
        conn.query(insertLog, [username, 'login'], (err) => {
            if (err) {
                return res.status(500).json({error: err.message});
            }
            res.redirect("/student");
        });
    });
};

const getLog = (req, res) => {
    const getLogs = "select username from log where action = ? LIMIT ?";
    conn.query(getLogs, ['login', 1], (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json({
            data: results,
        });
    });
}

const logout = (req, res) => {
    const deleteLogs = "DELETE FROM log";
    conn.query(deleteLogs, (err) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.redirect("/");
    });
};
exports.login = login
exports.getLog = getLog
exports.logout = logout