let currentPage = 1;
let totalRecord = 0;
let limit = 10;
let totalPages = 0;
let offset = 0

async function check() {
    const response = await fetch(`/api/auth/checkAuth`);
    const json = await response.json();
    if (json.data.length === 0) {
        document.location.href = "/"
    }
}

async function getStudent(page) {
    const response = await fetch(`/api/student?page=${page}&limit=${limit}`);
    const json = await response.json();
    if (json.data.length > 0) {
        currentPage = json.pagination.currentPage
        totalRecord = json.pagination.totalRecords
        totalPages = json.pagination.totalPages
        offset = json.pagination.offset
        setDataTable(json.data)
        injectPagination(currentPage, totalPages)
    }
}

check().then(() => {
    getStudent(currentPage).finally()
})

document.getElementById('btn-add-student').addEventListener('click', injectAddModal);

function setDataTable(data) {
    const tableBodyElement = $('#studentTableBody');
    tableBodyElement.empty()
    data.forEach((item, index) => {
        const tr = $('<tr/>');
        tr.append(`<td>${offset + (index + 1)}</td>`);
        tr.append(`<td class="nim">${item.nim}</td>`);
        tr.append(`<td class="name">${item.name}</td>`);
        tr.append(`<td class="departement">${item.departement}</td>`);
        tr.append(`<td class="sex">${item.sex === "m" ? "Pria" : "Wanita"}</td>`);
        tr.append(`<td class="address">${item.address}</td>`);
        tr.append(`
            <td>
                <button type="button" class="btn btn-warning btn-sm" 
                    id="btn-edit" 
                    data-bs-toggle="modal" 
                    data-bs-target="#student-modal"
                    data-nim="${item.nim}" 
                    data-name="${item.name}" 
                    data-departement="${item.departement}" 
                    data-sex="${item.sex}"
                    data-address="${item.address}"
                    onclick="injectModal(this)"
                >
                    Ubah
                </button>
                <button type="button" class="btn btn-danger btn-sm" id="btn-delete" data-nim="${item.nim}" onclick="deleteStudent(this)">
                    Hapus
                </button>
            </td>
        `);

        tableBodyElement.append(tr)
    })

}

function injectPagination(currentPage, totalPages) {
    const paginationElement = document.getElementById('student-table-pagination');
    paginationElement.innerHTML = '';
    for (let page = 1; page <= totalPages; page++) {
        const activeClass = page === currentPage ? 'active' : '';
        const pageButton = `<li class="page-item ${activeClass}"><a class="page-link" href="#" onclick="getStudent(${page})">${page}</a></li>`;
        paginationElement.innerHTML += pageButton;
    }
}

function injectAddModal() {
    document.getElementById('student-modal-title').innerText = 'Tambah Data Mahasiswa';
    document.getElementById('student-form').reset();
    document.getElementById('edit-nim').value = '';
    document.getElementById('btn-submit-student').innerText = 'Masukan Data';
}

function injectModal(button) {
    const data = {
        nim: button.getAttribute('data-nim'),
        name: button.getAttribute('data-name'),
        departement: button.getAttribute('data-departement'),
        sex: button.getAttribute('data-sex'),
        address: button.getAttribute('data-address')
    };
    document.getElementById('student-modal-title').innerText = 'Ubah Data Mahasiswa';
    document.getElementById('nim').value = data.nim;
    document.getElementById('name').value = data.name;
    document.getElementById('departement').value = data.departement;
    document.getElementById('sex').value = data.sex;
    document.getElementById('address').value = data.address;
    document.getElementById('edit-nim').value = data.nim;
    document.getElementById('btn-submit-student').innerText = 'Masukan Data';
}

function deleteStudent(button) {
    const nim = button.getAttribute('data-nim');
    fetch(`/api/student/${nim}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json()).then((res) => {
        alert(res.message);
    }).catch((error) => {
        alert(error);
    }).finally(()=>{
        window.location.reload()
    })
}

document.getElementById('student-form').addEventListener('submit', function (event) {
    event.preventDefault()
    const nim = document.getElementById('nim').value;
    const name = document.getElementById('name').value;
    const departement = document.getElementById('departement').value;
    const sex = document.getElementById('sex').value;
    const address = document.getElementById('address').value;
    const editNim = document.getElementById('edit-nim').value;
    if (editNim) {
        getSingleStudent(editNim).then(() => {
            const payload = {
                nim: nim,
                name: name,
                departement: departement,
                sex: sex,
                address: address,
            };
            fetch(`/api/student/${editNim}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }).then(response => response.json()).then((res) => {
                alert(res.message);
            }).catch((error) => {
                alert(error);
            }).finally(()=>{
                window.location.reload()
            })
        })
    } else {
        const payload = {
            nim: nim,
            name: name,
            departement: departement,
            sex: sex,
            address: address,
        };
        fetch(`/api/student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then(response => response.json()).then((res) => {
            alert(res.message);
        }).catch((error) => {
            alert(error);
        }).finally(()=>{
            window.location.reload()
        })
    }
    getStudent(1).finally(() => {
        document.querySelector('.btn-close').click();
    })
})

async function getSingleStudent(nim) {
    const response = await fetch(`/api/student/${nim}`);
    const json = await response.json();
    return json.data[0]
}