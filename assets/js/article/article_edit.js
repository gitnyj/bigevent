$(function () {
  var art_state = "已发布";
  $("#btnDraft").on("click", function (e) {
    art_state = "草稿";
  });

  $("#form-pub").submit(function (e) {
    e.preventDefault();
    alert(11);
    // var fd = new FormData($(this)[0]);
    // fd.append("state", art_state);
    // $image
    //   .cropper("getCroppedCanvas", {
    //     // 创建一个 Canvas 画布
    //     width: 400,
    //     height: 280,
    //   })
    //   .toBlob(function (blob) {
    //     // 将 Canvas 画布上的内容，转化为文件对象
    //     // 得到文件对象后，进行后续的操作
    //     fd.append("cover_img", blob);
    //     // publishArticle(fd);
    //   });

    function editArticle(data) {
      form.val("form-edit", data);
      var data = form.val("form-edit");
      var fd = new FormData(data[0]);
      $.ajax({
        method: "GET",
        url: "/my/article/edit",
        data: fd,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message);
          }
          layer.msg(res.message);
        },
      });
    }
  });
});
