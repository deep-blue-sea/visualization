(function ($hx_exports, $global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var AssetManager = function() {
	this.assetMap = new haxe_ds_StringMap();
	this.listeners = new haxe_ds_StringMap();
	this.loadingPaths = [];
};
AssetManager.__name__ = true;
AssetManager.prototype = {
	get: function(path,onReady) {
	}
	,__class__: AssetManager
};
var AssetEvent = function(eventType,assetPath,payload) {
};
AssetEvent.__name__ = true;
AssetEvent.prototype = {
	__class__: AssetEvent
};
var CompileTime = function() { };
CompileTime.__name__ = true;
var Debug = function() { };
Debug.__name__ = true;
Debug["debugger"] = function() {
	debugger;
};
Debug.info = function(msg) {
};
Debug.warn = function(msg) {
};
Debug.error = function(msg) {
};
Debug.init = function() {
	haxe_Log.trace("haxe version " + "3.201",{ fileName : "Debug.hx", lineNumber : 71, className : "Debug", methodName : "init"});
	Debug.camera2d = new THREE.OrthographicCamera(-1,1,1,-1,0,1);
	Debug.scene2d = new THREE.Scene();
	Debug.debugTex = THREE.ImageUtils.loadTexture("assets/uv-grid.jpg");
	Debug.testPlaneMat = new THREE.MeshBasicMaterial({ map : Debug.debugTex, color : 16777215, wireframe : false, visible : false});
	Debug.testPlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1,1,1,1),Debug.testPlaneMat);
	Debug.testPlane.scale.x = 2.0;
	Debug.testPlane.scale.y = 2.0;
	Debug.testPlane.position.x = -1 + Debug.testPlane.scale.x * .5;
	Debug.testPlane.position.y = -1 + Debug.testPlane.scale.y * .5;
	Debug.scene2d.add(Debug.testPlane);
	var tmp;
	var _this = window.document;
	tmp = _this.createElement("script");
	var scriptEl = tmp;
	scriptEl.src = "lib/dat.gui/dat.gui.js";
	scriptEl.onload = Debug.setupDatGUI;
	window.document.body.appendChild(scriptEl);
};
Debug.onDatGUIReady = function(f) {
	if(Debug.gui != null) {
		f(Debug.gui);
		return;
	}
	Debug.guiReadyListeners.push(f);
};
Debug.setupDatGUI = function() {
	Debug.gui = new dat.GUI();
	Debug.gui.add(Debug.m.camera,"fov").min(1).max(180).name("FOV").onChange(function(x) {
		Debug.m.camera.updateProjectionMatrix();
	});
	Debug.gui.add(Debug.m,"sunSpringEnabled");
	Debug.gui.add(Debug.m,"sunSpringK").min(0).max(20);
	Debug.gui.add(Debug.m,"sunSpringDamp").min(0).max(1);
	Debug.gui.add(Debug.m.controls,"enabled").name("Mouse Controls");
	Debug.gui.add(Debug.testPlane.material,"visible").name("Test Plane");
	Debug.gui.add(Debug.m.globe.atmosphere,"visible").name("Atmosphere");
	Debug.gui.add(Debug.m.globe.earthMesh.material,"shininess").onChange(function(s) {
		(js_Boot.__cast(Debug.m.globe.earthMesh.material , objects_globe_GlobeMaterial)).set_shininess(s);
	}).name("Shininess");
	Debug.gui.add(Debug.m.globe.sun,"intensity").name("Intensity");
	Debug.gui.add(Debug.m.globe.vectorOverlayMaterial,"visible").name("Coastline Enabled");
	Debug.gui.add(Debug.m.globe.vectorOverlayMaterial,"opacity").min(0).max(1).name("Coastline");
	var _g = 0;
	var _g1 = Debug.guiReadyListeners;
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		f(Debug.gui);
	}
	Debug.gui.add(Debug.m.globe.gradientOverlayMaterial,"visible").name("Heatmap Enabled");
	Debug.gui.add(Debug.m.globe.gradientOverlayMaterial,"opacity").min(0).max(1).name("Heatmap Overlay");
	Debug.gui.add(Debug.m.globe.particleOverlayMaterial,"visible").name("Particle Enabled");
	Debug.gui.add(Debug.m.globe.particleOverlayMaterial,"opacity").min(0).max(1).name("Particle Overlay");
};
Debug.addOverlaySettings = function(particleFlowMap) {
	Debug.onDatGUIReady(function(gui) {
		if(Debug.overlaySettingsAdded) return;
		Debug.overlaySettingsAdded = true;
		gui.add(Debug.m.globe,"sequenceSpeed").min(0).max(0.01).step(0.000001).name("Playback Speed");
		var flowFolder = gui.addFolder("Particle Flow");
		flowFolder.add(particleFlowMap.processLastFrame.uniforms.halfLife,"value").min(0).max(5).step(0.01).name("Decay Half Life (s)");
		flowFolder.add(particleFlowMap.particleRenderObject.material.uniforms.particleOpacity,"value").min(0).max(1).step(0.001).name("Opacity (Additive)");
		flowFolder.add(particleFlowMap.particleRenderObject.material.uniforms.particleSize,"value").min(1).max(5).step(1).name("Size");
		flowFolder.add(particleFlowMap.particles.positionStepMaterial.uniforms.meanLifetime,"value").min(0).max(10).step(0.001).name("Mean Lifetime (s)");
		flowFolder.add(particleFlowMap.particles.positionStepMaterial.uniforms.velocityScale,"value").min(0).max(0.1).step(0.000001).name("Velocity Scale");
	});
};
Debug.addNextChapterBtn = function() {
	Debug.onDatGUIReady(function(gui) {
		if(Debug.nextChapterBtnAdded) return;
		Debug.nextChapterBtnAdded = true;
		var li = 1;
		var nextBtn;
		nextBtn = gui.add({ f : function() {
			Debug.m.setChapter(li++ % Debug.m.currentTrack.chapterCount);
			nextBtn.name("Next Chapter (" + li % Debug.m.currentTrack.chapterCount + ")");
		}},"f");
		nextBtn.name("Next Chapter (" + li % Debug.m.currentTrack.chapterCount + ")");
	});
};
Debug.update = function(dt_ms) {
};
Debug.render = function(dt_ms) {
	Debug.m.renderer.render(Debug.scene2d,Debug.camera2d);
};
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		var tmp;
		if(this.r.m != null && n >= 0 && n < this.r.m.length) tmp = this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
		return tmp;
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var GUI = function() { };
GUI.__name__ = true;
GUI.init = function(canvas,scene,camera) {
	GUI.canvas = canvas;
	GUI.scene = scene;
	GUI.camera = camera;
	var tmp;
	var _this = window.document;
	tmp = _this.createElement("div");
	GUI.container = tmp;
	GUI.container.style.position = "absolute";
	GUI.container.style.top = "0px";
	GUI.container.style.left = "0px";
	GUI.container.style.width = canvas.clientWidth + "px";
	GUI.container.style.height = canvas.clientHeight + "px";
	GUI.container.style.zIndex = "0";
	GUI.container.id = "globe-gui-container";
	canvas.parentElement.appendChild(GUI.container);
};
GUI.update = function() {
	if(GUI.bindings.length > 0) GUI.scene.updateMatrixWorld(false);
	var _g = 0;
	var _g1 = GUI.bindings;
	while(_g < _g1.length) {
		var b = _g1[_g];
		++_g;
		GUI._world.setFromMatrixPosition(b[1].matrixWorld);
		var screen = GUI._screen;
		if(screen == null) screen = new THREE.Vector2();
		GUI._proj.copy(GUI._world).project(GUI.camera);
		screen.set((GUI._proj.x + 1) * GUI.canvas.clientWidth * .5,(-GUI._proj.y + 1) * GUI.canvas.clientHeight * .5);
		b[0].style.left = GUI._screen.x + "px";
		b[0].style.top = GUI._screen.y + "px";
		var d = GUI._world.distanceTo(GUI.camera.position);
		d = (d - GUI.camera.near) / (GUI.camera.far - GUI.camera.near);
		d = d > 1.0?1.0:d < 0.0?0.0:d;
		b[0].style.zIndex = Std.string(Math.round((1 - d) * 16777216));
	}
};
GUI.add = function(element) {
	GUI.container.appendChild(element);
};
GUI.attach = function(element,object) {
	GUI.bindings.push([element,object]);
	GUI.container.appendChild(element);
	element.style.position = "absolute";
};
GUI.remove = function(element) {
	GUI.container.removeChild(element);
	var i = GUI.bindings.length - 1;
	while(i >= 0) {
		var b = GUI.bindings[i];
		if(b[0] == element) {
			GUI.bindings.splice(i,1);
			break;
		}
		i--;
	}
};
GUI.has = function(element) {
	var _g = 0;
	var _g1 = GUI.container.childNodes;
	while(_g < _g1.length) {
		var c = _g1[_g];
		++_g;
		if(c == element) return true;
	}
	return false;
};
GUI.onCanvasResized = function() {
	GUI.container.style.width = GUI.canvas.clientWidth + "px";
	GUI.container.style.height = GUI.canvas.clientHeight + "px";
	GUI.update();
};
GUI.worldToScreen = function(world,screen) {
	if(screen == null) screen = new THREE.Vector2();
	GUI._proj.copy(world).project(GUI.camera);
	screen.set((GUI._proj.x + 1) * GUI.canvas.clientWidth * .5,(-GUI._proj.y + 1) * GUI.canvas.clientHeight * .5);
	return screen;
};
var _$GUI_Binding_$Impl_$ = {};
_$GUI_Binding_$Impl_$.__name__ = true;
_$GUI_Binding_$Impl_$.__properties__ = {set_object:"set_object",get_object:"get_object",set_element:"set_element",get_element:"get_element"}
_$GUI_Binding_$Impl_$._new = function(element,object) {
	return [element,object];
};
_$GUI_Binding_$Impl_$.get_element = function(this1) {
	return this1[0];
};
_$GUI_Binding_$Impl_$.set_element = function(this1,v) {
	return this1[0] = v;
};
_$GUI_Binding_$Impl_$.get_object = function(this1) {
	return this1[1];
};
_$GUI_Binding_$Impl_$.set_object = function(this1,v) {
	return this1[1] = v;
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
_$List_ListIterator.__name__ = true;
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
var Main = $hx_exports.Globe = function(container,assetRoot) {
	if(assetRoot == null) assetRoot = "assets/globe";
	this.sunAngularVelocity = 0;
	this.lastFrame_ms = -1;
	this.globeRadius = 1.0;
	this.initialized = false;
	this.sunSpringDamp = 0.1;
	this.sunSpringK = 0.85;
	this.sunSpringEnabled = false;
	if(container == null) container = window.document.body;
	this.container = container;
	this.assetRoot = assetRoot;
	var tmp;
	var _this = window.document;
	tmp = _this.createElement("canvas");
	this.canvas = tmp;
	container.appendChild(this.canvas);
	this.canvas.width = this.container.clientWidth;
	this.canvas.height = this.container.clientHeight;
	this.assets = new AssetManager();
	this.mouse = new THREE.Vector2();
	try {
		this.renderer = new THREE.WebGLRenderer({ canvas : this.canvas, antialias : false, depth : true, preserveDrawingBuffer : false, alpha : false});
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return;
	}
	var tmp1;
	var tmp2;
	var this1;
	this1 = new THREE.Color();
	this1.setHex(0);
	tmp2 = this1;
	tmp1 = tmp2;
	this.renderer.setClearColor(tmp1,1);
	this.renderer.autoClear = false;
	this.scene = new THREE.Scene();
	this.globe = new objects_globe_Globe(this.renderer,assetRoot,this.globeRadius);
	this.scene.add(this.globe);
	this.camera = new objects_globe_GlobeCamera(this.globe,60,this.container.clientWidth / this.container.clientHeight,this.globeRadius / 100,this.globeRadius * 10);
	this.camera.position.z = this.camera.distanceForApparentRadius(0.75);
	this.controls = new THREE.OrbitControls(this.camera,container);
	this.controls.zoomSpeed = 0.1;
	this.controls.noPan = true;
	this.controls.minDistance = this.globe.radius * 1.08;
	Debug.m = this;
	Debug.init();
	GUI.init(this.canvas,this.scene,this.camera);
	window.addEventListener("resize",$bind(this,this.onWindowResize),false);
	this.canvas.addEventListener("mousedown",$bind(this,this.onMouseDown),false);
	this.canvas.addEventListener("mouseup",$bind(this,this.onMouseUp),false);
	this.canvas.addEventListener("mousemove",$bind(this,this.onMouseMove),false);
	window.requestAnimationFrame($bind(this,this.update));
	this.initialized = true;
};
Main.__name__ = true;
Main.main = function() {
};
Main.prototype = {
	setTrack: function(name,config) {
		if(config == null) config = { };
		if(this.currentTrack != null) this.currentTrack.cleanup();
		var state = this;
		this.currentTrack = tracks_Track.create(name,state,config);
		Debug.addNextChapterBtn();
	}
	,setChapter: function(i) {
		this.currentTrack.setChapter(i);
	}
	,update: function(t_ms) {
		var time_s = t_ms / 1000;
		var dt_ms = this.lastFrame_ms < 0?16.6666666666666679:Math.min(t_ms - this.lastFrame_ms,100.);
		this.lastFrame_ms = t_ms;
		motion_actuators_SimpleActuator.stage_onEnterFrame();
		this.globe.update(dt_ms);
		if(this.sunSpringEnabled) this.sunCameraSpring(dt_ms);
		if(this.currentTrack != null) this.currentTrack.update(dt_ms);
		this.renderer.render(this.scene,this.camera,null,true);
		Debug.update(dt_ms);
		Debug.render(dt_ms);
		GUI.update();
		window.requestAnimationFrame($bind(this,this.update));
	}
	,render: function(dt_ms) {
		this.renderer.render(this.scene,this.camera,null,true);
	}
	,sunCameraSpring: function(dt_ms) {
		var dt_s = dt_ms / 1000;
		var cameraSolarAngle = Math.atan2(-this.camera.position.z,this.camera.position.x);
		var tmp;
		var _this = this.globe;
		tmp = Math.atan2(-_this.sun.position.z,_this.sun.position.x);
		var da = tmp - cameraSolarAngle;
		da = Math.atan2(Math.sin(da),Math.cos(da));
		if(da == NaN) da = 0;
		var aa = -this.sunSpringK * da;
		this.sunAngularVelocity += aa * dt_s;
		var _g = this.globe;
		var v = Math.atan2(-_g.sun.position.z,_g.sun.position.x) + this.sunAngularVelocity * dt_s;
		_g.sun.position.set(Math.cos(v) * _g.sunDistance,0,-Math.sin(v) * _g.sunDistance);
		v;
		this.sunAngularVelocity *= 1 - this.sunSpringDamp;
	}
	,fitCanvas: function() {
		this.canvas.width = this.container.clientWidth;
		this.canvas.height = this.container.clientHeight;
	}
	,handleResize: function() {
		this.canvas.width = this.container.clientWidth;
		this.canvas.height = this.container.clientHeight;
		this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setViewport(0,0,this.container.clientWidth,this.container.clientHeight);
		GUI.onCanvasResized();
	}
	,handleMouseEvent: function(e) {
		var canvasBounds = this.canvas.getBoundingClientRect();
		var nx = (e.pageX - canvasBounds.left) / canvasBounds.width;
		var ny = 1 - (e.pageY - canvasBounds.top) / canvasBounds.height;
		this.mouse.set(nx * 2 - 1,ny * 2 - 1);
	}
	,onWindowResize: function(e) {
		this.handleResize();
	}
	,onMouseDown: function(e) {
		this.handleMouseEvent(e);
		if(this.currentTrack != null) this.currentTrack.onMouseDown(this.mouse);
	}
	,onMouseUp: function(e) {
		this.handleMouseEvent(e);
		if(this.currentTrack != null) this.currentTrack.onMouseUp(this.mouse);
	}
	,onMouseMove: function(e) {
		this.handleMouseEvent(e);
		if(this.currentTrack != null) this.currentTrack.onMouseMove(this.mouse);
	}
	,getAspect: function() {
		return this.container.clientWidth / this.container.clientHeight;
	}
	,getWidth: function() {
		return this.container.clientWidth;
	}
	,getHeight: function() {
		return this.container.clientHeight;
	}
	,__class__: Main
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
var Type = function() { };
Type.__name__ = true;
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
var _$VesselSequence_VesselState_$Impl_$ = {};
_$VesselSequence_VesselState_$Impl_$.__name__ = true;
_$VesselSequence_VesselState_$Impl_$.__properties__ = {set_uid:"set_uid",get_uid:"get_uid",set_heading_deg:"set_heading_deg",get_heading_deg:"get_heading_deg",set_coordinate:"set_coordinate",get_coordinate:"get_coordinate"}
_$VesselSequence_VesselState_$Impl_$.get_coordinate = function(this1) {
	return new gis__$GeoCoord_CGeoCoord(this1[0],this1[1],0);
};
_$VesselSequence_VesselState_$Impl_$.set_coordinate = function(this1,v) {
	this1[0] = v["long"];
	this1[1] = v.lat;
	return v;
};
_$VesselSequence_VesselState_$Impl_$.get_heading_deg = function(this1) {
	return this1[2];
};
_$VesselSequence_VesselState_$Impl_$.set_heading_deg = function(this1,v) {
	return this1[2] = v;
};
_$VesselSequence_VesselState_$Impl_$.get_uid = function(this1) {
	return this1[3] | 0;
};
_$VesselSequence_VesselState_$Impl_$.set_uid = function(this1,v) {
	var tmp;
	var x = this1[3] = v;
	tmp = x | 0;
	return tmp;
};
_$VesselSequence_VesselState_$Impl_$.fromObject = function(obj) {
	var vs = [];
	var v = obj.coordinate;
	vs[0] = v["long"];
	vs[1] = v.lat;
	var v1 = obj.heading_deg;
	vs[2] = v1;
	var v2 = obj.uid;
	vs[3] = v2;
	return vs;
};
var geometry_RibbonGeometry = function(primary,widthFunc,normalFunc,slices,stacks) {
	if(stacks == null) stacks = 1;
	if(slices == null) slices = 100;
	this._w3 = new THREE.Vector3();
	this._v3 = new THREE.Vector3();
	this._u3 = new THREE.Vector3();
	this.curveFraction = 1;
	THREE.Geometry.call(this);
	this.primary = primary;
	this.slices = slices;
	this.stacks = stacks;
	this.widthFunc = widthFunc;
	this.normalFunc = normalFunc != null?normalFunc:$bind(this,this.defaultNormal);
	this.leftCurve = this.createLoopFreeOffsetCurve(primary,1,slices * 2);
	this.rightCurve = this.createLoopFreeOffsetCurve(primary,0,slices * 2);
	this.computeVertices(true);
	this.cumulativeLengths = [];
	this.totalLength = 0;
	var lastPoint = null;
	var _g1 = 0;
	var _g = slices + 1;
	while(_g1 < _g) {
		var j = _g1++;
		var u = j / slices;
		var p = primary.getPoint(u);
		if(lastPoint != null) this.totalLength += p.distanceTo(lastPoint);
		this.cumulativeLengths.push(this.totalLength);
		lastPoint = p;
	}
	var faces = this.faces;
	var uvs = this.faceVertexUvs[0];
	var nuvs = this.faceVertexUvs[1] = [];
	var sliceCount = slices + 1;
	var _g2 = 0;
	while(_g2 < stacks) {
		var i = _g2++;
		var _g11 = 0;
		while(_g11 < slices) {
			var j1 = _g11++;
			var a = i * sliceCount + j1;
			var b = i * sliceCount + j1 + 1;
			var c = (i + 1) * sliceCount + j1 + 1;
			var d = (i + 1) * sliceCount + j1;
			var u0 = j1 / slices;
			var u1 = (j1 + 1) / slices;
			var t0 = i / stacks;
			var t1 = (i + 1) / stacks;
			var uva = new THREE.Vector2(u0,t0);
			var uvb = new THREE.Vector2(u1,t0);
			var uvc = new THREE.Vector2(u1,t1);
			var uvd = new THREE.Vector2(u0,t1);
			var nu0 = this.cumulativeLengths[j1] / this.totalLength;
			var nu1 = this.cumulativeLengths[j1 + 1] / this.totalLength;
			var nuva = new THREE.Vector2(nu0,t0);
			var nuvb = new THREE.Vector2(nu1,t0);
			var nuvc = new THREE.Vector2(nu1,t1);
			var nuvd = new THREE.Vector2(nu0,t1);
			var f1 = new THREE.Face3(a,b,d);
			var f2 = new THREE.Face3(b,c,d);
			faces.push(f1);
			uvs.push([uva,uvb,uvd]);
			nuvs.push([nuva,nuvb,nuvd]);
			faces.push(f2);
			uvs.push([uvb.clone(),uvc,uvd.clone()]);
			nuvs.push([nuvb.clone(),nuvc,nuvd.clone()]);
		}
	}
	this.computeFaceNormals();
	this.computeVertexNormals();
};
geometry_RibbonGeometry.__name__ = true;
geometry_RibbonGeometry.__super__ = THREE.Geometry;
geometry_RibbonGeometry.prototype = $extend(THREE.Geometry.prototype,{
	computeVertices: function(allocate) {
		if(allocate == null) allocate = false;
		var vIdx = 0;
		var _g1 = 0;
		var _g = this.stacks + 1;
		while(_g1 < _g) {
			var i = _g1++;
			var v = i / this.stacks;
			var _g3 = 0;
			var _g2 = this.slices + 1;
			while(_g3 < _g2) {
				var j = _g3++;
				var u = j / this.slices;
				var v3 = allocate?new THREE.Vector3():this.vertices[vIdx];
				this.vertices[vIdx] = this.ribbonFuncFromOffsets(u,v,v3);
				vIdx++;
			}
		}
	}
	,defaultNormal: function(u,t,p,tan,primary) {
		return new THREE.Vector3(-1,0,0);
	}
	,ribbonFunc: function(u,t,v3) {
		u = THREE.Math.clamp(u - (1 - this.curveFraction),0,1);
		t = t - 0.5;
		var w = this.widthFunc(u,t);
		var p = this.primary.getPoint(u);
		var tan = this.primary.getTangent(u);
		v3.crossVectors(this.normalFunc(u,t,p,tan,this.primary),tan);
		v3.normalize();
		v3.multiplyScalar(w * t);
		v3.add(p);
		return v3;
	}
	,ribbonFuncFromOffsets: function(u,t,v3) {
		u = THREE.Math.clamp(u - (1 - this.curveFraction),0,1);
		return v3.lerpVectors(this.rightCurve.getPoint(u),this.leftCurve.getPoint(u),t);
	}
	,createLoopFreeOffsetCurve: function(primary,side,samples) {
		var offsetPoints = [];
		var _g1 = 0;
		var _g = samples + 1;
		while(_g1 < _g) {
			var i = _g1++;
			var u = i / samples;
			offsetPoints.push(this.ribbonFunc(u,side,new THREE.Vector3()));
		}
		var offsetSpline = new THREE.SplineCurve3(offsetPoints);
		return this.removeOffsetLoops(offsetSpline,primary,samples * 2);
	}
	,removeOffsetLoops: function(offset,primary,samples) {
		var clipBoundaries = [];
		var s;
		var e;
		var adj = false;
		var i = 0;
		while(i < samples + 1) {
			var u = i / samples;
			var primaryTangent = primary.getTangent(u);
			var offsetTangent = offset.getTangent(u);
			var dot = offsetTangent.dot(primaryTangent);
			if(dot < 0) {
				if(!adj) s = u;
				adj = true;
			} else {
				if(adj) {
					e = u;
					var overlapBounds = this.findOverlapBounds(s,e,primary,offset);
					clipBoundaries.push(overlapBounds);
					i = Math.round(overlapBounds[1] * samples);
				}
				adj = false;
			}
			i++;
		}
		var nonLoopPoints = [];
		var _g1 = 0;
		var _g = samples + 1;
		while(_g1 < _g) {
			var i1 = _g1++;
			var u1 = i1 / samples;
			var v = u1;
			var _g2 = 0;
			while(_g2 < clipBoundaries.length) {
				var cb = clipBoundaries[_g2];
				++_g2;
				var s1 = cb[0];
				var e1 = cb[1];
				if(u1 > s1 && u1 < e1) {
					v = u1 - s1 < e1 - u1?s1:e1;
					break;
				}
			}
			nonLoopPoints.push(offset.getPoint(v));
		}
		return new math_LerpCurve3(nonLoopPoints);
	}
	,findOverlapBounds: function(s,e,primary,offset) {
		var n = 0;
		while(s >= 0 && n++ < 1000) {
			var s1 = offset.getPoint(s);
			var m = 0;
			var outside = false;
			while(e <= 1 && m++ < 1000) {
				var e0 = primary.getPoint(e);
				var e1 = offset.getPoint(e);
				var e0e1 = this._u3.subVectors(e1,e0);
				var e1s1 = this._v3.subVectors(s1,e1);
				var proj = e1s1.dot(e0e1);
				var p = e0e1.normalize().multiplyScalar(proj).add(e1);
				var ps1 = this._w3.subVectors(s1,p);
				var tan = primary.getTangent(e);
				var dot = ps1.dot(tan);
				if(dot <= 0) {
					if(proj >= 0) outside = true;
					break;
				}
				e += 0.0005;
			}
			if(outside) break;
			s -= 5e-05;
		}
		if(s < 0) s = 0;
		if(e > 1) e = 1;
		return [s,e];
	}
	,set_curveFraction: function(v) {
		this.curveFraction = v;
		this.dynamic = true;
		this.computeVertices();
		this.computeFaceNormals();
		this.computeVertexNormals();
		this.verticesNeedUpdate = true;
		this.uvsNeedUpdate = true;
		this.normalsNeedUpdate = true;
		return this.curveFraction;
	}
	,__class__: geometry_RibbonGeometry
	,__properties__: {set_curveFraction:"set_curveFraction"}
});
var gis__$GeoCoord_CGeoCoord = function(longitudeEast,latitudeNorth,altitude) {
	if(altitude == null) altitude = 0;
	if(latitudeNorth == null) latitudeNorth = 0;
	if(longitudeEast == null) longitudeEast = 0;
	this["long"] = longitudeEast;
	this.lat = latitudeNorth;
	this.alt = altitude;
};
gis__$GeoCoord_CGeoCoord.__name__ = true;
gis__$GeoCoord_CGeoCoord.prototype = {
	setLong: function(v) {
		this["long"] = v;
		return this;
	}
	,setLat: function(v) {
		this.lat = v;
		return this;
	}
	,setAlt: function(v) {
		this.alt = v;
		return this;
	}
	,clone: function() {
		return new gis__$GeoCoord_CGeoCoord(this["long"],this.lat,this.alt);
	}
	,__class__: gis__$GeoCoord_CGeoCoord
};
var gis_Constants = function() { };
gis_Constants.__name__ = true;
var gis__$GeoCoord_GeoCoord_$Impl_$ = {};
gis__$GeoCoord_GeoCoord_$Impl_$.__name__ = true;
gis__$GeoCoord_GeoCoord_$Impl_$._new = function(longitudeEast,latitudeNorth,altitude) {
	if(altitude == null) altitude = 0;
	if(latitudeNorth == null) latitudeNorth = 0;
	if(longitudeEast == null) longitudeEast = 0;
	return new gis__$GeoCoord_CGeoCoord(longitudeEast,latitudeNorth,altitude);
};
gis__$GeoCoord_GeoCoord_$Impl_$.toArray = function(this1) {
	return [this1["long"],this1.lat,this1.alt];
};
gis__$GeoCoord_GeoCoord_$Impl_$.fromArray = function(arr) {
	var tmp;
	var longitudeEast = arr[0];
	var latitudeNorth = arr[1];
	tmp = new gis__$GeoCoord_CGeoCoord(longitudeEast,latitudeNorth,arr[2] != null?arr[2]:0);
	return tmp;
};
var gis_geojson_GeoJsonObjectType = { __ename__ : true, __constructs__ : ["Feature","FeatureCollection","GeometryCollection","LineString","MultiLineString","MultiPoint","MultiPolygon","Point","Polygon"] };
gis_geojson_GeoJsonObjectType.Feature = function(f) { var $x = ["Feature",0,f]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeoJsonObjectType.FeatureCollection = function(f) { var $x = ["FeatureCollection",1,f]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeoJsonObjectType.GeometryCollection = function(g) { var $x = ["GeometryCollection",2,g]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeoJsonObjectType.LineString = function(l) { var $x = ["LineString",3,l]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeoJsonObjectType.MultiLineString = function(m) { var $x = ["MultiLineString",4,m]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeoJsonObjectType.MultiPoint = function(m) { var $x = ["MultiPoint",5,m]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeoJsonObjectType.MultiPolygon = function(m) { var $x = ["MultiPolygon",6,m]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeoJsonObjectType.Point = function(p) { var $x = ["Point",7,p]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeoJsonObjectType.Polygon = function(p) { var $x = ["Polygon",8,p]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
var gis_geojson_GeometryObjectType = { __ename__ : true, __constructs__ : ["GeometryCollection","LineString","MultiLineString","MultiPoint","MultiPolygon","Point","Polygon"] };
gis_geojson_GeometryObjectType.GeometryCollection = function(g) { var $x = ["GeometryCollection",0,g]; $x.__enum__ = gis_geojson_GeometryObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeometryObjectType.LineString = function(l) { var $x = ["LineString",1,l]; $x.__enum__ = gis_geojson_GeometryObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeometryObjectType.MultiLineString = function(m) { var $x = ["MultiLineString",2,m]; $x.__enum__ = gis_geojson_GeometryObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeometryObjectType.MultiPoint = function(m) { var $x = ["MultiPoint",3,m]; $x.__enum__ = gis_geojson_GeometryObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeometryObjectType.MultiPolygon = function(m) { var $x = ["MultiPolygon",4,m]; $x.__enum__ = gis_geojson_GeometryObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeometryObjectType.Point = function(p) { var $x = ["Point",5,p]; $x.__enum__ = gis_geojson_GeometryObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeometryObjectType.Polygon = function(p) { var $x = ["Polygon",6,p]; $x.__enum__ = gis_geojson_GeometryObjectType; $x.toString = $estr; return $x; };
var gis_geojson_CoordinateReferenceSystemType = { __ename__ : true, __constructs__ : ["LinkedCoordinateReferenceSystem","NamedCoordinateReferenceSystem"] };
gis_geojson_CoordinateReferenceSystemType.LinkedCoordinateReferenceSystem = function(l) { var $x = ["LinkedCoordinateReferenceSystem",0,l]; $x.__enum__ = gis_geojson_CoordinateReferenceSystemType; $x.toString = $estr; return $x; };
gis_geojson_CoordinateReferenceSystemType.NamedCoordinateReferenceSystem = function(n) { var $x = ["NamedCoordinateReferenceSystem",1,n]; $x.__enum__ = gis_geojson_CoordinateReferenceSystemType; $x.toString = $estr; return $x; };
var gis_geojson_GeoJsonObjectHelper = function() { };
gis_geojson_GeoJsonObjectHelper.__name__ = true;
gis_geojson_GeoJsonObjectHelper.getTypeEnum = function(o) {
	return (function($this) {
		var $r;
		var _g = o.type.toLowerCase();
		$r = (function($this) {
			var $r;
			switch(_g) {
			case "feature":
				$r = gis_geojson_GeoJsonObjectType.Feature(o);
				break;
			case "featurecollection":
				$r = gis_geojson_GeoJsonObjectType.FeatureCollection(o);
				break;
			case "geometrycollection":
				$r = gis_geojson_GeoJsonObjectType.GeometryCollection(o);
				break;
			case "linestring":
				$r = gis_geojson_GeoJsonObjectType.LineString(o);
				break;
			case "multilinestring":
				$r = gis_geojson_GeoJsonObjectType.MultiLineString(o);
				break;
			case "multipoint":
				$r = gis_geojson_GeoJsonObjectType.MultiPoint(o);
				break;
			case "multipolygon":
				$r = gis_geojson_GeoJsonObjectType.MultiPolygon(o);
				break;
			case "point":
				$r = gis_geojson_GeoJsonObjectType.Point(o);
				break;
			case "polygon":
				$r = gis_geojson_GeoJsonObjectType.Polygon(o);
				break;
			default:
				$r = (function($this) {
					var $r;
					throw new js__$Boot_HaxeError("unknown GeoJsonObject type " + o.type);
					return $r;
				}($this));
			}
			return $r;
		}($this));
		return $r;
	}(this));
};
var gis_geojson_GeometryObjectHelper = function() { };
gis_geojson_GeometryObjectHelper.__name__ = true;
gis_geojson_GeometryObjectHelper.getTypeEnum = function(o) {
	return (function($this) {
		var $r;
		var _g = o.type.toLowerCase();
		$r = (function($this) {
			var $r;
			switch(_g) {
			case "geometrycollection":
				$r = gis_geojson_GeometryObjectType.GeometryCollection(o);
				break;
			case "linestring":
				$r = gis_geojson_GeometryObjectType.LineString(o);
				break;
			case "multilinestring":
				$r = gis_geojson_GeometryObjectType.MultiLineString(o);
				break;
			case "multipoint":
				$r = gis_geojson_GeometryObjectType.MultiPoint(o);
				break;
			case "multipolygon":
				$r = gis_geojson_GeometryObjectType.MultiPolygon(o);
				break;
			case "point":
				$r = gis_geojson_GeometryObjectType.Point(o);
				break;
			case "polygon":
				$r = gis_geojson_GeometryObjectType.Polygon(o);
				break;
			default:
				$r = (function($this) {
					var $r;
					throw new js__$Boot_HaxeError("unknown GeometryObject type " + o.type);
					return $r;
				}($this));
			}
			return $r;
		}($this));
		return $r;
	}(this));
};
var gis_geojson_CoordinateReferenceSystemHelper = function() { };
gis_geojson_CoordinateReferenceSystemHelper.__name__ = true;
gis_geojson_CoordinateReferenceSystemHelper.getTypeEnum = function(cr) {
	return (function($this) {
		var $r;
		var _g = cr.type.toLowerCase();
		$r = (function($this) {
			var $r;
			switch(_g) {
			case "name":
				$r = gis_geojson_CoordinateReferenceSystemType.NamedCoordinateReferenceSystem(cr);
				break;
			case "link":
				$r = gis_geojson_CoordinateReferenceSystemType.LinkedCoordinateReferenceSystem(cr);
				break;
			default:
				$r = (function($this) {
					var $r;
					throw new js__$Boot_HaxeError("unknown CoordinateReferenceSystem type " + cr.type);
					return $r;
				}($this));
			}
			return $r;
		}($this));
		return $r;
	}(this));
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
haxe_Http.__name__ = true;
haxe_Http.prototype = {
	request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = r.status;
				} catch( e ) {
					if (e instanceof js__$Boot_HaxeError) e = e.val;
					$r = null;
				}
				return $r;
			}(this));
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) s = r.responseText != null?200:404;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe_Http
};
var haxe_Log = function() { };
haxe_Log.__name__ = true;
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Timer = function() { };
haxe_Timer.__name__ = true;
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		return this.rh == null?null:this.rh["$" + key];
	}
	,keys: function() {
		var tmp;
		var _this = this.arrayKeys();
		tmp = HxOverrides.iter(_this);
		return tmp;
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Path = function() { };
haxe_io_Path.__name__ = true;
haxe_io_Path.join = function(paths) {
	var paths1 = paths.filter(function(s) {
		return s != null && s != "";
	});
	if(paths1.length == 0) return "";
	var path = paths1[0];
	var _g1 = 1;
	var _g = paths1.length;
	while(_g1 < _g) {
		var i = _g1++;
		path = haxe_io_Path.addTrailingSlash(path);
		path += paths1[i];
	}
	return haxe_io_Path.normalize(path);
};
haxe_io_Path.normalize = function(path) {
	path = path.split("\\").join("/");
	if(path == null || path == "/") return "/";
	var target = [];
	var _g = 0;
	var _g1 = path.split("/");
	while(_g < _g1.length) {
		var token = _g1[_g];
		++_g;
		if(token == ".." && target.length > 0 && target[target.length - 1] != "..") target.pop(); else if(token != ".") target.push(token);
	}
	var tmp = target.join("/");
	var regex = new EReg("([^:])/+","g");
	regex.replace(tmp,"$1" + "/");
	var acc_b = "";
	var colon = false;
	var slashes = false;
	var _g11 = 0;
	var _g2 = tmp.length;
	while(_g11 < _g2) {
		var i = _g11++;
		var _g21 = HxOverrides.cca(tmp,i);
		if(_g21 != null) switch(_g21) {
		case 58:
			acc_b += ":";
			colon = true;
			break;
		case 47:
			if(colon == false) slashes = true; else {
				colon = false;
				if(slashes) {
					acc_b += "/";
					slashes = false;
				}
				var x = String.fromCharCode(_g21);
				acc_b += x == null?"null":"" + x;
			}
			break;
		default:
			colon = false;
			if(slashes) {
				acc_b += "/";
				slashes = false;
			}
			var x1 = String.fromCharCode(_g21);
			acc_b += x1 == null?"null":"" + x1;
		} else {
			colon = false;
			if(slashes) {
				acc_b += "/";
				slashes = false;
			}
			var x1 = String.fromCharCode(_g21);
			acc_b += x1 == null?"null":"" + x1;
		}
	}
	var result = acc_b;
	return result;
};
haxe_io_Path.addTrailingSlash = function(path) {
	if(path.length == 0) return "/";
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	return c1 < c2?c2 != path.length - 1?path + "\\":path:c1 != path.length - 1?path + "/":path;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
js_Browser.__name__ = true;
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var macros_BuildInfo = function() { };
macros_BuildInfo.__name__ = true;
var math_LerpCurve3 = function(points) {
	this.points = points;
};
math_LerpCurve3.__name__ = true;
math_LerpCurve3.__super__ = THREE.Curve;
math_LerpCurve3.prototype = $extend(THREE.Curve.prototype,{
	getPoint: function(u) {
		var idx0 = Math.floor(u * (this.points.length - 1));
		var idx1 = Math.ceil(u * (this.points.length - 1));
		if(idx0 == idx1) return this.points[idx0]; else {
			var u0 = idx0 / (this.points.length - 1);
			var u1 = idx1 / (this.points.length - 1);
			var alpha = (u - u0) / (u1 - u0);
			return new THREE.Vector3().lerpVectors(this.points[idx0],this.points[idx1],alpha);
		}
	}
	,getTangent: function(u) {
		var idx0 = Math.floor(u * (this.points.length - 1));
		var idx1 = Math.ceil(u * (this.points.length - 1));
		if(idx0 == idx1) {
			idx1++;
			if(idx1 >= this.points.length) {
				idx1--;
				idx0--;
			}
		}
		var p0 = this.points[idx0];
		var p1 = this.points[idx1];
		var tangent = new THREE.Vector3().subVectors(p1,p0).normalize();
		return tangent;
	}
	,__class__: math_LerpCurve3
});
var math_XMath = function() { };
math_XMath.__name__ = true;
math_XMath.fract = function(x) {
	return x - Math.floor(x);
};
math_XMath.mod = function(n,m) {
	return (n % m + m) % m;
};
math_XMath.clamp = function(x,a,b) {
	if(x < a) x = a;
	if(x > b) x = b;
	return x;
};
math_XMath.mix = function(a,b,alpha) {
	return a + (b - a) * alpha;
};
math_XMath.minAngleDelta = function(angleDelta) {
	return Math.atan2(Math.sin(angleDelta),Math.cos(angleDelta));
};
var motion_actuators_IGenericActuator = function() { };
motion_actuators_IGenericActuator.__name__ = true;
motion_actuators_IGenericActuator.prototype = {
	__class__: motion_actuators_IGenericActuator
};
var motion_actuators_GenericActuator = function(target,duration,properties) {
	this._autoVisible = true;
	this._delay = 0;
	this._reflect = false;
	this._repeat = 0;
	this._reverse = false;
	this._smartRotation = false;
	this._snapping = false;
	this.special = false;
	this.target = target;
	this.properties = properties;
	this.duration = duration;
	this._ease = motion_Actuate.defaultEase;
};
motion_actuators_GenericActuator.__name__ = true;
motion_actuators_GenericActuator.__interfaces__ = [motion_actuators_IGenericActuator];
motion_actuators_GenericActuator.prototype = {
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) {
				var value = Reflect.field(this.properties,i);
				this.target[i] = value;
			} else {
				var o = this.target;
				var value1 = Reflect.field(this.properties,i);
				var tmp;
				if(o.__properties__ && (tmp = o.__properties__["set_" + i])) o[tmp](value1); else o[i] = value1;
			}
		}
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		return this;
	}
	,callMethod: function(method,params) {
		if(params == null) params = [];
		var tmp;
		var func = method;
		tmp = func.apply(method,params);
		return tmp;
	}
	,change: function() {
		if(this._onUpdate != null) {
			var method = this._onUpdate;
			var params = this._onUpdateParams;
			if(params == null) params = [];
			var func = method;
			func.apply(method,params);
		}
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		if(sendEvent) {
			this.change();
			if(this._onComplete != null) {
				var method = this._onComplete;
				var params = this._onCompleteParams;
				if(params == null) params = [];
				var func = method;
				func.apply(method,params);
			}
		}
		motion_Actuate.unload(this);
	}
	,delay: function(duration) {
		this._delay = duration;
		return this;
	}
	,ease: function(easing) {
		this._ease = easing;
		return this;
	}
	,move: function() {
	}
	,onComplete: function(handler,parameters) {
		this._onComplete = handler;
		if(parameters == null) this._onCompleteParams = []; else this._onCompleteParams = parameters;
		if(this.duration == 0) this.complete();
		return this;
	}
	,onRepeat: function(handler,parameters) {
		this._onRepeat = handler;
		if(parameters == null) this._onRepeatParams = []; else this._onRepeatParams = parameters;
		return this;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		return this;
	}
	,onPause: function(handler,parameters) {
		this._onPause = handler;
		if(parameters == null) this._onPauseParams = []; else this._onPauseParams = parameters;
		return this;
	}
	,onResume: function(handler,parameters) {
		this._onResume = handler;
		if(parameters == null) this._onResumeParams = []; else this._onResumeParams = parameters;
		return this;
	}
	,pause: function() {
		if(this._onPause != null) {
			var method = this._onPause;
			var params = this._onPauseParams;
			if(params == null) params = [];
			var func = method;
			func.apply(method,params);
		}
	}
	,reflect: function(value) {
		if(value == null) value = true;
		this._reflect = value;
		this.special = true;
		return this;
	}
	,repeat: function(times) {
		if(times == null) times = -1;
		this._repeat = times;
		return this;
	}
	,resume: function() {
		if(this._onResume != null) {
			var method = this._onResume;
			var params = this._onResumeParams;
			if(params == null) params = [];
			var func = method;
			func.apply(method,params);
		}
	}
	,reverse: function(value) {
		if(value == null) value = true;
		this._reverse = value;
		this.special = true;
		return this;
	}
	,smartRotation: function(value) {
		if(value == null) value = true;
		this._smartRotation = value;
		this.special = true;
		return this;
	}
	,snapping: function(value) {
		if(value == null) value = true;
		this._snapping = value;
		this.special = true;
		return this;
	}
	,stop: function(properties,complete,sendEvent) {
	}
	,__class__: motion_actuators_GenericActuator
};
var motion_actuators_SimpleActuator = function(target,duration,properties) {
	this.active = true;
	this.propertyDetails = [];
	this.sendChange = false;
	this.paused = false;
	this.cacheVisible = false;
	this.initialized = false;
	this.setVisible = false;
	this.toggleVisible = false;
	this.startTime = haxe_Timer.stamp();
	motion_actuators_GenericActuator.call(this,target,duration,properties);
	if(!motion_actuators_SimpleActuator.addedEvent) motion_actuators_SimpleActuator.addedEvent = true;
};
motion_actuators_SimpleActuator.__name__ = true;
motion_actuators_SimpleActuator.stage_onEnterFrame = function() {
	var currentTime = haxe_Timer.stamp();
	var actuator;
	var j = 0;
	var _g1 = 0;
	var _g = motion_actuators_SimpleActuator.actuatorsLength;
	while(_g1 < _g) {
		_g1++;
		actuator = motion_actuators_SimpleActuator.actuators[j];
		if(actuator != null && actuator.active) {
			if(currentTime >= actuator.timeOffset) actuator.update(currentTime);
			j++;
		} else {
			motion_actuators_SimpleActuator.actuators.splice(j,1);
			--motion_actuators_SimpleActuator.actuatorsLength;
		}
	}
};
motion_actuators_SimpleActuator.__super__ = motion_actuators_GenericActuator;
motion_actuators_SimpleActuator.prototype = $extend(motion_actuators_GenericActuator.prototype,{
	setField_motion_actuators_MotionPathActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else {
			var tmp;
			if(target.__properties__ && (tmp = target.__properties__["set_" + propertyName])) target[tmp](value); else target[propertyName] = value;
		}
	}
	,setField_motion_actuators_SimpleActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else {
			var tmp;
			if(target.__properties__ && (tmp = target.__properties__["set_" + propertyName])) target[tmp](value); else target[propertyName] = value;
		}
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		if(!value) {
			this.toggleVisible = false;
			if(this.setVisible) {
				var target = this.target;
				var value1 = this.cacheVisible;
				if(Object.prototype.hasOwnProperty.call(target,"visible")) target.visible = value1; else {
					var tmp;
					if(target.__properties__ && (tmp = target.__properties__["set_" + "visible"])) target[tmp](value1); else target.visible = value1;
				}
			}
		}
		return this;
	}
	,delay: function(duration) {
		this._delay = duration;
		this.timeOffset = this.startTime + duration;
		return this;
	}
	,getField: function(target,propertyName) {
		var value = null;
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) value = Reflect.field(target,propertyName); else {
			var tmp;
			var tmp1;
			if(target == null) tmp = null; else if(target.__properties__ && (tmp1 = target.__properties__["get_" + propertyName])) tmp = target[tmp1](); else tmp = target[propertyName];
			value = tmp;
		}
		return value;
	}
	,initialize: function() {
		var details;
		var start;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var isField = true;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) start = Reflect.field(this.target,i); else {
				isField = false;
				var tmp;
				var o = this.target;
				var tmp1;
				if(o == null) tmp = null; else if(o.__properties__ && (tmp1 = o.__properties__["get_" + i])) tmp = o[tmp1](); else tmp = o[i];
				start = tmp;
			}
			if(typeof(start) == "number") {
				var tmp2;
				var target = this.properties;
				var value1 = null;
				if(Object.prototype.hasOwnProperty.call(target,i)) value1 = Reflect.field(target,i); else {
					var tmp3;
					var tmp4;
					if(target == null) tmp3 = null; else if(target.__properties__ && (tmp4 = target.__properties__["get_" + i])) tmp3 = target[tmp4](); else tmp3 = target[i];
					value1 = tmp3;
				}
				tmp2 = value1;
				var value = tmp2;
				if(start == null) start = 0;
				if(value == null) value = 0;
				details = new motion_actuators_PropertyDetails(this.target,i,start,value - start,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,move: function() {
		this.toggleVisible = Object.prototype.hasOwnProperty.call(this.properties,"alpha") && Object.prototype.hasOwnProperty.call(this.properties,"visible");
		var tmp;
		if(this.toggleVisible && this.properties.alpha != 0) {
			var tmp1;
			var target = this.target;
			var value = null;
			if(Object.prototype.hasOwnProperty.call(target,"visible")) value = Reflect.field(target,"visible"); else {
				var tmp2;
				var tmp3;
				if(target == null) tmp2 = null; else if(target.__properties__ && (tmp3 = target.__properties__["get_" + "visible"])) tmp2 = target[tmp3](); else tmp2 = target.visible;
				value = tmp2;
			}
			tmp1 = value;
			tmp = !tmp1;
		} else tmp = false;
		if(tmp) {
			this.setVisible = true;
			var tmp4;
			var target1 = this.target;
			var value1 = null;
			if(Object.prototype.hasOwnProperty.call(target1,"visible")) value1 = Reflect.field(target1,"visible"); else {
				var tmp5;
				var tmp6;
				if(target1 == null) tmp5 = null; else if(target1.__properties__ && (tmp6 = target1.__properties__["get_" + "visible"])) tmp5 = target1[tmp6](); else tmp5 = target1.visible;
				value1 = tmp5;
			}
			tmp4 = value1;
			this.cacheVisible = tmp4;
			var target2 = this.target;
			if(Object.prototype.hasOwnProperty.call(target2,"visible")) target2.visible = true; else {
				var tmp7;
				if(target2.__properties__ && (tmp7 = target2.__properties__["set_" + "visible"])) target2[tmp7](true); else target2.visible = true;
			}
		}
		this.timeOffset = this.startTime;
		motion_actuators_SimpleActuator.actuators.push(this);
		++motion_actuators_SimpleActuator.actuatorsLength;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		this.sendChange = true;
		return this;
	}
	,pause: function() {
		if(!this.paused) {
			this.paused = true;
			motion_actuators_GenericActuator.prototype.pause.call(this);
			this.pauseTime = haxe_Timer.stamp();
		}
	}
	,resume: function() {
		if(this.paused) {
			this.paused = false;
			this.timeOffset += haxe_Timer.stamp() - this.pauseTime;
			motion_actuators_GenericActuator.prototype.resume.call(this);
		}
	}
	,setProperty: function(details,value) {
		if(details.isField) details.target[details.propertyName] = value; else {
			var o = details.target;
			var field = details.propertyName;
			var tmp;
			if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
		}
	}
	,stop: function(properties,complete,sendEvent) {
		if(this.active) {
			if(properties == null) {
				this.active = false;
				if(complete) this.apply();
				this.complete(sendEvent);
				return;
			}
			var _g = 0;
			var _g1 = Reflect.fields(properties);
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(Object.prototype.hasOwnProperty.call(this.properties,i)) {
					this.active = false;
					if(complete) this.apply();
					this.complete(sendEvent);
					return;
				}
			}
		}
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var i;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g1 = 0;
				var _g = this.detailsLength;
				while(_g1 < _g) {
					var i1 = _g1++;
					details = this.propertyDetails[i1];
					var value = details.start + details.change * easing;
					if(details.isField) details.target[details.propertyName] = value; else {
						var o = details.target;
						var field = details.propertyName;
						var tmp;
						if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
					}
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g11 = 0;
				var _g2 = this.detailsLength;
				while(_g11 < _g2) {
					var i2 = _g11++;
					details = this.propertyDetails[i2];
					var tmp1;
					if(this._smartRotation) {
						var tmp2;
						if(!(details.propertyName == "rotation")) tmp2 = details.propertyName == "rotationX"; else tmp2 = true;
						var tmp3;
						if(!tmp2) tmp3 = details.propertyName == "rotationY"; else tmp3 = true;
						if(!tmp3) tmp1 = details.propertyName == "rotationZ"; else tmp1 = true;
					} else tmp1 = false;
					if(tmp1) {
						var rotation = details.change % 360;
						if(rotation > 180) rotation -= 360; else if(rotation < -180) rotation += 360;
						endValue = details.start + rotation * easing;
					} else endValue = details.start + details.change * easing;
					if(!this._snapping) {
						if(details.isField) details.target[details.propertyName] = endValue; else {
							var o1 = details.target;
							var field1 = details.propertyName;
							var tmp4;
							if(o1.__properties__ && (tmp4 = o1.__properties__["set_" + field1])) o1[tmp4](endValue); else o1[field1] = endValue;
						}
					} else {
						var value1 = Math.round(endValue);
						if(details.isField) details.target[details.propertyName] = value1; else {
							var o2 = details.target;
							var field2 = details.propertyName;
							var tmp5;
							if(o2.__properties__ && (tmp5 = o2.__properties__["set_" + field2])) o2[tmp5](value1); else o2[field2] = value1;
						}
					}
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					var tmp6;
					if(this.toggleVisible) {
						var tmp7;
						var target = this.target;
						var value2 = null;
						if(Object.prototype.hasOwnProperty.call(target,"alpha")) value2 = Reflect.field(target,"alpha"); else {
							var tmp8;
							var tmp9;
							if(target == null) tmp8 = null; else if(target.__properties__ && (tmp9 = target.__properties__["get_" + "alpha"])) tmp8 = target[tmp9](); else tmp8 = target.alpha;
							value2 = tmp8;
						}
						tmp7 = value2;
						tmp6 = tmp7 == 0;
					} else tmp6 = false;
					if(tmp6) {
						var target1 = this.target;
						if(Object.prototype.hasOwnProperty.call(target1,"visible")) target1.visible = false; else {
							var tmp10;
							if(target1.__properties__ && (tmp10 = target1.__properties__["set_" + "visible"])) target1[tmp10](false); else target1.visible = false;
						}
					}
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) {
						var method = this._onRepeat;
						var params = this._onRepeatParams;
						if(params == null) params = [];
						var func = method;
						func.apply(method,params);
					}
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion_actuators_SimpleActuator
});
var motion_easing_Expo = function() { };
motion_easing_Expo.__name__ = true;
motion_easing_Expo.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion_easing_Expo.get_easeIn = function() {
	return new motion_easing_ExpoEaseIn();
};
motion_easing_Expo.get_easeInOut = function() {
	return new motion_easing_ExpoEaseInOut();
};
motion_easing_Expo.get_easeOut = function() {
	return new motion_easing_ExpoEaseOut();
};
var motion_easing_IEasing = function() { };
motion_easing_IEasing.__name__ = true;
motion_easing_IEasing.prototype = {
	__class__: motion_easing_IEasing
};
var motion_easing_ExpoEaseOut = function() {
};
motion_easing_ExpoEaseOut.__name__ = true;
motion_easing_ExpoEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_ExpoEaseOut.prototype = {
	calculate: function(k) {
		return k == 1?1:1 - Math.pow(2,-10 * k);
	}
	,ease: function(t,b,c,d) {
		return t == d?b + c:c * (1 - Math.pow(2,-10 * t / d)) + b;
	}
	,__class__: motion_easing_ExpoEaseOut
};
var motion_Actuate = function() { };
motion_Actuate.__name__ = true;
motion_Actuate.apply = function(target,properties,customActuator) {
	motion_Actuate.stop(target,properties);
	if(customActuator == null) customActuator = motion_Actuate.defaultActuator;
	var actuator = Type.createInstance(customActuator,[target,0,properties]);
	actuator.apply();
	return actuator;
};
motion_Actuate.getLibrary = function(target,allowCreation) {
	if(allowCreation == null) allowCreation = true;
	if(!(motion_Actuate.targetLibraries.h.__keys__[target.__id__] != null) && allowCreation) motion_Actuate.targetLibraries.set(target,[]);
	return motion_Actuate.targetLibraries.h[target.__id__];
};
motion_Actuate.isActive = function() {
	var result = false;
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		result = true;
		break;
	}
	return true;
};
motion_Actuate.motionPath = function(target,duration,properties,overwrite) {
	if(overwrite == null) overwrite = true;
	return motion_Actuate.tween(target,duration,properties,overwrite,motion_actuators_MotionPathActuator);
};
motion_Actuate.pause = function(target) {
	if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
		var actuator = target;
		actuator.pause();
	} else {
		var library = motion_Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator1 = library[_g];
				++_g;
				actuator1.pause();
			}
		}
	}
};
motion_Actuate.pauseAll = function() {
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.pause();
		}
	}
};
motion_Actuate.reset = function() {
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var i = library.length - 1;
		while(i >= 0) {
			library[i].stop(null,false,false);
			i--;
		}
	}
	motion_Actuate.targetLibraries = new haxe_ds_ObjectMap();
};
motion_Actuate.resume = function(target) {
	if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
		var actuator = target;
		actuator.resume();
	} else {
		var library = motion_Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator1 = library[_g];
				++_g;
				actuator1.resume();
			}
		}
	}
};
motion_Actuate.resumeAll = function() {
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.resume();
		}
	}
};
motion_Actuate.stop = function(target,properties,complete,sendEvent) {
	if(sendEvent == null) sendEvent = true;
	if(complete == null) complete = false;
	if(target != null) {
		if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
			var actuator = target;
			actuator.stop(null,complete,sendEvent);
		} else {
			var library = motion_Actuate.getLibrary(target,false);
			if(library != null) {
				if(typeof(properties) == "string") {
					var temp = { };
					var field = properties;
					temp[field] = null;
					properties = temp;
				} else if((properties instanceof Array) && properties.__enum__ == null) {
					var temp1 = { };
					var _g = 0;
					var _g1 = js_Boot.__cast(properties , Array);
					while(_g < _g1.length) {
						var property = _g1[_g];
						++_g;
						var field1 = property;
						temp1[field1] = null;
					}
					properties = temp1;
				}
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(properties,complete,sendEvent);
					i--;
				}
			}
		}
	}
};
motion_Actuate.timer = function(duration,customActuator) {
	return motion_Actuate.tween(new motion__$Actuate_TweenTimer(0),duration,new motion__$Actuate_TweenTimer(1),false,customActuator);
};
motion_Actuate.tween = function(target,duration,properties,overwrite,customActuator) {
	if(overwrite == null) overwrite = true;
	if(target != null) {
		if(duration > 0) {
			if(customActuator == null) customActuator = motion_Actuate.defaultActuator;
			var actuator = Type.createInstance(customActuator,[target,duration,properties]);
			var library = motion_Actuate.getLibrary(actuator.target);
			if(overwrite) {
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(actuator.properties,false,false);
					i--;
				}
				library = motion_Actuate.getLibrary(actuator.target);
			}
			library.push(actuator);
			actuator.move();
			return actuator;
		} else return motion_Actuate.apply(target,properties,customActuator);
	}
	return null;
};
motion_Actuate.unload = function(actuator) {
	var target = actuator.target;
	if(motion_Actuate.targetLibraries.h.__keys__[target.__id__] != null) {
		HxOverrides.remove(motion_Actuate.targetLibraries.h[target.__id__],actuator);
		if(motion_Actuate.targetLibraries.h[target.__id__].length == 0) motion_Actuate.targetLibraries.remove(target);
	}
};
motion_Actuate.update = function(target,duration,start,end,overwrite) {
	if(overwrite == null) overwrite = true;
	var properties = { start : start, end : end};
	return motion_Actuate.tween(target,duration,properties,overwrite,motion_actuators_MethodActuator);
};
var motion__$Actuate_TweenTimer = function(progress) {
	this.progress = progress;
};
motion__$Actuate_TweenTimer.__name__ = true;
motion__$Actuate_TweenTimer.prototype = {
	__class__: motion__$Actuate_TweenTimer
};
var motion_MotionPath = function() {
	this._x = new motion_ComponentPath();
	this._y = new motion_ComponentPath();
	this._rotation = null;
};
motion_MotionPath.__name__ = true;
motion_MotionPath.prototype = {
	bezier: function(x,y,controlX,controlY,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new motion_BezierPath(x,controlX,strength));
		this._y.addPath(new motion_BezierPath(y,controlY,strength));
		return this;
	}
	,line: function(x,y,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new motion_LinearPath(x,strength));
		this._y.addPath(new motion_LinearPath(y,strength));
		return this;
	}
	,get_rotation: function() {
		if(this._rotation == null) this._rotation = new motion_RotationPath(this._x,this._y);
		return this._rotation;
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,__class__: motion_MotionPath
	,__properties__: {get_y:"get_y",get_x:"get_x",get_rotation:"get_rotation"}
};
var motion_IComponentPath = function() { };
motion_IComponentPath.__name__ = true;
motion_IComponentPath.prototype = {
	__class__: motion_IComponentPath
	,__properties__: {get_end:"get_end"}
};
var motion_ComponentPath = function() {
	this.paths = [];
	this.start = 0;
	this.totalStrength = 0;
};
motion_ComponentPath.__name__ = true;
motion_ComponentPath.__interfaces__ = [motion_IComponentPath];
motion_ComponentPath.prototype = {
	addPath: function(path) {
		this.paths.push(path);
		this.totalStrength += path.strength;
	}
	,calculate: function(k) {
		if(this.paths.length == 1) return this.paths[0].calculate(this.start,k); else {
			var ratio = k * this.totalStrength;
			var lastEnd = this.start;
			var _g = 0;
			var _g1 = this.paths;
			while(_g < _g1.length) {
				var path = _g1[_g];
				++_g;
				if(ratio > path.strength) {
					ratio -= path.strength;
					lastEnd = path.end;
				} else return path.calculate(lastEnd,ratio / path.strength);
			}
		}
		return 0;
	}
	,get_end: function() {
		if(this.paths.length > 0) {
			var path = this.paths[this.paths.length - 1];
			return path.end;
		} else return this.start;
	}
	,__class__: motion_ComponentPath
	,__properties__: {get_end:"get_end"}
};
var motion_BezierPath = function(end,control,strength) {
	this.end = end;
	this.control = control;
	this.strength = strength;
};
motion_BezierPath.__name__ = true;
motion_BezierPath.prototype = {
	calculate: function(start,k) {
		return (1 - k) * (1 - k) * start + 2 * (1 - k) * k * this.control + k * k * this.end;
	}
	,__class__: motion_BezierPath
};
var motion_LinearPath = function(end,strength) {
	motion_BezierPath.call(this,end,0,strength);
};
motion_LinearPath.__name__ = true;
motion_LinearPath.__super__ = motion_BezierPath;
motion_LinearPath.prototype = $extend(motion_BezierPath.prototype,{
	calculate: function(start,k) {
		return start + k * (this.end - start);
	}
	,__class__: motion_LinearPath
});
var motion_RotationPath = function(x,y) {
	this.step = 0.01;
	this._x = x;
	this._y = y;
	this.offset = 0;
	this.start = this.calculate(0.0);
};
motion_RotationPath.__name__ = true;
motion_RotationPath.__interfaces__ = [motion_IComponentPath];
motion_RotationPath.prototype = {
	calculate: function(k) {
		var dX = this._x.calculate(k) - this._x.calculate(k + this.step);
		var dY = this._y.calculate(k) - this._y.calculate(k + this.step);
		var angle = Math.atan2(dY,dX) * (180 / Math.PI);
		angle = (angle + this.offset) % 360;
		return angle;
	}
	,get_end: function() {
		return this.calculate(1.0);
	}
	,__class__: motion_RotationPath
	,__properties__: {get_end:"get_end"}
};
var motion_actuators_MethodActuator = function(target,duration,properties) {
	this.currentParameters = [];
	this.tweenProperties = { };
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
	if(!Object.prototype.hasOwnProperty.call(properties,"start")) this.properties.start = [];
	if(!Object.prototype.hasOwnProperty.call(properties,"end")) this.properties.end = this.properties.start;
	var _g1 = 0;
	var _g = this.properties.start.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.currentParameters.push(this.properties.start[i]);
	}
};
motion_actuators_MethodActuator.__name__ = true;
motion_actuators_MethodActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MethodActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		var method = this.target;
		var params = this.properties.end;
		if(params == null) params = [];
		var func = method;
		func.apply(method,params);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
		}
		var method = this.target;
		var params = this.currentParameters;
		if(params == null) params = [];
		var func = method;
		func.apply(method,params);
		motion_actuators_SimpleActuator.prototype.complete.call(this,sendEvent);
	}
	,initialize: function() {
		var details;
		var propertyName;
		var start;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			propertyName = "param" + i;
			start = this.properties.start[i];
			this.tweenProperties[propertyName] = start;
			if(typeof(start) == "number" || ((start | 0) === start)) {
				details = new motion_actuators_PropertyDetails(this.tweenProperties,propertyName,start,this.properties.end[i] - start);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		motion_actuators_SimpleActuator.prototype.update.call(this,currentTime);
		if(this.active && !this.paused) {
			var _g1 = 0;
			var _g = this.properties.start.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
			}
			var method = this.target;
			var params = this.currentParameters;
			if(params == null) params = [];
			var func = method;
			func.apply(method,params);
		}
	}
	,__class__: motion_actuators_MethodActuator
});
var motion_actuators_MotionPathActuator = function(target,duration,properties) {
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
};
motion_actuators_MotionPathActuator.__name__ = true;
motion_actuators_MotionPathActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MotionPathActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) {
				var value = (js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end();
				this.target[propertyName] = value;
			} else {
				var o = this.target;
				var value1 = (js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end();
				var tmp;
				if(o.__properties__ && (tmp = o.__properties__["set_" + propertyName])) o[tmp](value1); else o[propertyName] = value1;
			}
		}
	}
	,initialize: function() {
		var details;
		var path;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			path = js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath);
			if(path != null) {
				var isField = true;
				if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) path.start = Reflect.field(this.target,propertyName); else {
					isField = false;
					var tmp;
					var o = this.target;
					var tmp1;
					if(o == null) tmp = null; else if(o.__properties__ && (tmp1 = o.__properties__["get_" + propertyName])) tmp = o[tmp1](); else tmp = o[propertyName];
					path.start = tmp;
				}
				details = new motion_actuators_PropertyPathDetails(this.target,propertyName,path,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g = 0;
				var _g1 = this.propertyDetails;
				while(_g < _g1.length) {
					var details1 = _g1[_g];
					++_g;
					if(details1.isField) {
						var value = (js_Boot.__cast(details1 , motion_actuators_PropertyPathDetails)).path.calculate(easing);
						details1.target[details1.propertyName] = value;
					} else {
						var o = details1.target;
						var field = details1.propertyName;
						var value1 = (js_Boot.__cast(details1 , motion_actuators_PropertyPathDetails)).path.calculate(easing);
						var tmp;
						if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value1); else o[field] = value1;
					}
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g2 = 0;
				var _g11 = this.propertyDetails;
				while(_g2 < _g11.length) {
					var details2 = _g11[_g2];
					++_g2;
					if(!this._snapping) {
						if(details2.isField) {
							var value2 = (js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing);
							details2.target[details2.propertyName] = value2;
						} else {
							var o1 = details2.target;
							var field1 = details2.propertyName;
							var value3 = (js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing);
							var tmp1;
							if(o1.__properties__ && (tmp1 = o1.__properties__["set_" + field1])) o1[tmp1](value3); else o1[field1] = value3;
						}
					} else if(details2.isField) {
						var value4 = Math.round((js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing));
						details2.target[details2.propertyName] = value4;
					} else {
						var o2 = details2.target;
						var field2 = details2.propertyName;
						var value5 = Math.round((js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing));
						var tmp2;
						if(o2.__properties__ && (tmp2 = o2.__properties__["set_" + field2])) o2[tmp2](value5); else o2[field2] = value5;
					}
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					var tmp3;
					if(this.toggleVisible) {
						var tmp4;
						var target = this.target;
						var value6 = null;
						if(Object.prototype.hasOwnProperty.call(target,"alpha")) value6 = Reflect.field(target,"alpha"); else {
							var tmp5;
							var tmp6;
							if(target == null) tmp5 = null; else if(target.__properties__ && (tmp6 = target.__properties__["get_" + "alpha"])) tmp5 = target[tmp6](); else tmp5 = target.alpha;
							value6 = tmp5;
						}
						tmp4 = value6;
						tmp3 = tmp4 == 0;
					} else tmp3 = false;
					if(tmp3) {
						var target1 = this.target;
						if(Object.prototype.hasOwnProperty.call(target1,"visible")) target1.visible = false; else {
							var tmp7;
							if(target1.__properties__ && (tmp7 = target1.__properties__["set_" + "visible"])) target1[tmp7](false); else target1.visible = false;
						}
					}
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) {
						var method = this._onRepeat;
						var params = this._onRepeatParams;
						if(params == null) params = [];
						var func = method;
						func.apply(method,params);
					}
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion_actuators_MotionPathActuator
});
var motion_actuators_PropertyDetails = function(target,propertyName,start,change,isField) {
	if(isField == null) isField = true;
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.change = change;
	this.isField = isField;
};
motion_actuators_PropertyDetails.__name__ = true;
motion_actuators_PropertyDetails.prototype = {
	__class__: motion_actuators_PropertyDetails
};
var motion_actuators_PropertyPathDetails = function(target,propertyName,path,isField) {
	if(isField == null) isField = true;
	motion_actuators_PropertyDetails.call(this,target,propertyName,0,0,isField);
	this.path = path;
};
motion_actuators_PropertyPathDetails.__name__ = true;
motion_actuators_PropertyPathDetails.__super__ = motion_actuators_PropertyDetails;
motion_actuators_PropertyPathDetails.prototype = $extend(motion_actuators_PropertyDetails.prototype,{
	__class__: motion_actuators_PropertyPathDetails
});
var motion_easing_ExpoEaseIn = function() {
};
motion_easing_ExpoEaseIn.__name__ = true;
motion_easing_ExpoEaseIn.__interfaces__ = [motion_easing_IEasing];
motion_easing_ExpoEaseIn.prototype = {
	calculate: function(k) {
		return k == 0?0:Math.pow(2,10 * (k - 1));
	}
	,ease: function(t,b,c,d) {
		return t == 0?b:c * Math.pow(2,10 * (t / d - 1)) + b;
	}
	,__class__: motion_easing_ExpoEaseIn
};
var motion_easing_ExpoEaseInOut = function() {
};
motion_easing_ExpoEaseInOut.__name__ = true;
motion_easing_ExpoEaseInOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_ExpoEaseInOut.prototype = {
	calculate: function(k) {
		if(k == 0) return 0;
		if(k == 1) return 1;
		if((k /= 0.5) < 1.0) return 0.5 * Math.pow(2,10 * (k - 1));
		return 0.5 * (2 - Math.pow(2,-10 * --k));
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b;
		if(t == d) return b + c;
		if((t /= d / 2.0) < 1.0) return c / 2 * Math.pow(2,10 * (t - 1)) + b;
		return c / 2 * (2 - Math.pow(2,-10 * --t)) + b;
	}
	,__class__: motion_easing_ExpoEaseInOut
};
var motion_easing_Quad = function() { };
motion_easing_Quad.__name__ = true;
motion_easing_Quad.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion_easing_Quad.get_easeIn = function() {
	return new motion_easing_QuadEaseIn();
};
motion_easing_Quad.get_easeInOut = function() {
	return new motion_easing_QuadEaseInOut();
};
motion_easing_Quad.get_easeOut = function() {
	return new motion_easing_QuadEaseOut();
};
var motion_easing_QuadEaseIn = function() {
};
motion_easing_QuadEaseIn.__name__ = true;
motion_easing_QuadEaseIn.__interfaces__ = [motion_easing_IEasing];
motion_easing_QuadEaseIn.prototype = {
	calculate: function(k) {
		return k * k;
	}
	,ease: function(t,b,c,d) {
		return c * (t /= d) * t + b;
	}
	,__class__: motion_easing_QuadEaseIn
};
var motion_easing_QuadEaseInOut = function() {
};
motion_easing_QuadEaseInOut.__name__ = true;
motion_easing_QuadEaseInOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_QuadEaseInOut.prototype = {
	calculate: function(k) {
		if((k *= 2) < 1) return 0.5 * k * k;
		return -0.5 * ((k - 1) * (k - 3) - 1);
	}
	,ease: function(t,b,c,d) {
		if((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((t - 1) * (t - 3) - 1) + b;
	}
	,__class__: motion_easing_QuadEaseInOut
};
var motion_easing_QuadEaseOut = function() {
};
motion_easing_QuadEaseOut.__name__ = true;
motion_easing_QuadEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_QuadEaseOut.prototype = {
	calculate: function(k) {
		return -k * (k - 2);
	}
	,ease: function(t,b,c,d) {
		return -c * (t /= d) * (t - 2) + b;
	}
	,__class__: motion_easing_QuadEaseOut
};
var motion_easing_Sine = function() { };
motion_easing_Sine.__name__ = true;
motion_easing_Sine.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion_easing_Sine.get_easeIn = function() {
	return new motion_easing_SineEaseIn();
};
motion_easing_Sine.get_easeInOut = function() {
	return new motion_easing_SineEaseInOut();
};
motion_easing_Sine.get_easeOut = function() {
	return new motion_easing_SineEaseOut();
};
var motion_easing_SineEaseIn = function() {
};
motion_easing_SineEaseIn.__name__ = true;
motion_easing_SineEaseIn.__interfaces__ = [motion_easing_IEasing];
motion_easing_SineEaseIn.prototype = {
	calculate: function(k) {
		return 1 - Math.cos(k * (Math.PI / 2));
	}
	,ease: function(t,b,c,d) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	}
	,__class__: motion_easing_SineEaseIn
};
var motion_easing_SineEaseInOut = function() {
};
motion_easing_SineEaseInOut.__name__ = true;
motion_easing_SineEaseInOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_SineEaseInOut.prototype = {
	calculate: function(k) {
		return -(Math.cos(Math.PI * k) - 1) / 2;
	}
	,ease: function(t,b,c,d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	}
	,__class__: motion_easing_SineEaseInOut
};
var motion_easing_SineEaseOut = function() {
};
motion_easing_SineEaseOut.__name__ = true;
motion_easing_SineEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_SineEaseOut.prototype = {
	calculate: function(k) {
		return Math.sin(k * (Math.PI / 2));
	}
	,ease: function(t,b,c,d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	}
	,__class__: motion_easing_SineEaseOut
};
var objects_globe_Atmosphere = function(innerRadius,outerRadius) {
	THREE.Object3D.call(this);
	var atmospherePrameters = { innerRadius : innerRadius, outerRadius : outerRadius, Kr : 0.0025, Km : 0.0010, ESun : 20.0, g : -0.990, wavelength : [0.650,0.570,0.475], rayleighScaleDepth : 0.25, mieScaleDepth : 0.1, nSamples : 4};
	var atmosphereUniforms = THREE.UniformsUtils.merge([THREE.UniformsLib.lights,{ v3InvWavelength : { type : "v3", value : new THREE.Vector3(1 / Math.pow(atmospherePrameters.wavelength[0],4),1 / Math.pow(atmospherePrameters.wavelength[1],4),1 / Math.pow(atmospherePrameters.wavelength[2],4))}, fInnerRadius : { type : "f", value : atmospherePrameters.innerRadius}, fInnerRadius2 : { type : "f", value : atmospherePrameters.innerRadius * atmospherePrameters.innerRadius}, fOuterRadius : { type : "f", value : atmospherePrameters.outerRadius}, fOuterRadius2 : { type : "f", value : atmospherePrameters.outerRadius * atmospherePrameters.outerRadius}, fKrESun : { type : "f", value : atmospherePrameters.Kr * atmospherePrameters.ESun}, fKmESun : { type : "f", value : atmospherePrameters.Km * atmospherePrameters.ESun}, fKr4PI : { type : "f", value : atmospherePrameters.Kr * 4.0 * Math.PI}, fKm4PI : { type : "f", value : atmospherePrameters.Km * 4.0 * Math.PI}, fScale : { type : "f", value : 1 / (atmospherePrameters.outerRadius - atmospherePrameters.innerRadius)}, fScaleDepth : { type : "f", value : atmospherePrameters.rayleighScaleDepth}, fScaleOverScaleDepth : { type : "f", value : 1 / (atmospherePrameters.outerRadius - atmospherePrameters.innerRadius) / atmospherePrameters.rayleighScaleDepth}, g : { type : "f", value : atmospherePrameters.g}, g2 : { type : "f", value : atmospherePrameters.g * atmospherePrameters.g}}]);
	var defines = { nSamples : atmospherePrameters.nSamples};
	var atmosphereGeom = new THREE.BufferGeometry().fromGeometry(new THREE.SphereGeometry(innerRadius,120,120));
	var atmosphereOuterMaterial = new objects_globe_AtmosphereOuterMaterial({ uniforms : atmosphereUniforms, defines : defines});
	var atmosphereOuterMesh = new THREE.Mesh(atmosphereGeom,atmosphereOuterMaterial);
	atmosphereOuterMesh.scale.multiplyScalar(outerRadius / innerRadius);
	var atmosphereInnerMaterial = new objects_globe_AtmosphereInnerMaterial({ uniforms : THREE.UniformsUtils.merge([atmosphereUniforms]), defines : defines});
	var atmosphereInnerMesh = new THREE.Mesh(atmosphereGeom,atmosphereInnerMaterial);
	atmosphereInnerMesh.renderOrder = 1;
	this.add(atmosphereOuterMesh);
	this.add(atmosphereInnerMesh);
};
objects_globe_Atmosphere.__name__ = true;
objects_globe_Atmosphere.__super__ = THREE.Object3D;
objects_globe_Atmosphere.prototype = $extend(THREE.Object3D.prototype,{
	__class__: objects_globe_Atmosphere
});
var objects_globe_AtmosphereInnerMaterial = function(parameters) {
	var p = parameters != null?parameters:{ };
	p.vertexShader = p.vertexShader != null?p.vertexShader:objects_globe_AtmosphereInnerMaterial.vertexShaderStr;
	p.fragmentShader = p.fragmentShader != null?p.fragmentShader:objects_globe_AtmosphereInnerMaterial.fragmentShaderStr;
	p.fog = p.fog != null && p.fog;
	p.lights = p.lights != null?p.lights:true;
	p.transparent = p.transparent != null?p.transparent:true;
	p.side = p.side != null?p.side:THREE.FrontSide;
	p.blending = THREE.AdditiveBlending;
	THREE.ShaderMaterial.call(this,p);
};
objects_globe_AtmosphereInnerMaterial.__name__ = true;
objects_globe_AtmosphereInnerMaterial.__super__ = THREE.ShaderMaterial;
objects_globe_AtmosphereInnerMaterial.prototype = $extend(THREE.ShaderMaterial.prototype,{
	__class__: objects_globe_AtmosphereInnerMaterial
});
var objects_globe_AtmosphereOuterMaterial = function(parameters) {
	var p = parameters != null?parameters:{ };
	p.vertexShader = p.vertexShader != null?p.vertexShader:objects_globe_AtmosphereOuterMaterial.vertexShaderStr;
	p.fragmentShader = p.fragmentShader != null?p.fragmentShader:objects_globe_AtmosphereOuterMaterial.fragmentShaderStr;
	p.fog = p.fog != null && p.fog;
	p.lights = p.lights != null?p.lights:true;
	p.transparent = p.transparent != null?p.transparent:true;
	p.side = p.side != null?p.side:THREE.BackSide;
	p.blending = THREE.AdditiveBlending;
	THREE.ShaderMaterial.call(this,p);
};
objects_globe_AtmosphereOuterMaterial.__name__ = true;
objects_globe_AtmosphereOuterMaterial.__super__ = THREE.ShaderMaterial;
objects_globe_AtmosphereOuterMaterial.prototype = $extend(THREE.ShaderMaterial.prototype,{
	__class__: objects_globe_AtmosphereOuterMaterial
});
var objects_globe_Globe = function(renderer,assetRoot,radius) {
	if(radius == null) radius = 1.0;
	this.markerMaterial = new THREE.MeshBasicMaterial({ color : 16777215});
	this.markerSphereGeometry = new THREE.SphereGeometry(1.0,8,8);
	this.earthSegments = 80;
	this.sunDistance = 2.0;
	this.atmospherePad = 0.005;
	this.atmosphereHeight = 0.05;
	this.atmosphereEnabled = true;
	this.tilt = 23.4;
	this.sequenceSpeed = 0.0004;
	THREE.Object3D.call(this);
	this.renderer = renderer;
	this.assetRoot = assetRoot;
	this.radius = radius;
	this.setupObjects();
	this.earthMesh.rotation.y = 0;
	if(this.atmosphereEnabled) this.atmosphere.rotation.y = 0;
	this.sun.position.set(Math.cos(0) * this.sunDistance,0,-Math.sin(0) * this.sunDistance);
};
objects_globe_Globe.__name__ = true;
objects_globe_Globe.__super__ = THREE.Object3D;
objects_globe_Globe.prototype = $extend(THREE.Object3D.prototype,{
	update: function(dt_ms) {
		if(this.gradientMap != null) {
			var _g = this.gradientMap.sequenceView;
			_g.set_progress(_g.progress + this.sequenceSpeed);
			var _g1 = this.gradientMap.sequenceView;
			_g1.set_progress(_g1.progress % 1);
		}
		if(this.particleFlowMap != null && this.particleFlowMap.get_sequence() != null) {
			var _g2 = this.particleFlowMap.get_sequenceView();
			_g2.set_progress(_g2.progress + this.sequenceSpeed);
			var _g3 = this.particleFlowMap.get_sequenceView();
			_g3.set_progress(_g3.progress % 1);
			this.particleFlowMap.particles.step(dt_ms / 1000);
			this.particleFlowMap.render(false,dt_ms);
			this.particleOverlayMaterial.map = this.particleFlowMap.readTarget;
		}
	}
	,setGradientOverlay: function(sequence,texture,videoTexture,colorValueFn,landMask) {
		if(landMask == null) landMask = false;
		{
			var texture1 = texture;
			if(texture == null) {
				var videoTexture1 = videoTexture;
				if(videoTexture == null) {
					var sequence1 = sequence;
					if(this.gradientMap != null) {
						this.gradientMap.dispose();
						this.gradientMap = null;
					}
					if(sequence1 != null) {
						this.gradientMap = new objects_globe_GradientMap(this.renderer,sequence1,colorValueFn);
						this.gradientOverlayMaterial.map = this.gradientMap.renderTarget;
					}
					this.gradientOverlayMaterial.visible = sequence1 != null;
				} else switch(videoTexture) {
				default:
					if(sequence == null) {
						this.gradientOverlayMaterial.map = videoTexture1;
						this.gradientOverlayMaterial.visible = videoTexture1 != null;
					} else switch(sequence) {
					default:
						throw new js__$Boot_HaxeError("setGradientOverlay should only take one parameter");
					}
				}
			} else switch(texture) {
			default:
				if(sequence == null) {
					if(videoTexture == null) {
						this.gradientOverlayMaterial.map = texture1;
						this.gradientOverlayMaterial.visible = texture1 != null;
					} else switch(videoTexture) {
					default:
						throw new js__$Boot_HaxeError("setGradientOverlay should only take one parameter");
					}
				} else switch(sequence) {
				default:
					throw new js__$Boot_HaxeError("setGradientOverlay should only take one parameter");
				}
			}
		}
		this.gradientOverlayMaterial.alphaMap = landMask?this.specTex:null;
	}
	,setParticleFlowOverlay: function(sequence,parameters,landMask) {
		if(landMask == null) landMask = false;
		if(this.particleFlowMap == null) this.particleFlowMap = new objects_globe_ParticleFlowMap(this.renderer,null,parameters); else if(parameters != null) this.particleFlowMap.setParameters(parameters);
		this.particleFlowMap.set_sequence(sequence);
		this.particleOverlayMaterial.map = this.particleFlowMap.readTarget;
		this.particleOverlayMaterial.visible = sequence != null;
		this.particleOverlayMaterial.alphaMap = landMask?this.specTex:null;
		this.particleOverlayMaterial.needsUpdate = true;
	}
	,geoToWorld: function(c,v) {
		var local = this.geoToLocal(c,v);
		return this.earthMesh.localToWorld(local);
	}
	,geoToLocal: function(c,v) {
		if(v == null) v = new THREE.Vector3();
		var latRad = THREE.Math.degToRad(c.lat);
		var longRad = THREE.Math.degToRad(-c["long"]);
		var r = this.radius + c.alt * this.radius;
		v.x = r * Math.cos(latRad) * Math.cos(longRad);
		v.z = r * Math.cos(latRad) * Math.sin(longRad);
		v.y = r * Math.sin(latRad);
		return v;
	}
	,worldToGeo: function(p,c) {
		return this.localToGeo(this.earthMesh.worldToLocal(p),c);
	}
	,localToGeo: function(p,c) {
		if(c == null) c = new gis__$GeoCoord_CGeoCoord(0,0,0);
		var r = p.length();
		c.alt = r * this.radius - this.radius;
		c.lat = THREE.Math.radToDeg(Math.asin(p.y / r));
		c["long"] = -THREE.Math.radToDeg(Math.atan2(p.z,p.x));
		return c;
	}
	,addMarker: function(c) {
		var local = this.geoToLocal(c);
		var markerRadius = 0.005 * this.radius;
		var marker = new THREE.Mesh(this.markerSphereGeometry,this.markerMaterial);
		marker.scale.multiplyScalar(markerRadius);
		marker.position.copy(local);
		this.earthMesh.add(marker);
		return marker;
	}
	,setupObjects: function() {
		var _g2 = this;
		this.sun = new THREE.DirectionalLight(16774642,1.0);
		this.sun.position.set(0,0,this.radius * 2);
		this.sun.target.position.set(0,0,0);
		this.add(this.sun);
		this.colorTex = THREE.ImageUtils.loadTexture("" + this.assetRoot + "/maps/color-1_high.jpg");
		this.normalTex = THREE.ImageUtils.loadTexture("" + this.assetRoot + "/maps/normal-1_high.jpg");
		this.specTex = THREE.ImageUtils.loadTexture("" + this.assetRoot + "/maps/specular-1_low.png");
		this.colorTex.wrapS = this.colorTex.wrapT = THREE.RepeatWrapping;
		this.normalTex.wrapS = this.normalTex.wrapT = THREE.RepeatWrapping;
		this.specTex.wrapS = this.specTex.wrapT = THREE.RepeatWrapping;
		this.colorTex.anisotropy = Math.min(4,this.renderer.getMaxAnisotropy());
		this.earthContainer = new THREE.Object3D();
		this.earthContainer.rotateZ(-THREE.Math.degToRad(this.tilt));
		this.add(this.earthContainer);
		this.earthGeom = new THREE.BufferGeometry().fromGeometry(new THREE.SphereGeometry(this.radius,this.earthSegments,this.earthSegments));
		var tmp;
		var this1;
		this1 = new THREE.Color();
		this1.setHex(3355443);
		tmp = this1;
		var globeMat = new objects_globe_GlobeMaterial({ map : this.colorTex, normalMap : this.normalTex, normalScale : new THREE.Vector3(1.0,1.0,1.0), specularMap : this.specTex, specular : tmp, shininess : 12, wireframe : false});
		this.earthMesh = new THREE.Mesh(this.earthGeom,globeMat);
		this.earthContainer.add(this.earthMesh);
		if(this.atmosphereEnabled) {
			this.atmosphere = new objects_globe_Atmosphere(this.radius * (1 + this.atmospherePad),this.radius * (this.atmosphereHeight + 1));
			this.earthContainer.add(this.atmosphere);
		}
		var request = new haxe_Http("" + this.assetRoot + "/vectors/coastline-highres/topojson.json");
		request.onData = function(content) {
			var t = JSON.parse(content);
			var _g = 0;
			var _g1 = Reflect.fields(t.objects);
			while(_g < _g1.length) {
				var id = _g1[_g];
				++_g;
				var o = t.objects[id];
				_g2.handleGeoJsonObject(topojson.feature(t,o));
			}
		};
		request.request(false);
		this.setupOverlays();
	}
	,setupOverlays: function() {
		this.vectorOverlayMaterial = new THREE.LineBasicMaterial({ color : 16777215, transparent : true, opacity : 1.0, linewidth : 2.0, visible : false});
		this.gradientOverlayMaterial = new THREE.MeshLambertMaterial({ transparent : true, visible : false});
		this.overlay1Mesh = new THREE.Mesh(this.earthGeom,this.gradientOverlayMaterial);
		this.earthMesh.add(this.overlay1Mesh);
		this.particleOverlayMaterial = new THREE.MeshLambertMaterial({ transparent : true, visible : false});
		this.particleOverlayMaterial.blending = THREE.AdditiveBlending;
		this.overlay2Mesh = new THREE.Mesh(this.earthGeom,this.particleOverlayMaterial);
		this.earthMesh.add(this.overlay2Mesh);
	}
	,addGeoJsonLines: function(coordinates) {
		var geom = new THREE.BufferGeometry();
		var tmp;
		var _g = [];
		var _g1 = 0;
		while(_g1 < coordinates.length) {
			var c = coordinates[_g1];
			++_g1;
			var tmp1;
			var tmp2;
			var longitudeEast = c[0];
			var latitudeNorth = c[1];
			tmp2 = new gis__$GeoCoord_CGeoCoord(longitudeEast,latitudeNorth,c[2] != null?c[2]:0);
			tmp1 = tmp2;
			_g.push(this.geoToLocal(tmp1));
		}
		tmp = _g;
		var vertices = tmp;
		var verticesFlat = new Float32Array(vertices.length * 3);
		var _g2 = 0;
		var _g11 = vertices.length;
		while(_g2 < _g11) {
			var i = _g2++;
			verticesFlat.set(vertices[i].toArray(),i * 3);
		}
		geom.addAttribute("position",new THREE.BufferAttribute(verticesFlat,3));
		var line = new THREE.Line(geom,this.vectorOverlayMaterial);
		this.earthMesh.add(line);
	}
	,handleGeoJsonObject: function(o) {
		{
			var _g = gis_geojson_GeoJsonObjectHelper.getTypeEnum(o);
			switch(_g[1]) {
			case 0:
				this.handleGeoJsonObject(_g[2].geometry);
				break;
			case 1:
				var _g1 = 0;
				var _g2 = _g[2].features;
				while(_g1 < _g2.length) {
					var feature = _g2[_g1];
					++_g1;
					this.handleGeoJsonObject(feature);
				}
				break;
			case 2:
				var _g11 = 0;
				var _g21 = _g[2].geometries;
				while(_g11 < _g21.length) {
					var geometry = _g21[_g11];
					++_g11;
					this.handleGeoJsonObject(geometry);
				}
				break;
			case 3:
				this.addGeoJsonLines(_g[2].coordinates);
				break;
			case 4:
				var _g12 = 0;
				var _g22 = _g[2].coordinates;
				while(_g12 < _g22.length) {
					var cs = _g22[_g12];
					++_g12;
					this.addGeoJsonLines(cs);
				}
				break;
			case 8:case 5:case 6:case 7:
				throw new js__$Boot_HaxeError("unhandled GeoJson geometry type '" + o.type + "' (todo)");
				break;
			}
		}
	}
	,get_earthAngle: function() {
		return this.earthMesh.rotation.y;
	}
	,set_earthAngle: function(v) {
		this.earthMesh.rotation.y = v;
		if(this.atmosphereEnabled) this.atmosphere.rotation.y = v;
		return v;
	}
	,get_sunAngle: function() {
		return Math.atan2(-this.sun.position.z,this.sun.position.x);
	}
	,set_sunAngle: function(v) {
		this.sun.position.set(Math.cos(v) * this.sunDistance,0,-Math.sin(v) * this.sunDistance);
		return v;
	}
	,get_atmosphereGap: function() {
		return this.radius * this.atmospherePad;
	}
	,__class__: objects_globe_Globe
	,__properties__: {get_atmosphereGap:"get_atmosphereGap",set_sunAngle:"set_sunAngle",get_sunAngle:"get_sunAngle",set_earthAngle:"set_earthAngle",get_earthAngle:"get_earthAngle"}
});
var objects_globe_GlobeCamera = function(globe,fov,aspect,near,far) {
	this._rotationAxis = new THREE.Vector3();
	this._initialPosition = new THREE.Vector3();
	this.animationEasing = motion_easing_Quad.get_easeInOut();
	THREE.PerspectiveCamera.call(this,fov,aspect,near * globe.radius,far * globe.radius);
	this.globe = globe;
	this.raycaster = new THREE.Raycaster();
};
objects_globe_GlobeCamera.__name__ = true;
objects_globe_GlobeCamera.__super__ = THREE.PerspectiveCamera;
objects_globe_GlobeCamera.prototype = $extend(THREE.PerspectiveCamera.prototype,{
	setTargetVector: function(targetPosition,animationDuration,invertAngle) {
		if(invertAngle == null) invertAngle = false;
		if(isNaN(animationDuration)) animationDuration = 0;
		this._initialPosition.copy(this.position);
		this._rotationAxis.crossVectors(this.position,targetPosition).normalize();
		var angleDelta = this.position.angleTo(targetPosition);
		var targetCase = objects_globe_TargetCase.Normal;
		if(invertAngle) angleDelta = Math.PI * 2.0 - angleDelta;
		this.removeTween(this.positionTween);
		this.positionTween = motion_Actuate.update($bind(this,this.targetAnimationUpdate),animationDuration,[0.0,this._initialPosition.length()],[angleDelta,targetPosition.length()],true);
		this.positionTween.ease(this.animationEasing);
		return this.positionTween;
	}
	,setTargetVectorSequence: function(va,animationDuration) {
		var _g = this;
		this.removeTween(this.positionTween);
		var lastILow = -1;
		var pA;
		var pB;
		var rA;
		var rB;
		var angleDelta;
		this.positionTween = motion_Actuate.update(function(u) {
			var i = u * (va.length - 1);
			var iLow = Math.floor(i);
			iLow = iLow > va.length - 2?va.length - 2:iLow;
			var alpha = i - iLow;
			if(lastILow != iLow) {
				lastILow = iLow;
				pA = va[iLow];
				pB = va[iLow + 1];
				rA = pA.length();
				rB = pB.length();
				_g._rotationAxis.crossVectors(pA,pB).normalize();
				_g._initialPosition.copy(pA);
				angleDelta = pA.angleTo(pB);
			}
			var angle = angleDelta * alpha;
			var r = (rB - rA) * alpha + rA;
			_g.targetAnimationUpdate(angle,r);
		},animationDuration,[0],[1],true);
		return this.positionTween;
	}
	,setTargetGreatCircleAngle: function(passThroughA,passThroughB,angle,animationDuration) {
		var _g = this;
		this.removeTween(this.positionTween);
		var r = passThroughA.length();
		this._initialPosition.copy(passThroughA);
		this._rotationAxis.crossVectors(passThroughA,passThroughB).normalize();
		this.positionTween = motion_Actuate.update(function(u) {
			_g.targetAnimationUpdate(angle * u,r);
		},animationDuration,[0],[1],true);
		return this.positionTween;
	}
	,setTargetGeoCoord: function(c,animationDuration,invertAngle) {
		return this.setTargetVector(this.globe.geoToWorld(c),animationDuration,invertAngle);
	}
	,setTargetGeoCoordSequence: function(ca,animationDuration) {
		var tmp;
		var _g = [];
		var _g1 = 0;
		while(_g1 < ca.length) {
			++_g1;
			var tmp1;
			var tmp2;
			var longitudeEast = ca[0];
			var latitudeNorth = ca[1];
			tmp2 = new gis__$GeoCoord_CGeoCoord(longitudeEast,latitudeNorth,ca[2] != null?ca[2]:0);
			tmp1 = tmp2;
			_g.push(this.globe.geoToWorld(tmp1));
		}
		tmp = _g;
		return this.setTargetVectorSequence(tmp,animationDuration);
	}
	,raycastGlobe: function(startClipspace) {
		this.raycaster.setFromCamera(startClipspace,this);
		var intersects = this.raycaster.intersectObject(this.globe.earthMesh,false);
		if(intersects.length <= 0) return null;
		return intersects[0].point;
	}
	,distanceForApparentRadius: function(radius_cs) {
		var d = this.globe.radius / Math.sin(0.5 * THREE.Math.degToRad(this.fov));
		return d / radius_cs;
	}
	,altForApparentRadius: function(radius_cs) {
		return this.distanceForApparentRadius(radius_cs) - this.globe.radius;
	}
	,targetAnimationUpdate: function(angle,r) {
		if(isNaN(angle) || isNaN(r)) {
			debugger;
			return;
		}
		this.position.copy(this._initialPosition);
		this.position.applyAxisAngle(this._rotationAxis,angle);
		this.position.setLength(r);
		this.onPositionUpdated();
	}
	,onPositionUpdated: function() {
		this.lookAt(this.globe.position);
	}
	,removeTween: function(tween) {
		if(tween != null) {
			motion_Actuate.pause(tween);
			motion_Actuate.unload(tween);
			null;
		}
	}
	,__class__: objects_globe_GlobeCamera
});
var objects_globe_TargetCase = { __ename__ : true, __constructs__ : ["Normal","Parallel","AntiParallel"] };
objects_globe_TargetCase.Normal = ["Normal",0];
objects_globe_TargetCase.Normal.toString = $estr;
objects_globe_TargetCase.Normal.__enum__ = objects_globe_TargetCase;
objects_globe_TargetCase.Parallel = ["Parallel",1];
objects_globe_TargetCase.Parallel.toString = $estr;
objects_globe_TargetCase.Parallel.__enum__ = objects_globe_TargetCase;
objects_globe_TargetCase.AntiParallel = ["AntiParallel",2];
objects_globe_TargetCase.AntiParallel.toString = $estr;
objects_globe_TargetCase.AntiParallel.__enum__ = objects_globe_TargetCase;
var objects_globe_GlobeMaterial = function(parameters) {
	var p = parameters != null?parameters:{ };
	var tmp;
	if(p.uniforms != null) tmp = p.uniforms; else {
		var tmp1;
		var this1;
		this1 = new THREE.Color();
		this1.setHex(0);
		tmp1 = this1;
		var tmp2;
		var this2;
		this2 = new THREE.Color();
		this2.setHex(1118481);
		tmp2 = this2;
		tmp = THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.bump,THREE.UniformsLib.normalmap,THREE.UniformsLib.lights,{ 'emissive' : { type : "c", value : tmp1}, 'specular' : { type : "c", value : tmp2}, 'shininess' : { type : "f", value : 30}, 'wrapRGB' : { type : "v3", value : new THREE.Vector3(1,1,1)}}]);
	}
	p.uniforms = tmp;
	p.vertexShader = p.vertexShader != null?p.vertexShader:objects_globe_GlobeMaterial.vertexShaderStr;
	p.fragmentShader = p.fragmentShader != null?p.fragmentShader:objects_globe_GlobeMaterial.fragmentShaderStr;
	p.fog = p.fog != null && p.fog;
	p.lights = p.lights != null?p.lights:true;
	THREE.ShaderMaterial.call(this,{ });
	this.uniforms = p.uniforms;
	this.vertexShader = p.vertexShader;
	this.fragmentShader = p.fragmentShader;
	this.fog = p.fog;
	this.lights = p.lights;
	this.set_opacity_(p.opacity_ != null?p.opacity_:this.get_opacity_());
	this.set_diffuse(p.diffuse != null?p.diffuse:this.get_diffuse());
	this.set_map(p.map != null?p.map:this.get_map());
	this.set_specularMap(p.specularMap != null?p.specularMap:this.get_specularMap());
	this.set_normalMap(p.normalMap != null?p.normalMap:this.get_normalMap());
	this.set_normalScale(p.normalScale != null?p.normalScale:this.get_normalScale());
	this.set_alphaMap(p.alphaMap != null?p.alphaMap:this.get_alphaMap());
	this.set_bumpMap(p.bumpMap != null?p.bumpMap:this.get_bumpMap());
	this.set_bumpScale(p.bumpScale != null?p.bumpScale:this.get_bumpScale());
	this.set_reflectivity(p.reflectivity != null?p.reflectivity:this.get_reflectivity());
	this.set_refractionRatio(p.refractionRatio != null?p.refractionRatio:this.get_refractionRatio());
	this.set_shininess(p.shininess != null?p.shininess:this.get_shininess());
	this.set_emissive(p.emissive != null?p.emissive:this.get_emissive());
	this.set_specular(p.specular != null?p.specular:this.get_specular());
	this.set_offsetRepeatOverride(p.offsetRepeatOverride != null?p.offsetRepeatOverride:this.get_offsetRepeatOverride());
};
objects_globe_GlobeMaterial.__name__ = true;
objects_globe_GlobeMaterial.__super__ = THREE.ShaderMaterial;
objects_globe_GlobeMaterial.prototype = $extend(THREE.ShaderMaterial.prototype,{
	clone: function(material) {
		if(material != null) return THREE.ShaderMaterial.prototype.clone.call(this,material); else {
			var globeMaterial = new objects_globe_GlobeMaterial();
			THREE.ShaderMaterial.prototype.clone.call(this,globeMaterial);
			globeMaterial.fragmentShader = this.fragmentShader;
			globeMaterial.vertexShader = this.vertexShader;
			globeMaterial.uniforms = THREE.UniformsUtils.clone(this.uniforms);
			globeMaterial.defines = this.defines;
			globeMaterial.shading = this.shading;
			globeMaterial.wireframe = this.wireframe;
			globeMaterial.wireframeLinewidth = this.wireframeLinewidth;
			globeMaterial.fog = this.fog;
			globeMaterial.lights = this.lights;
			globeMaterial.vertexColors = this.vertexColors;
			globeMaterial.skinning = this.skinning;
			globeMaterial.morphTargets = this.morphTargets;
			globeMaterial.morphNormals = this.morphNormals;
			globeMaterial.set_opacity_(this.get_opacity_());
			globeMaterial.set_diffuse(this.get_diffuse());
			globeMaterial.set_map(this.get_map());
			globeMaterial.set_specularMap(this.get_specularMap());
			globeMaterial.set_normalMap(this.get_normalMap());
			globeMaterial.set_normalScale(this.get_normalScale());
			globeMaterial.set_alphaMap(this.get_alphaMap());
			globeMaterial.set_bumpMap(this.get_bumpMap());
			globeMaterial.set_bumpScale(this.get_bumpScale());
			globeMaterial.set_reflectivity(this.get_reflectivity());
			globeMaterial.set_refractionRatio(this.get_refractionRatio());
			globeMaterial.set_shininess(this.get_shininess());
			globeMaterial.set_emissive(this.get_emissive());
			globeMaterial.set_specular(this.get_specular());
			globeMaterial.set_offsetRepeatOverride(this.get_offsetRepeatOverride());
			return globeMaterial;
		}
	}
	,get_opacity_: function() {
		return this.uniforms.opacity.value;
	}
	,set_opacity_: function(v) {
		this.opacity_ = v;
		return this.uniforms.opacity.value = v;
	}
	,get_diffuse: function() {
		return this.uniforms.diffuse.value;
	}
	,set_diffuse: function(v) {
		this.diffuse = v;
		return this.uniforms.diffuse.value = v;
	}
	,get_map: function() {
		return this.uniforms.map.value;
	}
	,set_map: function(v) {
		if(this.get_offsetRepeatOverride() == null && v != null) this.uniforms.offsetRepeat.value.set(v.offset.x,v.offset.y,v.repeat.x,v.repeat.y);
		this.map = v;
		return this.uniforms.map.value = v;
	}
	,get_specularMap: function() {
		return this.uniforms.specularMap.value;
	}
	,set_specularMap: function(v) {
		if(this.get_offsetRepeatOverride() == null && v != null && this.get_map() == null) this.uniforms.offsetRepeat.value.set(v.offset.x,v.offset.y,v.repeat.x,v.repeat.y);
		this.specularMap = v;
		return this.uniforms.specularMap.value = v;
	}
	,get_normalMap: function() {
		return this.uniforms.normalMap.value;
	}
	,set_normalMap: function(v) {
		if(this.get_offsetRepeatOverride() == null && v != null && this.get_map() == null && this.get_specularMap() == null) this.uniforms.offsetRepeat.value.set(v.offset.x,v.offset.y,v.repeat.x,v.repeat.y);
		this.normalMap = v;
		return this.uniforms.normalMap.value = v;
	}
	,get_normalScale: function() {
		return this.uniforms.normalScale.value;
	}
	,set_normalScale: function(v) {
		this.normalScale = v;
		return this.uniforms.normalScale.value = v;
	}
	,get_bumpMap: function() {
		return this.uniforms.bumpMap.value;
	}
	,set_bumpMap: function(v) {
		if(this.get_offsetRepeatOverride() == null && v != null && this.get_map() == null && this.get_specularMap() == null && this.get_normalMap() == null) this.uniforms.offsetRepeat.value.set(v.offset.x,v.offset.y,v.repeat.x,v.repeat.y);
		this.bumpMap = v;
		return this.uniforms.bumpMap.value = v;
	}
	,get_bumpScale: function() {
		return this.uniforms.bumpScale.value;
	}
	,set_bumpScale: function(v) {
		this.bumpScale = v;
		return this.uniforms.bumpScale.value = v;
	}
	,get_alphaMap: function() {
		return this.uniforms.alphaMap.value;
	}
	,set_alphaMap: function(v) {
		if(this.get_offsetRepeatOverride() == null && v != null && this.get_map() == null && this.get_specularMap() == null && this.get_normalMap() == null && this.get_bumpMap() == null) this.uniforms.offsetRepeat.value.set(v.offset.x,v.offset.y,v.repeat.x,v.repeat.y);
		this.alphaMap = v;
		return this.uniforms.alphaMap.value = v;
	}
	,get_reflectivity: function() {
		return this.uniforms.reflectivity.value;
	}
	,set_reflectivity: function(v) {
		this.reflectivity = v;
		return this.uniforms.reflectivity.value = v;
	}
	,get_refractionRatio: function() {
		return this.uniforms.refractionRatio.value;
	}
	,set_refractionRatio: function(v) {
		this.refractionRatio = v;
		return this.uniforms.refractionRatio.value = v;
	}
	,get_shininess: function() {
		return this.uniforms.shininess.value;
	}
	,set_shininess: function(v) {
		this.shininess = v;
		return this.uniforms.shininess.value = v;
	}
	,get_emissive: function() {
		return this.uniforms.emissive.value;
	}
	,set_emissive: function(v) {
		this.emissive = v;
		return this.uniforms.emissive.value = v;
	}
	,get_specular: function() {
		return this.uniforms.specular.value;
	}
	,set_specular: function(v) {
		this.specular = v;
		return this.uniforms.specular.value = v;
	}
	,get_offsetRepeatOverride: function() {
		return this.uniforms.offsetRepeat.value;
	}
	,set_offsetRepeatOverride: function(v) {
		this.offsetRepeatOverride = v;
		return this.uniforms.offsetRepeat.value = v;
	}
	,__class__: objects_globe_GlobeMaterial
	,__properties__: {set_offsetRepeatOverride:"set_offsetRepeatOverride",get_offsetRepeatOverride:"get_offsetRepeatOverride",set_specular:"set_specular",get_specular:"get_specular",set_emissive:"set_emissive",get_emissive:"get_emissive",set_shininess:"set_shininess",get_shininess:"get_shininess",set_refractionRatio:"set_refractionRatio",get_refractionRatio:"get_refractionRatio",set_reflectivity:"set_reflectivity",get_reflectivity:"get_reflectivity",set_bumpScale:"set_bumpScale",get_bumpScale:"get_bumpScale",set_bumpMap:"set_bumpMap",get_bumpMap:"get_bumpMap",set_alphaMap:"set_alphaMap",get_alphaMap:"get_alphaMap",set_normalScale:"set_normalScale",get_normalScale:"get_normalScale",set_normalMap:"set_normalMap",get_normalMap:"get_normalMap",set_specularMap:"set_specularMap",get_specularMap:"get_specularMap",set_map:"set_map",get_map:"get_map",set_diffuse:"set_diffuse",get_diffuse:"get_diffuse",set_opacity_:"set_opacity_",get_opacity_:"get_opacity_"}
});
var render_ShaderPass = function(renderer,width,height,options) {
	this.renderer = renderer;
	this.camera = render_ShaderPass.staticCamera;
	this.planeGeom = render_ShaderPass.staticPlaneGeom;
	this.renderTarget = new THREE.WebGLRenderTarget(width,height,options);
	this.scene = new THREE.Scene();
	this.quad = new THREE.Mesh(this.planeGeom,null);
	this.scene.add(this.quad);
};
render_ShaderPass.__name__ = true;
render_ShaderPass.prototype = {
	dispose: function() {
		this.renderTarget.dispose();
	}
	,render: function(forceClear,dt_ms) {
		if(dt_ms == null) dt_ms = 16.6666666666666679;
		if(forceClear == null) forceClear = false;
		this.renderer.render(this.scene,this.camera,this.renderTarget,forceClear);
	}
	,setMaterial: function(material) {
		this.quad.material = material;
	}
	,__class__: render_ShaderPass
};
var shaderlib_Chunks = function() { };
shaderlib_Chunks.__name__ = true;
var objects_globe_GradientMap = function(renderer,sequence,colorValueFn) {
	if(colorValueFn == null) colorValueFn = "blueWhite(x)";
	var _g = this;
	this.sequenceView = new objects_globe_MapSequenceView(sequence);
	render_ShaderPass.call(this,renderer,sequence.info.mapInfo.width,sequence.info.mapInfo.height,{ format : THREE.RGBFormat, type : THREE.UnsignedByteType, wrapS : THREE.ClampToEdgeWrapping, wrapT : THREE.ClampToEdgeWrapping, minFilter : THREE.LinearFilter, magFilter : THREE.LinearFilter, anisotropy : Math.max(4,renderer.getMaxAnisotropy()), depthBuffer : false, stencilBuffer : false});
	var tmp;
	var _g1 = sequence.info.mapInfo.modeName.toLowerCase();
	var _g11 = sequence.info.mapInfo.modeParameters;
	switch(_g1) {
	case "pack":
		switch(_g11.length) {
		case 1:
			switch(_g11[0]) {
			case "1-2":
				tmp = "length(read1_2(tex, uv))";
				break;
			default:
				throw new js__$Boot_HaxeError("unsupported map packing '" + _g1 + " " + Std.string(_g11) + "'");
			}
			break;
		default:
			throw new js__$Boot_HaxeError("unsupported map packing '" + _g1 + " " + Std.string(_g11) + "'");
		}
		break;
	case "gradientname":
		switch(_g11.length) {
		case 1:
			switch(_g11[0]) {
			case "black-white":
				tmp = "texture2D(tex, uv).r";
				break;
			default:
				throw new js__$Boot_HaxeError("unsupported map packing '" + _g1 + " " + Std.string(_g11) + "'");
			}
			break;
		default:
			throw new js__$Boot_HaxeError("unsupported map packing '" + _g1 + " " + Std.string(_g11) + "'");
		}
		break;
	default:
		throw new js__$Boot_HaxeError("unsupported map packing '" + _g1 + " " + Std.string(_g11) + "'");
	}
	var readFrameValue = tmp;
	this.material = new THREE.ShaderMaterial({ vertexShader : shaderlib_Vertex.basic_uv, fragmentShader : objects_globe_GradientMap.fragmentShaderStr, uniforms : { frame0 : { type : "t", value : null}, frame1 : { type : "t", value : null}, frameMix : { type : "f", value : 0}}, defines : { OFFSET : sequence.info.mapInfo.offset, INV_SCALE : 1 / sequence.info.mapInfo.scale, 'READ_VALUE_FN(tex, uv)' : readFrameValue, 'COLOR_VALUE_FN(x)' : colorValueFn}});
	this.quad.material = this.material;
	this.sequenceView.onTex0Change = function(tex) {
		_g.material.uniforms.frame0.value = tex;
	};
	this.sequenceView.onTex1Change = function(tex1) {
		_g.material.uniforms.frame1.value = tex1;
	};
	this.sequenceView.onAlphaChange = function(alpha) {
		_g.material.uniforms.frameMix.value = alpha;
	};
	this.sequenceView.onFrameChanged = function() {
		_g.render();
	};
};
objects_globe_GradientMap.__name__ = true;
objects_globe_GradientMap.__super__ = render_ShaderPass;
objects_globe_GradientMap.prototype = $extend(render_ShaderPass.prototype,{
	dispose: function() {
		render_ShaderPass.prototype.dispose.call(this);
		this.material.dispose();
	}
	,__class__: objects_globe_GradientMap
});
var objects_globe_MapSequence = function(dirUrl,parameters) {
	var _g = this;
	if(parameters == null) parameters = { };
	this.dirUrl = dirUrl;
	this.parameters = parameters;
	this.ready = false;
	this.pathArray = [];
	this.timeArray = [];
	this.textureArray = [];
	this.onReadyCallbacks = [];
	this.textureRequestsArray = [];
	this.textureReadyCallbacks = [];
	var req = new haxe_Http(haxe_io_Path.join([dirUrl,objects_globe_MapSequence.infoFilename]));
	req.onData = function(content) {
		_g.setup(JSON.parse(content));
		_g.ready = true;
		var _g1 = 0;
		var _g2 = _g.onReadyCallbacks;
		while(_g1 < _g2.length) {
			var cb = _g2[_g1];
			++_g1;
			cb(_g);
		}
	};
	req.request(false);
};
objects_globe_MapSequence.__name__ = true;
objects_globe_MapSequence.prototype = {
	dispose: function() {
		var _g = 0;
		var _g1 = this.textureArray;
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			t.dispose();
		}
		var _g11 = 0;
		var _g2 = this.textureReadyCallbacks.length;
		while(_g11 < _g2) {
			var i = _g11++;
			this.textureReadyCallbacks[i] = [];
		}
	}
	,onReady: function(callback) {
		if(this.ready) callback(this); else this.onReadyCallbacks.push(callback);
	}
	,removeCallback: function(callback) {
		var match = false;
		var i = this.onReadyCallbacks.length - 1;
		while(i >= 0) {
			if(this.onReadyCallbacks[i] == callback) {
				this.onReadyCallbacks.splice(i,1);
				match = true;
			}
			i--;
		}
		if(match) return true;
		var _g = 0;
		var _g1 = this.textureReadyCallbacks;
		while(_g < _g1.length) {
			var textureCallbacks = _g1[_g];
			++_g;
			var i1 = textureCallbacks.length - 1;
			while(i1 >= 0) {
				if(textureCallbacks[i1] == callback) {
					textureCallbacks.splice(i1,1);
					match = true;
				}
				i1--;
			}
		}
		if(match) return true;
		return false;
	}
	,requestTexture: function(i,onTextureReady) {
		var tex = this.textureArray[i];
		if(tex == null) this.loadTexture(i,onTextureReady); else if(onTextureReady != null) onTextureReady(tex);
	}
	,nearestIndices: function(u) {
		var _g = this;
		if(this.count <= 1) return { i0 : 0, i1 : 0, alpha : 0};
		var tmp;
		var x = u;
		if(x < 0) x = 0;
		if(x > 1) x = 1;
		tmp = x;
		u = tmp;
		var targetTime = u * this.duration + this.startTime;
		var linearIdx = Math.round(u * (this.count - 1));
		var i = linearIdx;
		var d0 = targetTime - _g.timeArray[linearIdx] >= 0?1:-1;
		while(i + d0 < this.timeArray.length) {
			i += d0;
			if((targetTime - _g.timeArray[i] >= 0?1:-1) != d0) break;
		}
		var i0 = i - d0;
		var i1 = i;
		if(i1 < i0) {
			var tmp1 = i0;
			i0 = i1;
			i1 = tmp1;
		}
		var t0 = this.timeArray[i0];
		var t1 = this.timeArray[i1];
		var alpha = (targetTime - t0) / (t1 - t0);
		return { i0 : i0, i1 : i1, alpha : alpha};
	}
	,setup: function(info) {
		this.info = info;
		var orderedKeys = Reflect.fields(info.sequence);
		orderedKeys.sort(function(a,b) {
			var ta = parseFloat(a);
			var tb = parseFloat(b);
			return ta > tb?1:-1;
		});
		var _g = 0;
		while(_g < orderedKeys.length) {
			var k = orderedKeys[_g];
			++_g;
			var file = info.sequence[k];
			var time_ms = parseFloat(k);
			this.pathArray.push(haxe_io_Path.join([this.dirUrl,file]));
			this.timeArray.push(time_ms);
			this.textureRequestsArray.push(0);
			this.textureReadyCallbacks.push([]);
		}
		this.count = orderedKeys.length;
		this.startTime = this.timeArray[0];
		this.endTime = this.timeArray[this.timeArray.length - 1];
		this.duration = this.endTime - this.startTime;
	}
	,loadTexture: function(idx,onReady) {
		var _g = this;
		if(onReady != null) this.textureReadyCallbacks[idx].push(onReady);
		if(this.textureRequestsArray[idx]++ > 0) return;
		var texture1 = THREE.ImageUtils.loadTexture(this.pathArray[idx],null,function(texture) {
			_g.textureArray[idx] = texture;
			var _g1 = 0;
			var _g2 = _g.textureReadyCallbacks[idx];
			while(_g1 < _g2.length) {
				var cb = _g2[_g1];
				++_g1;
				cb(texture);
			}
		});
		var _g3 = this.info.mapInfo.modeName.toLowerCase();
		switch(_g3) {
		case "pack":case "bitpack":
			texture1.minFilter = THREE.NearestFilter;
			texture1.magFilter = THREE.NearestFilter;
			break;
		default:
		}
		if(this.parameters.overrideMinFiltering != null) texture1.minFilter = this.parameters.overrideMinFiltering;
		if(this.parameters.overrideMagFiltering != null) texture1.magFilter = this.parameters.overrideMagFiltering;
	}
	,__class__: objects_globe_MapSequence
};
var objects_globe_MapSequenceView = function(sequence) {
	this.requestId = 0;
	this.loading = false;
	this.progress = 0;
	this.onFrameChanged = function() {
	};
	this.onFrameLoading = function() {
	};
	this.onAlphaChange = function(f) {
	};
	this.onTex1Change = function(t) {
	};
	this.onTex0Change = function(t) {
	};
	this.sequence = sequence;
};
objects_globe_MapSequenceView.__name__ = true;
objects_globe_MapSequenceView.prototype = {
	set_progress: function(u) {
		var _g = this;
		var nearest = this.sequence.nearestIndices(u);
		var c0 = nearest.i0 != this.i0;
		var c1 = nearest.i1 != this.i1;
		var remaining = 0;
		if(c0 || c1) this.requestId++;
		if(c0) remaining++;
		if(c1) remaining++;
		var _tex0 = this.tex0;
		var _tex1 = this.tex1;
		var tryChange = function() {
			if(remaining > 0) return;
			var changed = false;
			if(_tex0 != _g.tex0) {
				_g.tex0 = _tex0;
				_g.i0 = nearest.i0;
				_g.onTex0Change(_g.tex0);
				changed = true;
			}
			if(_tex1 != _g.tex1) {
				_g.tex1 = _tex1;
				_g.i1 = nearest.i1;
				_g.onTex1Change(_g.tex1);
				changed = true;
			}
			if(nearest.alpha != _g.alpha) {
				_g.alpha = nearest.alpha;
				_g.onAlphaChange(_g.alpha);
				changed = true;
			}
			_g.loading = false;
			if(changed) _g.onFrameChanged();
		};
		if(c0) {
			var tmp;
			var callId = this.requestId;
			tmp = function(tex) {
				if(callId != _g.requestId) return;
				_tex0 = tex;
				remaining--;
				tryChange();
			};
			this.sequence.requestTexture(nearest.i0,tmp);
		}
		if(c1) {
			var tmp1;
			var callId1 = this.requestId;
			tmp1 = function(tex1) {
				if(callId1 != _g.requestId) return;
				_tex1 = tex1;
				remaining--;
				tryChange();
			};
			this.sequence.requestTexture(nearest.i1,tmp1);
		}
		if(remaining > 0) {
			this.loading = true;
			this.onFrameLoading();
		}
		tryChange();
		return this.progress = u;
	}
	,__class__: objects_globe_MapSequenceView
	,__properties__: {set_progress:"set_progress"}
};
var render_ShaderPass2Phase = function(renderer,width,height,options) {
	render_ShaderPass.call(this,renderer,width,height,options);
	this.readTarget = this.renderTarget;
	this.writeTarget = this.renderTarget.clone();
};
render_ShaderPass2Phase.__name__ = true;
render_ShaderPass2Phase.__super__ = render_ShaderPass;
render_ShaderPass2Phase.prototype = $extend(render_ShaderPass.prototype,{
	render: function(forceClear,dt_ms) {
		if(dt_ms == null) dt_ms = 16.6666666666666679;
		if(forceClear == null) forceClear = false;
		this.renderer.render(this.scene,this.camera,this.writeTarget,forceClear);
		var tmp = this.readTarget;
		this.readTarget = this.writeTarget;
		this.writeTarget = tmp;
	}
	,swapTargets: function() {
		var tmp = this.readTarget;
		this.readTarget = this.writeTarget;
		this.writeTarget = tmp;
	}
	,__class__: render_ShaderPass2Phase
});
var objects_globe_ParticleFlowMap = function(renderer,sequence,parameters) {
	if(parameters == null) parameters = { };
	parameters.renderWidth = parameters.renderWidth != null?parameters.renderWidth:4096;
	parameters.renderHeight = parameters.renderHeight != null?parameters.renderHeight:2048;
	parameters.countPowerOf2 = parameters.countPowerOf2 != null?parameters.countPowerOf2:18;
	parameters.decayHalfLife = parameters.decayHalfLife != null?parameters.decayHalfLife:0.2;
	parameters.particleOpacity = parameters.particleOpacity != null?parameters.particleOpacity:0.3;
	parameters.particleSize = parameters.particleSize != null?parameters.particleSize:2.0;
	parameters.particleLifetime = parameters.particleLifetime != null?parameters.particleLifetime:5.3;
	parameters.velocityScale = parameters.velocityScale != null?parameters.velocityScale:0.0018;
	render_ShaderPass2Phase.call(this,renderer,parameters.renderWidth,parameters.renderHeight,{ format : THREE.RGBAFormat, type : THREE.UnsignedByteType, wrapS : THREE.RepeatWrapping, wrapT : THREE.RepeatWrapping, minFilter : THREE.LinearFilter, magFilter : THREE.LinearFilter, anisotropy : Math.max(4,renderer.getMaxAnisotropy()), depthBuffer : false, stencilBuffer : false});
	this.particles = new objects_globe__$ParticleFlowMap_ParticleSimulation(renderer,sequence,parameters);
	this.particleRenderObject = new objects_globe__$ParticleFlowMap_ParticleRenderObject(renderer,this.particles,parameters);
	this.processLastFrame = new THREE.ShaderMaterial({ vertexShader : shaderlib_Vertex.basic_uv, fragmentShader : objects_globe_ParticleFlowMap.processLastFrameFragment, uniforms : { lastFrame : { type : "t", value : null}, dt_s : { type : "f", value : 0.0166666666666666664}}});
	this.processLastFrame.uniforms.halfLife = { type : "f", value : parameters.decayHalfLife};
};
objects_globe_ParticleFlowMap.__name__ = true;
objects_globe_ParticleFlowMap.__super__ = render_ShaderPass2Phase;
objects_globe_ParticleFlowMap.prototype = $extend(render_ShaderPass2Phase.prototype,{
	dispose: function() {
		throw new js__$Boot_HaxeError("@! todo: dispose not yet implemented");
	}
	,step: function(dt_ms) {
		this.particles.step(dt_ms / 1000);
	}
	,render: function(forceClear,dt_ms) {
		if(dt_ms == null) dt_ms = 16.6666666666666679;
		if(forceClear == null) forceClear = false;
		this.processLastFrame.uniforms.lastFrame.value = this.readTarget;
		this.processLastFrame.uniforms.dt_s.value = dt_ms / 1000;
		this.quad.material = this.processLastFrame;
		this.renderer.render(this.scene,this.camera,this.writeTarget,forceClear);
		this.renderer.setRenderTarget(this.writeTarget);
		this.particleRenderObject.render();
		var tmp = this.readTarget;
		this.readTarget = this.writeTarget;
		this.writeTarget = tmp;
	}
	,setParameters: function(parameters) {
		if(parameters.decayHalfLife != null) this.processLastFrame.uniforms.halfLife.value = parameters.decayHalfLife;
		this.particles.setParameters(parameters);
		this.particleRenderObject.setParameters(parameters);
	}
	,get_sequence: function() {
		return this.particles.sequence;
	}
	,set_sequence: function(seq) {
		return this.particles.set_sequence(seq);
	}
	,get_sequenceView: function() {
		return this.particles.sequenceView;
	}
	,__class__: objects_globe_ParticleFlowMap
	,__properties__: {get_sequenceView:"get_sequenceView",set_sequence:"set_sequence",get_sequence:"get_sequence"}
});
var objects_globe__$ParticleFlowMap_ParticleRenderObject = function(renderer,particles,parameters) {
	THREE.Object3D.call(this);
	this.renderer = renderer;
	this.particles = particles;
	this._modelViewMatrix = new THREE.Matrix4();
	var textureSize = particles.textureSize;
	this.lookupUVArray = new Float32Array(textureSize * textureSize * 2);
	var texelSize = 1 / textureSize * .5;
	var _g = 0;
	while(_g < textureSize) {
		var i = _g++;
		var _g1 = 0;
		while(_g1 < textureSize) {
			var j = _g1++;
			var index = (i * textureSize + j) * 2;
			this.lookupUVArray[index] = i / textureSize + texelSize;
			this.lookupUVArray[index + 1] = j / textureSize + texelSize;
		}
	}
	this.material = new THREE.RawShaderMaterial({ vertexShader : objects_globe__$ParticleFlowMap_ParticleRenderObject.vertexShaderStr, fragmentShader : objects_globe__$ParticleFlowMap_ParticleRenderObject.fragmentShaderStr, uniforms : { positions : { type : "t", value : null}}, attributes : { 'lookUpUV' : { type : "v2"}}});
	this.material.uniforms.particleOpacity = { type : "f", value : parameters.particleOpacity};
	this.material.uniforms.particleSize = { type : "f", value : parameters.particleSize};
};
objects_globe__$ParticleFlowMap_ParticleRenderObject.__name__ = true;
objects_globe__$ParticleFlowMap_ParticleRenderObject.__super__ = THREE.Object3D;
objects_globe__$ParticleFlowMap_ParticleRenderObject.prototype = $extend(THREE.Object3D.prototype,{
	render: function() {
		this.material.uniforms.positions.value = this.particles.readTarget;
		this.renderer.renderImmediateObject(objects_globe__$ParticleFlowMap_ParticleRenderObject.dummyCamera,[],null,this.material,this);
	}
	,immediateRenderCallback: function(program,gl,frustum) {
		var state = this.renderer.state;
		state.setDepthTest(false);
		state.setDepthWrite(false);
		state.setColorWrite(true);
		state.initAttributes();
		if(this.__webglLookupUVBuffer == null) {
			this.__webglLookupUVBuffer = gl.createBuffer();
			gl.bindBuffer(34962,this.__webglLookupUVBuffer);
			gl.bufferData(34962,this.lookupUVArray,35044);
		} else gl.bindBuffer(34962,this.__webglLookupUVBuffer);
		state.enableAttribute(program.attributes.lookUpUV);
		gl.vertexAttribPointer(program.attributes.lookUpUV,2,5126,false,0,0);
		state.disableUnusedAttributes();
		state.setBlending(THREE.AdditiveBlending);
		gl.drawArrays(0,0,this.particles.count);
	}
	,setParameters: function(parameters) {
		if(parameters.particleOpacity != null) this.material.uniforms.particleOpacity.value = parameters.particleOpacity;
		if(parameters.particleSize != null) this.material.uniforms.particleSize.value = parameters.particleSize;
	}
	,__class__: objects_globe__$ParticleFlowMap_ParticleRenderObject
});
var objects_globe__$ParticleFlowMap_ParticleSimulation = function(renderer,sequence,parameters) {
	this.dataReady = false;
	var countPOT = parameters.countPowerOf2;
	if(countPOT % 2 != 0) countPOT--;
	this.count = 1 << countPOT;
	this.textureSize = 1 << (countPOT * .5 | 0);
	haxe_Log.trace("setting up particles, count: " + this.count + ", texture size: " + this.textureSize + " x " + this.textureSize,{ fileName : "ParticleFlowMap.hx", lineNumber : 330, className : "objects.globe._ParticleFlowMap.ParticleSimulation", methodName : "new"});
	render_ShaderPass2Phase.call(this,renderer,this.textureSize,this.textureSize,{ format : THREE.RGBAFormat, type : THREE.UnsignedByteType, wrapS : THREE.ClampToEdgeWrapping, wrapT : THREE.ClampToEdgeWrapping, minFilter : THREE.NearestFilter, magFilter : THREE.NearestFilter, anisotropy : 1, depthBuffer : false, stencilBuffer : false});
	this.initialConditionsMaterial = new THREE.ShaderMaterial({ vertexShader : shaderlib_Vertex.basic_uv, fragmentShader : objects_globe__$ParticleFlowMap_ParticleSimulation.initialConditionsFragment});
	this.positionStepMaterial = new THREE.ShaderMaterial({ vertexShader : shaderlib_Vertex.basic_uv, fragmentShader : objects_globe__$ParticleFlowMap_ParticleSimulation.positionStepFragment, uniforms : { particlePositions : { type : "t", value : null}, velocities0 : { type : "t", value : null}, velocities1 : { type : "t", value : null}, frameMix : { type : "f", value : 0}, dt_s : { type : "f", value : 0.0166666666666666664}, randomSeed : { type : "f", value : 1.0}}});
	this.positionStepMaterial.uniforms.meanLifetime = { type : "f", value : parameters.particleLifetime};
	this.positionStepMaterial.uniforms.velocityScale = { type : "f", value : parameters.velocityScale};
	this.set_sequence(sequence);
	this.quad.material = this.initialConditionsMaterial;
	this.render();
};
objects_globe__$ParticleFlowMap_ParticleSimulation.__name__ = true;
objects_globe__$ParticleFlowMap_ParticleSimulation.__super__ = render_ShaderPass2Phase;
objects_globe__$ParticleFlowMap_ParticleSimulation.prototype = $extend(render_ShaderPass2Phase.prototype,{
	step: function(dt_s) {
		if(this.dataReady) {
			this.positionStepMaterial.uniforms.dt_s.value = dt_s;
			this.positionStepMaterial.uniforms.particlePositions.value = this.readTarget;
			this.positionStepMaterial.uniforms.randomSeed.value = Math.random();
			this.quad.material = this.positionStepMaterial;
			this.render();
		}
	}
	,setParameters: function(parameters) {
		if(parameters.countPowerOf2 != null) {
			if(1 << parameters.countPowerOf2 != this.count) throw new js__$Boot_HaxeError("changing particle count is not yet supported");
		}
		if(parameters.particleLifetime != null) this.positionStepMaterial.uniforms.meanLifetime.value = parameters.particleLifetime;
		if(parameters.velocityScale != null) this.positionStepMaterial.uniforms.velocityScale.value = parameters.velocityScale;
	}
	,set_sequence: function(seq) {
		var _g = this;
		this.sequence = seq;
		if(seq != null) {
			this.sequenceView = new objects_globe_MapSequenceView(seq);
			this.sequenceView.onTex0Change = function(tex) {
				_g.positionStepMaterial.uniforms.velocities0.value = tex;
			};
			this.sequenceView.onTex1Change = function(tex1) {
				_g.positionStepMaterial.uniforms.velocities1.value = tex1;
			};
			this.sequenceView.onAlphaChange = function(alpha) {
				_g.positionStepMaterial.uniforms.frameMix.value = alpha;
			};
			this.sequenceView.onFrameChanged = function() {
				_g.dataReady = true;
			};
			this.positionStepMaterial.defines.OFFSET = seq.info.mapInfo.offset;
			this.positionStepMaterial.defines.INV_SCALE = 1 / seq.info.mapInfo.scale;
			var _g1 = seq.info.mapInfo.modeName.toLowerCase();
			var _g11 = seq.info.mapInfo.modeParameters;
			switch(_g1) {
			case "pack":
				switch(_g11.length) {
				case 1:
					switch(_g11[0]) {
					case "1-2":
						"read1_2(tex, uv)";
						break;
					default:
						throw new js__$Boot_HaxeError("unsupported map packing '" + _g1 + " " + Std.string(_g11) + "'");
					}
					break;
				default:
					throw new js__$Boot_HaxeError("unsupported map packing '" + _g1 + " " + Std.string(_g11) + "'");
				}
				break;
			default:
				throw new js__$Boot_HaxeError("unsupported map packing '" + _g1 + " " + Std.string(_g11) + "'");
			}
			this.positionStepMaterial.defines["READ_VALUE_FN(tex, uv)"] = "read1_2(tex, uv)";
			this.positionStepMaterial.needsUpdate = true;
		} else {
			this.dataReady = false;
			this.positionStepMaterial.uniforms.velocities0.value = null;
			this.positionStepMaterial.uniforms.velocities1.value = null;
			this.positionStepMaterial.uniforms.frameMix.value = 0;
		}
		return this.sequence;
	}
	,__class__: objects_globe__$ParticleFlowMap_ParticleSimulation
	,__properties__: {set_sequence:"set_sequence"}
});
var objects_migrationpath_MigrationPath = function(globe,geoPoints,material,altitudeOffset,thickness,segments) {
	if(segments == null) segments = 200;
	if(thickness == null) thickness = 0.015;
	if(altitudeOffset == null) altitudeOffset = 0;
	var worldPoints = [];
	var _g = 0;
	while(_g < geoPoints.length) {
		var gc = geoPoints[_g];
		++_g;
		gc.alt = globe.radius * globe.atmospherePad * .5 + altitudeOffset * globe.radius;
		worldPoints.push(globe.geoToLocal(gc));
	}
	this.primary = new THREE.SplineCurve3(worldPoints);
	var sphereNormal = function(u,t,p,tan,curve) {
		return p;
	};
	var width = function(u1,t1) {
		return thickness * globe.radius;
	};
	this.ribbonGeom = new geometry_RibbonGeometry(this.primary,width,sphereNormal,segments,1);
	THREE.Mesh.call(this,this.ribbonGeom,material);
};
objects_migrationpath_MigrationPath.__name__ = true;
objects_migrationpath_MigrationPath.__super__ = THREE.Mesh;
objects_migrationpath_MigrationPath.prototype = $extend(THREE.Mesh.prototype,{
	get_progress: function() {
		return this.material.uniforms.progress.value;
	}
	,set_progress: function(v) {
		return this.material.uniforms.progress.value = v;
	}
	,get_curveFraction: function() {
		return this.ribbonGeom.curveFraction;
	}
	,set_curveFraction: function(v) {
		return this.ribbonGeom.set_curveFraction(v);
	}
	,get_lengthScale: function() {
		return 1 / this.material.uniforms.scale.value;
	}
	,set_lengthScale: function(v) {
		return this.material.uniforms.scale.value = 1 / v;
	}
	,__class__: objects_migrationpath_MigrationPath
	,__properties__: {set_curveFraction:"set_curveFraction",get_curveFraction:"get_curveFraction",set_lengthScale:"set_lengthScale",get_lengthScale:"get_lengthScale",set_progress:"set_progress",get_progress:"get_progress"}
});
var objects_migrationpath_MigrationPathMaterial = function(parameters) {
	if(parameters != null) parameters; else { };
	var shaderMaterialParameters = { vertexShader : objects_migrationpath_MigrationPathMaterial.vertexShaderStr, fragmentShader : objects_migrationpath_MigrationPathMaterial.fragmentShaderStr, uniforms : THREE.UniformsUtils.merge([THREE.UniformsLib.common,{ progress : { type : "f", value : 1}, scale : { type : "f", value : 1}, color : { type : "c", value : parameters.color}, opacity : { type : "f", value : 1.0}}])};
	shaderMaterialParameters.transparent = true;
	shaderMaterialParameters.side = THREE.FrontSide;
	shaderMaterialParameters.blending = THREE.CustomBlending;
	shaderMaterialParameters.blendEquation = THREE.AddEquation;
	shaderMaterialParameters.blendSrc = THREE.OneFactor;
	shaderMaterialParameters.blendDst = THREE.OneMinusSrcAlphaFactor;
	shaderMaterialParameters.depthWrite = false;
	THREE.ShaderMaterial.call(this,shaderMaterialParameters);
};
objects_migrationpath_MigrationPathMaterial.__name__ = true;
objects_migrationpath_MigrationPathMaterial.__super__ = THREE.ShaderMaterial;
objects_migrationpath_MigrationPathMaterial.prototype = $extend(THREE.ShaderMaterial.prototype,{
	get_color: function() {
		return this.uniforms.color.value;
	}
	,set_color: function(v) {
		return this.uniforms.color.value = v;
	}
	,get_opacity_: function() {
		return this.uniforms.opacity.value;
	}
	,set_opacity_: function(v) {
		return this.opacity_ = this.uniforms.opacity.value = v;
	}
	,__class__: objects_migrationpath_MigrationPathMaterial
	,__properties__: {set_opacity_:"set_opacity_",get_opacity_:"get_opacity_",set_color:"set_color",get_color:"get_color"}
});
var shaderlib_Vertex = function() { };
shaderlib_Vertex.__name__ = true;
var three__$Color_Color_$Impl_$ = {};
three__$Color_Color_$Impl_$.__name__ = true;
three__$Color_Color_$Impl_$._new = function(hex) {
	var this1;
	this1 = new THREE.Color();
	this1.setHex(hex);
	return this1;
};
three__$Color_Color_$Impl_$.fromInt = function(hex) {
	var tmp;
	var this1;
	this1 = new THREE.Color();
	this1.setHex(hex);
	tmp = this1;
	return tmp;
};
var three_ITexture = function() { };
three_ITexture.__name__ = true;
three_ITexture.prototype = {
	__class__: three_ITexture
};
var tracks_Track = function(state,config) {
	this.state = state;
	this.config = config;
};
tracks_Track.__name__ = true;
tracks_Track.create = function(name,state,config) {
	var _g = name.toLowerCase();
	switch(_g) {
	case "animalodysseys":
		return new tracks_AnimalOdysseys(state,config);
	case "eyeonthereef":
		return new tracks_EyeOnTheReef(state,config);
	case "maritime":
		return new tracks_Maritime(state,config);
	case "recordoverlays":
		return new tracks_RecordOverlays(state,config);
	case "weatherglobe":
		return new tracks_WeatherGlobe(state,config);
	case "yasi":
		return new tracks_Yasi(state,config);
	default:
		throw new js__$Boot_HaxeError("unknown track" + name);
	}
	return null;
};
tracks_Track.prototype = {
	cleanup: function() {
	}
	,update: function(dt_ms) {
	}
	,setChapter: function(i) {
		if(this.chapters[i] == null) throw new js__$Boot_HaxeError("chapter " + i + " does not exist");
		if(this.currentChapterIdx != null) this.chapters[this.currentChapterIdx].cleanup();
		this.lastChapterIdx = this.currentChapterIdx;
		this.currentChapterIdx = i;
		this.chapters[i].init();
	}
	,onMouseDown: function(mouse) {
	}
	,onMouseUp: function(mouse) {
	}
	,onMouseMove: function(mouse) {
	}
	,addMarker: function(m) {
		this.state.globe.geoToLocal(m.coord,m.object.position);
		this.state.globe.earthMesh.add(m.object);
		GUI.attach(tracks_common__$Marker_Label_$Impl_$.toElement(m.label),m.object);
	}
	,removeMarker: function(m) {
		GUI.remove(tracks_common__$Marker_Label_$Impl_$.toElement(m.label));
		this.state.globe.earthMesh.remove(m.object);
	}
	,fadeInMarker: function(m,duration) {
		if(duration == null) duration = 1;
		if(!GUI.has(tracks_common__$Marker_Label_$Impl_$.toElement(m.label))) {
			m.label.set_opacity(0);
			this.addMarker(m);
		}
		motion_Actuate.tween(m.label,1,{ opacity : 1},true).ease(motion_easing_Quad.get_easeInOut());
	}
	,fadeOutMarker: function(m,duration) {
		if(duration == null) duration = 1;
		var _g = this;
		motion_Actuate.tween(m.label,1,{ opacity : 0},true).ease(motion_easing_Quad.get_easeInOut()).onComplete(function() {
			if(GUI.has(tracks_common__$Marker_Label_$Impl_$.toElement(m.label))) _g.removeMarker(m);
		});
	}
	,videoChapterInitialState: function() {
	}
	,videoChapterCleanup: function() {
	}
	,applySmoothZoom: function(path,startRadius,endRadius) {
		var _g1 = 0;
		var _g = path.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = path[i];
			var x = i / (path.length - 1);
			c.alt = this.state.camera.altForApparentRadius(startRadius - THREE.Math.smootherstep(x,0,1) * (1 - endRadius));
		}
		return path;
	}
	,jumpInterval: function(p) {
		var angleDelta = this.state.camera.position.angleTo(p);
		var distance = this.state.camera.position.distanceTo(p);
		var tmp;
		var x = distance;
		if(x < 0) x = 0;
		if(x > 1) x = 1;
		tmp = x;
		distance = tmp;
		return (angleDelta / Math.PI + distance) / 2 * 2.;
	}
	,paddedLinear: function(x,bumpHeight,bumpStrength) {
		if(bumpStrength == null) bumpStrength = 3;
		if(bumpHeight == null) bumpHeight = 1;
		return x + (-2 * x * x + bumpHeight) / (bumpStrength * Math.exp(x));
	}
	,buildCameraPath: function(coordinates) {
		this.state.scene.updateMatrixWorld(false);
		var tmp;
		var _g = [];
		var _g1 = 0;
		while(_g1 < coordinates.length) {
			var c = coordinates[_g1];
			++_g1;
			_g.push(this.state.globe.geoToWorld(c));
		}
		tmp = _g;
		return new THREE.SplineCurve3(tmp);
	}
	,geoAverage: function(coordinates) {
		var sum = [0,0,0];
		var _g = 0;
		while(_g < coordinates.length) {
			var c = coordinates[_g];
			++_g;
			var a = [c["long"],c.lat,c.alt];
			var _g2 = 0;
			var _g1 = a.length;
			while(_g2 < _g1) {
				var i = _g2++;
				sum[i] += a[i];
			}
		}
		var _g11 = 0;
		var _g3 = sum.length;
		while(_g11 < _g3) {
			var i1 = _g11++;
			sum[i1] /= coordinates.length;
		}
		var tmp;
		var tmp1;
		var longitudeEast = sum[0];
		var latitudeNorth = sum[1];
		tmp1 = new gis__$GeoCoord_CGeoCoord(longitudeEast,latitudeNorth,sum[2] != null?sum[2]:0);
		tmp = tmp1;
		return tmp;
	}
	,cloneForApparentRadius: function(g,r) {
		var tmp;
		var _this = new gis__$GeoCoord_CGeoCoord(g["long"],g.lat,g.alt);
		var v = this.state.camera.altForApparentRadius(r);
		_this.alt = v;
		tmp = _this;
		return tmp;
	}
	,__class__: tracks_Track
};
var tracks_AnimalOdysseys = function(state,config) {
	this.chapter7Markers = (function($this) {
		var $r;
		var tmp;
		{
			var arr = tracks__$AnimalOdysseys_Data.heron_Island;
			var tmp1;
			var longitudeEast = arr[0];
			var latitudeNorth = arr[1];
			tmp1 = new gis__$GeoCoord_CGeoCoord(longitudeEast,latitudeNorth,arr[2] != null?arr[2]:0);
			tmp = tmp1;
		}
		$r = [new tracks_common_Marker("Heron Island",tmp)];
		return $r;
	}(this));
	this.chapter5Markers = (function($this) {
		var $r;
		var tmp;
		{
			var arr = tracks__$AnimalOdysseys_Data.raine_Island;
			var tmp1;
			var longitudeEast = arr[0];
			var latitudeNorth = arr[1];
			tmp1 = new gis__$GeoCoord_CGeoCoord(longitudeEast,latitudeNorth,arr[2] != null?arr[2]:0);
			tmp = tmp1;
		}
		$r = [new tracks_common_Marker("Raine Island",tmp)];
		return $r;
	}(this));
	this.chapter4Markers = (function($this) {
		var $r;
		var tmp;
		{
			var arr = tracks__$AnimalOdysseys_Data.papua_New_Guinea;
			var tmp2;
			var longitudeEast = arr[0];
			var latitudeNorth = arr[1];
			tmp2 = new gis__$GeoCoord_CGeoCoord(longitudeEast,latitudeNorth,arr[2] != null?arr[2]:0);
			tmp = tmp2;
		}
		var tmp1;
		{
			var arr1 = tracks__$AnimalOdysseys_Data.coral_Sea;
			var tmp3;
			var longitudeEast1 = arr1[0];
			var latitudeNorth1 = arr1[1];
			tmp3 = new gis__$GeoCoord_CGeoCoord(longitudeEast1,latitudeNorth1,arr1[2] != null?arr1[2]:0);
			tmp1 = tmp3;
		}
		$r = [new tracks_common_Marker("Papua New Guinea",tmp),new tracks_common_Marker("Coral Sea",tmp1)];
		return $r;
	}(this));
	this.chapter0Markers = [new tracks_common_Marker("The Great Barrier Reef",gis_Constants.GREAT_BARRIER_REEF)];
	var _g2 = this;
	tracks_Track.call(this,state,config);
	if(config.onChapterComplete == null) config.onChapterComplete = function() {
	};
	var tmp;
	var _g = [];
	var _g1 = 0;
	var _g21 = tracks__$AnimalOdysseys_Data.followDwarfMinke;
	while(_g1 < _g21.length) {
		var c = _g21[_g1];
		++_g1;
		var tmp5;
		var tmp6;
		var longitudeEast = c[0];
		var latitudeNorth = c[1];
		tmp6 = new gis__$GeoCoord_CGeoCoord(longitudeEast,latitudeNorth,c[2] != null?c[2]:0);
		tmp5 = tmp6;
		_g.push(tmp5);
	}
	tmp = _g;
	this.dwarfMinkCameraPath = this.buildCameraPath(this.applySmoothZoom(tmp,0.9,1.15));
	var tmp1;
	var _g11 = [];
	var _g22 = 0;
	var _g3 = tracks__$AnimalOdysseys_Data.followShearwater;
	while(_g22 < _g3.length) {
		var c1 = _g3[_g22];
		++_g22;
		var tmp7;
		var tmp8;
		var longitudeEast1 = c1[0];
		var latitudeNorth1 = c1[1];
		tmp8 = new gis__$GeoCoord_CGeoCoord(longitudeEast1,latitudeNorth1,c1[2] != null?c1[2]:0);
		tmp7 = tmp8;
		_g11.push(tmp7);
	}
	tmp1 = _g11;
	this.shearwaterCameraPath = this.buildCameraPath(this.applySmoothZoom(tmp1,1.0,1.2));
	var tmp2;
	var tmp9;
	var this1;
	this1 = new THREE.Color();
	this1.setHex(15549696);
	tmp9 = this1;
	tmp2 = tmp9;
	this.dwarfMinkGroup = new tracks__$AnimalOdysseys_PathGroup(state.globe,tmp2);
	var tmp3;
	var tmp10;
	var this11;
	this11 = new THREE.Color();
	this11.setHex(630016);
	tmp10 = this11;
	tmp3 = tmp10;
	this.greenTurtleGroup = new tracks__$AnimalOdysseys_PathGroup(state.globe,tmp3);
	var tmp4;
	var tmp11;
	var this12;
	this12 = new THREE.Color();
	this12.setHex(1284514);
	tmp11 = this12;
	tmp4 = tmp11;
	this.shearwaterGroup = new tracks__$AnimalOdysseys_PathGroup(state.globe,tmp4);
	Debug.onDatGUIReady(function(gui) {
		var _g31 = 0;
		var _g4 = [_g2.dwarfMinkGroup,_g2.greenTurtleGroup,_g2.shearwaterGroup];
		while(_g31 < _g4.length) {
			var group = [_g4[_g31]];
			++_g31;
			gui.addColor({ color : "#" + group[0].material.uniforms.color.value.getHexString()},"color").onChange((function(group) {
				return function(c2) {
					group[0].material.uniforms.color.value.setStyle(c2);
				};
			})(group)).name("Path Color");
		}
	});
	var _g23 = 0;
	var _g32 = [this.dwarfMinkGroup,this.greenTurtleGroup,this.shearwaterGroup];
	while(_g23 < _g32.length) {
		var group1 = _g32[_g23];
		++_g23;
		group1.material.visible = false;
		group1.set_progress(0);
	}
	var $it0 = tracks__$AnimalOdysseys_Data.allLineStrings.keys();
	while( $it0.hasNext() ) {
		var name = $it0.next();
		var tmp12;
		var _this = tracks__$AnimalOdysseys_Data.allLineStrings;
		if(__map_reserved[name] != null) tmp12 = _this.getReserved(name); else tmp12 = _this.h[name];
		var coords = tmp12;
		var tmp13;
		var _g24 = HxOverrides.substr(name,0,5).toLowerCase();
		switch(_g24) {
		case "dwarf":
			tmp13 = this.dwarfMinkGroup;
			break;
		case "green":
			tmp13 = this.greenTurtleGroup;
			break;
		case "shear":
			tmp13 = this.shearwaterGroup;
			break;
		default:
			continue;
		}
		var group2 = tmp13;
		var tmp14;
		var _g25 = [];
		var _g33 = 0;
		while(_g33 < coords.length) {
			var c3 = coords[_g33];
			++_g33;
			var tmp15;
			var tmp16;
			var longitudeEast2 = c3[0];
			var latitudeNorth2 = c3[1];
			tmp16 = new gis__$GeoCoord_CGeoCoord(longitudeEast2,latitudeNorth2,c3[2] != null?c3[2]:0);
			tmp15 = tmp16;
			_g25.push(tmp15);
		}
		tmp14 = _g25;
		group2.addPath(tmp14);
	}
	this.initialState();
	this.chapters = [{ init : $bind(this,this.chapter0Init), cleanup : $bind(this,this.chapter0Cleanup)},{ init : $bind(this,this.chapter1Init), cleanup : $bind(this,this.chapter1Cleanup)},{ init : $bind(this,this.chapter2Init), cleanup : $bind(this,this.chapter2Cleanup)},{ init : $bind(this,this.chapter3Init), cleanup : $bind(this,this.chapter3Cleanup)},{ init : $bind(this,this.chapter4Init), cleanup : $bind(this,this.chapter4Cleanup)},{ init : $bind(this,this.chapter5Init), cleanup : $bind(this,this.chapter5Cleanup)},{ init : $bind(this,this.chapter6Init), cleanup : $bind(this,this.chapter6Cleanup)},{ init : $bind(this,this.chapter7Init), cleanup : $bind(this,this.chapter7Cleanup)},{ init : $bind(this,this.chapter8Init), cleanup : $bind(this,this.chapter8Cleanup)},{ init : $bind(this,this.chapter9Init), cleanup : $bind(this,this.chapter9Cleanup)},{ init : $bind(this,this.chapter10Init), cleanup : $bind(this,this.chapter10Cleanup)}];
	this.chapterCount = 11;
};
tracks_AnimalOdysseys.__name__ = true;
tracks_AnimalOdysseys.__super__ = tracks_Track;
tracks_AnimalOdysseys.prototype = $extend(tracks_Track.prototype,{
	initialState: function() {
		this.state.scene.updateMatrixWorld(false);
		var tmp;
		var g = gis_Constants.GREAT_BARRIER_REEF;
		var _this = new gis__$GeoCoord_CGeoCoord(g["long"],g.lat,g.alt);
		var v = this.state.camera.altForApparentRadius(0.75);
		_this.alt = v;
		tmp = _this;
		this.state.camera.setTargetGeoCoord(tmp,0);
		var _this1 = this.state.globe;
		var v1 = Math.PI * .5;
		_this1.sun.position.set(Math.cos(v1) * _this1.sunDistance,0,-Math.sin(v1) * _this1.sunDistance);
		this.state.sunSpringEnabled = true;
	}
	,cleanup: function() {
		haxe_Log.trace("cleaning up AnimalOdysseys",{ fileName : "AnimalOdysseys.hx", lineNumber : 89, className : "tracks.AnimalOdysseys", methodName : "cleanup"});
		var _g = 0;
		var _g1 = [this.dwarfMinkGroup,this.greenTurtleGroup,this.shearwaterGroup];
		while(_g < _g1.length) {
			var group = _g1[_g];
			++_g;
			group.dispose();
		}
	}
	,setChapter: function(i) {
		this.state.scene.updateMatrixWorld(false);
		this.state.canvas.style.cursor = "auto";
		this.state.controls.enabled = false;
		if(this.cameraAnimation != null) {
			motion_Actuate.pause(this.cameraAnimation);
			motion_Actuate.unload(this.cameraAnimation);
		}
		tracks_Track.prototype.setChapter.call(this,i);
	}
	,chapter0Init: function() {
		var _g = this;
		var tmp;
		var g = gis_Constants.GREAT_BARRIER_REEF;
		var _this = new gis__$GeoCoord_CGeoCoord(g["long"],g.lat,g.alt);
		var v = this.state.camera.altForApparentRadius(0.75);
		_this.alt = v;
		tmp = _this;
		var gbrTarget = this.state.globe.geoToWorld(tmp);
		this.cameraAnimation = this.state.camera.setTargetVector(gbrTarget,this.jumpInterval(gbrTarget));
		var _g1 = 0;
		var _g11 = this.chapter0Markers;
		while(_g1 < _g11.length) {
			var m = _g11[_g1];
			++_g1;
			this.fadeInMarker(m);
		}
		this.cameraAnimation.onComplete(function() {
			_g.config.onChapterComplete(_g.currentChapterIdx);
		});
	}
	,chapter0Cleanup: function() {
		var _g = 0;
		var _g1 = this.chapter0Markers;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			this.fadeOutMarker(m);
		}
	}
	,chapter1Init: function() {
		var _g = this;
		this.cameraAnimation = this.state.camera.setTargetVector(this.dwarfMinkCameraPath.getPoint(0),5.);
		this.cameraAnimation.onComplete(function() {
			_g.config.onChapterComplete(_g.currentChapterIdx);
		});
	}
	,chapter1Cleanup: function() {
	}
	,chapter2Init: function() {
		var _g = this;
		var dwarfMinkMigrationTime = 20;
		this.trailInitialState(this.dwarfMinkGroup);
		var startVector = this.dwarfMinkCameraPath.getPoint(0);
		this.cameraAnimation = this.state.camera.setTargetVector(startVector,this.jumpInterval(startVector)).onComplete(function() {
			_g.cameraAnimation = motion_Actuate.update(function(u) {
				_g.state.camera.setTargetVector(_g.dwarfMinkCameraPath.getPoint(u),0);
			},dwarfMinkMigrationTime,[0],[1],true);
			_g.cameraAnimation.ease(_g.state.camera.animationEasing);
			_g.cameraAnimation.onComplete(function() {
				_g.config.onChapterComplete(_g.currentChapterIdx);
			});
			_g.trailAnimate(_g.dwarfMinkGroup,dwarfMinkMigrationTime);
		});
	}
	,chapter2Cleanup: function() {
		this.trailCleanup(this.dwarfMinkGroup);
	}
	,chapter3Init: function() {
		this.videoChapterInitialState();
		this.config.onChapterComplete(this.currentChapterIdx);
	}
	,chapter3Cleanup: function() {
		this.videoChapterCleanup();
	}
	,chapter4Init: function() {
		var _g = this;
		var tmp;
		var arr = tracks__$AnimalOdysseys_Data.coral_Sea;
		var tmp4;
		var longitudeEast = arr[0];
		var latitudeNorth = arr[1];
		tmp4 = new gis__$GeoCoord_CGeoCoord(longitudeEast,latitudeNorth,arr[2] != null?arr[2]:0);
		tmp = tmp4;
		var tmp1;
		var arr1 = tracks__$AnimalOdysseys_Data.papua_New_Guinea;
		var tmp5;
		var longitudeEast1 = arr1[0];
		var latitudeNorth1 = arr1[1];
		tmp5 = new gis__$GeoCoord_CGeoCoord(longitudeEast1,latitudeNorth1,arr1[2] != null?arr1[2]:0);
		tmp1 = tmp5;
		var tmp2;
		var arr2 = tracks__$AnimalOdysseys_Data.raine_Island;
		var tmp6;
		var longitudeEast2 = arr2[0];
		var latitudeNorth2 = arr2[1];
		tmp6 = new gis__$GeoCoord_CGeoCoord(longitudeEast2,latitudeNorth2,arr2[2] != null?arr2[2]:0);
		tmp2 = tmp6;
		var targetSurface = this.geoAverage([tmp,tmp1,tmp2]);
		var tmp3;
		var _this = new gis__$GeoCoord_CGeoCoord(targetSurface["long"],targetSurface.lat,targetSurface.alt);
		var v = this.state.camera.altForApparentRadius(1.2);
		_this.alt = v;
		tmp3 = _this;
		var targetCamera = tmp3;
		this.cameraAnimation = this.state.camera.setTargetGeoCoord(targetCamera,5);
		this.cameraAnimation.onComplete(function() {
			_g.config.onChapterComplete(_g.currentChapterIdx);
		});
		var _g1 = 0;
		var _g11 = this.chapter4Markers;
		while(_g1 < _g11.length) {
			var m = _g11[_g1];
			++_g1;
			this.fadeInMarker(m);
		}
	}
	,chapter4Cleanup: function() {
		var _g = 0;
		var _g1 = this.chapter4Markers;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			this.fadeOutMarker(m);
		}
	}
	,chapter5Init: function() {
		var _g = this;
		var greenTurtleMigrationTime = 20;
		this.trailInitialState(this.greenTurtleGroup);
		var tmp;
		var tmp2;
		var arr = tracks__$AnimalOdysseys_Data.raine_Island;
		var tmp3;
		var longitudeEast = arr[0];
		var latitudeNorth = arr[1];
		tmp3 = new gis__$GeoCoord_CGeoCoord(longitudeEast,latitudeNorth,arr[2] != null?arr[2]:0);
		tmp2 = tmp3;
		var g = tmp2;
		var _this = new gis__$GeoCoord_CGeoCoord(g["long"],g.lat,g.alt);
		var v = this.state.camera.altForApparentRadius(1.1);
		_this.alt = v;
		tmp = _this;
		var targetCameraInitial = this.state.globe.geoToWorld(tmp);
		var tmp1;
		var tmp4;
		var arr1 = tracks__$AnimalOdysseys_Data.raine_Island;
		var tmp5;
		var longitudeEast1 = arr1[0];
		var latitudeNorth1 = arr1[1];
		tmp5 = new gis__$GeoCoord_CGeoCoord(longitudeEast1,latitudeNorth1,arr1[2] != null?arr1[2]:0);
		tmp4 = tmp5;
		var g1 = tmp4;
		var _this1 = new gis__$GeoCoord_CGeoCoord(g1["long"],g1.lat,g1.alt);
		var v1 = this.state.camera.altForApparentRadius(1.25);
		_this1.alt = v1;
		tmp1 = _this1;
		var targetCameraFinal = this.state.globe.geoToWorld(tmp1);
		var _v = new THREE.Vector3();
		this.trailAnimate(this.greenTurtleGroup,greenTurtleMigrationTime);
		var _g1 = 0;
		var _g11 = this.chapter5Markers;
		while(_g1 < _g11.length) {
			var m = _g11[_g1];
			++_g1;
			this.fadeInMarker(m);
		}
		this.cameraAnimation = this.state.camera.setTargetVector(targetCameraInitial,2).onComplete(function() {
			_g.cameraAnimation = motion_Actuate.update(function(u) {
				_g.state.camera.setTargetVector(_v.lerpVectors(targetCameraInitial,targetCameraFinal,u),0);
			},greenTurtleMigrationTime,[0],[1],true);
			_g.cameraAnimation.ease(_g.state.camera.animationEasing);
			_g.cameraAnimation.onComplete(function() {
				_g.config.onChapterComplete(_g.currentChapterIdx);
			});
		});
	}
	,chapter5Cleanup: function() {
		var _g = 0;
		var _g1 = this.chapter5Markers;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			this.fadeOutMarker(m);
		}
		this.trailCleanup(this.greenTurtleGroup);
	}
	,chapter6Init: function() {
		this.videoChapterInitialState();
		this.config.onChapterComplete(this.currentChapterIdx);
	}
	,chapter6Cleanup: function() {
		this.videoChapterCleanup();
	}
	,chapter7Init: function() {
		var _g = this;
		this.cameraAnimation = this.state.camera.setTargetVector(this.shearwaterCameraPath.getPoint(0),5);
		var _g1 = 0;
		var _g11 = this.chapter7Markers;
		while(_g1 < _g11.length) {
			var m = _g11[_g1];
			++_g1;
			this.fadeInMarker(m);
		}
		this.cameraAnimation.onComplete(function() {
			_g.config.onChapterComplete(_g.currentChapterIdx);
		});
	}
	,chapter7Cleanup: function() {
		var _g = 0;
		var _g1 = this.chapter7Markers;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			this.fadeOutMarker(m);
		}
	}
	,chapter8Init: function() {
		var _g = this;
		var shearwaterMigrationTime = 25;
		this.trailInitialState(this.shearwaterGroup);
		this.trailAnimate(this.shearwaterGroup,shearwaterMigrationTime);
		var startVector = this.shearwaterCameraPath.getPoint(0);
		this.cameraAnimation = this.state.camera.setTargetVector(startVector,2.0).onComplete(function() {
			_g.cameraAnimation = motion_Actuate.update(function(u) {
				_g.state.camera.setTargetVector(_g.shearwaterCameraPath.getPoint(u),0);
			},shearwaterMigrationTime,[0],[1],true);
			_g.cameraAnimation.ease(_g.state.camera.animationEasing);
			_g.cameraAnimation.onComplete(function() {
				_g.config.onChapterComplete(_g.currentChapterIdx);
			});
		});
	}
	,chapter8Cleanup: function() {
		this.trailCleanup(this.shearwaterGroup);
	}
	,chapter9Init: function() {
		var _g = this;
		this.videoChapterInitialState();
		this.cameraAnimation.onComplete(function() {
			_g.config.onChapterComplete(_g.currentChapterIdx);
		});
	}
	,chapter9Cleanup: function() {
		this.videoChapterCleanup();
	}
	,chapter10Init: function() {
		var _g = this;
		this.state.controls.enabled = true;
		this.state.canvas.style.cursor = "pointer";
		this.state.controls.addEventListener("start",$bind(this,this.chapter10InteractionBegan));
		var tmp;
		var g = gis_Constants.GREAT_BARRIER_REEF;
		var _this = new gis__$GeoCoord_CGeoCoord(g["long"],g.lat,g.alt);
		var v = this.state.camera.altForApparentRadius(0.75);
		_this.alt = v;
		tmp = _this;
		this.cameraAnimation = this.state.camera.setTargetGeoCoord(tmp,3);
		this.state.globe.vectorOverlayMaterial.visible = true;
		this.state.globe.vectorOverlayMaterial.opacity = 0;
		motion_Actuate.stop(this.state.globe.vectorOverlayMaterial,["opacity"]);
		motion_Actuate.tween(this.state.globe.vectorOverlayMaterial,1,{ opacity : 0.2},true).ease(motion_easing_Quad.get_easeInOut());
		this.cameraAnimation.onComplete(function() {
			_g.config.onChapterComplete(_g.currentChapterIdx);
		});
	}
	,chapter10InteractionBegan: function(_) {
		this.state.controls.removeEventListener("start",$bind(this,this.chapter10InteractionBegan));
		if(this.cameraAnimation != null) {
			motion_Actuate.pause(this.cameraAnimation);
			motion_Actuate.unload(this.cameraAnimation);
		}
	}
	,chapter10Cleanup: function() {
		var _g = this;
		this.state.controls.removeEventListener("start",$bind(this,this.chapter10InteractionBegan));
		motion_Actuate.stop(this.state.globe.vectorOverlayMaterial,["opacity"]);
		motion_Actuate.tween(this.state.globe.vectorOverlayMaterial,1,{ opacity : 0.0},true).onComplete(function() {
			_g.state.globe.vectorOverlayMaterial.visible = false;
			_g.state.globe.vectorOverlayMaterial.opacity = 0;
		}).ease(motion_easing_Quad.get_easeInOut());
	}
	,trailInitialState: function(group) {
		motion_Actuate.stop(group,null,false,true);
		group.material.visible = true;
		group.material.set_opacity_(1.0);
		group.set_progress(0);
	}
	,trailAnimate: function(group,duration) {
		motion_Actuate.tween(group,duration,{ progress : 1},true).ease(motion_easing_Quad.get_easeInOut());
	}
	,trailCleanup: function(group,duration) {
		if(duration == null) duration = 3;
		motion_Actuate.stop(group,null,false,true);
		if(group._progress >= 1) motion_Actuate.tween(group,duration,{ progress : 2},true).ease(motion_easing_Quad.get_easeInOut()).onComplete(function() {
			group.material.visible = false;
			group.set_progress(0);
		}); else motion_Actuate.tween(group,duration * 0.5,{ opacity : 0},true).ease(motion_easing_Quad.get_easeInOut()).onComplete(function() {
			group.material.visible = false;
			group.set_progress(0);
		});
	}
	,__class__: tracks_AnimalOdysseys
});
var tracks__$AnimalOdysseys_PathGroup = function(globe,color) {
	this._progress = 1.0;
	this.globe = globe;
	this.paths = [];
	this.material = new objects_migrationpath_MigrationPathMaterial({ color : color});
};
tracks__$AnimalOdysseys_PathGroup.__name__ = true;
tracks__$AnimalOdysseys_PathGroup.prototype = {
	dispose: function() {
		var _g = 0;
		var _g1 = this.paths;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			this.globe.earthMesh.remove(p);
			p.geometry.dispose();
		}
		this.material.dispose();
	}
	,addPath: function(coords) {
		var p = new objects_migrationpath_MigrationPath(this.globe,coords,this.material);
		p.material.uniforms.progress.value = this._progress;
		this.paths.push(p);
		this.globe.earthMesh.add(p);
	}
	,get_progress: function() {
		return this._progress;
	}
	,set_progress: function(progress) {
		var _g = 0;
		var _g1 = this.paths;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			p.material.uniforms.progress.value = progress;
		}
		return this._progress = progress;
	}
	,get_opacity: function() {
		return this.material.get_opacity_();
	}
	,set_opacity: function(v) {
		return this.material.set_opacity_(v);
	}
	,__class__: tracks__$AnimalOdysseys_PathGroup
	,__properties__: {set_opacity:"set_opacity",get_opacity:"get_opacity",set_progress:"set_progress",get_progress:"get_progress"}
};
var tracks__$AnimalOdysseys_Data = function() { };
tracks__$AnimalOdysseys_Data.__name__ = true;
var tracks_EyeOnTheReef = function(state,config) {
	this._v = new THREE.Vector3();
	this._u = new THREE.Vector3();
	var _g = this;
	tracks_Track.call(this,state,config);
	this.sightingMarkers = [];
	var r = new haxe_Http("assets/great8report.json");
	r.onData = $bind(this,this.processCompositeSightings);
	r.onError = function(error) {
	};
	r.onStatus = function(i) {
	};
	r.request(false);
	state.scene.updateMatrixWorld(false);
	state.globe.vectorOverlayMaterial.visible = false;
	state.sunSpringEnabled = true;
	this.defaultView(false);
	state.canvas.parentElement.addEventListener("dblclick",function() {
		_g.defaultView(true);
	});
	var tmp;
	var _this = window.document;
	tmp = _this.createElement("style");
	var style = tmp;
	style.innerHTML = tracks_EyeOnTheReef.eye_on_the_reef_css;
	style.id = "eotr-stylesheet";
	window.document.head.appendChild(style);
	this.chapters = [{ init : $bind(this,this.chapter0Init), cleanup : $bind(this,this.chapter0Cleanup)}];
	this.chapterCount = 1;
};
tracks_EyeOnTheReef.__name__ = true;
tracks_EyeOnTheReef.__super__ = tracks_Track;
tracks_EyeOnTheReef.prototype = $extend(tracks_Track.prototype,{
	update: function(dt_ms) {
		this.state.scene.updateMatrixWorld(false);
		var earthPos = this.state.globe.earthMesh.getWorldPosition();
		var cameraVector = this._u.subVectors(this.state.camera.position,earthPos);
		var r = this.state.globe.radius;
		var criticalDistance = Math.sqrt(cameraVector.lengthSq() - r * r);
		var _g = 0;
		var _g1 = this.sightingMarkers;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			var markerToCamera = this._v.subVectors(m.trackPoint.getWorldPosition(),this.state.camera.position);
			m.element.style.opacity = Std.string(1 - THREE.Math.smoothstep(markerToCamera.length(),criticalDistance - r * 0.1,criticalDistance + r * 0.1));
		}
	}
	,defaultView: function(animate) {
		var tmp;
		var g = gis_Constants.GREAT_BARRIER_REEF;
		var _this = new gis__$GeoCoord_CGeoCoord(g["long"],g.lat,g.alt);
		var v = this.state.camera.altForApparentRadius(1.0);
		_this.alt = v;
		tmp = _this;
		this.state.camera.setTargetGeoCoord(tmp,animate?2.0:0);
	}
	,processCompositeSightings: function(jsonStr) {
		var data = JSON.parse(jsonStr);
		var sightings = [];
		var minimizeStringField = function(s) {
			s = s != null?StringTools.trim(s):null;
			if(s == "") s = null;
			return s;
		};
		var _g = 0;
		var _g1 = data.items;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			var tmp1;
			var arr_0 = item.longitude;
			var arr_1 = item.latitude;
			var arr_2 = 0;
			var tmp2;
			var longitudeEast = arr_0;
			var latitudeNorth = arr_1;
			tmp2 = new gis__$GeoCoord_CGeoCoord(arr_0,arr_1,arr_2 != null?arr_2:0);
			tmp1 = tmp2;
			sightings.push({ id : this.getSightingId(item), coord : tmp1, order : item.order, species : item.species, scientificName : item["scientific name"], numberSeen : item["number seen"], media : minimizeStringField(item.media), note : minimizeStringField(item.note)});
		}
		this.state.scene.updateMatrixWorld(false);
		var tmp;
		var _g2 = [];
		var _g21 = 0;
		var _g11 = sightings.length;
		while(_g21 < _g11) {
			var i = _g21++;
			_g2.push(this.state.globe.geoToLocal(sightings[i].coord));
		}
		tmp = _g2;
		var worldPositions = tmp;
		var addedIndices = [];
		var remaining = 40;
		var _g22 = 0;
		var _g12 = sightings.length;
		while(_g22 < _g12) {
			var i1 = _g22++;
			var s1 = sightings[i1];
			var p = worldPositions[i1];
			if(tracks_EyeOnTheReef.imageRequired && s1.media == null) continue;
			var tooClose = false;
			var _g3 = 0;
			while(_g3 < addedIndices.length) {
				var j = addedIndices[_g3];
				++_g3;
				var p2 = worldPositions[j];
				var angle = p2.angleTo(p);
				if(angle < tracks_EyeOnTheReef.minimumSeperation_rad) {
					tooClose = true;
					break;
				}
			}
			if(tooClose) continue;
			this.sightingMarkers.push(this.addSighting(s1));
			addedIndices.push(i1);
			remaining--;
			if(remaining <= 0) break;
		}
		haxe_Log.trace(remaining,{ fileName : "EyeOnTheReef.hx", lineNumber : 190, className : "tracks.EyeOnTheReef", methodName : "processCompositeSightings", customParams : ["remaining"]});
	}
	,addSighting: function(sighting) {
		var _g = this;
		var m = new tracks__$EyeOnTheReef_SightingMarker(this.state.globe,sighting);
		this.state.globe.earthMesh.add(m.trackPoint);
		GUI.attach(m.element,m.trackPoint);
		m.onMouseUp(function(m1) {
			var tmp;
			var g = m1.sighting.coord;
			var _this = new gis__$GeoCoord_CGeoCoord(g["long"],g.lat,g.alt);
			var v = _g.state.camera.altForApparentRadius(1.35);
			_this.alt = v;
			tmp = _this;
			_g.state.camera.setTargetGeoCoord(tmp,1.2);
		});
		return m;
	}
	,chapter0Init: function() {
	}
	,chapter0Cleanup: function() {
	}
	,getSightingId: function(item) {
		var r = new EReg("sighting\\s*=\\s*(\\d+)","");
		r.match(item.uri.$ref);
		return Std.parseInt(r.matched(1));
	}
	,__class__: tracks_EyeOnTheReef
});
var tracks__$EyeOnTheReef_SightingMarker = function(globe,sighting) {
	this.mouseUpCallbacks = [];
	this.detailsBoxAdded = false;
	var _g = this;
	this.sighting = sighting;
	this.trackPoint = new THREE.Object3D();
	globe.geoToLocal(sighting.coord,this.trackPoint.position);
	var iconImageUrl = this.getIconUrl();
	var width = 30;
	var height = width;
	var tmp;
	var _this = window.document;
	tmp = _this.createElement("div");
	this.element = tmp;
	this.element.style.width = "" + width + "px";
	this.element.style.height = "" + height + "px";
	this.element.style.marginLeft = "" + -width * .5 + "px";
	this.element.style.marginTop = "" + -height * .5 + "px";
	this.element.style.opacity = "1.0";
	this.element.style.cursor = "pointer";
	this.element.style.backgroundColor = "transparent";
	this.element.style.backgroundImage = "url(" + iconImageUrl + ")";
	this.element.style.backgroundSize = "" + width + "px " + height + "px";
	this.element.style.borderRadius = "" + width * .5 + "px";
	this.element.style.boxShadow = "0px 0px 5px rgba(0,0,0,.75)";
	if(tracks__$EyeOnTheReef_SightingMarker.supportedSpecies.indexOf(sighting.species.toLowerCase()) == -1) haxe_Log.trace("Unsupported species " + sighting.species,{ fileName : "EyeOnTheReef.hx", lineNumber : 250, className : "tracks._EyeOnTheReef.SightingMarker", methodName : "new"});
	var tmp1;
	var _this1 = window.document;
	tmp1 = _this1.createElement("div");
	this.detailsBox = tmp1;
	this.detailsBox.classList.add("sighting-details");
	this.detailsBox.style.marginLeft = "60px";
	this.detailsBox.innerHTML = "\n\t\t\t<div class=\"heading\">" + sighting.species + "</div>\n\t\t\t<div class=\"sub-heading\">\n\t\t\t\t<div class=\"left scientific-name\">\n\t\t\t\t\t" + sighting.scientificName + "\n\t\t\t\t</div>\n\t\t\t\t<div class=\"right\">\n\t\t\t\t\t" + sighting.numberSeen + " seen\n\t\t\t\t</div>\n\t\t\t\t<div style=\"clear:both\"></div>\n\t\t\t</div>\n\t\t";
	if(sighting.media != null) this.detailsBox.innerHTML += "\n\t\t\t\t<div class=\"media\">\n\t\t\t\t\t<img src=\"" + sighting.media + "\">\n\t\t\t\t</div>\n\t\t\t";
	if(sighting.note != null) {
		var maxChars = 144;
		var noteClamped = sighting.note.length <= maxChars?"\"" + sighting.note + "\"":"\"" + HxOverrides.substr(sighting.note,0,maxChars) + "\"" + " &hellip;";
		this.detailsBox.innerHTML += "\n\t\t\t\t<div class=\"notes\">\n\t\t\t\t\t<div class=\"note-heading\">Notes:</div>\n\t\t\t\t\t<div class=\"note-content\">" + noteClamped + "</div>\n\t\t\t\t</div>\n\t\t\t";
	}
	this.element.addEventListener("mouseup",function(e) {
		var _g1 = 0;
		var _g2 = _g.mouseUpCallbacks;
		while(_g1 < _g2.length) {
			var cb = _g2[_g1];
			++_g1;
			cb(_g);
		}
	});
	this.element.addEventListener("mouseover",function(e1) {
		if(!_g.detailsBoxAdded) {
			_g.element.appendChild(_g.detailsBox);
			_g.detailsBoxAdded = true;
		}
		_g.detailsBox.style.display = "";
	});
	this.element.addEventListener("mouseout",function(e2) {
		_g.detailsBox.style.display = "none";
	});
};
tracks__$EyeOnTheReef_SightingMarker.__name__ = true;
tracks__$EyeOnTheReef_SightingMarker.prototype = {
	onMouseUp: function(cb) {
		this.mouseUpCallbacks.push(cb);
	}
	,getIconUrl: function() {
		var speciesName = this.sighting.species;
		var lc = speciesName.toLowerCase();
		return tracks__$EyeOnTheReef_SightingMarker.supportedSpecies.indexOf(lc) != -1?"assets/tracks/eotr/" + tracks__$EyeOnTheReef_SightingMarker.cleanRegex.replace(lc,"-") + ".png":this.getThumbnailUrl();
	}
	,getThumbnailUrl: function() {
		return "http://www.gbrmpa.gov.au/sightings-network/Media/Thumbnail/" + this.sighting.id;
	}
	,__class__: tracks__$EyeOnTheReef_SightingMarker
};
var tracks_Maritime = function(state,config) {
	this._z = new THREE.Vector3();
	this._q2 = new THREE.Vector2();
	this._p2 = new THREE.Vector2();
	this._p = new THREE.Vector3();
	this.meshUidMap = new haxe_ds_IntMap();
	this.g = new THREE.BoxGeometry(tracks_Maritime.meshBaseScale,tracks_Maritime.meshBaseScale,tracks_Maritime.meshBaseScale,1,1,1);
	this.meshIdleLifetime = 3;
	this.headingOffset = 0.0;
	this.meshScaleMultiplier = 1;
	this.speedMultiplier = 1;
	this.alarmMultiplier = 1;
	this.progress = 0;
	var _g = this;
	tracks_Track.call(this,state,config);
	state.scene.updateMatrixWorld(false);
	var tmp;
	var g = tracks_Maritime.channel;
	var _this = new gis__$GeoCoord_CGeoCoord(g["long"],g.lat,g.alt);
	var v = this.state.camera.altForApparentRadius(1.92);
	_this.alt = v;
	tmp = _this;
	state.camera.setTargetGeoCoord(tmp);
	var _this1 = state.globe;
	var v1 = THREE.Math.degToRad(gis_Constants.LONDON["long"]);
	_this1.sun.position.set(Math.cos(v1) * _this1.sunDistance,0,-Math.sin(v1) * _this1.sunDistance);
	v1;
	state.globe.vectorOverlayMaterial.visible = true;
	state.globe.vectorOverlayMaterial.opacity = 0.5;
	state.sunSpringEnabled = true;
	state.sunSpringK = 5;
	state.controls.minDistance = state.globe.radius * 1.02;
	state.controls.zoomSpeed = 0.05;
	state.controls.noPan = false;
	state.controls.keyPanSpeed = 0.4;
	var sequenceParams = { overrideMinFiltering : THREE.LinearFilter, overrideMagFiltering : THREE.LinearFilter};
	this.wind = new objects_globe_MapSequence("" + state.assetRoot + "/climate-data/weather-globe/wind",sequenceParams);
	this.wind.onReady(function(s) {
		state.globe.setGradientOverlay(s,null,null,"blueWhite(pow(x/50.0, .5))",false);
		state.globe.setParticleFlowOverlay(s,{ decayHalfLife : 0.44, particleOpacity : 0.24, particleSize : 2, particleLifetime : 2.1, velocityScale : 0.0017},false);
		state.globe.gradientOverlayMaterial.opacity = 0.6;
		state.globe.particleOverlayMaterial.opacity = 0.0;
	});
	Debug.onDatGUIReady(function(gui) {
		gui.add(_g,"progress").min(0).max(1).name("Progress").onChange($bind(_g,_g.onProgressChange));
		gui.add(_g,"alarmMultiplier").min(0).max(10).name("Sensitivity");
		gui.add(_g,"speedMultiplier").min(0).max(10).name("Speed");
		gui.add(_g,"meshScaleMultiplier").min(0).max(10).name("Mesh Scale");
		gui.add(_g,"meshIdleLifetime").min(0).max(100).name("Mesh Lifetime");
	});
	this.mainLoop(window.performance.now());
	this.chapters = [{ init : $bind(this,this.chapter0Init), cleanup : $bind(this,this.chapter0Cleanup)},{ init : $bind(this,this.chapter1Init), cleanup : $bind(this,this.chapter1Cleanup)}];
	this.chapterCount = 2;
};
tracks_Maritime.__name__ = true;
tracks_Maritime.__super__ = tracks_Track;
tracks_Maritime.prototype = $extend(tracks_Track.prototype,{
	cleanup: function() {
	}
	,setChapter: function(i) {
		this.vesselSequence = null;
		var $it0 = this.meshUidMap.iterator();
		while( $it0.hasNext() ) {
			var mesh = $it0.next();
			this.state.scene.remove(mesh);
		}
		this.state.scene.updateMatrixWorld(false);
		if(this.cameraAnimation != null) {
			motion_Actuate.pause(this.cameraAnimation);
			motion_Actuate.unload(this.cameraAnimation);
		}
		this.headingOffset = 0;
		this.meshScaleMultiplier = 1;
		this.meshIdleLifetime = 6;
		this.speedMultiplier = 1;
		tracks_Track.prototype.setChapter.call(this,i);
	}
	,mainLoop: function(t) {
		if(this.speedMultiplier > 0) {
			this.progress += 0.00018 * this.speedMultiplier;
			this.progress = this.progress % 1;
			this.updateVessels();
		}
		window.requestAnimationFrame($bind(this,this.mainLoop));
	}
	,updateVessels: function() {
		if(this.vesselSequence == null) return;
		var index = Math.round(Math.min(this.progress * (this.vesselSequence.sequence.length - 1),this.vesselSequence.sequence.length - 1));
		var tmp;
		var x = Math.max(index,1);
		tmp = x | 0;
		index = tmp;
		var $it0 = this.meshUidMap.iterator();
		while( $it0.hasNext() ) {
			var mesh = $it0.next();
			mesh.userData.touch++;
			if(mesh.userData.touch >= this.meshIdleLifetime) mesh.visible = false;
		}
		var i = index;
		while(this.vesselSequence.sequence[i] == null && i < this.vesselSequence.sequence.length) i++;
		var vesselStates = this.vesselSequence.sequence[i];
		var vesselStatesBefore = this.vesselSequence.sequence[i - 1];
		if(vesselStates == null || vesselStatesBefore == null) return;
		var _g = 0;
		while(_g < vesselStates.length) {
			var vesselState = vesselStates[_g];
			++_g;
			var heading_rad = vesselState[2] / (180 / Math.PI);
			var coordinate = new gis__$GeoCoord_CGeoCoord(vesselState[0],vesselState[1],0);
			var mesh1 = this.getVesselMesh(vesselState);
			mesh1.userData.touch = 0;
			mesh1.userData.coordinate = coordinate;
			mesh1.visible = true;
			mesh1.scale.set(3 * this.meshScaleMultiplier,this.meshScaleMultiplier,0.1 * this.meshScaleMultiplier);
			mesh1.position.copy(this.state.globe.geoToWorld(coordinate,this._p));
			mesh1.lookAt(this._z);
			mesh1.rotation.z = heading_rad + this.headingOffset;
		}
		var _g1 = 0;
		while(_g1 < vesselStatesBefore.length) {
			var vesselState1 = vesselStatesBefore[_g1];
			++_g1;
			var mesh2 = this.getVesselMesh(vesselState1);
			if(mesh2.userData.coordinate == null) continue;
			var heading_rad1 = vesselState1[2] / (180 / Math.PI);
			var coordinate1 = new gis__$GeoCoord_CGeoCoord(vesselState1[0],vesselState1[1],0);
			var dLong = coordinate1["long"] - mesh2.userData.coordinate["long"];
			var dLat = coordinate1.lat - mesh2.userData.coordinate.lat;
			this._p2.set(dLong,dLat);
			this._p2.normalize();
			this._q2.set(Math.sin(heading_rad1),Math.cos(heading_rad1));
			var d = -this._p2.dot(this._q2);
			this.state.globe.geoToWorld(coordinate1,this._p);
			var distance = this._p.distanceTo(mesh2.position);
			var m = Math.min(distance * 1000,1);
			mesh2.scale.x = Math.max(mesh2.scale.x * m,this.meshScaleMultiplier);
			var a = 1 - (d + 1.0) * 0.5;
			a *= m * 4 * this.alarmMultiplier;
			(js_Boot.__cast(mesh2.material , THREE.MeshBasicMaterial)).color.setRGB(3 * a,a * 0.1,a * 0.1);
		}
	}
	,getVesselMesh: function(vesselState) {
		var mesh = this.meshUidMap.h[vesselState[3] | 0];
		if(mesh == null) {
			mesh = new THREE.Mesh(this.g,new THREE.MeshBasicMaterial({ color : 0}));
			mesh.userData.touch = 0;
			mesh.position.copy(this.state.globe.geoToWorld(new gis__$GeoCoord_CGeoCoord(vesselState[0],vesselState[1],0)));
			this.state.scene.add(mesh);
			this.meshUidMap.h[vesselState[3] | 0] = mesh;
		}
		return mesh;
	}
	,onProgressChange: function() {
		this.updateVessels();
	}
	,chapter0Init: function() {
		var _g = this;
		var tmp;
		var g = tracks_Maritime.channel;
		var _this = new gis__$GeoCoord_CGeoCoord(g["long"],g.lat,g.alt);
		var v = this.state.camera.altForApparentRadius(1.92);
		_this.alt = v;
		tmp = _this;
		this.cameraAnimation = this.state.camera.setTargetGeoCoord(tmp,4);
		var r = new haxe_Http("" + this.state.assetRoot + "/maritime/dft-maritime.json");
		r.onData = function(str) {
			haxe_Log.trace("Loaded vessel sequence",{ fileName : "Maritime.hx", lineNumber : 248, className : "tracks.Maritime", methodName : "chapter0Init"});
			_g.vesselSequence = JSON.parse(str);
			_g.updateVessels();
		};
		r.request(false);
	}
	,chapter0Cleanup: function() {
	}
	,chapter1Init: function() {
		var _g = this;
		this.meshScaleMultiplier = 5;
		this.headingOffset = Math.PI * 0.5;
		this.speedMultiplier = 5;
		this.meshIdleLifetime = 20;
		var tmp;
		var g = gis_Constants.GREAT_BARRIER_REEF;
		var _this = new gis__$GeoCoord_CGeoCoord(g["long"],g.lat,g.alt);
		var v = this.state.camera.altForApparentRadius(1);
		_this.alt = v;
		tmp = _this;
		this.cameraAnimation = this.state.camera.setTargetGeoCoord(tmp,4);
		this.cameraAnimation.onComplete(function() {
			var r = new haxe_Http("" + _g.state.assetRoot + "/maritime/aus-sequence.json");
			r.onData = function(str) {
				haxe_Log.trace("Loaded vessel sequence",{ fileName : "Maritime.hx", lineNumber : 270, className : "tracks.Maritime", methodName : "chapter1Init"});
				_g.vesselSequence = JSON.parse(str);
				_g.updateVessels();
			};
			r.request(false);
		});
	}
	,chapter1Cleanup: function() {
	}
	,__class__: tracks_Maritime
});
var tracks_RecordOverlays = function(state,config) {
	tracks_Track.call(this,state,config);
	this.chapters = [{ init : $bind(this,this.chapter0Init), cleanup : $bind(this,this.chapter0Cleanup)}];
	this.chapterCount = 1;
};
tracks_RecordOverlays.__name__ = true;
tracks_RecordOverlays.__super__ = tracks_Track;
tracks_RecordOverlays.prototype = $extend(tracks_Track.prototype,{
	update: function(dt_ms) {
	}
	,chapter0Init: function() {
	}
	,chapter0Cleanup: function() {
	}
	,__class__: tracks_RecordOverlays
});
var tracks_WeatherGlobe = function(state,config) {
	this.c2Markers = (function($this) {
		var $r;
		var tmp;
		{
			var arr = tracks__$WeatherGlobe_Data.gBR_North;
			var tmp2;
			var longitudeEast = arr[0];
			var latitudeNorth = arr[1];
			tmp2 = new gis__$GeoCoord_CGeoCoord(longitudeEast,latitudeNorth,arr[2] != null?arr[2]:0);
			tmp = tmp2;
		}
		var tmp1;
		{
			var arr1 = tracks__$WeatherGlobe_Data.gBR_South;
			var tmp3;
			var longitudeEast1 = arr1[0];
			var latitudeNorth1 = arr1[1];
			tmp3 = new gis__$GeoCoord_CGeoCoord(longitudeEast1,latitudeNorth1,arr1[2] != null?arr1[2]:0);
			tmp1 = tmp3;
		}
		$r = [new tracks_common_Marker("28°C",tmp),new tracks_common_Marker("26°C",tmp1)];
		return $r;
	}(this));
	this.c0Markers = [];
	tracks_Track.call(this,state,config);
	var sequenceParams = { overrideMinFiltering : THREE.LinearFilter, overrideMagFiltering : THREE.LinearFilter};
	this.currents = new objects_globe_MapSequence("" + state.assetRoot + "/climate-data/weather-globe/currents",sequenceParams);
	this.wind = new objects_globe_MapSequence("" + state.assetRoot + "/climate-data/weather-globe/wind",sequenceParams);
	this.sst = new objects_globe_MapSequence("" + state.assetRoot + "/climate-data/weather-globe/sst",sequenceParams);
	this.sstAnomaly = new objects_globe_MapSequence("" + state.assetRoot + "/climate-data/weather-globe/sst-anomaly",sequenceParams);
	var tmp;
	var _this = window.document;
	tmp = _this.createElement("div");
	this.textEl = tmp;
	this.textEl.style.position = "absolute";
	this.textEl.style.bottom = "20px";
	this.textEl.style.left = "20px";
	this.textEl.style.width = "30%";
	this.textEl.style.minWidth = "300px";
	this.textEl.style.background = "rgba(0,0,0,0.8)";
	this.textEl.style.color = "#FFFFFF";
	this.textEl.style.fontSize = "18px";
	this.textEl.style.padding = "20px";
	this.textEl.innerHTML = "";
	this.textEl.style.fontFamily = "\"Arial Narrow\", Arial, sans-serif";
	GUI.add(this.textEl);
	this.initialState();
	this.chapters = [{ init : $bind(this,this.chapter0Init), cleanup : $bind(this,this.chapter0Cleanup)},{ init : $bind(this,this.chapter1Init), cleanup : $bind(this,this.chapter1Cleanup)},{ init : $bind(this,this.chapter2Init), cleanup : $bind(this,this.chapter2Cleanup)},{ init : $bind(this,this.chapter3Init), cleanup : $bind(this,this.chapter3Cleanup)},{ init : $bind(this,this.chapter4Init), cleanup : $bind(this,this.chapter4Cleanup)},{ init : $bind(this,this.chapter5Init), cleanup : $bind(this,this.chapter5Cleanup)}];
	this.chapterCount = 6;
};
tracks_WeatherGlobe.__name__ = true;
tracks_WeatherGlobe.__super__ = tracks_Track;
tracks_WeatherGlobe.prototype = $extend(tracks_Track.prototype,{
	initialState: function() {
		var _this = this.state.globe;
		var v = THREE.Math.degToRad(-70.4167);
		_this.sun.position.set(Math.cos(v) * _this.sunDistance,0,-Math.sin(v) * _this.sunDistance);
		var tmp;
		var g = gis_Constants.SAN_FRANCISCO;
		var _this1 = new gis__$GeoCoord_CGeoCoord(g["long"],g.lat,g.alt);
		var v1 = this.state.camera.altForApparentRadius(0.75);
		_this1.alt = v1;
		tmp = _this1;
		this.state.camera.setTargetGeoCoord(tmp,0);
		this.state.globe.gradientOverlayMaterial.opacity = 0;
		this.state.globe.particleOverlayMaterial.opacity = 0;
		this.state.globe.setParticleFlowOverlay();
		Debug.addOverlaySettings(this.state.globe.particleFlowMap);
	}
	,cleanup: function() {
	}
	,setChapter: function(i) {
		this.state.scene.updateMatrixWorld(false);
		this.state.canvas.style.cursor = "auto";
		this.state.controls.enabled = false;
		this.state.sunSpringEnabled = true;
		this.state.sunSpringK = 0.85;
		if(this.cameraAnimation != null) {
			motion_Actuate.pause(this.cameraAnimation);
			motion_Actuate.unload(this.cameraAnimation);
		}
		this.setOverlayOpacities(0,0);
		this.textEl.innerText = tracks_WeatherGlobe.text[i];
		tracks_Track.prototype.setChapter.call(this,i);
	}
	,chapter0Init: function() {
		var _g = this;
		var transitionTime = 25;
		var southGbrTarget_0 = 161;
		var southGbrTarget_1 = -40;
		var southGbrTarget_2 = 0;
		var tmp;
		var g = gis_Constants.SAN_FRANCISCO;
		var _this = new gis__$GeoCoord_CGeoCoord(g["long"],g.lat,g.alt);
		var v = this.state.camera.altForApparentRadius(0.75);
		_this.alt = v;
		tmp = _this;
		var p = this.state.globe.geoToWorld(tmp);
		this.cameraAnimation = this.state.camera.setTargetVector(p,this.jumpInterval(p)).onComplete(function() {
			var tmp1;
			var tmp2;
			var tmp3;
			var longitudeEast = southGbrTarget_0;
			var latitudeNorth = southGbrTarget_1;
			tmp3 = new gis__$GeoCoord_CGeoCoord(longitudeEast,latitudeNorth,southGbrTarget_2 != null?southGbrTarget_2:0);
			tmp2 = tmp3;
			var g1 = tmp2;
			var _this1 = new gis__$GeoCoord_CGeoCoord(g1["long"],g1.lat,g1.alt);
			var v1 = _g.state.camera.altForApparentRadius(1.05);
			_this1.alt = v1;
			tmp1 = _this1;
			_g.cameraAnimation = _g.state.camera.setTargetGeoCoord(tmp1,transitionTime);
			var gbr = _g.state.globe.geoToWorld(gis_Constants.GREAT_BARRIER_REEF);
			var currentsEntered = false;
			var markersEntered = false;
			_g.cameraAnimation.onUpdate(function() {
				var angleDelta = _g.state.camera.position.angleTo(gbr);
				if(angleDelta < 1.2 && !currentsEntered) {
					_g.currents.onReady($bind(_g,_g.chapter0CurrentsReady));
					currentsEntered = true;
				}
				if(angleDelta < 0.2 && !markersEntered) {
					var _g1 = 0;
					var _g2 = _g.c0Markers;
					while(_g1 < _g2.length) {
						var m = _g2[_g1];
						++_g1;
						_g.fadeInMarker(m);
					}
					markersEntered = true;
				}
			});
			_g.cameraAnimation.onComplete(function() {
				_g.config.onChapterComplete(_g.currentChapterIdx);
			});
		});
	}
	,chapter0CurrentsReady: function(s) {
		this.state.globe.setGradientOverlay(s,null,null,"blueWhite(pow(x, .5))",true);
		this.state.globe.setParticleFlowOverlay(s,{ decayHalfLife : 1.1, particleOpacity : 0.19, particleSize : 2, particleLifetime : 3.9, velocityScale : 0.029},true);
		this.setOverlayOpacities(0.3,0.4,6,8);
	}
	,chapter0Cleanup: function() {
		this.currents.removeCallback($bind(this,this.chapter0CurrentsReady));
		var _g = 0;
		var _g1 = this.c0Markers;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			this.fadeOutMarker(m);
		}
	}
	,chapter1Init: function() {
		var _g = this;
		var tmp;
		var tmp1;
		var tmp2;
		var longitudeEast = 152;
		var latitudeNorth = -25;
		var tmp3;
		tmp3 = 0;
		tmp2 = new gis__$GeoCoord_CGeoCoord(longitudeEast,latitudeNorth,tmp3);
		tmp1 = tmp2;
		var g = tmp1;
		var _this = new gis__$GeoCoord_CGeoCoord(g["long"],g.lat,g.alt);
		var v = this.state.camera.altForApparentRadius(1.05);
		_this.alt = v;
		tmp = _this;
		this.cameraAnimation = this.state.camera.setTargetGeoCoord(tmp,4);
		this.cameraAnimation.onComplete(function() {
			_g.config.onChapterComplete(_g.currentChapterIdx);
		});
		if(!this.areSequencesSet(this.currents,this.currents)) this.setOverlayOpacities(0.0,0.0,null,null,function() {
			_g.currents.onReady($bind(_g,_g.chapter0CurrentsReady));
		}); else this.setOverlayOpacities(0.3,0.4);
	}
	,chapter1Cleanup: function() {
		this.currents.removeCallback($bind(this,this.chapter0CurrentsReady));
	}
	,chapter2Init: function() {
		var _g = this;
		var target = gis_Constants.GREAT_BARRIER_REEF;
		var tmp;
		var _this = new gis__$GeoCoord_CGeoCoord(target["long"],target.lat,target.alt);
		var v = this.state.camera.altForApparentRadius(1.05);
		_this.alt = v;
		tmp = _this;
		this.cameraAnimation = this.state.camera.setTargetGeoCoord(tmp,8.);
		this.cameraAnimation.onComplete(function() {
			_g.config.onChapterComplete(_g.currentChapterIdx);
		});
		this.setOverlayOpacities(0.0,0.0,null,null,function() {
			_g.sst.onReady($bind(_g,_g.chapter2SSTReady));
		});
		var _g1 = 0;
		var _g11 = this.c2Markers;
		while(_g1 < _g11.length) {
			var m = _g11[_g1];
			++_g1;
			this.fadeInMarker(m);
		}
	}
	,chapter2SSTReady: function(s) {
		this.state.globe.setParticleFlowOverlay(null);
		this.state.globe.setGradientOverlay(s,null,null,"temperatureHue(pow(x, .5))",true);
		this.setOverlayOpacities(0.8,0.0);
	}
	,chapter2Cleanup: function() {
		this.sst.removeCallback($bind(this,this.chapter2SSTReady));
		var _g = 0;
		var _g1 = this.c2Markers;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			this.fadeOutMarker(m);
		}
	}
	,chapter3Init: function() {
		var _g1 = this;
		var circumnavigationTime = 20;
		var angleMultiplier = 1.1;
		var alt = this.state.camera.altForApparentRadius(0.75);
		var tmp;
		var _g = [];
		var _g11 = 0;
		var _g2 = tracks__$WeatherGlobe_Data.greatCircle;
		while(_g11 < _g2.length) {
			var c = _g2[_g11];
			++_g11;
			var tmp1;
			var tmp2;
			var tmp3;
			var longitudeEast = c[0];
			var latitudeNorth = c[1];
			tmp3 = new gis__$GeoCoord_CGeoCoord(longitudeEast,latitudeNorth,c[2] != null?c[2]:0);
			tmp2 = tmp3;
			var _this = tmp2;
			_this.alt = alt;
			tmp1 = _this;
			_g.push(this.state.globe.geoToWorld(tmp1));
		}
		tmp = _g;
		var pathVectors = tmp;
		var startVector = pathVectors[0];
		this.setOverlayOpacities(0.0,0.0,null,null,function() {
			_g1.sstAnomaly.onReady($bind(_g1,_g1.chapter3AnomReady));
		});
		this.cameraAnimation = this.state.camera.setTargetVector(startVector,6).onComplete(function() {
			_g1.state.sunSpringK = 7.5;
			_g1.cameraAnimation = _g1.state.camera.setTargetGreatCircleAngle(pathVectors[0],pathVectors[1],Math.PI * 2 * angleMultiplier,circumnavigationTime);
			_g1.cameraAnimation.ease(motion_easing_Sine.get_easeInOut());
			_g1.cameraAnimation.onComplete(function() {
				_g1.config.onChapterComplete(_g1.currentChapterIdx);
			});
		});
	}
	,chapter3AnomReady: function(s) {
		this.state.globe.setParticleFlowOverlay(null);
		this.state.globe.setGradientOverlay(s,null,null,"(x = (x + OFFSET)/INV_SCALE, x = x*2. - 1.0, x -= 0.304, x = x*19., x = x*.5 + .5, drama(clamp(x, 0., 1.)) + vec3(1.0 * x*x*x*x))",true);
		this.setOverlayOpacities(1.0,0.);
	}
	,chapter3Cleanup: function() {
		this.sstAnomaly.removeCallback($bind(this,this.chapter3AnomReady));
	}
	,chapter4Init: function() {
		var _g = this;
		if(!this.areSequencesSet(this.sstAnomaly,null)) this.setOverlayOpacities(0.0,0.0,null,null,function() {
			_g.sstAnomaly.onReady($bind(_g,_g.chapter3AnomReady));
		}); else this.setOverlayOpacities(1.0,0.);
		var tmp;
		var g = gis_Constants.GREAT_BARRIER_REEF;
		var _this = new gis__$GeoCoord_CGeoCoord(g["long"],g.lat,g.alt);
		var v = this.state.camera.altForApparentRadius(0.75);
		_this.alt = v;
		tmp = _this;
		this.cameraAnimation = this.state.camera.setTargetGeoCoord(tmp,10);
		this.cameraAnimation.onComplete(function() {
			_g.config.onChapterComplete(_g.currentChapterIdx);
		});
	}
	,chapter4Cleanup: function() {
		this.sstAnomaly.removeCallback($bind(this,this.chapter3AnomReady));
	}
	,chapter5Init: function() {
		var _g = this;
		this.setOverlayOpacities(0.0,0.0,null,null,function() {
			_g.wind.onReady($bind(_g,_g.chapter5WindsReady));
		});
		var tmp;
		var g = gis_Constants.GREAT_BARRIER_REEF;
		var _this = new gis__$GeoCoord_CGeoCoord(g["long"],g.lat,g.alt);
		var v = this.state.camera.altForApparentRadius(1.05);
		_this.alt = v;
		tmp = _this;
		this.cameraAnimation = this.state.camera.setTargetGeoCoord(tmp,10);
		this.cameraAnimation.onComplete(function() {
			_g.config.onChapterComplete(_g.currentChapterIdx);
		});
	}
	,chapter5WindsReady: function(s) {
		this.state.globe.setGradientOverlay(s,null,null,"blueWhite(pow(x/50.0, .5))",true);
		this.state.globe.setParticleFlowOverlay(s,{ decayHalfLife : 0.44, particleOpacity : 0.24, particleSize : 2, particleLifetime : 2.1, velocityScale : 0.0017},false);
		this.setOverlayOpacities(0.6,0.8);
	}
	,chapter5Cleanup: function() {
		this.wind.removeCallback($bind(this,this.chapter5WindsReady));
	}
	,setOverlayOpacities: function(gradient,particle,tGradient,tParticle,readyGradient,readyParticle) {
		if(tParticle == null) tParticle = 1.0;
		if(tGradient == null) tGradient = 1.0;
		motion_Actuate.tween(this.state.globe.gradientOverlayMaterial,tGradient,{ opacity : gradient},true).ease(motion_easing_Quad.get_easeInOut()).onComplete(readyGradient);
		motion_Actuate.tween(this.state.globe.particleOverlayMaterial,tParticle,{ opacity : particle},true).ease(motion_easing_Quad.get_easeInOut()).onComplete(readyParticle);
	}
	,areSequencesSet: function(gradient,particle) {
		return this.state.globe.gradientMap != null && this.state.globe.particleFlowMap != null && this.state.globe.gradientMap.sequenceView.sequence == gradient && this.state.globe.particleFlowMap.get_sequence() == particle;
	}
	,__class__: tracks_WeatherGlobe
});
var tracks__$WeatherGlobe_Data = function() { };
tracks__$WeatherGlobe_Data.__name__ = true;
var tracks_Yasi = function(state,config) {
	tracks_Track.call(this,state,config);
	haxe_Log.trace("setting up Yasi",{ fileName : "Yasi.hx", lineNumber : 18, className : "tracks.Yasi", methodName : "new"});
	this.g = state.globe;
	var geoCoords = [[-174.20041578595533,-12.513848396361265,0],[-176.7011343398897,-12.945599910277297,0],[179.17687102384582,-13.766161116383206,0],[175.7822060088731,-14.642631441828902,0],[169.6189003889049,-13.622312227823304,0],[164.55339913004946,-13.16020955331978,0],[157.4039707279596,-13.761494926195361,0],[151.14096307191258,-15.975071096165696,0],[144.01068716307313,-18.75255713371913,0],[138.89250941547778,-21.181690864029925,0],[135.43490041123601,-24.53698136671599,0]];
	var x = 0;
	var _g1 = 0;
	var _g = geoCoords.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = geoCoords[i];
		x = i / (geoCoords.length - 1);
		var alt = 1.5 - THREE.Math.smootherstep(x,0.,1.0);
		c[2] = alt;
	}
	state.scene.updateMatrixWorld(false);
	var tmp;
	var _g2 = [];
	var _g11 = 0;
	while(_g11 < geoCoords.length) {
		var c1 = geoCoords[_g11];
		++_g11;
		var tmp1;
		var tmp2;
		var longitudeEast = c1[0];
		var latitudeNorth = c1[1];
		tmp2 = new gis__$GeoCoord_CGeoCoord(longitudeEast,latitudeNorth,c1[2] != null?c1[2]:0);
		tmp1 = tmp2;
		_g2.push(this.g.geoToWorld(tmp1));
	}
	tmp = _g2;
	var pathVerticies = tmp;
	this.testPath = new THREE.SplineCurve3(pathVerticies);
	var sequenceParams = { overrideMinFiltering : THREE.LinearFilter, overrideMagFiltering : THREE.LinearFilter};
	this.windSequence = new objects_globe_MapSequence("" + state.assetRoot + "/climate-data/yasi-110m-highres-pack",sequenceParams);
	this.chapters = [{ init : $bind(this,this.chapter0Init), cleanup : $bind(this,this.chapter0Cleanup)}];
	this.chapterCount = 1;
};
tracks_Yasi.__name__ = true;
tracks_Yasi.__super__ = tracks_Track;
tracks_Yasi.prototype = $extend(tracks_Track.prototype,{
	onMouseDown: function(mouse) {
	}
	,cleanup: function() {
		if(this.windSequence != null) this.windSequence.dispose();
	}
	,update: function(dt_ms) {
		if(this.state.controls.enabled) return;
		var progress = 0;
		if(this.g.particleFlowMap != null) {
			if(this.g.particleFlowMap.get_sequence() != null) progress = this.g.particleFlowMap.get_sequenceView().progress;
		}
		var tmp;
		var x = progress;
		if(x < 0) x = 0;
		if(x > 1) x = 1;
		tmp = x;
		progress = tmp;
		var p = this.testPath.getPoint(progress);
		this.state.camera.setTargetVector(p,0);
	}
	,chapter0Init: function() {
		haxe_Log.trace("Yasi chapter 0",{ fileName : "Yasi.hx", lineNumber : 106, className : "tracks.Yasi", methodName : "chapter0Init"});
		haxe_Log.trace("loading wind flow data",{ fileName : "Yasi.hx", lineNumber : 107, className : "tracks.Yasi", methodName : "chapter0Init"});
		this.state.controls.enabled = false;
		var _this = this.state.globe;
		_this.sun.position.set(Math.cos(135) * _this.sunDistance,0,-Math.sin(135) * _this.sunDistance);
		this.g.vectorOverlayMaterial.visible = true;
		this.g.vectorOverlayMaterial.opacity = 0.5;
		haxe_Log.trace("windSequence.ready",{ fileName : "Yasi.hx", lineNumber : 117, className : "tracks.Yasi", methodName : "chapter0Init", customParams : [this.windSequence.ready]});
		this.windSequence.onReady($bind(this,this.chapter0SequenceReady));
	}
	,chapter0SequenceReady: function(s) {
		this.g.setGradientOverlay(s,null,null,"blueWhite(pow(x/50.0, .5))",false);
		this.g.setParticleFlowOverlay(s,{ countPowerOf2 : 18, decayHalfLife : 0.2, particleOpacity : 0.3, particleSize : 2.0, particleLifetime : 5.3, velocityScale : 0.0018},false);
		this.g.gradientOverlayMaterial.opacity = 0.7;
		this.g.particleOverlayMaterial.opacity = 0.7;
	}
	,chapter0Cleanup: function() {
		haxe_Log.trace("Yasi cleanup 0",{ fileName : "Yasi.hx", lineNumber : 135, className : "tracks.Yasi", methodName : "chapter0Cleanup"});
		this.windSequence.removeCallback($bind(this,this.chapter0SequenceReady));
	}
	,__class__: tracks_Yasi
});
var tracks_common_Marker = function(text,coord) {
	this.label = new tracks_common__$Marker_CLabel(text);
	this.object = new THREE.Object3D();
	this.coord = coord;
};
tracks_common_Marker.__name__ = true;
tracks_common_Marker.prototype = {
	__class__: tracks_common_Marker
};
var tracks_common__$Marker_Label_$Impl_$ = {};
tracks_common__$Marker_Label_$Impl_$.__name__ = true;
tracks_common__$Marker_Label_$Impl_$.__properties__ = {set_opacity:"set_opacity",get_opacity:"get_opacity"}
tracks_common__$Marker_Label_$Impl_$._new = function(text) {
	return new tracks_common__$Marker_CLabel(text);
};
tracks_common__$Marker_Label_$Impl_$.get_opacity = function(this1) {
	return this1.get_opacity();
};
tracks_common__$Marker_Label_$Impl_$.set_opacity = function(this1,v) {
	return this1.set_opacity(v);
};
tracks_common__$Marker_Label_$Impl_$.toElement = function(this1) {
	return this1.mainEl;
};
var tracks_common__$Marker_CLabel = function(text) {
	this._opacity = 1.0;
	var fontSize_px = 16;
	var lineLength_px = 15;
	var lineThickness_px = 1;
	var markerRadius_px = 4;
	this.mainEl = (function($this) {
		var $r;
		var _this = window.document;
		$r = _this.createElement("div");
		return $r;
	}(this));
	this.mainEl.style.color = "#FFFFFF";
	this.mainEl.style.opacity = Std.string(this.get_opacity());
	this.mainEl.style.cursor = "default";
	this.mainEl.style.overflow = "visible";
	this.lineEl = (function($this) {
		var $r;
		var _this1 = window.document;
		$r = _this1.createElement("div");
		return $r;
	}(this));
	this.lineEl.style.position = "absolute";
	this.lineEl.style.top = -lineThickness_px * .5 + "px";
	this.lineEl.style.left = "0px";
	this.lineEl.style.width = lineLength_px + "px";
	this.lineEl.style.height = lineThickness_px + "px";
	this.lineEl.style.backgroundColor = "#FFFFFF";
	this.lineEl.style.boxShadow = "rgba(0, 0, 0, 0.7) 0px 0px 2px";
	this.mainEl.appendChild(this.lineEl);
	this.circleEl = (function($this) {
		var $r;
		var _this2 = window.document;
		$r = _this2.createElement("div");
		return $r;
	}(this));
	this.circleEl.style.position = "absolute";
	this.circleEl.style.top = -markerRadius_px + "px";
	this.circleEl.style.left = -markerRadius_px + "px";
	this.circleEl.style.width = markerRadius_px * 2 + "px";
	this.circleEl.style.height = markerRadius_px * 2 + "px";
	this.circleEl.style.borderRadius = markerRadius_px + "px";
	this.circleEl.style.backgroundColor = "#FFFFFF";
	this.circleEl.style.boxShadow = "rgba(0, 0, 0, 0.7) 0px 0px 2px";
	this.mainEl.appendChild(this.circleEl);
	this.topLineEl = this.lineEl.cloneNode();
	this.topLineEl.style.boxShadow = "";
	this.mainEl.appendChild(this.topLineEl);
	this.textEl = (function($this) {
		var $r;
		var _this3 = window.document;
		$r = _this3.createElement("div");
		return $r;
	}(this));
	this.textEl.innerHTML = text;
	this.textEl.style.position = "relative";
	this.textEl.style.fontFamily = "bebas_neuebook, \"Arial Narrow\", Arial, sans-serif";
	this.textEl.style.fontSize = fontSize_px + "px";
	this.textEl.style.lineHeight = "1.0";
	this.textEl.style.letterSpacing = "1.5px";
	this.textEl.style.textTransform = "uppercase";
	this.textEl.style.textShadow = "rgba(0, 0, 0, 0.7) 0px 0px 2px";
	this.textEl.style.top = -0.5 * fontSize_px + "px";
	this.textEl.style.marginLeft = lineLength_px + 5 + "px";
	this.mainEl.appendChild(this.textEl);
};
tracks_common__$Marker_CLabel.__name__ = true;
tracks_common__$Marker_CLabel.prototype = {
	get_opacity: function() {
		return this._opacity;
	}
	,set_opacity: function(v) {
		this._opacity = v;
		this.mainEl.style.opacity = v == null?"null":"" + v;
		return v;
	}
	,__class__: tracks_common__$Marker_CLabel
	,__properties__: {set_opacity:"set_opacity",get_opacity:"get_opacity"}
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
/*! @preserve
Copyright (c) 2012, Michael Bostock
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* The name Michael Bostock may not be used to endorse or promote products
  derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/var topojson=function(){function t(c,d){function k(f){var a=c.arcs[0>f?~f:f],b=a[0],e;c.transform?(e=[0,0],a.forEach(function(a){e[0]+=a[0];e[1]+=a[1]})):e=a[a.length-1];return 0>f?[e,b]:[b,e]}function g(f,a){for(var e in f){var c=f[e];delete a[c.start];delete c.start;delete c.end;c.forEach(function(a){l[0>a?~a:a]=1});b.push(c)}}var l={},h={},e={},b=[],m=-1;d.forEach(function(f,a){var b=c.arcs[0>f?~f:f];3>b.length&&!b[1][0]&&!b[1][1]&&(b=d[++m],d[m]=f,d[a]=b)});d.forEach(function(b){var a=k(b),c=
a[0],d=a[1];(a=e[c])?(delete e[a.end],a.push(b),a.end=d,(b=h[d])?(delete h[b.start],c=b===a?a:a.concat(b),h[c.start=a.start]=e[c.end=b.end]=c):h[a.start]=e[a.end]=a):(a=h[d])?(delete h[a.start],a.unshift(b),a.start=c,(b=e[c])?(delete e[b.end],c=b===a?a:b.concat(a),h[c.start=b.start]=e[c.end=a.end]=c):h[a.start]=e[a.end]=a):(a=[b],h[a.start=c]=e[a.end=d]=a)});g(e,h);g(h,e);d.forEach(function(c){l[0>c?~c:c]||b.push([c])});return b}function u(c,d,k){var g=[];if(1<arguments.length){var l=function(b){"GeometryCollection"===
b.type?b.geometries.forEach(l):b.type in a&&(f=b,a[b.type](b.arcs))},h=function(a){a.forEach(e)},e=function(a){a.forEach(b)},b=function(a){var b=0>a?~a:a;(m[b]||(m[b]=[])).push({i:a,g:f})},m=[],f,a={LineString:e,MultiLineString:h,Polygon:h,MultiPolygon:function(a){a.forEach(h)}};l(d);m.forEach(3>arguments.length?function(a){g.push(a[0].i)}:function(a){k(a[0].g,a[a.length-1].g)&&g.push(a[0].i)})}else for(var p=0,A=c.arcs.length;p<A;++p)g.push(p);return{type:"MultiLineString",arcs:t(c,g)}}function v(c,
d){function k(b){b.forEach(function(c){c.forEach(function(c){(l[c=0>c?~c:c]||(l[c]=[])).push(b)})});h.push(b)}function g(b){b=q(c,{type:"Polygon",arcs:[b]}).coordinates[0];for(var e=-1,f=b.length,a,d=b[f-1],h=0;++e<f;)a=d,d=b[e],h+=a[0]*d[1]-a[1]*d[0];return 0<.5*h}var l={},h=[],e=[];d.forEach(function(b){"Polygon"===b.type?k(b.arcs):"MultiPolygon"===b.type&&b.arcs.forEach(k)});h.forEach(function(b){if(!b._){var c=[],f=[b];b._=1;for(e.push(c);b=f.pop();)c.push(b),b.forEach(function(a){a.forEach(function(a){l[0>
a?~a:a].forEach(function(a){a._||(a._=1,f.push(a))})})})}});h.forEach(function(b){delete b._});return{type:"MultiPolygon",arcs:e.map(function(b){var e=[];b.forEach(function(a){a.forEach(function(a){a.forEach(function(a){2>l[0>a?~a:a].length&&e.push(a)})})});e=t(c,e);if(1<(n=e.length)){var f=g(b[0][0]);for(b=0;b<n;++b)if(f===g(e[b])){f=e[0];e[0]=e[b];e[b]=f;break}}return e})}}function w(c,d){var k={type:"Feature",id:d.id,properties:d.properties||{},geometry:q(c,d)};null==d.id&&delete k.id;return k}
function q(c,d){function k(a){a=a.slice();b(a,0);return a}function g(a){for(var c=[],e=0,f=a.length;e<f;++e){var d=a[e],h=c;h.length&&h.pop();for(var g=m[0>d?~d:d],k=0,l=g.length,q=void 0;k<l;++k)h.push(q=g[k].slice()),b(q,k);if(0>d)for(d=h,h=void 0,g=d.length,l=g-l;l<--g;)h=d[l],d[l++]=d[g],d[g]=h}2>c.length&&c.push(c[0].slice());return c}function l(a){for(a=g(a);4>a.length;)a.push(a[0].slice());return a}function h(a){return a.map(l)}function e(a){var b=a.type;return"GeometryCollection"===b?{type:b,
geometries:a.geometries.map(e)}:b in f?{type:b,coordinates:f[b](a)}:null}var b=x(c.transform),m=c.arcs,f={Point:function(a){return k(a.coordinates)},MultiPoint:function(a){return a.coordinates.map(k)},LineString:function(a){return g(a.arcs)},MultiLineString:function(a){return a.arcs.map(g)},Polygon:function(a){return h(a.arcs)},MultiPolygon:function(a){return a.arcs.map(h)}};return e(d)}function y(c,d){for(var k=0,g=c.length;k<g;){var l=k+g>>>1;c[l]<d?k=l+1:g=l}return k}function B(c){var d=c[0],k=
c[1];c=c[2];return Math.abs((d[0]-c[0])*(k[1]-d[1])-(d[0]-k[0])*(c[1]-d[1]))}function C(){function c(c,e){for(;0<e;){var b=(e+1>>1)-1,d=g[b];if(0<=c[1][2]-d[1][2])break;g[d._=e]=d;g[c._=e=b]=c}}function d(c,e){for(;;){var b=e+1<<1,d=b-1,f=e,a=g[f];d<l&&0>g[d][1][2]-a[1][2]&&(a=g[f=d]);b<l&&0>g[b][1][2]-a[1][2]&&(a=g[f=b]);if(f===e)break;g[a._=e]=a;g[c._=e=f]=c}}var k={},g=[],l=0;k.push=function(d){c(g[d._=l]=d,l++);return l};k.pop=function(){if(!(0>=l)){var c=g[0],e;0<--l&&(e=g[l],d(g[e._=0]=e,0));
return c}};k.remove=function(h){var e=h._,b;if(g[e]===h)return e!==--l&&(b=g[l],(0>b[1][2]-h[1][2]?c:d)(g[b._=e]=b,e)),e};return k}function x(c){if(!c)return z;var d,k,g=c.scale[0],l=c.scale[1],h=c.translate[0],e=c.translate[1];return function(b,c){c||(d=k=0);b[0]=(d+=b[0])*g+h;b[1]=(k+=b[1])*l+e}}function D(c){if(!c)return z;var d,k,g=c.scale[0],l=c.scale[1],h=c.translate[0],e=c.translate[1];return function(b,c){c||(d=k=0);var f=(b[0]-h)/g|0,a=(b[1]-e)/l|0;b[0]=f-d;b[1]=a-k;d=f;k=a}}function z(){}
return{version:"1.6.19",mesh:function(c){return q(c,u.apply(this,arguments))},meshArcs:u,merge:function(c){return q(c,v.apply(this,arguments))},mergeArcs:v,feature:function(c,d){return"GeometryCollection"===d.type?{type:"FeatureCollection",features:d.geometries.map(function(d){return w(c,d)})}:w(c,d)},neighbors:function(c){function d(a,b){a.forEach(function(a){0>a&&(a=~a);var c=l[a];c?c.push(b):l[a]=[b]})}function k(a,b){a.forEach(function(a){d(a,b)})}function g(a,b){if("GeometryCollection"===a.type)a.geometries.forEach(function(a){g(a,
b)});else if(a.type in e)e[a.type](a.arcs,b)}var l={},h=c.map(function(){return[]}),e={LineString:d,MultiLineString:k,Polygon:k,MultiPolygon:function(a,b){a.forEach(function(a){k(a,b)})}};c.forEach(g);for(var b in l){c=l[b];for(var m=c.length,f=0;f<m;++f)for(var a=f+1;a<m;++a){var p=c[f],q=c[a],r;(r=h[p])[b=y(r,q)]!==q&&r.splice(b,0,q);(r=h[q])[b=y(r,p)]!==p&&r.splice(b,0,p)}}return h},presimplify:function(c,d){function k(c){h.remove(c);c[1][2]=d(c);h.push(c)}var g=x(c.transform),l=D(c.transform),
h=C();d||(d=B);c.arcs.forEach(function(c){for(var b=[],m=0,f,a=0,p=c.length;a<p;++a)f=c[a],g(c[a]=[f[0],f[1],Infinity],a);a=1;for(p=c.length-1;a<p;++a)f=c.slice(a-1,a+2),f[1][2]=d(f),b.push(f),h.push(f);a=0;for(p=b.length;a<p;++a)f=b[a],f.previous=b[a-1],f.next=b[a+1];for(;f=h.pop();)b=f.previous,a=f.next,f[1][2]<m?f[1][2]=m:m=f[1][2],b&&(b.next=a,b[2]=f[2],k(b)),a&&(a.previous=b,a[0]=f[0],k(a));c.forEach(l)});return c}}}();;
var __map_reserved = {}
Debug.guiReadyListeners = [];
Debug.overlaySettingsAdded = false;
Debug.nextChapterBtnAdded = false;
GUI.bindings = [];
GUI._proj = new THREE.Vector3();
GUI._world = new THREE.Vector3();
GUI._screen = new THREE.Vector2();
GUI.maxZIndex = 16777216;
gis_Constants.EARTH_RADIUS_M = 6378100;
gis_Constants.LONDON = new gis__$GeoCoord_CGeoCoord(-0.1275,51.5072,0);
gis_Constants.SAN_FRANCISCO = new gis__$GeoCoord_CGeoCoord(-122.4167,37.7833,0);
gis_Constants.HAWAII = new gis__$GeoCoord_CGeoCoord(-157.7964,21.3114,0);
gis_Constants.GREAT_BARRIER_REEF = new gis__$GeoCoord_CGeoCoord(147.7000,-18.2861,0);
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = {}.toString;
motion_actuators_SimpleActuator.actuators = [];
motion_actuators_SimpleActuator.actuatorsLength = 0;
motion_actuators_SimpleActuator.addedEvent = false;
motion_Actuate.defaultActuator = motion_actuators_SimpleActuator;
motion_Actuate.defaultEase = motion_easing_Expo.get_easeOut();
motion_Actuate.targetLibraries = new haxe_ds_ObjectMap();
objects_globe_Atmosphere.atmosphereSegments = 120;
objects_globe_AtmosphereInnerMaterial.vertexShaderStr = "//\n// Atmospheric scattering vertex shader\n//\n// Author: Sean O'Neil\n//\n// Copyright (c) 2004 Sean O'Neil\n//\n\nuniform vec3 v3InvWavelength;\t// 1 / pow(wavelength, 4) for the red, green, and blue channels\nuniform float fOuterRadius;\t\t// The outer (atmosphere) radius\nuniform float fOuterRadius2;\t// fOuterRadius^2\nuniform float fInnerRadius;\t\t// The inner (planetary) radius\nuniform float fInnerRadius2;\t// fInnerRadius^2\nuniform float fKrESun;\t\t\t// Kr * ESun\nuniform float fKmESun;\t\t\t// Km * ESun\nuniform float fKr4PI;\t\t\t// Kr * 4 * PI\nuniform float fKm4PI;\t\t\t// Km * 4 * PI\nuniform float fScale;\t\t\t// 1 / (fOuterRadius - fInnerRadius)\nuniform float fScaleDepth;\t\t// The scale depth (i.e. the altitude at which the atmosphere's average density is found)\nuniform float fScaleOverScaleDepth;\t// fScale / fScaleDepth\n\n//three.js\n#if MAX_DIR_LIGHTS > 0\n\tuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n\tuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n\nvarying vec4 secondaryColor;\nvarying vec4 frontColor;\n\n#ifdef GROUND_TEXTURES\nvarying vec2 vUv;\n#endif\n\nconst float fSamples = float(nSamples);//nSamples provided in prepended define\n\nfloat scale(float fCos)\n{\n\tfloat x = 1.0 - fCos;\n\treturn fScaleDepth * exp(-0.00287 + x*(0.459 + x*(3.83 + x*(-6.80 + x*5.25))));\n}\n\nvoid main(void)\n{\n\t#ifdef GROUND_TEXTURES\n\tvUv = uv;\n\t#endif\n\n\n\t//get values from three.js\n\t//@! doesn't currently handle glancing camera angles\n\tvec3 v3LightDir = directionalLightDirection[0];\n\tvec3 v3VertPos = (modelMatrix * vec4(position, 1.)).xyz;//world coordinates\n\tvec3 v3CameraPos = cameraPosition;\n\n\tfloat fCameraHeight = length(v3CameraPos);\n\tfloat fCameraHeight2 = fCameraHeight * fCameraHeight;\n\n\t// Get the ray from the camera to the vertex and its length (which is the far point of the ray passing through the atmosphere)\n\tvec3 v3Ray = v3VertPos - v3CameraPos;\n\tfloat fFar = length(v3Ray);\n\tv3Ray /= fFar;\n\n\t// Calculate the closest intersection of the ray with the outer atmosphere (which is the near point of the ray passing through the atmosphere)\n\tfloat B = 2.0 * dot(v3CameraPos, v3Ray);\n\tfloat C = fCameraHeight2 - fOuterRadius2;\n\tfloat fDet = max(0.0, B*B - 4.0 * C);\n\tfloat fNear = 0.5 * (-B - sqrt(fDet));\n\n\t// Calculate the ray's starting position, then calculate its scattering offset\n\tvec3 v3Start = v3CameraPos + v3Ray * fNear;\n\tfFar -= fNear;\n\tfloat fDepth = exp((fInnerRadius - fOuterRadius) / fScaleDepth);\n\tfloat fCameraAngle = dot(-v3Ray, v3VertPos) / length(v3VertPos);\n\tfloat fLightAngle = dot(v3LightDir, v3VertPos) / length(v3VertPos);\n\tfloat fCameraScale = scale(fCameraAngle);\n\tfloat fLightScale = scale(fLightAngle);\n\tfloat fCameraOffset = fDepth*fCameraScale;\n\tfloat fTemp = (fLightScale + fCameraScale);\n\n\t// Initialize the scattering loop variables\n\tfloat fSampleLength = fFar / fSamples;\n\tfloat fScaledLength = fSampleLength * fScale;\n\tvec3 v3SampleRay = v3Ray * fSampleLength;\n\tvec3 v3SamplePoint = v3Start + v3SampleRay * 0.5;\n\n\t// Now loop through the sample rays\n\tvec3 v3FrontColor = vec3(0.0, 0.0, 0.0);\n\tvec3 v3Attenuate;\n\tfor(int i=0; i<nSamples; i++)\n\t{\n\t\tfloat fHeight = length(v3SamplePoint);\n\t\tfloat fDepth = exp(fScaleOverScaleDepth * (fInnerRadius - fHeight));\n\t\tfloat fScatter = fDepth*fTemp - fCameraOffset;\n\t\tv3Attenuate = exp(-fScatter * (v3InvWavelength * fKr4PI + fKm4PI));\n\t\tv3FrontColor += v3Attenuate * (fDepth * fScaledLength);\n\t\tv3SamplePoint += v3SampleRay;\n\t}\n\n\t// Atmosphere calculations output:\n\tfrontColor = vec4(v3FrontColor * (v3InvWavelength * fKrESun + fKmESun), 1.0);\n\t// Calculate the attenuation factor for the ground\n\tsecondaryColor = vec4(v3Attenuate, 1.0);\n\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n";
objects_globe_AtmosphereInnerMaterial.fragmentShaderStr = "//\n// Atmospheric scattering fragment shader\n//\n// Author: Sean O'Neil\n//\n// Copyright (c) 2004 Sean O'Neil\n//\n\n#ifdef GROUND_TEXTURES\nuniform sampler2D threeTextureBug;\nvarying vec2 vUv;\n#endif\n\nvarying vec4 secondaryColor;\nvarying vec4 frontColor;\n\n\nvoid main (void)\n{\n\t#ifdef GROUND_TEXTURES\n\tgl_FragColor = frontColor + texture2D(threeTextureBug, vUv) * secondaryColor;\n\t#else\n\t// gl_FragColor = frontColor*0.5 + mix(frontColor, secondaryColor*0.25, 0.5) + .0 * secondaryColor;\n\tgl_FragColor = frontColor*0.95 + .1 * secondaryColor;\n\t#endif\n}\n";
objects_globe_AtmosphereOuterMaterial.vertexShaderStr = "//\n// Atmospheric scattering vertex shader\n//\n// Author: Sean O'Neil\n//\n// Copyright (c) 2004 Sean O'Neil\n//\n\nuniform vec3 v3InvWavelength;\t// 1 / pow(wavelength, 4) for the red, green, and blue channels\nuniform float fOuterRadius;\t\t// The outer (atmosphere) radius\nuniform float fOuterRadius2;\t// fOuterRadius^2\nuniform float fInnerRadius;\t\t// The inner (planetary) radius\nuniform float fInnerRadius2;\t// fInnerRadius^2\nuniform float fKrESun;\t\t\t// Kr * ESun\nuniform float fKmESun;\t\t\t// Km * ESun\nuniform float fKr4PI;\t\t\t// Kr * 4 * PI\nuniform float fKm4PI;\t\t\t// Km * 4 * PI\nuniform float fScale;\t\t\t// 1 / (fOuterRadius - fInnerRadius)\nuniform float fScaleDepth;\t\t// The scale depth (i.e. the altitude at which the atmosphere's average density is found)\nuniform float fScaleOverScaleDepth;\t// fScale / fScaleDepth\n\n//three.js\n#if MAX_DIR_LIGHTS > 0\n\tuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n\tuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n\nvarying vec3 v3Direction;\nvarying vec4 secondaryColor;\nvarying vec4 frontColor;\n\nconst float fSamples = float(nSamples);//nSamples provided in prepended define\n\nfloat scale(float fCos)\n{\n\tfloat x = 1.0 - fCos;\n\treturn fScaleDepth * exp(-0.00287 + x*(0.459 + x*(3.83 + x*(-6.80 + x*5.25))));\n}\n\nvoid main(void)\n{\t\n\t//get values from three.js\n\t//@! doesn't currently handle glancing camera angles\n\tvec3 v3LightDir = directionalLightDirection[0];\n\tvec3 v3VertPos = (modelMatrix * vec4(position, 1.)).xyz;//world coordinates\n\tvec3 v3CameraPos = cameraPosition;\n\n\tfloat fCameraHeight = length(v3CameraPos);\n\tfloat fCameraHeight2 = fCameraHeight * fCameraHeight;\n\n\t// Get the ray from the camera to the vertex and its length (which is the far point of the ray passing through the atmosphere)\n\tvec3 v3Ray = v3VertPos - v3CameraPos;\n\tfloat fFar = length(v3Ray);\n\tv3Ray /= fFar;\n\n\t// Calculate the closest intersection of the ray with the outer atmosphere (which is the near point of the ray passing through the atmosphere)\n\tfloat B = 2.0 * dot(v3CameraPos, v3Ray);\n\tfloat C = fCameraHeight2 - fOuterRadius2;\n\tfloat fDet = max(0.0, B*B - 4.0 * C);\n\tfloat fNear = 0.5 * (-B - sqrt(fDet));\n\n\t// Calculate the ray's starting position, then calculate its scattering offset\n\tvec3 v3Start = v3CameraPos + v3Ray * fNear;\n\tfFar -= fNear;\n\tfloat fStartAngle = dot(v3Ray, v3Start) / fOuterRadius;\n\tfloat fStartDepth = exp(-1.0 / fScaleDepth);\n\tfloat fStartOffset = fStartDepth * scale(fStartAngle);\n\n\t// Initialize the scattering loop variables\n\tfloat fSampleLength = fFar / fSamples;\n\tfloat fScaledLength = fSampleLength * fScale;\n\tvec3 v3SampleRay = v3Ray * fSampleLength;\n\tvec3 v3SamplePoint = v3Start + v3SampleRay * 0.5;\n\n\t// Now loop through the sample rays\n\tvec3 v3FrontColor = vec3(0.0, 0.0, 0.0);\n\tfor(int i=0; i<nSamples; i++)\n\t{\n\t\tfloat fHeight = length(v3SamplePoint);\n\t\tfloat fDepth = exp(fScaleOverScaleDepth * (fInnerRadius - fHeight));\n\t\tfloat fLightAngle = dot(v3LightDir, v3SamplePoint) / fHeight;\n\t\tfloat fCameraAngle = dot(v3Ray, v3SamplePoint) / fHeight;\n\t\tfloat fScatter = (fStartOffset + fDepth * (scale(fLightAngle) - scale(fCameraAngle)));\n\t\tvec3 v3Attenuate = exp(-fScatter * (v3InvWavelength * fKr4PI + fKm4PI));\n\n\t\tv3FrontColor += v3Attenuate * (fDepth * fScaledLength);\n\t\tv3SamplePoint += v3SampleRay;\n\t}\n\n\t// Finally, scale the Mie and Rayleigh colors and set up the varying variables for the pixel shader\n\tsecondaryColor = vec4(v3FrontColor * fKmESun, 1.0);\n\tfrontColor = vec4(v3FrontColor * (v3InvWavelength * fKrESun), 1.0);\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\tv3Direction = v3CameraPos - v3VertPos;\n}";
objects_globe_AtmosphereOuterMaterial.fragmentShaderStr = "//\n// Atmospheric scattering fragment shader\n//\n// Author: Sean O'Neil\n//\n// Copyright (c) 2004 Sean O'Neil\n//\n\nuniform float g;\nuniform float g2;\n\nvarying vec3 v3Direction;\nvarying vec4 secondaryColor;\nvarying vec4 frontColor;\n\n//three.js\n#if MAX_DIR_LIGHTS > 0\n\tuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n\tuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n\nvoid main (void)\n{\n\tvec3 v3LightDir = directionalLightDirection[0];\n\n\tfloat fCos = dot(v3LightDir, v3Direction) / length(v3Direction);\n\tfloat fMiePhase = 1.5 * ((1.0 - g2) / (2.0 + g2)) * (1.0 + fCos*fCos) / pow(1.0 + g2 - 2.0*g*fCos, 1.5);\n\tgl_FragColor = frontColor + fMiePhase * secondaryColor;\n\tgl_FragColor.a = gl_FragColor.b;\n}";
objects_globe_GlobeMaterial.vertexShaderStr = "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n\n//ShaderChunk.common\n" + THREE.ShaderChunk.common + "\n//ShaderChunk.map_pars_vertex\n" + THREE.ShaderChunk.map_pars_vertex + "\n\nvoid main() {\n\n\t//ShaderChunk.map_vertex\n\t" + THREE.ShaderChunk.map_vertex + "\n\n\t//ShaderChunk.defaultnormal_vertex\n\t" + THREE.ShaderChunk.defaultnormal_vertex + "\n\n\t#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\n\t//ShaderChunk.default_vertex\n\t" + THREE.ShaderChunk.default_vertex + "\n\n\tvViewPosition = -mvPosition.xyz;\n\n}";
objects_globe_GlobeMaterial.fragmentShaderStr = "#define PHONG\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n\n//ShaderChunk.common\n" + THREE.ShaderChunk.common + "\n//ShaderChunk.map_pars_fragment\n" + THREE.ShaderChunk.map_pars_fragment + "\n//ShaderChunk.alphamap_pars_fragment\n" + THREE.ShaderChunk.alphamap_pars_fragment + "\n//ShaderChunk.lights_phong_pars_fragment\n" + THREE.ShaderChunk.lights_phong_pars_fragment + "\n//ShaderChunk.bumpmap_pars_fragment\n" + THREE.ShaderChunk.bumpmap_pars_fragment + "\n//ShaderChunk.normalmap_pars_fragment\n" + THREE.ShaderChunk.normalmap_pars_fragment + "\n//ShaderChunk.specularmap_pars_fragment\n" + THREE.ShaderChunk.specularmap_pars_fragment + "\n\nvoid main() {\n\n\tvec3 outgoingLight = vec3( 0.0 );\t// outgoing light does not have an alpha, the surface does\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t//ShaderChunk.map_fragment\n\t" + THREE.ShaderChunk.map_fragment + "\n\t//ShaderChunk.alphamap_fragment\n\t" + THREE.ShaderChunk.alphamap_fragment + "\n\t//ShaderChunk.alphatest_fragment\n\t" + THREE.ShaderChunk.alphatest_fragment + "\n\t//ShaderChunk.specularmap_fragment\n\t" + THREE.ShaderChunk.specularmap_fragment + "\n\n\t//ShaderChunk.lights_phong_fragment\n\t#ifndef FLAT_SHADED\n\t\tvec3 normal = normalize( vNormal );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\t\t#endif\n\t#else\n\t\tvec3 fdx = dFdx( vViewPosition );\n\t\tvec3 fdy = dFdy( vViewPosition );\n\t\tvec3 normal = normalize( cross( fdx, fdy ) );\n\t#endif\n\n\tvec3 viewPosition = normalize( vViewPosition );\n\n\t#ifdef USE_NORMALMAP\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n\t#elif defined( USE_BUMPMAP )\n\t\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\t#endif\n\n\tvec3 totalDiffuseLight = vec3( 0.0 );\n\tvec3 totalSpecularLight = vec3( 0.0 );\n\n\t#if MAX_DIR_LIGHTS > 0\n\t \tfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\t \n\t \t\tvec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\t \n\t \t\t// diffuse\n\t \t\tfloat dotProduct = dot( normal, dirVector );\n\n\n\t \t\t//@! phong backside hack\n\t \t\t#define WRAP_AROUND\n\t \t\tvec3 wrapRGB = vec3(1.0, 125./255., 18./255.);\n\t \t\tfloat backsideAmbience = 0.04;\n\t \n\t \t\t#ifdef WRAP_AROUND\n\t \t\t\t//@! doubled dot products\n\t \t\t\tfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\n\t \t\t\tfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\t \t\t\tvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), clamp(wrapRGB*0.4 + dotProduct*1.2, 0., 1.) ) + wrapRGB * backsideAmbience;\n\t \t\t#else\n\t \t\t\tfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n\t \t\t#endif\n\t \n\t \t\ttotalDiffuseLight += directionalLightColor[ i ] * dirDiffuseWeight;\n\t \n\t \t\t// specular\n\t \t\tvec3 dirHalfVector = normalize( dirVector + viewPosition );\n\t \t\tfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n\t \t\tfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\t \n\t \t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t \t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n\t \t\ttotalSpecularLight += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\t \t}\n\t#endif\n\n\toutgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) + totalSpecularLight + emissive;\n\n\t//ShaderChunk.linear_to_gamma_fragment\n\t" + THREE.ShaderChunk.linear_to_gamma_fragment + "\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\t// TODO, this should be pre-multiplied to allow for bright highlights on very transparent objects\n\n}";
render_ShaderPass.staticCamera = new THREE.OrthographicCamera(-1,1,1,-1,0,1);
render_ShaderPass.staticPlaneGeom = new THREE.PlaneBufferGeometry(2,2,1,1);
shaderlib_Chunks.basic_projection = "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);";
shaderlib_Chunks.bilerp = "vec4 bilerp(sampler2D texture, vec2 coord, vec2 resolution){\n\t//convert to absolute coordinates\n\tcoord *= resolution;\n\n\tvec4 st;\n\tst.xy = floor(coord - .5) + .5; //left & bottom cell centers\n\tst.zw = st.xy + 1.;             //right & top centers\n\n\tvec2 t = texelCoord - st.xy;\n\n\tst /= resolution.xyxy; //to unitary coords\n\t\n\tvec4 tex11 = texture2D(texture, st.xy);\n\tvec4 tex21 = texture2D(texture, st.zy);\n\tvec4 tex12 = texture2D(texture, st.xw);\n\tvec4 tex22 = texture2D(texture, st.zw);\n\n\treturn mix(mix(tex11, tex21, t.x), mix(tex12, tex22, t.x), t.y);\n}";
shaderlib_Chunks.float_packing = "//Float Packing\nvec4 packFloat8bitRGBA(in float val) {\n    vec4 pack = vec4(1.0, 255.0, 65025.0, 16581375.0) * val;\n    pack = fract(pack);\n    pack -= vec4(pack.yzw / 255.0, 0.0);\n    return pack;\n}\n\nfloat unpackFloat8bitRGBA(in vec4 pack) {\n    return dot(pack, vec4(1.0, 1.0 / 255.0, 1.0 / 65025.0, 1.0 / 16581375.0));\n}\n\nvec3 packFloat8bitRGB(in float val) {\n    vec3 pack = vec3(1.0, 255.0, 65025.0) * val;\n    pack = fract(pack);\n    pack -= vec3(pack.yz / 255.0, 0.0);\n    return pack;\n}\n\nfloat unpackFloat8bitRGB(in vec3 pack) {\n    return dot(pack, vec3(1.0, 1.0 / 255.0, 1.0 / 65025.0));\n}\n\nvec2 packFloat8bitRG(in float val) {\n    vec2 pack = vec2(1.0, 255.0) * val;\n    pack = fract(pack);\n    pack -= vec2(pack.y / 255.0, 0.0);\n    return pack;\n}\n\nfloat unpackFloat8bitRG(in vec2 pack) {\n    return dot(pack, vec2(1.0, 1.0 / 255.0));\n}";
shaderlib_Chunks.pal = "//iq color palette function\nvec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ){\n\treturn a + b*cos( 6.28318*(c*t+d) );\n}";
shaderlib_Chunks.palettes = "#define blueWhite(x) pal(x, vec3(0.5), vec3(0.55), vec3(0.45), vec3(0.00, 0.10, 0.20) + 0.47)\n\nvec3 hue(float x){\n\tvec3 p = abs(fract(x + vec3(1.0, 2.0 / 3.0, 1.0 / 3.0)) * 6.0 - 3.0);\n\treturn (clamp(p - 1.0, 0.0, 1.0));\n}\n\nvec3 temperatureHue(float x){\n    return hue((1. - x)*0.7);\n}\n\nvec3 drama(float x){\n    return pal(x,\n        vec3(0.2),\n        vec3(0.9),\n        vec3(0.75, 1.0, 0.75),\n        vec3(0.3, -0.0,  -0.1)\n    );\n}";
shaderlib_Chunks.rand = "float rand(vec2 co){\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}";
objects_globe_GradientMap.fragmentShaderStr = "\n\tuniform sampler2D frame0;\n\tuniform sampler2D frame1;\n\n\tuniform float frameMix;\n\n\tvarying vec2 vUv;\n\n\t" + shaderlib_Chunks.pal + "\n\t" + shaderlib_Chunks.palettes + "\n\t" + shaderlib_Chunks.float_packing + "\n\t" + "//Depends on:\n//\tShaderLib.Chunks.float_packing\n//Requires defines:\n//\tOFFSET, INV_SCALE\n\nvec2 unpack1_2(vec4 pack){\n\tvec2 u = vec2(unpackFloat8bitRG(pack.rg), unpackFloat8bitRG(pack.ba));\n\tconst vec2 offset = vec2(OFFSET);\n\tu = (u * INV_SCALE) - offset;\n\treturn u;\n}\n\nvec2 read1_2(sampler2D tex, vec2 uv){\n\treturn unpack1_2(texture2D(tex, uv));\n}" + "\n\n\tvoid main(){\n\n\t\tfloat x = mix(\n\t\t\tREAD_VALUE_FN(frame0, vUv),\n\t\t\tREAD_VALUE_FN(frame1, vUv),\n\t\t\tframeMix\n\t\t);\n\n\t\tgl_FragColor = vec4(\n\t\t\tCOLOR_VALUE_FN(x),\n\t\t\t1.0\n\t\t);\n\t}\n\t";
objects_globe_GradientMap.defaultColorFn = "blueWhite(x)";
objects_globe_MapSequence.infoFilename = "sequence-info.json";
objects_globe_ParticleFlowMap.processLastFrameFragment = "#define DEBUG" + "\nuniform sampler2D lastFrame;\nuniform float dt_s;\nvarying vec2 vUv;\n\n#ifdef DEBUG\nuniform float halfLife;\n#endif\n\nconst float ln2 = 0.69314718056;\n\nvoid main(){\n\tvec4 l = texture2D(lastFrame, vUv);\n\n\t// ln2 / halfLife = lambda\n\n\tl = l - l * (ln2 / halfLife) * dt_s;\n\n\tgl_FragColor = l;\n}\n";
objects_globe__$ParticleFlowMap_ParticleRenderObject.vertexShaderStr = "#define DEBUG" + ("\nprecision highp float;\n\nattribute vec2 lookUpUV;\nuniform sampler2D positions;\n\nuniform float particleSize;\n\n" + shaderlib_Chunks.float_packing + "\n" + "//Depends on:\n//\tShaderLib.Chunks.float_packing\n\n//position\n#ifndef NO_PARTICLE_PACK\nvec4 packParticlePosition(in vec2 p){\n\tvec2 np = p*0.5 + 0.5;\n\treturn vec4(packFloat8bitRG(np.x), packFloat8bitRG(np.y));\n}\n#else\n#define packParticlePosition(p) vec4(p.xy, 0., 0.)\n#endif\n\n#ifndef NO_PARTICLE_PACK\nvec2 unpackParticlePosition(in vec4 pp){\n\tvec2 np = vec2(unpackFloat8bitRG(pp.xy), unpackFloat8bitRG(pp.zw));\n\treturn 2.0*np.xy - 1.0;\n}\n#else\n#define unpackParticlePosition(pp) pp.xy\n#endif\n" + "\n\nvoid main(){\n\tvec2 p = unpackParticlePosition(texture2D(positions, lookUpUV));\n\n\tgl_PointSize = particleSize;\n\n\tgl_Position = vec4(p*2.0 - 1.0, 0., 1.0);\n}\n");
objects_globe__$ParticleFlowMap_ParticleRenderObject.fragmentShaderStr = "#define DEBUG" + "\nprecision highp float;\n\nuniform float particleOpacity;\n\nvoid main(){\n\tgl_FragColor = vec4(1.0, 1.0, 1.0, particleOpacity);\n}\n";
objects_globe__$ParticleFlowMap_ParticleRenderObject.dummyCamera = new THREE.Camera();
objects_globe__$ParticleFlowMap_ParticleSimulation.initialConditionsFragment = "\nvarying vec2 vUv;\n\n" + shaderlib_Chunks.float_packing + "\n" + "//Depends on:\n//\tShaderLib.Chunks.float_packing\n\n//position\n#ifndef NO_PARTICLE_PACK\nvec4 packParticlePosition(in vec2 p){\n\tvec2 np = p*0.5 + 0.5;\n\treturn vec4(packFloat8bitRG(np.x), packFloat8bitRG(np.y));\n}\n#else\n#define packParticlePosition(p) vec4(p.xy, 0., 0.)\n#endif\n\n#ifndef NO_PARTICLE_PACK\nvec2 unpackParticlePosition(in vec4 pp){\n\tvec2 np = vec2(unpackFloat8bitRG(pp.xy), unpackFloat8bitRG(pp.zw));\n\treturn 2.0*np.xy - 1.0;\n}\n#else\n#define unpackParticlePosition(pp) pp.xy\n#endif\n" + "\n\nvoid main(){\n\tvec2 p = vUv;\n\tgl_FragColor = packParticlePosition(p);\n}\n";
objects_globe__$ParticleFlowMap_ParticleSimulation.positionStepFragment = "#define DEBUG" + ("\nvarying vec2 vUv;\n\nuniform sampler2D velocities0;\nuniform sampler2D velocities1;\nuniform float frameMix;\n\nuniform sampler2D particlePositions;\nuniform float dt_s;\nuniform float randomSeed;\n\n#ifdef DEBUG\nuniform float meanLifetime; //how long a particle is expected to last before reset (very loose approx)\nuniform float velocityScale;\n#endif\n\n" + shaderlib_Chunks.rand + "\n" + shaderlib_Chunks.float_packing + "\n" + "//Depends on:\n//\tShaderLib.Chunks.float_packing\n\n//position\n#ifndef NO_PARTICLE_PACK\nvec4 packParticlePosition(in vec2 p){\n\tvec2 np = p*0.5 + 0.5;\n\treturn vec4(packFloat8bitRG(np.x), packFloat8bitRG(np.y));\n}\n#else\n#define packParticlePosition(p) vec4(p.xy, 0., 0.)\n#endif\n\n#ifndef NO_PARTICLE_PACK\nvec2 unpackParticlePosition(in vec4 pp){\n\tvec2 np = vec2(unpackFloat8bitRG(pp.xy), unpackFloat8bitRG(pp.zw));\n\treturn 2.0*np.xy - 1.0;\n}\n#else\n#define unpackParticlePosition(pp) pp.xy\n#endif\n" + "\n" + "//Depends on:\n//\tShaderLib.Chunks.float_packing\n//Requires defines:\n//\tOFFSET, INV_SCALE\n\nvec2 unpack1_2(vec4 pack){\n\tvec2 u = vec2(unpackFloat8bitRG(pack.rg), unpackFloat8bitRG(pack.ba));\n\tconst vec2 offset = vec2(OFFSET);\n\tu = (u * INV_SCALE) - offset;\n\treturn u;\n}\n\nvec2 read1_2(sampler2D tex, vec2 uv){\n\treturn unpack1_2(texture2D(tex, uv));\n}" + "\n\nvec2 cartesianToAngularVelocity(in vec2 cv){\n\t//@! todo\n\treturn cv;\n}\n\nvoid main(){\n\tvec2 p = unpackParticlePosition(texture2D(particlePositions, vUv));\n\n\t//read velocity data\n\tvec2 v = mix(\n\t\tREAD_VALUE_FN(velocities0, p),\n\t\tREAD_VALUE_FN(velocities1, p),\n\t\tframeMix\n\t);\n\n\tv = cartesianToAngularVelocity(v) * velocityScale;\n\n\t//euler step\n\tp = p + v * dt_s;\n\n\t//reset position\n\t#ifndef DEBUG\n\tconst\n\t#endif\n\tfloat resetFactor = 1./meanLifetime; \n\n\tif((resetFactor * dt_s) > rand(p + vUv + randomSeed)){\n\t\tp = vUv;\n\t}\n\n\t//wrap positions\n\tp = mod(p, 1.0);\n\n\tgl_FragColor = packParticlePosition(p);\n}\n");
objects_migrationpath_MigrationPathMaterial.vertexShaderStr = "// varying vec2 vUv;\nvarying vec2 vNUv;\n\n\nvoid main() {\n\t// vUv = uv;\n\tvNUv = uv2;\n\t//ShaderChunk.default_vertex\n\t" + THREE.ShaderChunk.default_vertex + "\n}";
objects_migrationpath_MigrationPathMaterial.fragmentShaderStr = "uniform float progress;\nuniform float scale;\nuniform vec3 color;\nuniform float opacity;\n\n// varying vec2 vUv;\nvarying vec2 vNUv;\n\nvoid main() {\n\t\n\tconst float end = 0.985;\n\tconst float stepMax = 0.6;\n\n\tfloat a = smoothstep(0., stepMax, vNUv.y);\n\tfloat b = smoothstep(0., stepMax, 1. - vNUv.y);\n    float c = smoothstep(1.0, end, vNUv.x) * smoothstep(0., 1. - end, vNUv.x);//special, can ignore for now\n\n    float ab = a*b;\n\n\t// float u = vUv.x*scale - (progress*(scale) - 1.);\n\tfloat nu = vNUv.x*scale - (progress*(scale) - 1.);\n\n\tnu = clamp(nu, 0., 1.);\n\n    float f = smoothstep(1.0, end, nu);\n\n\tfloat i = clamp(ab * c * f * nu * nu, 0., 1.);\n\n\tvec3 col = color;\n\t//increase intensity toward the middle\n\tconst float darkenFactor = 0.5;\n\tcol *= nu * darkenFactor + (1. - darkenFactor);//darken towards end\n\n\tcol += vec3(1.0)*i * nu * nu * nu * ab * ab * ab * ab;\n\t\n\tgl_FragColor = vec4(col, opacity * i);\n\t//premultiply alpha\n\tgl_FragColor.rgb *= gl_FragColor.a;\n}";
shaderlib_Vertex.basic = "void main(){\n\t" + shaderlib_Chunks.basic_projection + "\n}";
shaderlib_Vertex.basic_uv = "varying vec2 vUv;\n\nvoid main(){\n\tvUv = uv;\n\t" + shaderlib_Chunks.basic_projection + "\n}";
tracks__$AnimalOdysseys_Data.greenTurtle_1 = [[128.223742109622492,-3.77551720427859117,0.],[128.942566361455704,-3.96764015118173585,0.],[130.203537122806409,-3.80865725068304517,0.],[130.894335365741512,-4.18509034537972457,0.],[131.840491974361299,-5.00179621141511088,0.],[133.373085421994602,-4.65140191090676,0.],[134.321730388360692,-4.35214488713413061,0.],[136.121615377530588,-4.84941237952222526,0.],[137.892864310688793,-5.7067545291306061,0.],[138.133890862377712,-6.95413833305809437,0.],[137.1670458351349,-8.39870484063325407,0.],[137.685337300817508,-8.68751709648837434,0.],[139.064923512616588,-8.73999348067523663,0.],[139.761772247802611,-8.52159789195962603,0.],[140.719948227595694,-9.21989486544554104,0.],[141.412490052927211,-9.61734775265083464,0.],[142.043479489131414,-9.59537273528240675,0.],[142.68388313242761,-9.5934179255737444,0.],[143.083063574397,-9.59972852654614,0.],[143.665696828373,-9.91203083736769486,0.],[144.077436461805405,-10.1197844674642408,0.],[144.140741195214,-10.8817074104718898,0.],[144.092734651857512,-11.1969773036913391,0.],[144.037909205015495,-11.5876002331662598,0.]];
tracks__$AnimalOdysseys_Data.shearwater_6 = [[152.184940059344797,-23.7797221152731417,0.],[152.79048146222911,-21.3251537000646,0.],[153.253587411839,-20.1162798391596311,0.],[153.413437443270396,-19.5663260349373296,0.],[152.552020625849906,-17.6295680834658697,0.],[154.017103430970593,-17.4820101502993204,0.],[156.002487332836893,-15.1840305180596,0.],[159.118178710197213,-16.1693975622160906,0.],[161.655719240839602,-14.1105309356667892,0.],[161.096799167363201,-11.1987349517236208,0.],[161.262921373864,-7.9378052833499062,0.],[160.3539582609,-6.45096554330528438,0.],[163.376290131206588,-4.74549737934446902,0.],[163.897104855531296,-2.47733367686286687,0.],[163.927810967225895,0.121939925470569796,0.],[162.278133306834093,3.50562595386516218,0.],[163.551540860581611,8.32369679733179879,0.],[156.713435339999904,6.05799239986102478,0.],[153.179421995300288,9.05124498391147903,0.],[150.792702923505487,12.2021437628735594,0.],[148.254057772837911,13.8822544452015801,0.],[145.930829868803613,14.5635220813568207,0.],[145.272797782494592,16.5993343486485792,0.],[143.577737935277,16.8090479605936,0.],[142.122372007503714,14.6270112174212699,0.],[144.62612901823681,12.1507490866745496,0.],[147.529979056109113,12.2572211214310407,0.],[146.755127781772302,10.5821789602452707,0.],[145.969337145050787,6.97351894050421528,0.],[144.3930840872776,6.17053041903239308,0.],[144.3865223137702,7.82426851463186,0.],[142.41837030444529,8.78319363741127823,0.],[141.061080134768304,9.59664897387753868,0.],[140.692064887579789,10.5139223481632804,0.],[142.500349442506604,10.9587145639307497,0.],[146.966110389732705,14.3379613209709493,0.]];
tracks__$AnimalOdysseys_Data.greenTurtle_4 = [[167.317514265076795,-16.5083917851314794,0.],[166.544657200169496,-16.0760562200316315,0.],[166.190449351759696,-15.4147014072360893,0.],[166.126823992140203,-14.8498339204080896,0.],[165.894407923475711,-14.1197769382726097,0.],[165.684475105760811,-13.1467915362352397,0.],[165.628221407271695,-12.5192412978801606,0.],[165.313891440739496,-11.9439717721211593,0.],[164.88772468014929,-11.3079651599581794,0.],[164.23576768195,-11.0708299915886101,0.],[162.74232940524891,-11.2994289608601797,0.],[160.80969319907129,-12.1615699695221195,0.],[159.180503347048301,-12.3077983823291195,0.],[156.753965412619,-12.3071768688812799,0.],[155.793110397752088,-11.8653551111677302,0.],[155.284766532800887,-11.3037062200279195,0.],[154.619183952712689,-11.1557077776411102,0.],[154.020192049970291,-10.9019017091898895,0.],[153.258084277826,-10.9923984949228402,0.],[152.844362589276898,-11.1401359445485,0.],[152.501231232555597,-11.3538346533607299,0.],[151.20435586508,-11.3159890356673305,0.],[150.496266780689297,-11.1249050605586106,0.],[149.749438369001808,-10.8979070577029908,0.],[148.854586819265307,-10.5668743264396792,0.],[147.883605311262897,-10.3695965595862098,0.],[147.051441047714405,-10.3743682502035899,0.],[145.990171551713,-10.4113301799376892,0.],[145.139211543321693,-10.75792175858283,0.],[144.513577443391711,-11.2705393496191508,0.],[144.041884084793793,-11.5952826655570096,0.]];
tracks__$AnimalOdysseys_Data.shearwater_7 = [[152.533119698307701,-23.7016139992184307,0.],[153.231085822343914,-19.7685606230404609,0.],[154.225214799202888,-19.713931912732761,0.],[155.838698063971,-14.2585971537047893,0.],[157.083387752118,-12.7300668932492904,0.],[158.164534257401613,-10.6666156767133895,0.],[159.907927672883204,-6.85965122554175188,0.],[159.688149150645103,-4.83856182080306141,0.],[155.769239679456604,-2.55198390006183518,0.],[151.861890176646398,0.921192561629854856,0.],[148.997447571406809,3.25418725643528584,0.],[146.214919866298402,5.410589546910475,0.],[146.429635757607798,6.95699843611677782,0.],[146.753245563629,8.93596532873342,0.],[146.626105086176892,10.3021727069055302,0.],[144.733745264466,9.58987678386832,0.],[143.990975704793414,10.8741120829925304,0.],[143.768405785953689,12.0033888029004103,0.],[144.134060936585712,13.3068275455170095,0.],[147.75456886183,13.11713343136182,0.],[150.051978417576095,12.6461237055719398,0.],[149.237956909647806,9.51626010447898,0.],[151.458351557901295,10.9743873837362393,0.],[151.296062265614211,12.6265551233027207,0.],[148.301790894355491,15.0436331673449697,0.],[145.461386884059806,15.6922206539183193,0.],[143.623773740852101,14.3401906423329208,0.]];
tracks__$AnimalOdysseys_Data.shearwater_9 = [[156.213907954399701,-24.9947121042938711,0.],[155.286136444241407,-23.129448496514339,0.],[159.593195621531294,-20.3110583123277593,0.],[163.001174669588693,-18.3176724512260698,0.],[163.169235106354392,-16.4745180174203796,0.],[166.814112318593686,-12.7161163076641,0.],[168.608599521762187,-11.0577312323810499,0.],[173.262708761261905,-10.2948018507042391,0.],[175.681108397581312,-5.99812546416070091,0.],[172.079587260142802,-2.70284181514249688,0.],[169.928729475597606,4.32146579282939136,0.],[166.887429441101602,3.57570860832802495,0.],[164.805550510610914,6.74606875152880114,0.],[164.189971170636511,9.0400519602006657,0.],[161.643860424078412,13.1614284673734598,0.],[160.284530394912309,17.5058357371653486,0.],[165.105081094675313,15.5674264331480394,0.],[161.062235147590712,11.5229759456097707,0.],[159.358894167692114,12.1096174867611399,0.],[156.492604005142709,14.0365374041787891,0.],[156.602108805811611,11.8698673696616304,0.],[154.606325316929087,9.75450735381166467,0.],[152.599155138320896,9.21673654863361591,0.],[152.62209075119469,11.4315800849220093,0.],[150.484714332370686,13.0005465087510093,0.],[148.849790792894,12.1946937180357704,0.],[147.690567364847794,9.92461177772744,0.]];
tracks__$AnimalOdysseys_Data.dwarfMinkeWhale_4 = [[149.1006568197202,-44.0626229380649406,0.],[147.540234437403086,-44.9099485239582918,0.],[143.4484221780057,-43.6613653108648165,0.],[142.764002454608686,-42.5818120936625633,0.],[142.867702122729895,-41.1770701417871479,0.],[144.156940667952398,-40.371677192337458,0.],[145.073449595028904,-39.6155394759578314,0.],[146.042402501438204,-40.1692910682426216,0.],[147.116135871493697,-40.09160791213273,0.],[147.899191495292,-39.3201064650034624,0.],[148.401920326506314,-38.7128257108372225,0.],[151.668820551042813,-37.4715499891738,0.],[152.562769753172489,-34.6748129563777923,0.],[153.535229132021612,-33.2570453328623472,0.],[154.473832823152,-32.0418550848851069,0.],[154.359413873550494,-29.6233462298880497,0.],[154.136555393682102,-27.1236046132650088,0.],[154.644187738086288,-25.2121174567925905,0.],[153.547964986405788,-23.2194159321172506,0.],[153.844352971656889,-21.1150348865909301,0.],[153.123655895435093,-20.0305964448388707,0.],[151.276922508355796,-19.4827449350710786,0.],[149.094539629184197,-18.8536139740509086,0.],[147.224664560509211,-17.2242335133939299,0.],[146.513088861403901,-16.1922194975778808,0.],[146.163193501296,-15.5503699150093198,0.],[145.748994993864699,-13.9952437663796694,0.]];
tracks__$AnimalOdysseys_Data.greenTurtle_7 = [[134.905614207180804,-6.15421490598358378,0.],[134.9780134630752,-6.48318190658260374,0.],[134.870015712373402,-6.65013131584300687,0.],[134.825530497500893,-6.90972651678547667,0.],[134.622886251740113,-7.20374013854703943,0.],[135.573852543582205,-8.00649660010925146,0.],[137.163734081756388,-8.39158166739783162,0.],[137.816439327852692,-8.67751600511133425,0.],[138.864642516415,-8.61880989362852,0.],[139.080101826902791,-8.49186384476414347,0.],[139.348965573943502,-8.40463090624124121,0.],[139.80585945382029,-8.3983328809783373,0.],[140.301748915332809,-8.74690905874350477,0.],[140.910196961597393,-9.45516487656118265,0.],[141.560768567402391,-9.54644021043896096,0.],[142.249000878397396,-9.6520259285226,0.],[142.848305307675503,-9.7833507964637576,0.],[143.259874944930687,-10.6265843350619,0.],[143.499919066622311,-10.8862477344185,0.],[143.876513974450887,-11.3450958044060908,0.],[144.034951416485598,-11.5898703782238908,0.]];
tracks__$AnimalOdysseys_Data.dwarfMinkeWhale_2 = [[144.693433048201399,-48.9898313613692693,0.],[143.982348811495086,-45.2951574617054078,0.],[143.50060501625731,-44.201032352634293,0.],[143.464167978844699,-42.4982505620253477,0.],[144.080723045919797,-40.7931851921368391,0.],[145.032094574792296,-39.3481588131217705,0.],[146.09020401051,-39.683619614156,0.],[149.40615130094011,-39.0592041403006789,0.],[150.4702065788303,-38.3999600745476073,0.],[151.258221557163893,-36.7958634454986893,0.],[152.108916185785205,-35.583162608328422,0.],[152.444613885873309,-34.1167693248737081,0.],[153.27632858066309,-32.6702554220914507,0.],[154.43102371075949,-30.2403301878652897,0.],[154.746608986611392,-27.9513300060522489,0.],[154.185710653387304,-26.7116841146047399,0.],[154.206453123873189,-26.1457257963793,0.],[153.986589342207395,-25.015712820875919,0.],[153.438008867082488,-23.9144808204616,0.],[152.760074325249604,-23.1329238945281297,0.],[151.756795361439,-22.2244241707250687,0.],[150.480825354296513,-21.6983281671820691,0.],[149.713054699997514,-20.0472511080622802,0.],[148.0207015153903,-18.7978694012652383,0.],[146.382563934990714,-16.5225796645215084,0.],[145.950931891999,-15.8720512216707608,0.],[145.840174538604487,-15.4125717046356492,0.],[145.734469427536595,-15.0323670740080306,0.],[145.593644745503894,-14.6501087171873206,0.],[145.533051757516887,-14.5728022589403103,0.],[145.31507619660411,-14.3296030728675898,0.],[145.178220149890109,-14.0433318660034505,0.]];
tracks__$AnimalOdysseys_Data.greenTurtle_5 = [[153.332828479830113,-25.8419952615682398,0.],[153.510972378282787,-25.4182326755621091,0.],[153.64557499900269,-24.9952287223609595,0.],[153.354809896863,-24.5896354576617817,0.],[152.515884853972409,-24.5312165146613701,0.],[152.207543564261698,-24.3941036566846812,0.],[152.027581132938707,-23.9975155476686,0.],[151.598461898656,-23.9224358775419397,0.],[151.398431200241305,-23.4594813373465101,0.],[151.217653106968214,-23.149505947232079,0.],[150.921716109283807,-22.7269236949544293,0.],[150.864520463258714,-22.3104866060674709,0.],[150.067315414416612,-21.9136249703284811,0.],[149.470746182232801,-21.2339831148140092,0.],[149.24546176960439,-20.1669748141081,0.],[148.711273157994412,-19.6770835418645795,0.],[148.21105338972211,-19.5407748725484,0.],[147.473774830745299,-19.16504221323137,0.],[146.944009758740208,-18.9758952750579617,0.],[146.784075757025704,-18.6276564566335,0.],[146.433550221022813,-18.03722740973312,0.],[146.116723463452,-16.8439313992044184,0.],[145.802663556259205,-16.4003874107893601,0.],[145.560947404747,-15.8878351960895507,0.],[145.790742412604914,-15.2232985579451405,0.],[145.643720020765613,-14.6123205959214602,0.],[145.092742474126709,-14.5336372012076,0.],[144.636662575934707,-14.1462387224547896,0.],[144.380815215764187,-13.9469690498846699,0.],[144.177203150094414,-14.0951608817013607,0.],[143.790433206342897,-13.9769170639733,0.],[143.75880991183331,-13.4549630951991599,0.],[143.830428387879891,-13.0653027193961204,0.],[144.058491758319605,-12.5673478594737098,0.],[144.096747049934,-12.3166254402968196,0.],[144.082916254132101,-11.8787566184179898,0.],[144.037083907068393,-11.6067870213475803,0.]];
tracks__$AnimalOdysseys_Data.shearwater_5 = [[153.048153381983894,-23.1436145403734592,0.],[153.988705362662614,-21.5032594295841193,0.],[153.990737976201814,-20.1358929246945308,0.],[154.018251457120186,-18.1775872458513597,0.],[155.460892382068494,-17.6292706921671289,0.],[156.915339364204186,-17.4620872627055483,0.],[159.361666660455398,-16.9690444450390316,0.],[160.831092903575609,-14.6819496811291508,0.],[161.691990521111393,-11.9453807033700699,0.],[162.093974752141293,-9.57736556879097378,0.],[162.321062013011101,-6.82916691017579858,0.],[163.392168295903701,-6.27853009443261456,0.],[162.206649948921296,-4.92795213352723493,0.],[161.156733368604392,-2.58787145206721103,0.],[158.477320179044199,-1.27335356694676705,0.],[156.191589394058809,0.391676980445335,0.],[152.877875383762188,2.48962110124184,0.],[150.127481532982387,3.83574930735643882,0.],[147.86681980088639,5.58686911897140437,0.],[147.434273549102699,6.7156692325722851,0.],[148.497384270423396,7.99841195884981,0.],[150.478728924097197,8.17727027125431,0.],[153.451737899496692,8.80451042363999292,0.],[154.527473214150291,10.9616236103971492,0.],[153.772274966740298,13.9062039320744706,0.],[147.734165706498601,13.8416854256732194,0.],[147.97011814569629,15.7955806140714294,0.],[146.986051221428198,16.0007219093604789,0.],[145.621648455510211,16.0769647840426586,0.],[144.293545312495894,17.2896624080957508,0.],[142.38537082239381,15.4602676986063194,0.],[142.129937422809604,10.9663992442775307,0.],[144.245575836471204,9.41783278514001,0.]];
tracks__$AnimalOdysseys_Data.greenTurtle_9 = [[153.003707808321906,-23.9136362561861802,0.],[152.402250333086613,-24.1028987880276091,0.],[151.820162663447405,-23.8028557394388898,0.],[151.592463550027389,-23.8349087660655883,0.],[151.454878749527609,-23.5890873706162409,0.],[151.247147252541708,-23.1371719401403304,0.],[151.160085150313108,-22.8155711775248804,0.],[151.139552852013793,-22.3232313253298607,0.],[150.91775188924791,-21.9484790898082487,0.],[150.256682716749509,-21.2360042104939097,0.],[149.803142731337289,-20.2567929653403205,0.],[149.357939507000708,-19.9500820052888201,0.],[148.667229120379886,-19.8295012336779592,0.],[147.787950543915287,-19.5178846186611388,0.],[147.267349501467493,-18.8976322555246412,0.],[147.003994295223293,-18.5631060428848116,0.],[147.181143988333,-17.8420545995349684,0.],[147.747645223679712,-17.6263950094069806,0.],[148.415872342856289,-17.2146823522321206,0.],[148.47875667657371,-16.4141448848086888,0.],[148.177181447299887,-15.4032025371313193,0.],[147.632099765869498,-14.5755083008690907,0.],[147.163940403745,-13.6509563967264693,0.],[146.391065759021586,-12.9250796769016301,0.],[145.622045870041887,-12.4338774191658796,0.],[144.962072166628303,-12.1405159310155408,0.],[144.624096682880491,-11.9769135021030095,0.],[144.306552940881289,-11.7662081025206895,0.],[144.046083087944794,-11.5878421515279904,0.]];
tracks__$AnimalOdysseys_Data.dwarfMinkeWhale_3 = [[144.584618383452607,-44.989845319785708,0.],[145.458220029618786,-44.232251306692,0.],[148.0772371824728,-44.6141137424894,0.],[149.680201417123897,-44.1793459938028832,0.],[149.852670729408686,-41.7610540439621332,0.],[150.353942631570504,-39.916697891428413,0.],[151.4673578597247,-38.8434464995944921,0.],[151.458678940670893,-37.0586022379606632,0.],[151.667272855359414,-35.155897119787177,0.],[153.828737484858607,-31.0493307904239302,0.],[155.181543656483313,-29.1091858656759506,0.],[154.828895007892,-27.1209701470176903,0.],[153.314332802520198,-24.3902139190123286,0.],[151.222846567909386,-22.4957332869328,0.],[150.391887931116287,-21.505791631439,0.],[150.057133409277299,-20.8895910749300917,0.],[148.614336379732208,-19.4717259152162505,0.],[148.637595384155702,-18.3674716719379205,0.],[147.725688008318087,-17.3802554368041804,0.],[146.817828963094,-16.8578065565356709,0.],[146.274730934788607,-16.4206049178414695,0.],[145.785773334474413,-14.8974576936677394,0.],[145.643358899167509,-14.1320360589971195,0.],[145.353822086006602,-13.5243394768786303,0.],[145.064211796227312,-13.0644944479398202,0.]];
tracks__$AnimalOdysseys_Data.greenTurtle_2 = [[129.732491822181,-11.8335010397101499,0.],[129.884860835748498,-11.4085245474314192,0.],[130.005535402465114,-11.1120157087975802,0.],[130.370470603357489,-10.9692195749173393,0.],[130.748055937028511,-11.1625710996891208,0.],[131.052261208178493,-11.2421170565550508,0.],[131.321745265828696,-11.1524678727782405,0.],[131.89881403870271,-11.0473122846588208,0.],[132.42042446972,-10.9211961592076499,0.],[132.691774100914,-10.8482364764485801,0.],[132.764999711151887,-11.1304346597800592,0.],[133.112427812526306,-11.2455561609685599,0.],[133.461184328738597,-11.3791954840368206,0.],[134.026817489807087,-11.5888369865359309,0.],[134.399588958143596,-11.8163360728026507,0.],[134.815702008007406,-11.8174206014031107,0.],[135.054323499786193,-11.9122937041545391,0.],[135.314176187846812,-11.9314556190757894,0.],[135.756580108660586,-11.7795600746010596,0.],[136.304039148790309,-11.3974209339540806,0.],[136.609215006744,-11.0875691394914497,0.],[136.931050925647412,-10.8011625465557,0.],[137.467398035492408,-10.9465206988694703,0.],[138.294091468423289,-11.0268932062344,0.],[139.319548816449696,-11.1036555300126594,0.],[139.9555912267314,-11.0685554804673796,0.],[140.837066944220794,-10.9142015818249192,0.],[141.352041981714507,-10.8772570909209101,0.],[141.732002521754509,-10.7268415628062499,0.],[142.09814452199,-10.4890490666315905,0.],[142.423882452670711,-10.4671850351503206,0.],[142.850356603253914,-10.6595977577431604,0.],[142.981370289291789,-10.8883899988774697,0.],[143.310062309193114,-11.3167930944134802,0.],[143.644827249353312,-11.7472096975582,0.],[143.983224516008192,-11.7346755320640295,0.],[144.03695765097649,-11.6180358978087597,0.]];
tracks__$AnimalOdysseys_Data.shearwater_1 = [[151.991930778699412,-23.7045787886273303,0.],[152.984995142745589,-23.2056606829618204,0.],[154.761750498977307,-23.2669972430602385,0.],[156.85922150137759,-23.459759038940561,0.],[157.979673692207314,-22.833292637875779,0.],[156.696818147866708,-22.5210778688432711,0.],[154.828092459679311,-22.4911443106052609,0.],[154.684207066308886,-21.9298842989992906,0.],[156.411276313099791,-20.6559107216352515,0.],[157.545082914235792,-17.297941723524,0.],[161.810782856433406,-15.4155714543840201,0.],[162.870796680548693,-13.8494406120701505,0.],[164.34795956268681,-12.0827792706095,0.],[166.704412120257,-10.1797270899844108,0.],[169.13831506936441,-5.58769562070636816,0.],[168.525860168894894,-4.16170044550163798,0.],[165.444484196992704,-3.84148482594556695,0.],[162.940311883741288,-1.92634027655542894,0.],[161.964662875581098,0.290885812412476519,0.],[161.385813047474301,2.30741606245598296,0.],[160.786893799529395,4.34241650482902308,0.],[159.542933682034601,5.7711344130788822,0.],[157.781050396525814,4.9375178646643274,0.],[155.373649910031,4.22912576579062183,0.],[154.905661304698214,6.3770405300491,0.],[156.107332986778289,7.46801896343412785,0.],[157.415597063882586,8.69047540154510401,0.],[157.841885179731293,9.85929918613528,0.],[159.682061419504208,9.09180873092832442,0.],[159.614549199070098,7.38854979183327121,0.]];
tracks__$AnimalOdysseys_Data.dwarfMinkeWhale_1 = [[129.954058454300394,-50.178839471513669,0.],[133.386588463148513,-48.0440194449141131,0.],[136.437594418411294,-46.74820707862159,0.],[139.230304690676491,-44.7307849505706301,0.],[139.946511560263787,-42.3143791080932132,0.],[142.08107725804021,-41.3395076487576318,0.],[143.844343983514108,-40.9163820314601594,0.],[144.929056622845309,-39.997078444601307,0.],[146.136154841223203,-40.0563347434709272,0.],[148.63477947794189,-38.904007266421452,0.],[150.813273079104789,-38.6997901766379471,0.],[150.86075255299869,-36.9087133250309,0.],[151.75062019370489,-35.7012456135060532,0.],[152.454443776277913,-34.4347733975106394,0.],[153.289027396264913,-33.3098545641378578,0.],[154.041660623798407,-30.8084061238573206,0.],[154.229555900871702,-28.6753564023615084,0.],[154.154379081159192,-27.2744167012731715,0.],[154.206453123873189,-26.1457257963793,0.],[154.376758846564911,-24.9895668781623712,0.],[153.940600075206504,-24.3212444212907712,0.],[153.647240839469788,-23.1365663565342103,0.],[153.279744143952,-21.7377477961118402,0.],[152.838518849203211,-20.1052255608143504,0.],[151.422725920482094,-20.0620098024542912,0.],[148.724878880322706,-18.4199566855236689,0.],[146.347250112129103,-16.7776358628279603,0.],[145.789246789427892,-15.8338914191160391,0.],[145.720869978530288,-15.4349631664700198,0.],[145.645763732409705,-15.04734519997,0.],[145.564466049891394,-14.6765338572029798,0.],[145.23867779270239,-14.3804236477191694,0.],[144.937581256576692,-14.0210595382155496,0.],[144.744543802082092,-13.3677172610858808,0.]];
tracks__$AnimalOdysseys_Data.dwarfMinkeWhale_5 = [[137.063121045002305,-50.727892292368189,0.],[139.914940114613898,-46.2736865895161387,0.],[140.728104198863292,-41.9752734527603124,0.],[141.99073678516379,-41.1547301994286272,0.],[143.480901709942486,-40.5814484462643819,0.],[145.195022124285487,-39.8618819145410583,0.],[147.282001655985795,-40.0678425956480666,0.],[148.51229699028741,-39.3896633202577533,0.],[151.279550720608512,-39.2129786379351231,0.],[151.907394369109312,-36.5583371809250366,0.],[151.956683376827897,-35.6467012806899,0.],[152.990441933527194,-33.5468250549216265,0.],[153.827625238616889,-31.5128506198423111,0.],[155.003639146131803,-28.1511630605339498,0.],[154.563108826595908,-26.1026741664556603,0.],[153.616882567476807,-24.0759723378971309,0.],[153.598115400118502,-22.1228729434940199,0.],[152.252838654915308,-20.5117237515067288,0.],[151.240615627239691,-19.7161384514078293,0.],[148.581445057114308,-18.86352537222675,0.],[147.867054679067394,-18.479517579249471,0.],[147.256755687924198,-17.8505329139781104,0.],[146.886156883619492,-17.3471950887424917,0.]];
tracks__$AnimalOdysseys_Data.greenTurtle_3 = [[147.255067067974,-7.10480376225081,0.],[147.817799362159406,-7.74883928447798542,0.],[148.137002102531113,-7.95286323513372295,0.],[148.511548129379889,-8.36218393503879298,0.],[148.595671017484591,-8.69676666910820373,0.],[149.541698234044105,-8.86348962455771883,0.],[149.627779435042612,-9.30019814169234671,0.],[149.972395594525096,-9.55186885162772548,0.],[150.184440624841386,-9.70257344031898583,0.],[150.397040744687,-9.87889957989035494,0.],[150.873444778046093,-10.1528805574893504,0.],[151.350500657407,-10.4264104416855297,0.],[151.514594355401186,-10.7324096558978201,0.],[150.942052864468,-10.9511852875688103,0.],[149.969320599526611,-10.9189465146851,0.],[149.544601136054695,-10.6685169666063402,0.],[148.726232151200605,-10.5533592557421496,0.],[148.063249037860913,-10.3567270926820107,0.],[147.504515302527807,-10.1574051876014906,0.],[147.369961928221898,-9.95206136179908718,0.],[146.806257753709,-9.38857209499674106,0.],[146.294956451045294,-8.95203271432815662,0.],[146.237535996510587,-8.56321894045275478,0.],[145.916588133387393,-8.61670365444870434,0.],[145.542249203575807,-8.8781513408543109,0.],[144.949727068939211,-9.55727854211316874,0.],[144.731088859485197,-10.3667353419538504,0.],[144.561552089417688,-11.1783131056392,0.],[144.415039939636,-11.4690879625492794,0.],[144.037807038496595,-11.6090120025424497,0.]];
tracks__$AnimalOdysseys_Data.shearwater_3 = [[151.806833787094206,-23.1823438598933116,0.],[155.421732732419,-21.9951091872397093,0.],[155.773934123835,-19.1325660992394688,0.],[156.485506069401509,-18.2495591367329801,0.],[159.0148781680561,-15.9132226848593898,0.],[160.693108680266903,-13.6782958759659099,0.],[161.971415883320503,-10.4200632290521,0.],[167.731299189619591,-10.5538870157889,0.],[168.330512626721486,-6.03556508660075508,0.],[167.824646380585506,-3.29060514366311496,0.],[161.698158384233608,-2.54260314612607718,0.],[159.655681868546395,-0.075758516936771228,0.],[159.394490856816191,3.08952788826764602,0.],[159.318607021335509,5.62565333110521859,0.],[159.003930028483893,8.954591274604,0.],[156.240508895669308,8.98834535602380313,0.],[153.939896908539112,7.45562829201583632,0.],[151.266485938705898,7.88570847208794,0.],[149.319507649811499,11.3665987830248199,0.],[147.998515016727197,12.8123080189090395,0.],[146.161616439028109,14.0873586884193696,0.],[143.42260549520941,14.1947875649229207,0.],[144.361113303007,16.2045515161829208,0.],[153.490678149765188,16.7611133574226585,0.],[152.417352978980688,12.4180247463035194,0.],[153.919479221061096,9.0573453100376522,0.],[157.581075695908,7.33973320983169941,0.]];
tracks__$AnimalOdysseys_Data.greenTurtle_8 = [[167.987702487874287,-23.5111963826415,0.],[166.917819859785709,-23.1723322242541201,0.],[165.515655720782092,-22.9381617630370087,0.],[164.47969072959441,-23.62567532404438,0.],[163.530254765826299,-24.2067359031270399,0.],[162.548616880306696,-24.2841682626670909,0.],[160.825803972925598,-25.0588040762311586,0.],[160.633516632447709,-25.4563729226342588,0.],[159.721746531718793,-25.9256173813511701,0.],[158.463849699376709,-25.8806653341912885,0.],[157.499836939497897,-26.004116930411449,0.],[157.413358603792688,-26.6431666912227598,0.],[156.664366785513607,-27.0518170161656712,0.],[155.926053110319287,-27.0454638626868196,0.],[155.219178359029911,-27.1472060629035283,0.],[154.80692827653769,-26.6652523047698082,0.],[154.251197381800608,-25.7605840271655104,0.],[153.903880920694689,-24.8241498193573804,0.],[153.549178960542292,-24.3665282419217384,0.],[153.19182737737,-24.0636633195798808,0.],[152.60922482539641,-23.5223711840138492,0.],[152.567446687523699,-23.1481243995973109,0.],[152.064950563859696,-22.7235063339439094,0.],[151.799282125932109,-22.4176905493714216,0.],[151.376374640794495,-22.0505286538735312,0.],[150.860914985487,-21.5491267772561699,0.],[150.382550011484511,-21.5103485365833897,0.],[150.136383960315897,-21.2273046971153683,0.],[149.955303528192701,-20.8058124742017299,0.],[149.791609471909709,-20.5012754884679396,0.],[149.427903434751613,-20.1965013566071505,0.],[149.172637763508106,-19.9867357728828701,0.],[148.800747716655906,-19.724125166587541,0.],[148.371761005727194,-19.36295769190275,0.],[147.792350467680507,-19.0452622917498289,0.],[147.494625612751292,-18.8185705566044,0.],[147.314653507633892,-18.3541108175326713,0.],[147.23905241950709,-17.8577689543104512,0.],[146.963892149793509,-17.5331084564172,0.],[146.876738255244703,-16.764700480637039,0.],[146.645229440622501,-16.3037737740295299,0.],[146.43053139454841,-15.8793002979999596,0.],[146.283902143627699,-15.2443145327349594,0.],[146.046435675252695,-14.6519857781352894,0.],[145.806343713502599,-13.9328122360320208,0.],[145.407633574854486,-13.22295492440408,0.],[144.755955292940087,-12.8411768828905899,0.],[144.648174088830586,-12.3967122424968803,0.],[144.417913854864906,-12.2138436275659092,0.],[144.191457709565213,-11.8763346071307598,0.],[144.039694110934391,-11.5907326420712593,0.]];
tracks__$AnimalOdysseys_Data.shearwater_8 = [[153.046776071766,-22.7832780372016686,0.],[155.995803408010488,-20.0011860585151098,0.],[155.034398652703089,-19.3565487105081,0.],[154.770010372274498,-13.0923553786005602,0.],[155.854390155847796,-11.3217754850990495,0.],[158.024837150242291,-6.59516006705031277,0.],[156.980427734322291,-3.31149071031548381,0.],[157.063881889449902,0.884410051727548385,0.],[157.379881944354111,4.51691576401567474,0.],[159.031073687560706,6.74433012982478886,0.],[157.646241491383307,8.23451251973949105,0.],[154.791972340586511,6.67867773671917586,0.],[152.882165141485899,6.15403818929916469,0.],[153.203645340299403,8.17508063557599,0.],[153.093479377572407,8.17189427186502293,0.],[151.009470674095297,10.5915777311313395,0.],[148.104108282975602,11.0543175538409493,0.],[147.071274922801194,13.4096030081534892,0.],[151.500875901168797,15.3931013431544201,0.],[151.423187612605091,13.1069629512891499,0.],[153.163246122443,12.6492469080117296,0.],[153.608356369692586,10.4567611617560292,0.]];
tracks__$AnimalOdysseys_Data.greenTurtle_6 = [[168.780715118051404,-16.6309536205564683,0.],[168.838947152460605,-17.2090013517502,0.],[168.34166429653709,-17.3150076429304391,0.],[167.555081985346902,-17.222707188336539,0.],[166.940544438201,-16.81018107661275,0.],[166.598827096402403,-16.3040997767330182,0.],[166.337840278,-15.8893851652414693,0.],[166.093135359253608,-15.2852160728512594,0.],[165.555646447534087,-14.7100770265571494,0.],[163.755934230577196,-13.6081072570534403,0.],[161.969095521506603,-13.4560012994605493,0.],[160.732851537184899,-12.7867257093252302,0.],[160.037990514619,-12.5747660098315102,0.],[158.884351928887696,-12.5062591698293,0.],[156.729327011242589,-12.4196656293857206,0.],[155.734145311776302,-12.7355755630977701,0.],[154.674784941134703,-14.2300972134543695,0.],[153.701442520930414,-16.2584420538098513,0.],[151.758736535964,-16.8415672379713897,0.],[150.264511365194807,-16.5405607310781591,0.],[149.819240667070886,-15.1676214633818507,0.],[149.444511014340094,-14.1320705194649,0.],[149.011303782038794,-13.0328390802028107,0.],[148.604694232852296,-11.81626940908418,0.],[148.079702593407205,-11.2916790157271496,0.],[147.209962030686796,-10.8761309000237301,0.],[146.276459161528408,-10.5575465401309305,0.],[145.55272829197591,-10.6795159529483605,0.],[144.868803380563605,-11.12795436664085,0.],[144.286499272805401,-11.1490956596041393,0.],[144.11612170806319,-11.3166088504003195,0.],[144.077967541616687,-11.4607109925800899,0.],[144.037541439228306,-11.5903748171798302,0.]];
tracks__$AnimalOdysseys_Data.shearwater_4 = [[153.216808881625695,-23.1583706640607296,0.],[154.469929768897799,-21.038799350822309,0.],[154.390510828077396,-18.6748864418291483,0.],[155.290948044506592,-17.717554042745121,0.],[158.862602831754288,-17.3801989311153484,0.],[160.878417464400712,-14.6914722609902295,0.],[162.654965151198411,-8.10953449410549609,0.],[164.983735407959301,-6.22789024816654102,0.],[164.801975306398703,-3.40570710612507588,0.],[164.4950220152962,-1.28653879989626,0.],[159.531561538982203,-1.49103998830141204,0.],[155.96328998051041,1.42428003074259402,0.],[155.907744537700296,4.66452707814630685,0.],[153.067437919073313,5.31127101840588711,0.],[150.198106088865813,6.17416588798147092,0.],[146.867487088729291,6.76395315541363917,0.],[146.483492254483508,9.02091575153401593,0.],[148.019230719420904,12.1983308368771102,0.],[149.962534768094713,12.8682770087381,0.],[153.072886832783098,13.0529227241277308,0.],[152.652847664419312,16.1362418411806701,0.],[146.838226416221801,14.7327981316282592,0.],[144.213373657757813,14.4205109706700902,0.],[142.517261126516786,13.1521813398876493,0.],[142.650873592767198,11.5051584827607893,0.],[142.128642513441,8.74745291638898692,0.]];
tracks__$AnimalOdysseys_Data.shearwater_2 = [[151.785847972866804,-23.1751878427969515,0.],[153.275736177333499,-22.1192703198504397,0.],[153.331377561708393,-24.0413135154234503,0.],[155.393929834463307,-24.8259472347392212,0.],[154.623625949266795,-20.8970234440328717,0.],[154.695828924377309,-18.7695063465697,0.],[156.173172897967504,-17.313494887540319,0.],[157.505427016274894,-15.3111974537870097,0.],[158.720196331650612,-11.5224491007338798,0.],[159.367093712968909,-7.32108457445501859,0.],[159.967565266593908,-5.1210745741920638,0.],[160.156009951890894,-2.39668911073216417,0.],[157.661250312904514,0.991113819483705916,0.],[153.256966559963786,2.55307258435276196,0.],[150.441613398992587,4.86617486816281541,0.],[149.783118959964099,7.08073380044393286,0.],[148.935461500194407,9.82604341594603703,0.],[149.623779524023291,12.7851919149076494,0.],[151.244408422624588,13.9858342702637106,0.],[146.493370093092693,16.0248260833139291,0.],[144.833387004584296,15.0050265065096,0.],[143.816955488776301,13.8999180637604791,0.],[143.668870928684896,10.8292318173025297,0.],[144.667482998745186,10.3995143031235298,0.],[145.627829909266609,10.8790275278404298,0.],[147.485521253154701,11.6245911414154293,0.],[150.025305709671812,11.2866364465032607,0.],[152.903090950331688,10.1551931793414205,0.],[154.843010540774912,7.3086663868484969,0.],[155.808423188345813,6.19956497111531668,0.]];
tracks__$AnimalOdysseys_Data.new_Caledonia = [165.312698404578811,-21.2579264537037709,0.];
tracks__$AnimalOdysseys_Data.coral_Sea = [155.867221480281188,-19.4933056465657515,0.];
tracks__$AnimalOdysseys_Data.papua_New_Guinea = [143.942484935833193,-6.63718623318746292,0.];
tracks__$AnimalOdysseys_Data.port_Douglas = [145.465572823295503,-16.485183086671519,0.];
tracks__$AnimalOdysseys_Data.mariana_Islands = [145.780730582127489,15.1928057510402,0.];
tracks__$AnimalOdysseys_Data.microneasia = [158.217009909286389,6.8580318136867584,0.];
tracks__$AnimalOdysseys_Data.raine_Island = [144.035137747527,-11.5895198867841405,0.];
tracks__$AnimalOdysseys_Data.lizard_Island = [145.45854052551681,-14.6731282003997698,0.];
tracks__$AnimalOdysseys_Data.heron_Island = [151.912985808691587,-23.4415845697549905,0.];
tracks__$AnimalOdysseys_Data.guam = [144.794652404620393,13.4053498753203,0.];
tracks__$AnimalOdysseys_Data.followDwarfMinke = [[139.710346636023303,-57.3240088879179268,0.00617284144180868868],[147.540954970182,-47.164753880412313,0.00617284144180868868],[151.109455137320111,-36.4360587670893,0.00617284144180868868],[150.58900641868911,-22.5468854818106692,0.00617284144180868868],[144.649728549168913,-12.5343559477512496,0.00617284144180868868]];
tracks__$AnimalOdysseys_Data.followShearwater = [[151.912998063153793,-23.4415408505332,0.],[156.160952155383086,-13.8330153947565204,0.],[157.550740782192804,-1.2412470245263949,0.],[154.365098730232,6.45845855942478941,0.],[150.656754933614707,9.82477492137037345,0.],[147.181318259546,11.8358382613520394,0.],[145.527355801098309,12.4902537647048106,0.]];
tracks__$AnimalOdysseys_Data.allPoints = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	{
		var value = tracks__$AnimalOdysseys_Data.new_Caledonia;
		if(__map_reserved.new_Caledonia != null) _g.setReserved("new_Caledonia",value); else _g.h["new_Caledonia"] = value;
	}
	{
		var value1 = tracks__$AnimalOdysseys_Data.coral_Sea;
		if(__map_reserved.coral_Sea != null) _g.setReserved("coral_Sea",value1); else _g.h["coral_Sea"] = value1;
	}
	{
		var value2 = tracks__$AnimalOdysseys_Data.papua_New_Guinea;
		if(__map_reserved.papua_New_Guinea != null) _g.setReserved("papua_New_Guinea",value2); else _g.h["papua_New_Guinea"] = value2;
	}
	{
		var value3 = tracks__$AnimalOdysseys_Data.port_Douglas;
		if(__map_reserved.port_Douglas != null) _g.setReserved("port_Douglas",value3); else _g.h["port_Douglas"] = value3;
	}
	{
		var value4 = tracks__$AnimalOdysseys_Data.mariana_Islands;
		if(__map_reserved.mariana_Islands != null) _g.setReserved("mariana_Islands",value4); else _g.h["mariana_Islands"] = value4;
	}
	{
		var value5 = tracks__$AnimalOdysseys_Data.microneasia;
		if(__map_reserved.microneasia != null) _g.setReserved("microneasia",value5); else _g.h["microneasia"] = value5;
	}
	{
		var value6 = tracks__$AnimalOdysseys_Data.raine_Island;
		if(__map_reserved.raine_Island != null) _g.setReserved("raine_Island",value6); else _g.h["raine_Island"] = value6;
	}
	{
		var value7 = tracks__$AnimalOdysseys_Data.lizard_Island;
		if(__map_reserved.lizard_Island != null) _g.setReserved("lizard_Island",value7); else _g.h["lizard_Island"] = value7;
	}
	{
		var value8 = tracks__$AnimalOdysseys_Data.heron_Island;
		if(__map_reserved.heron_Island != null) _g.setReserved("heron_Island",value8); else _g.h["heron_Island"] = value8;
	}
	{
		var value9 = tracks__$AnimalOdysseys_Data.guam;
		if(__map_reserved.guam != null) _g.setReserved("guam",value9); else _g.h["guam"] = value9;
	}
	$r = _g;
	return $r;
}(this));
tracks__$AnimalOdysseys_Data.allLineStrings = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	{
		var value = tracks__$AnimalOdysseys_Data.greenTurtle_1;
		if(__map_reserved.greenTurtle_1 != null) _g.setReserved("greenTurtle_1",value); else _g.h["greenTurtle_1"] = value;
	}
	{
		var value1 = tracks__$AnimalOdysseys_Data.shearwater_6;
		if(__map_reserved.shearwater_6 != null) _g.setReserved("shearwater_6",value1); else _g.h["shearwater_6"] = value1;
	}
	{
		var value2 = tracks__$AnimalOdysseys_Data.greenTurtle_4;
		if(__map_reserved.greenTurtle_4 != null) _g.setReserved("greenTurtle_4",value2); else _g.h["greenTurtle_4"] = value2;
	}
	{
		var value3 = tracks__$AnimalOdysseys_Data.shearwater_7;
		if(__map_reserved.shearwater_7 != null) _g.setReserved("shearwater_7",value3); else _g.h["shearwater_7"] = value3;
	}
	{
		var value4 = tracks__$AnimalOdysseys_Data.shearwater_9;
		if(__map_reserved.shearwater_9 != null) _g.setReserved("shearwater_9",value4); else _g.h["shearwater_9"] = value4;
	}
	{
		var value5 = tracks__$AnimalOdysseys_Data.dwarfMinkeWhale_4;
		if(__map_reserved.dwarfMinkeWhale_4 != null) _g.setReserved("dwarfMinkeWhale_4",value5); else _g.h["dwarfMinkeWhale_4"] = value5;
	}
	{
		var value6 = tracks__$AnimalOdysseys_Data.greenTurtle_7;
		if(__map_reserved.greenTurtle_7 != null) _g.setReserved("greenTurtle_7",value6); else _g.h["greenTurtle_7"] = value6;
	}
	{
		var value7 = tracks__$AnimalOdysseys_Data.dwarfMinkeWhale_2;
		if(__map_reserved.dwarfMinkeWhale_2 != null) _g.setReserved("dwarfMinkeWhale_2",value7); else _g.h["dwarfMinkeWhale_2"] = value7;
	}
	{
		var value8 = tracks__$AnimalOdysseys_Data.greenTurtle_5;
		if(__map_reserved.greenTurtle_5 != null) _g.setReserved("greenTurtle_5",value8); else _g.h["greenTurtle_5"] = value8;
	}
	{
		var value9 = tracks__$AnimalOdysseys_Data.shearwater_5;
		if(__map_reserved.shearwater_5 != null) _g.setReserved("shearwater_5",value9); else _g.h["shearwater_5"] = value9;
	}
	{
		var value10 = tracks__$AnimalOdysseys_Data.greenTurtle_9;
		if(__map_reserved.greenTurtle_9 != null) _g.setReserved("greenTurtle_9",value10); else _g.h["greenTurtle_9"] = value10;
	}
	{
		var value11 = tracks__$AnimalOdysseys_Data.dwarfMinkeWhale_3;
		if(__map_reserved.dwarfMinkeWhale_3 != null) _g.setReserved("dwarfMinkeWhale_3",value11); else _g.h["dwarfMinkeWhale_3"] = value11;
	}
	{
		var value12 = tracks__$AnimalOdysseys_Data.greenTurtle_2;
		if(__map_reserved.greenTurtle_2 != null) _g.setReserved("greenTurtle_2",value12); else _g.h["greenTurtle_2"] = value12;
	}
	{
		var value13 = tracks__$AnimalOdysseys_Data.shearwater_1;
		if(__map_reserved.shearwater_1 != null) _g.setReserved("shearwater_1",value13); else _g.h["shearwater_1"] = value13;
	}
	{
		var value14 = tracks__$AnimalOdysseys_Data.dwarfMinkeWhale_1;
		if(__map_reserved.dwarfMinkeWhale_1 != null) _g.setReserved("dwarfMinkeWhale_1",value14); else _g.h["dwarfMinkeWhale_1"] = value14;
	}
	{
		var value15 = tracks__$AnimalOdysseys_Data.dwarfMinkeWhale_5;
		if(__map_reserved.dwarfMinkeWhale_5 != null) _g.setReserved("dwarfMinkeWhale_5",value15); else _g.h["dwarfMinkeWhale_5"] = value15;
	}
	{
		var value16 = tracks__$AnimalOdysseys_Data.greenTurtle_3;
		if(__map_reserved.greenTurtle_3 != null) _g.setReserved("greenTurtle_3",value16); else _g.h["greenTurtle_3"] = value16;
	}
	{
		var value17 = tracks__$AnimalOdysseys_Data.shearwater_3;
		if(__map_reserved.shearwater_3 != null) _g.setReserved("shearwater_3",value17); else _g.h["shearwater_3"] = value17;
	}
	{
		var value18 = tracks__$AnimalOdysseys_Data.greenTurtle_8;
		if(__map_reserved.greenTurtle_8 != null) _g.setReserved("greenTurtle_8",value18); else _g.h["greenTurtle_8"] = value18;
	}
	{
		var value19 = tracks__$AnimalOdysseys_Data.shearwater_8;
		if(__map_reserved.shearwater_8 != null) _g.setReserved("shearwater_8",value19); else _g.h["shearwater_8"] = value19;
	}
	{
		var value20 = tracks__$AnimalOdysseys_Data.greenTurtle_6;
		if(__map_reserved.greenTurtle_6 != null) _g.setReserved("greenTurtle_6",value20); else _g.h["greenTurtle_6"] = value20;
	}
	{
		var value21 = tracks__$AnimalOdysseys_Data.shearwater_4;
		if(__map_reserved.shearwater_4 != null) _g.setReserved("shearwater_4",value21); else _g.h["shearwater_4"] = value21;
	}
	{
		var value22 = tracks__$AnimalOdysseys_Data.shearwater_2;
		if(__map_reserved.shearwater_2 != null) _g.setReserved("shearwater_2",value22); else _g.h["shearwater_2"] = value22;
	}
	{
		var value23 = tracks__$AnimalOdysseys_Data.followDwarfMinke;
		if(__map_reserved.followDwarfMinke != null) _g.setReserved("followDwarfMinke",value23); else _g.h["followDwarfMinke"] = value23;
	}
	{
		var value24 = tracks__$AnimalOdysseys_Data.followShearwater;
		if(__map_reserved.followShearwater != null) _g.setReserved("followShearwater",value24); else _g.h["followShearwater"] = value24;
	}
	$r = _g;
	return $r;
}(this));
tracks_EyeOnTheReef.sightingLimit = 40;
tracks_EyeOnTheReef.minimumSeperation_rad = THREE.Math.degToRad(0.7);
tracks_EyeOnTheReef.imageRequired = false;
tracks_EyeOnTheReef.eye_on_the_reef_css = ".sighting-details { position: absolute; width: 300px; overflow: hidden; background: rgba(0, 0, 0, 0.85); color: white; font-family: colaboratelightregular, helvetica, sans-serif; font-size: 18px; border-radius: 3px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5); }\n.sighting-details .box-overlay { position: absolute; background: transparent; left: 0; right: 0; top: 0; bottom: 0; border-radius: 3px; box-shadow: inset 0px -1px 0px 1px rgba(255, 255, 255, 0.2); }\n.sighting-details > div { padding-top: 14px; padding-bottom: 14px; padding-left: 20px; padding-right: 20px; }\n.sighting-details .heading { padding: 16.8px 20px; text-align: center; font-weight: bold; font-family: bebas_neuebook; font-size: 25px; }\n.sighting-details .sub-heading { color: rgba(255, 255, 255, 0.6); }\n.sighting-details .sub-heading .left, .sighting-details .sub-heading .right { display: inline-block; position: relative; }\n.sighting-details .sub-heading .left { float: left; margin-right: 10px; }\n.sighting-details .sub-heading .right { margin-left: 10px; float: right; }\n.sighting-details .scientific-name { font-style: italic; }\n.sighting-details .media { padding: 0; max-height: 200px; overflow: hidden; }\n.sighting-details .media img { display: block; width: 100%; }\n.sighting-details .notes .note-heading { display: none; font-weight: normal; font-family: colaborate-regularregular; margin-right: 10px; color: rgba(255, 255, 255, 0.6); }\n.sighting-details .notes .note-content { display: inline-block; color: rgba(255, 255, 255, 0.4); overflow: hidden; text-overflow: ellipsis; }\n";
tracks__$EyeOnTheReef_SightingMarker.cleanRegex = new EReg("[^\\w]","gm");
tracks__$EyeOnTheReef_SightingMarker.supportedSpecies = ["green turtle","manta ray","whale shark"];
tracks_Maritime.channel = new gis__$GeoCoord_CGeoCoord(-0.1275,50.4,0);
tracks_Maritime.meshBaseScale = 0.0004;
tracks_WeatherGlobe.text = ["The Great Barrier Reef is subjected to weather patterns that are truly global. Weather events that occur on the other side of the planet can have lasting effects on the reef itself.","Water currents advance in from the east across the Coral Sea before splitting at the continental shelf, diverting north and south. The vast ocean shelf shelters the Great Barrier Reef from the strongest currents whipping in from the mighty Pacific Ocean.","The sea temperature can differ hugely across The Great Barrier Reef's 2,300 kilometre length; on some days the northern tip can be up to 2°C hotter than the south.","The world's oceans are warming, and this could spell trouble for the reef. Here, the red and yellow patches show areas in our oceans warmer than their 30 year average.","Coral reefs are very sensitive to ocean temperature. Prolonged exposure to increased temperatures causes major bleaching events - destroying entire reefs. After major bleaching events, coral reefs can take decades to fully recover.","Flying in from the Coral Sea are the ocean winds. Normally benign, these winds can grow exponentially, forming huge cyclones that batter the coast, damaging corals, mangrove forests and coastal settlements in the process. With a warming climate, scientists predict we'll see more major weather events such as Cyclone Yasi."];
tracks__$WeatherGlobe_Data.gBR_North = [144.077000487813905,-10.5255347654294606,0.];
tracks__$WeatherGlobe_Data.gBR_South = [154.101887517731711,-23.5872117099607692,0.];
tracks__$WeatherGlobe_Data.greatCircle = [[151.6053145721352,-17.7305353217979302,0.],[252.617056878534413,-5.12634731946701905,0.],[359.765075510276517,17.3079276441937893,0.]];
tracks__$WeatherGlobe_Data.allPoints = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	{
		var value = tracks__$WeatherGlobe_Data.gBR_North;
		if(__map_reserved.gBR_North != null) _g.setReserved("gBR_North",value); else _g.h["gBR_North"] = value;
	}
	{
		var value1 = tracks__$WeatherGlobe_Data.gBR_South;
		if(__map_reserved.gBR_South != null) _g.setReserved("gBR_South",value1); else _g.h["gBR_South"] = value1;
	}
	$r = _g;
	return $r;
}(this));
tracks__$WeatherGlobe_Data.allLineStrings = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	{
		var value = tracks__$WeatherGlobe_Data.greatCircle;
		if(__map_reserved.greatCircle != null) _g.setReserved("greatCircle",value); else _g.h["greatCircle"] = value;
	}
	$r = _g;
	return $r;
}(this));
Main.main();
})(typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
