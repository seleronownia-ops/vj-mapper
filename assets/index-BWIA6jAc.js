(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}})();let Ut=null,Me=null;async function pp(e,t={}){const{width:r=1280,height:i=720,facing:n="environment"}=t;Ut&&cp();const a={video:{width:{ideal:r},height:{ideal:i},facingMode:{ideal:n}},audio:!1};try{Ut=await navigator.mediaDevices.getUserMedia(a)}catch(s){throw new Error(`Camera access denied: ${s.message}`)}return Me=document.createElement("video"),Me.srcObject=Ut,Me.playsInline=!0,Me.muted=!0,await Me.play(),e.width=Me.videoWidth||r,e.height=Me.videoHeight||i,Me}function cp(){Ut&&(Ut.getTracks().forEach(e=>e.stop()),Ut=null),Me&&(Me.srcObject=null,Me=null)}function m0(e,t={}){if(!Me||Me.readyState<2)return!1;const{rotate180:r=!1}=t,i=e.getContext("2d");return r?(i.save(),i.translate(e.width,e.height),i.rotate(Math.PI),i.drawImage(Me,0,0,e.width,e.height),i.restore()):i.drawImage(Me,0,0,e.width,e.height),!0}async function g0(e,t){return new Promise((r,i)=>{const n=new Image;n.onload=()=>{t.width=n.naturalWidth,t.height=n.naturalHeight,t.getContext("2d").drawImage(n,0,0),URL.revokeObjectURL(n.src),r(n)},n.onerror=()=>i(new Error("Failed to load image")),n.src=URL.createObjectURL(e)})}function y0(e){return e.getContext("2d").getImageData(0,0,e.width,e.height)}function hp(){return Ut!==null&&Me!==null}var ia=Object.defineProperty,_0=Object.getOwnPropertyDescriptor,w0=Object.getOwnPropertyNames,b0=Object.prototype.hasOwnProperty,v0=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),U=(e,t)=>()=>(e&&(t=e(e=0)),t),tr=(e,t)=>{for(var r in t)ia(e,r,{get:t[r],enumerable:!0})},$0=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of w0(t))!b0.call(e,n)&&n!==r&&ia(e,n,{get:()=>t[n],enumerable:!(i=_0(t,n))||i.enumerable});return e},xr=e=>$0(ia({},"__esModule",{value:!0}),e),sr,bt,Yt,ko,fp,mp=U(()=>{sr=new Map,bt=[],Yt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=sr.get(e);if(i===void 0)sr.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let n=bt.indexOf(e);n!==-1&&bt.splice(n,1);for(let a=0;a<bt.length;a++)if(sr.get(bt[a]).priority<=r){bt.splice(a,0,e);return}bt.push(e)}return}throw new TypeError("not a valid backend")},ko=async e=>{let t=sr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},fp=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),i=r.length===0?bt:r,n,a=[],s=new Set;for(let l of i){let p=await ko(l);typeof p=="string"?a.push({name:l,err:p}):(n||(n=p),n===p&&s.add(l))}if(!n)throw new Error(`no available backend found. ERR: ${a.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:p}of a)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${p}`);let u=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[n,new Proxy(e,{get:(l,p)=>p==="executionProviders"?u:Reflect.get(l,p)})]}}),x0=U(()=>{mp()}),gp,T0=U(()=>{gp="1.24.2"}),Li,Ce,yp=U(()=>{T0(),Li="warning",Ce={wasm:{},webgl:{},webgpu:{},versions:{common:gp},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Li=e}},get logLevel(){return Li}},Object.defineProperty(Ce,"logLevel",{enumerable:!0})}),ge,S0=U(()=>{yp(),ge=Ce}),_p,wp,E0=U(()=>{_p=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let n,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[3]):(n=e.dims[3],a=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",u=t?.norm,l,p;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?p=[0,0,0,0]:typeof u.bias=="number"?p=[u.bias,u.bias,u.bias,u.bias]:(p=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(p[3]=u.bias[3]));let c=a*n,f=0,g=c,y=c*2,_=-1;s==="RGBA"?(f=0,g=c,y=c*2,_=c*3):s==="RGB"?(f=0,g=c,y=c*2):s==="RBG"&&(f=0,y=c,g=c*2);for(let b=0;b<a;b++)for(let T=0;T<n;T++){let $=(e.data[f++]-p[0])*l[0],w=(e.data[g++]-p[1])*l[1],k=(e.data[y++]-p[2])*l[2],S=_===-1?255:(e.data[_++]-p[3])*l[3];i.fillStyle="rgba("+$+","+w+","+k+","+S+")",i.fillRect(T,b,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},wp=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let n,a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[1],s=e.dims[3]):(n=e.dims[3],a=e.dims[2],s=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,p,c;l===void 0||l.mean===void 0?p=[255,255,255,255]:typeof l.mean=="number"?p=[l.mean,l.mean,l.mean,l.mean]:(p=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(p[3]=l.mean[3])),l===void 0||l.bias===void 0?c=[0,0,0,0]:typeof l.bias=="number"?c=[l.bias,l.bias,l.bias,l.bias]:(c=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(c[3]=l.bias[3]));let f=a*n;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let g=4,y=0,_=1,b=2,T=3,$=0,w=f,k=f*2,S=-1;u==="RGBA"?($=0,w=f,k=f*2,S=f*3):u==="RGB"?($=0,w=f,k=f*2):u==="RBG"&&($=0,k=f,w=f*2),i=r.createImageData(n,a);for(let I=0;I<a*n;y+=g,_+=g,b+=g,T+=g,I++)i.data[y]=(e.data[$++]-c[0])*p[0],i.data[_]=(e.data[w++]-c[1])*p[1],i.data[b]=(e.data[k++]-c[2])*p[2],i.data[T]=S===-1?255:(e.data[S++]-c[3])*p[3]}else throw new Error("Can not access image data");return i}}),Pr,bp,vp,$p,xp,Tp,k0=U(()=>{na(),Pr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,n=t.norm??{mean:255,bias:0},a,s;typeof n.mean=="number"?a=[n.mean,n.mean,n.mean,n.mean]:a=[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],typeof n.bias=="number"?s=[n.bias,n.bias,n.bias,n.bias]:s=[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=r*i,c=l==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),f=4,g=0,y=1,_=2,b=3,T=0,$=p,w=p*2,k=-1;u==="RGB"&&(f=3,g=0,y=1,_=2,b=-1),l==="RGBA"?k=p*3:l==="RBG"?(T=0,w=p,$=p*2):l==="BGR"&&(w=0,$=p,T=p*2);for(let S=0;S<p;S++,g+=f,_+=f,y+=f,b+=f)c[T++]=(e[g]+s[0])/a[0],c[$++]=(e[y]+s[1])/a[1],c[w++]=(e[_]+s[2])/a[2],k!==-1&&b!==-1&&(c[k++]=(e[b]+s[3])/a[3]);return l==="RGBA"?new Ue("float32",c,[1,4,r,i]):new Ue("float32",c,[1,3,r,i])},bp=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,n=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,u=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(r){let c=l();c.width=e.width,c.height=e.height;let f=p(c);if(f!=null){let g=e.height,y=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(g=t.resizedHeight,y=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=g,u.width=y}else u.tensorFormat="RGBA",u.height=g,u.width=y;f.drawImage(e,0,0),s=f.getImageData(0,0,y,g).data}else throw new Error("Can not access image data")}else if(i){let c,f;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,f=t.resizedWidth):(c=e.height,f=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=c,u.width=f,t!==void 0){let g=l();g.width=f,g.height=c;let y=p(g);if(y!=null)y.putImageData(e,0,0),s=y.getImageData(0,0,f,c).data;else throw new Error("Can not access image data")}else s=e.data}else if(n){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=l();c.width=e.width,c.height=e.height;let f=p(c);if(f!=null){let g=e.height,y=e.width;return f.drawImage(e,0,0,y,g),s=f.getImageData(0,0,y,g).data,u.height=g,u.width=y,Pr(s,u)}else throw new Error("Can not access image data")}else{if(a)return new Promise((c,f)=>{let g=l(),y=p(g);if(!e||!y)return f();let _=new Image;_.crossOrigin="Anonymous",_.src=e,_.onload=()=>{g.width=_.width,g.height=_.height,y.drawImage(_,0,0,g.width,g.height);let b=y.getImageData(0,0,g.width,g.height);u.height=g.height,u.width=g.width,c(Pr(b.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Pr(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")},vp=(e,t)=>{let{width:r,height:i,download:n,dispose:a}=t,s=[1,i,r,4];return new Ue({location:"texture",type:"float32",texture:e,dims:s,download:n,dispose:a})},$p=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new Ue({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:n,dispose:a})},xp=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new Ue({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:n,dispose:a})},Tp=(e,t,r)=>new Ue({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),Nt,_r,qi,Sp,I0=U(()=>{Nt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),_r=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),qi=!1,Sp=()=>{if(!qi){qi=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(Nt.set("int64",BigInt64Array),_r.set(BigInt64Array,"int64")),t&&(Nt.set("uint64",BigUint64Array),_r.set(BigUint64Array,"uint64")),i?(Nt.set("float16",r),_r.set(r,"float16")):Nt.set("float16",Uint16Array)}}}),Ep,kp,C0=U(()=>{na(),Ep=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},kp=(e,t)=>{switch(e.location){case"cpu":return new Ue(e.type,e.data,t);case"cpu-pinned":return new Ue({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Ue({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Ue({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Ue({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Ue,na=U(()=>{E0(),k0(),I0(),C0(),Ue=class{constructor(e,t,r){Sp();let i,n;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,n=e.dims,e.location){case"cpu-pinned":{let s=Nt.get(i);if(!s)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(i=e,u=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let l=Nt.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(t,BigInt):s=l.from(t)}else if(t instanceof l)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${l}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")i="string",s=e;else if(l==="boolean")i="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",s=Uint8Array.from(e);else{let l=_r.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");n=u,this.cpuData=s,this.dataLocation="cpu"}let a=Ep(n);if(this.cpuData&&a!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=n,this.size=a}static async fromImage(e,t){return bp(e,t)}static fromTexture(e,t){return vp(e,t)}static fromGpuBuffer(e,t){return $p(e,t)}static fromMLTensor(e,t){return xp(e,t)}static fromPinnedBuffer(e,t,r){return Tp(e,t,r)}toDataURL(e){return _p(this,e)}toImageData(e){return wp(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return kp(this,e)}}}),Ze,Ip=U(()=>{na(),Ze=Ue}),ri,Wi,ot,et,Lt,qt,Cp=U(()=>{yp(),ri=(e,t)=>{(typeof Ce.trace>"u"?!Ce.wasm.trace:!Ce.trace)||console.timeStamp(`${e}::ORT::${t}`)},Wi=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let n=0;n<r.length;n++){if(i&&!r[n].includes("TRACE_FUNC")){let a=`FUNC_${e}::${r[n].trim().split(" ")[1]}`;t&&(a+=`::${t}`),ri("CPU",a);return}r[n].includes("TRACE_FUNC")&&(i=!0)}},ot=e=>{(typeof Ce.trace>"u"?!Ce.wasm.trace:!Ce.trace)||Wi("BEGIN",e)},et=e=>{(typeof Ce.trace>"u"?!Ce.wasm.trace:!Ce.trace)||Wi("END",e)},Lt=e=>{(typeof Ce.trace>"u"?!Ce.wasm.trace:!Ce.trace)||console.time(`ORT::${e}`)},qt=e=>{(typeof Ce.trace>"u"?!Ce.wasm.trace:!Ce.trace)||console.timeEnd(`ORT::${e}`)}}),zp,z0=U(()=>{mp(),Ip(),Cp(),zp=class Ap{constructor(t){this.handler=t}async run(t,r,i){ot(),Lt("InferenceSession.run");let n={},a={};if(typeof t!="object"||t===null||t instanceof Ze||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Ze)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let p of r){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);n[p]=null}if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,c=Object.getOwnPropertyNames(r);for(let f of this.outputNames)if(c.indexOf(f)!==-1){let g=r[f];(g===null||g instanceof Ze)&&(p=!0,s=!1,n[f]=g)}if(p){if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else a=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of this.inputNames)if(typeof t[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(s)for(let p of this.outputNames)n[p]=null;let u=await this.handler.run(t,n,a),l={};for(let p in u)if(Object.hasOwnProperty.call(u,p)){let c=u[p];c instanceof Ze?l[p]=c:l[p]=new Ze(c.type,c.data,c.dims)}return qt("InferenceSession.run"),et(),l}async release(){return this.handler.dispose()}static async create(t,r,i,n){ot(),Lt("InferenceSession.create");let a,s={};if(typeof t=="string"){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,f=0,g=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(g=t.byteLength-f,typeof i=="number"){if(g=i,!Number.isSafeInteger(g))throw new RangeError("'byteLength' must be an integer.");if(g<=0||f+g>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-f}].`);if(typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(c,f,g)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await fp(s),p=await u.createInferenceSessionHandler(a,l);return qt("InferenceSession.create"),et(),new Ap(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),ii,A0=U(()=>{z0(),ii=zp}),O0=U(()=>{}),R0=U(()=>{}),M0=U(()=>{}),N0=U(()=>{}),B0={};tr(B0,{InferenceSession:()=>ii,TRACE:()=>ri,TRACE_EVENT_BEGIN:()=>Lt,TRACE_EVENT_END:()=>qt,TRACE_FUNC_BEGIN:()=>ot,TRACE_FUNC_END:()=>et,Tensor:()=>Ze,env:()=>ge,registerBackend:()=>Yt});var Ge=U(()=>{x0(),S0(),A0(),Ip(),O0(),R0(),Cp(),M0(),N0()}),aa=U(()=>{}),Op={};tr(Op,{default:()=>Rp});var Vi,Gi,Rp,D0=U(()=>{Uf(),Ft(),sa(),Vi="ort-wasm-proxy-worker",Gi=globalThis.self?.name===Vi,Gi&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":oa(r.wasm).then(()=>{Ta(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:n}=r;Sa(n,i).then(()=>{postMessage({type:t})},a=>{postMessage({type:t,err:a})});break}case"copy-from":{let{buffer:i}=r,n=di(i);postMessage({type:t,out:n});break}case"create":{let{model:i,options:n}=r;Ea(i,n).then(a=>{postMessage({type:t,out:a})},a=>{postMessage({type:t,err:a})});break}case"release":ka(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:n,inputs:a,outputIndices:s,options:u}=r;Ia(i,n,a,s,new Array(s.length).fill(null),u).then(l=>{l.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},za([...a,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":Ca(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),Rp=Gi?null:e=>new Worker(e??Pe,{type:"module",name:Vi})}),Mp={};tr(Mp,{default:()=>Np});async function Io(e={}){var t=e,r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,n=i&&self.name?.startsWith("em-pthread");t.mountExternalData=(o,d)=>{o.startsWith("./")&&(o=o.substring(2)),(t.Zc||(t.Zc=new Map)).set(o,d)},t.unmountExternalData=()=>{delete t.Zc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,ae:!0}).buffer.constructor;let a=o=>async(...d)=>{try{if(t.$c)throw Error("Session already started");let m=t.$c={Nd:d[0],errors:[]},h=await o(...d);if(t.$c!==m)throw Error("Session mismatch");t.gd?.flush();let v=m.errors;if(0<v.length){let E=await Promise.all(v);if(E=E.filter(C=>C),0<E.length)throw Error(E.join(`
`))}return h}finally{t.$c=null}};t.jsepInit=(o,d)=>{if(o==="webgpu"){[t.gd,t.Dd,t.Hd,t.jd,t.Gd,t.ac,t.Id,t.Kd,t.Ed,t.Fd,t.Jd]=d;let m=t.gd;t.jsepRegisterBuffer=(h,v,E,C)=>m.registerBuffer(h,v,E,C),t.jsepGetBuffer=h=>m.getBuffer(h),t.jsepCreateDownloader=(h,v,E)=>m.createDownloader(h,v,E),t.jsepOnCreateSession=h=>{m.onCreateSession(h)},t.jsepOnReleaseSession=h=>{m.onReleaseSession(h)},t.jsepOnRunStart=h=>m.onRunStart(h),t.Ld=(h,v)=>{m.upload(h,v)}}else if(o==="webnn"){let m=d[0];[t.Zd,t.vd,t.webnnEnsureTensor,t.xd,t.webnnDownloadTensor,t.Yd,t.webnnEnableTraceEvent]=d.slice(1),t.webnnReleaseTensorId=t.vd,t.webnnUploadTensor=t.xd,t.webnnRegisterMLContext=t.Yd,t.webnnOnRunStart=h=>m.onRunStart(h),t.webnnOnRunEnd=m.onRunEnd.bind(m),t.webnnOnReleaseSession=h=>{m.onReleaseSession(h)},t.webnnCreateMLTensorDownloader=(h,v)=>m.createMLTensorDownloader(h,v),t.webnnRegisterMLTensor=(h,v,E,C)=>m.registerMLTensor(h,v,E,C),t.webnnCreateMLContext=h=>m.createMLContext(h),t.webnnRegisterMLConstant=(h,v,E,C,M,W)=>m.registerMLConstant(h,v,E,C,M,t.Zc,W),t.webnnRegisterGraphInput=m.registerGraphInput.bind(m),t.webnnIsGraphInput=m.isGraphInput.bind(m),t.webnnRegisterGraphOutput=m.registerGraphOutput.bind(m),t.webnnIsGraphOutput=m.isGraphOutput.bind(m),t.webnnCreateTemporaryTensor=m.createTemporaryTensor.bind(m),t.webnnIsGraphInputOutputTypeSupported=m.isGraphInputOutputTypeSupported.bind(m)}};let s=()=>{let o=d=>(...m)=>{let h=it;return m=d(...m),it!=h?new Promise((v,E)=>{ki={resolve:v,reject:E}}):m};(()=>{for(let d of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[d]=o(t[d])})(),a!==void 0&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),s=void 0};t.asyncInit=()=>{s?.()};var u,l,p=(o,d)=>{throw d},c=import.meta.url,f="";if(r||i){try{f=new URL(".",c).href}catch{}i&&(l=o=>{var d=new XMLHttpRequest;return d.open("GET",o,!1),d.responseType="arraybuffer",d.send(null),new Uint8Array(d.response)}),u=async o=>{if(A(o))return new Promise((m,h)=>{var v=new XMLHttpRequest;v.open("GET",o,!0),v.responseType="arraybuffer",v.onload=()=>{v.status==200||v.status==0&&v.response?m(v.response):h(v.status)},v.onerror=h,v.send(null)});var d=await fetch(o,{credentials:"same-origin"});if(d.ok)return d.arrayBuffer();throw Error(d.status+" : "+d.url)}}var g,y,_,b,T,$,w=console.log.bind(console),k=console.error.bind(console),S=w,I=k,z=!1,A=o=>o.startsWith("file://");function x(){gt.buffer!=L.buffer&&V()}if(n){let o=function(d){try{var m=d.data,h=m.Uc;if(h==="load"){let v=[];self.onmessage=E=>v.push(E),$=()=>{postMessage({Uc:"loaded"});for(let E of v)o(E);self.onmessage=o};for(let E of m.Ad)t[E]&&!t[E].proxy||(t[E]=(...C)=>{postMessage({Uc:"callHandler",zd:E,args:C})},E=="print"&&(S=t[E]),E=="printErr"&&(I=t[E]));gt=m.Vd,V(),y=m.Wd,$e(),Dr()}else if(h==="run"){(function(v){var E=(x(),D)[v+52>>>2>>>0];v=(x(),D)[v+56>>>2>>>0],Ns(E,E-v),se(E)})(m.Tc),Oi(m.Tc,0,0,1,0,0),Ba(),Ti(m.Tc),P||(Cs(),P=!0);try{sm(m.Pd,m.dd)}catch(v){if(v!="unwind")throw v}}else m.target!=="setimmediate"&&(h==="checkMailbox"?P&&zr():h&&(I(`worker: received unknown command ${h}`),I(m)))}catch(v){throw zs(),v}};var P=!1;self.onunhandledrejection=d=>{throw d.reason||d},self.onmessage=o}var L,H,q,j,R,D,G,J,X,Z,le,B=!1;function V(){var o=gt.buffer;t.HEAP8=L=new Int8Array(o),q=new Int16Array(o),t.HEAPU8=H=new Uint8Array(o),j=new Uint16Array(o),t.HEAP32=R=new Int32Array(o),t.HEAPU32=D=new Uint32Array(o),G=new Float32Array(o),J=new Float64Array(o),X=new BigInt64Array(o),Z=new BigUint64Array(o)}function ee(){B=!0,n?$():lt.tb()}function ae(o){throw I(o="Aborted("+o+")"),z=!0,o=new WebAssembly.RuntimeError(o+". Build with -sASSERTIONS for more info."),T?.(o),o}function Oe(){return{a:{ma:Cg,hb:Ig,g:om,J:um,f:lm,o:dm,h:pm,ha:cm,b:hm,T:fm,Ia:Wa,n:mm,_:Ha,Ya:ja,Ea:Ka,Ga:Xa,Za:Ya,Wa:Qa,Pa:Za,Va:Ja,ka:es,Fa:ts,Ca:rs,Xa:is,Da:ns,cb:gm,ea:ym,xa:_m,va:bm,da:$m,O:xm,H:Tm,wa:Sm,Z:Om,ya:Rm,Sa:Mm,Aa:Bm,Ja:Dm,ta:Pm,fa:Um,Ra:Ti,$a:Lm,R:Gm,s:Xm,c:$i,ib:Ym,y:Qm,M:Zm,D:Jm,m:eg,t:cs,jb:tg,I:rg,S:ig,j:ng,v:ag,r:sg,l:og,Ma:ug,Na:lg,Oa:dg,Ka:gs,La:ys,ua:_s,eb:cg,bb:fg,u:mg,aa:gg,ga:yg,ab:hg,V:_g,_a:wg,Ba:bg,F:pg,U:vg,la:Nr,za:xg,gb:$g,fb:Tg,Ta:$s,Ua:xs,Ha:yi,$:Ts,ja:Ss,Qa:Es,ia:ks,lb:c0,na:a0,mb:p0,oa:n0,G:Xg,d:Rg,q:Ag,w:zg,B:Vg,pb:t0,K:Hg,x:Ng,pa:r0,X:s0,ba:e0,nb:d0,ob:l0,ra:Yg,qa:Jg,qb:Qg,N:jg,Y:i0,e:Mg,A:Bg,k:Og,kb:h0,p:Pg,z:Ug,C:Dg,E:Lg,L:Gg,rb:Kg,Q:o0,ca:Fg,W:u0,sb:Wg,sa:qg,P:Zg,i:Eg,a:gt,db:gi}}}async function $e(){function o(h,v){var E=lt=h.exports;h={};for(let[C,M]of Object.entries(E))typeof M=="function"?(E=qm(M),h[C]=E):h[C]=M;return lt=h,lt=(function(){var C=lt,M=F=>ne=>F(ne)>>>0,W=F=>()=>F()>>>0;return(C=Object.assign({},C)).ub=M(C.ub),C.Yb=W(C.Yb),C._b=M(C._b),C.mc=M(C.mc),C.nc=W(C.nc),C.rc=M(C.rc),C})(),Ma.push(lt.$b),Is=(h=lt).ub,Cs=h.vb,t._OrtInit=h.wb,t._OrtGetLastError=h.xb,t._OrtCreateSessionOptions=h.yb,t._OrtAppendExecutionProvider=h.zb,t._OrtAddFreeDimensionOverride=h.Ab,t._OrtAddSessionConfigEntry=h.Bb,t._OrtReleaseSessionOptions=h.Cb,t._OrtCreateSession=h.Db,t._OrtReleaseSession=h.Eb,t._OrtGetInputOutputCount=h.Fb,t._OrtGetInputOutputMetadata=h.Gb,t._OrtFree=h.Hb,t._OrtCreateTensor=h.Ib,t._OrtGetTensorData=h.Jb,t._OrtReleaseTensor=h.Kb,t._OrtCreateRunOptions=h.Lb,t._OrtAddRunConfigEntry=h.Mb,t._OrtReleaseRunOptions=h.Nb,t._OrtCreateBinding=h.Ob,t._OrtBindInput=h.Pb,t._OrtBindOutput=h.Qb,t._OrtClearBoundOutputs=h.Rb,t._OrtReleaseBinding=h.Sb,t._OrtRunWithBinding=h.Tb,t._OrtRun=h.Ub,t._OrtEndProfiling=h.Vb,t._JsepOutput=h.Wb,t._JsepGetNodeName=h.Xb,Br=h.Yb,nt=t._free=h.Zb,nr=t._malloc=h._b,Oi=h.bc,zs=h.cc,As=h.dc,Os=h.ec,Ri=h.fc,Rs=h.gc,Ms=h.hc,ue=h.ic,ar=h.jc,Ns=h.kc,se=h.lc,Mi=h.mc,oe=h.nc,Bs=h.oc,Ni=h.pc,Ds=h.qc,Ps=h.rc,Us=h.sc,Bi=h.tc,Ls=h.uc,qs=h.vc,Ws=h.wc,Vs=h.xc,Gs=h.yc,Fs=h.zc,Hs=h.Ac,js=h.Bc,Ks=h.Cc,Xs=h.Dc,Ys=h.Ec,Qs=h.Fc,Zs=h.Gc,Js=h.Hc,eo=h.Ic,to=h.Jc,ro=h.Kc,io=h.Lc,no=h.Mc,ao=h.Nc,so=h.Oc,oo=h.Pc,uo=h.Rc,lo=h.Sc,po=h.bd,co=h.cd,ho=h.hd,fo=h.kd,mo=h.ld,go=h.md,yo=h.nd,_o=h.od,wo=h.pd,bo=h.qd,vo=h.rd,$o=h.wd,xo=h.Rd,To=h.Sd,So=h.Td,Eo=h.Ud,y=v,lt}var d,m=Oe();return t.instantiateWasm?new Promise(h=>{t.instantiateWasm(m,(v,E)=>{h(o(v,E))})}):n?o(new WebAssembly.Instance(y,Oe()),y):(le??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",f):f+"ort-wasm-simd-threaded.jsep.wasm":new URL("/vj-mapper/assets/ort-wasm-simd-threaded.jsep-CVw3nYo7.wasm",import.meta.url).href,d=await(async function(h){var v=le;if(!g&&!A(v))try{var E=fetch(v,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(E,h)}catch(C){I(`wasm streaming compile failed: ${C}`),I("falling back to ArrayBuffer instantiation")}return(async function(C,M){try{var W=await(async function(F){if(!g)try{var ne=await u(F);return new Uint8Array(ne)}catch{}if(F==le&&g)F=new Uint8Array(g);else{if(!l)throw"both async and sync fetching of the wasm failed";F=l(F)}return F})(C);return await WebAssembly.instantiate(W,M)}catch(F){I(`failed to asynchronously prepare wasm: ${F}`),ae(F)}})(v,h)})(m),o(d.instance,d.module))}class ke{name="ExitStatus";constructor(d){this.message=`Program terminated with exit(${d})`,this.status=d}}var De=o=>{o.terminate(),o.onmessage=()=>{}},Te=[],we=0,Ne=null,Sr=o=>{mt.length==0&&(Pa(),Da(mt[0]));var d=mt.pop();if(!d)return 6;rr.push(d),It[o.Tc]=d,d.Tc=o.Tc;var m={Uc:"run",Pd:o.Od,dd:o.dd,Tc:o.Tc};return d.postMessage(m,o.ud),0},tt=0,be=(o,d,...m)=>{var h,v=16*m.length,E=oe(),C=Mi(v),M=C>>>3;for(h of m)typeof h=="bigint"?((x(),X)[M++>>>0]=1n,(x(),X)[M++>>>0]=h):((x(),X)[M++>>>0]=0n,(x(),J)[M++>>>0]=h);return o=As(o,0,v,C,d),se(E),o};function gi(o){if(n)return be(0,1,o);if(_=o,!(0<tt)){for(var d of rr)De(d);for(d of mt)De(d);mt=[],rr=[],It={},z=!0}p(0,new ke(o))}function Ra(o){if(n)return be(1,0,o);yi(o)}var yi=o=>{if(_=o,n)throw Ra(o),"unwind";gi(o)},mt=[],rr=[],Ma=[],It={},Na=o=>{var d=o.Tc;delete It[d],mt.push(o),rr.splice(rr.indexOf(o),1),o.Tc=0,Os(d)};function Ba(){Ma.forEach(o=>o())}var Da=o=>new Promise(d=>{o.onmessage=v=>{var E=v.data;if(v=E.Uc,E.ad&&E.ad!=Br()){var C=It[E.ad];C?C.postMessage(E,E.ud):I(`Internal error! Worker sent a message "${v}" to target pthread ${E.ad}, but that thread no longer exists!`)}else v==="checkMailbox"?zr():v==="spawnThread"?Sr(E):v==="cleanupThread"?Cr(()=>{Na(It[E.Qd])}):v==="loaded"?(o.loaded=!0,d(o)):E.target==="setimmediate"?o.postMessage(E):v==="uncaughtException"?o.onerror(E.error):v==="callHandler"?t[E.zd](...E.args):v&&I(`worker sent an unknown command ${v}`)},o.onerror=v=>{throw I(`worker sent an error! ${v.filename}:${v.lineno}: ${v.message}`),v};var m,h=[];for(m of[])t.propertyIsEnumerable(m)&&h.push(m);o.postMessage({Uc:"load",Ad:h,Vd:gt,Wd:y})});function Pa(){var o=new Worker((()=>{let d=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new d("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});mt.push(o)}var gt,sm=(o,d)=>{tt=0,o=Bi(o,d),0<tt?_=o:Ri(o)},Er=[],kr=0;function om(o){var d=new _i(o>>>=0);return(x(),L)[d.Vc+12>>>0]==0&&(Ua(d,!0),kr--),La(d,!1),Er.push(d),Ps(o)}var jt=0,um=()=>{ue(0,0);var o=Er.pop();Bs(o.ed),jt=0};function Ua(o,d){d=d?1:0,(x(),L)[o.Vc+12>>>0]=d}function La(o,d){d=d?1:0,(x(),L)[o.Vc+13>>>0]=d}class _i{constructor(d){this.ed=d,this.Vc=d-24}}var wi=o=>{var d=jt;if(!d)return ar(0),0;var m=new _i(d);(x(),D)[m.Vc+16>>>2>>>0]=d;var h=(x(),D)[m.Vc+4>>>2>>>0];if(!h)return ar(0),d;for(var v of o){if(v===0||v===h)break;if(Ds(v,h,m.Vc+16))return ar(v),d}return ar(h),d};function lm(){return wi([])}function dm(o){return wi([o>>>0])}function pm(o,d,m,h){return wi([o>>>0,d>>>0,m>>>0,h>>>0])}var cm=()=>{var o=Er.pop();o||ae("no exception to throw");var d=o.ed;throw(x(),L)[o.Vc+13>>>0]==0&&(Er.push(o),La(o,!0),Ua(o,!1),kr++),Ni(d),jt=d};function hm(o,d,m){var h=new _i(o>>>=0);throw d>>>=0,m>>>=0,(x(),D)[h.Vc+16>>>2>>>0]=0,(x(),D)[h.Vc+4>>>2>>>0]=d,(x(),D)[h.Vc+8>>>2>>>0]=m,Ni(o),kr++,jt=o}var fm=()=>kr;function qa(o,d,m,h){return n?be(2,1,o,d,m,h):Wa(o,d,m,h)}function Wa(o,d,m,h){if(o>>>=0,d>>>=0,m>>>=0,h>>>=0,!globalThis.SharedArrayBuffer)return 6;var v=[];return n&&v.length===0?qa(o,d,m,h):(o={Od:m,Tc:o,dd:h,ud:v},n?(o.Uc="spawnThread",postMessage(o,v),0):Sr(o))}function mm(o){throw jt||=o>>>0,jt}var Va=globalThis.TextDecoder&&new TextDecoder,Ga=(o,d,m,h)=>{if(m=d+m,h)return m;for(;o[d]&&!(d>=m);)++d;return d},Fa=(o,d=0,m,h)=>{if(16<(m=Ga(o,d>>>=0,m,h))-d&&o.buffer&&Va)return Va.decode(o.buffer instanceof ArrayBuffer?o.subarray(d,m):o.slice(d,m));for(h="";d<m;){var v=o[d++];if(128&v){var E=63&o[d++];if((224&v)==192)h+=String.fromCharCode((31&v)<<6|E);else{var C=63&o[d++];65536>(v=(240&v)==224?(15&v)<<12|E<<6|C:(7&v)<<18|E<<12|C<<6|63&o[d++])?h+=String.fromCharCode(v):(v-=65536,h+=String.fromCharCode(55296|v>>10,56320|1023&v))}}else h+=String.fromCharCode(v)}return h},Se=(o,d,m)=>(o>>>=0)?Fa((x(),H),o,d,m):"";function Ha(o,d,m){return n?be(3,1,o,d,m):0}function ja(o,d){if(n)return be(4,1,o,d)}function Ka(o,d){if(n)return be(5,1,o,d)}function Xa(o,d,m){if(n)return be(6,1,o,d,m)}function Ya(o,d,m){return n?be(7,1,o,d,m):0}function Qa(o,d){if(n)return be(8,1,o,d)}function Za(o,d,m){if(n)return be(9,1,o,d,m)}function Ja(o,d,m,h){if(n)return be(10,1,o,d,m,h)}function es(o,d,m,h){if(n)return be(11,1,o,d,m,h)}function ts(o,d,m,h){if(n)return be(12,1,o,d,m,h)}function rs(o){if(n)return be(13,1,o)}function is(o,d){if(n)return be(14,1,o,d)}function ns(o,d,m){if(n)return be(15,1,o,d,m)}var gm=()=>ae(""),rt=o=>{o>>>=0;for(var d="";;){var m=(x(),H)[o++>>>0];if(!m)return d;d+=String.fromCharCode(m)}},bi={},vi={},Kt=class extends Error{constructor(o){super(o),this.name="BindingError"}};function ut(o,d,m={}){return(function(h,v,E={}){var C=v.name;if(!h)throw new Kt(`type "${C}" must have a positive integer typeid pointer`);if(vi.hasOwnProperty(h)){if(E.Bd)return;throw new Kt(`Cannot register type '${C}' twice`)}vi[h]=v,bi.hasOwnProperty(h)&&(v=bi[h],delete bi[h],v.forEach(M=>M()))})(o,d,m)}var as=(o,d,m)=>{switch(d){case 1:return m?h=>(x(),L)[h>>>0]:h=>(x(),H)[h>>>0];case 2:return m?h=>(x(),q)[h>>>1>>>0]:h=>(x(),j)[h>>>1>>>0];case 4:return m?h=>(x(),R)[h>>>2>>>0]:h=>(x(),D)[h>>>2>>>0];case 8:return m?h=>(x(),X)[h>>>3>>>0]:h=>(x(),Z)[h>>>3>>>0];default:throw new TypeError(`invalid integer width (${d}): ${o}`)}};function ym(o,d,m,h,v){o>>>=0,m>>>=0,d=rt(d>>>0);let E=C=>C;if(h=h===0n){let C=8*m;E=M=>BigInt.asUintN(C,M),v=E(v)}ut(o,{name:d,Qc:E,Xc:(C,M)=>(typeof M=="number"&&(M=BigInt(M)),M),Wc:as(d,m,!h),Yc:null})}function _m(o,d,m,h){ut(o>>>=0,{name:d=rt(d>>>0),Qc:function(v){return!!v},Xc:function(v,E){return E?m:h},Wc:function(v){return this.Qc((x(),H)[v>>>0])},Yc:null})}var ss=[],Ct=[0,1,,1,null,1,!0,1,!1,1];function $i(o){9<(o>>>=0)&&--Ct[o+1]==0&&(Ct[o]=void 0,ss.push(o))}var qe=o=>{if(!o)throw new Kt(`Cannot use deleted val. handle = ${o}`);return Ct[o]},Fe=o=>{switch(o){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let d=ss.pop()||Ct.length;return Ct[d]=o,Ct[d+1]=1,d}};function xi(o){return this.Qc((x(),D)[o>>>2>>>0])}var wm={name:"emscripten::val",Qc:o=>{var d=qe(o);return $i(o),d},Xc:(o,d)=>Fe(d),Wc:xi,Yc:null};function bm(o){return ut(o>>>0,wm)}var vm=(o,d)=>{switch(d){case 4:return function(m){return this.Qc((x(),G)[m>>>2>>>0])};case 8:return function(m){return this.Qc((x(),J)[m>>>3>>>0])};default:throw new TypeError(`invalid float width (${d}): ${o}`)}};function $m(o,d,m){m>>>=0,ut(o>>>=0,{name:d=rt(d>>>0),Qc:h=>h,Xc:(h,v)=>v,Wc:vm(d,m),Yc:null})}function xm(o,d,m,h,v){o>>>=0,m>>>=0,d=rt(d>>>0);let E=M=>M;if(h===0){var C=32-8*m;E=M=>M<<C>>>C,v=E(v)}ut(o,{name:d,Qc:E,Xc:(M,W)=>W,Wc:as(d,m,h!==0),Yc:null})}function Tm(o,d,m){function h(E){var C=(x(),D)[E>>>2>>>0];return E=(x(),D)[E+4>>>2>>>0],new v((x(),L).buffer,E,C)}var v=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][d];ut(o>>>=0,{name:m=rt(m>>>0),Qc:h,Wc:h},{Bd:!0})}var yt=(o,d,m)=>{var h=(x(),H);if(d>>>=0,0<m){var v=d;m=d+m-1;for(var E=0;E<o.length;++E){var C=o.codePointAt(E);if(127>=C){if(d>=m)break;h[d++>>>0]=C}else if(2047>=C){if(d+1>=m)break;h[d++>>>0]=192|C>>6,h[d++>>>0]=128|63&C}else if(65535>=C){if(d+2>=m)break;h[d++>>>0]=224|C>>12,h[d++>>>0]=128|C>>6&63,h[d++>>>0]=128|63&C}else{if(d+3>=m)break;h[d++>>>0]=240|C>>18,h[d++>>>0]=128|C>>12&63,h[d++>>>0]=128|C>>6&63,h[d++>>>0]=128|63&C,E++}}h[d>>>0]=0,o=d-v}else o=0;return o},Ir=o=>{for(var d=0,m=0;m<o.length;++m){var h=o.charCodeAt(m);127>=h?d++:2047>=h?d+=2:55296<=h&&57343>=h?(d+=4,++m):d+=3}return d};function Sm(o,d){ut(o>>>=0,{name:d=rt(d>>>0),Qc(m){var h=(x(),D)[m>>>2>>>0];return h=Se(m+4,h,!0),nt(m),h},Xc(m,h){h instanceof ArrayBuffer&&(h=new Uint8Array(h));var v=typeof h=="string";if(!(v||ArrayBuffer.isView(h)&&h.BYTES_PER_ELEMENT==1))throw new Kt("Cannot pass non-string to std::string");var E=v?Ir(h):h.length,C=nr(4+E+1),M=C+4;return(x(),D)[C>>>2>>>0]=E,v?yt(h,M,E+1):(x(),H).set(h,M>>>0),m!==null&&m.push(nt,C),C},Wc:xi,Yc(m){nt(m)}})}var os=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,Em=(o,d,m)=>{if(o>>>=1,16<(d=Ga((x(),j),o,d/2,m))-o&&os)return os.decode((x(),j).slice(o,d));for(m="";o<d;++o){var h=(x(),j)[o>>>0];m+=String.fromCharCode(h)}return m},km=(o,d,m)=>{if(m??=2147483647,2>m)return 0;var h=d;m=(m-=2)<2*o.length?m/2:o.length;for(var v=0;v<m;++v){var E=o.charCodeAt(v);(x(),q)[d>>>1>>>0]=E,d+=2}return(x(),q)[d>>>1>>>0]=0,d-h},Im=o=>2*o.length,Cm=(o,d,m)=>{var h="";o>>>=2;for(var v=0;!(v>=d/4);v++){var E=(x(),D)[o+v>>>0];if(!E&&!m)break;h+=String.fromCodePoint(E)}return h},zm=(o,d,m)=>{if(d>>>=0,m??=2147483647,4>m)return 0;var h=d;m=h+m-4;for(var v=0;v<o.length;++v){var E=o.codePointAt(v);if(65535<E&&v++,(x(),R)[d>>>2>>>0]=E,(d+=4)+4>m)break}return(x(),R)[d>>>2>>>0]=0,d-h},Am=o=>{for(var d=0,m=0;m<o.length;++m)65535<o.codePointAt(m)&&m++,d+=4;return d};function Om(o,d,m){if(o>>>=0,d>>>=0,m=rt(m>>>=0),d===2)var h=Em,v=km,E=Im;else h=Cm,v=zm,E=Am;ut(o,{name:m,Qc:C=>{var M=(x(),D)[C>>>2>>>0];return M=h(C+4,M*d,!0),nt(C),M},Xc:(C,M)=>{if(typeof M!="string")throw new Kt(`Cannot pass non-string to C++ string type ${m}`);var W=E(M),F=nr(4+W+d);return(x(),D)[F>>>2>>>0]=W/d,v(M,F+4,W+d),C!==null&&C.push(nt,F),F},Wc:xi,Yc(C){nt(C)}})}function Rm(o,d){ut(o>>>=0,{Cd:!0,name:d=rt(d>>>0),Qc:()=>{},Xc:()=>{}})}function Mm(o){Oi(o>>>0,!i,1,!r,131072,!1),Ba()}var Cr=o=>{if(!z)try{if(o(),!(0<tt))try{n?Br()&&Ri(_):yi(_)}catch(d){d instanceof ke||d=="unwind"||p(0,d)}}catch(d){d instanceof ke||d=="unwind"||p(0,d)}},Nm=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function Ti(o){o>>>=0,Nm||(Atomics.waitAsync((x(),R),o>>>2,o).value.then(zr),o+=128,Atomics.store((x(),R),o>>>2,1))}var zr=()=>Cr(()=>{var o=Br();o&&(Ti(o),Ms())});function Bm(o,d){(o>>>=0)==d>>>0?setTimeout(zr):n?postMessage({ad:o,Uc:"checkMailbox"}):(o=It[o])&&o.postMessage({Uc:"checkMailbox"})}var Si=[];function Dm(o,d,m,h,v){for(d>>>=0,v>>>=0,Si.length=0,m=v>>>3,h=v+h>>>3;m<h;){var E;E=(x(),X)[m++>>>0]?(x(),X)[m++>>>0]:(x(),J)[m++>>>0],Si.push(E)}return(d?Di[d]:kg[o])(...Si)}var Pm=()=>{tt=0};function Um(o){o>>>=0,n?postMessage({Uc:"cleanupThread",Qd:o}):Na(It[o])}function Lm(o){}var Ar=o=>{try{o()}catch(d){ae(d)}};function qm(o){var d=(...m)=>{Or.push(o);try{return o(...m)}finally{z||(Or.pop(),it&&_t===1&&Or.length===0&&(_t=0,tt+=1,Ar(To),typeof Fibers<"u"&&Fibers.ce()))}};return ds.set(o,d),d}var _t=0,it=null,us=0,Or=[],Ei=new Map,ls=new Map,ds=new Map,Wm=0,ki=null,Vm=[],ps=o=>(function(d){if(!z){if(_t===0){var m=!1,h=!1;d((v=0)=>{if(!z&&(us=v,m=!0,h)){_t=2,Ar(()=>So(it)),typeof MainLoop<"u"&&MainLoop.yd&&MainLoop.resume(),v=!1;try{var E=(function(){var W=(x(),R)[it+8>>>2>>>0];return W=ls.get(W),W=ds.get(W),--tt,W()})()}catch(W){E=W,v=!0}var C=!1;if(!it){var M=ki;M&&(ki=null,(v?M.reject:M.resolve)(E),C=!0)}if(v&&!C)throw E}}),h=!0,m||(_t=1,it=(function(){var v=nr(65548),E=v+12;if((x(),D)[v>>>2>>>0]=E,(x(),D)[v+4>>>2>>>0]=E+65536,E=Or[0],!Ei.has(E)){var C=Wm++;Ei.set(E,C),ls.set(C,E)}return E=Ei.get(E),(x(),R)[v+8>>>2>>>0]=E,v})(),typeof MainLoop<"u"&&MainLoop.yd&&MainLoop.pause(),Ar(()=>xo(it)))}else _t===2?(_t=0,Ar(Eo),nt(it),it=null,Vm.forEach(Cr)):ae(`invalid state: ${_t}`);return us}})(d=>{o().then(d)});function Gm(o){return o>>>=0,ps(async()=>{var d=await qe(o);return Fe(d)})}var Ii=[],Fm=o=>{var d=Ii.length;return Ii.push(o),d},Hm=(o,d)=>{for(var m=Array(o),h=0;h<o;++h){var v=h,E=(x(),D)[d+4*h>>>2>>>0],C=vi[E];if(C===void 0)throw o=`parameter ${h}`,E=Is(E),d=rt(E),nt(E),new Kt(`${o} has unknown type ${d}`);m[v]=C}return m},jm=(o,d,m)=>{var h=[];return o=o(h,m),h.length&&((x(),D)[d>>>2>>>0]=Fe(h)),o},Km={},Rr=o=>{var d=Km[o];return d===void 0?rt(o):d};function Xm(o,d,m){var[h,...v]=Hm(o,d>>>0);d=h.Xc.bind(h);var E=v.map(W=>W.Wc.bind(W));o--;var C={toValue:qe};switch(o=E.map((W,F)=>{var ne=`argFromPtr${F}`;return C[ne]=W,`${ne}(args${F?"+"+8*F:""})`}),m){case 0:var M="toValue(handle)";break;case 2:M="new (toValue(handle))";break;case 3:M="";break;case 1:C.getStringOrSymbol=Rr,M="toValue(handle)[getStringOrSymbol(methodName)]"}return M+=`(${o})`,h.Cd||(C.toReturnWire=d,C.emval_returnValue=jm,M=`return emval_returnValue(toReturnWire, destructorsRef, ${M})`),M=`return function (handle, methodName, destructorsRef, args) {
  ${M}
  }`,m=new Function(Object.keys(C),M)(...Object.values(C)),M=`methodCaller<(${v.map(W=>W.name)}) => ${h.name}>`,Fm(Object.defineProperty(m,"name",{value:M}))}function Ym(o,d){return d>>>=0,(o=qe(o>>>0))==qe(d)}function Qm(o){return(o>>>=0)?(o=Rr(o),Fe(globalThis[o])):Fe(globalThis)}function Zm(o){return o=Rr(o>>>0),Fe(t[o])}function Jm(o,d){return d>>>=0,o=qe(o>>>0),d=qe(d),Fe(o[d])}function eg(o){9<(o>>>=0)&&(Ct[o+1]+=1)}function cs(o,d,m,h,v){return Ii[o>>>0](d>>>0,m>>>0,h>>>0,v>>>0)}function tg(o,d,m,h,v){return cs(o>>>0,d>>>0,m>>>0,h>>>0,v>>>0)}function rg(){return Fe([])}function ig(o){o=qe(o>>>0);for(var d=Array(o.length),m=0;m<o.length;m++)d[m]=o[m];return Fe(d)}function ng(o){return Fe(Rr(o>>>0))}function ag(){return Fe({})}function sg(o){for(var d=qe(o>>>=0);d.length;){var m=d.pop();d.pop()(m)}$i(o)}function og(o,d,m){d>>>=0,m>>>=0,o=qe(o>>>0),d=qe(d),m=qe(m),o[d]=m}function ug(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),(x(),R)[d>>>2>>>0]=o.getUTCSeconds(),(x(),R)[d+4>>>2>>>0]=o.getUTCMinutes(),(x(),R)[d+8>>>2>>>0]=o.getUTCHours(),(x(),R)[d+12>>>2>>>0]=o.getUTCDate(),(x(),R)[d+16>>>2>>>0]=o.getUTCMonth(),(x(),R)[d+20>>>2>>>0]=o.getUTCFullYear()-1900,(x(),R)[d+24>>>2>>>0]=o.getUTCDay(),o=(o.getTime()-Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(x(),R)[d+28>>>2>>>0]=o}var hs=o=>o%4==0&&(o%100!=0||o%400==0),fs=[0,31,60,91,121,152,182,213,244,274,305,335],ms=[0,31,59,90,120,151,181,212,243,273,304,334];function lg(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),(x(),R)[d>>>2>>>0]=o.getSeconds(),(x(),R)[d+4>>>2>>>0]=o.getMinutes(),(x(),R)[d+8>>>2>>>0]=o.getHours(),(x(),R)[d+12>>>2>>>0]=o.getDate(),(x(),R)[d+16>>>2>>>0]=o.getMonth(),(x(),R)[d+20>>>2>>>0]=o.getFullYear()-1900,(x(),R)[d+24>>>2>>>0]=o.getDay();var m=(hs(o.getFullYear())?fs:ms)[o.getMonth()]+o.getDate()-1|0;(x(),R)[d+28>>>2>>>0]=m,(x(),R)[d+36>>>2>>>0]=-60*o.getTimezoneOffset(),m=new Date(o.getFullYear(),6,1).getTimezoneOffset();var h=new Date(o.getFullYear(),0,1).getTimezoneOffset();o=0|(m!=h&&o.getTimezoneOffset()==Math.min(h,m)),(x(),R)[d+32>>>2>>>0]=o}function dg(o){o>>>=0;var d=new Date((x(),R)[o+20>>>2>>>0]+1900,(x(),R)[o+16>>>2>>>0],(x(),R)[o+12>>>2>>>0],(x(),R)[o+8>>>2>>>0],(x(),R)[o+4>>>2>>>0],(x(),R)[o>>>2>>>0],0),m=(x(),R)[o+32>>>2>>>0],h=d.getTimezoneOffset(),v=new Date(d.getFullYear(),6,1).getTimezoneOffset(),E=new Date(d.getFullYear(),0,1).getTimezoneOffset(),C=Math.min(E,v);return 0>m?(x(),R)[o+32>>>2>>>0]=+(v!=E&&C==h):0<m!=(C==h)&&(v=Math.max(E,v),d.setTime(d.getTime()+6e4*((0<m?C:v)-h))),(x(),R)[o+24>>>2>>>0]=d.getDay(),m=(hs(d.getFullYear())?fs:ms)[d.getMonth()]+d.getDate()-1|0,(x(),R)[o+28>>>2>>>0]=m,(x(),R)[o>>>2>>>0]=d.getSeconds(),(x(),R)[o+4>>>2>>>0]=d.getMinutes(),(x(),R)[o+8>>>2>>>0]=d.getHours(),(x(),R)[o+12>>>2>>>0]=d.getDate(),(x(),R)[o+16>>>2>>>0]=d.getMonth(),(x(),R)[o+20>>>2>>>0]=d.getYear(),o=d.getTime(),BigInt(isNaN(o)?-1:o/1e3)}function gs(o,d,m,h,v,E,C){return n?be(16,1,o,d,m,h,v,E,C):-52}function ys(o,d,m,h,v,E){if(n)return be(17,1,o,d,m,h,v,E)}var ir={},pg=()=>performance.timeOrigin+performance.now();function _s(o,d){if(n)return be(18,1,o,d);if(ir[o]&&(clearTimeout(ir[o].id),delete ir[o]),!d)return 0;var m=setTimeout(()=>{delete ir[o],Cr(()=>Rs(o,performance.timeOrigin+performance.now()))},d);return ir[o]={id:m,be:d},0}function cg(o,d,m,h){o>>>=0,d>>>=0,m>>>=0,h>>>=0;var v=new Date().getFullYear(),E=new Date(v,0,1).getTimezoneOffset();v=new Date(v,6,1).getTimezoneOffset();var C=Math.max(E,v);(x(),D)[o>>>2>>>0]=60*C,(x(),R)[d>>>2>>>0]=+(E!=v),o=(d=M=>{var W=Math.abs(M);return`UTC${0<=M?"-":"+"}${String(Math.floor(W/60)).padStart(2,"0")}${String(W%60).padStart(2,"0")}`})(E),d=d(v),v<E?(yt(o,m,17),yt(d,h,17)):(yt(o,h,17),yt(d,m,17))}var hg=()=>Date.now();function fg(o,d,m){return m>>>=0,0<=o&&3>=o?(o===0?o=Date.now():o=performance.timeOrigin+performance.now(),o=Math.round(1e6*o),(x(),X)[m>>>3>>>0]=BigInt(o),0):28}var Ci=[],ws=(o,d)=>{Ci.length=0;for(var m;m=(x(),H)[o++>>>0];){var h=m!=105;d+=(h&=m!=112)&&d%8?4:0,Ci.push(m==112?(x(),D)[d>>>2>>>0]:m==106?(x(),X)[d>>>3>>>0]:m==105?(x(),R)[d>>>2>>>0]:(x(),J)[d>>>3>>>0]),d+=h?8:4}return Ci};function mg(o,d,m){return o>>>=0,d=ws(d>>>0,m>>>0),Di[o](...d)}function gg(o,d,m){return o>>>=0,d=ws(d>>>0,m>>>0),Di[o](...d)}var yg=()=>{};function _g(o,d){return I(Se(o>>>0,d>>>0))}var wg=()=>{throw tt+=1,"unwind"};function bg(){return 4294901760}var vg=()=>navigator.hardwareConcurrency,zt={},Mr=o=>{var d;return(d=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(o))?+d[1]:(d=/:(\d+):\d+(?:\)|$)/.exec(o))?2147483648|+d[1]:0},bs=o=>{for(var d of o)(o=Mr(d))&&(zt[o]=d)};function $g(){var o=Error().stack.toString().split(`
`);return o[0]=="Error"&&o.shift(),bs(o),zt.sd=Mr(o[3]),zt.Md=o,zt.sd}function Nr(o){if(!(o=zt[o>>>0]))return 0;var d;if(d=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(o))o=d[1];else if(d=/^\s+at (.*) \(.*\)$/.exec(o))o=d[1];else{if(!(d=/^(.+?)@/.exec(o)))return 0;o=d[1]}nt(Nr.td??0),d=Ir(o)+1;var m=nr(d);return m&&yt(o,m,d),Nr.td=m,Nr.td}function xg(o){o>>>=0;var d=(x(),H).length;if(o<=d||4294901760<o)return!1;for(var m=1;4>=m;m*=2){var h=d*(1+.2/m);h=Math.min(h,o+100663296);e:{h=(Math.min(4294901760,65536*Math.ceil(Math.max(o,h)/65536))-gt.buffer.byteLength+65535)/65536|0;try{gt.grow(h),V();var v=1;break e}catch{}v=void 0}if(v)return!0}return!1}function Tg(o,d,m){if(o>>>=0,d>>>=0,zt.sd==o)var h=zt.Md;else(h=Error().stack.toString().split(`
`))[0]=="Error"&&h.shift(),bs(h);for(var v=3;h[v]&&Mr(h[v])!=o;)++v;for(o=0;o<m&&h[o+v];++o)(x(),R)[d+4*o>>>2>>>0]=Mr(h[o+v]);return o}var zi,Ai={},vs=()=>{if(!zi){var o,d={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(o in Ai)Ai[o]===void 0?delete d[o]:d[o]=Ai[o];var m=[];for(o in d)m.push(`${o}=${d[o]}`);zi=m}return zi};function $s(o,d){if(n)return be(19,1,o,d);o>>>=0,d>>>=0;var m,h=0,v=0;for(m of vs()){var E=d+h;(x(),D)[o+v>>>2>>>0]=E,h+=yt(m,E,1/0)+1,v+=4}return 0}function xs(o,d){if(n)return be(20,1,o,d);o>>>=0,d>>>=0;var m=vs();for(var h of((x(),D)[o>>>2>>>0]=m.length,o=0,m))o+=Ir(h)+1;return(x(),D)[d>>>2>>>0]=o,0}function Ts(o){return n?be(21,1,o):52}function Ss(o,d,m,h){return n?be(22,1,o,d,m,h):52}function Es(o,d,m,h){return n?be(23,1,o,d,m,h):70}var Sg=[null,[],[]];function ks(o,d,m,h){if(n)return be(24,1,o,d,m,h);d>>>=0,m>>>=0,h>>>=0;for(var v=0,E=0;E<m;E++){var C=(x(),D)[d>>>2>>>0],M=(x(),D)[d+4>>>2>>>0];d+=8;for(var W=0;W<M;W++){var F=o,ne=(x(),H)[C+W>>>0],pe=Sg[F];ne===0||ne===10?((F===1?S:I)(Fa(pe)),pe.length=0):pe.push(ne)}v+=M}return(x(),D)[h>>>2>>>0]=v,0}function Eg(o){return o>>>0}n||(function(){for(var o=t.numThreads-1;o--;)Pa();Te.push(async()=>{var d=(async function(){if(!n)return Promise.all(mt.map(Da))})();we++,await d,--we==0&&Ne&&(d=Ne,Ne=null,d())})})(),n||(gt=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),V()),t.wasmBinary&&(g=t.wasmBinary),t.stackSave=()=>oe(),t.stackRestore=o=>se(o),t.stackAlloc=o=>Mi(o),t.setValue=function(o,d,m="i8"){switch(m.endsWith("*")&&(m="*"),m){case"i1":case"i8":(x(),L)[o>>>0]=d;break;case"i16":(x(),q)[o>>>1>>>0]=d;break;case"i32":(x(),R)[o>>>2>>>0]=d;break;case"i64":(x(),X)[o>>>3>>>0]=BigInt(d);break;case"float":(x(),G)[o>>>2>>>0]=d;break;case"double":(x(),J)[o>>>3>>>0]=d;break;case"*":(x(),D)[o>>>2>>>0]=d;break;default:ae(`invalid type for setValue: ${m}`)}},t.getValue=function(o,d="i8"){switch(d.endsWith("*")&&(d="*"),d){case"i1":case"i8":return(x(),L)[o>>>0];case"i16":return(x(),q)[o>>>1>>>0];case"i32":return(x(),R)[o>>>2>>>0];case"i64":return(x(),X)[o>>>3>>>0];case"float":return(x(),G)[o>>>2>>>0];case"double":return(x(),J)[o>>>3>>>0];case"*":return(x(),D)[o>>>2>>>0];default:ae(`invalid type for getValue: ${d}`)}},t.UTF8ToString=Se,t.stringToUTF8=yt,t.lengthBytesUTF8=Ir;var Is,Cs,Br,nt,nr,Oi,zs,As,Os,Ri,Rs,Ms,ue,ar,Ns,se,Mi,oe,Bs,Ni,Ds,Ps,Us,Bi,Ls,qs,Ws,Vs,Gs,Fs,Hs,js,Ks,Xs,Ys,Qs,Zs,Js,eo,to,ro,io,no,ao,so,oo,uo,lo,po,co,ho,fo,mo,go,yo,_o,wo,bo,vo,$o,xo,To,So,Eo,lt,kg=[gi,Ra,qa,Ha,ja,Ka,Xa,Ya,Qa,Za,Ja,es,ts,rs,is,ns,gs,ys,_s,$s,xs,Ts,Ss,Es,ks],Di={927820:(o,d,m,h,v)=>{if(t===void 0||!t.Zc)return 1;if((o=Se(Number(o>>>0))).startsWith("./")&&(o=o.substring(2)),!(o=t.Zc.get(o)))return 2;if(d=Number(d>>>0),m=Number(m>>>0),h=Number(h>>>0),d+m>o.byteLength)return 3;try{let E=o.subarray(d,d+m);switch(v){case 0:(x(),H).set(E,h>>>0);break;case 1:t.Xd?t.Xd(h,E):t.Ld(h,E);break;default:return 4}return 0}catch{return 4}},928644:(o,d,m)=>{t.xd(o,(x(),H).subarray(d>>>0,d+m>>>0))},928708:()=>t.Zd(),928750:o=>{t.vd(o)},928787:()=>{t.Ed()},928818:()=>{t.Fd()},928847:()=>{t.Jd()},928872:o=>t.Dd(o),928905:o=>t.Hd(o),928937:(o,d,m)=>{t.jd(Number(o),Number(d),Number(m),!0)},929e3:(o,d,m)=>{t.jd(Number(o),Number(d),Number(m))},929057:()=>typeof wasmOffsetConverter<"u",929114:o=>{t.ac("Abs",o,void 0)},929165:o=>{t.ac("Neg",o,void 0)},929216:o=>{t.ac("Floor",o,void 0)},929269:o=>{t.ac("Ceil",o,void 0)},929321:o=>{t.ac("Reciprocal",o,void 0)},929379:o=>{t.ac("Sqrt",o,void 0)},929431:o=>{t.ac("Exp",o,void 0)},929482:o=>{t.ac("Erf",o,void 0)},929533:o=>{t.ac("Sigmoid",o,void 0)},929588:(o,d,m)=>{t.ac("HardSigmoid",o,{alpha:d,beta:m})},929667:o=>{t.ac("Log",o,void 0)},929718:o=>{t.ac("Sin",o,void 0)},929769:o=>{t.ac("Cos",o,void 0)},929820:o=>{t.ac("Tan",o,void 0)},929871:o=>{t.ac("Asin",o,void 0)},929923:o=>{t.ac("Acos",o,void 0)},929975:o=>{t.ac("Atan",o,void 0)},930027:o=>{t.ac("Sinh",o,void 0)},930079:o=>{t.ac("Cosh",o,void 0)},930131:o=>{t.ac("Asinh",o,void 0)},930184:o=>{t.ac("Acosh",o,void 0)},930237:o=>{t.ac("Atanh",o,void 0)},930290:o=>{t.ac("Tanh",o,void 0)},930342:o=>{t.ac("Not",o,void 0)},930393:(o,d,m)=>{t.ac("Clip",o,{min:d,max:m})},930462:o=>{t.ac("Clip",o,void 0)},930514:(o,d)=>{t.ac("Elu",o,{alpha:d})},930572:o=>{t.ac("Gelu",o,void 0)},930624:o=>{t.ac("Relu",o,void 0)},930676:(o,d)=>{t.ac("LeakyRelu",o,{alpha:d})},930740:(o,d)=>{t.ac("ThresholdedRelu",o,{alpha:d})},930810:(o,d)=>{t.ac("Cast",o,{to:d})},930868:o=>{t.ac("Add",o,void 0)},930919:o=>{t.ac("Sub",o,void 0)},930970:o=>{t.ac("Mul",o,void 0)},931021:o=>{t.ac("Div",o,void 0)},931072:o=>{t.ac("Pow",o,void 0)},931123:o=>{t.ac("Equal",o,void 0)},931176:o=>{t.ac("Greater",o,void 0)},931231:o=>{t.ac("GreaterOrEqual",o,void 0)},931293:o=>{t.ac("Less",o,void 0)},931345:o=>{t.ac("LessOrEqual",o,void 0)},931404:(o,d,m,h,v)=>{t.ac("ReduceMean",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},931579:(o,d,m,h,v)=>{t.ac("ReduceMax",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},931753:(o,d,m,h,v)=>{t.ac("ReduceMin",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},931927:(o,d,m,h,v)=>{t.ac("ReduceProd",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},932102:(o,d,m,h,v)=>{t.ac("ReduceSum",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},932276:(o,d,m,h,v)=>{t.ac("ReduceL1",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},932449:(o,d,m,h,v)=>{t.ac("ReduceL2",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},932622:(o,d,m,h,v)=>{t.ac("ReduceLogSum",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},932799:(o,d,m,h,v)=>{t.ac("ReduceSumSquare",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},932979:(o,d,m,h,v)=>{t.ac("ReduceLogSumExp",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},933159:o=>{t.ac("Where",o,void 0)},933212:(o,d,m)=>{t.ac("Transpose",o,{perm:d?Array.from((x(),R).subarray(Number(d)>>>0,Number(m)>>>0)):[]})},933336:(o,d,m,h)=>{t.ac("DepthToSpace",o,{blocksize:d,mode:Se(m),format:h?"NHWC":"NCHW"})},933469:(o,d,m,h)=>{t.ac("DepthToSpace",o,{blocksize:d,mode:Se(m),format:h?"NHWC":"NCHW"})},933602:(o,d,m,h,v,E,C,M,W,F,ne,pe,me,_e,wt)=>{t.ac("ConvTranspose",o,{format:W?"NHWC":"NCHW",autoPad:d,dilations:[m],group:h,kernelShape:[v],pads:[E,C],strides:[M],wIsConst:()=>!!(x(),L)[F>>>0],outputPadding:ne?Array.from((x(),R).subarray(Number(ne)>>>0,Number(pe)>>>0)):[],outputShape:me?Array.from((x(),R).subarray(Number(me)>>>0,Number(_e)>>>0)):[],activation:Se(wt)})},934035:(o,d,m,h,v,E,C,M,W,F,ne,pe,me,_e)=>{t.ac("ConvTranspose",o,{format:M?"NHWC":"NCHW",autoPad:d,dilations:Array.from((x(),R).subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),group:h,kernelShape:Array.from((x(),R).subarray(Number(v)>>>0,2+(Number(v)>>>0)>>>0)),pads:Array.from((x(),R).subarray(Number(E)>>>0,4+(Number(E)>>>0)>>>0)),strides:Array.from((x(),R).subarray(Number(C)>>>0,2+(Number(C)>>>0)>>>0)),wIsConst:()=>!!(x(),L)[W>>>0],outputPadding:F?Array.from((x(),R).subarray(Number(F)>>>0,Number(ne)>>>0)):[],outputShape:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(me)>>>0)):[],activation:Se(_e)})},934696:(o,d,m,h,v,E,C,M,W,F,ne,pe,me,_e,wt)=>{t.ac("ConvTranspose",o,{format:W?"NHWC":"NCHW",autoPad:d,dilations:[m],group:h,kernelShape:[v],pads:[E,C],strides:[M],wIsConst:()=>!!(x(),L)[F>>>0],outputPadding:ne?Array.from((x(),R).subarray(Number(ne)>>>0,Number(pe)>>>0)):[],outputShape:me?Array.from((x(),R).subarray(Number(me)>>>0,Number(_e)>>>0)):[],activation:Se(wt)})},935129:(o,d,m,h,v,E,C,M,W,F,ne,pe,me,_e)=>{t.ac("ConvTranspose",o,{format:M?"NHWC":"NCHW",autoPad:d,dilations:Array.from((x(),R).subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),group:h,kernelShape:Array.from((x(),R).subarray(Number(v)>>>0,2+(Number(v)>>>0)>>>0)),pads:Array.from((x(),R).subarray(Number(E)>>>0,4+(Number(E)>>>0)>>>0)),strides:Array.from((x(),R).subarray(Number(C)>>>0,2+(Number(C)>>>0)>>>0)),wIsConst:()=>!!(x(),L)[W>>>0],outputPadding:F?Array.from((x(),R).subarray(Number(F)>>>0,Number(ne)>>>0)):[],outputShape:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(me)>>>0)):[],activation:Se(_e)})},935790:(o,d)=>{t.ac("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},935881:(o,d,m,h,v,E,C,M,W,F,ne,pe,me,_e)=>{t.ac("AveragePool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:h,storage_order:v,dilations:E?Array.from((x(),R).subarray(Number(E)>>>0,Number(C)>>>0)):[],kernel_shape:M?Array.from((x(),R).subarray(Number(M)>>>0,Number(W)>>>0)):[],pads:F?Array.from((x(),R).subarray(Number(F)>>>0,Number(ne)>>>0)):[],strides:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(me)>>>0)):[]})},936360:(o,d)=>{t.ac("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},936451:(o,d,m,h,v,E,C,M,W,F,ne,pe,me,_e)=>{t.ac("AveragePool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:h,storage_order:v,dilations:E?Array.from((x(),R).subarray(Number(E)>>>0,Number(C)>>>0)):[],kernel_shape:M?Array.from((x(),R).subarray(Number(M)>>>0,Number(W)>>>0)):[],pads:F?Array.from((x(),R).subarray(Number(F)>>>0,Number(ne)>>>0)):[],strides:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(me)>>>0)):[]})},936930:(o,d)=>{t.ac("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},937017:(o,d,m,h,v,E,C,M,W,F,ne,pe,me,_e)=>{t.ac("MaxPool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:h,storage_order:v,dilations:E?Array.from((x(),R).subarray(Number(E)>>>0,Number(C)>>>0)):[],kernel_shape:M?Array.from((x(),R).subarray(Number(M)>>>0,Number(W)>>>0)):[],pads:F?Array.from((x(),R).subarray(Number(F)>>>0,Number(ne)>>>0)):[],strides:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(me)>>>0)):[]})},937492:(o,d)=>{t.ac("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},937579:(o,d,m,h,v,E,C,M,W,F,ne,pe,me,_e)=>{t.ac("MaxPool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:h,storage_order:v,dilations:E?Array.from((x(),R).subarray(Number(E)>>>0,Number(C)>>>0)):[],kernel_shape:M?Array.from((x(),R).subarray(Number(M)>>>0,Number(W)>>>0)):[],pads:F?Array.from((x(),R).subarray(Number(F)>>>0,Number(ne)>>>0)):[],strides:pe?Array.from((x(),R).subarray(Number(pe)>>>0,Number(me)>>>0)):[]})},938054:(o,d,m,h,v)=>{t.ac("Gemm",o,{alpha:d,beta:m,transA:h,transB:v})},938158:o=>{t.ac("MatMul",o,void 0)},938212:(o,d,m,h)=>{t.ac("ArgMax",o,{keepDims:!!d,selectLastIndex:!!m,axis:h})},938320:(o,d,m,h)=>{t.ac("ArgMin",o,{keepDims:!!d,selectLastIndex:!!m,axis:h})},938428:(o,d)=>{t.ac("Softmax",o,{axis:d})},938491:(o,d)=>{t.ac("Concat",o,{axis:d})},938551:(o,d,m,h,v)=>{t.ac("Split",o,{axis:d,numOutputs:m,splitSizes:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},938707:o=>{t.ac("Expand",o,void 0)},938761:(o,d)=>{t.ac("Gather",o,{axis:Number(d)})},938832:(o,d)=>{t.ac("GatherElements",o,{axis:Number(d)})},938911:(o,d)=>{t.ac("GatherND",o,{batch_dims:Number(d)})},938990:(o,d,m,h,v,E,C,M,W,F,ne)=>{t.ac("Resize",o,{antialias:d,axes:m?Array.from((x(),R).subarray(Number(m)>>>0,Number(h)>>>0)):[],coordinateTransformMode:Se(v),cubicCoeffA:E,excludeOutside:C,extrapolationValue:M,keepAspectRatioPolicy:Se(W),mode:Se(F),nearestMode:Se(ne)})},939352:(o,d,m,h,v,E,C)=>{t.ac("Slice",o,{starts:d?Array.from((x(),R).subarray(Number(d)>>>0,Number(m)>>>0)):[],ends:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[],axes:E?Array.from((x(),R).subarray(Number(E)>>>0,Number(C)>>>0)):[]})},939616:o=>{t.ac("Tile",o,void 0)},939668:(o,d,m)=>{t.ac("InstanceNormalization",o,{epsilon:d,format:m?"NHWC":"NCHW"})},939782:(o,d,m)=>{t.ac("InstanceNormalization",o,{epsilon:d,format:m?"NHWC":"NCHW"})},939896:o=>{t.ac("Range",o,void 0)},939949:(o,d)=>{t.ac("Einsum",o,{equation:Se(d)})},940030:(o,d,m,h,v)=>{t.ac("Pad",o,{mode:d,value:m,pads:h?Array.from((x(),R).subarray(Number(h)>>>0,Number(v)>>>0)):[]})},940173:(o,d,m,h,v,E)=>{t.ac("BatchNormalization",o,{epsilon:d,momentum:m,spatial:!!v,trainingMode:!!h,format:E?"NHWC":"NCHW"})},940342:(o,d,m,h,v,E)=>{t.ac("BatchNormalization",o,{epsilon:d,momentum:m,spatial:!!v,trainingMode:!!h,format:E?"NHWC":"NCHW"})},940511:(o,d,m)=>{t.ac("CumSum",o,{exclusive:Number(d),reverse:Number(m)})},940608:(o,d,m)=>{t.ac("DequantizeLinear",o,{axis:d,blockSize:m})},940698:(o,d,m,h,v)=>{t.ac("GridSample",o,{align_corners:d,mode:Se(m),padding_mode:Se(h),format:v?"NHWC":"NCHW"})},940868:(o,d,m,h,v)=>{t.ac("GridSample",o,{align_corners:d,mode:Se(m),padding_mode:Se(h),format:v?"NHWC":"NCHW"})},941038:(o,d)=>{t.ac("ScatterND",o,{reduction:Se(d)})},941123:(o,d,m,h,v,E,C,M,W)=>{t.ac("Attention",o,{numHeads:d,isUnidirectional:m,maskFilterValue:h,scale:v,doRotary:E,qkvHiddenSizes:C?Array.from((x(),R).subarray(Number(M)>>>0,Number(M)+C>>>0)):[],pastPresentShareBuffer:!!W})},941395:o=>{t.ac("BiasAdd",o,void 0)},941450:o=>{t.ac("BiasSplitGelu",o,void 0)},941511:o=>{t.ac("FastGelu",o,void 0)},941567:(o,d,m,h,v,E,C,M,W,F,ne,pe,me,_e,wt,Pi)=>{t.ac("Conv",o,{format:pe?"NHWC":"NCHW",auto_pad:d,dilations:m?Array.from((x(),R).subarray(Number(m)>>>0,Number(h)>>>0)):[],group:v,kernel_shape:E?Array.from((x(),R).subarray(Number(E)>>>0,Number(C)>>>0)):[],pads:M?Array.from((x(),R).subarray(Number(M)>>>0,Number(W)>>>0)):[],strides:F?Array.from((x(),R).subarray(Number(F)>>>0,Number(ne)>>>0)):[],w_is_const:()=>!!(x(),L)[Number(me)>>>0],activation:Se(_e),activation_params:wt?Array.from((x(),G).subarray(Number(wt)>>>0,Number(Pi)>>>0)):[]})},942151:o=>{t.ac("Gelu",o,void 0)},942203:(o,d,m,h,v,E,C,M,W)=>{t.ac("GroupQueryAttention",o,{numHeads:d,kvNumHeads:m,scale:h,softcap:v,doRotary:E,rotaryInterleaved:C,smoothSoftmax:M,localWindowSize:W})},942420:(o,d,m,h)=>{t.ac("LayerNormalization",o,{axis:d,epsilon:m,simplified:!!h})},942531:(o,d,m,h)=>{t.ac("LayerNormalization",o,{axis:d,epsilon:m,simplified:!!h})},942642:(o,d,m,h,v,E)=>{t.ac("MatMulNBits",o,{k:d,n:m,accuracyLevel:h,bits:v,blockSize:E})},942769:(o,d,m,h,v,E)=>{t.ac("MultiHeadAttention",o,{numHeads:d,isUnidirectional:m,maskFilterValue:h,scale:v,doRotary:E})},942928:(o,d)=>{t.ac("QuickGelu",o,{alpha:d})},942992:(o,d,m,h,v)=>{t.ac("RotaryEmbedding",o,{interleaved:!!d,numHeads:m,rotaryEmbeddingDim:h,scale:v})},943131:(o,d,m)=>{t.ac("SkipLayerNormalization",o,{epsilon:d,simplified:!!m})},943233:(o,d,m)=>{t.ac("SkipLayerNormalization",o,{epsilon:d,simplified:!!m})},943335:(o,d,m,h)=>{t.ac("GatherBlockQuantized",o,{gatherAxis:d,quantizeAxis:m,blockSize:h})},943456:o=>{t.Id(o)},943490:(o,d)=>t.Kd(Number(o),Number(d),t.$c.Nd,t.$c.errors)};function Ig(o,d,m){return ps(async()=>{await t.Gd(Number(o),Number(d),Number(m))})}function Cg(){return typeof wasmOffsetConverter<"u"}function zg(o,d,m,h){var v=oe();try{return js(o,d,m,h)}catch(E){if(se(v),E!==E+0)throw E;ue(1,0)}}function Ag(o,d,m){var h=oe();try{return Vs(o,d,m)}catch(v){if(se(h),v!==v+0)throw v;ue(1,0)}}function Og(o,d,m){var h=oe();try{Us(o,d,m)}catch(v){if(se(h),v!==v+0)throw v;ue(1,0)}}function Rg(o,d){var m=oe();try{return Bi(o,d)}catch(h){if(se(m),h!==h+0)throw h;ue(1,0)}}function Mg(o){var d=oe();try{Ls(o)}catch(m){if(se(d),m!==m+0)throw m;ue(1,0)}}function Ng(o,d,m,h,v,E,C){var M=oe();try{return Fs(o,d,m,h,v,E,C)}catch(W){if(se(M),W!==W+0)throw W;ue(1,0)}}function Bg(o,d){var m=oe();try{Ks(o,d)}catch(h){if(se(m),h!==h+0)throw h;ue(1,0)}}function Dg(o,d,m,h,v,E){var C=oe();try{qs(o,d,m,h,v,E)}catch(M){if(se(C),M!==M+0)throw M;ue(1,0)}}function Pg(o,d,m,h){var v=oe();try{Hs(o,d,m,h)}catch(E){if(se(v),E!==E+0)throw E;ue(1,0)}}function Ug(o,d,m,h,v){var E=oe();try{Ws(o,d,m,h,v)}catch(C){if(se(E),C!==C+0)throw C;ue(1,0)}}function Lg(o,d,m,h,v,E,C){var M=oe();try{Ys(o,d,m,h,v,E,C)}catch(W){if(se(M),W!==W+0)throw W;ue(1,0)}}function qg(o,d,m,h,v,E,C){var M=oe();try{Qs(o,d,m,h,v,E,C)}catch(W){if(se(M),W!==W+0)throw W;ue(1,0)}}function Wg(o,d,m,h,v,E,C,M){var W=oe();try{to(o,d,m,h,v,E,C,M)}catch(F){if(se(W),F!==F+0)throw F;ue(1,0)}}function Vg(o,d,m,h,v){var E=oe();try{return Xs(o,d,m,h,v)}catch(C){if(se(E),C!==C+0)throw C;ue(1,0)}}function Gg(o,d,m,h,v,E,C,M){var W=oe();try{ro(o,d,m,h,v,E,C,M)}catch(F){if(se(W),F!==F+0)throw F;ue(1,0)}}function Fg(o,d,m,h,v,E,C,M,W,F,ne,pe){var me=oe();try{Zs(o,d,m,h,v,E,C,M,W,F,ne,pe)}catch(_e){if(se(me),_e!==_e+0)throw _e;ue(1,0)}}function Hg(o,d,m,h,v,E){var C=oe();try{return Js(o,d,m,h,v,E)}catch(M){if(se(C),M!==M+0)throw M;ue(1,0)}}function jg(o,d,m){var h=oe();try{return io(o,d,m)}catch(v){if(se(h),v!==v+0)throw v;return ue(1,0),0n}}function Kg(o,d,m,h,v,E,C,M,W){var F=oe();try{Gs(o,d,m,h,v,E,C,M,W)}catch(ne){if(se(F),ne!==ne+0)throw ne;ue(1,0)}}function Xg(o){var d=oe();try{return no(o)}catch(m){if(se(d),m!==m+0)throw m;ue(1,0)}}function Yg(o,d,m){var h=oe();try{return ao(o,d,m)}catch(v){if(se(h),v!==v+0)throw v;ue(1,0)}}function Qg(o,d){var m=oe();try{return $o(o,d)}catch(h){if(se(m),h!==h+0)throw h;return ue(1,0),0n}}function Zg(o,d,m,h,v){var E=oe();try{so(o,d,m,h,v)}catch(C){if(se(E),C!==C+0)throw C;ue(1,0)}}function Jg(o){var d=oe();try{return oo(o)}catch(m){if(se(d),m!==m+0)throw m;return ue(1,0),0n}}function e0(o,d,m,h,v,E){var C=oe();try{return fo(o,d,m,h,v,E)}catch(M){if(se(C),M!==M+0)throw M;ue(1,0)}}function t0(o,d,m,h,v,E){var C=oe();try{return mo(o,d,m,h,v,E)}catch(M){if(se(C),M!==M+0)throw M;ue(1,0)}}function r0(o,d,m,h,v,E,C,M){var W=oe();try{return eo(o,d,m,h,v,E,C,M)}catch(F){if(se(W),F!==F+0)throw F;ue(1,0)}}function i0(o,d,m,h,v){var E=oe();try{return go(o,d,m,h,v)}catch(C){if(se(E),C!==C+0)throw C;return ue(1,0),0n}}function n0(o,d,m,h){var v=oe();try{return yo(o,d,m,h)}catch(E){if(se(v),E!==E+0)throw E;ue(1,0)}}function a0(o,d,m,h){var v=oe();try{return _o(o,d,m,h)}catch(E){if(se(v),E!==E+0)throw E;ue(1,0)}}function s0(o,d,m,h,v,E,C,M,W,F,ne,pe){var me=oe();try{return wo(o,d,m,h,v,E,C,M,W,F,ne,pe)}catch(_e){if(se(me),_e!==_e+0)throw _e;ue(1,0)}}function o0(o,d,m,h,v,E,C,M,W,F,ne){var pe=oe();try{co(o,d,m,h,v,E,C,M,W,F,ne)}catch(me){if(se(pe),me!==me+0)throw me;ue(1,0)}}function u0(o,d,m,h,v,E,C,M,W,F,ne,pe,me,_e,wt,Pi){var f0=oe();try{ho(o,d,m,h,v,E,C,M,W,F,ne,pe,me,_e,wt,Pi)}catch(Ui){if(se(f0),Ui!==Ui+0)throw Ui;ue(1,0)}}function l0(o,d,m,h){var v=oe();try{return bo(o,d,m,h)}catch(E){if(se(v),E!==E+0)throw E;ue(1,0)}}function d0(o,d,m,h,v){var E=oe();try{return vo(o,d,m,h,v)}catch(C){if(se(E),C!==C+0)throw C;ue(1,0)}}function p0(o,d,m){var h=oe();try{return uo(o,d,m)}catch(v){if(se(h),v!==v+0)throw v;ue(1,0)}}function c0(o,d,m){var h=oe();try{return lo(o,d,m)}catch(v){if(se(h),v!==v+0)throw v;ue(1,0)}}function h0(o,d,m,h){var v=oe();try{po(o,d,m,h)}catch(E){if(se(v),E!==E+0)throw E;ue(1,0)}}function Dr(){if(0<we)Ne=Dr;else if(n)b?.(t),ee();else{for(var o=Te;0<o.length;)o.shift()(t);0<we?Ne=Dr:(t.calledRun=!0,z||(ee(),b?.(t)))}}return n||(lt=await $e(),Dr()),t.PTR_SIZE=4,B?t:new Promise((o,d)=>{b=o,T=d})}var Np,Co,P0=U(()=>{Np=Io,Co=globalThis.self?.name?.startsWith("em-pthread"),Co&&Io()}),Fi,Un,zo,Pe,Bp,Ur,Ao,Oo,Hi,Ro,ji,Dp,Ki,Pp,sa=U(()=>{aa(),Fi=typeof location>"u"?void 0:location.origin,Un=import.meta.url>"file:"&&import.meta.url<"file;",zo=()=>{{if(Un){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Fi).href}return import.meta.url}},Pe=zo(),Bp=()=>{if(Pe&&!Pe.startsWith("blob:"))return Pe.substring(0,Pe.lastIndexOf("/")+1)},Ur=(e,t)=>{try{let r=t??Pe;return(r?new URL(e,r):new URL(e)).origin===Fi}catch{return!1}},Ao=(e,t)=>{let r=t??Pe;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},Oo=(e,t)=>`${t??"./"}${e}`,Hi=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},Ro=async e=>(await import(e)).default,ji=(D0(),xr(Op)).default,Dp=async()=>{if(!Pe)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Ur(Pe))return[void 0,ji()];let e=await Hi(Pe);return[e,ji(e)]},Ki=(P0(),xr(Mp)).default,Pp=async(e,t,r,i)=>{let n=Ki&&!(e||t);if(n)if(Pe)n=Ur(Pe);else if(i&&!r)n=!0;else throw new Error("cannot determine the script source URL.");if(n)return[void 0,Ki];{let a="ort-wasm-simd-threaded.jsep.mjs",s=e??Ao(a,t),u=r&&s&&!Ur(s,t),l=u?await Hi(s):s??Oo(a,t);return[u?l:void 0,await Ro(l)]}}}),Xi,Lr,or,Yi,Mo,No,Bo,oa,ye,Ft=U(()=>{sa(),Lr=!1,or=!1,Yi=!1,Mo=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},No=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Bo=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},oa=async e=>{if(Lr)return Promise.resolve();if(or)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Yi)throw new Error("previous call to 'initializeWebAssembly()' failed.");or=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Bo())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!No())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=Mo();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let n=e.wasmPaths,a=typeof n=="string"?n:void 0,s=n?.mjs,u=s?.href??s,l=n?.wasm,p=l?.href??l,c=e.wasmBinary,[f,g]=await Pp(u,a,r>1,!!c||!!p),y=!1,_=[];if(t>0&&_.push(new Promise(b=>{setTimeout(()=>{y=!0,b()},t)})),_.push(new Promise((b,T)=>{let $={numThreads:r};if(c)$.wasmBinary=c;else if(p||a)$.locateFile=w=>p??a+w;else if(u&&u.indexOf("blob:")!==0)$.locateFile=w=>new URL(w,u).href;else if(f){let w=Bp();w&&($.locateFile=k=>w+k)}g($).then(w=>{or=!1,Lr=!0,Xi=w,b(),f&&URL.revokeObjectURL(f)},w=>{or=!1,Yi=!0,T(w)})})),await Promise.race(_),y)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},ye=()=>{if(Lr&&Xi)return Xi;throw new Error("WebAssembly is not initialized yet.")}}),Qe,ni,fe,ua=U(()=>{Ft(),Qe=(e,t)=>{let r=ye(),i=r.lengthBytesUTF8(e)+1,n=r._malloc(i);return r.stringToUTF8(e,n,i),t.push(n),n},ni=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([n,a])=>{let s=t?t+n:n;if(typeof a=="object")ni(a,s+".",r,i);else if(typeof a=="string"||typeof a=="number")i(s,a.toString());else if(typeof a=="boolean")i(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},fe=e=>{let t=ye(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetLastError(n,n+i);let a=Number(t.getValue(n,i===4?"i32":"i64")),s=t.getValue(n+i,"*"),u=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}}),Up,U0=U(()=>{Ft(),ua(),Up=e=>{let t=ye(),r=0,i=[],n=e||{};try{if(e?.logSeverityLevel===void 0)n.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)n.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(n.terminate=!1);let a=0;return e?.tag!==void 0&&(a=Qe(e.tag,i)),r=t._OrtCreateRunOptions(n.logSeverityLevel,n.logVerbosityLevel,!!n.terminate,a),r===0&&fe("Can't create run options."),e?.extra!==void 0&&ni(e.extra,"",new WeakSet,(s,u)=>{let l=Qe(s,i),p=Qe(u,i);t._OrtAddRunConfigEntry(r,l,p)!==0&&fe(`Can't set a run config entry: ${s} - ${u}.`)}),[r,i]}catch(a){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(s=>t._free(s)),a}}}),Do,Po,Uo,ur,Lo,Lp,L0=U(()=>{Ft(),ua(),Do=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Po=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Uo=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},ur=(e,t,r,i)=>{let n=Qe(t,i),a=Qe(r,i);ye()._OrtAddSessionConfigEntry(e,n,a)!==0&&fe(`Can't set a session config entry: ${t} - ${r}.`)},Lo=async(e,t,r)=>{let i=t.executionProviders;for(let n of i){let a=typeof n=="string"?n:n.name,s=[];switch(a){case"webnn":if(a="WEBNN",typeof n!="string"){let f=n?.deviceType;f&&ur(e,"deviceType",f,r)}break;case"webgpu":if(a="JS",typeof n!="string"){let f=n;if(f?.preferredLayout){if(f.preferredLayout!=="NCHW"&&f.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${f.preferredLayout}`);ur(e,"preferredLayout",f.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let u=Qe(a,r),l=s.length,p=0,c=0;if(l>0){p=ye()._malloc(l*ye().PTR_SIZE),r.push(p),c=ye()._malloc(l*ye().PTR_SIZE),r.push(c);for(let f=0;f<l;f++)ye().setValue(p+f*ye().PTR_SIZE,s[f][0],"*"),ye().setValue(c+f*ye().PTR_SIZE,s[f][1],"*")}await ye()._OrtAppendExecutionProvider(e,u,p,c,l)!==0&&fe(`Can't append execution provider: ${a}.`)}},Lp=async e=>{let t=ye(),r=0,i=[],n=e||{};Uo(n);try{let a=Do(n.graphOptimizationLevel??"all"),s=Po(n.executionMode??"sequential"),u=typeof n.logId=="string"?Qe(n.logId,i):0,l=n.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let p=n.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let c=typeof n.optimizedModelFilePath=="string"?Qe(n.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(a,!!n.enableCpuMemArena,!!n.enableMemPattern,s,!!n.enableProfiling,0,u,l,p,c),r===0&&fe("Can't create session options."),n.executionProviders&&await Lo(r,n,i),n.enableGraphCapture!==void 0){if(typeof n.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);ur(r,"enableGraphCapture",n.enableGraphCapture.toString(),i)}if(n.freeDimensionOverrides)for(let[f,g]of Object.entries(n.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof g!="number"||!Number.isInteger(g)||g<0)throw new Error(`free dimension override value must be a non-negative integer: ${g}`);let y=Qe(f,i);t._OrtAddFreeDimensionOverride(r,y,g)!==0&&fe(`Can't set a free dimension override: ${f} - ${g}.`)}return n.extra!==void 0&&ni(n.extra,"",new WeakSet,(f,g)=>{ur(r,f,g,i)}),[r,i]}catch(a){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&fe("Can't release session options."),i.forEach(s=>t._free(s)),a}}}),Bt,pt,Dt,hi,ai,la,da,Ln,te=U(()=>{Bt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},pt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Dt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((n,a)=>n*a,1);return r>0?Math.ceil(i*r):void 0},hi=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},ai=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},la=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",da=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ln=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),pa,qp=U(()=>{aa(),pa=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),a;try{a=new ArrayBuffer(i)}catch(u){if(u instanceof RangeError){let l=Math.ceil(i/65536);a=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw u}let s=0;for(;;){let{done:u,value:l}=await n.read();if(u)break;let p=l.byteLength;new Uint8Array(a,s,p).set(l),s+=p}return new Uint8Array(a,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),qo,Wo,Vo,Go,ca,Fo,de,ft=U(()=>{te(),qo=["V","I","W","E","F"],Wo=(e,t)=>{console.log(`[${qo[e]},${new Date().toISOString()}]${t}`)},ca=(e,t)=>{Vo=e,Go=t},Fo=(e,t)=>{let r=ai(e),i=ai(Vo);r>=i&&Wo(r,typeof t=="function"?t():t)},de=(...e)=>{Go&&Fo(...e)}}),Ho,Jt,O,si,Wp,Vp,Gp,re=U(()=>{Ho=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Jt=class{static calcShape(e,t,r=!1){let i=e.length,n=t.length;if(i===0)return t;if(n===0)return e;let a=Math.max(e.length,t.length),s=new Array(a);if(r){if(i<2||n<2)return;let u=Ho.calcMatMulShape([e[i-2],e[i-1]],[t[n-2],t[n-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=r?3:1;u<=a;u++){let l=i-u<0?1:e[i-u],p=n-u<0?1:t[n-u];if(l!==p&&l>1&&p>1)return;let c=Math.max(l,p);if(l&&p)s[a-u]=Math.max(l,p);else{if(c>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let n=1;n<=r;n++)if(e[r-n]!==1&&e[r-n]!==t[i-n])return!1;return!0}},O=class Zr{static size(t){return Zr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let n=new Array(i),a=i-1;for(;a>=0;){if(t[a]%r===0){n[a]=t[a]/r;break}if(r%t[a]!==0)throw new Error("cannot convert shape");n[a]=1,r/=t[a],a--}for(a--;a>=0;a--)n[a]=t[a];return n}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Zr.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Zr.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let n=1;for(let a=r;a<i;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(t[a])}return n}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let n=r-3;n>=0;--n)i[n]=i[n+1]*t[n+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((n,a)=>n+r[a]+r[a+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,n)=>i===r[n])}},si=class wr{static adjustPoolAttributes(t,r,i,n,a,s){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=i.length?i.push(r[u+2]):i[u]=r[u+2];for(let u=0;u<i.length;u++)if(u<n.length){if(n[u]<0)throw new Error("strides should be greater than or equal to 1")}else n.push(1);for(let u=0;u<i.length;u++)if(u<a.length){if(a[u]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let u=0;u<i.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<i.length;u++){if(i[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=i[u]||s[u+i.length]>=i[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,n,a,s,u){if(u){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)wr.adjustPadAndReturnShape(t[l+(s?1:2)],r[l],i[l],n[l],a,l,l+t.length-2,u)}}static computePoolOutputShape(t,r,i,n,a,s,u){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return wr.computeShapeHelper(t,r,l,i,n,a,s,u),l}static computeConvOutputShape(t,r,i,n,a,s,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return wr.computeShapeHelper(!1,t,l,i,n,a,s,u),l}static computeShapeHelper(t,r,i,n,a,s,u,l){if(t)for(let p=0;p<r.length-2;p++)i.push(1);else for(let p=0;p<r.length-2;p++)i.push(wr.adjustPadAndReturnShape(r[p+2],n[p],a[p],s[p],u,p,p+r.length-2,l))}static adjustPadAndReturnShape(t,r,i,n,a,s,u,l){let p=i*(n-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return a[s]=0,a[u]=0,Math.floor((t-p)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((t+r-1)/r-1)*r+n-t;return a[s]=Math.floor(l==="SAME_LOWER"?(c+1)/2:c/2),a[u]=c-a[s],Math.floor((t+c-n)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+a[s]+a[u]-p)/r+1)}},Wp=class{static getShapeOfGemmResult(e,t,r,i,n){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let a,s,u;t?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(i?(u=r[0],l=1):(u=r[1],l=0),r[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(n&&!Jt.isValidBroadcast(n,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},Vp=-34028234663852886e22,Gp=34028234663852886e22}),ha,Fp=U(()=>{te(),ha=(e,t)=>new(hi(t))(e)}),Qi,qn,Zi,jo,Ji,Ko,en,tn,rn,Xo,Hp,q0=U(()=>{te(),ft(),Qi=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),qn=(e,t)=>{if(t==="int32")return e;let r=Qi.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let n=e.byteLength/i,a=new(hi(t))(e.buffer,e.byteOffset,n);switch(t){case"int64":case"uint64":{let s=new Int32Array(n);for(let u=0;u<n;u++){let l=a[u];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[u]=Number(l)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(a,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Zi=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let n=BigInt64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"uint64":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let n=BigUint64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"int8":{if(i.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let n=Int8Array.from(i,Number);return new Uint8Array(n.buffer)}case"uint8":{if(i.some(n=>n<0||n>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let n=Uint32Array.from(i,Number);return new Uint8Array(n.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},jo=1,Ji=()=>jo++,Ko=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),en=(e,t)=>{let r=Qi.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,n)=>i*n)*r/8):0},tn=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:n,shape:a,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=n,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return en(this.dataType,this.tensorShape)}destroy(){de("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=Zi(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return r.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,n)=>i===r[n])}setIsDataConverted(e){this.isDataConverted=e}},rn=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let n=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),s;if(!a?.input.dataTypes.includes(t)){if(s=Ko.get(t),!s||a?.input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${t}`);de("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(n,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==en(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,u,!0,!0,s),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=qn(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else de("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Zi(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Xo=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Ji();return this.tensorTrackersById.set(e,new rn(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,n){de("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${n}}`);let a=this.tensorTrackersById.get(t);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,r,i,n)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){de("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let n=this.getMLContext(e),a=Ji(),s=new tn({sessionId:e,context:n,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(a,new rn(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,t,r,i,n,a,s){let u=this.getMLContext(e);for(let[p,c]of this.freeTensors.entries())if(c.canReuseTensor(u,t,r)){de("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}`);let f=this.freeTensors.splice(p,1)[0];return f.sessionId=e,f}de("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}}`);let l=await u.createTensor({dataType:s??t,shape:r,dimensions:r,usage:i,writable:n,readable:a});return new tn({sessionId:e,context:u,tensor:l,dataType:t,shape:r,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Hp=(...e)=>new Xo(...e)}),lr,Yo,jp,W0=U(()=>{te(),Ft(),Fp(),q0(),ft(),lr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Yo=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((n,a)=>n===i[a]&&e[n]===t[n])},jp=class{constructor(e){this.tensorManager=Hp(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,ca(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){de("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){de("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)de("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>Yo(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(n=>n.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){de("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,n){let a=lr.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,i,n)}async createTemporaryTensor(e,t,r){de("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=lr.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,n,i,r,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(n):this.temporarySessionTensorIds.set(e,[n]),n}uploadTensor(e,t){if(!ye().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");de("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return ha(r,t)}}registerMLTensor(e,t,r,i){let n=lr.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);let a=this.tensorManager.registerTensor(e,t,n,i);return de("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${n}, dimensions: ${i}} -> {tensorId: ${a}}`),a}registerMLConstant(e,t,r,i,n,a,s=!1){if(!a)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=a.get(u);if(!l)throw new Error(`File with name ${u} not found in preloaded files.`);if(t+r>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let p=l.slice(t,t+r).buffer,c;switch(n.dataType){case"float32":c=new Float32Array(p);break;case"float16":c=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(p):new Uint16Array(p);break;case"int32":c=new Int32Array(p);break;case"uint32":c=new Uint32Array(p);break;case"int64":if(s){let f=qn(new Uint8Array(p),"int64");c=new Int32Array(f.buffer),n.dataType="int32"}else c=new BigInt64Array(p);break;case"uint64":c=new BigUint64Array(p);break;case"int8":c=new Int8Array(p);break;case"int4":case"uint4":case"uint8":c=new Uint8Array(p);break;default:throw new Error(`Unsupported data type: ${n.dataType} in creating WebNN Constant from external data.`)}return de("verbose",()=>`[WebNN] registerMLConstant {dataType: ${n.dataType}, shape: ${n.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(n,c)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=lr.get(Bt(t)),n=this.mlOpSupportLimitsBySessionId.get(e);return typeof i>"u"?!1:r?!!n?.input.dataTypes.includes(i):!!n?.output.dataTypes.includes(i)}flush(){}}}),fa=U(()=>{}),nn,qr,Wr,Qo,Zo,an,Wn,Jo,Kp,V0=U(()=>{ft(),fa(),nn=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),qr=[],Wr=e=>Math.ceil(Number(e)/16)*16,Qo=e=>{for(let t=0;t<qr.length;t++){let r=qr[t];if(e<=r)return r}return Math.ceil(e/16)*16},Zo=1,an=()=>Zo++,Wn=async(e,t,r,i)=>{let n=Wr(r),a=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,n),e.flush(),await a.mapAsync(GPUMapMode.READ);let u=a.getMappedRange();if(i){let l=i();return l.set(new Uint8Array(u,0,r)),l}else return new Uint8Array(u.slice(0,r))}finally{a.destroy()}},Jo=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of nn)qr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,n=t.byteLength,a=Wr(n),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==n)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${n}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(r,i,n)),u.unmap();let p=this.backend.device.createCommandEncoder();p.copyBufferToBuffer(u,0,s.gpuData.buffer,0,a),this.backend.device.queue.submit([p.finish()]),u.destroy(),de("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let n=Wr(r.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,n)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=an();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),de("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Qo(e),i,n=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||a){let u=(n?this.freeBuffers:this.freeUniformBuffers).get(r);u?u.length>0?i=u.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let s={id:an(),type:0,buffer:i};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),de("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return de("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Wn(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=nn.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(de("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Kp=(...e)=>new Jo(...e)}),eu,he,xe=U(()=>{eu=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},he=e=>new eu(e)}),er,Vr,Ee,Re,Q,ve,Vn,Qt,Et,Y,dr,N,K,Xp,ma,tu,Yp,ie=U(()=>{te(),re(),er=64,Vr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Ee=(e,t=1)=>{let r=Vr(e,t);return typeof r=="string"?r:r[0]},Re=(e,t=1)=>{let r=Vr(e,t);return typeof r=="string"?r:r[1]},Q=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:O.computeStrides(r)})}),t},ve=e=>e%4===0?4:e%2===0?2:1,Vn=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Qt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Et=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,Y=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,dr=(e,t,r,i,n)=>{let a=typeof r=="number",s=a?r:r.length,u=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,p=Vr(t,n),c=typeof p=="string"?p:p[1],f=typeof p=="string"?p:p[0],g={indices:l,value:c,storage:f,tensor:t},y=B=>typeof B=="string"?B:`${B}u`,_={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},b=a?"uniforms.":"",T=`${b}${e}_shape`,$=`${b}${e}_strides`,w="";for(let B=0;B<s-1;B++)w+=`
    let dim${B} = current / ${Y($,B,s)};
    let rest${B} = current % ${Y($,B,s)};
    indices[${B}] = dim${B};
    current = rest${B};
    `;w+=`indices[${s-1}] = current;`;let k=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${w}
    return indices;
  }`,S=B=>(_.offsetToIndices=!0,s<2?B:`o2i_${e}(${B})`),I=[];if(s>=2)for(let B=s-1;B>=0;B--)I.push(`${Y($,B,s)} * (indices[${B}])`);let z=s<2?"":`
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${I.join("+")};
  }`,A=B=>(_.indicesToOffset=!0,s<2?B:`i2o_${e}(${B})`),x=(...B)=>s===0?"0u":`${g.indices}(${B.map(y).join(",")})`,P=(B,V)=>s<2?`${B}`:`${Y(B,V,s)}`,L=(B,V,ee)=>s<2?`${B}=${ee};`:`${Y(B,V,s)}=${ee};`,H={},q=(B,V)=>{_.broadcastedIndicesToOffset=!0;let ee=`${V.name}broadcastedIndicesTo${e}Offset`;if(ee in H)return`${ee}(${B})`;let ae=[];for(let Oe=s-1;Oe>=0;Oe--){let $e=V.indicesGet("outputIndices",Oe+V.rank-s);ae.push(`${P($,Oe)} * (${$e} % ${P(T,Oe)})`)}return H[ee]=`fn ${ee}(outputIndices: ${V.type.indices}) -> u32 {
             return ${ae.length>0?ae.join("+"):"0u"};
           }`,`${ee}(${B})`},j=(B,V)=>(()=>{if(g.storage===g.value)return`${e}[${B}]=${V};`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`${e}[${B}]=vec2<u32>(u32(${V}), select(0u, 0xFFFFFFFFu, ${V} < 0));`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`${e}[${B}]=vec2<u32>(u32(${V}), 0u);`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`${e}[${B}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${V}));`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),R=B=>(()=>{if(g.storage===g.value)return`${e}[${B}]`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`i32(${e}[${B}].x)`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`u32(${e}[${B}].x)`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${B}] & 0xFFu), bool(${e}[${B}] & 0xFF00u), bool(${e}[${B}] & 0xFF0000u), bool(${e}[${B}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),D=s<2?"":`
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${c} {
    return ${R(`i2o_${e}(indices)`)};
  }`,G=s<2?"":(()=>{let B=u.map(ee=>`d${ee}: u32`).join(", "),V=u.map(ee=>`d${ee}`).join(", ");return`
  fn get_${e}(${B}) -> ${c} {
    return get_${e}ByIndices(${x(V)});
  }`})(),J=(...B)=>{if(B.length!==s)throw new Error(`indices length must be ${s}`);let V=B.map(y).join(",");return s===0?R("0u"):s===1?R(V[0]):(_.get=!0,_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}(${V})`)},X=B=>s<2?R(B):(_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}ByIndices(${B})`),Z=s<2?"":`
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${c}) {
    ${j(`i2o_${e}(indices)`,"value")}
  }`,le=s<2?"":(()=>{let B=u.map(ee=>`d${ee}: u32`).join(", "),V=u.map(ee=>`d${ee}`).join(", ");return`
  fn set_${e}(${B}, value: ${c}) {
    set_${e}ByIndices(${x(V)}, value);
  }`})();return{impl:()=>{let B=[],V=!1;return _.offsetToIndices&&(B.push(k),V=!0),_.indicesToOffset&&(B.push(z),V=!0),_.broadcastedIndicesToOffset&&(Object.values(H).forEach(ee=>B.push(ee)),V=!0),_.set&&(B.push(le),V=!0),_.setByIndices&&(B.push(Z),V=!0),_.get&&(B.push(G),V=!0),_.getByIndices&&(B.push(D),V=!0),!a&&V&&B.unshift(`const ${T} = ${g.indices}(${r.join(",")});`,`const ${$} = ${g.indices}(${O.computeStrides(r).join(",")});`),B.join(`
`)},type:g,offsetToIndices:S,indicesToOffset:A,broadcastedIndicesToOffset:q,indices:x,indicesGet:P,indicesSet:L,set:(...B)=>{if(B.length!==s+1)throw new Error(`indices length must be ${s}`);let V=B[s];if(typeof V!="string")throw new Error("value must be string");let ee=B.slice(0,s).map(y).join(",");return s===0?j("0u",V):s===1?j(ee[0],V):(_.set=!0,_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}(${ee}, ${V})`)},setByOffset:j,setByIndices:(B,V)=>s<2?j(B,V):(_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}ByIndices(${B}, ${V});`),get:J,getByOffset:R,getByIndices:X,usage:i,name:e,strides:$,shape:T,rank:s}},N=(e,t,r,i=1)=>dr(e,t,r,"input",i),K=(e,t,r,i=1)=>dr(e,t,r,"output",i),Xp=(e,t,r)=>dr(e,t,r,"atomicOutput",1),ma=(e,t,r,i=1)=>dr(e,t,r,"internal",i),tu=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=er){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let n=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${n}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Yp=(e,t)=>new tu(e,t)}),ru,sn,iu,nu,au,su,Le,Qp,Zp,kt=U(()=>{te(),re(),xe(),ie(),ru=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},sn=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),iu=(e,t)=>O.sortBasedOnPerm(e,sn(e.length,t)),nu=(e,t,r,i)=>{let n=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let a=0;a<t;++a)n+=`a[${e[a]}]=i[${a}];`;return n+="return a;}"},au=(e,t)=>{let r=[],i=[];for(let n=0;n<e.length;++n)e[n]!==1&&r.push(e[n]),e[t[n]]!==1&&i.push(t[n]);return{newShape:r,newPerm:i}},su=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},Le=(e,t)=>{let r=e.dataType,i=e.dims.length,n=sn(i,t),a=iu(e.dims,n),s=e.dims,u=a,l=i<2||su(n,e.dims),p;if(l)return p=_=>{let b=N("input",r,s,4),T=K("output",r,u,4);return`
  ${_.registerUniform("output_size","u32").declareVariables(b,T)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=O.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:p};let{newShape:c,newPerm:f}=au(e.dims,n),g=O.areEqual(f,[2,3,1]),y=O.areEqual(f,[3,1,2]);if(c.length===2||g||y){s=g?[c[0],c[1]*c[2]]:y?[c[0]*c[1],c[2]]:c,u=[s[1],s[0]];let _=16;return p=b=>{let T=N("a",r,s.length),$=K("output",r,u.length);return`
  ${b.registerUniform("output_size","u32").declareVariables(T,$)}
  var<workgroup> tile : array<array<${$.type.value}, ${_+1}>, ${_}>;
  ${b.mainStart([_,_,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${_} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${_}u + local_id.x;
    let input_row = workgroup_id_x * ${_}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${T.getByIndices(`${T.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${_}u + local_id.x;
    let output_row = workgroup_id_y * ${_}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${$.setByIndices(`${$.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let b=O.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/_),y:Math.ceil(u[0]/_)},programUniforms:[{type:12,data:b},...Q(s,u)]}},getShaderSource:p}}return p=_=>{let b=N("a",r,s.length),T=K("output",r,u.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(b,T)}

  ${nu(n,i,b,T)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${T.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${T.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let _=O.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...Q(s,u)]}},getShaderSource:p}},Qp=(e,t)=>{ru(e.inputs,t.perm),e.compute(Le(e.inputs[0],t.perm))},Zp=e=>he({perm:e.perm})}),ou,uu,lu,du,pu,cu,hu,fu,mu,gu,He,Jp,ec,tc,rc,ic,nc,ac,sc,oc,uc,G0=U(()=>{te(),re(),ie(),ga(),kt(),ou={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},uu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},lu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},du={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},pu=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},cu=(e,t)=>{let r=[],i=e.length;for(let a=0;a<i;a++)t.indexOf(a)===-1&&r.push(e[a]);let n=t.map(a=>e[a]);return[r,n]},hu=(e,t)=>{let r=e.length+t.length,i=[],n=0;for(let a=0;a<r;a++)t.indexOf(a)===-1?i.push(e[n++]):i.push(1);return i},fu=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},mu=(e,t)=>{let r=[];if(!fu(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},gu=(e,t,r,i,n,a,s)=>{let u=r[0].dims,l=O.size(a),p=O.size(s),c=N("_A",r[0].dataType,u),f=K("output",n,a),g=64;l===1&&(g=256);let y=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,_=b=>`
        ${b.registerUniform("reduceSize","u32").declareVariables(c,f)}
        ${y}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${b.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${lu[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${ou[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${uu[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${i==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${du[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${g}`,inputDependencies:["type"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:l},programUniforms:[{type:12,data:p}]})}},He=(e,t,r,i)=>{let n=e.inputs.length===1?r:Gn(e.inputs,r),a=n.axes;a.length===0&&!n.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((y,_)=>_));let s=O.normalizeAxes(a,e.inputs[0].dims.length),u=s,l=e.inputs[0],p=mu(u,e.inputs[0].dims.length);p.length>0&&(l=e.compute(Le(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],u=pu(u.length,l.dims.length));let[c,f]=cu(l.dims,u),g=c;n.keepDims&&(g=hu(c,s)),e.compute(gu(t,n.cacheKey,[l],i,e.inputs[0].dataType,g,f),{inputs:[l]})},Jp=(e,t)=>{He(e,"ReduceMeanShared",t,"mean")},ec=(e,t)=>{He(e,"ReduceL1Shared",t,"l1")},tc=(e,t)=>{He(e,"ReduceL2Shared",t,"l2")},rc=(e,t)=>{He(e,"ReduceLogSumExpShared",t,"logSumExp")},ic=(e,t)=>{He(e,"ReduceMaxShared",t,"max")},nc=(e,t)=>{He(e,"ReduceMinShared",t,"min")},ac=(e,t)=>{He(e,"ReduceProdShared",t,"prod")},sc=(e,t)=>{He(e,"ReduceSumShared",t,"sum")},oc=(e,t)=>{He(e,"ReduceSumSquareShared",t,"sumSquare")},uc=(e,t)=>{He(e,"ReduceLogSumShared",t,"logSum")}}),je,yu,oi,Gn,Ke,_u,wu,bu,vu,$u,xu,Tu,Su,Eu,ku,Xe,lc,dc,pc,cc,hc,fc,mc,gc,yc,_c,ga=U(()=>{te(),re(),xe(),ie(),G0(),je=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},yu=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],oi=(e,t,r,i,n,a,s=!1,u=!1)=>{let l=[],p=r[0].dims,c=p.length,f=O.normalizeAxes(n,c),g=!u&&f.length===0;p.forEach((b,T)=>{g||f.indexOf(T)>=0?s&&l.push(1):l.push(b)});let y=l.length,_=O.size(l);return{name:e,shaderCache:t,getShaderSource:b=>{let T=[],$=N("_A",r[0].dataType,c),w=K("output",a,y),k=i($,w,f),S=k[2];for(let I=0,z=0;I<c;I++)g||f.indexOf(I)>=0?(s&&z++,S=`for(var j${I}: u32 = 0; j${I} < ${p[I]}; j${I}++) {
                  ${k[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${$.indicesSet("input_indices",I,`j${I}`)}
                  ${S}
                }`):(T.push(`${$.indicesSet("input_indices",I,w.indicesGet("output_indices",z))};`),z++);return`

        ${b.registerUniform("output_size","u32").declareVariables($,w)}

        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${$.type.indices};
          let output_indices = ${w.offsetToIndices("global_idx")};

          ${T.join(`
`)}
          ${k[0]}       // init ops for reduce max/min
          ${k[1]}
          ${S}
          ${k[3]}
          ${k.length===4?w.setByOffset("global_idx","value"):k.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...Q(p,l)]})}},Gn=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),he({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Ke=(e,t,r,i)=>{let n=e.inputs,a=n.length===1?r:Gn(n,r);e.compute(oi(t,{hint:a.cacheKey,inputDependencies:["rank"]},[n[0]],a.noopWithEmptyAxes&&a.axes.length===0?yu:i,a.axes,n[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},_u=(e,t)=>{je(e.inputs),Ke(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},wu=(e,t)=>{je(e.inputs),Ke(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},bu=(e,t)=>{je(e.inputs),Ke(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},vu=(e,t)=>{je(e.inputs),Ke(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},$u=(e,t)=>{je(e.inputs),Ke(e,"ReduceMax",t,(r,i,n)=>{let a=[];for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&a.push(r.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},xu=(e,t)=>{je(e.inputs),Ke(e,"ReduceMean",t,(r,i,n)=>{let a=1;for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&(a*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${a});`]})},Tu=(e,t)=>{je(e.inputs),Ke(e,"ReduceMin",t,(r,i,n)=>{let a=[];for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},Su=(e,t)=>{je(e.inputs),Ke(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},Eu=(e,t)=>{je(e.inputs),Ke(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},ku=(e,t)=>{je(e.inputs),Ke(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Xe=(e,t,r)=>{if(t.length===0)return r;let i=1,n=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?i*=e[a]:n*=e[a];return n<32&&i>1024},lc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xu(e,t):Jp(e,t)},dc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wu(e,t):ec(e,t)},pc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bu(e,t):tc(e,t)},cc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vu(e,t):rc(e,t)},hc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$u(e,t):ic(e,t)},fc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Tu(e,t):nc(e,t)},mc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Su(e,t):ac(e,t)},gc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Eu(e,t):sc(e,t)},yc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ku(e,t):oc(e,t)},_c=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_u(e,t):uc(e,t)}}),on,wc,bc,Fn,F0=U(()=>{te(),xe(),ga(),on=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},wc=(e,t)=>{on(e.inputs);let r=(i,n,a)=>{let s=[];for(let u=0;u<i.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(oi("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},bc=(e,t)=>{on(e.inputs);let r=(i,n,a)=>{let s=[];for(let u=0;u<i.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(oi("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Fn=e=>he(e)}),Iu,Gr,Cu,zu,Au,Tr,Ou,vc,ya=U(()=>{te(),re(),fa(),ie(),Iu=(e,t)=>{let r=e[0],i=e[1],n=e[2],a=e[3],s=e[4],u=e[5];if(s&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],p=r.dims[1],c=r.dims[2];if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=n.dims[0]/3,g=f,y=g;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let k of t.qkvHiddenSizes)if(k%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=t.qkvHiddenSizes[0],g=t.qkvHiddenSizes[1],y=t.qkvHiddenSizes[2]}let _=p;if(f!==g)throw new Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==f+g+y)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let b=0;if(s){if(g!==y)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==g/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(b=s.dims[3])}let T=_+b,$=-1,w=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[2]!==p||u.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:p,pastSequenceLength:b,kvSequenceLength:_,totalSequenceLength:T,maxSequenceLength:$,inputHiddenSize:c,hiddenSize:f,vHiddenSize:y,headSize:Math.floor(f/t.numHeads),vHeadSize:Math.floor(y/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Gr=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Cu=(e,t,r,i,n,a,s,u)=>{let l=ve(s?1:a),p=64,c=a/l;c<p&&(p=32);let f=Math.ceil(a/l/p),g=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:c},{type:12,data:f}],y=Ee(e.dataType,l),_=Re(1,l),b=["type"];s&&b.push("type"),u&&b.push("type");let T=$=>{let w=K("x",e.dataType,e.dims,l),k=[w],S=s?N("seq_lens",s.dataType,s.dims):void 0;S&&k.push(S);let I=u?N("total_sequence_length_input",u.dataType,u.dims):void 0;I&&k.push(I);let z=Re(e.dataType),A=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${$.registerUniforms(A).declareVariables(...k)}
  ${$.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Gr(S,I,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${_}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${_}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${p}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${_}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${_}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${p}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${w.type.value}(${z}(1.0) / ${z}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${_}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${z}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${y};${l}`,inputDependencies:b},getShaderSource:T,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:n,z:t*r},programUniforms:g})}},zu=(e,t,r,i,n,a,s,u,l)=>{let p=s+a.kvSequenceLength,c=[a.batchSize,a.numHeads,a.sequenceLength,p],f=e>1&&i,g=a.kvNumHeads?a.kvNumHeads:a.numHeads,y=f?[a.batchSize,g,p,a.headSize]:void 0,_=a.nReps?a.nReps:1,b=a.scale===0?1/Math.sqrt(a.headSize):a.scale,T=ve(a.headSize),$=a.headSize/T,w=12,k={x:Math.ceil(p/w),y:Math.ceil(a.sequenceLength/w),z:a.batchSize*a.numHeads},S=[{type:12,data:a.sequenceLength},{type:12,data:$},{type:12,data:p},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:b},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:_}],I=f&&i&&O.size(i.dims)>0,z=["type","type"];I&&z.push("type"),n&&z.push("type"),u&&z.push("type"),l&&z.push("type");let A=[{dims:c,dataType:t.dataType,gpuDataType:0}];f&&A.push({dims:y,dataType:t.dataType,gpuDataType:0});let x=P=>{let L=N("q",t.dataType,t.dims,T),H=N("key",r.dataType,r.dims,T),q=[L,H];if(I){let Z=N("past_key",i.dataType,i.dims,T);q.push(Z)}n&&q.push(N("attention_bias",n.dataType,n.dims));let j=u?N("seq_lens",u.dataType,u.dims):void 0;j&&q.push(j);let R=l?N("total_sequence_length_input",l.dataType,l.dims):void 0;R&&q.push(R);let D=K("output",t.dataType,c),G=[D];f&&G.push(K("present_key",t.dataType,y,T));let J=Re(1,T),X=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${L.type.storage}, ${w*w}>;
  var<workgroup> tileK: array<${L.type.storage}, ${w*w}>;
  ${P.registerUniforms(X).declareVariables(...q,...G)}
  ${P.mainStart([w,w,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${_===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${_===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Gr(j,R,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${I&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${J}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${I&&f?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${f?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${J}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(T){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${T}`)}})()};
        output[outputIdx] = ${D.type.value} (sum * uniforms.alpha) + ${n?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${T};${n!==void 0};${i!==void 0};${e}`,inputDependencies:z},getRunData:()=>({outputs:A,dispatchGroup:k,programUniforms:S}),getShaderSource:x}},Au=(e,t,r,i,n,a,s=void 0,u=void 0)=>{let l=a+n.kvSequenceLength,p=n.nReps?n.nReps:1,c=n.vHiddenSize*p,f=e>1&&i,g=n.kvNumHeads?n.kvNumHeads:n.numHeads,y=f?[n.batchSize,g,l,n.headSize]:void 0,_=[n.batchSize,n.sequenceLength,c],b=12,T={x:Math.ceil(n.vHeadSize/b),y:Math.ceil(n.sequenceLength/b),z:n.batchSize*n.numHeads},$=[{type:12,data:n.sequenceLength},{type:12,data:l},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:12,data:c},{type:12,data:a},{type:12,data:n.kvSequenceLength},{type:12,data:p}],w=f&&i&&O.size(i.dims)>0,k=["type","type"];w&&k.push("type"),s&&k.push("type"),u&&k.push("type");let S=[{dims:_,dataType:t.dataType,gpuDataType:0}];f&&S.push({dims:y,dataType:t.dataType,gpuDataType:0});let I=z=>{let A=N("probs",t.dataType,t.dims),x=N("v",r.dataType,r.dims),P=[A,x];w&&P.push(N("past_value",i.dataType,i.dims));let L=s?N("seq_lens",s.dataType,s.dims):void 0;s&&P.push(L);let H=u?N("total_sequence_length_input",u.dataType,u.dims):void 0;u&&P.push(H);let q=[K("output",t.dataType,_)];f&&q.push(K("present_value",t.dataType,y));let j=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;
  var<workgroup> tileQ: array<${A.type.value}, ${b*b}>;
  var<workgroup> tileV: array<${A.type.value}, ${b*b}>;
  ${z.registerUniforms(j).declareVariables(...P,...q)}
  ${z.mainStart([b,b,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Gr(L,H,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${A.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${w&&f?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${f?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:k},getRunData:()=>({outputs:S,dispatchGroup:T,programUniforms:$}),getShaderSource:I}},Tr=(e,t,r,i,n,a,s,u,l,p,c=void 0,f=void 0)=>{let g=Math.min(e.outputCount,1+(s?1:0)+(u?1:0)),y=g>1?p.pastSequenceLength:0,_=y+p.kvSequenceLength,b=l&&O.size(l.dims)>0?l:void 0,T=[t,r];g>1&&s&&O.size(s.dims)>0&&T.push(s),b&&T.push(b),c&&T.push(c),f&&T.push(f);let $=e.compute(zu(g,t,r,s,b,p,y,c,f),{inputs:T,outputs:g>1?[-1,1]:[-1]})[0];e.compute(Cu($,p.batchSize,p.numHeads,y,p.sequenceLength,_,c,f),{inputs:c&&f?[$,c,f]:[$],outputs:[]});let w=[$,i];g>1&&u&&O.size(u.dims)>0&&w.push(u),c&&w.push(c),f&&w.push(f),e.compute(Au(g,$,i,u,p,y,c,f),{inputs:w,outputs:g>1?[0,2]:[0]})},Ou=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,n=t.inputHiddenSize,a=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:i},{type:12,data:n},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=f=>{let g=K("output_q",l[0].dataType,r),y=K("output_k",l[0].dataType,r),_=K("output_v",l[0].dataType,r),b=N("input",l[0].dataType,l[0].dims),T=N("weight",l[1].dataType,l[1].dims),$=N("bias",l[2].dataType,l[2].dims),w=b.type.storage,k=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${w}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${w}, ${s*s}>;
  var<workgroup> tileWeightK: array<${w}, ${s*s}>;
  var<workgroup> tileWeightV: array<${w}, ${s*s}>;
  ${f.registerUniforms(k).declareVariables(b,T,$,g,y,_)}
  ${f.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${w}(0);
    var valueK = ${w}(0);
    var valueV = ${w}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:p}),getShaderSource:c},{inputs:l,outputs:[-1,-1,-1]})},vc=(e,t)=>{let r=Iu(e.inputs,t),[i,n,a]=Ou(e,r);return Tr(e,i,n,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),Ru,Mu,Nu,$c,H0=U(()=>{Ge(),te(),re(),xe(),ie(),Ru=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,n,a)=>{let s=n.length;if(s!==i.length)throw new Error(`${a}: num dimensions != ${s}`);n.forEach((u,l)=>{if(u!==i[l])throw new Error(`${a}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Mu=(e,t)=>{let{epsilon:r,spatial:i,format:n}=t,a=e[0].dims,s=i?ve(a[a.length-1]):1,u=n==="NHWC"&&a.length>1?s:1,l=O.size(a)/s,p=i,c=p?a.length:a,f=N("x",e[0].dataType,e[0].dims,s),g=N("scale",e[1].dataType,e[1].dims,u),y=N("bias",e[2].dataType,e[2].dims,u),_=N("inputMean",e[3].dataType,e[3].dims,u),b=N("inputVar",e[4].dataType,e[4].dims,u),T=K("y",e[0].dataType,c,s),$=()=>{let k="";if(i)k=`let cOffset = ${a.length===1?"0u":n==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(n==="NCHW")k=`
            ${T.indicesSet("outputIndices","0","0")}
            let cOffset = ${T.indicesToOffset("outputIndices")};`;else{k=`var cIndices = ${g.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let S=1;S<g.rank;S++)k+=`cIndices[${S}] = outputIndices[${S}];`;k+=`let cOffset = ${g.indicesToOffset("cIndices")};`}return k},w=k=>`
  const epsilon = ${r};
  ${k.registerUniform("outputSize","u32").declareVariables(f,g,y,_,b,T)}
  ${k.mainStart()}
  ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${T.offsetToIndices(`global_idx * ${s}`)};
    ${$()}
    let scale = ${g.getByOffset("cOffset")};
    let bias = ${y.getByOffset("cOffset")};
    let inputMean = ${_.getByOffset("cOffset")};
    let inputVar = ${b.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${T.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${s}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p?[{type:12,data:l},...Q(a)]:[{type:12,data:l}]})}},Nu=e=>he(e),$c=(e,t)=>{let{inputs:r,outputCount:i}=e,n=Nu({...t,outputCount:i});if(ge.webgpu.validateInputContent&&Ru(r,n),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Mu(r,n))}}),Bu,Du,xc,j0=U(()=>{re(),ie(),Bu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Du=e=>{let t=e[0].dims,r=e[0].dims[2],i=O.size(t)/4,n=e[0].dataType,a=N("input",n,t,4),s=N("bias",n,[r],4),u=N("residual",n,t,4),l=K("output",n,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:p=>`
  const channels = ${r}u / 4;
  ${p.declareVariables(a,s,u,l)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},xc=e=>{Bu(e.inputs),e.compute(Du(e.inputs))}}),Pu,ce,Tc,Sc,Ec,kc,Ic,Cc,zc,Ac,Oc,Uu,Rc,Mc,Nc,Bc,br,Dc,Jr,Pc,Uc,Lc,qc,Wc,Vc,Gc,Fc,Hc,jc,Kc,Xc,Yc,Qc,Zc,Jc,un,eh,Hn,jn,th,rh,ih,Lu,qu,nh,_a=U(()=>{te(),re(),xe(),ie(),Pu=(e,t,r,i,n,a,s)=>{let u=Math.ceil(t/4),l="";typeof n=="string"?l=`${n}(a)`:l=n("a");let p=N("inputData",r,[u],4),c=K("outputData",i,[u],4),f=[{name:"vec_size",type:"u32"}];return s&&f.push(...s),`
      ${e.registerUniforms(f).declareVariables(p,c)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",l)}
  }`},ce=(e,t,r,i,n,a=e.dataType,s,u)=>{let l=[{type:12,data:Math.ceil(O.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:p=>Pu(p,O.size(e.dims),e.dataType,a,r,i,u),getRunData:p=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(O.size(p[0].dims)/64/4)},programUniforms:l})}},Tc=e=>{e.compute(ce(e.inputs[0],"Abs","abs"))},Sc=e=>{e.compute(ce(e.inputs[0],"Acos","acos"))},Ec=e=>{e.compute(ce(e.inputs[0],"Acosh","acosh"))},kc=e=>{e.compute(ce(e.inputs[0],"Asin","asin"))},Ic=e=>{e.compute(ce(e.inputs[0],"Asinh","asinh"))},Cc=e=>{e.compute(ce(e.inputs[0],"Atan","atan"))},zc=e=>{e.compute(ce(e.inputs[0],"Atanh","atanh"))},Ac=e=>he(e),Oc=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ce(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Uu=e=>{let t,r,i=e.length>=2&&e[1].data!==0,n=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=n?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return he({min:t,max:r})},Rc=(e,t)=>{let r=t||Uu(e.inputs),i=Re(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Clip",n=>`clamp(${n}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},Mc=e=>{e.compute(ce(e.inputs[0],"Ceil","ceil"))},Nc=e=>{e.compute(ce(e.inputs[0],"Cos","cos"))},Bc=e=>{e.compute(ce(e.inputs[0],"Cosh","cosh"))},br=e=>he(e),Dc=(e,t)=>{let r=Re(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Jr=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Pc=e=>{let t=Re(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Jr(t)))},Uc=e=>{e.compute(ce(e.inputs[0],"Exp","exp"))},Lc=e=>{e.compute(ce(e.inputs[0],"Floor","floor"))},qc=e=>{let t=Re(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Jr(t)))},Wc=(e,t)=>{let r=Re(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Vc=e=>{e.compute(ce(e.inputs[0],"Not",t=>`!${t}`))},Gc=e=>{e.compute(ce(e.inputs[0],"Neg",t=>`-${t}`))},Fc=e=>{e.compute(ce(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Hc=e=>{let t=Re(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},jc=e=>{e.compute(ce(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Kc=e=>he(e),Xc=(e,t)=>{let r=Re(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},Yc=e=>{e.compute(ce(e.inputs[0],"Sin","sin"))},Qc=e=>{e.compute(ce(e.inputs[0],"Sinh","sinh"))},Zc=e=>{e.compute(ce(e.inputs[0],"Sqrt","sqrt"))},Jc=e=>{e.compute(ce(e.inputs[0],"Tan","tan"))},un=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,eh=e=>{e.compute(ce(e.inputs[0],"Tanh",un))},Hn=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${un("v")};
}
`,jn=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,th=e=>{let t=Re(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"FastGelu",jn,Hn(t),void 0,e.inputs[0].dataType))},rh=(e,t)=>{let r=Re(e.inputs[0].dataType);return e.compute(ce(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},ih=e=>{e.compute(ce(e.inputs[0],"Log","log"))},Lu=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,qu=e=>`quick_gelu_impl(${e})`,nh=(e,t)=>{let r=Re(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"QuickGelu",qu,Lu(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Wu,Vu,ah,K0=U(()=>{re(),ie(),_a(),Wu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Vu=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=N("input",e[0].dataType,e[0].dims,4),i=N("bias",e[0].dataType,[e[0].dims[2]],4),n=K("output",e[0].dataType,t,4),a=O.size(t)/4,s=Ee(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,i,n)}

  ${Jr(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},ah=e=>{Wu(e.inputs),e.compute(Vu(e.inputs))}}),Gu,Fu,Ye,sh,oh,uh,lh,dh,ph,ch,hh,fh,mh,X0=U(()=>{te(),re(),ie(),Gu=(e,t,r,i,n,a,s,u,l,p,c,f)=>{let g,y;typeof u=="string"?g=y=(w,k)=>`${u}((${w}),(${k}))`:typeof u=="function"?g=y=u:(g=u.scalar,y=u.vector);let _=K("outputData",c,i.length,4),b=N("aData",l,t.length,4),T=N("bData",p,r.length,4),$;if(n)if(a){let w=O.size(t)===1,k=O.size(r)===1,S=t.length>0&&t[t.length-1]%4===0,I=r.length>0&&r[r.length-1]%4===0;w||k?$=_.setByOffset("global_idx",y(w?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"),k?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"))):$=`
            let outputIndices = ${_.offsetToIndices("global_idx * 4u")};
            let offsetA = ${b.broadcastedIndicesToOffset("outputIndices",_)};
            let offsetB = ${T.broadcastedIndicesToOffset("outputIndices",_)};
            ${_.setByOffset("global_idx",y(s||S?b.getByOffset("offsetA / 4u"):`${b.type.value}(${b.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||I?T.getByOffset("offsetB / 4u"):`${T.type.value}(${T.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=_.setByOffset("global_idx",y(b.getByOffset("global_idx"),T.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(k,S,I="")=>{let z=`aData[indexA${S}][componentA${S}]`,A=`bData[indexB${S}][componentB${S}]`;return`
            let outputIndices${S} = ${_.offsetToIndices(`global_idx * 4u + ${S}u`)};
            let offsetA${S} = ${b.broadcastedIndicesToOffset(`outputIndices${S}`,_)};
            let offsetB${S} = ${T.broadcastedIndicesToOffset(`outputIndices${S}`,_)};
            let indexA${S} = offsetA${S} / 4u;
            let indexB${S} = offsetB${S} / 4u;
            let componentA${S} = offsetA${S} % 4u;
            let componentB${S} = offsetB${S} % 4u;
            ${k}[${S}] = ${I}(${g(z,A)});
          `};c===9?$=`
            var data = vec4<u32>(0);
            ${w("data",0,"u32")}
            ${w("data",1,"u32")}
            ${w("data",2,"u32")}
            ${w("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:$=`
            ${w("outputData[global_idx]",0)}
            ${w("outputData[global_idx]",1)}
            ${w("outputData[global_idx]",2)}
            ${w("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(b,T,_)}

        ${f??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},Fu=(e,t,r,i,n,a,s=r.dataType)=>{let u=r.dims.map(Number),l=i.dims.map(Number),p=!O.areEqual(u,l),c=u,f=O.size(u),g=!1,y=!1,_=[p];if(p){let b=Jt.calcShape(u,l,!1);if(!b)throw new Error("Can't perform binary op on the given tensors");c=b.slice(),f=O.size(c);let T=O.size(u)===1,$=O.size(l)===1,w=u.length>0&&u[u.length-1]%4===0,k=l.length>0&&l[l.length-1]%4===0;_.push(T),_.push($),_.push(w),_.push(k);let S=1;for(let I=1;I<c.length;I++){let z=u[u.length-I],A=l[l.length-I];if(z===A)S*=z;else break}S%4===0?(y=!0,g=!0):(T||$||w||k)&&(g=!0)}else g=!0;return _.push(g),{name:e,shaderCache:{hint:t+_.map(b=>b.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:b=>Gu(b,u,l,c,g,p,y,n,r.dataType,i.dataType,s,a),getRunData:()=>({outputs:[{dims:c,dataType:s}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(O.size(c)/4)},...Q(u,l,c)]})}},Ye=(e,t,r,i,n,a)=>{e.compute(Fu(t,n??"",e.inputs[0],e.inputs[1],r,i,a))},sh=e=>{Ye(e,"Add",(t,r)=>`${t}+${r}`)},oh=e=>{Ye(e,"Div",(t,r)=>`${t}/${r}`)},uh=e=>{Ye(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},lh=e=>{Ye(e,"Mul",(t,r)=>`${t}*${r}`)},dh=e=>{let t=N("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ye(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},ph=e=>{Ye(e,"Sub",(t,r)=>`${t}-${r}`)},ch=e=>{Ye(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},hh=e=>{Ye(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},fh=e=>{Ye(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},mh=e=>{Ye(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Hu,ju,Ku,Xu,gh,yh,Y0=U(()=>{te(),re(),xe(),ie(),Hu=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],n=i.dataType,a=i.dims.length;e.forEach((s,u)=>{if(u!==r){if(s.dataType!==n)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((l,p)=>{if(p!==t&&l!==i.dims[p])throw new Error("non concat dimensions must match")})}})},ju=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Ku=(e,t)=>{let r=e.length,i=[];for(let n=0;n<r;++n){let a=t.setByOffset("global_idx",e[n].getByIndices("indices"));r===1?i.push(a):n===0?i.push(`if (inputIndex == ${n}u) { ${a} }`):n===r-1?i.push(`else { ${a} }`):i.push(`else if (inputIndex == ${n}) { ${a} }`)}return i.join(`
`)},Xu=(e,t,r,i)=>{let n=O.size(r),a=new Array(e.length),s=new Array(e.length),u=0,l=[],p=[],c=[{type:12,data:n}];for(let b=0;b<e.length;++b)u+=e[b].dims[t],a[b]=u,p.push(e[b].dims.length),s[b]=N(`input${b}`,i,p[b]),l.push("rank"),c.push({type:12,data:a[b]});for(let b=0;b<e.length;++b)c.push(...Q(e[b].dims));c.push(...Q(r));let f=K("output",i,r.length),g=f.indicesGet("indices",t),y=Array.from(Array(a.length).keys()).map(b=>`uniforms.sizeInConcatAxis${b}`).join(","),_=b=>`

  ${(()=>{b.registerUniform("outputSize","u32");for(let T=0;T<e.length;T++)b.registerUniform(`sizeInConcatAxis${T}`,"u32");return b.declareVariables(...s,f)})()}

  ${ju(a.length,y)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${g});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${y});
      ${g} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Ku(s,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:c}),getShaderSource:_}},gh=(e,t)=>{let r=e.inputs,i=r[0].dims,n=O.normalizeAxis(t.axis,i.length);Hu(r,n);let a=i.slice();a[n]=r.reduce((u,l)=>u+(l.dims.length>n?l.dims[n]:0),0);let s=r.filter(u=>O.size(u.dims)>0);e.compute(Xu(s,n,a,r[0].dataType),{inputs:s})},yh=e=>he({axis:e.axis})}),Wt,Vt,Gt,wa,Ht=U(()=>{te(),re(),Wt=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Vt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Gt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},wa=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[Vp,Gp];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),ze,_h,ba=U(()=>{ze=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},_h=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),wh,Q0=U(()=>{wh=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),$r,va,$a=U(()=>{te(),re(),ie(),Ht(),$r=(e,t,r,i,n)=>{let a=i-r;return`
      ${Array.from({length:r}).map((s,u)=>`
      if (${Y(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,Y(n,u+a,i))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},va=(e,t,r,i,n=!1,a)=>{let s=e[0].dims,u=e[1].dims,l=s[s.length-2],p=u[u.length-1],c=s[s.length-1],f=ve(p),g=ve(c),y=ve(l),_=O.size(r)/f/y,b=e.length>2,T=i?i.slice(0,-2):r.slice(0,-2),$=[O.size(T),l,p],w=[{type:12,data:_},{type:12,data:l},{type:12,data:p},{type:12,data:c}];Vt(t,w),w.push(...Q(T,s,u)),b&&w.push(...Q(e[2].dims)),w.push(...Q($));let k=S=>{let I=ma("batch_dims",e[0].dataType,T.length),z=N("a",e[0].dataType,s.length,g),A=N("b",e[1].dataType,u.length,f),x=K("output",e[0].dataType,$.length,f),P=Ee(x.type.tensor),L=Wt(t,x.type.value,P),H=[z,A],q="";if(b){let D=n?f:1;H.push(N("bias",e[2].dataType,e[2].dims.length,D)),q=`${n?`value += bias[col / ${D}];`:`value += ${x.type.value}(bias[row + i]);`}`}let j=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Gt(t,j);let R=()=>{let D=`var a_data: ${z.type.value};`;for(let G=0;G<g;G++)D+=`
              let b_data${G} = b[(b_offset + (k + ${G}) * uniforms.N + col) / ${f}];`;for(let G=0;G<y;G++){D+=`a_data = a[(a_offset + (row + ${G}) * uniforms.K + k) / ${g}];`;for(let J=0;J<g;J++)D+=`
            values[${G}] = fma(${A.type.value}(a_data${g===1?"":`[${J}]`}), b_data${J}, values[${G}]);
`}return D};return`
  ${S.registerUniforms(j).registerInternalVariables(I).declareVariables(...H,x)}
  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${y};
    let row = (index1 % stride1) * ${y};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${z.type.indices};
    ${$r("a_indices",z,z.rank-2,I.rank,"batch_indices")}
    ${z.indicesSet("a_indices",z.rank-2,0)}
    ${z.indicesSet("a_indices",z.rank-1,0)}
    let a_offset = ${z.indicesToOffset("a_indices")};

    var b_indices: ${A.type.indices};
    ${$r("b_indices",A,A.rank-2,I.rank,"batch_indices")}
    ${A.indicesSet("b_indices",A.rank-2,0)}
    ${A.indicesSet("b_indices",A.rank-1,0)}
    let b_offset = ${A.indicesToOffset("b_indices")};
    var values: array<${x.type.value}, ${y}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g}) {
      ${R()}
    }
    for (var i = 0u; i < ${y}u; i++) {
      var value = values[i];
      ${q}
      ${L}
      let cur_indices = ${x.type.indices}(batch, row + i, col);
      let offset = ${x.indicesToOffset("cur_indices")};
      ${x.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${f};${g};${y};${n}`,inputDependencies:b?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:w}),getShaderSource:k}}}),Yu,Qu,Kn,ln,Zu,Xn,Ju,ui,xa=U(()=>{te(),re(),ie(),Ht(),$a(),ba(),Yu=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Qu=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Kn=(e,t,r="f32",i,n=!1,a=32,s=!1,u=32)=>{let l=t[1]*e[1],p=t[0]*e[0],c=n?l:a,f=n?a:l,g=c/t[0],y=a/t[1];if(!((n&&g===4&&e[1]===4||!n&&(g===3||g===4))&&c%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${n} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${r}>, ${c/g}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${p/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${y};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Yu(n,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${g===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Qu(n,g)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},ln=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Zu=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Xn=(e,t,r="f32",i,n=!1,a=32,s=!1,u=32,l=!1)=>{let p=e[1]*t[1],c=e[0]*t[0],f=n?p:a,g=n?a:p;if(!(g%t[1]===0&&f%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${g} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let y=g/t[1],_=f/t[0],b=a/t[1],T=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          ${ln(n,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${n?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${p};

let tileRowA = i32(localId.y) * ${y};
let tileColA = i32(localId.x) * ${_};
let tileRowB = i32(localId.y) * ${b};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${_}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${ln(n,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Zu(n)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${f}>, ${g}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${c}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${T}
  }
`},Ju=(e,t,r,i,n=!1)=>{let[a,s,u,l]=i,p=Ee(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${ze(e,p)} {
      var value = ${ze(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${$r("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${ze(e,p)} {
      var value = ${ze(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${$r("bIndices",u,u.rank-2,a.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ze(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${n?"bias[colIn]":`${ze(e,p)}(bias[row])`};`:""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ui=(e,t,r,i,n=!1,a)=>{let s=e[0].dims,u=e[1].dims,l=s.slice(0,-2),p=u.slice(0,-2),c=i?i.slice(0,-2):r.slice(0,-2),f=O.size(c),g=s[s.length-2],y=s[s.length-1],_=u[u.length-1],b=y%4===0&&_%4===0,T=g<=8?[4,1,1]:[4,4,1],$=[8,8,1],w=[Math.ceil(_/$[0]/T[0]),Math.ceil(g/$[1]/T[1]),Math.ceil(f/$[2]/T[2])],k=b?4:1,S=[...l,g,y/k],I=S.length,z=[...p,y,_/k],A=z.length,x=[f,g,_/k],P=[{type:6,data:g},{type:6,data:_},{type:6,data:y}];Vt(t,P),P.push(...Q(c,S,z));let L=["rank","rank"],H=e.length>2;H&&(P.push(...Q(e[2].dims)),L.push("rank")),P.push(...Q(x));let q=j=>{let R=c.length,D=ma("batchDims",e[0].dataType,R,1),G=Ee(e[0].dataType),J=N("a",e[0].dataType,I,k),X=N("b",e[1].dataType,A,k),Z=K("result",e[0].dataType,x.length,k),le=[J,X];if(H){let Oe=n?k:1;le.push(N("bias",e[2].dataType,e[2].dims.length,Oe))}let B=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Gt(t,B);let V=Ee(Z.type.tensor),ee=Wt(t,Z.type.value,V),ae=Ju(k,H,ee,[D,J,X,Z],n);return`
  ${j.registerUniforms(B).registerInternalVariables(D).declareVariables(...le,Z)}
  ${ae}
  ${b?Kn(T,$,G,D):Xn(T,$,G,D)}
                   `};return{name:"MatMul",shaderCache:{hint:`${T};${t.activation};${b};${n}`,inputDependencies:L},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:P}),getShaderSource:q}}}),el,bh,Z0=U(()=>{te(),ft(),ie(),Ht(),ba(),Q0(),xa(),el=(e,t,r,i,n=!1,a,s=4,u=4,l=4,p="f32")=>{let c=P=>{switch(P){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},f=P=>{switch(P){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},g=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,y=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,_=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",b=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",T=e?"row":"col",$=e?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${T} / outWidth;
    let outCol = ${T} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${ze(s,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${_} && xCol >= 0 && xCol < ${b}) {
      ${g}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(s)}
    }
    return resData;`,k=e?t&&i?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${ze(s,p)}(0.0);`:i&&r?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${ze(s,p)}(0.0);`,S=e?i&&r?f(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(u)}
    }
    return ${ze(u,p)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(u)}
    }
    return ${ze(u,p)}(0.0);`,I=ze(l,p),z=ze(e?s:u,p),A=ze(e?u:s,p),x=Wt(a,I,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?k:S}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?S:k}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${y}
      ${_h(n)}
      ${x}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},bh=(e,t,r,i,n,a,s,u,l)=>{let p=t.format==="NHWC",c=p?e[0].dims[3]:e[0].dims[1],f=r[0],g=p?r[2]:r[3],y=p?r[1]:r[2],_=p?r[3]:r[1],b=p&&(c%4===0||c%3===0)&&_%4===0,T=p?_:g*y,$=p?g*y:_,w=[8,8,1],k=i<=8?[4,1,1]:[4,4,1],S=[Math.ceil(T/w[0]/k[0]),Math.ceil($/w[1]/k[1]),Math.ceil(f/w[2]/k[2])];de("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${S}`);let I=b?p&&c%4!==0?3:4:1,z=w[1]*k[1],A=w[0]*k[0],x=Math.max(w[0]*I,w[1]),P=i%z===0,L=n%A===0,H=a%x===0,q=b?[I,4,4]:[1,1,1],j=[{type:6,data:i},{type:6,data:n},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Vt(t,j),j.push(...Q(e[0].dims,e[1].dims));let R=["rank","rank"];s&&(j.push(...Q(e[2].dims)),R.push("rank")),j.push(...Q(r));let D=G=>{let J=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Gt(t,J);let X=b?4:1,Z=Ee(e[0].dataType),le=`
      fn setOutputAtIndex(flatIndex : i32, value : ${b?`vec4<${Z}>`:Z}) {
        result[flatIndex] = ${b?`vec4<${Z}>`:Z}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${b?`vec4<${Z}>`:Z}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${b?"/ 4":""}, value);
      }`,B=N("x",e[0].dataType,e[0].dims.length,I===3?1:I),V=N("w",e[1].dataType,e[1].dims.length,X),ee=[B,V],ae=K("result",e[0].dataType,r.length,X);if(s){let Oe=N("bias",e[2].dataType,e[2].dims.length,X);ee.push(Oe),le+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${b?`vec4<${Z}>`:Z} {
          return bias[coords.${p?"w":"y"}${b?"/ 4":""}];
        }`}return`
        ${wh("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${G.registerUniforms(J).declareVariables(...ee,ae)}
        ${le}
        ${el(p,P,L,H,s,t,q[0],q[1],q[2],Z)}
        ${b?Kn(k,w,Z,void 0,!p,x):Xn(k,w,Z,void 0,!p,x,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${I};${b};${P};${L};${H};${z};${A};${x}`,inputDependencies:R},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:S[0],y:S[1],z:S[2]},programUniforms:j}),getShaderSource:D}}}),tl,dn,pr,rl,pn,il,vh,$h,J0=U(()=>{te(),ft(),re(),ie(),Ht(),ba(),tl=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},dn=e=>typeof e=="number"?[e,e,e]:e,pr=(e,t)=>t<=1?e:e+(e-1)*(t-1),rl=(e,t,r,i=1)=>{let n=pr(t,i);return Math.floor((e[0]*(r-1)-r+n)/2)},pn=(e,t,r,i,n)=>{n==null&&(n=rl(e,t[0],i[0]));let a=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*n>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*n)/i[s]+1));return a},il=(e,t,r,i,n,a,s,u,l,p)=>{let c,f,g,y;if(e==="VALID"&&(e=0),typeof e=="number"){c={top:e,bottom:e,left:e,right:e,front:e,back:e};let _=pn([t,r,i,1],[u,l,p],1,[n,a,s],e);f=_[0],g=_[1],y=_[2]}else if(Array.isArray(e)){if(!e.every((b,T,$)=>b===$[0]))throw Error(`Unsupported padding parameter: ${e}`);c={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let _=pn([t,r,i,1],[u,l,p],1,[n,a,s],e[0]);f=_[0],g=_[1],y=_[2]}else if(e==="SAME_UPPER"){f=Math.ceil(t/n),g=Math.ceil(r/a),y=Math.ceil(i/s);let _=(f-1)*n+u-t,b=(g-1)*a+l-r,T=(y-1)*s+p-i,$=Math.floor(_/2),w=_-$,k=Math.floor(b/2),S=b-k,I=Math.floor(T/2),z=T-I;c={top:k,bottom:S,left:I,right:z,front:$,back:w}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:f,outHeight:g,outWidth:y}},vh=(e,t,r,i,n,a=!1,s="channelsLast")=>{let u,l,p,c,f;if(s==="channelsLast")[u,l,p,c,f]=e;else if(s==="channelsFirst")[u,f,l,p,c]=e;else throw new Error(`Unknown dataFormat ${s}`);let[g,,y,_,b]=t,[T,$,w]=dn(r),[k,S,I]=dn(i),z=pr(y,k),A=pr(_,S),x=pr(b,I),{padInfo:P,outDepth:L,outHeight:H,outWidth:q}=il(n,l,p,c,T,$,w,z,A,x),j=a?g*f:g,R=[0,0,0,0,0];return s==="channelsFirst"?R=[u,j,L,H,q]:s==="channelsLast"&&(R=[u,L,H,q,j]),{batchSize:u,dataFormat:s,inDepth:l,inHeight:p,inWidth:c,inChannels:f,outDepth:L,outHeight:H,outWidth:q,outChannels:j,padInfo:P,strideDepth:T,strideHeight:$,strideWidth:w,filterDepth:y,filterHeight:_,filterWidth:b,effectiveFilterDepth:z,effectiveFilterHeight:A,effectiveFilterWidth:x,dilationDepth:k,dilationHeight:S,dilationWidth:I,inShape:e,outShape:R,filterShape:t}},$h=(e,t,r,i,n,a)=>{let s=a==="channelsLast";s?e[0].dims[3]:e[0].dims[1];let u=[64,1,1],l={x:r.map((T,$)=>$)},p=[Math.ceil(tl(l.x.map(T=>r[T]))/u[0]),1,1];de("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${p}`);let c=1,f=O.size(r),g=[{type:12,data:f},{type:12,data:i},{type:12,data:n},{type:12,data:t.strides},{type:12,data:t.dilations}];Vt(t,g),g.push(...Q(e[0].dims,e[1].dims));let y=["rank","rank"],_=e.length===3;_&&(g.push(...Q(e[2].dims)),y.push("rank")),g.push(...Q(r));let b=T=>{let $=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Gt(t,$);let w=1,k=Ee(e[0].dataType),S=N("x",e[0].dataType,e[0].dims.length,c),I=N("W",e[1].dataType,e[1].dims.length,w),z=[S,I],A=K("result",e[0].dataType,r.length,w),x="";if(_){let H=N("bias",e[2].dataType,e[2].dims.length,w);z.push(H),x+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${k} {
          return bias[${s?Y("coords",4,5):Y("coords",1,5)}];
        }`}let P=ze(c,k),L=Wt(t,P,k);return`
            ${x}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${S.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
          ${T.registerUniforms($).declareVariables(...z,A)}
          ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${A.offsetToIndices("global_idx")};
              let batch = ${Y("coords",0,S.rank)};
              let d2 = ${s?Y("coords",S.rank-1,S.rank):Y("coords",1,S.rank)};
              let xFRCCorner = vec3<u32>(${s?Y("coords",1,S.rank):Y("coords",2,S.rank)},
              ${s?Y("coords",2,S.rank):Y("coords",3,S.rank)},
              ${s?Y("coords",3,S.rank):Y("coords",4,S.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?Y("uniforms.x_shape",1,S.rank):Y("uniforms.x_shape",2,S.rank)};
              let xShapeZ = ${s?Y("uniforms.x_shape",2,S.rank):Y("uniforms.x_shape",3,S.rank)};
              let xShapeW = ${s?Y("uniforms.x_shape",3,S.rank):Y("uniforms.x_shape",4,S.rank)};
              let xShapeU = ${s?Y("uniforms.x_shape",4,S.rank):Y("uniforms.x_shape",1,S.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${_?"value = value + getBiasByOutputCoords(coords)":""};
              ${L}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${c};${_}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:p[0],y:p[1],z:p[2]},programUniforms:g}),getShaderSource:b}}}),xh,Th,ey=U(()=>{te(),re(),ie(),Ht(),xh=(e,t,r,i)=>{let n=e.length>2,a=n?"value += b[output_channel];":"",s=e[0].dims,u=e[1].dims,l=t.format==="NHWC",p=l?r[3]:r[1],c=p/t.group,f=l&&c>=4?ve(p):1,g=O.size(r)/f,y=[{type:12,data:g},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:c}];Vt(t,y),y.push(...Q(s,[u[0],u[1],u[2],u[3]/f]));let _=n?["rank","rank","rank"]:["rank","rank"];y.push(...Q([r[0],r[1],r[2],r[3]/f]));let b=T=>{let $=K("output",e[0].dataType,r.length,f),w=Ee($.type.tensor),k=Wt(t,$.type.value,w),S=N("x",e[0].dataType,s.length),I=N("w",e[1].dataType,u.length,f),z=[S,I];n&&z.push(N("b",e[2].dataType,e[2].dims,f));let A=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Gt(t,A);let x=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${S.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${I.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${S.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${I.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${T.registerUniforms(A).declareVariables(...z,$)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${x}
    ${a}
    ${k}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${f}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:y}),getShaderSource:b}},Th=(e,t,r,i)=>{let n=e.length>2,a=ve(r[3]),s=ve(r[2]),u=O.size(r)/a/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],c=[r[0],r[1],r[2],r[3]/a],f=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Vt(t,f),f.push(...Q(l,p,c));let g=(s-1)*t.strides[1]+p[1],y=_=>{let b=K("output",e[0].dataType,c.length,a),T=Ee(b.type.tensor),$=Wt(t,b.type.value,T),w=N("x",e[0].dataType,l.length,a),k=N("w",e[1].dataType,p.length,a),S=[w,k];n&&S.push(N("b",e[2].dataType,e[2].dims,a));let I=n?"value += b[output_channel];":"",z=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Gt(t,z),`
  ${_.registerUniforms(z).declareVariables(...S,b)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${w.type.value}, ${g}>;
    var values: array<${b.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${p[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${g}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${p[1]}; w_width++) {
          let w_val = ${k.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${I}
      ${$}
      ${b.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${g};${p[0]};${p[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f}),getShaderSource:y}}}),nl,Fr,al,Hr,Yn,cn,sl,ol,Qn,ty=U(()=>{re(),Z0(),J0(),xa(),ey(),Ht(),$a(),kt(),nl=(e,t,r,i,n,a)=>{let s=e[0],u=e.slice(a?1:2,a?3:4),l=u.length,p=t[0],c=t.slice(2).map((g,y)=>g+(g-1)*(r[y]-1)),f=u.map((g,y)=>g+i[y]+i[y+l]).map((g,y)=>Math.floor((g-c[y]+n[y])/n[y]));return f.splice(0,0,s),f.splice(a?3:1,0,p),f},Fr=[2,3,1,0],al=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Hr=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let a=2;a<t[1].dims.length;++a)r[a-2]===0&&(r[a-2]=t[1].dims[a]);let i=e.pads.slice();si.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:r,pads:i}),n},Yn=e=>{let t=wa(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],n=e.dilations,a=e.group,s=e.kernel_shape,u=e.pads,l=e.strides,p=e.w_is_const();return{autoPad:i,format:r,dilations:n,group:a,kernelShape:s,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},cn=(e,t,r,i)=>{let n=r.format==="NHWC",a=nl(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,n);if(r.group!==1){let z=[t[0]];if(n){let A=e.kernelCustomData.wT??e.compute(Le(t[1],Fr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=A),z.push(A)}else z.push(t[1]);t.length===3&&z.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&n&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Th(z,r,a,i),{inputs:z}):e.compute(xh(z,r,a,i),{inputs:z});return}let s=t.length===3,u=t[0].dims[n?1:2],l=t[0].dims[n?2:3],p=t[0].dims[n?3:1],c=t[1].dims[2],f=t[1].dims[3],g=a[n?1:2],y=a[n?2:3],_=a[n?3:1],b=n&&c===u&&f===l&&r.pads[0]===0&&r.pads[1]===0;if(b||c===1&&f===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let z=a[0],A,x,P,L=[];if(n){let j=e.kernelCustomData.wT??e.compute(Le(t[1],Fr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=j),b){let R=u*l*p;A=t[0].reshape([1,z,R]),x=j.reshape([1,R,_]),P=[1,z,_]}else A=t[0].reshape([z,u*l,p]),x=j.reshape([1,p,_]),P=[z,g*y,_];L.push(A),L.push(x)}else A=t[0].reshape([z,p,u*l]),x=t[1].reshape([1,_,p]),P=[z,_,g*y],L.push(x),L.push(A);s&&L.push(t[2]);let H=P[2],q=L[0].dims[L[0].dims.length-1];H<8&&q<8?e.compute(va(L,r,a,P,n,i),{inputs:L}):e.compute(ui(L,r,a,P,n,i),{inputs:L});return}let T=!0,$=e.kernelCustomData.wT??e.compute(Le(t[1],Fr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let w=[t[0],$];s&&w.push(t[2]);let k=n?g*y:_,S=n?_:g*y,I=c*f*p;e.compute(bh(w,r,a,k,S,I,s,T,i),{inputs:w})},sl=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),l=Hr({...t,pads:n,strides:a,dilations:s,kernelShape:u},i);cn(e,i,l,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},ol=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",n=Hr(r,t),a=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=vh(t[0].dims,t[1].dims,r.strides,r.dilations,a,!1,i);e.compute($h(t,n,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],i))},Qn=(e,t)=>{if(al(e.inputs,t),e.inputs[0].dims.length===3)sl(e,t);else if(e.inputs[0].dims.length===5)ol(e,e.inputs,t);else{let r=Hr(t,e.inputs);cn(e,e.inputs,r)}}}),Sh,ry=U(()=>{te(),ft(),re(),ie(),Sh=(e,t,r)=>{let i=e.length>2,n=t.outputShape,a=t.format==="NHWC",s=t.group,u=e[1].dims,l=u[2]/s,p=u[3],c=a?ve(l):1,f=a&&p===1&&l>=4,g=f?Math.floor(l/4)*4:Math.floor(l/c)*c,y=l-g,_=a?ve(p):1,b=a?p===1?c:_:1,T=O.size(n)/_,$=[Math.ceil(T/64),1,1];de("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${$}`);let w=["rank","rank"],k=[t.strides[0],t.strides[1]],S=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],I=[t.dilations[0],t.dilations[1]],z=[S[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),S[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],A=[z[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),z[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],x=[{type:12,data:T},{type:12,data:k},{type:12,data:S},{type:12,data:I},{type:12,data:z},{type:6,data:A},{type:12,data:g},{type:12,data:l},{type:12,data:p},...Q(e[0].dims,e[1].dims)];i&&(x.push(...Q(e[2].dims)),w.push("rank")),x.push(...Q(n));let P=L=>{let H=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:k.length},{name:"filter_dims",type:"u32",length:S.length},{name:"dilations",type:"u32",length:S.length},{name:"effective_filter_dims",type:"u32",length:z.length},{name:"pads",type:"i32",length:A.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],q=Ee(e[0].dataType),j=a?1:2,R=a?2:3,D=a?3:1,G=N("W",e[1].dataType,e[1].dims.length,b),J=N("Dy",e[0].dataType,e[0].dims.length,c),X=[J,G];i&&X.push(N("bias",e[2].dataType,[n[D]].length,_));let Z=K("result",e[0].dataType,n.length,_),le=()=>{let ee="";if(f)c===4?ee+=`
        let xValue = ${J.getByOffset("x_offset")};
        let wValue = ${G.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?ee+=`
          dotProd = dotProd + dot(vec4<${q}>(${J.getByOffset("x_offset")}, ${J.getByOffset("x_offset + 1u")}), vec4<${q}>(${G.getByOffset("w_offset")}, ${G.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(ee+=`
          dotProd = dotProd + dot(vec4<${q}>(${J.getByOffset("x_offset")}, ${J.getByOffset("x_offset + 1u")}, ${J.getByOffset("x_offset + 2u")}, ${J.getByOffset("x_offset + 3u")}), vec4<${q}>(${G.getByOffset("w_offset")}, ${G.getByOffset("w_offset + 1u")}, ${G.getByOffset("w_offset + 2u")}, ${G.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(ee+=`
                  let xValue = ${a?J.getByOffset(`${J.indicesToOffset(`${J.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):J.get("batch","inputChannel","idyR","idyC")};
        `,c===1)ee+=`
          let w_offset = ${G.indicesToOffset(`${G.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${G.getByOffset(`w_offset / ${b}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let ae=0;ae<c;ae++)ee+=`
            let wValue${ae} = ${G.getByOffset(`${G.indicesToOffset(`${G.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${ae}, wOutChannel)`)} / ${b}`)};
            dotProd = dotProd + xValue[${ae}] * wValue${ae};`;return ee},B=()=>{if(y===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let ee="";if(c===1){ee+="dotProd = dotProd";for(let ae=0;ae<y;ae++)ee+=`
            + ${J.getByOffset(`x_offset + ${ae}`)} * ${G.getByOffset(`w_offset + ${ae}`)}`;ee+=";"}else if(c===2){if(y!==2)throw new Error(`Invalid inputChannelsRemainder ${y}.`);ee+=`
          let xValue = ${J.getByOffset("x_offset")};
          let wValue = ${G.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return ee},V=`
            let outputIndices = ${Z.offsetToIndices(`global_idx * ${_}`)};
            let batch = ${Z.indicesGet("outputIndices",0)};
            let d1 = ${Z.indicesGet("outputIndices",D)};
            let r = ${Z.indicesGet("outputIndices",j)};
            let c = ${Z.indicesGet("outputIndices",R)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${Z.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${q}(dyRCorner) + ${q}(wR)) / ${q}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${q}(uniforms.Dy_shape[${j}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${q}(dyCCorner) + ${q}(wC)) / ${q}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${q}(uniforms.Dy_shape[${R}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f?`
                var x_offset = ${J.indicesToOffset(`${J.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${G.indicesToOffset(`${G.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${b};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:c}) {
                  ${le()}
                  inputChannel = inputChannel + ${f?4:c};
                }
                ${B()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${_}]`:""};
            ${Z.setByOffset("global_idx","value")};
          `;return`
    ${L.registerUniforms(H).declareVariables(...X,Z)}
      ${L.mainStart()}
      ${L.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${V}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${c}${b}${_}${f}${y}`,inputDependencies:w},getRunData:()=>({dispatchGroup:{x:$[0],y:$[1],z:$[2]},outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],programUniforms:x}),getShaderSource:P}}}),ul,ll,dl,hn,Eh,pl,fn,cl,kh,iy=U(()=>{ry(),Ht(),kt(),ul=(e,t,r,i,n,a)=>(e-1)*t+r+(i-1)*n+1-a,ll=(e,t,r,i,n)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=a,r[n]=e-a):t==="SAME_LOWER"&&(r[i]=e-a,r[n]=a)},dl=(e,t,r,i,n,a,s,u,l,p)=>{let c=e.length-2,f=p.length===0;l.length<c&&l.push(...Array(c-l.length).fill(0));let g=e[0],y=t[u?3:1]*n;for(let _=0,b=e.length-c-(u?1:0);_<c;++_,++b){let T=e[b],$=f?T*s[_]:p[_],w=ul(T,s[_],a[_],t[b],r[_],$);ll(w,i,a,_,_+c),f&&p.push(s[_]*(T-1)+l[_]+(t[b]-1)*r[_]+1-a[_]-a[_+c])}p.splice(0,0,g),p.splice(u?3:1,0,y)},hn=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((f,g)=>f*g,1)===0){r.length=0;for(let f=2;f<t[1].dims.length;++f)r.push(t[1].dims[f])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let n=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,l=e.dilations.slice();if(l.reduce((f,g)=>f+g,0)===0){let f=t[0].dims.length-2;l=new Array(f).fill(1)}let p=e.strides.slice();if(p.reduce((f,g)=>f+g,0)===0){let f=t[0].dims.length-2;p=new Array(f).fill(1)}dl(u,r,l,e.autoPad,e.group,n,p,i,s,a);let c=Object.assign({},e);return Object.assign(c,{kernelShape:r,pads:n,outputPadding:s,outputShape:a,dilations:l,strides:p}),c},Eh=e=>{let t=wa(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,a=e.group??1,s=e.kernelShape,u=e.pads,l=e.strides,p=e.wIsConst(),c=e.outputPadding,f=e.outputShape;return{autoPad:i,format:r,dilations:n,group:a,kernelShape:s,outputPadding:c,outputShape:f,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},pl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((s,u)=>s+u,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((s,u)=>s+u,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((s,u)=>s+u,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((s,u)=>s+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},fn=(e,t,r,i)=>{let n=e.kernelCustomData.wT??e.compute(Le(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n);let a=[t[0],n];t.length===3&&a.push(t[2]),e.compute(Sh(a,r,i),{inputs:a})},cl=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=t.kernelShape;(n.length===0||n[0]===0)&&(n=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),a=[1].concat(a),n=[1].concat(n);let l=t.outputPadding;l=[0].concat(l);let p=hn({...t,pads:u,strides:s,dilations:a,kernelShape:n,outputPadding:l},i);fn(e,i,p,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},kh=(e,t)=>{if(pl(e.inputs,t),e.inputs[0].dims.length===3)cl(e,t);else{let r=hn(t,e.inputs);fn(e,e.inputs,r)}}}),hl,Ih,Ch,ny=U(()=>{te(),re(),xe(),ie(),hl=(e,t,r,i)=>{let n=O.size(t),a=t.length,s=N("input",e,a),u=K("output",e,a),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),p=O.normalizeAxis(l,a),c=f=>{let g=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,y=Y("uniforms.input_shape","uniforms.axis",a),_=i.reverse?g+(i.exclusive?" + 1":""):"0",b=i.reverse?y:g+(i.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${_};
                  let last : i32 = ${b};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},{type:12,data:p},...Q(t,t)]}),getShaderSource:c}},Ih=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,n=e.inputs[1];e.compute(hl(i,r,n,t),{inputs:[0]})},Ch=e=>{let t=e.exclusive===1,r=e.reverse===1;return he({exclusive:t,reverse:r})}}),fl,ml,gl,zh,Ah,ay=U(()=>{te(),re(),xe(),ie(),fl=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},ml=(e,t,r,i)=>{let n=[];n.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let a=0;a<t;++a)n.push(r.indicesSet("a",e[a],`i[${a}]`));return n.push("return a;}"),n.join(`
`)},gl=(e,t)=>{let r,i,n,a,s,u,l=t.format==="NHWC",p=t.blocksize,c=t.mode==="DCR";l?([r,i,n,a]=e.dims,s=c?[r,i,n,p,p,a/p**2]:[r,i,n,a/p**2,p,p],u=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,n,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=c?[r,p,p,a/p**2,i,n]:[r,a/p**2,p,p,i,n],u=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=e.reshape(s),g=f.dims.length,y=e.dataType,_=N("a",y,g),b=K("output",y,g),T=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(_,b)}

  ${ml(u,g,_,b)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let w=l?[r,i*p,n*p,a/p**2]:[r,a/p**2,i*p,n*p],k=O.size(w),S=f.dims,I=O.sortBasedOnPerm(S,u);return{outputs:[{dims:w,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:[{type:12,data:k},...Q(S,I)]}},getShaderSource:T}},zh=(e,t)=>{fl(e.inputs),e.compute(gl(e.inputs[0],t))},Ah=e=>he({blocksize:e.blocksize,mode:e.mode,format:e.format})}),jr,cr,mn,yl,_l,wl,bl,gn,vl,Oh,Rh,sy=U(()=>{te(),re(),xe(),ie(),jr="[a-zA-Z]|\\.\\.\\.",cr="("+jr+")+",mn="^"+cr+"$",yl="("+cr+",)*"+cr,_l="^"+yl+"$",wl=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},bl=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(_l)))throw new Error("Invalid LHS term");if(r.split(",").forEach((n,a)=>{let s=e[a].dims.slice();if(!n.match(RegExp(mn)))throw new Error("Invalid LHS term");let u=this.processTerm(n,!0,s,a);this.lhs.push(u)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([n,a])=>a.count===1||n==="...").map(([n])=>n).join("");else if(!i.match(RegExp(cr)))throw new Error("Invalid RHS");i.match(RegExp(jr,"g"))?.forEach(n=>{if(n==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let a=this.symbolToInfo.get(n);if(a===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(a.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let n=r.length,a=!1,s=[],u=0;if(!e.match(RegExp(mn))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(jr,"g")),p=new wl(i);return l?.forEach((c,f)=>{if(c==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let g=n-l.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(u,u+g),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<s.length;y++){let _=String.fromCharCode(48+y);p.addSymbol(_,f+y),this.addSymbol(_,r[u++],i)}}else p.addSymbol(c,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,r[u++],i)}),p}},gn=e=>e+"_max",vl=(e,t,r,i)=>{let n=e.map(p=>p.length).map((p,c)=>N(`input${c}`,t,p)),a=O.size(i),s=K("output",t,i.length),u=[...r.symbolToInfo.keys()].filter(p=>!r.rhs.symbolToIndices.has(p)),l=p=>{let c=[],f="var prod = 1.0;",g="var sum = 0.0;",y="sum += prod;",_=[],b=[],T=[],$=[],w=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((S,I)=>{if(r.rhs.symbolToIndices.has(I)){let z=r.rhs.symbolToIndices.get(I)?.[0];z!==void 0&&r.lhs.forEach((A,x)=>{if(S.inputIndices.includes(x)){let P=A.symbolToIndices.get(I);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(L=>{c.push(`${n[x].indicesSet(`input${x}Indices`,L,s.indicesGet("outputIndices",z))}`)})}})}else r.lhs.forEach((z,A)=>{if(S.inputIndices.includes(A)){let x=z.symbolToIndices.get(I);if(x===void 0)throw new Error("Invalid symbol error");x.forEach(P=>{_.push(`${n[A].indicesSet(`input${A}Indices`,P,`${I}`)}`)}),$.push(`prod *= ${n[A].getByIndices(`input${A}Indices`)};`)}}),b.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${gn(I)}; ${I}++) {`),T.push("}")});let k=w?[...c,`let sum = ${n.map((S,I)=>S.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...c,g,...b,..._,f,...$,y,...T];return`
            ${p.registerUniforms(u.map(S=>({name:`${gn(S)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...n,s)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${n.map((S,I)=>`var input${I}Indices: ${n[I].type.indices};`).join(`
`)}
            ${k.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let p=u.filter(f=>r.symbolToInfo.has(f)).map(f=>({type:12,data:r.symbolToInfo.get(f)?.dimValue||0}));p.push({type:12,data:a});let c=e.map((f,g)=>[...Q(f)]).reduce((f,g)=>f.concat(g),p);return c.push(...Q(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}},getShaderSource:l}},Oh=(e,t)=>{let r=new bl(e.inputs,t.equation),i=r.outputDims,n=e.inputs.map((a,s)=>a.dims);e.compute(vl(n,e.inputs[0].dataType,r,i))},Rh=e=>{let t=e.equation.replace(/\s+/g,"");return he({equation:t})}}),$l,yn,xl,Tl,Mh,oy=U(()=>{te(),re(),ie(),$l=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,n=t.length<r.length?0:t.length-r.length;for(;i<r.length&&n<t.length;++i,++n)if(r[i]!==t[n]&&r[i]!==1&&t[n]!==1)throw new Error("Expand requires shape to be broadcastable to input")},yn=(e,t)=>{let r=e.length-t.length,i=[];for(let n=0;n<r;++n)i.push(e[n]);for(let n=0;n<t.length;++n)i.push(t[n]===1?e[n+r]:t[n]);return i},xl=(e,t)=>e.length>t.length?yn(e,t):yn(t,e),Tl=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=xl(t,r),n=e[0].dataType,a=n===9||O.size(t)===1,s=n===9||t.length>0&&t[t.length-1]%4===0?4:1,u=a||i.length>0&&i[i.length-1]%4===0?4:1,l=Math.ceil(O.size(i)/u),p=f=>{let g=N("input",n,t.length,s),y=K("output",n,i.length,u),_;if(n===9){let b=(T,$,w="")=>`
          let outputIndices${$} = ${y.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${g.broadcastedIndicesToOffset(`outputIndices${$}`,y)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${T}[${$}] = ${w}(${g.getByOffset(`index${$}`)}[component${$}]);
        `;_=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${b("data",0,"u32")}
        ${b("data",1,"u32")}
        ${b("data",2,"u32")}
        ${b("data",3,"u32")}
        ${y.setByOffset("global_idx","data")}
      }`}else _=`
        let outputIndices = ${y.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${g.broadcastedIndicesToOffset("outputIndices",y)};
        let data = ${y.type.value}(${g.getByOffset(`inputOffset / ${s}`)});
        ${y.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(g,y)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${_}`},c=[{type:12,data:l},...Q(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${s}${u}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c})}},Mh=e=>{$l(e.inputs),e.compute(Tl(e.inputs),{inputs:[0]})}}),Sl,Nh,uy=U(()=>{te(),re(),ie(),_a(),Sl=e=>{let t=e[0].dataType,r=O.size(e[0].dims),i=O.size(e[1].dims),n=i%4===0,a=s=>{let u=N("x",t,[1],4),l=N("bias",t,[1],4),p=K("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=y=>`
      let bias${y}_offset: u32 = (global_idx * 4 + ${y}) % uniforms.bias_size;
      let bias${y} = ${l.getByOffset(`bias${y}_offset / 4`)}[bias${y}_offset % 4];`,g=n?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(c).declareVariables(u,l,p)}

    ${Hn(Re(t))}

    ${s.mainStart(er)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${g}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",jn("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/er/4)}})}},Nh=e=>{e.inputs.length<2||O.size(e.inputs[1].dims)===0?th(e):e.compute(Sl(e.inputs))}}),El,kl,Bh,Dh,ly=U(()=>{te(),re(),xe(),ie(),El=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},kl=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=O.normalizeAxis(t.axis,n),s=r.slice(0);s.splice(a,1,...i);let u=r[a],l=e[0].dataType===9?4:1,p=Math.ceil(O.size(s)/l),c=[{type:12,data:p},{type:6,data:u},{type:12,data:a},...Q(e[0].dims,e[1].dims,s)],f=g=>{let y=N("data",e[0].dataType,e[0].dims.length,l),_=N("inputIndices",e[1].dataType,e[1].dims.length),b=K("output",e[0].dataType,s.length,l),T=w=>{let k=i.length,S=`var indicesIndices${w}  = ${_.type.indices}(0);`;for(let I=0;I<k;I++)S+=`${k>1?`indicesIndices${w}[${I}]`:`indicesIndices${w}`} = ${s.length>1?`outputIndices${w}[uniforms.axis + ${I}]`:`outputIndices${w}`};`;S+=`
          var idx${w} = ${_.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${y.type.indices};
        `;for(let I=0,z=0;I<n;I++)I===a?(S+=`${n>1?`dataIndices${w}[${I}]`:`dataIndices${w}`} = u32(idx${w});`,z+=k):(S+=`${n>1?`dataIndices${w}[${I}]`:`dataIndices${w}`} = ${s.length>1?`outputIndices${w}[${z}]`:`outputIndices${w}`};`,z++);return S},$;if(e[0].dataType===9){let w=(k,S,I="")=>`
          let outputIndices${S} = ${b.offsetToIndices(`outputOffset + ${S}u`)};
          ${T(S)};
          let offset${S} = ${y.indicesToOffset(`dataIndices${S}`)};
          let index${S} = offset${S} / 4u;
          let component${S} = offset${S} % 4u;
          ${k}[${S}] = ${I}(${y.getByOffset(`index${S}`)}[component${S}]);
        `;$=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${w("value",0,"u32")}
        ${w("value",1,"u32")}
        ${w("value",2,"u32")}
        ${w("value",3,"u32")}
        ${b.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${b.offsetToIndices("global_idx")};
      ${T("")};
      let value = ${y.getByIndices("dataIndices")};
      ${b.setByOffset("global_idx","value")};
      `;return`
      ${g.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(y,_,b)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:c}),getShaderSource:f}},Bh=e=>he({axis:e.axis}),Dh=(e,t)=>{let r=e.inputs;El(r),e.compute(kl(e.inputs,t))}}),Il,Ph,Uh,dy=U(()=>{te(),re(),ie(),Il=(e,t,r,i,n,a,s,u,l)=>{let p=[{type:12,data:a},{type:12,data:i},{type:12,data:n},{type:12,data:r},{type:12,data:s},{type:12,data:u},{type:12,data:l}],c=[a];p.push(...Q(t.dims,c));let f=g=>{let y=N("indices_data",t.dataType,t.dims.length),_=K("input_slice_offsets_data",12,1,1),b=[y,_],T=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:n.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${g.registerUniforms(T).declareVariables(...b)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${n.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${n.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}),getShaderSource:f},{inputs:[t],outputs:[-1]})[0]},Ph=(e,t)=>{let r=e.inputs,i=r[0].dims,n=r[0].dataType,a=r[1].dims,s=a[a.length-1],u=O.sizeToDimension(a,a.length-1),l=O.sizeFromDimension(i,t.batchDims+s),p=O.sizeToDimension(i,t.batchDims),c=O.sizeFromDimension(i,t.batchDims),f=u/p,g=new Array(s),y=l;for(let S=0;S<s;++S)g[s-1-S]=y,y*=i[t.batchDims+s-1-S];let _=Il(e,r[1],g,t.batchDims,i,u,f,c,s),b=t.batchDims+s;if(b>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let T=a.slice(0,-1).concat(i.slice(b)),$=O.size(T),w=[{type:12,data:$},{type:12,data:l},...Q(r[0].dims,_.dims,T)],k=S=>{let I=N("data",r[0].dataType,r[0].dims.length),z=N("slice_offsets",12,_.dims.length),A=K("output",r[0].dataType,T.length);return`
          ${S.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(I,z,A)}
            ${S.mainStart()}
            ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:T,dataType:n}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:w}),getShaderSource:k},{inputs:[r[0],_]})},Uh=e=>({batchDims:e.batch_dims,cacheKey:""})}),Cl,zl,Lh,qh,py=U(()=>{te(),re(),xe(),ie(),Cl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=O.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,n=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==n.dims.length||!n.dims.map((u,l)=>l===r?Math.ceil(u/i)===a.dims[l]:u===a.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==n.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((u,l)=>u===a.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},zl=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=O.normalizeAxis(t.gatherAxis,n),s=O.normalizeAxis(t.quantizeAxis,n),u=r.slice(0);u.splice(a,1,...i);let l=O.size(u),p=e[2].dataType,c=e[0].dataType===22,f=[{type:12,data:l},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...Q(...e.map((y,_)=>y.dims),u)],g=y=>{let _=N("data",e[0].dataType,e[0].dims.length),b=N("inputIndices",e[1].dataType,e[1].dims.length),T=N("scales",e[2].dataType,e[2].dims.length),$=e.length>3?N("zeroPoint",e[3].dataType,e[3].dims.length):void 0,w=K("output",p,u.length),k=[_,b,T];$&&k.push($);let S=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(S).declareVariables(...k,w)}
        ${y.mainStart()}
        let output_indices = ${w.offsetToIndices("global_idx")};
        var indices_indices = ${b.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${w.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${b.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${w.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${w.indicesGet("output_indices","i")};
          ${_.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${b.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[a]};
        }
        ${_.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${w.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${_.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${_.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${_.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${T.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${T.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${T.getByIndices("scale_indices")};
        ${$?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${$.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${$.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Re(p)}(quantized_data - zero_point) * scale;
        ${w.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((y,_)=>_!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(y,_)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:p}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:g}},Lh=(e,t)=>{let r=e.inputs;Cl(r,t),e.compute(zl(e.inputs,t))},qh=e=>he({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Al,Ol,Wh,Vh,cy=U(()=>{te(),re(),xe(),ie(),Al=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Ol=(e,t)=>{let r=e[0].dims,i=e[0].dataType,n=r.length,a=e[1].dims,s=e[1].dataType,u=O.normalizeAxis(t.axis,n),l=r[u],p=a.slice(0),c=O.size(p),f=N("input",i,n),g=N("indicesInput",s,a.length),y=K("output",i,p.length),_=[{type:12,data:c},{type:6,data:l},{type:12,data:u}];return _.push(...Q(r,a,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:_}),getShaderSource:b=>`
      ${b.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,g,y)}
      ${b.mainStart()}
      ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${y.offsetToIndices("global_idx")};

      var idx = ${g.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${y.setByOffset("global_idx","value")};
  }`}},Wh=e=>he({axis:e.axis}),Vh=(e,t)=>{let r=e.inputs;Al(r),e.compute(Ol(e.inputs,t))}}),Rl,Ml,Gh,Fh,hy=U(()=>{te(),re(),ie(),Rl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Ml=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[n,a,s]=Wp.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),u=[n,a];if(!u)throw new Error("Can't use gemm on the given tensors");let l=16,p=Math.ceil(a/l),c=Math.ceil(n/l),f=!0,g=O.size(u),y=[{type:12,data:f?p:g},{type:12,data:n},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],_=["type","type"];e.length===3&&(y.push(...Q(e[2].dims)),_.push("rank")),y.push(...Q(u));let b=$=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let k=t.alpha===1?"":"value *= uniforms.alpha;",S=N("a",e[0].dataType,e[0].dims),I=N("b",e[1].dataType,e[1].dims),z=S.type.value,A=null,x=[S,I];e.length===3&&(A=N("c",e[2].dataType,e[2].dims.length),x.push(A));let P=K("output",e[0].dataType,u.length);x.push(P);let L=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(L).declareVariables(...x)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${z}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${k}
    ${A!=null?`let cOffset = ${A.broadcastedIndicesToOffset("vec2(m, n)",P)}; value += ${z}(uniforms.beta) * ${A.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},T=$=>{let w=N("a",e[0].dataType,e[0].dims),k=N("b",e[1].dataType,e[1].dims),S=null,I=[w,k];e.length===3&&(S=N("c",e[2].dataType,e[2].dims.length),I.push(S));let z=K("output",e[0].dataType,u.length);I.push(z);let A=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],x="",P="";t.transA&&t.transB?(P=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,x="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(P=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,x="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(P=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,x="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(P=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,x="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let L=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(A).declareVariables(...I)}
  var<workgroup> tile_a: array<array<${w.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${k.type.storage}, ${l}>, ${l}>;
  ${$.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${z.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${P}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${x}
      }
      workgroupBarrier();
    }

    ${L}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${S!=null?`let cOffset = ${S.broadcastedIndicesToOffset("vec2(m, n)",z)}; value += ${z.type.value}(uniforms.beta) * ${S.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:p*c},programUniforms:y}),getShaderSource:T}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:y}),getShaderSource:b}},Gh=e=>{let t=e.transA,r=e.transB,i=e.alpha,n=e.beta;return{transA:t,transB:r,alpha:i,beta:n,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Fh=(e,t)=>{Rl(e.inputs),e.compute(Ml(e.inputs,t))}}),at,dt,At,Ot,Nl,Bl,Dl,Pl,Ul,Ll,ql,Wl,Hh,jh,fy=U(()=>{te(),re(),xe(),ie(),[at,dt,At,Ot]=[0,1,2,3],Nl=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Bl=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Dl=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Pl=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Ul=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Ll=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${at}] = batch;
     indices[${dt}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${At}] = u32(r);
            indices[${Ot}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${At}] = u32(clamp(r, 0, H - 1));
          indices[${Ot}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${At}] = gs_reflect(r, border[1], border[3]);
          indices[${Ot}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,ql=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${at}], indices[${dt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${at}], indices[${dt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${at}], indices[${dt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${at}], indices[${dt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${at}], indices[${dt}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${at}], indices[${dt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Wl=(e,t)=>{let r=N("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],n=N("grid",e[1].dataType,i.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[at,dt,At,Ot]=[0,3,1,2]);let s=K("output",e[0].dataType,a.length),u=r.type.value,l=O.size(a),p=[{type:12,data:l},...Q(e[0].dims,i,a)],c=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(r,n,s)}
  ${Bl}
  ${Dl(u)}
  ${Pl(t)}
  ${Ul(t)}
  ${Ll(r,u,t)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${At}]);
      let W_in = i32(uniforms.x_shape[${Ot}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${at}], indices[${At}], indices[${Ot}]);
      let nxy = ${n.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${ql(s,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let g=O.size(a);return{outputs:[{dims:a,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:p}},getShaderSource:c}},Hh=(e,t)=>{Nl(e.inputs),e.compute(Wl(e.inputs,t))},jh=e=>he({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Be,Vl,Kh,_n,Gl,vr,Xh,Yh=U(()=>{te(),re(),xe(),fa(),ya(),ie(),kt(),Be=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Vl=(e,t)=>{let r=e[0],i=Be(e,1),n=Be(e,2),a=Be(e,3),s=Be(e,4),u=Be(e,5),l=Be(e,6),p=Be(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=r.dims[0],f=r.dims[1],g=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],y=f,_=0,b=0,T=Math.floor(g/t.numHeads);if(l&&p&&O.size(l.dims)&&O.size(p.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==t.numHeads||l.dims[3]!==T)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==c||p.dims[1]!==t.numHeads||p.dims[3]!==T)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');_=l.dims[2],b=l.dims[2]}else if(l&&O.size(l.dims)||p&&O.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(i&&O.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,y=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==T)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,y=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==T)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,y=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(a&&O.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=_+y,k=0;if(s&&O.size(s.dims)>0){k=8;let A=s.dims;throw A.length===1?A[0]===c?k=1:A[0]===3*c+2&&(k=3):A.length===2&&A[0]===c&&A[1]===w&&(k=5),k===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let S=!1,I=g;if(n&&O.size(n.dims)>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(y!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=n.dims[2]}else{if(y!==n.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');I=n.dims[1]*n.dims[3],S=!0}}let z=!1;if(s&&O.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(u&&O.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==t.numHeads||u.dims[2]!==f||u.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:f,pastSequenceLength:_,kvSequenceLength:y,totalSequenceLength:w,maxSequenceLength:b,inputHiddenSize:0,hiddenSize:g,vHiddenSize:I,headSize:T,vHeadSize:Math.floor(I/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:k,scale:t.scale,broadcastResPosBias:z,passPastInKv:S,qkvFormat:$}},Kh=e=>he({...e}),_n=he({perm:[0,2,1,3]}),Gl=(e,t,r,i,n,a,s)=>{let u=[i,n,a],l=O.size(u),p=[{type:12,data:l},{type:12,data:s},{type:12,data:a}],c=f=>{let g=K("qkv_with_bias",t.dataType,u),y=N("qkv",t.dataType,u),_=N("bias",r.dataType,u),b=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(b).declareVariables(y,_,g)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:c},{inputs:[t,r],outputs:[-1]})[0]},vr=(e,t,r,i,n,a,s,u)=>{let l=a;if(s&&O.size(s.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Gl(e,a,s,t,i,r*n,u),l=l.reshape([t,i,r,n]),r===1||i===1?l:e.compute(Le(l,_n.perm),{inputs:[l],outputs:[-1]})[0]}else return a.dims.length===3&&(l=a.reshape([t,i,r,n])),r===1||i===1?l:e.compute(Le(l,_n.perm),{inputs:[l],outputs:[-1]})[0]},Xh=(e,t)=>{let r=Vl(e.inputs,t),i=e.inputs[0],n=Be(e.inputs,1),a=Be(e.inputs,2),s=Be(e.inputs,3),u=Be(e.inputs,4),l=Be(e.inputs,5),p=Be(e.inputs,6),c=Be(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(n?.dims.length===5)throw new Error("Packed KV is not implemented");let f=n&&a&&n.dims.length===4&&a.dims.length===4,g=vr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,s,0);if(f)return Tr(e,g,n,a,u,void 0,p,c,l,r);if(!n||!a)throw new Error("key and value must be provided");let y=vr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,n,s,r.hiddenSize),_=vr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,a,s,2*r.hiddenSize);Tr(e,g,y,_,u,void 0,p,c,l,r)}}),Fl,Hl,jl,Kl,Zn,Qh,Zh,Jh=U(()=>{te(),re(),xe(),ie(),Fl=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Hl=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),i=r.length),he({numOutputs:i,axis:t.axis,splitSizes:r})},jl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${Y("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Kl=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let n=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(n):i===0?r.push(`if (output_number == ${i}u) { ${n} }`):i===t-1?r.push(`else { ${n} }`):r.push(`else if (output_number == ${i}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Zn=(e,t)=>{let r=e[0].dims,i=O.size(r),n=e[0].dataType,a=O.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),u=N("input",n,r.length),l=new Array(t.numOutputs),p=[],c=[],f=0,g=[{type:12,data:i}];for(let _=0;_<t.numOutputs;_++){f+=t.splitSizes[_],l[_]=f;let b=r.slice();b[a]=t.splitSizes[_],c.push(b),s[_]=K(`output${_}`,n,b.length),p.push({dims:c[_],dataType:e[0].dataType})}g.push({type:12,data:l},...Q(r,...c));let y=_=>`
  ${_.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...s)}
  ${jl(l.length)}
  ${Kl(s)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Y("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:g})}},Qh=(e,t)=>{Fl(e.inputs);let r=e.inputs.length===1?t:Hl(e.inputs,t);e.compute(Zn(e.inputs,r),{inputs:[0]})},Zh=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return he({axis:t,numOutputs:i,splitSizes:r})}}),Xl,li,ef,tf=U(()=>{te(),re(),xe(),ie(),Xl=(e,t)=>{let[r,i,n,a]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!O.areEqual(i.dims,[])&&!O.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!O.areEqual(n.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],p=r.dims[r.dims.length-2],c=n.dims[0],f=O.sizeFromDimension(r.dims,1)/p,g=u===0?n.dims[1]*2:f/s;if(u>g)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(l!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(p!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(g/2!==n.dims[1]&&u/2!==n.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`);if(p>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},li=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:n,scale:a}=t,s=e[0].dims[0],u=O.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],p=u/l,c=e[2].dims[1],f=n===0?c*2:p/i,g=new Array(s,l,p/f,f-c),y=O.computeStrides(g),_=[{type:1,data:a},{type:12,data:g},{type:12,data:y},...e[0].dims.length===3?new Array({type:12,data:[u,p,f,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,f,l*f,1]}):[],...Q(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],b=T=>{let $=N("input",e[0].dataType,e[0].dims.length),w=N("position_ids",e[1].dataType,e[1].dims.length),k=N("cos_cache",e[2].dataType,e[2].dims.length),S=N("sin_cache",e[3].dataType,e[3].dims.length),I=K("output",e[0].dataType,e[0].dims.length);return T.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:g.length},{name:"global_strides",type:"u32",length:y.length},{name:"input_output_strides",type:"u32",length:y.length}]),`
        ${T.declareVariables($,w,k,S,I)}

        ${T.mainStart(er)}
          let half_rotary_emb_dim = uniforms.${k.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",K("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${$.getByOffset("i")} * ${k.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${I.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${k.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:he({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(g)/er)},programUniforms:_})}},ef=(e,t)=>{Xl(e.inputs,t),e.compute(li(e.inputs,t))}}),Yl,Ql,wn,Zl,rf,my=U(()=>{xe(),te(),ya(),Yh(),Jh(),kt(),tf(),ie(),Yl=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],n=e[2],a=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,l=r.dims[0],p=r.dims[1],c=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],f=p,g=0,y=!i||i.dims.length===0,_=Math.floor(y?c/(t.numHeads+2*t.kvNumHeads):c/t.numHeads);y&&(c=_*t.numHeads);let b=a&&a.dims.length!==0,T=s&&s.dims.length!==0;if(b&&a.dims.length===4&&a.dims[0]===l&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===_)throw new Error("BSNH pastKey/pastValue is not supported");if(b&&T){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=a.dims[2]}else if(b||T)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==_)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');f=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==_)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}let w=0,k=!1,S=t.kvNumHeads?_*t.kvNumHeads:c;if(n&&n.dims.length>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(f!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');S=n.dims[2]}else{if(f!==n.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');S=n.dims[1]*n.dims[3],k=!0}}let I=e.length>4?e[5]:void 0;if(I&&I.dims.length!==1&&I.dims[0]!==l)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:l,sequenceLength:p,pastSequenceLength:g,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:S,headSize:_,vHeadSize:Math.floor(S/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:k,qkvFormat:$}},Ql=he({perm:[0,2,1,3]}),wn=(e,t,r)=>{let i=t,n=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,n,r.headSize]),i=e.compute(Le(i,Ql.perm),{inputs:[i],outputs:[-1]})[0]),i},Zl=(e,t,r,i)=>{let n=7,a=["type","type"],s=[e*t],u=e*t,l=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],p=c=>{let f=N("seq_lens",r.dataType,r.dims),g=N("total_seq_lens",i.dataType,i.dims),y=K("pos_ids",n,s),_=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(_).declareVariables(f,g,y)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${g.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${f.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${y.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${y.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${y.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:p}},rf=(e,t)=>{let r=Yl(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,c=r.kvNumHeads?r.kvNumHeads:r.numHeads,f=he({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,c*r.headSize,c*r.headSize]}),[g,y,_]=!n&&!a?e.compute(Zn([i],f),{inputs:[i],outputs:[-1,-1,-1]}):[i,n,a],b,T;if(t.doRotary){let S=e.compute(Zl(r.batchSize,r.sequenceLength,l,p),{inputs:[l,p],outputs:[-1]})[0],I=e.inputs[7],z=e.inputs[8],A=he({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),x=[g,S,I,z],P=[-1];b=e.compute(li(x,A),{inputs:x,outputs:P})[0],x.splice(0,1,y);let L=he({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});T=e.compute(li(x,L),{inputs:x,outputs:P})[0]}let $=vr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?b:g,void 0,0),w=wn(e,t.doRotary?T:y,r),k=wn(e,_,r);Tr(e,$,w,k,void 0,void 0,s,u,void 0,r,l,p)}}),bn,Jl,ed,nf,gy=U(()=>{te(),re(),kt(),ie(),bn=(e,t,r,i,n,a,s,u)=>{let l=ve(a),p=l===1?"f32":`vec${l}f`,c=l===1?"vec2f":`mat2x${l}f`,f=n*s,g=64;f===1&&(g=256);let y=[n,s,a/l],_=[n,s,2],b=["rank","type","type"],T=[];T.push(...Q(y,_));let $=w=>{let k=N("x",t.dataType,3,l),S=N("scale",r.dataType,r.dims),I=N("bias",i.dataType,i.dims),z=K("output",1,3,2),A=[k,S,I,z];return`
  var<workgroup> workgroup_shared : array<${c}, ${g}>;
  const workgroup_size = ${g}u;
  ${w.declareVariables(...A)}
  ${w.mainStart(g)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${p}(0);
    var squared_sum = ${p}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${p}(${k.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Et("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${Et("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${g}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:_,dataType:1}],dispatchGroup:{x:f},programUniforms:T}),getShaderSource:$},{inputs:[t,r,i],outputs:[-1]})[0]},Jl=(e,t,r)=>{let i=t[0].dims,n=i,a=2,s=i[0],u=i[1],l=O.sizeFromDimension(i,a),p=ve(l),c=O.size(n)/p,f=bn(e,t[0],t[1],t[2],s,l,u,r.epsilon),g=[s,u,l/p],y=[s,u],_=["type","none"],b=T=>{let $=N("x",t[0].dataType,g.length,p),w=N("scale_shift",1,y.length,2),k=K("output",t[0].dataType,g.length,p),S=[$,w,k];return`
  ${T.registerUniform("output_size","u32").declareVariables(...S)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${k.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${k.type.value}(scale_shift.x) + ${k.type.value}(scale_shift.y);
      ${k.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...Q(g,y,g)]}),getShaderSource:b},{inputs:[t[0],f]})},ed=(e,t,r)=>{let i=t[0].dims,n=i,a=i[0],s=i[i.length-1],u=O.sizeFromDimension(i,1)/s,l=ve(s),p=O.size(n)/l,c=[{type:12,data:u},{type:12,data:Math.floor(s/l)}],f=["type","type"],g=!1,y=[0,i.length-1];for(let $=0;$<i.length-2;$++)g=g||i[$+1]!==1,y.push($+1);g=g&&i[i.length-1]!==1;let _=g?e.compute(Le(e.inputs[0],y),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},($,w)=>i[y[w]])),b=bn(e,_,t[1],t[2],a,u,s,r.epsilon),T=$=>{let w=Ee(t[0].dataType),k=l===1?"vec2f":`mat${l}x2f`,S=A=>{let x=A===0?"x":"y",P=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${w}(${P}(scale.${x}))`;case 2:return`vec2<${w}>(${P}(scale[0].${x}, scale[1].${x}))`;case 4:return`vec4<${w}>(${P}(scale[0].${x}, scale[1].${x}, scale[2].${x}, scale[3].${x}))`;default:throw new Error(`Not supported compoents ${l}`)}},I=N("input",t[0].dataType,t[0].dims,l),z=K("output",t[0].dataType,n,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${I.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${k}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${z.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${S(0)}, ${S(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:c}),getShaderSource:T},{inputs:[t[0],b]})},nf=(e,t)=>{t.format==="NHWC"?ed(e,e.inputs,t):Jl(e,e.inputs,t)}}),td,rd,af,yy=U(()=>{te(),re(),ie(),td=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},rd=(e,t,r)=>{let i=t.simplified,n=e[0].dims,a=e[1],s=!i&&e[2],u=n,l=O.normalizeAxis(t.axis,n.length),p=O.sizeToDimension(n,l),c=O.sizeFromDimension(n,l),f=O.size(a.dims),g=s?O.size(s.dims):0;if(f!==c||s&&g!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${g}`);let y=[];for(let I=0;I<n.length;++I)I<l?y.push(n[I]):y.push(1);let _=ve(c),b=["type","type"],T=[{type:12,data:p},{type:1,data:c},{type:12,data:Math.floor(c/_)},{type:1,data:t.epsilon}];s&&b.push("type");let $=r>1,w=r>2,k=I=>{let z=Ee(e[0].dataType),A=[N("x",e[0].dataType,e[0].dims,_),N("scale",a.dataType,a.dims,_)];s&&A.push(N("bias",s.dataType,s.dims,_)),A.push(K("output",e[0].dataType,u,_)),$&&A.push(K("mean_data_output",1,y)),w&&A.push(K("inv_std_output",1,y));let x=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms(x).declareVariables(...A)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Vn("f32",_)};
    var mean_square_vector = ${Vn("f32",_)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Qt(z,_,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Et("mean_vector",_)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Et("mean_square_vector",_)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Qt(z,_,"x[j + offset]")};
      let f32scale = ${Qt(z,_,"scale[j]")};
      output[j + offset] = ${A[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Qt(z,_,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},S=[{dims:u,dataType:e[0].dataType}];return $&&S.push({dims:y,dataType:1}),w&&S.push({dims:y,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${_};${r};${i}`,inputDependencies:b},getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:T}),getShaderSource:k}},af=(e,t)=>{td(e.inputs),e.compute(rd(e.inputs,t,e.outputCount))}}),id,sf,_y=U(()=>{re(),$a(),xa(),id=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},sf=e=>{id(e.inputs);let t=Jt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(va(e.inputs,{activation:""},t));else{let n=t[t.length-2],a=O.size(e.inputs[0].dims.slice(0,-2)),s=O.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&n===1&&s===1){let u=e.inputs[0].reshape([1,a,i]),l=e.inputs[1].reshape([1,i,r]),p=[1,a,r],c=[u,l];e.compute(ui(c,{activation:""},t,p),{inputs:c})}else e.compute(ui(e.inputs,{activation:""},t))}}}),nd,ad,sd,of,uf,wy=U(()=>{te(),re(),xe(),ie(),nd=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let n=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!O.areEqual(s.dims,[t.n,n,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(O.size(u)!==t.n*n)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,p=t.n*(t.bits===8?n:Math.floor((n*t.bits+7)/8));if(O.size(l)!==p)throw new Error("zeroPoints input size error.")}},ad=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,s=t.n,u=r.slice(0,i-2),l=O.size(u),p=e[1].dims[2]/4,c=e[0].dataType,f=ve(t.k),g=ve(p),y=ve(s),_=u.concat([n,s]),b=n>1&&s/y%2===0?2:1,T=O.size(_)/y/b,$=64,w=[],k=[l,n,a/f],S=O.convertShape(e[1].dims).slice();S.splice(-1,1,p/g),w.push(...Q(k)),w.push(...Q(S)),w.push(...Q(e[2].dims)),e.length===4&&w.push(...Q(O.convertShape(e[3].dims)));let I=[l,n,s/y];w.push(...Q(I));let z=A=>{let x=k.length,P=N("a",e[0].dataType,x,f),L=N("b",12,S.length,g),H=N("scales",e[2].dataType,e[2].dims.length),q=[P,L,H],j=e.length===4?N("zero_points",12,e[3].dims.length):void 0;j&&q.push(j);let R=I.length,D=K("output",e[0].dataType,R,y),G=Ee(e[0].dataType),J=(()=>{switch(f){case 1:return`array<${G}, 8>`;case 2:return`mat4x2<${G}>`;case 4:return`mat2x4<${G}>`;default:throw new Error(`${f}-component is not supported.`)}})(),X=()=>{let B=`
          // reuse a data
            var input_offset = ${P.indicesToOffset(`${P.type.indices}(batch, row, word_offset)`)};
            var a_data: ${J};
            for (var j: u32 = 0; j < ${8/f}; j++) {
              a_data[j] = ${P.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let V=0;V<y*b;V++)B+=`
            b_value = ${g===1?`b${V}_data`:`b${V}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${J}(${Array.from({length:4},(ee,ae)=>`${G}(b_value_lower[${ae}]), ${G}(b_value_upper[${ae}])`).join(", ")});
            b_dequantized_values = ${f===1?`${J}(${Array.from({length:8},(ee,ae)=>`(b_quantized_values[${ae}] - ${j?`zero_point${V}`:"zero_point"}) * scale${V}`).join(", ")});`:`(b_quantized_values - ${J}(${Array(8).fill(`${j?`zero_point${V}`:"zero_point"}`).join(",")})) * scale${V};`};
            workgroup_shared[local_id.x * ${b} + ${Math.floor(V/y)}]${y>1?`[${V%y}]`:""} += ${Array.from({length:8/f},(ee,ae)=>`${f===1?`a_data[${ae}] * b_dequantized_values[${ae}]`:`dot(a_data[${ae}], b_dequantized_values[${ae}])`}`).join(" + ")};
          `;return B},Z=()=>{let B=`
            var col_index = col * ${y};
            ${j?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${G}(8);`}
            `;for(let V=0;V<y*b;V++)B+=`
            let scale${V} = ${H.getByOffset("col_index * nBlocksPerCol + block")};
            ${j?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${j.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${V} = ${G}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return B},le=()=>{let B=`col_index = col * ${y};`;for(let V=0;V<y*b;V++)B+=`
            let b${V}_data = ${L.getByIndices(`${L.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return B+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${J};
            var b_dequantized_values: ${J};`,B};return`
        var<workgroup> workgroup_shared: array<${D.type.value}, ${b*$}>;
        ${A.declareVariables(...q,D)}
        ${A.mainStart([$,1,1])}
          let output_indices = ${D.offsetToIndices(`(global_idx / ${$}) * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${$}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/f};
            ${Z()}
            for (var word: u32 = 0; word < ${p}; word += ${g}) {
              ${le()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${X()}
                word_offset += ${8/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${b}) {
            var output_value: ${D.type.value} = ${D.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${$}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${b};
            }
            ${D.setByIndices(`${D.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${f};${g};${y};${b};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:c}],dispatchGroup:{x:T},programUniforms:w}),getShaderSource:z}},sd=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,s=t.n,u=r.slice(0,i-2),l=O.size(u),p=e[1].dims[2]/4,c=e[0].dataType,f=ve(t.k),g=ve(p),y=u.concat([n,s]),_=128,b=s%8===0?8:s%4===0?4:1,T=_/b,$=T*g*8,w=$/f,k=$/t.blockSize,S=O.size(y)/b,I=[],z=[l,n,a/f],A=O.convertShape(e[1].dims).slice();A.splice(-1,1,p/g),I.push(...Q(z)),I.push(...Q(A)),I.push(...Q(e[2].dims)),e.length===4&&I.push(...Q(O.convertShape(e[3].dims)));let x=[l,n,s];I.push(...Q(x));let P=L=>{let H=z.length,q=N("a",e[0].dataType,H,f),j=N("b",12,A.length,g),R=N("scales",e[2].dataType,e[2].dims.length),D=[q,j,R],G=e.length===4?N("zero_points",12,e[3].dims.length):void 0;G&&D.push(G);let J=x.length,X=K("output",e[0].dataType,J),Z=Ee(e[0].dataType),le=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${Z}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${Z}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${Z}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${Z}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${q.type.value}, ${w}>;
        var<workgroup> inter_results: array<array<${X.type.value}, ${T}>, ${b}>;
        ${L.declareVariables(...D,X)}
        ${L.mainStart([T,b,1])}
          let output_indices = ${X.offsetToIndices(`workgroup_index * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${k} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${w};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${w}; a_offset += ${_})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${q.getByIndices(`${q.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${q.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${k} + local_id.x;
            ${G?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${G.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${Z}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Z}(8);`}
            let scale = ${R.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${j.getByIndices(`${j.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/f};
            for (var i: u32 = 0; i < ${g}; i++) {
              ${le()}
              let b_value = ${g===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${Z}>(${Array.from({length:4},(B,V)=>`${Z}(b_value_lower[${V}]), ${Z}(b_value_upper[${V}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${Z}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(B,V)=>`${`dot(a_data${V}, b_dequantized_values[${V}])`}`).join(" + ")};
              word_offset += ${8/f};
            }
            workgroupBarrier();
          }

          if (local_idx < ${b}) {
            var output_value: ${X.type.value} = ${X.type.value}(0);
            for (var b = 0u; b < ${T}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${X.setByIndices(`${X.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${f};${g};${T};${b}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:c}],dispatchGroup:{x:S},programUniforms:I}),getShaderSource:P}},of=(e,t)=>{nd(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(sd(e.inputs,t)):e.compute(ad(e.inputs,t))},uf=e=>he(e)}),od,ud,ld,dd,pd,cd,hd,fd,lf,by=U(()=>{te(),re(),ie(),od=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},ud=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
            k = i32(${e.indicesGet("indices",n)}) - ${Y("uniforms.pads",n,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Y("uniforms.x_shape",n,t)})) {
              break;
            }
            offset += k * i32(${Y("uniforms.x_strides",n,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},ld=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${Y("uniforms.pads",n,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${Y("uniforms.x_shape",n,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${Y("uniforms.x_shape",n,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${Y("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},dd=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${Y("uniforms.pads",n,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${Y("uniforms.x_shape",n,t)})) {
                  k = i32(${Y("uniforms.x_shape",n,t)}) - 1;
                }
                offset += k * i32(${Y("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},pd=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${Y("uniforms.pads",n,r)};
                if (k < 0)  {
                  k += i32(${Y("uniforms.x_shape",n,t)}]);
                }
                if (k >= i32(${Y("uniforms.x_shape",n,t)})) {
                  k -= i32(${Y("uniforms.x_shape",n,t)});
                }
                offset += k * i32(${Y("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},cd=(e,t,r)=>{switch(r.mode){case 0:return ud(e,t,r.pads.length);case 1:return ld(e,t,r.pads.length);case 2:return dd(e,t,r.pads.length);case 3:return pd(e,t,r.pads.length);default:throw new Error("Invalid mode")}},hd=(e,t)=>{let r=O.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,n=O.size(r),a=[{type:12,data:n},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...Q(e[0].dims,r));let u=["rank"],l=p=>{let c=K("output",e[0].dataType,r.length),f=N("x",e[0].dataType,i.length),g=f.type.value,y=cd(c,i.length,t),_=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&_.push({name:"constant_value",type:s?g:"f32"}),`
            ${p.registerUniforms(_).declareVariables(f,c)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${g}(0);
            ${y}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(r)/64)},programUniforms:a}),getShaderSource:l}},fd=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,a=new Int32Array(2*n).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let l=0;l<u.length;l++)a[Number(u[l])]=Number(r[l]),a[Number(u[l])+n]=Number(r[l+u.length])}else r.forEach((u,l)=>a[Number(l)]=Number(u));let s=[];return a.forEach(u=>s.push(u)),{mode:t.mode,value:i,pads:s}}else return t},lf=(e,t)=>{od(e.inputs);let r=fd(e.inputs,t);e.compute(hd(e.inputs,r),{inputs:[0]})}}),hr,vn,$n,xn,Tn,md,gd,Sn,En,df,pf,kn,cf,hf,In,ff,mf,gf,yf,vy=U(()=>{Ge(),te(),re(),ie(),hr=e=>{if(ge.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},vn=(e,t,r)=>{let i=t.format==="NHWC",n=e.dims.slice();i&&n.splice(1,0,n.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),l=a?t.dilations.slice():[],p=t.pads.slice();si.adjustPoolAttributes(r,n,s,u,l,p);let c=si.computePoolOutputShape(r,n,u,l,s,p,t.autoPad),f=Object.assign({},t);a?Object.assign(f,{kernelShape:s,strides:u,pads:p,dilations:l,cacheKey:t.cacheKey}):Object.assign(f,{kernelShape:s,strides:u,pads:p,cacheKey:t.cacheKey});let g=c.slice();return g.push(g.splice(1,1)[0]),[f,i?g:c]},$n=(e,t)=>{let r=t.format==="NHWC",i=O.size(e),n=O.size(t.kernelShape),a=[{type:12,data:i},{type:12,data:n}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],f=!!(p+c);a.push({type:12,data:u},{type:12,data:l},{type:12,data:p},{type:12,data:c}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let g=!1;if(t.kernelShape.length===2){let y=t.kernelShape[t.kernelShape.length-2],_=t.strides[t.strides.length-2],b=t.pads[t.pads.length/2-2],T=t.pads[t.pads.length-2];g=!!(b+T),a.push({type:12,data:y},{type:12,data:_},{type:12,data:b},{type:12,data:T}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,f,g]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=O.computeStrides(t.kernelShape);a.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((p,c)=>p+c);return[a,s,!!l,!1,!1]}},xn=(e,t,r,i,n,a,s,u,l,p,c,f)=>{let g=n.format==="NHWC",y=t.type.value,_=K("output",t.type.tensor,i);if(n.kernelShape.length<=2){let b="",T="",$="",w=r-(g?2:1);if(c?b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,n.kernelShape.length===2){let k=r-(g?3:2);f?T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${k}] = indices[${k}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${k}] < 0 || xIndices[${k}] >= uniforms.x_shape[${k}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${k}] = indices[${k}] * uniforms.sh - uniforms.phStart + j;
                `,$=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var value = ${y}(${u});
              var pad = 0;
              ${T}
              ${b}
              ${$}
              ${s}

              output[global_idx] = value;
            }`}else{if(g)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let b=n.kernelShape.length,T=n.pads.length,$="";return p?$=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:$=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(l).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var offsets: array<u32, ${b}>;

              var value = ${y}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${b-1}u; j++) {
                  offsets[j] = offset / ${Y("uniforms.kernelStrides","j",b)};
                  offset -= offsets[j] * ${Y("uniforms.kernelStrides","j",b)};
                }
                offsets[${b-1}] = offset;

                isPad = false;
                for (var j = ${r-b}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${Y("uniforms.strides",`j - ${r-b}u`,b)}
                    + offsets[j - ${r-b}u] - ${Y("uniforms.pads","j - 2u",T)};
                  ${$}
              }
              ${s}

              output[global_idx] = value;
            }`}},Tn=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,md=e=>`${Tn(e)};${e.countIncludePad}`,gd=e=>`${Tn(e)};${e.storageOrder};${e.dilations}`,Sn=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),En=(e,t,r,i)=>{let[n,a]=vn(t,i,r),s=N("x",t.dataType,t.dims.length),u=s.type.value,l="value += x_val;",p="";n.countIncludePad?p+=`value /= ${u}(uniforms.kernelSize);`:p+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[c,f,g,y,_]=$n(a,n);c.push(...Q(t.dims,a));let b=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${g};${y};${_}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(a)/64)},programUniforms:c}),getShaderSource:T=>xn(T,s,t.dims.length,a.length,n,l,p,0,f,g,y,_)}},df=e=>{let t=e.count_include_pad!==0,r=Sn(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:md(i)}},pf=(e,t)=>{hr(e.inputs),e.compute(En("AveragePool",e.inputs[0],!1,t))},kn={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},cf=e=>{let t=e.format;return{format:t,...kn,cacheKey:t}},hf=(e,t)=>{hr(e.inputs),e.compute(En("GlobalAveragePool",e.inputs[0],!0,t))},In=(e,t,r,i)=>{let[n,a]=vn(t,i,r),s=`
      value = max(x_val, value);
    `,u="",l=N("x",t.dataType,t.dims.length),p=["rank"],[c,f,g,y,_]=$n(a,n);return c.push(...Q(t.dims,a)),{name:e,shaderCache:{hint:`${i.cacheKey};${g};${y};${_}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(a)/64)},programUniforms:c}),getShaderSource:b=>xn(b,l,t.dims.length,a.length,n,s,u,t.dataType===10?-65504:-1e5,f,g,y,_)}},ff=(e,t)=>{hr(e.inputs),e.compute(In("MaxPool",e.inputs[0],!1,t))},mf=e=>{let t=e.storage_order,r=e.dilations,i=Sn(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let n={storageOrder:t,dilations:r,...i,cacheKey:""};return{...n,cacheKey:gd(n)}},gf=e=>{let t=e.format;return{format:t,...kn,cacheKey:t}},yf=(e,t)=>{hr(e.inputs),e.compute(In("GlobalMaxPool",e.inputs[0],!0,t))}}),yd,_d,_f,wf,$y=U(()=>{te(),re(),xe(),ie(),yd=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,a)=>a===t.axis||n===e[0].dims[a]).reduce((n,a)=>n&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},_d=(e,t)=>{let r=O.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,n=i===3,a=e[0].dims,s=e[1].dataType,u=O.size(a),l=i===3||i===2,p=l?[Math.ceil(O.size(e[0].dims)/4)]:e[0].dims,c=e[1].dims,f=e.length>2?e[2]:void 0,g=f?l?[Math.ceil(O.size(f.dims)/4)]:f.dims:void 0,y=c.length===0||c.length===1&&c[0]===1,_=y===!1&&c.length===1,b=ve(u),T=y&&(!l||b===4),$=T?b:1,w=T&&!l?b:1,k=N("input",l?12:i,p.length,w),S=N("scale",s,c.length),I=f?N("zero_point",l?12:i,g.length):void 0,z=K("output",s,a.length,$),A=[k,S];I&&A.push(I);let x=[p,c];f&&x.push(g);let P=[{type:12,data:u/$},{type:12,data:r},{type:12,data:t.blockSize},...Q(...x,a)],L=H=>{let q=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${H.registerUniforms(q).declareVariables(...A,z)}
      ${H.mainStart()}
          ${H.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${z.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${k.getByOffset("global_idx / 4")};
            let x_vec = ${n?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${k.getByOffset("global_idx")};`};

          // Set scale input
          ${y?`let scale_value= ${S.getByOffset("0")}`:_?`
            let scale_index = ${z.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${S.getByOffset("scale_index")};`:`
            var scale_indices: ${S.type.indices} = output_indices;
            let index = ${S.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${S.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${S.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${I?y?l?`
                let zero_point_input = ${I.getByOffset("0")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${I.getByOffset("0")}`:_?l?`
                let zero_point_index = ${z.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${I.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${z.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${I.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${S.indicesToOffset("scale_indices")};
                let zero_point_input = ${I.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${I.getByIndices("scale_indices")};`:`let zero_point_value = ${l?n?"i32":"u32":k.type.value}(0);`};
      // Compute and write output
      ${z.setByOffset("global_idx",`${z.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:I?["rank","rank","rank"]:["rank","rank"]},getShaderSource:L,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(u/$/64),y:1,z:1},programUniforms:P})}},_f=(e,t)=>{yd(e.inputs,t),e.compute(_d(e.inputs,t))},wf=e=>he({axis:e.axis,blockSize:e.blockSize})}),wd,bd,bf,xy=U(()=>{Ge(),te(),ie(),wd=(e,t,r)=>{let i=e===t,n=e<t&&r<0,a=e>t&&r>0;if(i||n||a)throw new Error("Range these inputs' contents are invalid.")},bd=(e,t,r,i)=>{let n=Math.abs(Math.ceil((t-e)/r)),a=[n],s=n,u=[{type:12,data:s},{type:i,data:e},{type:i,data:r},...Q(a)],l=p=>{let c=K("output",i,a.length),f=c.type.value,g=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${p.registerUniforms(g).declareVariables(c)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},bf=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),ge.webgpu.validateInputContent&&wd(t,r,i),e.compute(bd(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),vd,$d,vf,$f,Ty=U(()=>{te(),re(),xe(),ie(),vd=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let n=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,a=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${n}bitcast<${i}>(oldValue) + (${r})${a}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${n}max(bitcast<f32>(oldValue), (${r}))${a}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${n}min(bitcast<${i}>(oldValue), (${r}))${a}`;case"mul":return`${n}(bitcast<${i}>(oldValue) * (${r}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},$d=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r,a=1,s=Math.ceil(O.sizeToDimension(i,i.length-1)/a),u=i[i.length-1],l=O.sizeFromDimension(r,u),p=[{type:12,data:s},{type:12,data:u},{type:12,data:l},...Q(e[1].dims,e[2].dims,n)],c=f=>{let g=N("indices",e[1].dataType,e[1].dims.length),y=N("updates",e[2].dataType,e[2].dims.length,a),_=t.reduction!=="none"&&t.reduction!==""?Xp("output",e[0].dataType,n.length):K("output",e[0].dataType,n.length,a);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(g,y,_)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${vd(t.reduction,"output[data_offset + i]","value",_.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:c}},vf=e=>he({reduction:e.reduction}),$f=(e,t)=>{e.compute($d(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),xd,Td,Sd,Cn,Ed,kd,Id,Cd,zd,Ad,Od,Rd,zn,Md,Nd,Bd,Dd,Pd,xf,Tf,Sy=U(()=>{te(),re(),xe(),ie(),xd=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Td=(e,t,r)=>{t.every(n=>n>=0&&n<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((n,a)=>i[n]=e[a]),i},Sd=(e,t,r,i,n,a)=>{let[s,u,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(c=>a.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(c=>i.push(c)),i.length!==0&&i.length!==p&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");xd(i,t),t.axes.length>0&&Td(i,t.axes,p).forEach((c,f)=>i[f]=c)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(c=>n.push(Number(c))),n.length!==0&&n.length!==p&&r>=18&&n.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof n<"u"&&i.length>0&&n.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},Cn=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,Ed=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Cn("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Cn("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",kd=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Id=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),n=e.length===0?i:e.slice();return t.length>0?(t.forEach((a,s)=>{i[a]=n[s],i[s+r]=n[t.length+s]}),i):n},Cd=(e,t,r,i)=>{let n=[];if(r.length>0)if(i.length>0){if(e.forEach(a=>n.push(a)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((a,s)=>n[a]=r[s])}else r.forEach(a=>n.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");n=e.map((a,s)=>Math.round(a*t[s]))}return n},zd=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let n=e.slice();return r.axes.length>0?(r.axes.forEach(a=>t[a]=i),r.axes.forEach(a=>n[a]=Math.round(e[a]*t[a]))):(t.fill(i,0,t.length),n.forEach((a,s)=>n[s]=Math.round(a*t[s]))),n},Ad=(e,t,r,i,n)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${Y("uniforms.scales","i",i)};
        var roi_low = ${Y("uniforms.roi","i",n)};
        var roi_hi = ${Y("uniforms.roi",`i + ${t.length}`,n)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${Y("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${Y("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Od=(e,t,r,i,n,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${Y("uniforms.scales","i",n)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Y("uniforms.roi","i",a)};
          var roi_hi = ${Y("uniforms.roi",`i + ${r.length}`,a)};
          var input_shape_i = ${Y("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${Y("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Rd=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${Y("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,zn=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Md=(e,t,r,i,n)=>{let[a,s,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${zn(e,l,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${p} = originalIndices[${s}];
      var col:${p} = originalIndices[${u}];
      ${i?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${a}])`:"0"};
      var x11: ${p} = getInputValue(batch, channel, row1, col1);
      var x12: ${p} = getInputValue(batch, channel, row1, col2);
      var x21: ${p} = getInputValue(batch, channel, row2, col1);
      var x22: ${p} = getInputValue(batch, channel, row2, col2);
      var dx1: ${p} = abs(row - ${p}(row1));
      var dx2: ${p} = abs(${p}(row2) - row);
      var dy1: ${p} = abs(col - ${p}(col1));
      var dy2: ${p} = abs(${p}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Nd=(e,t,r,i,n,a,s,u,l,p)=>{let c=r.length===2,[f,g]=c?[0,1]:[2,3],y=e.type.value,_=b=>{let T=b===f?"row":"col";return`
      fn ${T}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",b)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[b]},
        ${i[b]}, ${r[b]}, ${a[b]}, ${a[b]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[b]} - 1))) {
          return ${l};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${T}: ${y} = originalIdx + ${y}(i);
          if (${T} < 0 || ${T} >= ${r[b]}) {
            ${p?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${T} = max(0, min(${T}, ${r[b]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",b,`u32(${T})`)};
          data[i + 1] = ${b===f?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(f)};
    ${_(g)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${y} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Bd=(e,t,r,i,n)=>{let[a,s,u,l,p]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${zn(e,p,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${s}];
      var height:${c} = originalIndices[${u}];
      var width:${c} = originalIndices[${l}];
      ${i?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Dd=(e,t,r,i,n,a)=>{let s=e.dims,u=Id(a,t.axes,s.length),l=Cd(s,i,n,t.axes),p=i.slice();i.length===0&&(p=s.map((w,k)=>w===0?1:l[k]/w),t.keepAspectRatioPolicy!=="stretch"&&(l=zd(s,p,t)));let c=K("output",e.dataType,l.length),f=N("input",e.dataType,s.length),g=O.size(l),y=s.length===l.length&&s.every((w,k)=>w===l[k]),_=t.coordinateTransformMode==="tf_crop_and_resize",b=t.extrapolationValue,T=f.type.value,$=w=>`
      ${y?"":`
      ${Ed(t.coordinateTransformMode,T)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Rd(f,s)};
              ${kd(t.nearestMode,r,T)};
              ${Od(f,c,s,l,p.length,u.length,_)};
              `;case"linear":return`
              ${Ad(c,s,l,p.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Md(f,c,s,_,b)}`;if(s.length===3||s.length===5)return`${Bd(f,c,s,_,b)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Nd(f,c,s,l,p,u,t.cubicCoeffA,_,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",p.length).registerUniform("roi","f32",u.length).declareVariables(f,c)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${y?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${p.length>0?t.mode==="cubic"?p:p.length:""}|${n.length>0?n:""}|${u.length>0?u:""}|${y}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},{type:1,data:p},{type:1,data:u},...Q(s,l)]})}},Pd=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},xf=(e,t)=>{let r=[],i=[],n=[],a=Pd(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Sd(e.inputs,t,a,r,i,n),e.compute(Dd(e.inputs[0],t,a,r,i,n),{inputs:[0]})},Tf=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,n=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return he({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:n,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:u,mode:l,nearestMode:p})}}),Ud,Ld,Sf,Ey=U(()=>{te(),re(),ie(),Ud=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let n=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==n)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==n)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==n)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==n)throw new Error("Bias must have the same hidden size as input")}},Ld=(e,t,r,i)=>{let n=t.simplified,a=e[0].dims,s=O.size(a),u=a,l=s,p=a.slice(-1)[0],c=i?a.slice(0,-1).concat(1):[],f=!n&&e.length>3,g=e.length>4,y=i&&r>1,_=i&&r>2,b=r>3,T=64,$=ve(p),w=[{type:12,data:l},{type:12,data:$},{type:12,data:p},{type:1,data:t.epsilon}],k=I=>{let z=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],A=[N("x",e[0].dataType,e[0].dims,$),N("skip",e[1].dataType,e[1].dims,$),N("gamma",e[2].dataType,e[2].dims,$)];f&&A.push(N("beta",e[3].dataType,e[3].dims,$)),g&&A.push(N("bias",e[4].dataType,e[4].dims,$)),A.push(K("output",e[0].dataType,u,$)),y&&A.push(K("mean_output",1,c)),_&&A.push(K("inv_std_output",1,c)),b&&A.push(K("input_skip_bias_sum",e[0].dataType,u,$));let x=Ee(e[0].dataType),P=Ee(1,$);return`

      ${I.registerUniforms(z).declareVariables(...A)}
      var<workgroup> sum_shared : array<${P}, ${T}>;
      var<workgroup> sum_squared_shared : array<${P}, ${T}>;

      ${I.mainStart([T,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${T};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${T};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${T-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${g?"bias[offset1d + i]":x+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${b?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Qt(x,$,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${T};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${Et("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Et("square_sum",$)} / f32(uniforms.hidden_size) ${n?"":"- mean * mean"} + uniforms.epsilon);
        ${y?"mean_output[global_idx] = mean;":""}
        ${_?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${n?"":`- ${x}(mean)`}) *
            ${x}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},S=[{dims:u,dataType:e[0].dataType}];return r>1&&S.push({dims:c,dataType:1}),r>2&&S.push({dims:c,dataType:1}),r>3&&S.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${y};${_};${b}`,inputDependencies:e.map((I,z)=>"type")},getShaderSource:k,getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(l/p)},programUniforms:w})}},Sf=(e,t)=>{Ud(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Ld(e.inputs,t,e.outputCount,!1),{outputs:r})}}),qd,fr,Wd,An,Vd,Gd,Ef,kf,ky=U(()=>{te(),re(),xe(),ie(),qd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},fr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Wd=(e,t)=>{if(e.length>1){let r=fr(e,1),i=fr(e,2),n=fr(e,3);return n.length===0&&(n=[...Array(e[0].dims.length).keys()]),he({starts:r,ends:i,axes:n})}else return t},An=(e,t,r,i,n)=>{let a=e;return e<0&&(a+=r[i[t]]),n[t]<0?Math.max(0,Math.min(a,r[i[t]]-1)):Math.max(0,Math.min(a,r[i[t]]))},Vd=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${Y("uniforms.input_shape","i",r.length)};
            let steps_i = ${Y("uniforms.steps","i",r.length)};
            let signs_i = ${Y("uniforms.signs","i",r.length)};
            let starts_i = ${Y("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Gd=(e,t)=>{let r=e[0].dims,i=O.size(r),n=t.axes.length>0?O.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],a=fr(e,4);a.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(n.length).fill(1));let s=t.starts.map(($,w)=>An($,w,r,n,a)),u=t.ends.map(($,w)=>An($,w,r,n,a));if(n.length!==s.length||n.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(n.length!==r.length)for(let $=0;$<r.length;++$)n.includes($)||(s.splice($,0,0),u.splice($,0,r[$]),a.splice($,0,1));let l=a.map($=>Math.sign($));a.forEach(($,w,k)=>{if($<0){let S=(u[w]-s[w])/$,I=s[w],z=I+S*a[w];s[w]=z,u[w]=I,k[w]=-$}});let p=r.slice(0);n.forEach(($,w)=>{p[$]=Math.ceil((u[$]-s[$])/a[$])});let c={dims:p,dataType:e[0].dataType},f=K("output",e[0].dataType,p.length),g=N("input",e[0].dataType,e[0].dims.length),y=O.size(p),_=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:a.length}],b=[{type:12,data:y},{type:12,data:s},{type:6,data:l},{type:12,data:a},...Q(e[0].dims,p)],T=$=>`
      ${$.registerUniforms(_).declareVariables(g,f)}
        ${Vd(g,f,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",g.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:b})}},Ef=(e,t)=>{qd(e.inputs,t);let r=Wd(e.inputs,t);e.compute(Gd(e.inputs,r),{inputs:[0]})},kf=e=>{let t=e.starts,r=e.ends,i=e.axes;return he({starts:t,ends:r,axes:i})}}),Fd,Hd,If,Cf,Iy=U(()=>{te(),re(),xe(),kt(),ie(),Fd=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Hd=(e,t)=>{let r=e.inputs[0],i=r.dims,n=O.size(i),a=i.length,s=O.normalizeAxis(t.axis,a),u=s<i.length-1,l,p=[];u?(p=Array.from({length:a},(A,x)=>x),p[s]=a-1,p[a-1]=s,l=e.compute(Le(r,p),{inputs:[r],outputs:[-1]})[0]):l=r;let c=l.dims,f=c[a-1],g=n/f,y=ve(f),_=f/y,b=64;g===1&&(b=256);let T=(A,x)=>x===4?`max(max(${A}.x, ${A}.y), max(${A}.z, ${A}.w))`:x===2?`max(${A}.x, ${A}.y)`:x===3?`max(max(${A}.x, ${A}.y), ${A}.z)`:A,$=N("x",l.dataType,l.dims,y),w=K("result",l.dataType,l.dims,y),k=$.type.value,S=Ee(l.dataType)==="f32"?`var threadMax = ${k}(-3.4028234663852886e+38f);`:`var threadMax = ${k}(-65504.0h);`,I=A=>`
      var<workgroup> rowMaxShared : ${k};
      var<workgroup> rowSumShared : ${k};
      var<workgroup> threadShared : array<${k}, ${b}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${k} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${k}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${A.registerUniform("packedCols","i32").declareVariables($,w)}
      ${A.mainStart(b)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${b};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${S}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${k}(${T("threadShared[0]",y)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${k}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${k}(${Et("threadShared[0]",y)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${k}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,z=e.compute({name:"Softmax",shaderCache:{hint:`${y};${b}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:l.dataType}],dispatchGroup:{x:g},programUniforms:[{type:6,data:_}]}),getShaderSource:I},{inputs:[l],outputs:[u?-1:0]})[0];u&&e.compute(Le(z,p),{inputs:[z]})},If=(e,t)=>{Fd(e.inputs),Hd(e,t)},Cf=e=>he({axis:e.axis})}),On,jd,Kd,Xd,zf,Cy=U(()=>{te(),re(),ie(),On=e=>Array.from(e.getBigInt64Array(),Number),jd=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(On(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Kd=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},Xd=(e,t)=>{let r=e[0].dims,i=t??On(e[1]),n=Kd(r,i),a=O.size(n),s=e[0].dataType,u=N("input",s,r.length),l=K("output",s,n.length),p=c=>`
      const inputShape = ${u.indices(...r)};
      ${c.registerUniform("output_size","u32").declareVariables(u,l)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...Q(e[0].dims,n)]}),getShaderSource:p}},zf=e=>{jd(e.inputs),e.compute(Xd(e.inputs),{inputs:[0]})}}),Yd,Qd,Af,zy=U(()=>{te(),re(),ie(),Yd=(e,t,r,i,n)=>{let a=K("output_data",n,r.length,4),s=N("a_data",t[1].dataType,t[1].dims.length,4),u=N("b_data",t[2].dataType,t[2].dims.length,4),l=N("c_data",t[0].dataType,t[0].dims.length,4),p,c=(f,g,y)=>`select(${g}, ${f}, ${y})`;if(!i)p=a.setByOffset("global_idx",c(s.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let f=(g,y,_="")=>{let b=`a_data[index_a${y}][component_a${y}]`,T=`b_data[index_b${y}][component_b${y}]`,$=`bool(c_data[index_c${y}] & (0xffu << (component_c${y} * 8)))`;return`
            let output_indices${y} = ${a.offsetToIndices(`global_idx * 4u + ${y}u`)};
            let offset_a${y} = ${s.broadcastedIndicesToOffset(`output_indices${y}`,a)};
            let offset_b${y} = ${u.broadcastedIndicesToOffset(`output_indices${y}`,a)};
            let offset_c${y} = ${l.broadcastedIndicesToOffset(`output_indices${y}`,a)};
            let index_a${y} = offset_a${y} / 4u;
            let index_b${y} = offset_b${y} / 4u;
            let index_c${y} = offset_c${y} / 4u;
            let component_a${y} = offset_a${y} % 4u;
            let component_b${y} = offset_b${y} % 4u;
            let component_c${y} = offset_c${y} % 4u;
            ${g}[${y}] = ${_}(${c(b,T,$)});
          `};n===9?p=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:p=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,s,u,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},Qd=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,n=e[1].dataType,a=!(O.areEqual(t,r)&&O.areEqual(r,i)),s=t,u=O.size(t);if(a){let p=Jt.calcShape(Jt.calcShape(t,r,!1),i,!1);if(!p)throw new Error("Can't perform where op on the given tensors");s=p,u=O.size(s)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>Yd(p,e,s,a,n),getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...Q(i,t,r,s)]})}},Af=e=>{e.compute(Qd(e.inputs))}}),Of,Ay=U(()=>{F0(),ya(),H0(),j0(),K0(),X0(),Y0(),ty(),iy(),ny(),ay(),sy(),oy(),uy(),ly(),dy(),py(),cy(),hy(),fy(),my(),gy(),yy(),_y(),wy(),Yh(),by(),vy(),$y(),xy(),Ty(),ga(),Sy(),tf(),Ey(),ky(),Iy(),Jh(),Cy(),kt(),_a(),zy(),Of=new Map([["Abs",[Tc]],["Acos",[Sc]],["Acosh",[Ec]],["Add",[sh]],["ArgMax",[bc,Fn]],["ArgMin",[wc,Fn]],["Asin",[kc]],["Asinh",[Ic]],["Atan",[Cc]],["Atanh",[zc]],["Attention",[vc]],["AveragePool",[pf,df]],["BatchNormalization",[$c]],["BiasAdd",[xc]],["BiasSplitGelu",[ah]],["Cast",[Oc,Ac]],["Ceil",[Mc]],["Clip",[Rc]],["Concat",[gh,yh]],["Conv",[Qn,Yn]],["ConvTranspose",[kh,Eh]],["Cos",[Nc]],["Cosh",[Bc]],["CumSum",[Ih,Ch]],["DepthToSpace",[zh,Ah]],["DequantizeLinear",[_f,wf]],["Div",[oh]],["Einsum",[Oh,Rh]],["Elu",[Dc,br]],["Equal",[uh]],["Erf",[Pc]],["Exp",[Uc]],["Expand",[Mh]],["FastGelu",[Nh]],["Floor",[Lc]],["FusedConv",[Qn,Yn]],["Gather",[Dh,Bh]],["GatherElements",[Vh,Wh]],["GatherBlockQuantized",[Lh,qh]],["GatherND",[Ph,Uh]],["Gelu",[qc]],["Gemm",[Fh,Gh]],["GlobalAveragePool",[hf,cf]],["GlobalMaxPool",[yf,gf]],["Greater",[ch]],["GreaterOrEqual",[fh]],["GridSample",[Hh,jh]],["GroupQueryAttention",[rf]],["HardSigmoid",[Xc,Kc]],["InstanceNormalization",[nf]],["LayerNormalization",[af]],["LeakyRelu",[Wc,br]],["Less",[hh]],["LessOrEqual",[mh]],["Log",[ih]],["MatMul",[sf]],["MatMulNBits",[of,uf]],["MaxPool",[ff,mf]],["Mul",[lh]],["MultiHeadAttention",[Xh,Kh]],["Neg",[Gc]],["Not",[Vc]],["Pad",[lf]],["Pow",[dh]],["QuickGelu",[nh,br]],["Range",[bf]],["Reciprocal",[Fc]],["ReduceMin",[fc]],["ReduceMean",[lc]],["ReduceMax",[hc]],["ReduceSum",[gc]],["ReduceProd",[mc]],["ReduceL1",[dc]],["ReduceL2",[pc]],["ReduceLogSum",[_c]],["ReduceLogSumExp",[cc]],["ReduceSumSquare",[yc]],["Relu",[Hc]],["Resize",[xf,Tf]],["RotaryEmbedding",[ef]],["ScatterND",[$f,vf]],["Sigmoid",[jc]],["Sin",[Yc]],["Sinh",[Qc]],["Slice",[Ef,kf]],["SkipLayerNormalization",[Sf]],["Split",[Qh,Zh]],["Sqrt",[Zc]],["Softmax",[If,Cf]],["Sub",[ph]],["Tan",[Jc]],["Tanh",[eh]],["ThresholdedRelu",[rh,br]],["Tile",[zf]],["Transpose",[Qp,Zp]],["Where",[Af]]])}),Rf,Oy=U(()=>{Ge(),ft(),ie(),Rf=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,n){ot(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let p of t)u.push({binding:u.length,resource:{buffer:p.buffer}});for(let p of r)u.push({binding:u.length,resource:{buffer:p.buffer}});n&&u.push({binding:u.length,resource:n});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),et(e.programInfo.name)}dispose(){}build(e,t){ot(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(p=>{r.features.has(p.feature)&&i.push(`enable ${p.extension};`)});let n=Yp(t,this.backend.device.limits),a=e.getShaderSource(n),s=`${i.join(`
`)}
${n.additionalImplementations}
${a}`,u=r.createShaderModule({code:s,label:e.name});de("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let l=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return et(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=n&&r<=n&&i<=n)return[t,r,i];let a=t*r*i,s=Math.ceil(Math.sqrt(a));if(s>n){if(s=Math.ceil(Math.cbrt(a)),s>n)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),Mf={};tr(Mf,{WebGpuBackend:()=>Nf});var Zd,Jd,ep,Nf,Ry=U(()=>{Ge(),te(),ft(),Fp(),V0(),Ay(),Oy(),Zd=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let n=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${n}`);break}case"rank":{let a=e[i].dims.length;r.push(`${n};${a}`);break}case"dims":{let a=e[i].dims.join(",");r.push(`${n};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},Jd=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${Zd(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},ep=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Nf=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},n=a=>t.features.has(a)&&r.push(a)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups"),this.device=await t.requestDevice(i),this.adapterInfo=new ep(t.info||await t.requestAdapterInfo()),this.gpuDataManager=Kp(this),this.programManager=new Rf(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,ca(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;ot(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let n=r[i],a=n.kernelId,s=this.kernels.get(a),u=s.kernelType,l=s.kernelName,p=n.programName,c=n.inputTensorViews,f=n.outputTensorViews,g=t[i*2],y=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let _=Number(g-this.queryTimeBase),b=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(b))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(T=>({dims:T.dims,dataType:pt(T.dataType)})),outputsMetadata:f.map(T=>({dims:T.dims,dataType:pt(T.dataType)})),kernelId:a,kernelType:u,kernelName:l,programName:p,startTime:_,endTime:b});else{let T="";c.forEach((w,k)=>{T+=`input[${k}]: [${w.dims}] | ${pt(w.dataType)}, `});let $="";f.forEach((w,k)=>{$+=`output[${k}]: [${w.dims}] | ${pt(w.dataType)}, `}),console.log(`[profiling] kernel "${a}|${u}|${l}|${p}" ${T}${$}start time: ${_} ns, execution time: ${b-_} ns`)}ri("GPU",`${p}::${g}::${y}`)}e.unmap(),this.pendingQueries.delete(e)}),et()}run(e,t,r,i,n,a){ot(e.name);let s=[];for(let w=0;w<t.length;++w){let k=t[w].data;if(k===0)continue;let S=this.gpuDataManager.get(k);if(!S)throw new Error(`no GPU data for input: ${k}`);s.push(S)}let{outputs:u,dispatchGroup:l,programUniforms:p}=e.getRunData(t),c=r.length===0?u.map((w,k)=>k):r;if(c.length!==u.length)throw new Error(`Output size ${c.length} must be equal to ${u.length}.`);let f=[],g=[];for(let w=0;w<u.length;++w){if(!Number.isInteger(c[w])||c[w]<-3||c[w]>=a)throw new Error(`Invalid output index: ${c[w]}`);if(c[w]===-3)continue;let k=c[w]===-1,S=c[w]===-2,I=k||S?n(u[w].dataType,u[w].dims):i(c[w],u[w].dataType,u[w].dims);if(f.push(I),I.data===0)continue;let z=this.gpuDataManager.get(I.data);if(!z)throw new Error(`no GPU data for output: ${I.data}`);if(k&&this.temporaryData.push(z),S){let A=this.kernelPersistentData.get(this.currentKernelId);A||(A=[],this.kernelPersistentData.set(this.currentKernelId,A)),A.push(z)}g.push(z)}if(s.length!==t.length||g.length!==f.length){if(g.length===0)return et(e.name),f;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(p){let w=0,k=[];p.forEach(A=>{let x=typeof A.data=="number"?[A.data]:A.data;if(x.length===0)return;let P=A.type===10?2:4,L,H;A.type===10?(H=x.length>4?16:x.length>2?8:x.length*P,L=x.length>4?16:P*x.length):(H=x.length<=2?x.length*P:16,L=16),w=Math.ceil(w/H)*H,k.push(w);let q=A.type===10?8:4;w+=x.length>4?Math.ceil(x.length/q)*L:x.length*P});let S=16;w=Math.ceil(w/S)*S;let I=new ArrayBuffer(w);p.forEach((A,x)=>{let P=k[x],L=typeof A.data=="number"?[A.data]:A.data;if(A.type===6)new Int32Array(I,P,L.length).set(L);else if(A.type===12)new Uint32Array(I,P,L.length).set(L);else if(A.type===10)new Uint16Array(I,P,L.length).set(L);else if(A.type===1)new Float32Array(I,P,L.length).set(L);else throw new Error(`Unsupported uniform type: ${pt(A.type)}`)});let z=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(z.buffer,0,I,0,w),this.gpuDataManager.release(z.id),y={offset:0,size:w,buffer:z.buffer}}let _=this.programManager.normalizeDispatchGroupSize(l),b=_[1]===1&&_[2]===1,T=Jd(e,t,b),$=this.programManager.getArtifact(T);if($||($=this.programManager.build(e,_),this.programManager.setArtifact(T,$),de("info",()=>`[artifact] key: ${T}, programName: ${e.name}`)),p&&$.uniformVariablesInfo){if(p.length!==$.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${$.uniformVariablesInfo.length}, got ${p.length} in program "${$.programInfo.name}".`);for(let w=0;w<p.length;w++){let k=p[w],S=k.type,I=typeof k.data=="number"?1:k.data.length,[z,A]=$.uniformVariablesInfo[w];if(S!==z||I!==A)throw new Error(`Uniform variable ${w} mismatch: expect type ${z} with size ${A}, got type ${S} with size ${I} in program "${$.programInfo.name}".`)}}if(de("info",()=>`[ProgramManager] run "${e.name}" (key=${T}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:$.programInfo.name,inputTensorViews:t,outputTensorViews:f};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run($,s,g,_,y),et(e.name),f}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let n=Of.get(e);if(!n)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:i,kernelEntry:n[0],attributes:[n[1],r]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let n=i.kernelType,a=i.kernelName,s=i.kernelEntry,u=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${n}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),de("info",()=>`[WebGPU] Start to run kernel "[${n}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(t,u[1]),0}catch(p){return r.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${a}" failed. ${p}`)),1}finally{l&&r.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${n}] ${a}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let n=this.sessionExternalDataMapping.get(e);n||(n=new Map,this.sessionExternalDataMapping.set(e,n));let a=n.get(t),s=this.gpuDataManager.registerExternalBuffer(r,i,a);return n.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await Wn(this,e,t);return ha(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){de("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){de("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){de("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let n=this.getComputePassEncoder(),a=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(a.computePipeline),n.setBindGroup(0,a.bindGroup),n.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Bf={};tr(Bf,{init:()=>Df});var Kr,tp,Df,My=U(()=>{te(),ft(),re(),W0(),Kr=class Pf{constructor(t,r,i,n){this.module=t,this.dataType=r,this.data=i,this.dims=n}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(O.size(t)!==O.size(this.dims))throw new Error("Invalid new shape");return new Pf(this.module,this.dataType,this.data,t)}},tp=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,n=r/e.PTR_SIZE,a=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*n++,a));let s=Number(e.getValue(i*n++,a));this.outputCount=Number(e.getValue(i*n++,a)),this.customDataOffset=Number(e.getValue(i*n++,"*")),this.customDataSize=Number(e.getValue(i*n++,a));let u=[];for(let l=0;l<s;l++){let p=Number(e.getValue(i*n++,a)),c=Number(e.getValue(i*n++,"*")),f=Number(e.getValue(i*n++,a)),g=[];for(let y=0;y<f;y++)g.push(Number(e.getValue(i*n++,a)));u.push(new Kr(e,p,c,g))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,i=t?.outputs??[],n=(s,u,l)=>new Kr(this.module,u,this.output(s,l),l),a=(s,u)=>{let l=Dt(s,u);if(!l)throw new Error(`Unsupported data type: ${s}`);let p=l>0?this.backend.gpuDataManager.create(l).id:0;return new Kr(this.module,s,p,u)};return this.backend.run(e,r,i,n,a,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,n=i===4?"i32":"i64",a=this.module.stackAlloc((1+t.length)*i);this.module.setValue(a,t.length,n);for(let s=0;s<t.length;s++)this.module.setValue(a+i*(s+1),t[s],n);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},Df=async(e,t,r,i)=>{let n=t.jsepInit;if(!n)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(Ry(),xr(Mf)).WebGpuBackend,s=new a;await s.initialize(r,i),n("webgpu",[s,u=>s.alloc(Number(u)),u=>s.free(u),(u,l,p,c=!1)=>{if(c)de("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(l)}, size=${Number(p)}`),s.memcpy(Number(u),Number(l));else{de("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(l)}, size=${Number(p)}`);let f=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(p));s.upload(Number(l),f)}},async(u,l,p)=>{de("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${l}, size=${p}`),await s.download(Number(u),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+p)>>>0))},(u,l,p)=>s.createKernel(u,Number(l),p,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),u=>s.releaseKernel(u),(u,l,p,c)=>{de("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${p}, kernel=${u}, contextDataOffset=${l}`);let f=new tp(t,s,Number(l));return s.computeKernel(Number(u),f,c)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let a=new jp(r);n("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,u,l,p,c)=>a.ensureTensor(s,u,l,p,c),(s,u)=>{a.uploadTensor(s,u)},async(s,u)=>a.downloadTensor(s,u),(s,u)=>a.registerMLContext(s,u),!!r.trace])}}}),rp,Ta,Sa,vt,ip,Rn,di,Ea,ka,Mn,Ia,Ca,za,Uf=U(()=>{Ge(),U0(),L0(),te(),Ft(),ua(),qp(),rp=(e,t)=>{ye()._OrtInit(e,t)!==0&&fe("Can't initialize onnxruntime.")},Ta=async e=>{rp(e.wasm.numThreads,ai(e.logLevel))},Sa=async(e,t)=>{ye().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=e.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let n=e.webgpu.forceFallbackAdapter;if(n!==void 0&&typeof n!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${n}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:n}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let i=(My(),xr(Bf)).init;t==="webgpu"&&await i("webgpu",ye(),e,r),t==="webnn"&&await i("webnn",ye(),e)}},vt=new Map,ip=e=>{let t=ye(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,n,n+i)!==0&&fe("Can't get session input/output count.");let a=i===4?"i32":"i64";return[Number(t.getValue(n,a)),Number(t.getValue(n+i,a))]}finally{t.stackRestore(r)}},Rn=(e,t)=>{let r=ye(),i=r.stackSave(),n=0;try{let a=r.PTR_SIZE,s=r.stackAlloc(2*a);r._OrtGetInputOutputMetadata(e,t,s,s+a)!==0&&fe("Can't get session input/output metadata.");let u=Number(r.getValue(s,"*"));n=Number(r.getValue(s+a,"*"));let l=r.HEAP32[n/4];if(l===0)return[u,0];let p=r.HEAPU32[n/4+1],c=[];for(let f=0;f<p;f++){let g=Number(r.getValue(n+8+f*a,"*"));c.push(g!==0?r.UTF8ToString(g):Number(r.getValue(n+8+(f+p)*a,"*")))}return[u,l,c]}finally{r.stackRestore(i),n!==0&&r._OrtFree(n)}},di=e=>{let t=ye(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Ea=async(e,t)=>{let r,i,n=ye();Array.isArray(e)?[r,i]=e:e.buffer===n.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=di(e);let a=0,s=0,u=0,l=[],p=[],c=[];try{if([s,l]=await Lp(t),t?.externalData&&n.mountExternalData){let S=[];for(let I of t.externalData){let z=typeof I=="string"?I:I.path;S.push(pa(typeof I=="string"?I:I.data).then(A=>{n.mountExternalData(z,A)}))}await Promise.all(S)}for(let S of t?.executionProviders??[])if((typeof S=="string"?S:S.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,typeof S!="string"){let I=S,z=I?.context,A=I?.gpuDevice,x=I?.deviceType,P=I?.powerPreference;z?n.currentContext=z:A?n.currentContext=await n.webnnCreateMLContext(A):n.currentContext=await n.webnnCreateMLContext({deviceType:x,powerPreference:P})}else n.currentContext=await n.webnnCreateMLContext();break}a=await n._OrtCreateSession(r,i,s),n.webgpuOnCreateSession?.(a),a===0&&fe("Can't create a session."),n.jsepOnCreateSession?.(),n.currentContext&&(n.webnnRegisterMLContext(a,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[f,g]=ip(a),y=!!t?.enableGraphCapture,_=[],b=[],T=[],$=[],w=[];for(let S=0;S<f;S++){let[I,z,A]=Rn(a,S);I===0&&fe("Can't get an input name."),p.push(I);let x=n.UTF8ToString(I);_.push(x),T.push(z===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:pt(z),shape:A})}for(let S=0;S<g;S++){let[I,z,A]=Rn(a,S+f);I===0&&fe("Can't get an output name."),c.push(I);let x=n.UTF8ToString(I);b.push(x),$.push(z===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:pt(z),shape:A});{if(y&&t?.preferredOutputLocation===void 0){w.push("gpu-buffer");continue}let P=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[x]??"cpu",L=n.webnnIsGraphOutput;if(P==="cpu"&&L&&L(a,x)){w.push("ml-tensor-cpu-output");continue}if(P!=="cpu"&&P!=="cpu-pinned"&&P!=="gpu-buffer"&&P!=="ml-tensor")throw new Error(`Not supported preferred output location: ${P}.`);if(y&&P!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${P}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);w.push(P)}}let k=null;return w.some(S=>S==="gpu-buffer"||S==="ml-tensor"||S==="ml-tensor-cpu-output")&&(u=n._OrtCreateBinding(a),u===0&&fe("Can't create IO binding."),k={handle:u,outputPreferredLocations:w,outputPreferredLocationsEncoded:w.map(S=>S==="ml-tensor-cpu-output"?"ml-tensor":S).map(S=>Ln(S))}),vt.set(a,[a,p,c,k,y,!1]),[a,_,b,T,$]}catch(f){throw p.forEach(g=>n._OrtFree(g)),c.forEach(g=>n._OrtFree(g)),u!==0&&n._OrtReleaseBinding(u)!==0&&fe("Can't release IO binding."),a!==0&&n._OrtReleaseSession(a)!==0&&fe("Can't release session."),f}finally{n._free(r),s!==0&&n._OrtReleaseSessionOptions(s)!==0&&fe("Can't release session options."),l.forEach(f=>n._free(f)),n.unmountExternalData?.()}},ka=e=>{let t=ye(),r=vt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,n,a,s,u]=r;s&&(u&&t._OrtClearBoundOutputs(s.handle)!==0&&fe("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&fe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),n.forEach(l=>t._OrtFree(l)),a.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(i)!==0&&fe("Can't release session."),vt.delete(e)},Mn=async(e,t,r,i,n,a,s=!1)=>{if(!e){t.push(0);return}let u=ye(),l=u.PTR_SIZE,p=e[0],c=e[1],f=e[3],g=f,y,_;if(p==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let $=e[2].gpuBuffer;_=Dt(Bt(p),c);{let w=u.jsepRegisterBuffer;if(!w)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=w(i,a,$,_)}}else if(f==="ml-tensor"){let $=e[2].mlTensor;_=Dt(Bt(p),c);let w=u.webnnRegisterMLTensor;if(!w)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=w(i,$,Bt(p),c)}else{let $=e[2];if(Array.isArray($)){_=l*$.length,y=u._malloc(_),r.push(y);for(let w=0;w<$.length;w++){if(typeof $[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);u.setValue(y+w*l,Qe($[w],r),"*")}}else{let w=u.webnnIsGraphInput,k=u.webnnIsGraphOutput;if(p!=="string"&&w&&k){let S=u.UTF8ToString(n);if(w(i,S)||k(i,S)){let I=Bt(p);_=Dt(I,c),g="ml-tensor";let z=u.webnnCreateTemporaryTensor,A=u.webnnUploadTensor;if(!z||!A)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let x=await z(i,I,c);A(x,new Uint8Array($.buffer,$.byteOffset,$.byteLength)),y=x}else _=$.byteLength,y=u._malloc(_),r.push(y),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,_),y)}else _=$.byteLength,y=u._malloc(_),r.push(y),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,_),y)}}let b=u.stackSave(),T=u.stackAlloc(4*c.length);try{c.forEach((w,k)=>u.setValue(T+k*l,w,l===4?"i32":"i64"));let $=u._OrtCreateTensor(Bt(p),y,_,T,c.length,Ln(g));$===0&&fe(`Can't create tensor for input/output. session=${i}, index=${a}.`),t.push($)}finally{u.stackRestore(b)}},Ia=async(e,t,r,i,n,a)=>{let s=ye(),u=s.PTR_SIZE,l=vt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let p=l[0],c=l[1],f=l[2],g=l[3],y=l[4],_=l[5],b=t.length,T=i.length,$=0,w=[],k=[],S=[],I=[],z=[],A=s.stackSave(),x=s.stackAlloc(b*u),P=s.stackAlloc(b*u),L=s.stackAlloc(T*u),H=s.stackAlloc(T*u);try{[$,w]=Up(a),Lt("wasm prepareInputOutputTensor");for(let D=0;D<b;D++)await Mn(r[D],k,I,e,c[t[D]],t[D],y);for(let D=0;D<T;D++)await Mn(n[D],S,I,e,f[i[D]],b+i[D],y);qt("wasm prepareInputOutputTensor");for(let D=0;D<b;D++)s.setValue(x+D*u,k[D],"*"),s.setValue(P+D*u,c[t[D]],"*");for(let D=0;D<T;D++)s.setValue(L+D*u,S[D],"*"),s.setValue(H+D*u,f[i[D]],"*");if(g&&!_){let{handle:D,outputPreferredLocations:G,outputPreferredLocationsEncoded:J}=g;if(c.length!==b)throw new Error(`input count from feeds (${b}) is expected to be always equal to model's input count (${c.length}).`);Lt("wasm bindInputsOutputs");for(let X=0;X<b;X++){let Z=t[X];await s._OrtBindInput(D,c[Z],k[X])!==0&&fe(`Can't bind input[${X}] for session=${e}.`)}for(let X=0;X<T;X++){let Z=i[X];n[X]?.[3]?(z.push(S[X]),s._OrtBindOutput(D,f[Z],S[X],0)!==0&&fe(`Can't bind pre-allocated output[${X}] for session=${e}.`)):s._OrtBindOutput(D,f[Z],0,J[Z])!==0&&fe(`Can't bind output[${X}] to ${G[X]} for session=${e}.`)}qt("wasm bindInputsOutputs"),vt.set(e,[p,c,f,g,y,!0])}s.jsepOnRunStart?.(p),s.webnnOnRunStart?.(p);let q;g?q=await s._OrtRunWithBinding(p,g.handle,T,L,$):q=await s._OrtRun(p,P,x,b,H,T,L,$),q!==0&&fe("failed to call OrtRun().");let j=[],R=[];Lt("wasm ProcessOutputTensor");for(let D=0;D<T;D++){let G=Number(s.getValue(L+D*u,"*"));if(G===S[D]||z.includes(S[D])){j.push(n[D]),G!==S[D]&&s._OrtReleaseTensor(G)!==0&&fe("Can't release tensor.");continue}let J=s.stackSave(),X=s.stackAlloc(4*u),Z=!1,le,B=0;try{s._OrtGetTensorData(G,X,X+u,X+2*u,X+3*u)!==0&&fe(`Can't access output tensor data on index ${D}.`);let V=u===4?"i32":"i64",ee=Number(s.getValue(X,V));B=s.getValue(X+u,"*");let ae=s.getValue(X+u*2,"*"),Oe=Number(s.getValue(X+u*3,V)),$e=[];for(let Te=0;Te<Oe;Te++)$e.push(Number(s.getValue(ae+Te*u,V)));s._OrtFree(ae)!==0&&fe("Can't free memory for tensor dims.");let ke=$e.reduce((Te,we)=>Te*we,1);le=pt(ee);let De=g?.outputPreferredLocations[i[D]];if(le==="string"){if(De==="gpu-buffer"||De==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Te=[];for(let we=0;we<ke;we++){let Ne=s.getValue(B+we*u,"*"),Sr=s.getValue(B+(we+1)*u,"*"),tt=we===ke-1?void 0:Sr-Ne;Te.push(s.UTF8ToString(Ne,tt))}j.push([le,$e,Te,"cpu"])}else if(De==="gpu-buffer"&&ke>0){let Te=s.jsepGetBuffer;if(!Te)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let we=Te(B),Ne=Dt(ee,ke);if(Ne===void 0||!la(le))throw new Error(`Unsupported data type: ${le}`);Z=!0,j.push([le,$e,{gpuBuffer:we,download:s.jsepCreateDownloader(we,Ne,le),dispose:()=>{s._OrtReleaseTensor(G)!==0&&fe("Can't release tensor.")}},"gpu-buffer"])}else if(De==="ml-tensor"&&ke>0){let Te=s.webnnEnsureTensor,we=s.webnnIsGraphInputOutputTypeSupported;if(!Te||!we)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Dt(ee,ke)===void 0||!da(le))throw new Error(`Unsupported data type: ${le}`);if(!we(e,le,!1))throw new Error(`preferredLocation "ml-tensor" for ${le} output is not supported by current WebNN Context.`);let Ne=await Te(e,B,ee,$e,!1);Z=!0,j.push([le,$e,{mlTensor:Ne,download:s.webnnCreateMLTensorDownloader(B,le),dispose:()=>{s.webnnReleaseTensorId(B),s._OrtReleaseTensor(G)}},"ml-tensor"])}else if(De==="ml-tensor-cpu-output"&&ke>0){let Te=s.webnnCreateMLTensorDownloader(B,le)(),we=j.length;Z=!0,R.push((async()=>{let Ne=[we,await Te];return s.webnnReleaseTensorId(B),s._OrtReleaseTensor(G),Ne})()),j.push([le,$e,[],"cpu"])}else{let Te=hi(le),we=new Te(ke);new Uint8Array(we.buffer,we.byteOffset,we.byteLength).set(s.HEAPU8.subarray(B,B+we.byteLength)),j.push([le,$e,we,"cpu"])}}finally{s.stackRestore(J),le==="string"&&B&&s._free(B),Z||s._OrtReleaseTensor(G)}}g&&!y&&(s._OrtClearBoundOutputs(g.handle)!==0&&fe("Can't clear bound outputs."),vt.set(e,[p,c,f,g,y,!1]));for(let[D,G]of await Promise.all(R))j[D][2]=G;return qt("wasm ProcessOutputTensor"),j}finally{s.webnnOnRunEnd?.(p),s.stackRestore(A),k.forEach(q=>s._OrtReleaseTensor(q)),S.forEach(q=>s._OrtReleaseTensor(q)),I.forEach(q=>s._free(q)),$!==0&&s._OrtReleaseRunOptions($),w.forEach(q=>s._free(q))}},Ca=e=>{let t=ye(),r=vt.get(e);if(!r)throw new Error("invalid session id");let i=r[0],n=t._OrtEndProfiling(i);n===0&&fe("Can't get an profile file name."),t._OrtFree(n)},za=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),$t,We,Xt,mr,gr,Xr,Nn,Yr,Rt,Mt,np,Lf,qf,Wf,Vf,Gf,Ff,Hf,jf=U(()=>{Ge(),Uf(),Ft(),sa(),$t=()=>!!ge.wasm.proxy&&typeof document<"u",Xt=!1,mr=!1,gr=!1,Yr=new Map,Rt=(e,t)=>{let r=Yr.get(e);r?r.push(t):Yr.set(e,[t])},Mt=()=>{if(Xt||!mr||gr||!We)throw new Error("worker not ready")},np=e=>{switch(e.data.type){case"init-wasm":Xt=!1,e.data.err?(gr=!0,Nn[1](e.data.err)):(mr=!0,Nn[0]()),Xr&&(URL.revokeObjectURL(Xr),Xr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Yr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},Lf=async()=>{if(!mr){if(Xt)throw new Error("multiple calls to 'initWasm()' detected.");if(gr)throw new Error("previous call to 'initWasm()' failed.");if(Xt=!0,$t())return new Promise((e,t)=>{We?.terminate(),Dp().then(([r,i])=>{try{We=i,We.onerror=a=>t(a),We.onmessage=np,Nn=[e,t];let n={type:"init-wasm",in:ge};!n.in.wasm.wasmPaths&&(r||Un)&&(n.in.wasm.wasmPaths={wasm:new URL("/vj-mapper/assets/ort-wasm-simd-threaded.jsep-CVw3nYo7.wasm",import.meta.url).href}),We.postMessage(n),Xr=r}catch(n){t(n)}},t)});try{await oa(ge.wasm),await Ta(ge),mr=!0}catch(e){throw gr=!0,e}finally{Xt=!1}}},qf=async e=>{if($t())return Mt(),new Promise((t,r)=>{Rt("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:ge}};We.postMessage(i)});await Sa(ge,e)},Wf=async e=>$t()?(Mt(),new Promise((t,r)=>{Rt("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};We.postMessage(i,[e.buffer])})):di(e),Vf=async(e,t)=>{if($t()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Mt(),new Promise((r,i)=>{Rt("create",[r,i]);let n={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),We.postMessage(n,a)})}else return Ea(e,t)},Gf=async e=>{if($t())return Mt(),new Promise((t,r)=>{Rt("release",[t,r]);let i={type:"release",in:e};We.postMessage(i)});ka(e)},Ff=async(e,t,r,i,n,a)=>{if($t()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(n.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Mt(),new Promise((s,u)=>{Rt("run",[s,u]);let l=r,p={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:i,options:a}};We.postMessage(p,za(l))})}else return Ia(e,t,r,i,n,a)},Hf=async e=>{if($t())return Mt(),new Promise((t,r)=>{Rt("end-profiling",[t,r]);let i={type:"end-profiling",in:e};We.postMessage(i)});Ca(e)}}),Bn,ap,Kf,Ny=U(()=>{Ge(),jf(),te(),aa(),qp(),Bn=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},ap=e=>{switch(e[3]){case"cpu":return new Ze(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!la(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:n}=e[2];return Ze.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:n})}case"ml-tensor":{let t=e[0];if(!da(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:n}=e[2];return Ze.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:n})}default:throw new Error(`invalid data location: ${e[3]}`)}},Kf=class{async fetchModelAndCopyToWasmMemory(e){return Wf(await pa(e))}async loadModel(e,t){ot();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Vf(r,t),et()}async dispose(){return Gf(this.sessionId)}async run(e,t,r){ot();let i=[],n=[];Object.entries(e).forEach(f=>{let g=f[0],y=f[1],_=this.inputNames.indexOf(g);if(_===-1)throw new Error(`invalid input '${g}'`);i.push(y),n.push(_)});let a=[],s=[];Object.entries(t).forEach(f=>{let g=f[0],y=f[1],_=this.outputNames.indexOf(g);if(_===-1)throw new Error(`invalid output '${g}'`);a.push(y),s.push(_)});let u=i.map((f,g)=>Bn(f,()=>`input "${this.inputNames[n[g]]}"`)),l=a.map((f,g)=>f?Bn(f,()=>`output "${this.outputNames[s[g]]}"`):null),p=await Ff(this.sessionId,n,u,s,l,r),c={};for(let f=0;f<p.length;f++)c[this.outputNames[s[f]]]=a[f]??ap(p[f]);return et(),c}startProfiling(){}endProfiling(){Hf(this.sessionId)}}}),Xf={};tr(Xf,{OnnxruntimeWebAssemblyBackend:()=>ea,initializeFlags:()=>Jn,wasmBackend:()=>Yf});var Jn,ea,Yf,By=U(()=>{Ge(),jf(),Ny(),Jn=()=>{(typeof ge.wasm.initTimeout!="number"||ge.wasm.initTimeout<0)&&(ge.wasm.initTimeout=0);let e=ge.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),ge.wasm.simd=!1),typeof ge.wasm.proxy!="boolean"&&(ge.wasm.proxy=!1),typeof ge.wasm.trace!="boolean"&&(ge.wasm.trace=!1),typeof ge.wasm.numThreads!="number"||!Number.isInteger(ge.wasm.numThreads)||ge.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ge.wasm.numThreads=1;else{let t=typeof navigator>"u"?v0("node:os").cpus().length:navigator.hardwareConcurrency;ge.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},ea=class{async init(e){Jn(),await Lf(),await qf(e)}async createInferenceSessionHandler(e,t){let r=new Kf;return await r.loadModel(e,t),r}},Yf=new ea});Ge();Ge();Ge();var Dy="1.24.2";{let e=(By(),xr(Xf)).wasmBackend;Yt("webgpu",e,5),Yt("webnn",e,5),Yt("cpu",e,10),Yt("wasm",e,10)}Object.defineProperty(ge.versions,"web",{value:Dy,enumerable:!0});const Py=["person","bicycle","car","motorcycle","airplane","bus","train","truck","boat","traffic light","fire hydrant","stop sign","parking meter","bench","bird","cat","dog","horse","sheep","cow","elephant","bear","zebra","giraffe","backpack","umbrella","handbag","tie","suitcase","frisbee","skis","snowboard","sports ball","kite","baseball bat","baseball glove","skateboard","surfboard","tennis racket","bottle","wine glass","cup","fork","knife","spoon","bowl","banana","apple","sandwich","orange","broccoli","carrot","hot dog","pizza","donut","cake","chair","couch","potted plant","bed","dining table","toilet","tv","laptop","mouse","remote","keyboard","cell phone","microwave","oven","toaster","sink","refrigerator","book","clock","vase","scissors","teddy bear","hair drier","toothbrush"],sp=[[255,0,85],[0,255,170],[255,170,0],[0,85,255],[255,0,255],[0,255,0],[255,85,0],[85,0,255],[0,255,255],[255,255,0],[170,0,255],[0,170,255],[255,0,170],[85,255,0],[0,255,85],[170,255,0]];function Uy(e,t){const r=performance.now(),{srcWidth:i,srcHeight:n,modelSize:a,confThreshold:s,maskThreshold:u}=t,l=Object.keys(e);return console.log("[seg] Output tensors:",l.map(c=>`${c}: ${e[c].dims}`)),{segments:Ly(e,l,{srcWidth:i,srcHeight:n,modelSize:a,confThreshold:s,maskThreshold:u}),inferenceTime:performance.now()-r}}function Ly(e,t,r){const{srcWidth:i,srcHeight:n,modelSize:a,confThreshold:s,maskThreshold:u}=r,l=Math.min(a/i,a/n),p=(a-i*l)/2,c=(a-n*l)/2,f=[];let g=0,y=null,_=null;for(const H of t){const q=e[H],j=q.dims;if(j.length===4&&j[1]===32){_=q;continue}j.length===3&&(y=q)}if(!y)return console.warn("[seg] Could not find detection tensor in outputs"),[];const b=y.dims,T=y.data;let $,w,k=!1;b[2]>b[1]&&b[1]<200?(w=b[1],$=b[2],k=!0):($=b[1],w=b[2]);const S=_!==null,I=S?32:0,z=w===117+I||w===85+I,A=z?w-5-I:w-4-I,x=_?.data,P=_?_.dims[2]:0,L=_?_.dims[3]:0;for(let H=0;H<$;H++){const q=$e=>k?T[$e*$+H]:T[H*w+$e],j=q(0),R=q(1),D=q(2),G=q(3),J=z?5:4;let X=0,Z=-1;for(let $e=0;$e<Math.min(A,80);$e++){const ke=q(J+$e);ke>Z&&(Z=ke,X=$e)}if(z&&(Z*=q(4)),Z<s)continue;const le=Math.max(0,(j-D/2-p)/l),B=Math.max(0,(R-G/2-c)/l),V=Math.min(i,(j+D/2-p)/l),ee=Math.min(n,(R+G/2-c)/l);let ae=null;if(S&&x){const $e=J+A,ke=new Float32Array(I);for(let De=0;De<I;De++)ke[De]=q($e+De);ae=qy(ke,x,P,L,le,B,V,ee,i,n,l,p,c,u)}const Oe=sp[g%sp.length];f.push({id:g++,classId:X,label:Py[X]||`class_${X}`,confidence:Z,bbox:[le,B,V,ee],mask:ae,color:Oe})}return f.sort((H,q)=>q.confidence-H.confidence),f.forEach((H,q)=>{H.id=q}),console.log(`[seg] Found ${f.length} segments`),f}function qy(e,t,r,i,n,a,s,u,l,p,c,f,g,y){const _=new Float32Array(r*i);for(let T=0;T<r;T++)for(let $=0;$<i;$++){let w=0;for(let k=0;k<32;k++)w+=e[k]*t[k*r*i+T*i+$];_[T*i+$]=1/(1+Math.exp(-w))}const b=new Float32Array(l*p);for(let T=Math.floor(a);T<Math.min(Math.ceil(u),p);T++)for(let $=Math.floor(n);$<Math.min(Math.ceil(s),l);$++){const w=($*c+f)/(l*c+f*2)*i,k=(T*c+g)/(p*c+g*2)*r,S=Math.min(Math.floor(w),i-1),I=Math.min(Math.floor(k),r-1),z=_[I*i+S];b[T*l+$]=z>=y?1:0}return b}let ct=null,Dn=!1;const Ae=640;async function Qf(e,t={}){const{backend:r="webgl"}=t;ge.wasm.numThreads=1,ge.wasm.wasmPaths="https://cdn.jsdelivr.net/npm/onnxruntime-web@1.24.2/dist/";const i={executionProviders:["wasm"],graphOptimizationLevel:"all"};try{e instanceof ArrayBuffer?ct=await ii.create(e,i):ct=await ii.create(e,i),console.log("[seg] Model loaded. Inputs:",ct.inputNames,"Outputs:",ct.outputNames)}catch(n){throw ct=null,new Error(`Failed to load segmentation model: ${n.message}`)}}async function Wy(e,t={}){if(!ct)throw new Error("Model not loaded");if(Dn)return null;Dn=!0;try{const{confThreshold:r=.35,maskThreshold:i=.5}=t,n=Vy(e),a={[ct.inputNames[0]]:n},s=await ct.run(a);return Uy(s,{srcWidth:e.width,srcHeight:e.height,modelSize:Ae,confThreshold:r,maskThreshold:i})}finally{Dn=!1}}function Vy(e){const r=new OffscreenCanvas(Ae,Ae).getContext("2d"),i=new OffscreenCanvas(e.width,e.height);i.getContext("2d").putImageData(e,0,0);const a=Math.min(Ae/e.width,Ae/e.height),s=Math.round(e.width*a),u=Math.round(e.height*a),l=(Ae-s)/2,p=(Ae-u)/2;r.fillStyle="#808080",r.fillRect(0,0,Ae,Ae),r.drawImage(i,l,p,s,u);const c=r.getImageData(0,0,Ae,Ae).data,f=new Float32Array(3*Ae*Ae),g=Ae*Ae;for(let y=0;y<g;y++){const _=y*4;f[y]=c[_]/255,f[g+y]=c[_+1]/255,f[2*g+y]=c[_+2]/255}return new Ze("float32",f,[1,3,Ae,Ae])}function Zf(){return ct!==null}let Ie=[],Gy=1,Qr=0;const Fy=30,Hy=.3;function jy(e){if(Qr++,Ie.length===0&&e.length===0)return[];const t=new Set,r=new Set,i=[];for(let n=0;n<Ie.length;n++)for(let a=0;a<e.length;a++){const s=Xy(Ie[n].bbox,e[a].bbox),u=Ie[n].classId===e[a].classId?.1:0;i.push({ti:n,si:a,score:s+u})}i.sort((n,a)=>a.score-n.score);for(const{ti:n,si:a,score:s}of i)r.has(n)||t.has(a)||s<Hy||(Ie[n].classId=e[a].classId,Ie[n].label=e[a].label,Ie[n].confidence=e[a].confidence,Ie[n].bbox=e[a].bbox,Ie[n].mask=e[a].mask,Ie[n].color=e[a].color,Ie[n].lastSeen=Qr,Ie[n].age++,t.add(a),r.add(n));for(let n=0;n<e.length;n++)t.has(n)||Ie.push({trackId:Gy++,classId:e[n].classId,label:e[n].label,confidence:e[n].confidence,bbox:e[n].bbox,mask:e[n].mask,color:e[n].color,age:0,lastSeen:Qr,assignedShader:null});return Ie=Ie.filter(n=>Qr-n.lastSeen<Fy),Ie}function pi(){return Ie}function Ky(e,t){const r=Ie.find(i=>i.trackId===e);r&&(r.assignedShader=t)}function Xy(e,t){const r=Math.max(e[0],t[0]),i=Math.max(e[1],t[1]),n=Math.min(e[2],t[2]),a=Math.min(e[3],t[3]),s=Math.max(0,n-r)*Math.max(0,a-i);if(s===0)return 0;const u=(e[2]-e[0])*(e[3]-e[1]),l=(t[2]-t[0])*(t[3]-t[1]);return s/(u+l-s)}function op(e,t,r){const i=e.createShader(t);if(e.shaderSource(i,r),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS)){const n=e.getShaderInfoLog(i);throw e.deleteShader(i),new Error(`Shader compile error: ${n}`)}return i}function ta(e,t,r){const i=op(e,e.VERTEX_SHADER,t),n=op(e,e.FRAGMENT_SHADER,r),a=e.createProgram();if(e.attachShader(a,i),e.attachShader(a,n),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)){const s=e.getProgramInfoLog(a);throw e.deleteProgram(a),new Error(`Program link error: ${s}`)}return e.deleteShader(i),e.deleteShader(n),a}function Jf(e){const t=e.createVertexArray();e.bindVertexArray(t);const r=new Float32Array([-1,-1,0,0,1,-1,1,0,-1,1,0,1,1,1,1,1]),i=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,r,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,16,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,2,e.FLOAT,!1,16,8),e.bindVertexArray(null),t}function ei(e,t,r,i=null,n={}){const a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a);const s=n.internalFormat??e.RGBA8,u=n.format??e.RGBA,l=n.type??e.UNSIGNED_BYTE;return e.texImage2D(e.TEXTURE_2D,0,s,t,r,0,u,l,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),a}function Zt(e,t,r){const i=ei(e,t,r),n=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0);const a=e.checkFramebufferStatus(e.FRAMEBUFFER);if(a!==e.FRAMEBUFFER_COMPLETE)throw new Error(`Framebuffer incomplete: ${a}`);return e.bindFramebuffer(e.FRAMEBUFFER,null),{framebuffer:n,texture:i}}const ra=`#version 300 es
in vec2 a_position;
in vec2 a_texcoord;
out vec2 v_uv;
void main() {
  v_uv = vec2(a_texcoord.x, 1.0 - a_texcoord.y);
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;function Yy(e,t){const r=e.match(/\/\*\s*\{([\s\S]*?)\}\s*\*\//);let i={},n=e;if(r){try{i=JSON.parse(`{${r[1]}}`)}catch(u){console.warn(`[isf] Failed to parse header for ${t}:`,u)}n=e.slice(r.index+r[0].length).trim()}const a=(i.INPUTS||[]).map(u=>({NAME:u.NAME,TYPE:u.TYPE,DEFAULT:u.DEFAULT,MIN:u.MIN,MAX:u.MAX,LABEL:u.LABEL||u.NAME})),s=Qy(n,a);return{id:t,name:(i.DESCRIPTION?.split(`
`)[0]||i.ISFVSN,t),description:i.DESCRIPTION||"",inputs:a,glsl:s,rawGlsl:n,metadata:i}}function Qy(e,t){let r=e;const i=[[/isf_FragNormCoord/g,"v_uv"],[/TIME/g,"u_time"],[/RENDERSIZE/g,"u_resolution"],[/FRAMEINDEX/g,"u_frame"],[/gl_FragColor/g,"fragColor"],[/texture2D\s*\(/g,"texture("],[/IMG_NORM_PIXEL\s*\(\s*(\w+)\s*,/g,"texture($1,"],[/IMG_PIXEL\s*\(\s*(\w+)\s*,/g,"texture($1,"]];for(const[s,u]of i)r=r.replace(s,u);const a=`#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform float u_time;
uniform vec2 u_resolution;
uniform int u_frame;
uniform vec2 u_mouse;

${t.map(s=>{switch(s.TYPE){case"float":return`uniform float ${s.NAME};`;case"bool":return`uniform bool ${s.NAME};`;case"color":return`uniform vec4 ${s.NAME};`;case"point2D":return`uniform vec2 ${s.NAME};`;case"image":return`uniform sampler2D ${s.NAME};`;default:return`uniform float ${s.NAME};`}}).join(`
`)}

#define PI 3.14159265359
#define TWO_PI 6.28318530718
`;return r.includes("void main")?a+`
`+r:a+`
void main() {
`+r+`
}`}function Zy(e){const t={};for(const r of e.inputs)if(r.DEFAULT!==void 0)t[r.NAME]=r.DEFAULT;else switch(r.TYPE){case"float":t[r.NAME]=.5;break;case"bool":t[r.NAME]=!1;break;case"color":t[r.NAME]=[1,1,1,1];break;case"point2D":t[r.NAME]=[.5,.5];break;default:t[r.NAME]=0}return t}const Jy=`/*{
  "DESCRIPTION": "Plasma — classic VJ plasma effect",
  "INPUTS": [
    { "NAME": "speed", "TYPE": "float", "DEFAULT": 1.0, "MIN": 0.0, "MAX": 5.0 },
    { "NAME": "scale", "TYPE": "float", "DEFAULT": 3.0, "MIN": 0.5, "MAX": 20.0 },
    { "NAME": "complexity", "TYPE": "float", "DEFAULT": 1.0, "MIN": 0.0, "MAX": 3.0 }
  ]
}*/

void main() {
  vec2 uv = v_uv * scale;
  float t = u_time * speed;

  float v1 = sin(uv.x * 2.0 + t);
  float v2 = sin(uv.y * 2.0 + t * 0.7);
  float v3 = sin((uv.x + uv.y) * complexity + t * 1.3);
  float v4 = sin(length(uv - vec2(0.5 * scale)) * 2.0 * complexity - t);

  float v = (v1 + v2 + v3 + v4) * 0.25;

  vec3 col;
  col.r = sin(v * PI + t * 0.3) * 0.5 + 0.5;
  col.g = sin(v * PI + t * 0.5 + TWO_PI / 3.0) * 0.5 + 0.5;
  col.b = sin(v * PI + t * 0.7 + TWO_PI * 2.0 / 3.0) * 0.5 + 0.5;

  fragColor = vec4(col, 1.0);
}
`,e_=`/*{
  "DESCRIPTION": "Noise Field — flowing simplex noise",
  "INPUTS": [
    { "NAME": "speed", "TYPE": "float", "DEFAULT": 0.5, "MIN": 0.0, "MAX": 3.0 },
    { "NAME": "scale", "TYPE": "float", "DEFAULT": 4.0, "MIN": 0.5, "MAX": 20.0 },
    { "NAME": "octaves", "TYPE": "float", "DEFAULT": 3.0, "MIN": 1.0, "MAX": 6.0 },
    { "NAME": "brightness", "TYPE": "float", "DEFAULT": 1.0, "MIN": 0.0, "MAX": 2.0 }
  ]
}*/

// Simplex-like noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p, float oct) {
  float val = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (float i = 0.0; i < 6.0; i++) {
    if (i >= oct) break;
    val += amp * snoise(p * freq);
    freq *= 2.0;
    amp *= 0.5;
  }
  return val;
}

void main() {
  vec2 uv = v_uv * scale;
  float t = u_time * speed;

  float n = fbm(uv + vec2(t * 0.3, t * 0.2), octaves);
  float n2 = fbm(uv + vec2(n * 0.5, t * 0.1), octaves);

  vec3 col;
  col.r = n * 0.5 + 0.5;
  col.g = n2 * 0.4 + 0.4;
  col.b = (n + n2) * 0.3 + 0.6;
  col *= brightness;

  fragColor = vec4(col, 1.0);
}
`,t_=`/*{
  "DESCRIPTION": "Color Waves — undulating color bands",
  "INPUTS": [
    { "NAME": "speed", "TYPE": "float", "DEFAULT": 1.0, "MIN": 0.0, "MAX": 5.0 },
    { "NAME": "frequency", "TYPE": "float", "DEFAULT": 6.0, "MIN": 1.0, "MAX": 30.0 },
    { "NAME": "amplitude", "TYPE": "float", "DEFAULT": 0.3, "MIN": 0.0, "MAX": 1.0 },
    { "NAME": "hueShift", "TYPE": "float", "DEFAULT": 0.0, "MIN": 0.0, "MAX": 1.0 }
  ]
}*/

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec2 uv = v_uv;
  float t = u_time * speed;

  float wave1 = sin(uv.y * frequency + t + sin(uv.x * 3.0 + t * 0.5) * amplitude * 5.0);
  float wave2 = sin(uv.x * frequency * 0.7 + t * 1.3 + cos(uv.y * 4.0 + t * 0.3) * amplitude * 3.0);
  float wave3 = sin((uv.x + uv.y) * frequency * 0.5 + t * 0.8);

  float combined = (wave1 + wave2 + wave3) / 3.0;

  float hue = fract(combined * 0.5 + 0.5 + hueShift + t * 0.05);
  float sat = 0.7 + 0.3 * sin(combined * PI);
  float val = 0.8 + 0.2 * combined;

  vec3 col = hsv2rgb(vec3(hue, sat, val));
  fragColor = vec4(col, 1.0);
}
`,r_=`/*{
  "DESCRIPTION": "Geometric — rotating geometric patterns",
  "INPUTS": [
    { "NAME": "speed", "TYPE": "float", "DEFAULT": 0.5, "MIN": 0.0, "MAX": 3.0 },
    { "NAME": "segments", "TYPE": "float", "DEFAULT": 6.0, "MIN": 3.0, "MAX": 24.0 },
    { "NAME": "rings", "TYPE": "float", "DEFAULT": 5.0, "MIN": 1.0, "MAX": 20.0 },
    { "NAME": "glow", "TYPE": "float", "DEFAULT": 0.02, "MIN": 0.001, "MAX": 0.1 }
  ]
}*/

void main() {
  vec2 uv = v_uv * 2.0 - 1.0;
  uv.x *= u_resolution.x / u_resolution.y;
  float t = u_time * speed;

  float r = length(uv);
  float a = atan(uv.y, uv.x);

  // Kaleidoscope fold
  float seg = TWO_PI / segments;
  a = mod(a, seg) - seg * 0.5;

  // Rotating rings
  float ring = sin(r * rings * PI - t * 2.0);
  float spoke = cos(a * segments * 0.5 + t);

  // Pattern
  float pattern = ring * spoke;

  // Glow lines
  float line1 = glow / abs(sin(r * rings * PI - t * 2.0));
  float line2 = glow / abs(cos(a * floor(segments) + t * 0.5));
  float lines = min(line1 + line2, 2.0);

  // Color
  vec3 col1 = vec3(0.1, 0.4, 0.9); // blue
  vec3 col2 = vec3(0.9, 0.2, 0.5); // pink
  vec3 col3 = vec3(0.1, 0.9, 0.6); // cyan

  vec3 col = mix(col1, col2, sin(r * 3.0 + t) * 0.5 + 0.5);
  col = mix(col, col3, sin(a * 2.0 + t * 0.7) * 0.5 + 0.5);
  col *= lines;

  // Fade at edges
  col *= smoothstep(1.5, 0.3, r);

  fragColor = vec4(col, 1.0);
}
`;class i_{#r;#o;#e=new Map;#i;#t;#n=0;#a;constructor(t,r,i){this.#r=t,this.#i=r,this.#t=i,this.#o=Jf(t),this.#a=performance.now()/1e3,this.#s()}#s(){const t=[["plasma",Jy],["noise-field",e_],["color-waves",t_],["geometric",r_]];for(const[r,i]of t)this.addShader(r,i)}addShader(t,r){const i=this.#r,n=Yy(r,t);let a;try{a=ta(i,ra,n.glsl)}catch(c){return console.error(`[pipeline] Shader ${t} compile failed:`,c.message),null}const s=Zt(i,this.#i,this.#t),u=Zy(n),l={},p=["u_time","u_resolution","u_frame","u_mouse",...n.inputs.map(c=>c.NAME)];for(const c of p)l[c]=i.getUniformLocation(a,c);return this.#e.set(t,{id:t,isf:n,program:a,uniforms:u,fbo:s,locations:l}),n}render(t=[0,0]){const r=this.#r,i=performance.now()/1e3-this.#a;this.#n++,r.bindVertexArray(this.#o);for(const n of this.#e.values()){r.bindFramebuffer(r.FRAMEBUFFER,n.fbo.framebuffer),r.viewport(0,0,this.#i,this.#t),r.useProgram(n.program);const a=n.locations;a.u_time!=null&&r.uniform1f(a.u_time,i),a.u_resolution!=null&&r.uniform2f(a.u_resolution,this.#i,this.#t),a.u_frame!=null&&r.uniform1i(a.u_frame,this.#n),a.u_mouse!=null&&r.uniform2f(a.u_mouse,t[0],t[1]);for(const s of n.isf.inputs){const u=a[s.NAME];if(u==null)continue;const l=n.uniforms[s.NAME];switch(s.TYPE){case"float":r.uniform1f(u,l);break;case"bool":r.uniform1i(u,l?1:0);break;case"color":r.uniform4fv(u,l);break;case"point2D":r.uniform2fv(u,l);break}}r.drawArrays(r.TRIANGLE_STRIP,0,4)}r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindVertexArray(null)}getTexture(t){return this.#e.get(t)?.fbo.texture??null}setUniform(t,r,i){const n=this.#e.get(t);n&&(n.uniforms[r]=i)}getShaderList(){return[...this.#e.values()].map(t=>({id:t.id,name:t.isf.name||t.id,description:t.isf.description,inputs:t.isf.inputs}))}resize(t,r){this.#i=t,this.#t=r;const i=this.#r;for(const n of this.#e.values())i.deleteFramebuffer(n.fbo.framebuffer),i.deleteTexture(n.fbo.texture),n.fbo=Zt(i,t,r)}}const n_=`#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_base;      // previous composite
uniform sampler2D u_layer;     // shader output
uniform sampler2D u_mask;      // segment mask
uniform float u_opacity;

void main() {
  vec4 base = texture(u_base, v_uv);
  vec4 layer = texture(u_layer, v_uv);
  float maskVal = texture(u_mask, v_uv).r;
  float alpha = maskVal * u_opacity;
  fragColor = vec4(mix(base.rgb, layer.rgb, alpha), 1.0);
}`,a_=`#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_tex;

void main() {
  fragColor = texture(u_tex, v_uv);
}`;class s_{#r;#o;#e;#i;#t=new Map;#n;#a;#s;#u;#l;#d={};#p={};constructor(t,r,i){this.#r=t,this.#n=r,this.#a=i,this.#i=Jf(t),this.#o=ta(t,ra,n_),this.#e=ta(t,ra,a_),this.#s=ei(t,r,i),this.#u=Zt(t,r,i),this.#l=Zt(t,r,i);const n=this.#o;this.#d={u_base:t.getUniformLocation(n,"u_base"),u_layer:t.getUniformLocation(n,"u_layer"),u_mask:t.getUniformLocation(n,"u_mask"),u_opacity:t.getUniformLocation(n,"u_opacity")},this.#p={u_tex:t.getUniformLocation(this.#e,"u_tex")}}updateBackground(t){const r=this.#r;r.bindTexture(r.TEXTURE_2D,this.#s),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,t)}updateMask(t,r,i,n){const a=this.#r,s=new Uint8Array(i*n);for(let l=0;l<r.length;l++)s[l]=r[l]>.5?255:0;let u=this.#t.get(t);u||(u=ei(a,i,n,null,{internalFormat:a.R8,format:a.RED,type:a.UNSIGNED_BYTE}),this.#t.set(t,u)),a.bindTexture(a.TEXTURE_2D,u),a.texImage2D(a.TEXTURE_2D,0,a.R8,i,n,0,a.RED,a.UNSIGNED_BYTE,s)}composite(t,r={}){const i=this.#r,{showBackground:n=!0}=r;i.bindVertexArray(this.#i),i.bindFramebuffer(i.FRAMEBUFFER,this.#u.framebuffer),i.viewport(0,0,this.#n,this.#a),i.useProgram(this.#e),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,this.#s),i.uniform1i(this.#p.u_tex,0),i.drawArrays(i.TRIANGLE_STRIP,0,4),n||(i.clearColor(0,0,0,1),i.clear(i.COLOR_BUFFER_BIT));let a=this.#u,s=this.#l;i.useProgram(this.#o);for(const u of t){const l=this.#t.get(u.segmentId);if(!l)continue;i.bindFramebuffer(i.FRAMEBUFFER,s.framebuffer),i.viewport(0,0,this.#n,this.#a),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,a.texture),i.uniform1i(this.#d.u_base,0),i.activeTexture(i.TEXTURE1),i.bindTexture(i.TEXTURE_2D,u.shaderTexture),i.uniform1i(this.#d.u_layer,1),i.activeTexture(i.TEXTURE2),i.bindTexture(i.TEXTURE_2D,l),i.uniform1i(this.#d.u_mask,2),i.uniform1f(this.#d.u_opacity,u.opacity??1),i.drawArrays(i.TRIANGLE_STRIP,0,4);const p=a;a=s,s=p}i.bindFramebuffer(i.FRAMEBUFFER,null),i.viewport(0,0,this.#n,this.#a),i.useProgram(this.#e),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,a.texture),i.uniform1i(this.#p.u_tex,0),i.drawArrays(i.TRIANGLE_STRIP,0,4),i.bindVertexArray(null)}resize(t,r){this.#n=t,this.#a=r;const i=this.#r;i.deleteTexture(this.#s),this.#s=ei(i,t,r),i.deleteFramebuffer(this.#u.framebuffer),i.deleteTexture(this.#u.texture),i.deleteFramebuffer(this.#l.framebuffer),i.deleteTexture(this.#l.texture),this.#u=Zt(i,t,r),this.#l=Zt(i,t,r);for(const n of this.#t.values())i.deleteTexture(n);this.#t.clear()}}function o_(e,t,r={}){const{showMasks:i=!0,showBoxes:n=!0,showLabels:a=!0,maskAlpha:s=.35,highlightId:u=null}=r,l=e.getContext("2d");if(l.clearRect(0,0,e.width,e.height),!(!t||t.length===0))for(const p of t){const[c,f,g]=p.color,y=p.trackId===u,_=y?.6:s;if(i&&p.mask){const b=l.createImageData(e.width,e.height),T=b.data;for(let $=0;$<p.mask.length;$++)if(p.mask[$]>.5){const w=$*4;T[w]=c,T[w+1]=f,T[w+2]=g,T[w+3]=Math.floor(_*255)}l.putImageData(b,0,0)}if(n){const[b,T,$,w]=p.bbox;l.strokeStyle=`rgba(${c},${f},${g},${y?1:.7})`,l.lineWidth=y?2:1,l.strokeRect(b,T,$-b,w-T)}if(a){const[b,T]=p.bbox,$=`${p.label} ${Math.round(p.confidence*100)}%`,w=p.assignedShader?` → ${p.assignedShader}`:"";l.font="11px monospace";const k=l.measureText($+w).width;l.fillStyle=`rgba(${c},${f},${g},0.8)`,l.fillRect(b,T-16,k+8,16),l.fillStyle="#fff",l.fillText($,b+4,T-4),w&&(l.fillStyle="#ffd700",l.fillText(w,b+4+l.measureText($).width,T-4))}}}function u_(e,t,r,i){if(!e)return null;for(const n of e){const[a,s,u,l]=n.bbox;if(!(t<a||t>u||r<s||r>l))if(n.mask){const p=Math.floor(r)*i+Math.floor(t);if(n.mask[p]>.5)return n}else return n}return null}function l_(e,t){e.innerHTML="";for(const r of t){const i=document.createElement("div");i.className="shader-item",i.dataset.shaderId=r.id,i.innerHTML=`
      <canvas class="shader-preview" width="32" height="32"></canvas>
      <span>${r.name||r.id}</span>
    `,e.appendChild(i)}}function d_(e,t,r,i,n){if(e.innerHTML="",!t||t.length===0){e.innerHTML='<p class="placeholder">Run segmentation to detect regions</p>';return}for(const a of t){const[s,u,l]=a.color,p=document.createElement("div");p.className="segment-item",p.dataset.trackId=a.trackId;const c=r.map(g=>`<option value="${g.id}" ${a.assignedShader===g.id?"selected":""}>${g.name||g.id}</option>`).join("");p.innerHTML=`
      <span class="segment-color" style="background: rgb(${s},${u},${l})"></span>
      <span class="segment-label">${a.label} <small>${Math.round(a.confidence*100)}%</small></span>
      <select>
        <option value="">none</option>
        ${c}
      </select>
    `;const f=p.querySelector("select");f.addEventListener("change",()=>{i(a.trackId,f.value||null)}),p.addEventListener("mouseenter",()=>n(a.trackId)),p.addEventListener("mouseleave",()=>n(null)),e.appendChild(p)}}function em(e,t){const r=t?.filter(i=>i.assignedShader)??[];if(r.length===0){e.innerHTML='<p class="placeholder">Assign shaders to segments above</p>';return}e.innerHTML="";for(const i of r){const[n,a,s]=i.color,u=document.createElement("div");u.className="mapping-item",u.innerHTML=`
      <span class="segment-color" style="background: rgb(${n},${a},${s})"></span>
      <span>${i.label}</span>
      <span style="color: var(--text-dim)">→</span>
      <span style="color: var(--accent)">${i.assignedShader}</span>
    `,e.appendChild(u)}}function p_(e,t){e.textContent=`${Math.round(t)} fps`}function xt(e,t){e.textContent=`seg: ${t}`}const st=document.getElementById("canvas-source"),Je=document.getElementById("canvas-overlay"),Ve=document.getElementById("canvas-output"),c_=document.getElementById("fps-display"),Tt=document.getElementById("seg-status"),h_=document.getElementById("segment-list"),f_=document.getElementById("shader-list"),tm=document.getElementById("mapping-list"),ci=document.getElementById("btn-camera"),fi=document.getElementById("btn-image"),Pn=document.getElementById("btn-segment"),m_=document.getElementById("btn-fullscreen"),g_=document.getElementById("chk-overlay"),y_=document.getElementById("chk-shaders"),__=document.getElementById("chk-flip"),rm=document.getElementById("file-image"),mi=document.getElementById("modal-model"),w_=document.getElementById("btn-close-modal"),ht=document.getElementById("model-dropzone"),up="/vj-mapper/models/yolo26n-seg.onnx";let St=null,Pt=null,Aa=null,im=[0,0],ti=!1,b_=5,lp=0,dp=performance.now(),yr=[];async function v_(){console.log("[vjm] Initializing VJ Mapper...");const e=Ve.getContext("webgl2",{alpha:!0,antialias:!1,premultipliedAlpha:!1});if(!e){alert("WebGL2 not supported in this browser.");return}St=new i_(e,Ve.width,Ve.height),Pt=new s_(e,Ve.width,Ve.height),l_(f_,St.getShaderList()),await $_();try{await pp(st),Oa(),ci.classList.add("active"),fi.classList.remove("active")}catch(t){console.warn("[vjm] Camera not available:",t.message)}requestAnimationFrame(nm)}function nm(){const e=performance.now(),t=e-dp;dp=e,yr.push(t),yr.length>30&&yr.shift();const r=yr.reduce((i,n)=>i+n,0)/yr.length;if(p_(c_,1e3/r),lp++,hp()&&m0(st,{rotate180:__.checked}),ti&&Zf()&&lp%b_===0&&am(),g_.checked?o_(Je,pi(),{highlightId:Aa}):Je.getContext("2d").clearRect(0,0,Je.width,Je.height),y_.checked&&St&&Pt){St.render(im);const i=pi(),n=[];for(const a of i){if(!a.assignedShader)continue;const s=St.getTexture(a.assignedShader);s&&(a.mask&&Pt.updateMask(a.trackId,a.mask,st.width,st.height),n.push({segmentId:a.trackId,shaderTexture:s,opacity:1}))}Pt.updateBackground(st),Pt.composite(n,{showBackground:!0})}requestAnimationFrame(nm)}async function $_(){xt(Tt,"loading model...");try{console.log("[vjm] Fetching model from:",up);const e=await fetch(up);if(!e.ok)throw new Error(`Model fetch failed: HTTP ${e.status}`);const t=await e.arrayBuffer();console.log(`[vjm] Model downloaded: ${(t.byteLength/1024/1024).toFixed(1)} MB`),await Qf(t),xt(Tt,"ready")}catch(e){console.error("[vjm] Model load failed:",e),xt(Tt,"no model"),mi.classList.remove("hidden")}}async function am(){if(!Zf()){mi.classList.remove("hidden");return}xt(Tt,"running...");try{const e=y0(st),t=await Wy(e);if(t){const r=jy(t.segments);xt(Tt,`${r.length} segs (${Math.round(t.inferenceTime)}ms)`),d_(h_,r,St.getShaderList(),x_,T_),em(tm,r)}}catch(e){console.error("[vjm] Segmentation error:",e),xt(Tt,"error")}}function x_(e,t){Ky(e,t),em(tm,pi())}function T_(e){Aa=e}function Oa(){const e=st.width,t=st.height;Je.width=e,Je.height=t,Ve.width=e,Ve.height=t,St&&St.resize(e,t),Pt&&Pt.resize(e,t)}ci.addEventListener("click",async()=>{try{await pp(st),Oa(),ci.classList.add("active"),fi.classList.remove("active")}catch(e){alert(`Camera error: ${e.message}`)}});fi.addEventListener("click",()=>{rm.click()});rm.addEventListener("change",async e=>{const t=e.target.files?.[0];t&&(cp(),await g0(t,st),Oa(),ci.classList.remove("active"),fi.classList.add("active"))});Pn.addEventListener("click",()=>{ti?(ti=!1,Pn.textContent="▶ Segment",xt(Tt,"paused")):(hp()&&(ti=!0,Pn.textContent="⏸ Stop"),am())});m_.addEventListener("click",()=>{const e=window.open("","vj-output","fullscreen=yes");if(!e){alert("Popup blocked. Allow popups for fullscreen output.");return}e.document.title="VJ Output",e.document.body.style.cssText="margin:0;padding:0;background:#000;overflow:hidden;";const t=e.document.createElement("canvas");t.width=Ve.width,t.height=Ve.height,t.style.cssText="width:100vw;height:100vh;object-fit:contain;display:block;",e.document.body.appendChild(t);const r=t.getContext("2d");function i(){e.closed||(r.drawImage(Ve,0,0,t.width,t.height),requestAnimationFrame(i))}i(),t.addEventListener("click",()=>{t.requestFullscreen?.()||t.webkitRequestFullscreen?.()})});w_.addEventListener("click",()=>{mi.classList.add("hidden")});ht.addEventListener("dragover",e=>{e.preventDefault(),ht.classList.add("dragover")});ht.addEventListener("dragleave",()=>{ht.classList.remove("dragover")});ht.addEventListener("drop",async e=>{e.preventDefault(),ht.classList.remove("dragover");const t=e.dataTransfer.files?.[0];if(!t||!t.name.endsWith(".onnx")){ht.textContent="Please drop a .onnx file";return}ht.textContent="Loading model...";try{const r=await t.arrayBuffer();await Qf(r),xt(Tt,"ready"),mi.classList.add("hidden")}catch(r){ht.textContent=`Error: ${r.message}`}});Ve.addEventListener("mousemove",e=>{const t=Ve.getBoundingClientRect();im=[(e.clientX-t.left)/t.width,1-(e.clientY-t.top)/t.height]});Je.addEventListener("click",e=>{const t=Je.getBoundingClientRect(),r=Je.width/t.width,i=Je.height/t.height,n=(e.clientX-t.left)*r,a=(e.clientY-t.top)*i,s=u_(pi(),n,a,Je.width);s&&(Aa=s.trackId,console.log(`[vjm] Selected segment: ${s.label} (track ${s.trackId})`))});v_();
