function update(id){
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8080/api/students/edit/" + id,
        success: function (data) {
            var student = data[0];
            var listStatus = data[1];
            var str = '<h1 style="text-align: center">Sửa học sinh</h1>\n' +
                '  <form style="width: 500px; margin: auto">\n' +
                '    <div class="mb-3">\n' +
                '      <label for="code" class="form-label" >Mã sinh viên</label>\n' +
                '      <label style="font-size: x-small;color: grey">( từ 3 đến 6 ký tự )</label>\n' +
                '      <input type="text" class="form-control" id="code"\n' +
                '             placeholder="Mã" required value="' + student.code +'">\n' +
                '    </div>\n' +
                '    <div class="mb-3">\n' +
                '      <label for="name" class="form-label">Tên Sinh Viên</label>\n' +
                '      <input type="text" class="form-control" id="name"\n' +
                '            placeholder="Tên" required value="' + student.name +'">\n' +
                '    </div>\n' +
                '    <div class="mb-3">\n' +
                '      <label for="age" class="form-label">Tuổi</label>\n' +
                '      <label style="font-size: x-small;color: grey">( từ 18 đến 35 tuổi )</label>\n' +
                '      <input type="number" class="form-control" id="age"\n' +
                '             placeholder="Tuổi" value="' + student.age +'">\n' +
                '    </div>\n' +
                '    <div class="mb-3">\n' +
                '      <label for="gender" class="form-label">Giới Tính</label>\n' +
                '      <select class="form-select" id="gender" >\n' +
                '        <option value="1">Nam</option>\n' +
                '        <option value="2">Nữ</option>\n' +
                '      </select>\n' +
                '    </div>\n' +
                '    <div class="mb-3">\n' +
                '      <label for="address" class="form-label">Địa chỉ</label>\n' +
                '      <input type="text" class="form-control" id="address"\n' +
                '             placeholder="Địa chỉ" value="' + student.address +'">\n' +
                '    </div>\n' +
                '    <div class="mb-3">\n' +
                '      <label for="status" class="form-label">Tình Trạng</label>\n' +
                '      <select class="form-select" id="status">\n'
            for (let i = 0; i < listStatus.length; i++){
                str += '<option value="' + listStatus[i].id + '">'+ listStatus[i].name +'</option>\n'
            }
            str += '</select>\n' +
                '    </div>\n' +
                '    <button class="btn btn-primary" type="submit" onclick="editStudent('+ student.id +')">Sửa</button>\n' +
                '    <button class="btn btn-secondary" type="reset">Xóa toàn bộ</button>\n' +
                '  </form>\n' +
                '  <button class="btn btn-info" onclick="showlist()">Back</button>'
            document.getElementById("show").innerHTML = str;
        }
    })
    event.preventDefault();
}

function editStudent(id){
    var index = id;
    let code = $('#code').val();
    let name = $('#name').val();
    let age = $('#age').val();
    let gender = $('#gender').val();
    let address = $('#address').val();
    let status = $('#status').val();
    let subjectObject = {
        id : index,
        code : code,
        name : name,
        age : age,
        gender : gender,
        address : address,
        status : {
            id : status
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(subjectObject),
        url: "http://localhost:8080/api/students/createP",
        success:  function (){
            alert("Sửa thanh công")
            showlist()
        }
    });
    event.preventDefault();
}

