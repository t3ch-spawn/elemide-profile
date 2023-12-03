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
      let done = false
      let hasLoaded = false

      function animDone(){
      done = true
    }

    function loaded(){

      hasLoaded = true
    }
    onMount(()=>{

      window.addEventListener('load', ()=>{
        setTimeout(() => {
          gsap.to('.loader', {
          height: 0,
          duration : 1,
          ease: 'power4.inOut',

          onStart: loaded,
          onComplete: animateIn
        })
        }, 1000);

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
      }).to(nameCont, {
    
        y: -100,
        opacity: 0,
        display: 'none', 
        onComplete: animDone,
      }).from(".caligraphy", {
        x: 200,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.out', 
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
        ).fromTo('.image', { opacity: 0, scaleY: 0}, { opacity: 1, scaleY: 1, duration: 1.5, transformOrigin: "bottom center", ease: "circ.inOut" }).fromTo('.paragraph', {opacity: 0, y: 100}, {opacity: 1, y: 0, duration: 0.6})
    
    }
    </script>
    
    <main class="bg-bgBlack relative text-test3 flex flex-col items-center justify-center min-h-[100vh]">

      <!-- Container for preloader -->
      <div class={`text-black loader bg-loader text-3xl text-center flex fixed top-0 left-0 w-full h-full justify-center items-center z-[4]`}>
       <p class= {` ${ hasLoaded ? 'hidden' : 'flex'}`}>Loading...</p>
      </div>
    
      <!-- caligraphy image -->
      <img src={caligraphy} class="caligraphy opacity-0 top-0 max-w-[180px] left-0 fixed" alt="">
    
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
          Procced
        </button>
      </div>
    
    
    
    <div class={`${ user && done ? 'opacity-1 h-full' : 'opacity-0 h-0'} duration-300 flex flex-col gap-8 items-center`}>
      <p class="text-2xl user mt-[100px]">Hi {user}, </p>
    
    
      <div class="overflow-hidden">
      <p bind:this={element} on:click={animate} class="elems text-5xl">MEET ELEMIDE</p>
      </div>

      <img src={meet} class="image scale-y-0 max-w-[300px] border-white border-2" alt="">


      <div class="overflow-hidden flex">
        <p class="paragraph w-[90%] max-w-[800px] mx-auto text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro a ratione, qui non doloremque accusamus molestiae. Odio amet, id ratione commodi necessitatibus quam libero nemo sapiente, distinctio atque omnis? Exercitationem.
          Atque temporibus, maiores autem obcaecati, odit repellat, in illo eos nihil omnis quisquam sit laborum dolores cupiditate nam tempore asperiores reprehenderit earum similique inventore nostrum? Distinctio, est. Dolores, nam quaerat.
          Sed nulla dolorem illum consectetur sapiente amet. Alias nobis quam, ipsa quia dolorum sit ab expedita, neque sapiente minus porro
          </p>
      </div>
    
    </div>

    <!-- <Link to = '/about'>About</Link>     -->
    
    </main>
    
    <style>
    
    </style>
    