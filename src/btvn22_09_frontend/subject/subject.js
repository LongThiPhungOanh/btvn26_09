function update(id){
    console.log(id)
    let params = {id : id}
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(params),
        //tên API
        url: "http://localhost:8080/api/subjects/update",
        success: function (data){
            console.log(data)
            // $("#abc").hide();
            var str = ' <h1 style="text-align: center">Sửa môn học</h1>\n' +
                '    <form style="width: 500px; margin: auto">\n' +
                '        <div class="mb-3">\n' +
                '            <label for="name" class="form-label">Name</label>\n' +
                '            <input type="text" class="form-control" id="nameS" name="nameS"\n' +
                '                    value="'+ data.name +'" placeholder="Name" required>\n' +
                '        </div>\n' +
                '        <button class="btn btn-primary" onclick="editSubject('+ data.id +')">Sửa</button>\n ' +
                '</form>'
            str += '<a class="btn btn-info" href="listSubject.html">Back</a>';
            document.getElementById("show").innerHTML = str;
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
        url: "http://localhost:8080/api/subjects",
        success: function (data) {
            var str = ' <h4 style="text-align: center">Sửa môn học</h4>\n' +
                '<a href="create.html" id="abc" style="margin-left: 1px; margin-top: 30px" class="btn btn-primary">Thêm</a>\n'
             str += ' <table style="margin: 0 auto;;border-collapse: collapse; border: 1px; width: 40%" ' +
                'class="table table-hover">\n';
            str += '    <tr style="margin-top: 500px">\n' +
                '        <th>Id</th>\n' +
                '        <th>Name</th>\n' +
                '        <th></th>\n' +
                '    </tr> ';
            for (let i = 0; i < data.length; i++) {
                str += '<tr>'
                str += ' <td> ' + data[i].id + '</td>\n' +
                    ' <td> ' + data[i].name + '</td>\n' +
                    '    <td><button class="btn btn-warning" onclick="update('+data[i].id+')">edit</button></td>\n' +
                    '</tr>\n'
            }
            str += '</table>';
            str += '<a class="btn btn-info" href="http://localhost:63343/btvn22_09/student/list.html?_ijt=rltrsknuu158u37lcspjp1nisl&_ij_reload=RELOAD_ON_SAVE">Back</a>';
            document.getElementById("show").innerHTML = str;
        }
    });
}

function editSubject(id){
    let name = $('#nameS').val();
    let objSubject = {
        id : id,
        name : name
    }
    console.log(objSubject)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(objSubject),
        //tên API
        url: "http://localhost:8080/api/subjects/updateS",
        //xử lý khi thành công
        success: function (){
            alert("Sửa thanh công")
            // $("#abc").show()
            showlist()
        }
    });
    event.preventDefault();
}
    function createSubject() {
        let name = $('#name').val();
        let objSubject = {
            name : name
        }
        console.log(objSubject)
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(objSubject),
            //tên API
            url: "http://localhost:8080/api/subjects/create",
            //xử lý khi thành công
            success:  function (){
                alert("Thêm thanh công")
                showlist()
            }
        });
        event.preventDefault();
    }