function showlist() {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8080/api/students",
        success: function (data) {
            var str = '<div>\n' +
                '    <svg onclick="findIntegration()" style="margin-left: 10px" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-filter-left" viewBox="0 0 16 16">\n' +
                '    <path onclick="findIntegration()" d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>\n' +
                '</svg>\n' +
                '<label onclick="findIntegration()" style="color: #5e5656">Tìm kiến</label>\n' +
                '</div> '+'<div class="search-box">\n' +
                '    <div class="container text-center">\n' +
                '        <div class="form-group d-inline-block" style="max-width: 150px;">\n' +
                '            <label for="name" class="form-label">Search By Name</label>\n' +
                '            <input required style="width: 100%; text-align: center;" type="text" class="form-control" id="name" name="name">\n' +
                '        </div>\n' +
                '        <button style="vertical-align: middle;" class="btn btn-primary" onclick="searchByName()">Tìm</button>\n' +
                '    </div>\n' +
                '</div>\n' +
                ' <h2 style="text-align: center; margin-top: 10px">Dnh sách</h2>\n' +
                '<table style="margin: 0 auto; border-collapse: collapse; border: 1px; width: 98%" class="table table-hover">\n';
            str += '<button onclick="createForm()" style="margin-left: 10px; margin-top: 30px" class="btn btn-primary">Thêm</button>';
            str += '<a href="http://localhost:63343/btvn22_09/subject/listSubject.html?_ijt=ssfab7flsqpi3s74429872fhu7&_ij_reload=RELOAD_ON_SAVE" style="margin-left: 10px; margin-top: 30px" class="btn btn-primary">D.sách môn học</a>';
            str += '<tr style="margin-top: 500px">\n' +
                '<th>#</th>\n' +
                '<th>Mã sinh viên</th>\n' +
                '<th>Họ Tên</th>\n' +
                '<th>Tuổi</th>\n' +
                '<th>Giới tính</th>\n' +
                '<th>Địa chỉ</th>\n' +
                '<th>Trạng thái</th>\n' +
                '<th>Môn học</th>\n' +
                '<th style=" text-align: center;" colspan="4">Thêm, sửa, xóa thông tin</th>\n' +
                '</tr> ';
            for (let i = 0; i < data.length; i++) {
                str += '<tr>';
                str += ' <td> ' + data[i].id + '</td>\n' +
                    ' <td> ' + data[i].code + '</td>\n' +
                    ' <td> ' + data[i].name + '</td>\n' +
                    ' <td> ' + data[i].age + '</td>\n' +
                    ' <td> ' + data[i].gender + '</td>\n' +
                    ' <td> ' + data[i].address + '</td>\n' +
                    ' <td> ' + data[i].status.name + '</td>\n';
                str += '<td>';
                for (let j = 0; j < data[i].subjects.length; j++) {
                    str += '<div>' + data[i].subjects[j].name + '.' + '</div>';
                }
                str += '</td>';
                str += '<td><button style="font-size: small; width: 100px; height: 45px; " ' +
                    'class="btn btn-primary" onclick="createSubj(' + data[i].id + ')">Thêm môn</button></td>\n' +
                    '<td><button style="font-size: small; width: 100px; height: 45px;" ' +
                    'class="btn btn-warning" onclick="editSubj(' + data[i].id + ')">Sửa môn</button></td>\n' +
                    '<td><button style="font-size: small; width: 100px; height: 45px;" ' +
                    'class="btn btn-danger"" onclick="deleteSubInStudent(' + data[i].id + ')">Xóa môn</button></td>\n' +
                    '<td><button style="font-size: small; width: 100px; height: 45px;" ' +
                    'class="btn btn-warning" onclick="update(' + data[i].id + ')">Sửa t.tin</button></td>\n' +
                    '</tr>\n';
            }
            str += '</table>';
            document.getElementById("show").innerHTML = str;

        }
    });
    event.preventDefault();
}

