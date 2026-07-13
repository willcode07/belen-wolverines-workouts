/* Maps workout moves -> Muscle & Strength videos.
   Prefer a close form reference over "No video" when the movement family matches.
   Leave unavailable only when any M&S clip would teach the wrong drill. */
(function (global) {
  // Order matters: more specific keys before broad ones.
  const CATALOG = [
    // —— Mobility / stretch ——
    { keys: ["world", "wgs", "greatest stretch"], title: "World's Greatest Stretch", page: "https://www.muscleandstrength.com/exercises/worlds-greatest-stretch", youtube: "ypLwpRJoDzs" },
    { keys: ["hip flip", "90/90", "90-90", "piriformis"], title: "90/90 Piriformis Stretch", page: "https://www.muscleandstrength.com/exercises/90-90-piriformis-stretch", youtube: "BBbxUlCFwM4" },
    { keys: ["pigeon", "frog", "hip opener", "hip openers", "hip flexor", "hip flow", "hip mobility"], title: "Dynamic Pigeon", page: "https://www.muscleandstrength.com/exercises/dynamic-pigeon", youtube: "VnQ8nP2vawQ" },
    { keys: ["cars", "shoulder car", "arm circle", "arm orbit", "wrist car", "neck car"], title: "Arm Circles", page: "https://www.muscleandstrength.com/exercises/arm-circles", youtube: "6ls8aY83FL0" },
    { keys: ["wall slide", "wall slides", "scapular wall", "wall angel", "floor angel"], title: "Scapular Wall Slide", page: "https://www.muscleandstrength.com/exercises/scapular-wall-slide", youtube: "6Y3nRd9yd3M" },
    { keys: ["pull-apart", "pull apart", "dislocate"], title: "Band Pull Apart", page: "https://www.muscleandstrength.com/exercises/band-pull-apart", youtube: "nMB_zabRo74" },
    { keys: ["dead bug"], title: "Dead Bug", page: "https://www.muscleandstrength.com/exercises/dead-bug", youtube: "eEhoSeBFoBk" },
    { keys: ["bird dog"], title: "Contralateral Bird Dog", page: "https://www.muscleandstrength.com/exercises/contralateral-bird-dog", youtube: "DFdLL82SEiw" },
    { keys: ["hollow hold", "hollow rocks", "hollow body", "hollow"], title: "Hollow Body Hold", page: "https://www.muscleandstrength.com/exercises/hollow-body-hold", youtube: "lmkw48_CGm0" },
    { keys: ["russian twist"], title: "Russian Twist", page: "https://www.muscleandstrength.com/exercises/russian-twist.html", vimeo: "877885324" },

    // —— Strength / power ——
    { keys: ["turkish", "get-up", "get up"], title: "Turkish Get Up", page: "https://www.muscleandstrength.com/exercises/turkish-get-up", youtube: "kYxmLkgnfD8" },
    { keys: ["nordic"], title: "Nordic Hamstring Curl", page: "https://www.muscleandstrength.com/exercises/nordic-hamstring-curl-bodyweight", youtube: "rzK7glg8OnA" },
    { keys: ["kb swing", "kettlebell swing", "swing"], title: "Kettlebell Swing", page: "https://www.muscleandstrength.com/exercises/kettlebell-swing", youtube: "wMBWFIn4ddg" },
    { keys: ["pull-up", "pull up", "chin-up"], title: "Pull Up", page: "https://www.muscleandstrength.com/exercises/pull-up", youtube: "poyr8KenUfc" },
    { keys: ["hanging leg", "hanging knee", "hanging windshield", "hanging hip", "leg raise"], title: "Hanging Knee Raise", page: "https://www.muscleandstrength.com/exercises/hanging-knee-raise.html", vimeo: "1082967622" },
    { keys: ["lying leg"], title: "Hollow Body Hold", page: "https://www.muscleandstrength.com/exercises/hollow-body-hold", youtube: "lmkw48_CGm0" },
    { keys: ["depth jump", "box jump", "broad jump", "squat jump"], title: "Box Jump", page: "https://www.muscleandstrength.com/exercises/box-jump", youtube: "MX-NHcqEqQk" },
    { keys: ["y-press", "y press", "z-press", "z press", "shoulder press", "seated z", "db y"], title: "Seated Dumbbell Press", page: "https://www.muscleandstrength.com/exercises/seated-dumbbell-press.html", youtube: "FRxZ6wr5bpA" },
    { keys: ["front squat"], title: "Dumbbell Goblet Squat", page: "https://www.muscleandstrength.com/exercises/dumbbell-goblet-squat", youtube: "5Y3KW5rWMh4" },
    { keys: ["goblet"], title: "Dumbbell Goblet Squat", page: "https://www.muscleandstrength.com/exercises/dumbbell-goblet-squat", youtube: "5Y3KW5rWMh4" },
    { keys: ["air squat", "tempo air", "prisoner", "bodyweight squat", "deep squat", "squat pulse", "squat hold", "isometric squat"], title: "Prisoner Squat", page: "https://www.muscleandstrength.com/exercises/bodyweight-squat.html", youtube: "0PboqagHAjs" },
    { keys: ["wall sit"], title: "Swiss Ball Wall Squat", page: "https://www.muscleandstrength.com/exercises/swiss-ball-wall-squat.html", vimeo: "877880879" },
    { keys: ["bulgarian", "split squat"], title: "Dumbbell Split Squat", page: "https://www.muscleandstrength.com/exercises/dumbbell-split-squat", youtube: "EByFmf2LfY8" },
    { keys: ["step-up", "step up"], title: "Dumbbell Step Up", page: "https://www.muscleandstrength.com/exercises/dumbbell-step-up", youtube: "WCFCnxjcp4c" },
    { keys: ["scapular push", "scap push", "protraction", "push-up plus", "chaos push"], title: "Push Up Plus", page: "https://www.muscleandstrength.com/exercises/push-up-plus", youtube: "glTG6fHR520" },
    { keys: ["clap", "explosive push"], title: "Push Up", page: "https://www.muscleandstrength.com/exercises/push-up.html", youtube: "KEFQyLkDYtI" },
    { keys: ["push-up", "push up"], title: "Push Up", page: "https://www.muscleandstrength.com/exercises/push-up.html", youtube: "KEFQyLkDYtI" },
    { keys: ["floor press"], title: "Dumbbell Floor Press", page: "https://www.muscleandstrength.com/exercises/dumbbell-floor-press.html", youtube: "gaBOfLlIXjs" },
    { keys: ["prone y", "prone w", "prone t", "y-raise", "w-raise", "t-raise"], title: "Scapular Wall Slide", page: "https://www.muscleandstrength.com/exercises/scapular-wall-slide", youtube: "6Y3nRd9yd3M" },
    { keys: ["superman"], title: "Superman", page: "https://www.muscleandstrength.com/exercises/superman", youtube: "D07urmRplHQ" },
    { keys: ["row"], title: "One Arm Dumbbell Row", page: "https://www.muscleandstrength.com/exercises/one-arm-dumbbell-row.html", youtube: "YZgVEy6cmaY" },
    { keys: ["face pull"], title: "Cable Face Pull", page: "https://www.muscleandstrength.com/exercises/cable-face-pull", youtube: "7ZvpXA_mFpQ" },
    { keys: ["copenhagen", "adductor"], title: "Side Plank", page: "https://www.muscleandstrength.com/exercises/side-hover.html", vimeo: "877885425" },
    { keys: ["side plank"], title: "Side Plank", page: "https://www.muscleandstrength.com/exercises/side-hover.html", vimeo: "877885425" },
    { keys: ["plank"], title: "Plank", page: "https://www.muscleandstrength.com/exercises/hover.html", vimeo: "877881002" },
    { keys: ["single-leg rdl", "sl rdl", "single leg rdl", "single-leg kb rdl", "single-leg deadlift"], title: "Bodyweight Single Leg Deadlift", page: "https://www.muscleandstrength.com/exercises/bodyweight-single-leg-deadlift", youtube: "fZNiG7c7r8U" },
    { keys: ["rdl", "romanian"], title: "Romanian Deadlift (RDL)", page: "https://www.muscleandstrength.com/exercises/romanian-deadlift", youtube: "-m45n1_x32E" },
    { keys: ["good morning"], title: "Good Mornings", page: "https://www.muscleandstrength.com/exercises/good-mornings.html", youtube: "8sGgyquE1Bs" },
    { keys: ["reverse lunge", "rear lunge", "rear-bodyweight", "rear-foot"], title: "Bodyweight Reverse Lunge", page: "https://www.muscleandstrength.com/exercises/rear-bodyweight-lunge.html", youtube: "hufyk-2xQ5g" },
    { keys: ["overhead walking", "walking lunge"], title: "Dumbbell Walking Lunge", page: "https://www.muscleandstrength.com/exercises/dumbbell-walking-lunge.html", youtube: "uRSsOoZG9z8" },
    { keys: ["lunge jump", "alternating lunge"], title: "Bodyweight Lunge", page: "https://www.muscleandstrength.com/exercises/bodyweight-lunge.html", youtube: "4hqtPrp-E8A" },
    { keys: ["lateral lunge", "side lunge", "cossack", "lateral bound", "skater"], title: "Bodyweight Lateral Lunge", page: "https://www.muscleandstrength.com/exercises/bodyweight-side-lunge.html", vimeo: "877885800" },
    { keys: ["lunge"], title: "Bodyweight Lunge", page: "https://www.muscleandstrength.com/exercises/bodyweight-lunge.html", youtube: "4hqtPrp-E8A" },
    { keys: ["bridge march", "marching"], title: "Marching Glute Bridge", page: "https://www.muscleandstrength.com/exercises/marching-glute-bridge", youtube: "Nsv_kxImi1Q" },
    { keys: ["single-leg bridge", "single-leg glute", "single leg glute", "single leg bridge"], title: "Single Leg Glute Bridge", page: "https://www.muscleandstrength.com/exercises/single-leg-glute-bridge", youtube: "XFPV1B7vH-I" },
    { keys: ["glute bridge", "bridge", "thrust"], title: "Bodyweight Glute Bridge", page: "https://www.muscleandstrength.com/exercises/bodyweight-glute-bridge", youtube: "mm4wbmtDrUc" },
    { keys: ["snatch"], title: "Kettlebell Swing", page: "https://www.muscleandstrength.com/exercises/kettlebell-swing", youtube: "wMBWFIn4ddg" },
    { keys: ["orbit", "halo", "overs", "semicircle", "kb circuit", "kb core", "kb overs"], title: "Kettlebell Halo", page: "https://www.muscleandstrength.com/exercises/kettlebell-halo", youtube: "g401Bbk5uFo" },
    { keys: ["external rotation", "band er", "cable er", "prone er", " er "], title: "Cable External Rotation", page: "https://www.muscleandstrength.com/exercises/cable-external-rotation", youtube: "i47zHCiGTxE" },
    { keys: ["pallof", "chop", "stick complex"], title: "Pallof Press", page: "https://www.muscleandstrength.com/exercises/pallof-press", youtube: "SFJprbDnaS0" },
    { keys: ["suitcase", "farmer", "carry"], title: "Dumbbell Farmers Carry", page: "https://www.muscleandstrength.com/exercises/farmers-walk", youtube: "j8c9uNjr7nQ" },
    { keys: ["mountain climber", "climber"], title: "Rotating Mountain Climber", page: "https://www.muscleandstrength.com/exercises/rotating-mountain-climber", youtube: "5ZL0gFRjCTw" },
  ];

  // Only block when a link would teach a clearly different exercise
  const NO_VIDEO = [
    /dead hang/i,
    /active hang/i,
    /closing hang/i,
    /scapular pull-up/i, // hang shrugs — not a full pull-up
    /hanging scapular/i,
    /hip car/i,
    /bear crawl/i,
    /crab walk/i,
    /standing march/i,
    /cat-?cow/i,
    /open book/i,
    /thread/i,
    /sleeper/i,
    /capsule/i,
    /calf/i,
    /leg swing/i,
    /\bpec\b/i,
    /\blat\b/i,
    /sprawl/i,
    /sprint/i,
    /shuffle/i,
    /acceleration/i,
    /high knee/i,
    /\bfield\b/i,
    /emom/i,
    /burpee/i,
    /finisher/i,
    /pike push/i,
    /half get-up/i,
  ];

  function lookup(name) {
    const n = String(name).toLowerCase();

    // Dead hang / active hang bookends — never map to pull-ups
    if (/(dead hang|active hang|closing hang)/.test(n)) return empty(name);
    if (/\bhang\b/.test(n) && !/hanging (leg|knee|windshield|hip)/.test(n) && !/pull/.test(n)) {
      return empty(name);
    }
    // Hip CARs ≠ arm circles
    if (/hip car/.test(n)) return empty(name);

    if (/\ber\b/.test(n) && /band|cable|prone|lift|ladder|0°|90°/.test(n)) {
      const er = CATALOG.find((e) => e.keys.includes("band er"));
      if (er) return er;
    }

    for (let i = 0; i < CATALOG.length; i++) {
      if (CATALOG[i].keys.some((k) => n.includes(k))) {
        const entry = CATALOG[i];
        if (!entry.youtube && !entry.vimeo) continue;
        return entry;
      }
    }

    for (let i = 0; i < NO_VIDEO.length; i++) {
      if (NO_VIDEO[i].test(name)) return empty(name);
    }

    return empty(name);
  }

  function empty(name) {
    return {
      title: String(name),
      page: "",
      youtube: "",
      vimeo: "",
      unavailable: true,
    };
  }

  function hasVideo(entry) {
    return !!(entry && (entry.youtube || entry.vimeo) && !entry.unavailable);
  }

  function embedHtml(entry) {
    if (entry.youtube) {
      return (
        '<div class="vid-embed"><iframe src="https://www.youtube.com/embed/' +
        entry.youtube +
        '?rel=0" title="' +
        entry.title.replace(/"/g, "") +
        '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>'
      );
    }
    if (entry.vimeo) {
      return (
        '<div class="vid-embed"><iframe src="https://player.vimeo.com/video/' +
        entry.vimeo +
        '" title="' +
        entry.title.replace(/"/g, "") +
        '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>'
      );
    }
    return '<p class="modal-note">No video available</p>';
  }

  global.ExerciseVideos = {
    lookup,
    hasVideo,
    embedHtml,
  };
})(window);
