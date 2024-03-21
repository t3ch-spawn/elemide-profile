<script>
  import gsap from "gsap";
  import SplitType from "split-type";
  import { onMount } from "svelte";
  // @ts-ignore
  import { Link } from "svelte-routing";
  import meet from "../assets/meet-pic.jpg";
  import caligraphy from "../assets/caligraphy.jpg";
  import { ScrollTrigger } from "gsap/all";
  import Lenis from "@studio-freight/lenis";
  import { Rive } from "@rive-app/canvas";
  import Cookies from "./Cookies.svelte";
  let element;
  let user;
  let inp;
  let nameCont;
  let aboutPara;
  let done = false;
  let hasLoaded = false;
  let hasImgAnimated = false;

  function animDone() {
    done = true;
  }

  function loaded() {
    hasLoaded = true;
  }
  onMount(() => {
    // Rive code

    const r = new Rive({
      src: "../e-anim.riv",
      // @ts-ignore
      canvas: document.getElementById("canvas"),
      autoplay: true,
      stateMachines: "E-anim",
    });

    // Lenis code
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);

    // gsap.fromTo(
    //   ".load-dots",
    //   { y: -30, opacity: 0, duration: 2 },
    //   { y: -5, stagger: 0.4, repeat: -1, ease: "bounce", opacity: 1 }
    // );

    window.addEventListener("load", () => {
      setTimeout(() => {
        gsap
          .timeline()
          .to("#canvas", {
            opacity: 0,
          })
          .to(
            ".loader",
            {
              height: 0,
              duration: 1.2,
              ease: "power4.inOut",
              onStart: loaded,
              onComplete: animateIn,
            },
            -0.2
          );
      }, 1800);

      function animateIn() {
        gsap
          .timeline()
          .fromTo(
            ".caligraphy",
            {
              x: 200,
              opacity: 0,
            },
            { opacity: 1, x: 0, duration: 0.8, ease: "power4.inOut" }
          )
          .fromTo(
            nameCont,
            {
              y: 150,
              opacity: 0,
              duration: 0.4,
            },
            { opacity: 1, y: 0 }
          );
      }
    });
  });

  function animate() {
    user = inp.value.trim();

    let allAboutPara = new SplitType(aboutPara, { types: "chars,words" });

    if (user == "") {
      alert("please enter your name");

      return;
    }

    let myParas = new SplitType(".elems", { types: "chars" });

    gsap
      .timeline()
      .to(".caligraphy", {
        x: 200,
        opacity: 0,
        duration: 0.6,
      })
      .to(nameCont, {
        y: -100,
        opacity: 0,
        display: "none",
        onComplete: () => {
          animDone();
        },
      })
      .from(".user", {
        y: -100,
        opacity: 0,
        duration: 0.4,
        ease: "ease-in",
      })
      .fromTo(
        element.querySelectorAll(".char"),
        {
          y: 100,
          opacity: 0,
        },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "ease-in" }
      )
      .fromTo(
        ".image",
        { opacity: 0, scaleY: 0 },
        {
          opacity: 1,
          scaleY: 1,

          duration: 0.8,
          transformOrigin: "bottom center",
          onComplete: () => {
            hasImgAnimated = true;
            ScrollTrigger.create({
              trigger: aboutPara,
              start: "top 80%",
              end: "bottom 80%",
              scrub: 1,
              animation: gsap.from(aboutPara.querySelectorAll(".word"), {
                opacity: 0,
                stagger: 0.8,
              }),
            });

            ScrollTrigger.create({
              trigger: ".elem-pic",
              start: "40% 40%",
              animation: gsap
                .timeline()
                .fromTo(
                  ".cookies",
                  {
                    y: 200,
                    opacity: 0,
                  },
                  { y: 0, opacity: 1, ease: "power1.out", duration: 0.5 }
                )
                .to(".cookies", {
                  scaleY: 1,

                  duration: 0.5,
                  ease: "power1.out",
                }),
            });
          },
        }
      );
  }

  // Date countdown

  // const minutes = secsLeft / 60
  // const hours = minutes / 60
  // const days = hours / 24

  let days, hours, mins, secs;

  setInterval(() => {
    const agendaDate = new Date(2024, 0, 18);
    const currentDate = new Date();
    // @ts-ignore
    const timeMilli = agendaDate - currentDate;

    const secsLeft = Math.round(timeMilli / 1000);
    const daysInSecs = secsLeft / 86400;

    hours = Math.floor((secsLeft / 3600) % 24);
    days = Math.floor(daysInSecs);
    mins = Math.floor((secsLeft / 60) % 60);
    secs = Math.round(secsLeft % 60);

    if (secs == 0) {
      secs = 60;
    }
    // const hoursInSecs = (daysInSecs - days) * 24
    // const minsInsecs = hoursInSecs * 60 * 24
    //  mins = Math.round(minsInsecs)
    //  secs = Math.round((minsInsecs - mins ) * 60) + 29
  }, 1000);
</script>

<main
  class="bg-bgBlack relative text-test3 flex flex-col items-center justify-center min-h-[100vh]"