function deleteSubInStudent(id){
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8080/api/students/editSubj/" + id,
        success: function (data) {
            alert("Chọn môn bạn muốn xóa")
            var str =
                '<div class="mb-3" style="width: 500px; margin: auto">\n' +
                '      <label for="deleteSub" class="form-label">Chọn môn học muốn sửa</label>\n' +
                '      <select class="form-select" id="deleteSub">\n'
            for (let i = 0; i < data.length; i++) {
                str += '<option value="' + data[i].id + '">' + data[i].name + '</option>\n'
            }
            str += '</select>\n' +
                '<td><button style="margin-top: 20px" class="btn btn-warning" ' +
                'onclick="deleteOne(' + id + ')">Chọn</button></td>\n' +
                '<td><button style="margin-top: 20px" class="btn btn-warning" ' +
                'onclick="deleteAll(' + id + ')">Xóa tất cả</button></td>\n' +
                '    </div>\n' +
                '  <button class="btn btn-info" onclick="showlist()">Back</button>'
            document.getElementById("show").innerHTML = str;
        }, error: function () {
            alert("Học viên không có môn học");
        }
    })
    event.preventDefault();
}
function deleteAll(id){
    var userConfirmed  = confirm("Bạn có chắc chắn xóa tất cả không?")
    if (confirm){
        let obj = {
            id : id,
        }
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "DELETE",
            data : JSON.stringify(obj),
            url: "http://localhost:8080/api/students/deleteAllSubjects",
            success: function () {
                alert("xóa thành công")
                showlist()
            } , error: console.log("Đã có lỗi xảy ra")
        })
    }
    event.preventDefault()

}
function deleteOne(id){
    let subj = $('#deleteSub').val()
    var userConfirmed  = confirm("Bạn có chắc chắn muốn xóa")
    if (confirm){
        let obj = {
            id : id,
            subjects : [{
                id : subj
            }]
        }
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data : JSON.stringify(obj),
            url: "http://localhost:8080/api/students/deleteSubjInStudent",
            success: function () {
                alert("xóa thành công")
                showlist()
            } , error: console.log("Đã có lỗi xảy ra")
        })
    }
    event.preventDefault()
}
    function editSubj(id) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "GET",
            url: "http://localhost:8080/api/students/editSubj/" + id,
            success: function (data) {
                alert("Chọn môn bạn muốn sửa")
                var str =
                    '<div class="mb-3" style="width: 500px; margin: auto">\n' +
                    '      <label for="newSubject" class="form-label">Chọn môn học muốn sửa</label>\n' +
                    '      <select class="form-select" id="newSubject">\n'
                for (let i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].id + '">' + data[i].name + '</option>\n'
                }
                str += '</select>\n' +
                    '<td><button style="margin-top: 20px" class="btn btn-warning" ' +
                    'onclick="intermediate(' + id + ')">Chọn</button></td>\n' +
                    '    </div>\n' +
                    '  <button class="btn btn-info" onclick="showlist()">Back</button>'

                document.getElementById("show").innerHTML = str;
            }, error: function () {
                alert("Học viên không có môn học");
            }
        })
        event.preventDefault();
    }

    function intermediate(id) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "GET",
            url: "http://localhost:8080/api/students/getSubj",
            success: function (data) {
                let index = id;
                let oldSubj = $('#newSubject').val();
                alert("Chọn môn học mới")
                var str = '<div class="mb-3"  style="width: 500px; margin: auto">\n' +
                    '      <label for="subject" class="form-label">Chọn môn học mới</label>\n' +
                    '      <select class="form-select" id="subject">\n'
                for (let i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].id + '">' + data[i].name + '</option>\n'
                }
                str += '</select>\n' +
                    '<td><button style="margin-top: 20px" class="btn btn-warning"' +
                    ' onclick="updateSubjPost(' + index + ', ' + oldSubj + ')">Đồng ý</button></td>\n' +
                    '    </div>\n' +
                    '  <button class="btn btn-info" onclick="showlist()">Back</button>'
                document.getElementById("show").innerHTML = str;
            }
        })
        event.preventDefault();
    }
