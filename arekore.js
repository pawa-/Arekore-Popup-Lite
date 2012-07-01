/*
 * あれこれポップアップ Lite Ver. 1.20
 *
 *   original by ALIMIKA SATOMI     (http://www.remus.dti.ne.jp/~a-satomi/bunsyorou/ArekorePopup.html)
 *   Web API  by HeartRails Capture (http://capture.heartrails.com/)
 *   powered  by jQuery             (http://jquery.com/)
 *
 *   written  by pawa               (http://pawafuru.com/)
 *
 *   このスクリプトに関して何かあれば「pawa」まで！
 *
 */

jQuery(function($)
{
    // --ユーザー初期設定------------------------------------------

    var url                 = "http://example.com";  // 設置するWebページのルートURL
    var max_url             = 40;                    // リンク先URLの最大字数
    var offset_x            = 30;                    // ポップアップを離す距離（X）
    var offset_y            = 30;                    // ポップアップを離す距離（Y）
    var opacity             = 0.8;                   // ポップアップの不透明度
    var thumb_disp          = 1;                     // サムネイル画像を表示するか (1:Yes 0:No)
    var thumb_width         = 100;                   // リンク先のサムネイル画像の横幅
    var thumb_height        = 100;                   // リンク先のサムネイル画像の縦幅
    var decoration          = "round";               // サムネイル画像の装飾（shadow, border, round, none）
    var decoration_bg       = "4e4e4e";              // サムネイル画像の装飾の背景色（shadow または round 指定時に有効）
    var nothumb_bg_img_disp = 0;                     // サムネイル画像非表示時にもポップアップの背景画像を表示するか (1:Yes 0:No)
    var thumb_on_font_color = "#ffffff";             // サムネイル画像表示時のフォントのカラー

    // ------------------------------------------------------------


    var api_url   = "http://capture.heartrails.com/";
    var myaddress = new RegExp(url);

    var msg; // title属性の値の格納用

    // マウスオーバーで説明を表示
    $("[title]").mouseover(function()
    {
        var y = $(this).offset().top;
        var x = $(this).offset().left;

        msg = $(this).attr("title");
        msg = msg.replace(/　/g, "<br>");

        $(this).attr("title", ""); // 一旦title属性を空にする（ブラウザ標準のポップアップを表示させないため）

        var url = $(this).attr("href");

        // URLがないか自サイトの場合はtitle属性のテキストのみポップアップ
        if ( !url || !/^http/.test(url) || myaddress.test(url) )
        {
            if (msg.length > 0) $("body").prepend('<div class="arekore">' + msg + '</div>');
            else return;
        }
        else // URLがあって外部サイトの場合
        {
            var short_url;

            if (url.length > max_url) short_url = url.slice(0, max_url) + '...';
            else                      short_url = url;

            var img = "";

            if ( thumb_disp && !/\?/.test(url) )
            {
                var img_src = api_url + thumb_width + 'x' + thumb_height;

                if (decoration == 'none')
                {
                    img_src += '?' + url;
                }
                else { img_src += '/' + decoration + '/bg=' + decoration_bg + '?' + url; }

                img += '<img src="' + img_src + '" width="' + thumb_width + '" height="' + thumb_height + '" alt="サムネイル" />';
            }

            $("body").prepend('<div class="arekore">' + img + msg + '<span class="arekore_url">' + short_url + '</span></div>');
        }

        var popup = $("div.arekore");

        popup.css({
            "top"     : y + offset_y + "px",
            "left"    : x + offset_x + "px",
            "opacity" : opacity,
        });

        // サムネイル画像がない
        if ( !popup.find("img").length )
        {
            if (!nothumb_bg_img_disp) popup.css("background-image", "none");
        }
        // サムネイル画像がある
        else { popup.css("color", thumb_on_font_color).find("span.arekore_url").css("color", thumb_on_font_color); }
    });

    // マウスアウトで説明を消去
    $("[title]").mouseout(function()
    {
        $("div.arekore").remove();
        $(this).attr("title", msg); // title属性を元に戻す
    });
});
