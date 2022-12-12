import { neko } from "./lib/neko-lib";
console.log("hi! three_script.js is loaded!")

// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init);

//現在のスクロール位置
let scroll_point = 0;

//pid制御用の変数指定
const Kp = 0.05;
const Ki = 0.0;
const Kd = 0.0;

function init() {
    // マウス座標管理用のベクトルを作成
    const mouse = new THREE.Vector2();
    const pos = new THREE.Vector2();

    // canvas 要素の参照を取得する
    const canvas = document.querySelector('#myCanvas');

    // サイズを指定
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1000);

    const geometry = new THREE.BoxBufferGeometry(50, 200, 200);


    // 初期化のために実行
    onResize();
    // リサイズイベント発生時に実行
    window.addEventListener('resize', onResize);

    function onResize() {
    // サイズを取得
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // カメラのアスペクト比を正す
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    }


    // マウスとの交差を調べたいものは配列に格納する
    const objectList = [];
    const i_max = 151;
    for (let i = 0; i < i_max; i++) {
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

        const object = new THREE.Mesh(geometry, material);
        object.position.x = i * 150 - ((i_max - 1) * 150 / 2);
        object.position.y = 0;
        object.position.z = 0;
        object.rotation.x = 0;
        object.rotation.y = 0;
        object.rotation.z = 0;
        object.userData.timer = new neko.Timer(1500, -1);
        object.userData.timer.reverse();
        object.userData.timer.start();
        scene.add(object);

        // 配列に保存
        objectList.push(object);
    }

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 2);
    scene.add(directionalLight);

    // 環境光源
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    // レイキャストを作成
    const raycaster = new THREE.Raycaster();

    canvas.addEventListener('mousemove', handleMouseMove);
    tick();

    // マウスを動かしたときのイベント
    function handleMouseMove(event) {
        const element = event.currentTarget;
        // canvas要素上のXY座標
        const x = event.clientX - element.offsetLeft;
        const y = event.clientY - element.offsetTop;
        // canvas要素の幅・高さ
        const w = element.offsetWidth;
        const h = element.offsetHeight;

        // -1〜+1の範囲で現在のマウス座標を登録する
        mouse.x = (x / w) * 2 - 1;
        mouse.y = -(y / h) * 2 + 1;

        pos.x = 0;
        pos.y = 0;
    }

    // 毎フレーム時に実行されるループイベントです
    function tick() {
        //スクロール位置
        const scroll_point_target = Math.floor(window.pageYOffset / 300) * 300;

        const sc_y = scroll_point_target - scroll_point;
        const sc_y1 = sc_y;
        const sc_y2 = sc_y1;
        const MVsc_y = Kp*sc_y+Ki*sc_y+Kd*((sc_y-sc_y1)-(sc_y1-sc_y2));

        //console.log(sc_y + " : " + sc_y1 + " : " + sc_y2)

        scroll_point += MVsc_y;

        // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
        raycaster.setFromCamera(mouse, camera);

        // その光線とぶつかったオブジェクトを得る
        const intersects = raycaster.intersectObjects(objectList);

        objectList.map((object, index) => {
            // 交差しているオブジェクトが1つ以上存在し、
            // 交差しているオブジェクトの1番目(最前面)のものだったら
            if (intersects.length > 0 && object === intersects[0].object) {
                // 色を赤くする
                //object.material.color.setHex(0xff0000);
                object.material.color.setHex(0x0000FF);
                if (object.userData.timer.getReverse() && object.userData.timer.getRunning()) {
                    if (object.userData.timer.getCompleat()) {
                        object.userData.timer = new neko.Timer(400);
                        object.userData.timer.start();
                        console.log(object.userData.timer);
                    } else {
                        object.userData.timer.reverse();
                    }
                }
                //console.log(object.userData.timer.getElapsedTime());
            } else {
                // それ以外は元の色にする
                object.material.color.setHex(0xffffff);
                if (!object.userData.timer.getReverse() && object.userData.timer.getRunning()) {
                    if (object.userData.timer.getCompleat()) {
                        object.userData.timer = new neko.Timer(400, 400);
                        object.userData.timer.reverse();
                        object.userData.timer.start();
                        console.log("!" + object.userData.timer.getElapsedTime());
                    } else {
                        object.userData.timer.reverse();
                    }
                }
            }
            object.rotation.y = -120 * neko.Easing.easeInOutQuad(object.userData.timer.getProgress()) * (Math.PI / 180);
            object.rotation.x = -10* neko.Easing.easeInOutQuad(object.userData.timer.getProgress()) * (Math.PI / 180);
            object.rotation.z = 15 * neko.Easing.easeInOutQuad(object.userData.timer.getProgress()) * (Math.PI / 180);
            
            object.position.x = scroll_point + index * 300 - ((i_max - 1) * 300 / 2);
        });
        //console.log(objectList[0].userData.timer.getElapsedTime());

        // レンダリング
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

    canvas.addEventListener('click', function(){
        objectList.map((object) => {
            if(object.userData.timer.getRunning()) {
                object.userData.timer.stop();
            } else {
                object.userData.timer.start();
            }
        });
    })
}