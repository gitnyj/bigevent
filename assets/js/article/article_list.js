$(function () {
  var form = layui.form;
  var laypage = layui.laypage;
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date);
    var y = dt.getFullYear();
    var m = zero(dt.getMonth() + 1);
    var d = zero(dt.getDate());
    var hh = zero(dt.getHours());
    var mm = zero(dt.getMinutes());
    var ss = zero(dt.getSeconds());
    return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
  };
  function zero(e) {
    return e <= 9 ? "0" + e : e;
  }
  var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: "",
    state: "",
  };
  initTable();
  function initTable() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        var str = template("art-list", res);
        $("#tbody").html(str);
        renderPage(res.total);
      },
    });
  }
  initArtCate();
  function initArtCate() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        var str = template("tpl-cate", res);
        $("[name=cate_id]").html(str);
        form.render();
      },
    });
  }
  $("#form-search").submit(function (e) {
    e.preventDefault();
    var cate_id = $("[name=cate_id]").val();
    var state = $("[name=state]").val();
    q.cate_id = cate_id;
    q.state = state;
    initTable();
  });
  function renderPage(total) {
    laypage.render({
      elem: "pageBox", //注意，这里的 test1 是 ID，不用加 # 号
      count: 10, //数据总数，从服务端得到
      limit: q.pagesize,
      limits: [2, 4, 6, 8, 10],
      curr: q.pagenum,
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数
        q.pagenum = obj.curr;
        q.pagesize = obj.limit;
        // initTable();
        if (!first) {
          initTable();
        }
      },
    });
  }
  $("tbody").on("click", ".btn-edit", function () {
    var id = $(this).attr("data-id");
    $.ajax({
      method: "GET",
      url: "/my/article/" + id,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        location.href = "/article/article_edit.html";
      },
    });
  });
  function edit(data) {
    location.href = "/article/article_edit.html";
    // form.val("form-edit", data);
    // var data = form.val("form-edit");
    // var fd = new FormData(data[0]);
    // $.ajax({
    //   method: "GET",
    //   url: "/my/article/edit",
    //   data: fd,
    //   success: function (res) {
    //     if (res.status !== 0) {
    //       return layer.msg(res.message);
    //     }
    //     layer.msg(res.message);
    //   },
    // });
  }
  $("tbody").on("click", ".btn-del", function () {
    var len = $(".btn-del").length;
    var id = $(this).attr("data-id");
    layer.confirm(
      "此操作将永久删除该文章，是否继续？",
      { icon: 3, title: "警告" },
      function (index) {
        $.ajax({
          method: "GET",
          url: "/my/article/delete/" + id,
          success: function (res) {
            if (res.status !== 0) {
              return layer.msg(res.message);
            }
            layer.msg(res.message);
            if (len === 1) {
              q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
            }
            initTable();
            layer.close(index);
          },
        });
      }
    );
  });
});
