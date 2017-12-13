
// import aframe from 'aframe';
// import registerClickDrag from 'aframe-click-drag-component';
// window.aframeDraggableComponent(pink.AFRAME)
// registerClickDrag(aframe)
// use the url https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=pageimages&grnlimit=10 go query.pages[number].thumbnail.source
// if the thumbnail doesn't exist then then the ajax function runs agin until it finds one with an image
require('aframe-extras');
window.onload=function(){

  var h = -3
  var enter="cookie"
  var urlfull = "https://en.wikipedia.org/w/api.php?action=query&generator=random&prop=pageimages&grnlimit=100"+"&format=json&callback=?";
  // revids=478198
  $.ajax({
    type: "GET",
    url: urlfull,
    contentType: "application/json; charset=utf-8",
    async: false,
    dataType: "json",
    success:function(res){
      // console.log(res)
      var t =res.query.pages
      console.log(t)
      let arrObj = []

      Object.values(t).map((k,i)=>{
        arrObj.push(k)
      })


      // var pic={t}
      // console.log(pic)
      // console.log(res.query)
      arrObj.forEach((e,i)=>{
        // console.log(e.thumbnail)

        if(e.hasOwnProperty('thumbnail')){
          var side = (Math.floor(Math.random()*5))
          console.log(side)
          if (side==1){
            var randPosY = (Math.floor(Math.random()*3))
            var randomPosX = (Math.floor(Math.random()*8)-4)
            var randomPosYY =randPosY-1
            var random =0.6
            var position=0

          }
          else if (side==2){
            var randPosY = (Math.floor(Math.random()*3))
            var randomPosX = -3.4
            var randomPosYY =randPosY-1
            var random =(Math.floor(Math.random()*7))
            var position=-270
          }
          else if (side==3){
            var randPosY = (Math.floor(Math.random()*3))
            var randomPosX = 3.4
            var randomPosYY =randPosY-1
            var random =(Math.floor(Math.random()*7))
            var position=-90
          }
          else{
            var randPosY = (Math.floor(Math.random()*2))
            var randomPosX = (Math.floor(Math.random()*5)-3)
            var randomPosYY =randPosY-1
            var random =6.4
            var position=-180
          }
          console.log(e.thumbnail.source)
          var page = e.pageid
          console.log(page)
          var g=e.thumbnail.source
          var title=e.title
          console.log(g)
          // console.log(randomPosXX);

          console.log(title)
          console.log(e)
          h = h+2
          m = 2
          n =2
          console.log(h)
          console.log(g)
          var elem = document.createElement("a-image");
          var frame = document.createElement("a-image")


          elem.setAttribute("src", g);
          elem.setAttribute("height", ".5");
          elem.setAttribute("width", ".5");
          elem.setAttribute("rotation", {x:0, y:position, z:0})
          elem.setAttribute("position", {x:randomPosX, y:randPosY, z:random})
          document.getElementById("steve").appendChild(elem);

          frame.setAttribute("src", "img/frame.png")
          frame.setAttribute("height", "1")
          frame.setAttribute("width", "1")
          frame.setAttribute("rotation", {x:0, y:position, z:0})
          frame.setAttribute("position", {x:randomPosX, y:randPosY, z:random})
          document.getElementById("steve").appendChild(frame)

          var link = "https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids="+ page +"&format=json&callback=?";
          // revids=478198
          $.ajax({
            type: "GET",
            url: link,
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success:function(re){
              let result =re.query.pages
              console.log(re.query.pages)
              for(let propName in result) {
                if(result.hasOwnProperty(propName)) {
                  let propValue = result[propName];
                  console.log(propValue)
                  var ti =propValue.title
                  console.log(ti)
                  // do something with each element here
                }
              }
              let link = "https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids="+ page +"&format=json&callback=?";
              // revids=478198
              $.ajax({
                type: "GET",
                url: link,
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success:function(re){
                  let result =re.query.pages
                  console.log(re.query.pages)
                  for(let propName in result) {
                    if(result.hasOwnProperty(propName)) {
                      let propValue = result[propName];
                      console.log(propValue)
                      let ti =propValue.title
                      console.log(ti)

                      // do something with each element here
                    }
                  }
                  let link = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ti +"&format=json&callback=?";
                  // revids=478198
                  $.ajax({
                    type: "GET",
                    url: link,
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    dataType: "json",
                    success:function(res){
                      // var resu =re
                      console.log(res)
                      console.log(res[2][0])
                      let ds = (res[2][0])
                      let text = document.createElement("a-text")
                      text.setAttribute("value", ti + ": "+ ds)
                      text.setAttribute("rotation", {x:0, y:position, z:0})
                      text.setAttribute("position", {x:randomPosX, y:randomPosYY, z:random})
                      text.setAttribute("scale",".1 1 1")
                      text.setAttribute("width", "10")
                      text.setAttribute("height", "20")
                      text.setAttribute("wrapCount","10")
                      text.setAttribute("geometry", "primitive:plane")
                      text.setAttribute("color", "black")
                      document.getElementById("steve").appendChild(text);
                      // for(var propName in result) {
                      //   if(result.hasOwnProperty(propName)) {
                      //     var propValue = result[propName];
                      //     console.log(propValue)
                      //     var ti =propValue.title
                      //     console.log(ti)
                      //     // do something with each element here
                      //   }
                      // }
                    },
                    error:function(u){
                      console.log("u")
                      alert("sorry, there are no results for your search")
                    }
                  })
                },
                error:function(u){
                  console.log("u")
                  alert("sorry, there are no results for your search")
                }
              })
            },
            error:function(u){
              console.log("u")
              alert("sorry, there are no results for your search")
            }
          })
        }
      })

    },
    error:function(e){
      console.log("e")
      alert("sorry, there are no results for your search")
    }
  })
}
// var urlfull = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ enter +"&format=json&callback=?";
// then search the title and puttl from the second array the first number to make the description
// $.ajax({
//   type: "GET",
//   url: urlfull,
//   contentType: "application/json; charset=utf-8",
//   async: false,
//   dataType: "json",
// success:function(res){
//   console.log(res)
//   console.log("h")
//   $('#data').html('<li>'+ res[1]+ res[2] + res[3]+'</li>');
//   console.log(res)
// var urlfull = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions|images&rvprop=content&grnlimit=10";
// var apiKey = "apikey=c3fac330-b99b-11e7-a84b-8d53d2975e8e";
// var key = "object?";
// var keyword="keyword=";
// var word = $("#getWord").val();
// url breakdown

