define(["jquery","jquery-cookie"], function($){
    function deta(){
        $(function(){
              //banner 判断是否显示隐藏
              var isok = false;
              $(".headerKFC").mouseenter(function(){
                  $(".KF-wrap").show();
              }).mouseleave(function(){
                  setTimeout(function(){
                   if(!isok){
                       $(".KF-wrap").hide();
                   }
                  },100);
              })
              $(".KF-wrap").mouseleave(function(){
   
               $(".KF-wrap").hide();
               isok = false;
              }).mouseenter(function(){
                  isok = true;
              })
   
              $(".KF-wrap span").eq(0).mouseenter(function(){
                  $(".header_b").show();
              }).mouseleave(function(){
               $(".header_b").hide();
              })
              
              
        })
        //放大镜
        $("#small").mouseenter(function(){
            $("#big,#mark").show();
        }).mouseleave(function(){
            $("#big,#mark").hide();
        }).mousemove(function(ev){
            var l = ev.pageX - $("#small").offset().left - 100;
            //限制出界
            if(l <= 0){
                l = 0;
            }
            if(l >= 268){
                l = 268;
            }
            var t = ev.pageY - $("#small").offset().top - 100;
            if(t <= 0){
                t = 0;
            }
            if(t >= 268){
                t = 268;
            }
            $("#mark").css({
                left: l,
                top: t
            })

            //右边的大图片反方向对应放大倍数移动
            $("#big img").css({
                left: -2 * l,
                top: -2 * t
            })
        })
        //   放大镜结束
        // 点击按钮增加数量
        var i = 1;
      
        $("#btn-add").click(function(){
            if(i >= 5){
                $("#btn-add").attr("disabled","disabled");
            }else{
                $("#btn-sub").removeAttr("disabled");
                $("#btn-va").val(++i);
                
            }
            
        })
        $("#btn-sub").click(function(){
            if(i == 1){
                $("#btn-sub").attr("disabled","disabled");
            }else{
                $("#btn-va").val(--i);
                $("#btn-add").removeAttr("disabled");
                
            } 
        })
        $.ajax({
            url:"../data/xinpin.json",
            success:function(arr){
                var str = ``;
                for(var j = 0; j < 10; j++){
                    str = `
                    <li>
                    <a href="" class="ProductImg">
                        <img src="${arr[j].img}" alt="">
                    </a>
                    <a href="" class="ProductName">${arr[j].ProductName}</a>
                    <div class="price">
                    <p class="price_1">${arr[j].price_1}</p> 
                    <p class="price_2">${arr[j].price_2}</p>
                    </div>
                    <button id="OrangeButton" oid="${arr[j].id}" class="iconfont">&#xe69a;</button>
                    </li>
                    `;
                    var node = $(str);
                    node.appendTo($(".newProductBottom_class_ul").eq(0));
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
        var isok = true; 
        var isokk = true;
        $("#newProductBottom-right").click(function(){
            Right = 588;
            if(isok){
                Right = -595;
                isok = false;
            }else{
                Right = 588;
                isok = true;
            }
            // $(".newProductBottom_class_ul").css("left","-595px");
            $(".newProductBottom_class_ul").eq(0).animate({
                left: Right,
                
            },300,function(){
               
            });
         
        });
        $("#newProductBottom-left").click(function(){
            
            if(isok){
                Right = -595;
                isok = false;
            }else{
                Right = 588;
                isok = true;
            }
            // $(".newProductBottom_class_ul").css("left","-595px");
            $(".newProductBottom_class_ul").eq(0).animate({
                left: Right,
            },300);
         
        });
        $(function(){
            var aBtns = $(".hotsellRight-top").find("div");
            var aDivs = $(".d1");

            aBtns.click(function(){
              aBtns.attr("class", '');
              aDivs.css("display", 'none').eq($(this).index()).css("display", 'block');
              $(this).attr("class", 'active');
            })
        })
    }
    return {
        deta
    }
})