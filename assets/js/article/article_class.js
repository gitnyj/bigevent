$(function () {
  var layer = layui.layer;
  var form = layui.form;
  initArtCate();
  function initArtCate() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        var str = template("art-cate", res);
        $("#tbody").html(str);
      },
    });
  }
  var indexAdd = null;
  var indexEdit = null;
  $("#btnAddCate").on("click", function () {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });
  $("tbody").on("click", ".btn-edit", function () {
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    var id = $(this).attr("data-id");
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        form.val("form-edit", res.data);
      },
    });
  });
  $("tbody").on("click", ".btn-del", function () {
    var id = $(this).attr("data-id");
    layer.confirm(
      "确定要删除吗?",
      { icon: 3, title: "警告" },
      function (index) {
        $.ajax({
          method: "GET",
          url: "/my/article/deletecate/" + id,
          success: function (res) {
            if (res.status !== 0) {
              return layer.msg(res.message);
            }
            layer.msg(res.message);
            layer.close(index);
            initArtCate();
          },
        });
      }
    );
  });
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        initArtCate();
        layer.msg(res.message);
        layer.close(indexAdd);
      },
    });
  });
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        initArtCate();
        layer.msg(res.message);
        layer.close(indexEdit);
      },
    });
  });
});
