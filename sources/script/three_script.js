
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { neko } from "./lib/neko-lib";
console.log("hi! three_script.js is loaded!")

// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init);

//現在のスクロール位置
let scroll_point = 0;

//角度変換用function
function radian(rot) {
    return (rot * Math.PI) / 180;
}

let model = null;

function init() {
    // マウス座標管理用のベクトルを作成
    const mouse = new THREE.Vector2();
    const pos = new THREE.Vector2();

    // canvas 要素の参照を取得する
    const canvas = document.querySelector('#myCanvas');
    // サイズ取得用のコンテナーdivを読み込む
    const container = document.querySelector('.book-contents__webgl-container')

    // サイズを指定
    const width = container.clientWidth;
    const height = container.clientHeight;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xff0000 );

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1000);

    // 初期化のために実行
    onResize();
    // リサイズイベント発生時に実行
    window.addEventListener('resize', onResize);

    function onResize() {
        // サイズを取得
        const width = container.clientWidth;
        const height = container.clientHeight;

        // レンダラーのサイズを調整する
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        //色味調整
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;

        // カメラのアスペクト比を正す
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    // 3D空間にグループを追加する
    const group = new THREE.Group();
    group.position.set(0, 0, 800-canvas.clientWidth)
    scene.add(group);

    //モデル読み込み
    const loader = new GLTFLoader();
    loader.load('./assets/model/2023.glb', (glb) => {
        model = glb.scene;
        glb.scene.scale.set(canvas.clientHeight * 4.7, canvas.clientHeight * 4.7, canvas.clientHeight * 4.7);
        glb.scene.position.set(0, 0, 0);
        glb.scene.rotation.x = radian(20)
        glb.scene.rotation.z = radian(-80)
        group.add(glb.scene);
        console.log('glb model loaded');
    });

    //軸確認
    var axes = new THREE.AxisHelper(1000);
    //scene.add(axes);

    // 球体
    const geometry = new THREE.SphereGeometry( 15, 32, 32 );
    const material = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
    const sphere = new THREE.Mesh( geometry, material );

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(1, 2, 2);
    scene.add(directionalLight);

    // 環境光源
    const ambientLight = new THREE.AmbientLight(0xAA3333);
    scene.add(ambientLight);

    //点光源
    const light = new THREE.PointLight(0xFFFFFF, 6, 800, 2);
    light.position.set( 100, -200, 500 );
    //scene.add(light);

    document.querySelector('.book-contents__webgl-container').appendChild(renderer.domElement);

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
        if (model != null) {
            group.rotation.y += radian(1);
        }
        // レンダリング
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}