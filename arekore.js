/*
 * あれこれポップアップ Lite Ver. 1.12
 *
 *   original by ALIMIKA SATOMI     (http://www.remus.dti.ne.jp/~a-satomi/bunsyorou/ArekorePopup.html)
 *   Web API  by HeartRails Capture (http://capture.heartrails.com/)
 *   powered  by jQuery             (http://jquery.com/)
 *
 *   written  by pawa               (http://pawa.dojikko.com/)
 *
 *   このスクリプトに関して何かあれば「pawa」まで！
 *
 */

$(function()
{
    // --ユーザー初期設定------------------------------------------
    
    var url                 = "http://example.com/"; // 設置するWebページのホームページ
    var max_url             = 40;                    // リンク先URLの最大字数
    var offset_x            = 30;                    // ポップアップを離す距離（X）
    var offset_y            = 30;                    // ポップアップを離す距離（Y）
    var opacity             = 0.8;                   // ポップアップの不透明度
    var thumb_disp          = 1;                     // サムネイル画像を表示するか (1:Yes 0:No)
    var thumb_width         = 100;                   // リンク先のサムネイル画像の横幅
    var thumb_height        = 100;                   // リンク先のサムネイル画像の縦幅
    var decoration          = "round";               // サムネイル画像の装飾（shadow, border, round, none）
    var decoration_bg       = "222222";              // サムネイル画像の装飾の背景色（shadow または round 指定時に有効）
    var nothumb_bg_img_disp = 0;                     // サムネイル画像非表示時にもポップアップの背景画像を表示するか (1:Yes 0:No)
    var thumb_on_font_color = "#ffffff";             // サムネイル画像表示時のフォントのカラー
    
    // ------------------------------------------------------------
    
    
    var api_url   = "http://capture.heartrails.com/";
    var myaddress = new RegExp(url);
    
    var msg; // title属性の値の格納用
    
    // マウスオーバーで説明を表示
    $("[title]").mouseover(function()
    {
        msg = $(this).attr("title");
        msg = msg.replace(/　/g, "<br />");
        
        $(this).attr("title", ""); // 一旦title属性を空にする
        
        var url = $(this).attr("href");
        
        if( !url || !/^http/.test(url) || myaddress.test(url) )
        {
            if(msg.length > 0) $(this).after('<span class="arekore">' + msg + '</span>');
            else return;
        }
        else // URLがあって外部サイトの場合
        {
            var short_url;
            
            if(url.length > max_url) short_url = url.slice(0, max_url) + '...';
            else                     short_url = url;
            
            if( thumb_disp && !/\?/.test(url) )
            {
                var img_src;
                
                if(decoration == 'none')
                {
                    img_src = api_url + thumb_width + 'x' + thumb_height + '?' + url;
                }
                else { img_src = api_url + thumb_width + 'x' + thumb_height + '/' + decoration + '/bg=' + decoration_bg + '?' + url; }
                
                var img = '<img src="' + img_src + '" width="' + thumb_width + '" height="' + thumb_height + '" alt="サムネイル" />';
                
                $(this).after('<span class="arekore">' + img + msg + '<span class="arekore_url">' + short_url + '</span></span>');
            }
            else { $(this).after('<span class="arekore">' + msg + '<span class="arekore_url">' + short_url + '</span></span>'); }
        }
        
        var popup = $(this).parent().find("span.arekore");
        
        popup.css
        ({
            "top"     : $(this).offset().top  + offset_y + "px",
            "left"    : $(this).offset().left + offset_x + "px",
            "opacity" : opacity,
        });
        
        // サムネイル画像がない
        if( !popup.find("img").length )
        {
            if(!nothumb_bg_img_disp) popup.css("background-image", "none");
        }
        // サムネイル画像がある
        else { popup.css("color", thumb_on_font_color).find("span.arekore_url").css("color", thumb_on_font_color); }
    });
    
    // マウスアウトで説明を消去
    $("[title]").mouseout(function()
    {
        $(this).parent().find("span.arekore").remove();
        $(this).attr("title", msg); // title属性を元に戻す
    });
});
