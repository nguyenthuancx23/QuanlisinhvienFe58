// // console.log(axios);

// var objectAjax = {
//     url : './data/arrSinhVien.json',

//     method : 'GET', 

//     responseType : 'json', // kiểu dữ liệu trả về do backend cung cấp
// }

// // gọi ajax = axios => trả về promise
// var promise = axios(objectAjax);

// // xử lí khi request thành công

// promise.then(function(result) {
//     console.log(result.data);
//     document.querySelector('#data').innerHTML = result.data[0].tenSV;
// });


// promise.catch(function(err){
//     console.log(err)
// });


// GET

var renderTable = function (arrSinhVien) {
  var content = '';
  for (var i = 0; i < arrSinhVien.length; i++) {
    //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên trong mảng
    var sinhVien = arrSinhVien[i];
    var sv = new SinhVien(sinhVien.maSinhVien, sinhVien.tenSinhVien, sinhVien.loaiSinhVien, sinhVien.diemToan, sinhVien.diemLy, sinhVien.diemHoa, sinhVien.diemRenLuyen, sinhVien.email, sinhVien.soDienThoai);

    content += `
            <tr>
                <td>${sv.maSinhVien}</td>
                <td>${sv.tenSinhVien}</td>
                <td>${sv.loaiSinhVien}</td>
                <td>${sv.tinhDiemTrungBinh()}</td>
                <td>${sv.diemRenLuyen}</td>
                <td>
                <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')" >Xoá</button>
                
                <button class="btn btn-danger" onclick="chinhSua('${sv.maSinhVien}')" >Chỉnh sửa</button>
                </td>
            </tr>
        `
  }
  document.querySelector('#tblSinhVien').innerHTML = content;
}

var renderSinhVien = function () {
  var promise = axios({
    url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien',
    method: 'GET', // backend cung cấp
    responseType: 'json' // backend cung cấp kiểu dữ liệu trả về
  });

  // xủ lí thành công
  promise.then(function (result) {
    console.log('result', result.data);

    renderTable(result.data);
  });

  promise.catch(function () {
    console.log('2');
  });

  console.log('3');

}
// 
renderSinhVien();



//  POST : thêm sinh viên qua api back end cung cấp

document.querySelector('#btnXacNhan').onclick = function() {
  // lấy thông tin người dùng nhập vào

  var sinhVien = new SinhVien();
  sinhVien.maSinhVien = document.querySelector('#maSinhVien').value;
  sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value;
  sinhVien.diemToan = document.querySelector('#diemToan').value;
  sinhVien.diemLy = document.querySelector('#diemLy').value;
  sinhVien.diemHoa = document.querySelector('#diemHoa').value;
  sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
  sinhVien.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
  sinhVien.email = document.querySelector('#email').value;
  sinhVien.soDienThoai = document.querySelector('#soDienThoai').value;

  console.log('sinhVien', sinhVien);

  var promise = axios ({
    url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',
    method: 'POST',
    data : sinhVien, // format phải giống với backend cần
    responseType : 'JSON'
  });
  promise.then(function(result){
    console.log('thành công',result.data);
  });

  promise.catch(function(err){
    console.log('thất bại',err)
  });

}

// DELETE với api backend cung cấp

window.xoaSinhVien = function (maSinhVien) {
  var promise = axios({
    url: `http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${maSinhVien}`,
    method : 'DELETE',
    responseType : 'JSON'
  });

  promise.then(function(result){
    console.log('result',result.data);
    renderSinhVien();
  });
  promise.catch(function(err){
    console.log('err',err.reponse.data);
  })
}


// UPDATE với api backend cung cấp

window.chinhSua = function (maSinhVien) {
  axios({
    url : `http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=${maSinhVien}`,
    method : 'GET'
  }).then(function(result){
    console.log('result', result);

    var sv = result.data;
    document.querySelector('#maSinhVien').value = sv.maSinhVien;
    document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
    document.querySelector('#email').value = sv.email;
    document.querySelector('#soDienThoai').value = sv.soDienThoai;
    document.querySelector('#diemRenLuyen').value = sv.diemRenLuyen;
    document.querySelector('#diemToan').value = sv.diemToan;
    document.querySelector('#diemLy').value = sv.diemLy;
    document.querySelector('#diemHoa').value = sv.diemHoa;

  }).catch(function(err){
    console.log('err',err);
  })  
}

// PUT cập nhật thông tin

document.querySelector('#btnCapNhatSinhVien').onclick =function () {
  
  var sinhVien = new SinhVien();
  sinhVien.maSinhVien = document.querySelector('#maSinhVien').value;
  sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value;
  sinhVien.diemToan = document.querySelector('#diemToan').value;
  sinhVien.diemLy = document.querySelector('#diemLy').value;
  sinhVien.diemHoa = document.querySelector('#diemHoa').value;
  sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
  sinhVien.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
  sinhVien.email = document.querySelector('#email').value;
  sinhVien.soDienThoai = document.querySelector('#soDienThoai').value;

  var promise = axios({
    urt : `http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${sinhVien.maSinhVien}`,
    method :'PUT',
    data : sinhVien
  });

   promise.then(function(result){
    console.log('result',result.data);
    renderSinhVien();
   });
   promise.catch(function(err){
     console.log('err'.err);
   })
}

