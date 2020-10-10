define(["jquery","jquery-cookie"], function($){
    
    function shopping(){
      sc_num();
        sc_msg();
          // 点击按钮增加数量
          // var i = 1;
          // $('.cart-body').on('click',"#btn-add",function(){
          //           //        alert($(this).attr("oid"));
          //           if(i >= 5){
          //               $("#btn-add").attr("disabled","disabled");
          //           }else{
          //               $("#btn-sub").removeAttr("disabled");
          //               $("#btn-va").val(++i);
                        
          //           }
          //     })
          //     $('.cart-body').on('click',"#btn-sub",function(){
          //       //        alert($(this).attr("oid"));
          //       if(i == 1){
          //           $("#btn-sub").attr("disabled","disabled");
          //       }else{
          //           $("#btn-va").val(--i);
          //           $("#btn-add").removeAttr("disabled");
                    
          //       } 
          // })

        
      //加载右侧的购物车里面的数据
      //1、购物车的数据存储在cookie  2、商品数据在服务器
      function sc_msg(){
        var cookieStr = $.cookie("goods");
        if(!cookieStr){
          return;
        }
        //下载所有的商品数据
        $.ajax({
          url: "./data/quanbu.json",
          success: function(arr){
            var cookieArr = JSON.parse(cookieStr);
            //精益求精  写算法
            var newArr = [];
            for(var i = 0; i < arr.length; i++){
              for(var j = 0; j < cookieArr.length; j++){
                if(cookieArr[j].id == arr[i].id){
                  arr[i].num = cookieArr[j].num;
                  newArr.push(arr[i]);
                  break;
                }
              }
            }
            //通过newArr。处理数据，将数据添加页面上
            var str = ``;
            var pic = 0;
            for(var i = 0; i < newArr.length; i++){
                str += `  <div style="float:left" id="${newArr[i].id}">
                <input type="checkbox" checked class="cart-body-check">
                <img src="${newArr[i].img}" alt="">
                <span class="cart-body-s1">${newArr[i].ProductName}</span>
                <span class="cart-body-s2">${newArr[i].weight}g</span>
                <div class="cart-body-pice">
                    <span class="cart-body-pice1">${newArr[i].price_1}</span>
                    <span class="cart-body-pice2">${newArr[i].price_2}</span>
                </div>
                <div class="magnifyingRight-2-right" id="${newArr[i].id}">
                    <input type="button" value="-" class="sub" id="btn-sub">
                    <input type="text" value="${cookieArr[i].num}" id="btn-va">
                    <input type="button" value="+" class="sub"  id="btn-add">
                 </div>
                 <span class="cart-body-s3">${newArr[i].price_1}</span>
                 <a href="" class="iconfont delete">&#xe614;</a>
            </div>`;
              }
            $(".cart-body").html(str);

        
       
          },
          error: function(msg){
            console.log(msg);
          }
        })
      }
         //给右侧购物车的删除按钮添加点击
      $(".cart-body").on("click", ".delete", function(){
        var id = $(this).closest("div").remove().attr("id");
        //删除页面上的节点  从cookie中删除数据
        var cookieArr = JSON.parse($.cookie("goods"));
        for(var i = 0; i < cookieArr.length; i++){
          if(cookieArr[i].id == id){
            cookieArr.splice(i, 1);
            break;
          }
        }
        if(cookieArr.length){
          $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7
          })
        }else{
          $.cookie("goods", null);
        }

        //更新数据数量
        // sc_num();
      })
   
    //   选中后全选
    var sum = 0;
    $(".cart-header-top").click(function(){
        if ($(".cart-header-top").get(0).checked) {
            // do something
            $(".cart-body-check").prop("checked",true);
            
        }else{
            $(".cart-body-check").prop("checked",false);
        }
    })
    // 选中后全选结束
    // 选中后计算价格开始
   
    $(".cart-body").on("click",".cart-body-check",function(){
      if ($(".cart-body-check").get($(this)).checked) {
        // do something
        // alert(11);
        alert($(this));
      } 
    })
        
     //处理购物车数量
     function sc_num(){
      var cookieStr = $.cookie("goods");
      var sum = 0;
      if(cookieStr){
        var cookieArr = JSON.parse(cookieStr);
        for(var i = 0; i < cookieArr.length; i++){
          sum += cookieArr[i].num;
        }
      }
      $(".shopping-count").html(` ${sum} `);
    }
      // 点击按钮增加减少
      
      $(".cart-body").on("click", ".sub", function(){
        var id = $(this).closest("div").attr("id");
        var cookieArr = JSON.parse($.cookie("goods"));
        for(var i = 0; i < cookieArr.length; i++){
          if(cookieArr[i].id == id){
            break;
          }
        }
        if($(this).val() == "+"){
          
          cookieArr[i].num++;
        }else{
        
          cookieArr[i].num == 1 ? alert("数量为1，不能减少") : cookieArr[i].num--;
        }
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7
        })

        //修改页面上的数量
        $(this).closest("div").eq("#btn-va").html(`${cookieArr[i].num}`);
        sc_num();
        sc_msg()
      })
     
    }
    return{
        shopping
    }
})