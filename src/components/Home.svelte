<script>

    import gsap from "gsap";
    import SplitType from "split-type";
    import { onMount } from "svelte"
    import { Link } from "svelte-routing";
    import meet from "../assets/meet-pic.jpg"
    import caligraphy from "../assets/caligraphy.jpg"
    import barba from 'barba.js'
      let element
      let user 
      let inp
      let nameCont
      let aboutPara
      let done = false
      let hasLoaded = false 

      function animDone(){
      done = true

    }

    function loaded(){

      hasLoaded = true
    }
    onMount(()=>{

      gsap.fromTo('.load-dots',{y: -30, opacity: 0, duration: 2}, { y: -5, stagger: 0.4, repeat: -1, ease: 'bounce', opacity: 1})

      window.addEventListener('load', ()=>{
        setTimeout(() => {
          gsap.to('.loader', {
          height: 0,
          duration : 1.2,
          ease: 'power4.inOut',

          onStart: loaded,
          onComplete: animateIn
        })
        }, 1500);

        function animateIn(){
          gsap.timeline().fromTo(".caligraphy", {
        x: 200,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.out', 
      }, {opacity: 1, x: 0}).fromTo(nameCont, {

          y: 150,
          opacity: 0,
          duration: 0.4,
    }, {opacity: 1, y: 0})
  }
})


    
    // const init = () => {
    //   // Your initialization code, if any
    // };


    
    // const fadeInTransition = {
    //   async leave(data) {
    //     await gsap.to(data.current.container, {opacity: 0, duration: 3 })
    //   },
    
    //   async enter(data) {
    //     await gsap.from(data.current.container, {opacity: 0, duration: 3, y: 100 })
    
    //   },
    // };
    
    // barba.init({
    //   transitions: [fadeInTransition],
    //   sync: true,
    // });
    
    })
    
    function animate(){
      user = inp.value.trim()
    
      if(user == ''){
        alert("please enter your name")
    
        return
      }
    
      let myParas = new SplitType(".elems", { types: "chars" });
      gsap.timeline().to('.caligraphy', {
          x: 200,
          opacity: 0,
          duration: 0.6
      }).to(nameCont, {
        y: -100,
        opacity: 0,
        display: 'none', 
        onComplete: animDone,
      })     
      .from('.user', {
          y: -100,
          opacity: 0,
          duration: 0.4,
          ease: 'ease-in',
        }).fromTo(
          element.querySelectorAll(".char"),
          {
            y: 100,
            opacity: 0,
          },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "ease-in" }
        ).fromTo('.image', { opacity: 0, scaleY: 0}, { opacity: 1, scaleY: 1, duration: 1.1, transformOrigin: "bottom center", ease: "circ.inOut" }).fromTo(".paragraph", {opacity: 0, y: 100}, {opacity: 1, y: 0, duration: 0.6})
    
    }


    // Date countdown



    // const minutes = secsLeft / 60
    // const hours = minutes / 60
    // const days = hours / 24

let days, hours, mins, secs

    setInterval(() => {

      const agendaDate = new Date(2024, 0, 12)
    const currentDate = new Date()
    const timeMilli = agendaDate - currentDate

    const secsLeft = Math.round(timeMilli/1000)
    const daysInSecs = secsLeft / 86400

    hours = Math.floor((secsLeft / 3600) % 24)
    days = Math.floor(daysInSecs)
    mins = Math.floor((secsLeft / 60 )% 60 )
    secs = Math.round(secsLeft % 60)
    

    if(secs == 0){
      secs = 60
    }
    // const hoursInSecs = (daysInSecs - days) * 24
    // const minsInsecs = hoursInSecs * 60 * 24
    //  mins = Math.round(minsInsecs)
    //  secs = Math.round((minsInsecs - mins ) * 60) + 29

    
      
    }, 1000);

    </script>
    
    <main class="bg-bgBlack relative text-test3 flex flex-col items-center justify-center min-h-[100vh]">

      <!-- Container for preloader -->
      <div class={`text-black loader rounded-b-[120%] bg-loader text-3xl text-center flex fixed top-0 left-0 w-full h-[220%] justify-center items-center z-[4]`}>
       <div class= {` ${ hasLoaded ? 'hidden' : 'flex'} fixed top-[50%] translate-y-[50%]`}>
      
          <p>Loading</p>
          <p class="load-dots">.</p>
          <p class="load-dots">.</p>
          <p class="load-dots">.</p>

      </div>
      </div>
    
    <div class="overflow-hidden w-full top-0 left-0 fixed">
        <!-- caligraphy image -->
        <img src={caligraphy} class="caligraphy opacity-0 max-w-[180px]"  alt="">
    </div>
    
      <div bind:this={nameCont} class="flex flex-col items-center gap-8 opacity-0">
        <p class="text-3xl text-center">What's your name?</p>
        <input
          type="text"
          bind:this={inp}
          class="input w-[100%] p-2 text-2xl border-2 border-test3 text-test3 bg-black focus:outline-none rounded-md"
        />
    
        <button
          on:click={animate}
          class="text-2xl border-test3 border-2 rounded-xl p-2 "
        >
          Proceed
        </button>

        
      </div>
    
    
    
    <div class={`${ user && done ? 'flex' : 'hidden'} duration-300 flex-col gap-12 items-center`}>
      <p class="text-2xl user mt-[150px]">Hi {user}, </p>
    
    
      <div class="overflow-hidden">
      <p bind:this={element} on:click={animate} class="elems text-5xl">MEETE LEMIDE</p>
      </div>

      <img src={meet} class="image scale-y-0 max-w-[300px] border-white border-2" alt="">


      <div class="overflow-hidden flex">
        <p class="paragraph w-[90%] max-w-[800px] mx-auto text-center flex" bind:this={aboutPara}>ELEMIDE; a 200 level Civil Engineering student, is widely known among UITES for his social nature. He has shown exemplary leadership and followership skills, actively heading and participating in various committees, including committees in the Students' Union.
          With a strong interest in politics, ELEMIDE has made his mark in the political space on campus. <br> Outside of his academic pursuits, he enjoys playing the piano, engaging in occasional sports, and eating good food.
          Importantly, ELEMIDE is your guy!
          </p>
      </div>

      <!-- The countdown div -->
      <div class="border-test3 border-[1px] flex flex-col justify-center items-center p-4 gap-4 mb-10">
        <p class="text-test3 text-center">ELEMIDE has got UITES curious about “The ***** Agenda.” <br> <br>
          What is “The ***** Agenda?” <br>
          Find out in: <br>
       </p>
        <div class="text-test3 flex gap-4">
          <p>{`${days}`.padStart(2, '0')} days</p>
  
       
          <p>{`${hours}`.padStart(2, '0')}  hrs</p>
         
  
          {#if mins != 0}
          <p>{`${mins}`.padStart(2, '0')}  mins</p>
          {/if}
  
          <p>{`${secs}`.padStart(2, '0')} secs</p>
  
        </div>
      </div>

    </div>

    
    </main>
    
    <style>

      .load-dots{
        margin-inline: 10px;
      }
    
    </style>
    