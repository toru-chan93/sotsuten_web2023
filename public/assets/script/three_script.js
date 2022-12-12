/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./sources/script/lib/neko-lib.js":
/*!****************************************!*\
  !*** ./sources/script/lib/neko-lib.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"neko\": () => (/* binding */ neko)\n/* harmony export */ });\nlet neko;\n(function (neko) {\n  class Timer {\n    constructor(timer_length, continue_time = 0) {\n      this.reverse_mode = false;\n      this.running = false;\n\n      this.timer_length = timer_length;\n      this.continue_time = continue_time;\n      this.start_time = Date.now();\n    }\n\n    start() {\n      if (this.running) return;\n      this.start_time = Date.now();\n      this.running = true;\n    }\n\n    stop() {\n      if (!this.running) return;\n      this.continue_time = this.getElapsedTime();\n      this.running = false;\n    }\n\n    reverse(clamp = true) {\n      this.continue_time = this.getElapsedTime(clamp);\n      this.reverse_mode = !this.reverse_mode;\n      this.start_time = Date.now();\n    }\n\n    setTimerLength(Timer_length) {\n      this.timer_length = Timer_length;\n    }\n\n    setElapsedTime(Continue_time) {\n      this.continue_time = Continue_time;\n    }\n\n    getRunning() {\n      return this.running;\n    }\n\n    getReverse() {\n      return this.reverse_mode;\n    }\n\n    getCompleat() {\n      if (this.reverse_mode) {\n        if (this.getElapsedTime() < 0) {\n          return true;\n        }\n      } else {\n        if (this.getElapsedTime() > this.timer_length) {\n          return true;\n        }\n      }\n\n      return false;\n    }\n\n    getTimerLength() {\n      return this.timer_length;\n    }\n\n    getElapsedTime(clamp = false) {\n      if (!this.running) this.start_time = Date.now();\n\n      if (this.reverse_mode) {\n        if (clamp) {\n          if (this.continue_time - (Date.now() - this.start_time) < 0) {\n            return 0;\n          } else {\n            return this.continue_time - (Date.now() - this.start_time);\n          }\n        } else {\n          return this.continue_time - (Date.now() - this.start_time);\n        }\n      } else {\n        if (clamp) {\n          if (\n            Date.now() - this.start_time + this.continue_time >\n            this.getTimerLength()\n          ) {\n            return this.getTimerLength();\n          } else {\n            return Date.now() - this.start_time + this.continue_time;\n          }\n        } else {\n          return Date.now() - this.start_time + this.continue_time;\n        }\n      }\n    }\n\n    getProgress(clamp = true) {\n      let rate = this.getElapsedTime(clamp) / this.getTimerLength();\n\n      return rate;\n    }\n  }\n\n  class Easing {\n    static linear(t) {\n      return t;\n    }\n    static easeInQuad(t) {\n      return (t /= 1) * t;\n    }\n    static easeOutQuad(t) {\n      return -(t /= 1) * (t - 2);\n    }\n    static easeInOutQuad(t) {\n      if ((t /= 0.5) < 1) return 0.5 * t * t;\n      return -0.5 * (--t * (t - 2) - 1);\n    }\n    static easeInCubic(t) {\n      return (t /= 1) * t * t;\n    }\n    static easeOutCubic(t) {\n      return (t = t - 1) * t * t + 1;\n    }\n    static easeInOutCubic(t) {\n      if ((t /= 0.5) < 1) return 0.5 * t * t * t;\n      return 0.5 * ((t -= 2) * t * t + 2);\n    }\n    static easeInQuart(t) {\n      return (t /= 1) * t * t * t;\n    }\n    static easeOutQuart(t) {\n      return -((t = t - 1) * t * t * t - 1);\n    }\n    static easeInOutQuart(t) {\n      if ((t /= 0.5) < 1) return 0.5 * t * t * t * t;\n      return -0.5 * ((t -= 2) * t * t * t - 2);\n    }\n    static easeInQuint(t) {\n      return (t /= 1) * t * t * t * t;\n    }\n    static easeOutQuint(t) {\n      return (t = t - 1) * t * t * t * t + 1;\n    }\n    static easeInOutQuint(t) {\n      if ((t /= 0.5) < 1) return 0.5 * t * t * t * t * t;\n      return 0.5 * ((t -= 2) * t * t * t * t + 2);\n    }\n    static easeInSine(t) {\n      return -Math.cos(t * (Math.PI / 2)) + 1;\n    }\n    static easeOutSine(t) {\n      return Math.sin(t * (Math.PI / 2));\n    }\n    static easeInOutSine(t) {\n      return -0.5 * (Math.cos(Math.PI * t) - 1);\n    }\n    static easeInExpo(t) {\n      if (t == 0) return 0;\n      return Math.pow(2, 10 * (t - 1));\n    }\n    static easeOutExpo(t) {\n      if (t == 1) return 1;\n      return -Math.pow(2, -10 * t) + 1;\n    }\n    static easeInOutExpo(t) {\n      if (t == 0) return 0;\n      if (t == 1) return 1;\n      if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));\n      return 0.5 * (-Math.pow(2, -10 * --t) + 2);\n    }\n    static easeInCirc(t) {\n      return -(Math.sqrt(1 - (t /= 1) * t) - 1);\n    }\n    static easeOutCirc(t) {\n      return Math.sqrt(1 - (t = t - 1) * t);\n    }\n    static easeInOutCirc(t) {\n      if ((t /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);\n      return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);\n    }\n    static createEaseInElastic(s = 1.70158) {\n      return function (t) {\n        let p = 0;\n        let a = 1;\n        if (t == 0) return 0;\n        if ((t /= 1) == 1) return 1;\n        if (p == 0) p = 0.3;\n        if (a < 1) {\n          a = 1;\n          s = p / 4;\n        } else {\n          s = (p / (2 * Math.PI)) * Math.asin(1 / a);\n        }\n        return (\n          -a *\n          Math.pow(2, 10 * (t -= 1)) *\n          Math.sin(((t - s) * (2 * Math.PI)) / p)\n        );\n      };\n    }\n    static createEaseOutElastic(s = 1.70158) {\n      return function (t) {\n        let p = 0;\n        let a = 1;\n        if (t == 0) return 0;\n        if ((t /= 1) == 1) return 1;\n        if (p == 0) p = 0.3;\n        if (a < 1) {\n          a = 1;\n          s = p / 4;\n        } else {\n          s = (p / (2 * Math.PI)) * Math.asin(1 / a);\n        }\n        return (\n          a * Math.pow(2, -10 * t) * Math.sin(((t - s) * (2 * Math.PI)) / p) + 1\n        );\n      };\n    }\n    static createEaseInOutElastic(s = 1.70158) {\n      return function (t) {\n        let p = 0;\n        let a = 1;\n        if (t == 0) return 0;\n        if ((t /= 0.5) == 2) return 1;\n        if (p == 0) p = 0.3 * 1.5;\n        if (a < 1) {\n          a = 1;\n          s = p / 4;\n        } else {\n          s = (p / (2 * Math.PI)) * Math.asin(1 / a);\n        }\n        if (t < 1)\n          return (\n            -0.5 *\n            a *\n            Math.pow(2, 10 * (t -= 1)) *\n            Math.sin(((t - s) * (2 * Math.PI)) / p)\n          );\n        return (\n          a *\n            Math.pow(2, -10 * (t -= 1)) *\n            Math.sin(((t - s) * (2 * Math.PI)) / p) *\n            0.5 +\n          1\n        );\n      };\n    }\n    static easeInElastic(t) {\n      return Easing.defaultEaseInElastic(t);\n    }\n    static easeOutElastic(t) {\n      return Easing.defaultEaseOutElastic(t);\n    }\n    static easeInOutElastic(t) {\n      return Easing.defaultEaseInOutElastic(t);\n    }\n    static createEaseInBack(s = 1.70158) {\n      return function (t) {\n        return (t /= 1) * t * ((s + 1) * t - s);\n      };\n    }\n    static createEaseOutBack(s = 1.70158) {\n      return function (t) {\n        return (t = t - 1) * t * ((s + 1) * t + s) + 1;\n      };\n    }\n    static createEaseInOutBack(s = 1.70158) {\n      return function (t) {\n        if ((t /= 0.5) < 1) return 0.5 * t * t * (((s *= 1.525) + 1) * t - s);\n        return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);\n      };\n    }\n    static easeInBack(t) {\n      return Easing.defaultEaseInBack(t);\n    }\n    static easeOutBack(t) {\n      return Easing.defaultEaseOutBack(t);\n    }\n    static easeInOutBack(t) {\n      return Easing.defaultEaseInOutBack(t);\n    }\n    static easeInBounce(t) {\n      return 1 - Easing.easeOutBounce(1 - t);\n    }\n    static easeOutBounce(t) {\n      if ((t /= 1) < 1 / 2.75) {\n        return 7.5625 * t * t;\n      } else if (t < 2 / 2.75) {\n        return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;\n      } else if (t < 2.5 / 2.75) {\n        return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;\n      } else {\n        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;\n      }\n    }\n    static easeInOutBounce(t) {\n      if (t < 0.5) return Easing.easeInBounce(t * 2) * 0.5;\n      return Easing.easeOutBounce(t * 2 - 1) * 0.5 + 0.5;\n    }\n  }\n  Easing.defaultEaseInElastic = Easing.createEaseInElastic();\n  Easing.defaultEaseOutElastic = Easing.createEaseOutElastic();\n  Easing.defaultEaseInOutElastic = Easing.createEaseInOutElastic();\n  Easing.defaultEaseInBack = Easing.createEaseInBack();\n  Easing.defaultEaseOutBack = Easing.createEaseOutBack();\n  Easing.defaultEaseInOutBack = Easing.createEaseInOutBack();\n\n  class Tween {\n    constructor(start_value = 0) {\n      this.easing_value = start_value;\n\n      this.easing_event = [];\n      this.phase = 0;\n\n      this.eventListener = null;\n      this.timer = null;\n    }\n\n    /**\n     * @param {int} from\n     * @param {int} to\n     * @param {int} timer\n     * @param {EasingType} easing\n     */\n    eventPush(from, to, timer, easing = neko.Easing.linear) {\n      this.easing_event.push({\n        from: from,\n        to: to,\n        timer: timer,\n        easing: easing,\n      });\n    }\n\n    reset() {\n      this.timer = null;\n      this.phase = 0;\n    }\n\n    cancel() {\n      clearTimeout(this.eventListener);\n    }\n\n    execute() {\n      this.eventListener = window.setTimeout(\n        this.eventHandler(),\n        this.easing_event[this.phase].timer\n      );\n    }\n\n    getValue() {\n      this.eventHandler();\n      return this.easing_value;\n    }\n\n    getCompleat() {\n      if (this.phase < this.easing_event.length) return false;\n      else return true;\n    }\n\n    eventHandler() {\n      if (this.getCompleat()) return;\n\n      if (this.timer === null) {\n        this.timer = new neko.Timer(this.easing_event[this.phase].timer);\n        this.timer.start();\n      }\n\n      const distance = this.easing_event[this.phase].to - this.easing_event[this.phase].from;\n      const ease = this.easing_event[this.phase].easing( this.timer.getProgress());\n      this.easing_value = this.easing_event[this.phase].from + distance * ease;\n\n      if (this.timer.getCompleat()) {\n        this.phase++;\n        if (this.getCompleat()) {\n          this.cancel();\n          return;\n        }\n\n        this.timer = new neko.Timer(this.easing_event[this.phase].timer);\n        this.timer.start();\n        this.execute();\n      }\n    }\n  }\n\n  class Math_n {\n    static map(value, srcA, srcB, dstA, dstB, clamp = true) {\n      if (srcA === srcB) return dstA;\n      if (clamp) {\n        if (srcA < srcB) {\n          if (value < srcA) value = srcA;\n          else if (value > srcB) value = srcB;\n        } else {\n          if (value < srcB) value = srcB;\n          else if (value > srcA) value = srcA;\n        }\n      }\n      return ((value - srcA) * (dstB - dstA)) / (srcB - srcA) + dstA;\n    }\n  }\n\n  neko.Timer = Timer;\n  neko.Easing = Easing;\n  neko.Tween = Tween;\n  neko.Math = Math_n;\n})(neko || (neko = {}));\n\n\n//# sourceURL=webpack://gulp-study-0805/./sources/script/lib/neko-lib.js?");

