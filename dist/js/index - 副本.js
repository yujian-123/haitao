//遵从AMD规范
define(["jquery", "jquery-cookie"], function($){
    function body(){
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
           //轮播图开始
           $.ajax({
            url: "../data/banners.json",
            success: function(arr){
              var str = ``;
            
              for(var i = 0; i < arr.data.length; i++){
                str += `<div class="swiper-item">
                        <img src="${arr.data[i].image_url}">
                        </div>`;
              }
              $(".swiper").html(str);
    
            },
            error: function(msg){
              console.log(msg);
            }
          })
    
    
            class Swiper {
                constructor() {
                    this.w = 1025;
                    this.num = 0;
                    this.len = 6;
                    this.timer = null;
                }
                init() {
                    //设置定时器
                    this.setTime();
                    //滑上停止定时器
                    this.hover();
                    //点击指示
                    this.pointClick();
                    //点击左右箭头
                    this.lrClick();
                }
                setTime() {
                    this.timer = setInterval(() => {
                        this.num++;	
                        if (this.num > this.len) {
                            this.num = 0;
                            
                        }
                        let cssTrx = -this.num * this.w;
                        $('.swiper-point-item .point').eq(this.num).addClass('active').siblings().removeClass('active');
                        $('.swiper').css({transform: `translateX(${cssTrx}px)`})
                    }, 3000)
                }
                hover() {
                    $('.swiper-contione').hover(() => {
                        clearInterval(this.timer)
                    }, () => {
                        this.setTime();
                    });
                }
                pointClick() {
                    let that = this;
                    $('.swiper-point-item .point').mouseenter(function() {
                        that.num = $(this).index();
                        let cssTrx = -that.num * that.w;
                        $(this).addClass('active').siblings().removeClass('active');
                        $('.swiper').css({
                            transform: `translateX(${cssTrx}px)`
                        })
                    })
                }
                lrClick() {
                    $('.swiper-left img').click(() => {
                        this.num--;
                        if (this.num < 0) {
                            this.num = this.len;
                        };
                        console.log(this.num)
                        let cssTrx = -this.num * this.w;
                        $('.swiper-point-item .point').eq(this.num).addClass('active').siblings().removeClass('active');
                        $('.swiper').css({
                            transform: `translateX(${cssTrx}px)`
                        })
                    });
                    
                    $('.swiper-right img').click(() => {
                        this.num++;
                        if (this.num > this.len) {
                            this.num = 0;
                        }
                        let cssTrx = -this.num * this.w;
                        $('.swiper-point-item .point').eq(this.num).addClass('active').siblings().removeClass('active');
                        $('.swiper').css({
                            transform: `translateX(${cssTrx}px)`
                        })
                    })
                }
            }
            let sw = new Swiper();
            sw.init();
            //判断轮播图的层级关系
            $("#slideshowbox").mouseenter(function(){
                $(".slideshow").css("z-index","1");
            })
            $("#slideshowbox").mouseleave(function(){
                $(".slideshow").css("z-index","-1");
            })
            //判断层级关系结束
            //新品json数据加载
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
            //新品数据加载结束
            //新品点击后进行轮播开始
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
            //新品点击轮播结束
            // 网红点击轮播开始
            $(".left-2").click(function(){
                leftRight = 588;
                if(isokk){
                    leftRight = -595;
                    isokk = false;
                }else{
                    leftRight = 588;
                    isokk = true;
                }
                // $(".newProductBottom_class_ul").css("left","-595px");
                $(".newProductBottom_class_ul").eq(1).animate({
                    left: leftRight,
                    
                },300,function(){
                   
                });
             
            });
            $(".right-2").click(function(){
                if(isokk){
                    leftRight = -595;
                    isokk = false;
                }else{
                    leftRight = 588;
                    isokk = true;
                }
                // $(".newProductBottom_class_ul").css("left","-595px");
                $(".newProductBottom_class_ul").eq(1).animate({
                    left: leftRight,
                },300);
             
            });
            // 网红点击轮播结束
              // 超级特惠轮播开始
              var isokkk = true;
              $(".left-3").click(function(){
                leftRight_3 = 588;
                if(isokkk){
                    leftRight_3 = -595;
                    isokkk = false;
                }else{
                    leftRight_3 = 588;
                    isokkk = true;
                }
                // $(".newProductBottom_class_ul").css("left","-595px");
                $(".newProductBottom_class_ul").eq(2).animate({
                    left: leftRight_3,
                    
                },300,function(){
                   
                });
             
            });
            $(".right-3").click(function(){
                if(isokkk){
                    leftRight_3 = -595;
                    isokkk = false;
                }else{
                    leftRight_3 = 588;
                    isokkk = true;
                }
                // $(".newProductBottom_class_ul").css("left","-595px");
                $(".newProductBottom_class_ul").eq(2).animate({
                    left: leftRight_3,
                },300);
             
            });
            // 超级特惠轮播结束
            //畅销推荐数据加载
            $.ajax({
                url:"../data/changxiao.json",
                success:function(arr){
                    var str = ``;
                    $(".readySaleTop h2").html(arr.title);
                    $(".readySaleMax a img").attr('src', `${arr.img_src}`);
                    for(var i = 0; i < arr.data.length; i++){
                        str = `
                        <li>
                            <a href="">
                                <img src="${arr.data[i].img}" alt="">
                            </a>
                            <a href="" class="ProductName">${arr.data[i].ProductName}</a>
                            <div class="price">
                                <p class="price_1">${arr.data[i].price_1}</p> 
                            </div>
                            <button id="OrangeButton" oid="${arr.data[i].id}" class="iconfont">&#xe69a;</button>
                         </li>
                        `;
                        var node = $(str);
                        node.appendTo($(".readySale-ul"));
                    }
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        //畅销推荐加载完成
         //网红推荐数据加载
         $.ajax({
            url:"../data/wanghong.json",
            success:function(arr){
                var str = ``;
                $(".newProductTop h2").eq(1).html(arr.title);
                for(var j = 0; j < arr.data.length; j++){
                    str = `
                    <li>
                    <a href="" class="ProductImg">
                        <img src="${arr.data[j].img}" alt="">
                    </a>
                    <a href="" class="ProductName">${arr.data[j].ProductName}</a>
                    <div class="price">
                    <p class="price_1">${arr.data[j].price_1}</p> 
                    <p class="price_2">${arr.data[j].price_2}</p>
                    </div>
                    <button id="OrangeButton" oid="${arr.data[j].id}" class="iconfont">&#xe69a;</button>
                    </li>
                    `;
                    var node = $(str);
                    node.appendTo($(".newProductBottom_class_ul").eq(1));
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
        //网红数据加载结束
        //超级特惠数据加载
        $.ajax({
            url:"../data/chaoji.json",
            success:function(arr){
                var str = ``;
                $(".newProductTop h2").eq(2).html(arr.title);
                for(var j = 0; j < arr.data.length; j++){
                    str = `
                    <li>
                    <a href="" class="ProductImg">
                        <img src="${arr.data[j].img}" alt="">
                    </a>
                    <a href="" class="ProductName">${arr.data[j].ProductName}</a>
                    <div class="price">
                    <p class="price_1">${arr.data[j].price_1}</p> 
                    <p class="price_2">${arr.data[j].price_2}</p>
                    </div>
                    <button id="OrangeButton" oid="${arr.data[j].id}" class="iconfont">&#xe69a;</button>
                    </li>
                    `;
                    var node = $(str);
                    node.appendTo($(".newProductBottom_class_ul").eq(2));
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
        // 超级特惠加载完成
        })

        //选项卡部分的轮播图开始
            var as = $(".TabControl-1-Top a");
            var ds = $(".newProduct-1");
            as.mouseenter(function(){
                as.attr("class", '');
                ds.css("display", 'none').eq($(this).index()).css("display", 'block');
                $(this).attr("class",'active');
            })
        // 选项卡轮播图结束
        
        //选项卡数据加载
          var uls =  $("#TabControlBox-1 .newProductBottom_class_ul");
        //   alert(uls.length);
          //选项卡一的数据加载
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
                    node.appendTo(uls.eq(0));
                }
            },
            error:function(msg){
                console.log(msg);
            }
        }) 
        // 选项卡二的数据加载
        $.ajax({
            url:"../data/wanghong.json",
            success:function(arr){
                var str = ``;
                for(var j = 0; j < arr.data.length; j++){
                    str = `
                    <li>
                    <a href="" class="ProductImg">
                        <img src="${arr.data[j].img}" alt="">
                    </a>
                    <a href="" class="ProductName">${arr.data[j].ProductName}</a>
                    <div class="price">
                    <p class="price_1">${arr.data[j].price_1}</p> 
                    <p class="price_2">${arr.data[j].price_2}</p>
                    </div>
                    <button id="OrangeButton" oid="${arr.data[j].id}" class="iconfont">&#xe69a;</button>
                    </li>
                    `;
                    var node = $(str);
                    node.appendTo(uls.eq(1));
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
        //选项卡三的数据加载
        $.ajax({
            url:"../data/chaoji.json",
            success:function(arr){
                var str = ``;
                for(var j = 0; j < arr.data.length; j++){
                    str = `
                    <li>
                    <a href="" class="ProductImg">
                        <img src="${arr.data[j].img}" alt="">
                    </a>
                    <a href="" class="ProductName">${arr.data[j].ProductName}</a>
                    <div class="price">
                    <p class="price_1">${arr.data[j].price_1}</p> 
                    <p class="price_2">${arr.data[j].price_2}</p>
                    </div>
                    <button id="OrangeButton" oid="${arr.data[j].id}" class="iconfont">&#xe69a;</button>
                    </li>
                    `;
                    var node = $(str);
                    node.appendTo(uls.eq(2));
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
        //选项卡四的数据加载
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
                    node.appendTo(uls.eq(3));
                }
            },
            error:function(msg){
                console.log(msg);
            }
        }) 
        //选项卡数据加载完毕
        
        //选项卡一的轮播开始
        var x1 = true;
        var x2 = true;
        var x3 = true;
        var x4 = true;
        // 第一个
        $(".left-4").click(function(){
            leftRight_4 = 588;
            if(x1){
                leftRight_4 = -595;
                x1 = false;
            }else{
                leftRight_4 = 588;
                x1 = true;
            }
            // $(".newProductBottom_class_ul").css("left","-595px");
           uls.eq(0).animate({
                left: leftRight_4,
                
            },300,function(){
               
            });
         
        });
        $(".right-4").click(function(){
            if(x1){
                leftRight_4 = -595;
                x1 = false;
            }else{
                leftRight_4 = 588;
                x1 = true;
            }
            //uls.css("left","-595px");
           uls.eq(0).animate({
                left: leftRight_4,
            },300);
         
        });
        // 第二个
        $(".left-5").click(function(){
            leftRight_5 = 588;
            if(x2){
                leftRight_5 = -595;
                x2 = false;
            }else{
                leftRight_5 = 588;
                x2 = true;
            }
            // $(".newProductBottom_class_ul").css("left","-595px");
           uls.eq(1).animate({
                left: leftRight_5,
                
            },300,function(){
               
            });
         
        });
        $(".right-5").click(function(){
            if(x2){
                leftRight_5 = -595;
                x2 = false;
            }else{
                leftRight_5 = 588;
                x2 = true;
            }
            //uls.css("left","-595px");
           uls.eq(1).animate({
                left: leftRight_5,
            },300);
         
        });
        // 第三个
        $(".left-6").click(function(){
            leftRight_6 = 588;
            if(x3){
                leftRight_6 = -595;
                x3 = false;
            }else{
                leftRight_6 = 588;
                x3 = true;
            }
            // $(".newProductBottom_class_ul").css("left","-595px");
           uls.eq(2).animate({
                left: leftRight_6,
                
            },300,function(){
               
            });
         
        });
        $(".right-6").click(function(){
            if(x3){
                leftRight_6 = -595;
                x3 = false;
            }else{
                leftRight_6 = 588;
                x3 = true;
            }
            //uls.css("left","-595px");
           uls.eq(2).animate({
                left: leftRight_6,
            },300);
         
        });
       
    //    第四个
        $(".left-7").click(function(){
        leftRight_7 = 588;
        if(x4){
            leftRight_7 = -595;
            x4 = false;
        }else{
            leftRight_7 = 588;
            x4 = true;
        }
        // $(".newProductBottom_class_ul").css("left","-595px");
       uls.eq(3).animate({
            left: leftRight_7,
            
        },300,function(){
           
        });
     
    });
        $(".right-7").click(funct
            ion(){
        if(x4){
            leftRight_7 = -595;
            x4 = false;
        }else{
            leftRight_7 = 588;
            x4 = true;
        }
        //uls.css("left","-595px");
       uls.eq(3).animate({
            left: leftRight_7,
        },300);
     
    });
        // 选项卡一轮播结束

        // 第二部分选项卡开始
         var as2 = $(".TabControl-2-Top a");
         var ds2 = $(".newProduct-2");
         as2.mouseenter(function(){
            as2.attr("class", '');
            ds2.css("display", 'none').eq($(this).index()).css("display", 'block');
            $(this).attr("class",'active');
        })
        // 选项卡第二部分数据加载
          //选项卡一的数据加载
          var uls2 = $("#TabControlBox-2 .newProductBottom_class_ul");
          $.ajax({
            url:"../data/xinpin.json",
            success:function(arr){
                var str = ``;
                for(var j = arr.length-1; j >= 0; j--){
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
                    node.appendTo(uls2.eq(0));
                }
            },
            error:function(msg){
                console.log(msg);
            }
        }) 
        // 选项卡二的数据加载
          $.ajax({
            url:"../data/wanghong.json",
            success:function(arr){
                var str = ``;
                for(var j = arr.data.length-1; j >= 0; j--){
                    str = `
                    <li>
                    <a href="" class="ProductImg">
                        <img src="${arr.data[j].img}" alt="">
                    </a>
                    <a href="" class="ProductName">${arr.data[j].ProductName}</a>
                    <div class="price">
                    <p class="price_1">${arr.data[j].price_1}</p> 
                    <p class="price_2">${arr.data[j].price_2}</p>
                    </div>
                    <button id="OrangeButton" oid="${arr.data[j].id}" class="iconfont">&#xe69a;</button>
                    </li>
                    `;
                    var node = $(str);
                    node.appendTo(uls2.eq(1));
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
        //选项卡三的数据加载
          $.ajax({
            url:"../data/chaoji.json",
            success:function(arr){
                var str = ``;
                for(var j = arr.data.length-1; j >= 0; j--){
                    str = `
                    <li>
                    <a href="" class="ProductImg">
                        <img src="${arr.data[j].img}" alt="">
                    </a>
                    <a href="" class="ProductName">${arr.data[j].ProductName}</a>
                    <div class="price">
                    <p class="price_1">${arr.data[j].price_1}</p> 
                    <p class="price_2">${arr.data[j].price_2}</p>
                    </div>
                    <button id="OrangeButton" oid="${arr.data[j].id}" class="iconfont">&#xe69a;</button>
                    </li>
                    `;
                    var node = $(str);
                    node.appendTo(uls2.eq(2));
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
        //选项卡四的数据加载
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
                    node.appendTo(uls2.eq(3));
                }
            },
            error:function(msg){
                console.log(msg);
            }
        }) 
        //选项卡2数据加载完毕
    
        // 选项卡二轮播开始
        var x11 = true;
        var x22 = true;
        var x33 = true;
        var x44 = true;
        // 第一个
        $(".left-8").click(function(){
            leftRight_5 = 588;
            if(x11){
                leftRight_5 = -595;
                x11 = false;
            }else{
                leftRight_5 = 588;
                x11 = true;
            }
            // $(".newProductBottom_class_ul").css("left","-595px");
           uls2.eq(0).animate({
                left: leftRight_5,
                
            },300,function(){
               
            });
         
        });
        $(".right-8").click(function(){
            if(x11){
                leftRight_5 = -595;
                x11 = false;
            }else{
                leftRight_5 = 588;
                x11 = true;
            }
            //uls.css("left","-595px");
           uls2.eq(0).animate({
                left: leftRight_5,
            },300);
         
        });
        // 第二个
        $(".left-9").click(function(){
            leftRight_6 = 588;
            if(x22){
                leftRight_6 = -595;
                x22 = false;
            }else{
                leftRight_6 = 588;
                x22 = true;
            }
            // $(".newProductBottom_class_ul").css("left","-595px");
           uls2.eq(1).animate({
                left: leftRight_6,
                
            },300,function(){
               
            });
         
        });
        $(".right-9").click(function(){
            if(x22){
                leftRight_6 = -595;
                x22 = false;
            }else{
                leftRight_6 = 588;
                x22 = true;
            }
            //uls.css("left","-595px");
           uls2.eq(1).animate({
                left: leftRight_6,
            },300);
         
        });
        // 第三个
        $(".left-10").click(function(){
            leftRight_6 = 588;
            if(x33){
                leftRight_6 = -595;
                x33 = false;
            }else{
                leftRight_6 = 588;
                x33 = true;
            }
            // $(".newProductBottom_class_ul").css("left","-595px");
           uls2.eq(2).animate({
                left: leftRight_6,
                
            },300,function(){
               
            });
         
        });
        $(".right-10").click(function(){
            if(x33){
                leftRight_6 = -595;
                x33 = false;
            }else{
                leftRight_6 = 588;
                x33 = true;
            }
            //uls.css("left","-595px");
           uls2.eq(2).animate({
                left: leftRight_6,
            },300);
         
        });
       
    //    第四个
        $(".left-11").click(function(){
        leftRight_7 = 588;
        if(x44){
            leftRight_7 = -595;
            x44 = false;
        }else{
            leftRight_7 = 588;
            x44 = true;
        }
        // $(".newProductBottom_class_ul").css("left","-595px");
       uls2.eq(3).animate({
            left: leftRight_7,
            
        },300,function(){
           
        });
     
    });
        $(".right-11").click(function(){
        if(x44){
            leftRight_7 = -595;
            x44 = false;
        }else{
            leftRight_7 = 588;
            x44 = true;
        }
        //uls.css("left","-595px");
       uls2.eq(3).animate({
            left: leftRight_7,
        },300);
     
    });
        // 选项卡二轮播结束
    
        // 猜你喜欢数据加载
        $.ajax({
            url:"../data/wanghong.json",
            success:function(arr){
                var str = ``;
                // $(".likeyou-top h2").eq(0).html(arr.title);
                for(var j = 0; j < arr.data.length; j++){
                    str = `
                    <li>
                    <a href="" class="ProductImg">
                        <img src="${arr.data[j].img}" alt="">
                    </a>
                    <a href="" class="ProductName">${arr.data[j].ProductName}</a>
                    <div class="price">
                    <p class="price_1">${arr.data[j].price_1}</p> 
                    <p class="price_2">${arr.data[j].price_2}</p>
                    </div>
                    <button id="OrangeButton" oid="${arr.data[j].id}" class="iconfont">&#xe69a;</button>
                    </li>
                    `;
                    var node = $(str);
                    node.appendTo($(".likeyou"));
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
        // 猜你喜欢数据加载完毕
    
        // 猜你喜欢轮播
        var linyou1 = true;
        $(".left-12").click(function(){
            leftRight_7 = 588;
            if(linyou1){
                leftRight_7 = -595;
                linyou1 = false;
            }else{
                leftRight_7 = 588;
                linyou1 = true;
            }
            // $(".newProductBottom_class_ul").css("left","-595px");
           $('.likeyou').animate({
                left: leftRight_7,
                
            },300,function(){
               
            });
         
        });
        $(".right-12").click(function(){
            if(linyou1){
                leftRight_7 = -595;
                linyou1 = false;
            }else{
                leftRight_7 = 588;
                linyou1 = true;
            }
            //uls.css("left","-595px");
           $('.likeyou').animate({
                left: leftRight_7,
            },300);
         
        });
    
    
    
        //  热卖品牌数据加载
        $.ajax({
            url:"../data/remai.json",
            success:function(arr){
                var str = ``;
                $('.SellingbrandTop h2').html(arr.title);
                console.log(arr.data.length);
                for(var j = 0; j < arr.data.length; j++){
                    str = `
                    <li><a href=""><img src="${arr.data[j].img}" alt=""></a></li>
                    `;
                    var node = $(str);
                    node.appendTo($('.SellingbrandBottom-ul'));
                }
            },
            error:function(msg){
                console.log(msg);
            }
        }) 
    
    $('.newProductBottom_class_ul').on('click',"#OrangeButton",function(){
           alert($(this).attr("oid"));
        })
    }
    return {
      body
    }
  })
  