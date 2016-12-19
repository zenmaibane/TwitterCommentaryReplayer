var nico = new NicoCSS({
    ele: document.getElementById("nico"), // スクリーンになる要素
    width: window.innerWidth,                           // スクリーン幅
    height: window.innerHeight,                          // スクリーン高さ
    font: 50,                             // フォントサイズ
    color: '#fff',                        // フォントカラー
    speed: 3                              // 流れるスピード
});
nico.loop(['88888', 'かわいい', 'なんだこれw']);