var nico = new NicoCSS({
    ele: document.getElementById("nico"), // スクリーンになる要素
    width: 400,                           // スクリーン幅
    height: 400,                          // スクリーン高さ
    font: 50,                             // フォントサイズ
    color: '#fff',                        // フォントカラー
    speed: 3                              // 流れるスピード
});
nico.loop(['88888', 'かわいい', 'なんだこれw']);