function updateSubjPost(index, oldSubj) {
    let newSubj = $('#subject').val();
    let combinedObj = [
         {
            id: index,
            subjects: [{
                id: oldSubj
            }]
        },
         {
             id: index,
            subjects: [{
                id: newSubj
            }]
        }
    ];
    console.log(combinedObj)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(combinedObj),
        url: "http://localhost:8080/api/students/updateSubjects",
        success: function (response) {
            alert("Sửa thành công");
            showlist();
        },
        error: function (error) {
            alert("Có lỗi xảy ra: " + error.responseText);
        }
    });

    event.preventDefault();
}


    function createSubj(id) {
        let idStudent = id;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "GET",
            url: "http://localhost:8080/api/students/listSubjects",
            success: function (data) {
                var str = '<form style="width: 500px; margin: auto">\n' + '<div class="mb-3">\n' +
                    '      <label for="subject" class="form-label">Môn học</label>\n' +
                    '      <select class="form-select" id="subject">\n'
                for (let i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].id + '">' + data[i].name + '</option>\n'
                }
                str += '</select>\n' +
                    '<td><button style="margin-top: 20px" class="btn btn-warning" onclick="addSubj(' + idStudent + ')">Đồng ý</button></td>\n' +
                    '    </div>\n' + '</form>' +
                    '  <button class="btn btn-info" onclick="showlist()">Back</button>'
                document.getElementById("show").innerHTML = str;
            }
        });
        event.preventDefault();
    }
    function addSubj(id) {
        let subject = $('#subject').val();
        let params = {
            id: id,
            subjects: [{
                id: subject
            }]
        }
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(params),
            url: "http://localhost:8080/api/students/addSubj",
            success: function (data) {
                alert("Thêm thành công")
                showlist()
            } ,
            error: function (error) {
                alert("Có lỗi xảy ra: " + error.responseText);
            }
        })
        event.preventDefault()
    }

    function createForm() {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "GET",
            url: "http://localhost:8080/api/students/create",
            success: function (data) {
                var str = '<h1 style="text-align: center">Thêm học sinh</h1>\n' +
                    '  <form style="width: 500px; margin: auto">\n' +
                    '    <div class="mb-3">\n' +
                    '      <label for="code" class="form-label" >Mã sinh viên</label>\n' +
                    '      <label style="font-size: x-small;color: grey">( từ 3 đến 6 ký tự )</label>\n' +
                    '      <input type="text" class="form-control" id="code"\n' +
                    '             placeholder="Mã" required>\n' +
                    '    </div>\n' +
                    '    <div class="mb-3">\n' +
                    '      <label for="name" class="form-label">Tên Sinh Viên</label>\n' +
                    '      <input type="text" class="form-control" id="name"\n' +
                    '            placeholder="Tên" required>\n' +
                    '    </div>\n' +
                    '    <div class="mb-3">\n' +
                    '      <label for="age" class="form-label">Tuổi</label>\n' +
                    '      <label style="font-size: x-small;color: grey">( từ 18 đến 35 tuổi )</label>\n' +
                    '      <input type="number" class="form-control" id="age"\n' +
                    '             placeholder="Tuổi">\n' +
                    '    </div>\n' +
                    '    <div class="mb-3">\n' +
                    '      <label for="gender" class="form-label">Giới Tính</label>\n' +
                    '      <select class="form-select" id="gender">\n' +
                    '        <option value="1">Nam</option>\n' +
                    '        <option value="2">Nữ</option>\n' +
                    '      </select>\n' +
                    '    </div>\n' +
                    '    <div class="mb-3">\n' +
                    '      <label for="address" class="form-label">Địa chỉ</label>\n' +
                    '      <input type="text" class="form-control" id="address"\n' +
                    '             placeholder="Địa chỉ">\n' +
                    '    </div>\n' +
                    '    <div class="mb-3">\n' +
                    '      <label for="status" class="form-label">Tình Trạng</label>\n' +
                    '      <select class="form-select" id="status">\n'
                for (let i = 0; i < data.length; i++) {
                    str += '<option value="' + data[i].id + '">' + data[i].name + '</option>\n'
                }
                str += '</select>\n' +
                    '    </div>\n' +
                    '    <button class="btn btn-primary" type="submit" onclick="create()">Thêm</button>\n' +
                    '    <button class="btn btn-secondary" type="reset">Xóa toàn bộ</button>\n' +
                    '  </form>\n' +
                    '  <button class="btn btn-info" onclick="showlist()">Back</button>'
                document.getElementById("show").innerHTML = str;
            }
        })
    }

    function create() {
        let code = $('#code').val();
        let name = $('#name').val();
        let age = $('#age').val();
        let gender = $('#gender').val();
        let address = $('#address').val();
        let status = $('#status').val();
        let subjectObject = {
            code: code,
            name: name,
            age: age,
            gender: gender,
            address: address,
            status: {
                id: status
            }
        }
        console.log(subjectObject)
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(subjectObject),
            url: "http://localhost:8080/api/students/createP",
            success: function () {
                alert("Thêm thanh công")
                showlist()
            }
        });
        event.preventDefault();
    }


    function searchByName() {
        let name = $('#name').val();
        let student = {name: name}
        console.log(student);
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(student),
            url: "http://localhost:8080/api/students/search",
            success: function (data) {
                var str =
                    '</div>\n' + ' <h2 style="text-align: center; margin-top: 10px">Kết quả tìm kiếm</h2>\n' +
                    '<table style="margin: 0 auto; border-collapse: collapse; border: 1px; width: 98%" class="table table-hover">\n';
                str += '<button onclick="createForm()" style="margin-left: 1px; margin-top: 30px" class="btn btn-primary">Thêm</button>';
                str += '<tr style="margin-top: 500px">\n' +
                    '<th>#</th>\n' +
                    '<th>Mã sinh viên</th>\n' +
                    '<th>Họ Tên</th>\n' +
                    '<th>Tuổi</th>\n' +
                    '<th>Giới tính</th>\n' +
                    '<th>Địa chỉ</th>\n' +
                    '<th>Trạng thái</th>\n' +
                    '<th>Môn học</th>\n' +
                    '<th style="text-align: center" colspan="4">Thêm, sửa, xóa thông tin</th>\n' +
                    '</tr> ';
                for (let i = 0; i < data.length; i++) {
                    str += '<tr>';
                    str += ' <td> ' + data[i].id + '</td>\n' +
                        ' <td> ' + data[i].code + '</td>\n' +
                        ' <td> ' + data[i].name + '</td>\n' +
                        ' <td> ' + data[i].age + '</td>\n' +
                        ' <td> ' + data[i].gender + '</td>\n' +
                        ' <td> ' + data[i].address + '</td>\n' +
                        ' <td> ' + data[i].status.name + '</td>\n';
                    str += '<td>';
                    for (let j = 0; j < data[i].subjects.length; j++) {
                        str += '<div>' + data[i].subjects[j].name + '</div>';
                    }
                    str += '</td>' +
                        '<td><button style="font-size: small; width: 100px; height: 45px; " ' +
                        'class="btn btn-primary" onclick="createSubj(' + data[i].id + ')">Thêm môn</button></td>\n' +
                        '<td><button style="font-size: small; width: 100px; height: 45px;" ' +
                        'class="btn btn-warning" onclick="editSubj(' + data[i].id + ')">Sửa môn</button></td>\n' +
                        '<td><button style="font-size: small; width: 100px; height: 45px;" ' +
                        'class="btn btn-danger"" onclick="deleteSubInStudent(' + data[i].id + ')">Xóa môn</button></td>\n' +
                        '<td><button style="font-size: small; width: 100px; height: 45px;" ' +
                        'class="btn btn-warning" onclick="update(' + data[i].id + ')">Sửa t.tin</button></td>\n' +
                        '</tr>\n';
                }
                str += '</table>' +
                    '  <button style="margin-top: 15px" class="btn btn-info" onclick="findIntegration()">Back</button>'
                document.getElementById("show").innerHTML = str;
            }
        });
        event.preventDefault();
    }

    function findIntegration(){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "GET",
            url: "http://localhost:8080/api/students/findIntegration",
            success: function (data) {
                var listStatus = data[1]
                var listSubjects = data[0];
                var str = '<h1 style="text-align: center">Tìm kiếm học sinh</h1>\n' +
                    '<div style="width: 500px; margin: auto">' +
                    '    <div class="mb-3" style="">\n' +
                    '      <label for="name" class="form-label">Tên gần đúng</label>\n' +
                    '      <input type="text" class="form-control" id="name"\n' +
                    '            placeholder="Tên" required>\n' +
                    '    </div>\n' +
                    '    <div class="mb-3">\n' +
                    '      <label for="gender" class="form-label">Giới Tính</label>\n' +
                    '      <select class="form-select" id="gender">\n' +
                    '        <option value="">-----</option>\n' +
                    '        <option value="Nam">Nam</option>\n' +
                    '        <option value="Nữ">Nữ</option>\n' +
                    '      </select>\n' +
                    '    </div>\n' +
                    '    <div class="mb-3">\n' +
                    '      <label for="address" class="form-label">Địa chỉ</label>\n' +
                    '      <input type="text" class="form-control" id="address"\n' +
                    '             placeholder="Địa chỉ">\n' +
                    '    </div>\n' +
                    '    <div class="mb-3">\n' +
                    '      <label for="status" class="form-label">Tình trạng</label>\n' +
                    '      <select class="form-select" id="status">\n' +
                    '<option value="-1">-----------</option>'
                for (let i = 0; i < listStatus.length; i++) {
                    str += '<option value="' + listStatus[i].id + '">' + listStatus[i].name + '</option>\n'
                }
                str += '</select>\n' +
                    '    </div>\n' +
                    '<div class="mb-3">\n' +
                    '      <label for="subject" class="form-label">Môn hoc</label>\n' +
                    '      <select class="form-select" id="subject">\n' +
                    '<option value="-1">------------</option>'
                for (let j = 0; j < listSubjects.length; j++) {
                    str += '<option value="' + listSubjects[j].id + '">' + listSubjects[j].name + '</option>\n'
                }
                str += '</select>\n' +
                    '    </div>\n' +
                    '</div>' +
                    '    <button class="btn btn-primary" type="submit" onclick="searchIntegratio()">Tìm kiếm</button>\n' +
                    '  <button class="btn btn-info" onclick="showlist()">Back</button>'
                document.getElementById("show").innerHTML = str;
            }
        })
    }
