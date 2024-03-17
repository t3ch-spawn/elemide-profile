<script>
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/all";

  let hasPopped = false;
  gsap.registerPlugin(ScrollTrigger);

  function closePopup() {
    gsap.timeline().to(".cookies", {
      y: 100,
      opacity: 0,
      pointerEvents: "none",
    });
  }
</script>

<div
  class="cookies fixed w-[100%] scale-y-[0.01] origin-bottom bg-test3 text-center bottom-[100px] opacity-0 text-sm z-[40] text-black left-[50%] translate-x-[-50%] max-w-[320px] p-4 rounded-lg font-grotesk flex flex-col gap-4 items-center"
>
  <p>
    "Welcome to Elemide's Campaign Hub!🏠 Ready to support Elemide for House
    Secretary? By accepting cookies, you're backing our mission. Click 'Accept'
    to join the movement! 🍪
  </p>

  <button
    on:click={closePopup}
    class="bg-black text-test3 text-xs p-2 px-3 w-fit rounded-lg"
    >Accept cookies</button
  >
</div>
