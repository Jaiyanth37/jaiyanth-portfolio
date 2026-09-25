window.startPortfolioAnimations = function(){
  if (!window.gsap) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const site = document.getElementById("site");
  if (site) gsap.to(site,{opacity:1,duration:.8,ease:"power2.out"});

  if (reduced) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
    return;
  }

  if (window.ScrollTrigger) {
    document.querySelectorAll(".reveal").forEach((el) => {
      gsap.fromTo(el,
        {autoAlpha:0,y:35},
        {autoAlpha:1,y:0,duration:1,ease:"power3.out",
          scrollTrigger:{trigger:el,start:"top 86%",once:true}}
      );
    });
  } else {
    document.querySelectorAll(".reveal").forEach(el=>el.classList.add("is-visible"));
  }

  const card = document.querySelector(".hero-card");
  const hero = document.querySelector(".hero");
  if (card && hero) {
    hero.addEventListener("mousemove", e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-.5;
      const y = (e.clientY-r.top)/r.height-.5;
      gsap.to(card,{rotateY:x*10,rotateX:y*-8,rotateZ:-5+x*2,duration:.7,ease:"power3.out"});
    });
    hero.addEventListener("mouseleave",()=>gsap.to(card,{rotateY:0,rotateX:0,rotateZ:-5,duration:.8,ease:"power3.out"}));
  }

  document.querySelectorAll(".magnetic").forEach(el=>{
    el.addEventListener("mousemove",e=>{
      const r=el.getBoundingClientRect();
      const x=e.clientX-(r.left+r.width/2), y=e.clientY-(r.top+r.height/2);
      gsap.to(el,{x:x*.12,y:y*.12,duration:.35,ease:"power3.out"});
    });
    el.addEventListener("mouseleave",()=>gsap.to(el,{x:0,y:0,duration:.5,ease:"elastic.out(1,.5)"}));
  });

  const dot=document.querySelector(".cursor-dot"), ring=document.querySelector(".cursor-ring");
  if(dot&&ring&&window.matchMedia("(pointer:fine)").matches){
    gsap.set([dot,ring],{opacity:1});
    window.addEventListener("mousemove",e=>{
      gsap.to(dot,{x:e.clientX,y:e.clientY,duration:.08});
      gsap.to(ring,{x:e.clientX,y:e.clientY,duration:.28,ease:"power3.out"});
    });
    document.querySelectorAll("a,button,.skill-card,.project-card").forEach(el=>{
      el.addEventListener("mouseenter",()=>document.body.classList.add("cursor-active"));
      el.addEventListener("mouseleave",()=>document.body.classList.remove("cursor-active"));
    });
  }

  document.querySelectorAll(".project-card").forEach(card=>{
    card.addEventListener("mousemove",e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      gsap.to(card,{rotateY:x*2.2,rotateX:y*-2.2,transformPerspective:900,duration:.4});
    });
    card.addEventListener("mouseleave",()=>gsap.to(card,{rotateY:0,rotateX:0,duration:.6}));
  });
};