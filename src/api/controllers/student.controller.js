const conn = require('../../config/db.connection')
const getAllStudent = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const query = 'select * from student limit ? offset ?';
    const params = [limit, offset];
    conn.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        const countQuery = 'select count(*) as total from student';
        conn.query(countQuery, (err, countResult) => {
            if (err) {
                return res.status(500).json({error: err.message});
            }
            const total = countResult[0].total;
            const totalPages = Math.ceil(total / limit);
            res.json({
                data: results || [],
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    totalRecords: total,
                    pageSize: limit,
                    offset: offset
                },
            });
        });
    });
};

const getStudentByNim = (req, res) => {
    const nim = parseInt(req.params.nim) || 0;
    const query = 'select * from student where nim = ?';
    const params = [nim];
    conn.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json({
            data: results || [],
        });
    });
};

const patchStudent = (req, res) => {
    const nim = req.params.nim;
    const body = req.body;
    const updateQuery = "update student set ? where nim = ?";
    conn.query(updateQuery, [body, nim], (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({message: "Mahasiswa tidak ditemukan"});
        }

        res.status(200).json({message: "Data mahasiswa berhasil diperbaharui"});
    });
}

const addStudent = (req, res) => {
    const body = req.body;
    const {
        nim,
        name,
        departement,
        sex,
        address
    } = body
    const updateQuery = "insert into student (nim, name, departement, sex, address) values (?,?,?,?,?)";
    const param = [nim, name, departement, sex, address]
    conn.query(updateQuery, param, (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({message: "Mahasiswa tidak ditemukan"});
        }
        res.status(200).json({message: "Data mahasiswa berhasil ditambah"});
    });
}

const deleteStudent = (req, res) => {
    const nim = req.params.nim;
    const deleteQuery = "delete from student where nim = ?";
    const param = [nim]
    conn.query(deleteQuery, param, (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({message: "Mahasiswa tidak ditemukan"});
        }

        res.status(200).json({message: "Data mahasiswa berhasil dihapus"});
    });
};

exports.getAllStudent = getAllStudent
exports.getStudentByNim = getStudentByNim
exports.patchStudent = patchStudent
exports.addStudent = addStudent
exports.deleteStudent = deleteStudent