/***/ }),

/***/ "./sources/script/three_script.js":
/*!****************************************!*\
  !*** ./sources/script/three_script.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_neko_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/neko-lib */ \"./sources/script/lib/neko-lib.js\");\n\nconsole.log(\"hi! three_script.js is loaded!\")\n\n// ページの読み込みを待つ\nwindow.addEventListener('DOMContentLoaded', init);\n\n//現在のスクロール位置\nlet scroll_point = 0;\n\n//pid制御用の変数指定\nconst Kp = 0.05;\nconst Ki = 0.0;\nconst Kd = 0.0;\n\nfunction init() {\n    // マウス座標管理用のベクトルを作成\n    const mouse = new THREE.Vector2();\n    const pos = new THREE.Vector2();\n\n    // canvas 要素の参照を取得する\n    const canvas = document.querySelector('#myCanvas');\n\n    // サイズを指定\n    const width = canvas.clientWidth;\n    const height = canvas.clientHeight;\n\n    // レンダラーを作成\n    const renderer = new THREE.WebGLRenderer({\n        canvas: canvas,\n    });\n    renderer.setPixelRatio(window.devicePixelRatio);\n    renderer.setSize(width, height);\n\n    // シーンを作成\n    const scene = new THREE.Scene();\n\n    // カメラを作成\n    const camera = new THREE.PerspectiveCamera(45, width / height);\n    camera.position.set(0, 0, +1000);\n\n    const geometry = new THREE.BoxBufferGeometry(50, 200, 200);\n\n\n    // 初期化のために実行\n    onResize();\n    // リサイズイベント発生時に実行\n    window.addEventListener('resize', onResize);\n\n    function onResize() {\n    // サイズを取得\n    const width = canvas.clientWidth;\n    const height = canvas.clientHeight;\n\n    // レンダラーのサイズを調整する\n    renderer.setPixelRatio(window.devicePixelRatio);\n    renderer.setSize(width, height);\n\n    // カメラのアスペクト比を正す\n    camera.aspect = width / height;\n    camera.updateProjectionMatrix();\n    }\n\n\n    // マウスとの交差を調べたいものは配列に格納する\n    const objectList = [];\n    const i_max = 151;\n    for (let i = 0; i < i_max; i++) {\n        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });\n\n        const object = new THREE.Mesh(geometry, material);\n        object.position.x = i * 150 - ((i_max - 1) * 150 / 2);\n        object.position.y = 0;\n        object.position.z = 0;\n        object.rotation.x = 0;\n        object.rotation.y = 0;\n        object.rotation.z = 0;\n        object.userData.timer = new _lib_neko_lib__WEBPACK_IMPORTED_MODULE_0__.neko.Timer(1500, -1);\n        object.userData.timer.reverse();\n        object.userData.timer.start();\n        scene.add(object);\n\n        // 配列に保存\n        objectList.push(object);\n    }\n\n    // 平行光源\n    const directionalLight = new THREE.DirectionalLight(0xffffff);\n    directionalLight.position.set(1, 1, 2);\n    scene.add(directionalLight);\n\n    // 環境光源\n    const ambientLight = new THREE.AmbientLight(0x333333);\n    scene.add(ambientLight);\n\n    // レイキャストを作成\n    const raycaster = new THREE.Raycaster();\n\n    canvas.addEventListener('mousemove', handleMouseMove);\n    tick();\n\n    // マウスを動かしたときのイベント\n    function handleMouseMove(event) {\n        const element = event.currentTarget;\n        // canvas要素上のXY座標\n        const x = event.clientX - element.offsetLeft;\n        const y = event.clientY - element.offsetTop;\n        // canvas要素の幅・高さ\n        const w = element.offsetWidth;\n        const h = element.offsetHeight;\n\n        // -1〜+1の範囲で現在のマウス座標を登録する\n        mouse.x = (x / w) * 2 - 1;\n        mouse.y = -(y / h) * 2 + 1;\n\n        pos.x = 0;\n        pos.y = 0;\n    }\n\n    // 毎フレーム時に実行されるループイベントです\n    function tick() {\n        //スクロール位置\n        const scroll_point_target = Math.floor(window.pageYOffset / 300) * 300;\n\n        const sc_y = scroll_point_target - scroll_point;\n        const sc_y1 = sc_y;\n        const sc_y2 = sc_y1;\n        const MVsc_y = Kp*sc_y+Ki*sc_y+Kd*((sc_y-sc_y1)-(sc_y1-sc_y2));\n\n        //console.log(sc_y + \" : \" + sc_y1 + \" : \" + sc_y2)\n\n        scroll_point += MVsc_y;\n\n        // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成\n        raycaster.setFromCamera(mouse, camera);\n\n        // その光線とぶつかったオブジェクトを得る\n        const intersects = raycaster.intersectObjects(objectList);\n\n        objectList.map((object, index) => {\n            // 交差しているオブジェクトが1つ以上存在し、\n            // 交差しているオブジェクトの1番目(最前面)のものだったら\n            if (intersects.length > 0 && object === intersects[0].object) {\n                // 色を赤くする\n                //object.material.color.setHex(0xff0000);\n                object.material.color.setHex(0x0000FF);\n                if (object.userData.timer.getReverse() && object.userData.timer.getRunning()) {\n                    if (object.userData.timer.getCompleat()) {\n                        object.userData.timer = new _lib_neko_lib__WEBPACK_IMPORTED_MODULE_0__.neko.Timer(400);\n                        object.userData.timer.start();\n                        console.log(object.userData.timer);\n                    } else {\n                        object.userData.timer.reverse();\n                    }\n                }\n                //console.log(object.userData.timer.getElapsedTime());\n            } else {\n                // それ以外は元の色にする\n                object.material.color.setHex(0xffffff);\n                if (!object.userData.timer.getReverse() && object.userData.timer.getRunning()) {\n                    if (object.userData.timer.getCompleat()) {\n                        object.userData.timer = new _lib_neko_lib__WEBPACK_IMPORTED_MODULE_0__.neko.Timer(400, 400);\n                        object.userData.timer.reverse();\n                        object.userData.timer.start();\n                        console.log(\"!\" + object.userData.timer.getElapsedTime());\n                    } else {\n                        object.userData.timer.reverse();\n                    }\n                }\n            }\n            object.rotation.y = -120 * _lib_neko_lib__WEBPACK_IMPORTED_MODULE_0__.neko.Easing.easeInOutQuad(object.userData.timer.getProgress()) * (Math.PI / 180);\n            object.rotation.x = -10* _lib_neko_lib__WEBPACK_IMPORTED_MODULE_0__.neko.Easing.easeInOutQuad(object.userData.timer.getProgress()) * (Math.PI / 180);\n            object.rotation.z = 15 * _lib_neko_lib__WEBPACK_IMPORTED_MODULE_0__.neko.Easing.easeInOutQuad(object.userData.timer.getProgress()) * (Math.PI / 180);\n            \n            object.position.x = scroll_point + index * 300 - ((i_max - 1) * 300 / 2);\n        });\n        //console.log(objectList[0].userData.timer.getElapsedTime());\n\n        // レンダリング\n        renderer.render(scene, camera);\n        requestAnimationFrame(tick);\n    }\n\n    canvas.addEventListener('click', function(){\n        objectList.map((object) => {\n            if(object.userData.timer.getRunning()) {\n                object.userData.timer.stop();\n            } else {\n                object.userData.timer.start();\n            }\n        });\n    })\n}\n\n//# sourceURL=webpack://gulp-study-0805/./sources/script/three_script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./sources/script/three_script.js");
/******/ 	
/******/ })()
;