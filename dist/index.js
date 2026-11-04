"use strict";var w=function(i,r){return function(){try{return r||i((r={exports:{}}).exports,r),r.exports}catch(a){throw (r=0, a)}};};var k=w(function(M,B){
var z=require('@stdlib/math-base-special-floor/dist');function A(i,r,a,e,s,p){var l,v,u,t,o,n,q,h,c,g,y,m;for(u=r.data,t=r.accessors[0],o=r.accessors[1],h=i,l=z(i/2);;){if(l>0)l-=1,c=t(u,e+l*a);else{if(h-=1,h===0)return r;g=e+h*a,c=t(u,g),o(u,g,t(u,e))}for(y=l,v=y*2+1;v<h&&(m=v+1,m<h&&(n=t(u,e+m*a),q=t(u,e+v*a),s.call(p,n,q,r)>0&&(v+=1)),n=t(u,e+v*a),s.call(p,n,c,r)>0);)o(u,e+y*a,n),y=v,v=y*2+1;o(u,e+y*a,c)}}B.exports=A
});var j=w(function(Q,b){
var C=require('@stdlib/array-base-arraylike2object/dist'),D=require('@stdlib/math-base-special-floor/dist'),E=k();function F(i,r,a,e,s){var p,l,v,u,t,o,n,q,h,c,g;if(arguments.length>5&&(p=arguments[5]),i<=0)return r;if(o=C(r),o.accessorProtocol)return E(i,o,a,e,s,p),o.data;for(n=i,l=D(i/2);;){if(l>0)l-=1,q=r[e+l*a];else{if(n-=1,n===0)return r;h=e+n*a,q=r[h],r[h]=r[e]}for(c=l,v=c*2+1;v<n&&(g=v+1,g<n&&(u=r[e+g*a],t=r[e+v*a],s.call(p,u,t,r)>0&&(v+=1)),u=r[e+v*a],s.call(p,u,q,r)>0);)r[e+c*a]=u,c=v,v=c*2+1;r[e+c*a]=q}}b.exports=F
});var P=w(function(S,O){
var G=require('@stdlib/strided-base-stride2offset/dist'),H=j();function I(i,r,a,e){return H(i,r,a,G(i,a),e,arguments[4])}O.exports=I
});var J=require('@stdlib/utils-define-nonenumerable-read-only-property/dist'),R=P(),K=j();J(R,"ndarray",K);module.exports=R;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