// var video = document.getElementById('charlie');
// var source = document.createElement('source');

// source.setAttribute('src', 'https://camo.mybb.com/e01de90be6012adc1b1701dba899491a9348ae79/687474703a2f2f7777772e6a71756572797363726970742e6e65742f696d616765732f53696d706c6573742d526573706f6e736976652d6a51756572792d496d6167652d4c69676874626f782d506c7567696e2d73696d706c652d6c69676874626f782e6a7067');
// $.get("https://api.harvardartmuseums.org/object?keyword=cat&" + apiKey,
// function(t){
//   // putting together the url
//   console.log(t)
//   $("#charlie").attr( "src", "https://vignette.wikia.nocookie.net/mint524/images/d/d7/Sky.jpg/revision/latest?cb=2016070615265")
// })
// console.log("lit")
//  var enter=$("#searchText").val()
//  var urlfull = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ cookie +"&format=json&callback=?"
//
//  $.ajax({
//    type: "GET",
//    url: urlfull,
//    contentType: "application/json; charset=utf-8",
//    async: false,
//    dataType: "json",
//  success:function(res){
//    console.log(res)
//    // console.log("h")
//    // $('#data').append('<li>'+ res[1]+ res[2] + res[3]+'</li>');
//
//  },
//  error:function(e){
//    console.log("e")
//  }
// })