>
  <!-- Container for preloader -->
  <div
    class={`text-black loader rounded-b-[120%] bg-loader text-3xl text-center flex fixed top-0 left-0 w-full h-[220%] justify-center items-start z-[4]`}
  >
    <!-- <div
      class={` ${
        hasLoaded ? "hidden" : "flex"
      } fixed top-[50%] translate-y-[50%]`}
    >
      <p>Loading</p>
      <p class="load-dots">.</p>
      <p class="load-dots">.</p>
      <p class="load-dots">.</p>
    </div> -->

    <canvas
      class={`pointer-events-none max-w-[500px] -500:max-w-[300px] translate-y-[20%]`}
      id="canvas"
      height="500"
      width="500"
    ></canvas>
  </div>

  <div class="overflow-hidden w-full top-0 left-0 fixed">
    <!-- caligraphy image -->
    <img src={caligraphy} class="caligraphy opacity-0 max-w-[180px]" alt="" />
  </div>

  <div
    bind:this={nameCont}
    class="flex flex-col items-center gap-8 opacity-0 font-grotesk"
  >
    <p class="text-3xl text-center">What's your name?</p>
    <input
      type="text"
      bind:this={inp}
      on:keydown={(e) => {
        if (e.key == "Enter") animate();
      }}
      class="input w-[100%] p-2 text-2xl border-2 border-test3 text-test3 bg-black focus:outline-none rounded-md"
    />

    <button
      on:click={animate}
      class="text-2xl border-test3 border-2 rounded-xl p-2"
    >
      Proceed
    </button>
  </div>

  <!-- SECOND PAGE? -->
  <div
    class={`${
      user && done ? "flex " : "hidden"
    } duration-300 flex-col gap-12 items-center`}
  >
    <Cookies />
    <p class="text-2xl user mt-[150px] font-grotesk">Hi {user},</p>

    <div class="overflow-hidden font-grotesk">
      <p bind:this={element} on:click={animate} class="elems text-4xl">
        MEETE LEMIDE
      </p>
    </div>

    <img
      src={meet}
      class="image elem-pic scale-y-0 max-w-[300px] border-white border-2"
      alt=""
    />

    <p
      class={`${
        hasImgAnimated ? "opacity-1" : "opacity-0"
      } paragraph about-para w-[90%] max-w-[800px] mx-auto text-center -900:text-left font-grotesk`}
      bind:this={aboutPara}
    >
      I am ELEMIDE, a second-year student of the department of Civil
      Engineering, Faculty of Technology, University of Ibadan. I hail from Ogun
      State, Odeda Local Government to be precise. During my free-time, I enjoy
      playing the piano, participating in sports, and eating good food.
      <br /><br />
      During my first year at “the first and best university”, I was honored to receive
      prestigious awards for my contributions to the UI community. As the recipient
      of the "Creative of the Year" in both my department and faculty, as well as
      "Freshman of the Year" in the department and Students' Union, I was recognized
      for my creative thinking and dedication to fostering a vibrant campus environment.
      Beyond my academic pursuits, I have been actively engaged in addressing the
      challenges faced by today's youth. As a member of "Youth Act," a platform dedicated
      to tackling youth issues, I have participated in seminars that shed light on
      prevalent issues and provided actionable steps for resolution. This experience
      has further deepened my understanding of the concerns and aspirations of my
      fellow students.
      <br /><br />
      My passion for leadership and active involvement in various committees, including
      those within the Students' Union, has earned me a reputation for exemplary
      leadership and followership skills. A testament to my commitment to student
      welfare and social engagement can be seen through my active involvement in
      various Students' Union committees. These include committees such as the UI
      SU Social Committee, UI SU Monitoring Committee, and UI SU Week Committees,
      where I have successfully organized and planned events with great people in
      our student community.
      <br /><br />
      In conclusion, my tenure at the University of Ibadan has been nothing short
      of transformative. As I stand on the cusp of vying for a political post, I
      carry with me the lessons learned and the experiences gained during my time
      at UI. My passion for leadership, coupled with my unwavering dedication to
      student welfare and social engagement, fuels my ambition to serve not just
      as a representative but as a catalyst for progress and empowerment.
      <br /><br />
      With boundless energy and a vision for a brighter future, I am ready to embark
      on this new chapter of my journey, fueled by the support and trust of fellow
      UITES. Together, let us dare to dream, to innovate, and to transform the University
      of Ibadan into the first and best university, that she truly is!
    </p>

    <!-- The countdown div -->
    <div
      class="border-test3 border-[1px] flex flex-col justify-center items-center p-4 gap-4 mb-10 font-grotesk"
    >
      <p class="text-test3 text-center">
        <!-- ELEMIDE has got UITES curious about “The ***** Agenda.” <br /> <br />
        What is “The ***** Agenda?” <br /> -->

        ELEMIDE has got UITES curious about “The House Agenda”, <br /> with the
        crux of the agenda being students’ welfare. <br /> <br /> Find out more
        about the movement,
        <a
          class="underline"
          href="https://chat.whatsapp.com/DkJQVjCnz1o4qrltsuSSaI">here</a
        >
        <!-- Find out in: <br /> -->
      </p>
      <!-- <div class="text-test3 flex gap-4">
        <p>{`${days}`.padStart(2, "0")} days</p>

        <p>{`${hours}`.padStart(2, "0")} hrs</p>

        {#if mins != 0}
          <p>{`${mins}`.padStart(2, "0")} mins</p>
        {/if}

        <p>{`${secs}`.padStart(2, "0")} secs</p>
      </div> -->
    </div>
  </div>
</main>

<style>
  .load-dots {
    margin-inline: 10px;
  }
</style>
