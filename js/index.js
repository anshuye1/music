$(function(){
    var audio=$('audio').get(0);
    var index=0;
    var flag=true;

    //播放与暂停///////////////////////////
    $(audio).on('play',function(){
        $('.bofang').addClass('zanting');
        $('.header a').addClass('ani').addClass('rotate');

        $('.music-list li').removeClass('ge');
        $('.music-list li').eq(index).addClass('ge');
        $('.music-list li').children('.tp1').removeClass('tp2');
        $('.music-list li').eq(index).children('.tp1').addClass('tp2');
        $('.music-list li').children('.tp').removeClass('zt');
        $('.music-list li').eq(index).children('.tp').addClass('zt');
        $('.geci-inner').html(musicData[index].lrc);
        t=setInterval(move,200);
        if(!musicData[index].lrc){$('.geci-inner').html("未搜索到歌词<br>未搜索到歌词<br>未搜索到歌词<br>未搜索到歌词<br>未搜索到歌词<br>未搜索到歌词");clearInterval(t)}
    });
    $(audio).on('pause',function(){
        $('.bofang').removeClass('zanting');
        $('.header a').removeClass('ani').removeClass('rotate');
        $('.music-list li').children('.tp1').removeClass('tp2');
        $('.music-list li').children('.tp').removeClass('zt');
        clearInterval(t);
    });

    //时间发生变化////////////////////////
    $(audio).on('timeupdate',function(){
        $('.dangqian').text(time00(audio.currentTime));
        $('.zongshichang').text(time00(audio.duration));
        var w=(audio.currentTime/audio.duration)*($('.jindu').width());
        $('.jindu .yuan').css('left',w-8);
        $('.jd1').css('width',w-8);
    });
    function time00(v) {
        if(v%60<10){
            return v="0"+Math.floor(v/60)+":0"+Math.floor(v%60);
        }else{
            return v="0"+Math.floor(v/60)+":"+Math.floor(v%60);
        }
    }

    //音量发生改变时/////////////////////////////////
    $(audio).on('volumechange',function(){
        var w1=$('.yinliang .yuan').css('left',audio.volume*$('.yinliang').width()-8);
        $('.yl1').css('width',audio.volume*$('.yinliang').width()-8);
    });

    //点击播放////////////////////////////////
    $('.bofang').on('click',function(){
        if(audio.paused){
            audio.play()
        }else{
            audio.pause();
        }
    });
    $(audio).on('canplay',function(){
        $(audio).trigger('timeupdate');
    });
    //进度点击事件/////////////////////////////////////
    $('.jindu .yuan').on('mousedown',false);
    $('.jindu').on('click',function(e){
        $('.jindu .yuan').css('left',e.offsetX);
        audio.currentTime=(e.offsetX/$('.jindu').width())*audio.duration;
        // console.log((e.offsetX/$('.jindu').width())*audio.duration);
        // console.log(audio.currentTime)
    });

    //拖动播放////////////////////////////////////
    var w=$('.jindu').offset().left;

    $('.jindu .yuan').on('mousedown',function() {
        $('.jindu').on('mousemove', function (e) {
            var w1=e.pageX-w;
            if(e.pageX-w<0){ w1=0}
            if(e.pageX-w>$('.jindu').width()){w1=$('.jindu').width()}
            $('.jindu .yuan').css('left', w1);
            audio.currentTime = (w1 / $('.jindu').width()) * audio.duration;
        });
    });
    $('.jindu').on('mousedown',false);
    $(document).on('mouseup', function () {
        $('.jindu').off('mousemove');
    });
    //音量点击事件///////////////////////
    $('.yinliang .yuan').on('click',false);
    $('.yinliang').on('click',function(e){
        $('.yinliang .yuan').css('left',e.offsetX);
        audio.volume=e.offsetX/$('.yinliang').width();
    });

    //静音点击事件////////////////////////////////
    $('.jingyin').on('click',function(){
        $(this).toggleClass('jy');
        if(flag){
            x=audio.volume;
            audio.volume=0;
            flag=false;
        }else{
            $(this).removeClass('jy');
            audio.volume=x;
            flag=true;
        }
    });

    //音量拖动时间
    $('.yinliang .yuan').on('mousedown',false);
    var w=$('.yinliang').offset().left;

    $('.yinliang .yuan').on('mousedown',function() {
        $('.yinliang').on('mousemove', function (e) {
            var w1=e.pageX-w;
            if(e.pageX-w<0){ w1=0}
            if(e.pageX-w>$('.yinliang').width()){w1=$('.yinliang').width()}
            $('.yinliang .yuan').css('left', w1);
            audio.volume = w1 / $('.yinliang').width();
        });
    });
    $('.yinliang').on('mousedown',false);
    $(document).on('mouseup', function () {
        $('.yinliang').off('mousemove');
    });
    //上、下一首点击事件///////////////////
    var musicData=[
        {name:"黄龄&薛之谦-来日方长",src:"mp3/黄龄&薛之谦-来日方长.mp3",lrc:"<br>来日方长-(电影《我不是潘金莲》方圆版推广曲) - 黄龄&薛之谦<br>作词：常石磊<br>作曲：常石磊&袁娅维（Tia）<br>编曲：常石磊<br>制作人：常石磊<br>有些东西<br>你要是不提 我不去回忆<br>惯了借叹气喘息<br>再试着碰碰运气<br>总要过下去<br>总是妄想<br>借半生流离 换某人怜悯<br>只怪那输得起的<br>遇不上看得起的<br>找谁对不起<br>我说爱 或许是来日方长的事情<br>等不到人 也至少盼着自己<br>爱 终究是来日方长的秘密<br>答案 不过是场 好觉睡醒<br>有些东西<br>你要是不提 我不去回忆<br>只怪那输得起的<br>遇不上看得起的<br>找谁对不起<br>我说爱 或许是来日方长的事情<br>等不到人 也至少盼着自己<br>爱 终究是来日方长的秘密<br>答案 不过是场 好觉睡醒<br>答案 不过是场 好觉睡"},
        {name:"7妹-老九门",src:"mp3/7妹-老九门.mp3",lrc:"<br>老九门 - 7妹<br>词：雪无影<br>曲：雪无影<br>翻开古旧扉页<br>掸去旧土尘灰<br>开封的记忆可问谁<br>推开冰冷旧门<br>翻越沟壑天险<br>谁和谁的故事谁在书写<br>涉过白山黑水<br>探过密洞幽穴<br>有些事却总无言以对<br>阴与阳总相悖<br>因果是非轮回<br>欠下的债还需要去背<br>花红二月被情愫戏谑<br>宿命摆布最终都覆雪<br>望不穿且看不透的是你的秋水<br>逃不掉九门之决<br>涉过白山黑水<br>探过密洞幽穴<br>有些事却总无言以对<br>阴与阳总相悖<br>因果是非轮回<br>欠下的债还需要去背<br>花红二月被情愫戏谑<br>宿命摆布最终都覆雪<br>望不穿且看不透的是你的秋水<br>逃不掉九门之决<br>花红二月被情愫戏谑<br>宿命摆布最终都覆雪<br>望不穿且看不透的是你的秋水<br>逃不掉九门之决<br>逃不掉九门之决<br>逃不掉九门之决"},
        {name:"顾莉雅-寂寞花火",src:"mp3/顾莉雅-寂寞花火.mp3"},
        {name:"丁当-不是你的错",src:"mp3/丁当-不是你的错.mp3"},
        {name:"Tank-三国恋",src:"mp3/Tank-三国恋.mp3"},
        {name:"阿里郎-兰花指",src:"mp3/阿里郎-兰花指.mp3"},
        {name:"范玮琪-那些花儿",src:"mp3/范玮琪-那些花儿.mp3"},
        {name:"黄阅-折子戏",src:"mp3/黄阅-折子戏.mp3"}
    ];

    $('.qh .next').on('click',function(){
        index++;
        var bf=audio.paused;
        if(index===musicData.length){index=0}
        audio.src=musicData[index].src;
        $('.wz').text(musicData[index].name);
        $('.q-name').text(musicData[index].name);

        if(bf){audio.pause();}else{audio.play();}
        $('.music-list li').removeClass('ge');
        $('.music-list li').eq(index).addClass('ge');

    });
    $('.qh .before').on('click',function(){
        index--;
        var bf=audio.paused;
        if(index<0){index=musicData.length-1}
        audio.src=musicData[index].src;
        if(bf){audio.play();}else{audio.pause();}
        $('.music-list li').removeClass('ge');
        $('.music-list li').eq(index).addClass('ge');

    });

    //播放列表/////////////////////////
    $(musicData).each(function(i,v){
        $('<li>').text(musicData[i].name).appendTo('.music-list').append($('<div>').addClass('tp')).append($('<div>').addClass('tp1'))
            .append($('<div>').addClass('shanchu')).append($('<input type="checkbox">').addClass('xuanze'));
    });
    //列表点击事件////////////////////
    $('.music-list').on('click','li',function(){
        $('.wz').text($(this).text());
        $('.q-name').text($(this).text());
        if(audio.paused){
            audio.src="mp3/"+$(this).text()+".mp3";
            audio.play();
        }else{
            audio.pause();
        }
        index=$(this).index();
    });
    $('.shanchu').on('click',function(){
        if(confirm("您确定要删除吗？")){
            $(this).parent('li').remove()
        }else{
            return
        }
    });
    //循环模式 循环 单曲 随机////////////////////
    $(audio).on('ended',function(){
        if(index1===0){
            $('.qh .next').click();
            audio.play();
        }
        if(index===1){
            $('.bofang').click();
            audio.play();
        }
        if(index===2){
            var y=Math.floor(Math.random()*$('.music-list li').length);
            $('.music-list li').eq(y).click();
            audio.play();
        }
    });
    var index1=0;
    $('.xunhuan').on('click',function(){
        index1++;
        if(index1===3){index1=0};
        if(index1===1){
            $(this).addClass('dq');
        }else if(index1==2){
            $(this).removeClass('dq').addClass('sj');
        }else if(index1===0){
            $(this).removeClass('sj');
        }
    });

    //歌词/////////////////////////////////
    $('.geci-inner').html(musicData[0].lrc);
    var speed=1;
    function move(){
        if($('.ge-box').position().top<-500){
           clearInterval(t);
        }else{
            speed+=1;
            $('.geci-box').css('top',-speed);
        }
    }
    $('.like').on('click',function(){
        $(this).toggleClass('like1');
    });
    $('.hea1').on('click',function(){
        $(this).children('.like').toggleClass('like1');
    });
    $('#quanxuan').on('click',function(){
        if($('#quanxuan').get(0).checked){
            $('.xuanze').each(function(){
                $(this).get(0).checked=true;
            });
        }else{
            $('.xuanze').each(function(){
                $(this).get(0).checked=false;
            });
        }
    });
    $('.xuanze').on('click',function(){
           if($('.xuanze:checked').length==musicData.length){
               $('#quanxuan').get(0).checked=true;
           }else{
               $('#quanxuan').get(0).checked=false;
           }
    });
    $('.hea4').on('click',function(){
        if($('#quanxuan').get(0).checked){
            if(confirm("您确定要删除吗？")){
                $('.music-list li').remove()
            }else{
                return
            }
        }else{
            alert("未选择")
        }
    })
})