function searchIntegratio(){
var name = $('#name').val();
var gender = $('#gender').val();
var address = $('#address').val();
var status = $('#status').val();
var subject = $('#subject').val();
if (subject === "-1"){
    var obj = {
        name: name,
        gender: gender,
        address: address,
        status: {
            id: status
        }
    }
}else {
    var obj = {
        name: name,
        gender: gender,
        address: address,
        status: {
            id: status
        },
        subjects : [{
            id : subject
        }
        ]
    }
}
    console.log(obj)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(obj),
        url: "http://localhost:8080/api/students/searchIntegration",
        success:  function (data){
            if (data.length > 0){
            var str = '<div class="search-box">\n' +
                '</div>\n' + ' <h2 style="text-align: center; margin-top: 10px">Kết quả tìm kiếm</h2>\n' +
                '<table style="margin: 0 auto; border-collapse: collapse; border: 1px; width: 98%" class="table table-hover">\n';
            str += '<button onclick="createForm()" style="margin-left: 1px; margin-top: 30px" class="btn btn-primary">Thêm</button>';
            str += '<tr style="margin-top: 500px">\n' +
                '<th>#</th>\n' +
                '<th>Mã sinh viên</th>\n' +
                '<th>Họ Tên</th>\n' +
                '<th>Tuổi</th>\n' +
                '<th>Giới tính</th>\n' +
                '<th>Địa chỉ</th>\n' +
                '<th>Trạng thái</th>\n' +
                '<th>Môn học</th>\n' +
                '<th style="text-align: center" colspan="4">Thêm, sửa, xóa thông tin</th>\n' +
                '</tr> ';
            for (let i = 0; i < data.length; i++) {
                str += '<tr>';
                str += ' <td> ' + data[i].id + '</td>\n' +
                    ' <td> ' + data[i].code + '</td>\n' +
                    ' <td> ' + data[i].name + '</td>\n' +
                    ' <td> ' + data[i].age + '</td>\n' +
                    ' <td> ' + data[i].gender + '</td>\n' +
                    ' <td> ' + data[i].address + '</td>\n' +
                    ' <td> ' + data[i].status.name + '</td>\n';
                str += '<td>';
                for (let j = 0; j < data[i].subjects.length; j++) {
                    str += '<div>' + data[i].subjects[j].name + '</div>';
                }
                str += '</td>' +
                    '<td><button style="font-size: small; width: 100px; height: 45px; " ' +
                    'class="btn btn-primary" onclick="createSubj(' + data[i].id + ')">Thêm môn</button></td>\n' +
                    '<td><button style="font-size: small; width: 100px; height: 45px;" ' +
                    'class="btn btn-warning" onclick="editSubj(' + data[i].id + ')">Sửa môn</button></td>\n' +
                    '<td><button style="font-size: small; width: 100px; height: 45px;" ' +
                    'class="btn btn-danger"" onclick="deleteSubInStudent(' + data[i].id + ')">Xóa môn</button></td>\n' +
                    '<td><button style="font-size: small; width: 100px; height: 45px;" ' +
                    'class="btn btn-warning" onclick="update(' + data[i].id + ')">Sửa t.tin</button></td>\n' +
                    '</tr>\n';
            }
            str += '</table>' +
                '  <button style="margin-top: 15px" class="btn btn-info" onclick="findIntegration()">Back</button>'
            document.getElementById("show").innerHTML = str;
        } else {
               mess();
            }
        }

    });
    event.preventDefault();
}
function mess(){
    alert("No data returned!")
}