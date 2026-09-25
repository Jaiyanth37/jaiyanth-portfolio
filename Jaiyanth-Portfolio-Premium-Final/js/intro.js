document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const scene = document.querySelector(".card-scene");
  const card = document.querySelector(".playing-card");
  const portal = document.querySelector(".intro-portal");
  const skip = document.getElementById("skipIntro");
  const site = document.getElementById("site");

  if (!intro || !scene || !card || !portal) {
    if (site) site.style.opacity = "1";
    if (window.startPortfolioAnimations) window.startPortfolioAnimations();
    return;
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    if (window.gsap) {
      gsap.set(intro,{pointerEvents:"none"});
      gsap.to(intro,{opacity:0,duration:.65,ease:"power2.inOut",onComplete:()=>{
        intro.remove();
        if (site) site.style.opacity = "1";
        if (window.startPortfolioAnimations) window.startPortfolioAnimations();
      }});
    } else {
      intro.remove();
      if (site) site.style.opacity = "1";
      if (window.startPortfolioAnimations) window.startPortfolioAnimations();
    }
  };

  if (skip) skip.addEventListener("click", finish);

  if (reduced || !window.gsap) {
    intro.style.display="none";
    if(site) site.style.opacity="1";
    if(window.startPortfolioAnimations) window.startPortfolioAnimations();
    return;
  }

  // The scene is anchored at 50%/50% in CSS. GSAP only changes x/y offsets,
  // so the card always lands precisely in the viewport centre.
  gsap.set(scene,{xPercent:-50,yPercent:-50,x:window.innerWidth*.43,y:-window.innerHeight*.43,rotation:24,scale:.42,opacity:0});
  gsap.set(card,{rotationY:0});
  gsap.set(portal,{opacity:0,scale:.05});

  const tl=gsap.timeline({defaults:{ease:"power3.inOut"}});
  tl.to(scene,{opacity:1,duration:.35,ease:"power2.out"})
    .to(scene,{x:0,y:0,rotation:0,scale:1,duration:1.55,ease:"expo.out"})
    .to(card,{rotationY:360,duration:1.55,ease:"power2.inOut"},">-.15")
    .to(portal,{opacity:1,scale:1,duration:.85,ease:"expo.out"},"<.35")
    .to(card,{scale:.72,duration:.35,ease:"power2.in"},"<.45")
    .to(card,{scale:.05,opacity:0,duration:.75,ease:"power4.in"},"<.05")
    .to(portal,{scale:6,opacity:0,duration:1.05,ease:"expo.in",onComplete:finish},"<.05");

  window.addEventListener("resize",()=>{ if(!finished) tl.invalidate(); },{passive:true});
});