//
// $.ajax({
//
// url:urlfull,
// success:function(res){
//   console.log("h")
//   console.log(res)
// },
// error:function(e){
//   console.log("e")
//   alert("sorry, there are no results for your search")
// }
// })
// //
// // AFRAME.registerComponent('foo',
// //   schema: {},
// //   init: function () {
// //     var camera = this.camera = new THREE.PerspectiveCamera();
// //     this.el.setObject3D('camera', camera);
// //   },
// //   update: function () {
// //     this.el.object3D.visible = this.data;
// // }
// //   },
// //   tick: function () {},
// //   remove: function () {
// //       // this.el.removeObject3D('light');
// //   },
// //   pause: function () {},
// //   play: function () {}
// // });
// function myFunction() {
//     setTimeout(function(){ alert("Hello"); }, 3000);
// }
//     var box = document.getElementById('steve');
//     box.addEventListener( 'mouseenter', function ( )
//     {
//         box.setAttribute( 'scale',
//         {
//             x: 5,
//             y: 2,
//             z: 7
//         } );
//     } );
//     // init: function () {
//     //   var camera = this.camera = new THREE.PerspectiveCamera();
//     //   this.el.setObject3D('camera', camera);
//     // }s
// // var thumbUp = document.getElementsByClassName("fa-thumbs-up");
// // var trash = document.getElementsByClassName("fa-trash");
// // var thumbDown= document.getElementsByClassName("fa-thumbs-down");
// //
// // Array.from(thumbUp).forEach(function(element) {
// //       element.addEventListener('click', function(){
// //         const name = this.parentNode.parentNode.childNodes[1].innerText
// //         const msg = this.parentNode.parentNode.childNodes[3].innerText
// //         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
// //         fetch('studentlist', {//fetch is the newest way to send an ajax request.
// //           method: 'put',
// //           headers: {'Content-Type': 'application/json'},
// //           body: JSON.stringify({
// //             'name': name,
// //             'msg': msg,
// //             'thumbUp':thumbUp
// //           })
// //         })
// //         .then(response => {
// //           if (response.ok) return response.json()
// //         })
// //         .then(data => {
// //           console.log(data)
// //           window.location.reload(true)
// //         })
// //       });
// // });
// // //       element.addEventListener('click', function(){
// // //         const name = this.parentNode.parentNode.childNodes[1].innerText
// // //         const msg = this.parentNode.parentNode.childNodes[3].innerText
// // //         const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
// // //         console.log("boo!")
// // //         fetch('messages2', {//fetch is the newest way to send an ajax request.
// // //           method: 'put',
// // //           headers: {'Content-Type': 'application/json'},
// // //           body: JSON.stringify({
// // //             'name': name,
// // //             'msg': msg,
// // //             'thumbUp':thumbDown
// // //           })
// // //         })
// // //         .then(response => {
// // //           if (response.ok) return response.json()
// // //         })
// // //         .then(data => {
// // //           console.log(data)
// // //           window.location.reload(true)
// // //         })
// // //       });
// // // });
// // // Array.from(thumbDown).forEach(function(element) {
// // //       element.addEventListener('click', function(){
// // //         const name = this.parentNode.parentNode.childNodes[1].innerText
// // //         const msg = this.parentNode.parentNode.childNodes[3].innerText
// // //         const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
// // //         console.log("boo!")
// // //         fetch('messages2', {//fetch is the newest way to send an ajax request.
// // //           method: 'put',
// // //           headers: {'Content-Type': 'application/json'},
// // //           body: JSON.stringify({
// // //             'name': name,
// // //             'msg': msg,
// // //             'thumbUp':thumbDown
// // //           })
// // //         })
// // //         .then(response => {
// // //           if (response.ok) return response.json()
// // //         })
// // //         .then(data => {
// // //           console.log(data)
// // //           window.location.reload(true)
// // //         })
// // //       });
// // // });
// //
// // Array.from(trash).forEach(function(element) {
// //       element.addEventListener('click', function(){
// //         const name = this.parentNode.parentNode.childNodes[1].innerText
// //         const msg = this.parentNode.parentNode.childNodes[3].innerText
// //         fetch('studentlist', {
// //           method: 'delete',
// //           headers: {
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify({
// //             'name': name,
// //             'msg': msg
// //           })
// //         }).then(function (response) {
// //           window.location.reload()
// //         })
// //       });
// // });
