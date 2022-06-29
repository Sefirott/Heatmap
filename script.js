//window.addEventListener('load', (e) => {
console.clear();
const supportTouch = ('ontouched' in document);
const eTouchStart = supportTouch ? 'touchstart' : 'mousedown';
const eTouchMove = supportTouch ? 'touchmove' : 'mousemove';
const eTouchEnd = supportTouch ? 'touchend' : 'mouseup';

const heatmap = h337.create({
  container: document.querySelector('.canvas'),
  radius: 30,
  maxOpacity: 0.5,
  minOpacity: 0 });


let data = {
  max: 0.9,
  min: 0.1,
  data: [
  0, 0, 0, 0] };



function clear() {
  return heatmap.setData(data);
}

(function repeat() {
  clear();
  setTimeout(repeat, document.getElementById("time").value * 1000);
})();



let r = 30;

const getRadius = () => {
  r = document.getElementById("radius").value;
};

const changeRadius = () => {
  heatmap["_store"]["_cfgRadius"] = r;
};

const update = e => {
  // console.log(e);
  let original = e.originalEvent || false;
  let x, y;

  if (e.changedTouches) {
    x = e.changedTouches[0].layerX;
    y = e.changedTouches[0].layerY;
  } else {
    x = e.layerX;
    y = e.layerY;
  }
  heatmap.addData({
    x: x,
    y: y,
    value: 0.5 });


};
const target = document.querySelector('.wrapper');
let intervalId;
target.addEventListener(eTouchStart, e => {
  target[`on${eTouchMove}`] = e => {
    e.preventDefault();
    update(e);
  };
});
target.addEventListener(eTouchEnd, e => {
  // console.log('mousup');
  target[`on${eTouchMove}`] = null;
});

// });

$('#addVideosBtn').click(function () {
  $(this).parents().find('#addVideosInput').click();
});

document.getElementById('addVideosInput').onchange = e => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const vid = ` <video controls="controls" src=" ${url} " type="video/mp4" width="100%" height="100%" autoplay muted ></video>
   `;
  setTimeout(() =>
  $('.videos').append(vid),
  5000);
};

let btn = document.getElementById("record");
btn.addEventListener("click", async function () {
  let stream = await navigator.mediaDevices.getDisplayMedia({
    video: true });


  const mediaRecorder = new MediaRecorder(stream);


  let chunks = [];
  mediaRecorder.addEventListener("dataavailable", function (e) {
    chunks.push(e.data);
  });

  mediaRecorder.addEventListener("stop", function () {
    let blob = new Blob(chunks, {
      type: chunks[0].type });


    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "video.gom";
    a.click();

  });



  mediaRecorder.start();

});