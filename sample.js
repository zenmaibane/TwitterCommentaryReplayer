var nico = new NicoCSS({
    ele: document.getElementById("nico"), // スクリーンになる要素
    width: $(window).width() -20,                           // スクリーン幅
    height: $(window).height()-20,                          // スクリーン高さ
    font: 50,                             // フォントサイズ
    color: '#fff',                        // フォントカラー
    speed: 3                              // 流れるスピード
});;
nico.loop(['88888', 'かわいい', 'なんだこれw']);