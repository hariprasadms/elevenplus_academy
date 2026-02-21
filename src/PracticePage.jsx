import { useState, useEffect, useRef, useCallback } from "react";
import { useApp } from "./AppContext";
import { Header, Footer, Confetti } from "./SharedComponents";

/* ═══════════════════════════════════════════════════════════
   QUESTION BANKS
═══════════════════════════════════════════════════════════ */
const BANK_A = [
  {cat:"Mathematics",text:"A train travels 240 km in 3 hours. What is its average speed?",opts:["60 km/h","80 km/h","90 km/h","75 km/h"],ans:1,exp:"Speed = Distance ÷ Time = 240 ÷ 3 = 80 km/h."},
  {cat:"Mathematics",text:"What is 15% of 320?",opts:["42","48","52","56"],ans:1,exp:"10% of 320 = 32; 5% = 16; 32+16 = 48."},
  {cat:"Mathematics",text:"What is the next number: 3, 6, 12, 24, ___?",opts:["36","42","48","30"],ans:2,exp:"Each number is multiplied by 2. 24 × 2 = 48."},
  {cat:"Mathematics",text:"A rectangle is 12 cm long and 7 cm wide. What is its area?",opts:["38 cm²","76 cm²","84 cm²","96 cm²"],ans:2,exp:"Area = 12 × 7 = 84 cm²."},
  {cat:"Mathematics",text:"What is the value of 7 squared?",opts:["42","47","49","56"],ans:2,exp:"7² = 7 × 7 = 49."},
  {cat:"Mathematics",text:"What is the missing square number? 4, 9, 16, 25, ___",opts:["30","34","36","40"],ans:2,exp:"2²=4, 3²=9, 4²=16, 5²=25, 6²=36."},
  {cat:"Mathematics",text:"A shop sells apples for 35p each. How much do 8 apples cost?",opts:["£2.40","£2.80","£3.00","£2.60"],ans:1,exp:"8 × 35p = 280p = £2.80."},
  {cat:"Mathematics",text:"What is ¾ of 96?",opts:["68","72","76","80"],ans:1,exp:"96 ÷ 4 = 24; 24 × 3 = 72."},
  {cat:"Mathematics",text:"Two angles in a triangle are 65° and 75°. What is the third angle?",opts:["30°","40°","50°","45°"],ans:1,exp:"180° − 65° − 75° = 40°."},
  {cat:"Mathematics",text:"What is 3/5 of 60?",opts:["30","36","40","12"],ans:1,exp:"60 ÷ 5 = 12; 12 × 3 = 36."},
  {cat:"English",text:"Choose the word most similar in meaning to BENEVOLENT.",opts:["Cruel","Generous","Timid","Arrogant"],ans:1,exp:"Benevolent means well-meaning and kindly — closest to Generous."},
  {cat:"English",text:"Which sentence is correctly punctuated?",opts:["Its a lovely day, isnt it.","It's a lovely day, isn't it?","Its a lovely day isn't it?","It's a lovely day isn't it."],ans:1,exp:"It's and isn't both need apostrophes; sentence ends with a question mark."},
  {cat:"English",text:"Which word is the antonym (opposite) of ANCIENT?",opts:["Old","Historic","Modern","Worn"],ans:2,exp:"Ancient means very old; its opposite is Modern."},
  {cat:"English",text:"Which sentence is in the passive voice?",opts:["The dog chased the cat.","The cat was chased by the dog.","The cat ran quickly.","A dog barked."],ans:1,exp:"Passive voice: the subject receives the action. 'The cat was chased by the dog.'"},
  {cat:"English",text:"Choose the word closest in meaning to DILIGENT.",opts:["Lazy","Hardworking","Careless","Noisy"],ans:1,exp:"Diligent means showing careful, persistent effort — hardworking."},
  {cat:"English",text:"Which sentence uses a simile correctly?",opts:["The moon is a lantern in the sky.","She ran like the wind across the field.","The stars are dancing overhead.","He was a lion in battle."],ans:1,exp:"A simile uses 'like' or 'as'. 'Like the wind' is a simile; the others are metaphors."},
  {cat:"English",text:"What does the word MELANCHOLY mean?",opts:["Happy","Confused","Angry","Sad"],ans:3,exp:"Melancholy means deep, long-lasting sadness or gloom."},
  {cat:"English",text:"Identify the adverb in: 'She spoke quietly in the library.'",opts:["She","spoke","quietly","library"],ans:2,exp:"An adverb modifies a verb — 'quietly' describes how she spoke."},
  {cat:"English",text:"Which word means to make something less severe?",opts:["Aggravate","Mitigate","Amplify","Provoke"],ans:1,exp:"Mitigate means to lessen the severity of something."},
  {cat:"English",text:"Choose the sentence with a correctly used semicolon.",opts:["I love reading; books are great.","I love; reading books.","I; love reading books.","I love reading books;"],ans:0,exp:"A semicolon links two related independent clauses."},
  {cat:"Verbal",text:"If CAT becomes FDW (each letter +3), what does DOG become?",opts:["GRJ","GRK","GPJ","GQJ"],ans:0,exp:"D+3=G, O+3=R, G+3=J → GRJ."},
  {cat:"Verbal",text:"Which word is the odd one out? Apple, Pear, Carrot, Grape",opts:["Apple","Pear","Carrot","Grape"],ans:2,exp:"Apple, Pear and Grape are fruits. Carrot is a vegetable."},
  {cat:"Verbal",text:"DENTIST is to TEETH as OPTICIAN is to ___",opts:["Glasses","Hospital","Eyes","Ears"],ans:2,exp:"A dentist cares for teeth; an optician cares for eyes."},
  {cat:"Verbal",text:"Find the word that completes both: PLAY___ / ___WORK",opts:["GROUND","TIME","FIELD","HOUSE"],ans:0,exp:"PLAYGROUND and GROUNDWORK — GROUND completes both."},
  {cat:"Verbal",text:"Which number comes next? 2, 5, 10, 17, 26, ___",opts:["33","35","37","39"],ans:2,exp:"Differences are +3, +5, +7, +9, +11. 26+11=37."},
  {cat:"Verbal",text:"PIANO is to MUSIC as PAINTBRUSH is to ___",opts:["Canvas","Colour","Art","Paint"],ans:2,exp:"A piano produces music; a paintbrush produces art."},
  {cat:"Verbal",text:"Which word cannot be made from CHAMPION?",opts:["CHAIN","MANIC","PIANO","BACON"],ans:3,exp:"BACON needs a B — there is no B in CHAMPION."},
  {cat:"Verbal",text:"If FRIEND is coded as GSJFOE (each letter +1), how is BRAVE coded?",opts:["CSBWF","CRAVF","DSCXG","CSAWF"],ans:0,exp:"B+1=C, R+1=S, A+1=B, V+1=W, E+1=F → CSBWF."},
  {cat:"Verbal",text:"Cub is to Bear as Kitten is to ___",opts:["Dog","Lion","Cat","Tiger"],ans:2,exp:"A cub is a young bear; a kitten is a young cat."},
  {cat:"Verbal",text:"Which word is most similar in meaning to SWIFT?",opts:["Strong","Quick","Silent","Steady"],ans:1,exp:"Swift means moving at high speed — Quick."},
  {cat:"Non-Verbal",text:"A square has a perimeter of 36 cm. What is its area?",opts:["72 cm²","81 cm²","64 cm²","90 cm²"],ans:1,exp:"Side = 36÷4=9. Area = 9×9=81 cm²."},
  {cat:"Non-Verbal",text:"A shape has 6 faces, 12 edges, and 8 vertices. What is it?",opts:["Tetrahedron","Cube","Triangular prism","Cylinder"],ans:1,exp:"A cube has exactly 6 faces, 12 edges and 8 vertices."},
  {cat:"Non-Verbal",text:"How many lines of symmetry does a regular hexagon have?",opts:["4","5","6","8"],ans:2,exp:"A regular hexagon has 6 lines of symmetry."},
  {cat:"Non-Verbal",text:"A triangle has base 10 cm and height 8 cm. What is its area?",opts:["40 cm²","80 cm²","20 cm²","48 cm²"],ans:0,exp:"Area = ½×10×8=40 cm²."},
  {cat:"Non-Verbal",text:"Which 3D shape has one circular face and comes to a point?",opts:["Sphere","Cylinder","Cone","Pyramid"],ans:2,exp:"A cone has one circular base and tapers to an apex."},
  {cat:"Non-Verbal",text:"A rectangle is 9 cm long and 4 cm wide. What is its perimeter?",opts:["36 cm","26 cm","18 cm","13 cm"],ans:1,exp:"Perimeter = 2×(9+4)=26 cm."},
  {cat:"Non-Verbal",text:"How many faces does a triangular prism have?",opts:["4","5","6","3"],ans:1,exp:"2 triangular ends + 3 rectangular sides = 5 faces."},
  {cat:"Non-Verbal",text:"A circle has a radius of 5 cm. What is its diameter?",opts:["5 cm","15 cm","10 cm","25 cm"],ans:2,exp:"Diameter = 2 × radius = 10 cm."},
  {cat:"Non-Verbal",text:"Which shape has exactly 4 lines of symmetry?",opts:["Rectangle","Square","Rhombus","Parallelogram"],ans:1,exp:"A square has 4 lines of symmetry."},
  {cat:"Non-Verbal",text:"A cube has a side length of 3 cm. What is its volume?",opts:["9 cm³","18 cm³","27 cm³","36 cm³"],ans:2,exp:"Volume = 3³ = 27 cm³."},
];

const BANK_B = [
  {cat:"CGP - Measurement",text:"Which is the most likely weight of a bag of flour?",opts:["2 g","2 litres","2000 kg","2 kg"],ans:3,exp:"A standard bag of flour weighs 1–2 kg."},
  {cat:"CGP - Fractions",text:"How many thirds are there in 9?",opts:["3","18","9","27"],ans:3,exp:"9 ÷ (1/3) = 9 × 3 = 27 thirds."},
  {cat:"CGP - Number",text:"Which of these numbers is the smallest?",opts:["0.7","0.77","7.7","7.07"],ans:0,exp:"0.7 = 0.700, smaller than all others."},
  {cat:"CGP - Perimeter",text:"A shape has 8 sides all of length 4 cm. What is its perimeter?",opts:["24 cm","28 cm","32 cm","36 cm"],ans:2,exp:"Perimeter = 8 × 4 = 32 cm."},
  {cat:"CGP - Rounding",text:"47,983 rounded to the nearest thousand is:",opts:["47,000","50,000","48,000","47,900"],ans:2,exp:"Hundreds digit = 9 (≥5), so round up to 48,000."},
  {cat:"CGP - Multiplication",text:"A shop orders 14 boxes of 25 CDs. How many CDs total?",opts:["250","300","350","375"],ans:2,exp:"25 × 14 = 350."},
  {cat:"CGP - Fractions",text:"What is ⅗ of 60?",opts:["21","24","36","30"],ans:2,exp:"60÷5=12; 12×3=36."},
  {cat:"CGP - Subtraction",text:"A factory makes 4,596 nails; 2,914 are sold. How many remain?",opts:["1,682","1,772","1,582","1,882"],ans:0,exp:"4,596 − 2,914 = 1,682."},
  {cat:"CGP - Division",text:"Sunita has 75 pens and ties them in bundles of 8. How many pens remain?",opts:["3","5","7","1"],ans:0,exp:"75 ÷ 8 = 9 remainder 3."},
  {cat:"CGP - Sequences",text:"What is the next number? 23, 35, 47, 59, ___",opts:["69","71","70","68"],ans:1,exp:"+12 each time. 59+12=71."},
  {cat:"CGP - Multiplication",text:"What is 21.7 × 9.4?",opts:["203.98","287.68","117.24","412.96"],ans:0,exp:"21.7 × 9.4 = 203.98."},
  {cat:"CGP - Division",text:"Winston packs 106 eggs into boxes of 6. How many complete boxes?",opts:["15","16","17","18"],ans:2,exp:"106÷6=17 remainder 4."},
  {cat:"CGP - Factors",text:"What is the sum of all factors of 21?",opts:["21","7","32","11"],ans:2,exp:"Factors: 1,3,7,21. Sum=32."},
  {cat:"CGP - Statistics",text:"Mean of: 12, 11, 9, 10, 8, 7, 6°C?",opts:["10°C","9°C","6°C","12°C"],ans:1,exp:"Sum=63. 63÷7=9°C."},
  {cat:"CGP - Weight",text:"54 pieces of wood weigh 20g each. Total in kg?",opts:["0.108 kg","10.8 kg","1.08 kg","108 kg"],ans:2,exp:"54×20=1,080g=1.08kg."},
  {cat:"CGP - Probability",text:"Shane has 15 cards, 3 are aces. P(ace)?",opts:["3/5","1/3","1/5","1/4"],ans:2,exp:"3/15=1/5."},
  {cat:"CGP - Probability",text:"8 green, 7 yellow, 5 white balls. P(not green)?",opts:["3/5","2/10","8/20","3/4"],ans:0,exp:"Non-green=12. P=12/20=3/5."},
  {cat:"CGP - Temperature",text:"May avg=18°C. November=⅓ of May. September=2×November. September's temp?",opts:["6°C","9°C","12°C","18°C"],ans:2,exp:"Nov=18÷3=6°C. Sep=6×2=12°C."},
  {cat:"CGP - Percentage",text:"Mary has 12 sheep, 16 cows, 24 chickens, 6 pigs. She sells 8 sheep. % of remaining that are sheep?",opts:["7%","10%","14%","4%"],ans:0,exp:"Remaining: 4 sheep of ~56 total ≈ 7%."},
  {cat:"CGP - Angle",text:"A spinner has 6 equilateral triangles. Angle at the centre per segment?",opts:["30°","45°","60°","90°"],ans:2,exp:"360°÷6=60°."},
  {cat:"CGP - Algebra",text:"Craig has 4 dogs. Each needs collar (c) and 6 tins of food (t). Expression for total?",opts:["4tc","c+4t","4c+4t","4(c+6t)"],ans:3,exp:"4×(1 collar+6 tins)=4(c+6t)."},
  {cat:"CGP - Cost",text:"Scarf £3.99, two badges 99p each, whistle £1.99. Change from £20?",opts:["£12.04","£12.96","£11.04","£11.96"],ans:0,exp:"3.99+1.98+1.99=£7.96. Change=£12.04."},
  {cat:"CGP - Cost",text:"Jodie: £6.50/hr + 5% of book sales. 3hrs, £220 books sold. Earnings?",opts:["£19.50","£30.50","£25.00","£28.00"],ans:1,exp:"3×£6.50=£19.50. 5%×£220=£11. Total=£30.50."},
  {cat:"CGP - Algebra",text:"Travel insurance: C=10+20(x−1) where x=weeks. Cost for 6 weeks?",opts:["£100","£110","£120","£130"],ans:1,exp:"C=10+20×5=10+100=£110."},
  {cat:"CGP - Number",text:"What is the smallest prime number greater than 10?",opts:["11","12","13","15"],ans:0,exp:"11 is prime (divisible only by 1 and itself)."},
  {cat:"CGP - Fractions",text:"Convert ⅝ to a percentage.",opts:["56.5%","62.5%","58%","65%"],ans:1,exp:"5÷8=0.625=62.5%."},
  {cat:"CGP - Measurement",text:"How many ml in 3.5 litres?",opts:["350 ml","3050 ml","3500 ml","35000 ml"],ans:2,exp:"1 litre=1000ml. 3.5×1000=3500ml."},
  {cat:"CGP - Number",text:"What is 2/3 + 3/4?",opts:["5/7","17/12","5/12","7/12"],ans:1,exp:"LCD=12. 8/12+9/12=17/12."},
  {cat:"CGP - Ratio",text:"Share 48 in the ratio 3:5.",opts:["18 and 30","15 and 33","16 and 32","20 and 28"],ans:0,exp:"Total parts=8. 48÷8=6. 3×6=18, 5×6=30."},
  {cat:"CGP - Percentage",text:"A jacket costs £80 after a 20% discount. Original price?",opts:["£96","£100","£95","£98"],ans:1,exp:"£80=80% of original. 80÷0.8=£100."},
];

const BANK_C = [
  {cat:"Mathematics",text:"A car travels at 60 mph for 2.5 hours. How far?",opts:["120 miles","140 miles","150 miles","160 miles"],ans:2,exp:"Distance=60×2.5=150 miles."},
  {cat:"Mathematics",text:"What is the lowest common multiple (LCM) of 4 and 6?",opts:["8","10","12","24"],ans:2,exp:"LCM of 4 and 6 = 12."},
  {cat:"Mathematics",text:"A shirt costs £24 after a 20% discount. Original price?",opts:["£28","£30","£32","£29"],ans:1,exp:"£24=80%. Original=£24÷0.8=£30."},
  {cat:"Mathematics",text:"Highest common factor (HCF) of 36 and 48?",opts:["6","8","12","16"],ans:2,exp:"HCF=12."},
  {cat:"Mathematics",text:"If a:b=3:5 and a=12, what is b?",opts:["15","18","20","25"],ans:2,exp:"b=12×5/3=20."},
  {cat:"Mathematics",text:"A recipe for 4 needs 300g flour. How much for 10?",opts:["650g","700g","750g","800g"],ans:2,exp:"Per person=75g. For 10=750g."},
  {cat:"Mathematics",text:"What is 2³ × 3²?",opts:["48","54","72","96"],ans:2,exp:"8×9=72."},
  {cat:"Mathematics",text:"Mean of five numbers is 14. Four are 10, 12, 16, 18. What is the fifth?",opts:["12","14","16","18"],ans:1,exp:"Total=70. Known=56. Fifth=14."},
  {cat:"Mathematics",text:"What is 0.004 × 1000?",opts:["0.4","4","40","400"],ans:1,exp:"0.004×1000=4."},
  {cat:"Mathematics",text:"What is 5² + 4² - 3²?",opts:["30","32","32","34"],ans:1,exp:"25+16-9=32."},
  {cat:"English",text:"Which word is a synonym for TENACIOUS?",opts:["Fragile","Persistent","Impulsive","Vague"],ans:1,exp:"Tenacious means persistent."},
  {cat:"English",text:"Which sentence uses the subjunctive correctly?",opts:["If I was you, I would go.","If I were you, I would go.","If I am you, I would go.","If I be you, I would go."],ans:1,exp:"Subjunctive uses 'were' for hypothetical conditions."},
  {cat:"English",text:"What does the prefix 'mis-' mean in MISFORTUNE?",opts:["Good","Without","Wrongly or badly","Again"],ans:2,exp:"'mis-' means wrongly or badly."},
  {cat:"English",text:"Which sentence contains a metaphor?",opts:["Life is like a box of chocolates.","Time is a thief.","She ran as fast as a cheetah.","He fought like a lion."],ans:1,exp:"'Time is a thief' is a direct comparison (metaphor)."},
  {cat:"English",text:"Choose the correct word: 'The scientist made a ___ observation.'",opts:["Acute","Astute","Moot","Abrupt"],ans:1,exp:"Astute means having sharp, clever perception."},
  {cat:"Verbal",text:"AUTHOR is to BOOK as COMPOSER is to ___",opts:["Poem","Symphony","Painting","Play"],ans:1,exp:"A composer writes a symphony."},
  {cat:"Verbal",text:"Which is NOT a type of triangle?",opts:["Scalene","Isosceles","Rhomboid","Equilateral"],ans:2,exp:"Rhomboid is a parallelogram, not a triangle."},
  {cat:"Verbal",text:"If 5 workers build a wall in 12 days, how long for 3 workers?",opts:["15 days","18 days","20 days","24 days"],ans:2,exp:"Total=5×12=60 worker-days. 3 workers=60÷3=20 days."},
  {cat:"Verbal",text:"Hot is to Cold as Light is to ___",opts:["Bright","Dark","Heavy","Shadow"],ans:1,exp:"Antonyms: Hot/Cold, Light/Dark."},
  {cat:"Verbal",text:"Tom>Sam, Sam>Alex, Ben>Tom. Who is shortest?",opts:["Sam","Tom","Alex","Ben"],ans:2,exp:"Ben>Tom>Sam>Alex. Alex is shortest."},
  {cat:"Verbal",text:"Which number is both a square and a cube?",opts:["16","27","64","36"],ans:2,exp:"64=8²=4³. Both square and cube."},
  {cat:"Non-Verbal",text:"Sum of interior angles of a pentagon?",opts:["360°","450°","540°","720°"],ans:2,exp:"(5-2)×180°=540°."},
  {cat:"Non-Verbal",text:"A shape rotated 90° clockwise: arrow pointing North now points?",opts:["North","East","South","West"],ans:1,exp:"North rotated 90° clockwise = East."},
  {cat:"Non-Verbal",text:"Rotating a rectangle 360° around one side creates which 3D shape?",opts:["Sphere","Cone","Cylinder","Prism"],ans:2,exp:"Cylinder."},
  {cat:"Non-Verbal",text:"How many faces does a square-based pyramid have?",opts:["4","5","6","8"],ans:1,exp:"1 square base + 4 triangular faces = 5 faces."},
  {cat:"Non-Verbal",text:"Net with 2 circles and 1 rectangle makes which shape?",opts:["Cone","Sphere","Cylinder","Prism"],ans:2,exp:"2 circular ends + 1 rectangular side = cylinder."},
  {cat:"Non-Verbal",text:"Pattern: Circle, Square, Triangle, Circle, Square, ___",opts:["Circle","Square","Triangle","Pentagon"],ans:2,exp:"Pattern repeats every 3. Next is Triangle."},
  {cat:"Non-Verbal",text:"Rotational symmetry of order 4 means the shape looks the same how many times in 360°?",opts:["2","3","4","6"],ans:2,exp:"Order 4 = looks the same 4 times."},
  {cat:"Non-Verbal",text:"Which polygon has 8 sides?",opts:["Hexagon","Heptagon","Octagon","Nonagon"],ans:2,exp:"Octagon = 8 sides."},
  {cat:"Non-Verbal",text:"Surface area of a 5cm × 4cm × 3cm rectangular prism?",opts:["60 cm²","94 cm²","120 cm²","47 cm²"],ans:1,exp:"2(20+15+12)=2×47=94 cm²."},
  {cat:"Non-Verbal",text:"A cylinder has radius 3cm, height 10cm. Volume (π≈3.14)?",opts:["282.6 cm³","94.2 cm³","314 cm³","188.4 cm³"],ans:0,exp:"V=π×9×10=282.6 cm³."},
];

/* ═══════════════════════════════════════════════════════════
   PRACTICE PAGE
═══════════════════════════════════════════════════════════ */
const LETTERS = ["A","B","C","D"];
const TEST_SIZE = 10;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function drawTest(bank, setId, isShuffled) {
  let pool = shuffle([...bank]);
  let selected;

  if (setId === "A") {
    const groups = {};
    pool.forEach(q => {
      const k = q.cat;
      if (!groups[k]) groups[k] = [];
      groups[k].push(q);
    });
    selected = [];
    Object.values(groups).forEach(g => g.slice(0, 3).forEach(q => { if (selected.length < TEST_SIZE) selected.push(q); }));
    pool.forEach(q => { if (!selected.includes(q) && selected.length < TEST_SIZE) selected.push(q); });
    selected = shuffle(selected);
  } else {
    selected = pool.slice(0, TEST_SIZE);
  }

  if (isShuffled) {
    return selected.map(q => {
      const idx = shuffle([0,1,2,3]);
      return { ...q, opts: idx.map(i => q.opts[i]), ans: idx.indexOf(q.ans) };
    });
  }
  return selected.map(q => ({ ...q, opts: [...q.opts] }));
}

function QuestionCard({ q, qi, setId, answered, onAnswer }) {
  const setL = setId.toLowerCase();
  const state = answered[qi];
  const cardCls = `q-card q-card-${setL}${state !== undefined ? (state === q.ans ? " correct-card" : " wrong-card") : ""}`;

  return (
    <div className={cardCls} style={{ animationDelay:`${qi*0.04}s` }}>
      <div className="q-head">
        <div className={`q-num q-num-${setL}`}>{qi + 1}</div>
        <div className="q-meta">
          <div className={`q-cat q-cat-${setL}`}>{q.cat}</div>
          <div className="q-text">{q.text}</div>
        </div>
      </div>
      <div className="options">
        {q.opts.map((opt, oi) => {
          let cls = "opt";
          if (state !== undefined) {
            cls += " opt-disabled";
            if (oi === state) cls += (state === q.ans ? " opt-correct" : " opt-wrong");
            else if (oi === q.ans && state !== q.ans) cls += " opt-reveal";
          }
          return (
            <div key={oi} className={cls} onClick={() => state === undefined && onAnswer(qi, oi)}>
              <div className="opt-letter">{LETTERS[oi]}</div>
              <span>{opt}</span>
            </div>
          );
        })}
      </div>
      {state !== undefined && (
        <div className={`feedback ${state === q.ans ? "fb-ok" : "fb-err"}`}>
          <strong>{state === q.ans ? "✓ Correct!" : "✗ Incorrect."}</strong> {q.exp}
        </div>
      )}
    </div>
  );
}

function ResultsPanel({ score, total, setId, answered, questions, xpEarned, streakCount, onNewTest, onNextSet }) {
  const pct = score / total;
  const circumference = 339.3;
  const offset = circumference * (1 - pct);
  const [showConfetti, setShowConfetti] = useState(false);
  const arcRef = useRef(null);

  useEffect(() => {
    if (pct === 1) setShowConfetti(true);
    setTimeout(() => {
      if (arcRef.current) arcRef.current.style.strokeDashoffset = offset;
    }, 100);
  }, []);

  const subjects = {};
  questions.forEach((q, i) => {
    const s = q.cat;
    if (!subjects[s]) subjects[s] = { total: 0, correct: 0 };
    subjects[s].total++;
    if (answered[i] === q.ans) subjects[s].correct++;
  });

  let title, msg;
  if (pct === 1) { title = "🏆 Perfect Score!"; msg = "Flawless! Every answer correct. You're well on track for the 11+!"; }
  else if (pct >= .8) { title = "🌟 Excellent!"; msg = `Outstanding — ${score}/${total}. Push for a perfect score next time!`; }
  else if (pct >= .6) { title = "👍 Good Effort!"; msg = `Solid work — ${score}/${total}. Review the explanations and try again.`; }
  else if (pct >= .4) { title = "📚 Keep Going!"; msg = `You scored ${score}/${total}. Read each explanation carefully.`; }
  else { title = "💡 Room to Grow!"; msg = `You scored ${score}/${total}. Every attempt builds skill!`; }

  return (
    <>
      <Confetti active={showConfetti} />
      <div className="results-panel">
        <div className="score-wrap">
          <svg className="score-svg" width="130" height="130" viewBox="0 0 130 130">
            <circle className="score-track" cx="65" cy="65" r="54"/>
            <circle className="score-arc" ref={arcRef} cx="65" cy="65" r="54"
              style={{ stroke: pct===1?"#d4912a":pct>=.7?"#1e7a4a":pct>=.5?"#2a7ad4":"#b02020", strokeDashoffset: circumference }} />
          </svg>
          <div className="score-inner">
            <div className="score-num">{score}</div>
            <div className="score-den">/ {total}</div>
          </div>
        </div>
        <h2>{title}</h2>
        <p>{msg}</p>
        <div className="results-stats">
          <div className="rstat"><div className="rstat-val">+{xpEarned}</div><div className="rstat-lbl">XP Earned</div></div>
          <div className="rstat"><div className="rstat-val">{streakCount}🔥</div><div className="rstat-lbl">Streak</div></div>
          <div className="rstat"><div className="rstat-val">{Math.round(pct*100)}%</div><div className="rstat-lbl">Accuracy</div></div>
        </div>
        <div className="breakdown-section">
          <h3>📊 Subject Breakdown</h3>
          {Object.entries(subjects).map(([s, d]) => {
            const p = d.total > 0 ? Math.round(d.correct/d.total*100) : 0;
            const c = p>=80?"var(--ok)":p>=50?"var(--gold)":"var(--err)";
            return (
              <div key={s} className="bk-bd-row">
                <div className="bk-bd-label">{s}</div>
                <div className="bk-bd-bar-wrap"><div className="bk-bd-bar" style={{width:`${p}%`,background:c}}/></div>
                <div className="bk-bd-score">{d.correct}/{d.total}</div>
              </div>
            );
          })}
        </div>
        <div className="results-btns">
          <button className="btn btn-gold" onClick={onNewTest}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            New Test (10 fresh questions)
          </button>
          <button className="btn btn-ghost-btn" onClick={onNextSet}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="15" height="15"><polyline points="9 18 15 12 9 6"/></svg>
            Try Next Set
          </button>
        </div>
      </div>
    </>
  );
}

export default function PracticePage() {
  const { addXp, addCorrect, showToast, addActivity, updateProgress } = useApp();
  const [currentSet, setCurrentSet] = useState("A");
  const [isShuffled, setIsShuffled] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answered, setAnswered] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [lastScore, setLastScore] = useState(null);
  const [localStreak, setLocalStreak] = useState(0);
  const [showStreakBanner, setShowStreakBanner] = useState(false);
  const xpPopContainer = useRef(null);

  const banks = { A: BANK_A, B: BANK_B, C: BANK_C };
  const setColors = { A:"a", B:"b", C:"c" };
  const setNames = { A:"Set A · Core Foundations", B:"Set B · CGP Assessment", C:"Set C · Mixed Challenge" };

  const startNewTest = useCallback((set = currentSet, shuffled = isShuffled, silent = false) => {
    const qs = drawTest(banks[set], set, shuffled);
    setQuestions(qs);
    setAnswered({});
    setShowResults(false);
    setLastScore(null);
    setLocalStreak(0);
    setShowStreakBanner(false);
    if (!silent) showToast(`🎲 Fresh 10 questions from Set ${set}!`);
  }, [currentSet, isShuffled, showToast]);

  useEffect(() => { startNewTest(currentSet, isShuffled, true); }, []);

  const handleSetChange = (s) => {
    setCurrentSet(s);
    startNewTest(s, isShuffled, false);
  };

  const handleToggleShuffle = () => {
    const done = Object.keys(answered).length;
    if (done > 0 && !window.confirm("Shuffling resets current progress. Continue?")) return;
    const next = !isShuffled;
    setIsShuffled(next);
    startNewTest(currentSet, next, false);
    showToast(next ? "🔀 Options shuffled!" : "↩ Shuffle off");
  };

  const handleAnswer = (qi, choice) => {
    if (answered[qi] !== undefined) return;
    const q = questions[qi];
    const correct = choice === q.ans;
    setAnswered(prev => ({ ...prev, [qi]: choice }));

    if (correct) {
      setLocalStreak(s => {
        const next = s + 1;
        if (next >= 3) setShowStreakBanner(true);
        return next;
      });
      spawnXPPop("+10 XP", qi);
    } else {
      setLocalStreak(0);
      setShowStreakBanner(false);
    }
  };

  const spawnXPPop = (text, qi) => {
    const card = document.getElementById(`qcard-${qi}`);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const el = document.createElement("div");
    el.className = "xp-pop";
    el.textContent = text;
    el.style.left = `${rect.left + rect.width/2 - 20}px`;
    el.style.top = `${rect.top + window.scrollY - 10}px`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1300);
  };

  const answeredCount = Object.keys(answered).length;
  const allDone = answeredCount === TEST_SIZE;

  const handleSubmit = () => {
    const score = questions.reduce((acc, q, i) => acc + (answered[i] === q.ans ? 1 : 0), 0);
    const pct = score / TEST_SIZE;
    const xpEarned = score * 10 + (pct === 1 ? 50 : pct >= .8 ? 20 : 0) + (localStreak >= 5 ? 30 : localStreak >= 3 ? 10 : 0);
    addXp(xpEarned);
    addCorrect(score);
    const newPct = Math.round((score / TEST_SIZE) * 100);
    updateProgress(currentSet, newPct);
    addActivity({ set:`Set ${currentSet}`, date:"Just now", q:TEST_SIZE, t:"—", score });
    setLastScore({ score, xpEarned, streak: localStreak });
    setShowResults(true);
  };

  const setDefs = [
    { id:"A", name:"Core Foundations", desc:"Maths, English, Verbal & Non-Verbal — the essential building blocks.", chips:["40 questions","10 per test","All subjects"], startBadge:true },
    { id:"B", name:"CGP Assessment", desc:"Authentic CGP-style 11+ Maths questions.", chips:["30 questions","10 per test","Maths focus"] },
    { id:"C", name:"Mixed Challenge", desc:"Advanced mixed questions — the ultimate 11+ challenge.", chips:["30 questions","10 per test","All subjects"] },
  ];

  const col = setColors[currentSet];

  return (
    <>
      <Header showBack />

      <div className="practice-hero">
        <div className="hero-eyebrow">🎓 UK 11+ Exam Preparation</div>
        <h1>Master the 11+.<br/><em>Beat the Test.</em></h1>
        <p>Three sets of authentic practice questions — built from real CGP-style papers and expertly designed to build the skills grammar schools demand.</p>
        <div className="hero-pills">
          {[["80+","Questions"],["3","Sets"],["4","Subjects"],["XP","& Streaks"]].map(([v,l]) => (
            <div key={l} className="pill"><strong>{v}</strong> {l}</div>
          ))}
        </div>
      </div>

      <div className="set-selector">
        <div className="set-tabs">
          {setDefs.map(s => {
            const isActive = currentSet === s.id;
            return (
              <div key={s.id} className={`set-tab tab-${s.id.toLowerCase()}${isActive ? ` active-${s.id.toLowerCase()}` : ""}`} onClick={() => handleSetChange(s.id)}>
                {s.startBadge && <div className="start-badge">START HERE</div>}
                <div className={`set-label-tab label-${s.id.toLowerCase()}`}>Set {s.id}</div>
                <div className="set-name-tab">{s.name}</div>
                <div className="set-desc-tab">{s.desc}</div>
                <div className="set-meta-tab">
                  {s.chips.map(c => <span key={c} className={`set-chip chip-${s.id.toLowerCase()}`}>{c}</span>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="test-main">
        {showStreakBanner && (
          <div className="streak-banner">
            <div style={{fontSize:"1.8rem"}}>🔥</div>
            <div style={{fontSize:".92rem",fontWeight:600,lineHeight:1.4}}>
              <strong style={{fontFamily:"'Fraunces',serif",fontSize:"1.1rem"}}>{localStreak}</strong> in a row! Keep it up!
            </div>
          </div>
        )}

        <div className="test-toolbar">
          <div className="toolbar-left">
            <div className="toolbar-set-label" style={{color:`var(--${col})`}}>{setNames[currentSet]}</div>
            <div className="toolbar-title">Mixed 11+ Practice Paper</div>
          </div>
          <div className="toolbar-right">
            <button className={`btn ${isShuffled ? "btn-shuffle-on" : "btn-ghost-btn"}`} onClick={handleToggleShuffle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="15" height="15" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
              <span>{isShuffled ? "Shuffled ✓" : "Shuffle"}</span>
            </button>
            <button className="btn btn-navy" onClick={() => showToast("📄 PDF download not available in this demo.")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="15" height="15" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>PDF</span>
            </button>
          </div>
        </div>

        <div className="prog-row">
          <span className="prog-text">Progress</span>
          <span className="prog-count">{answeredCount} / {TEST_SIZE}</span>
        </div>
        <div className="prog-wrap">
          <div className={`prog-fill prog-fill-${col}`} style={{ width:`${(answeredCount/TEST_SIZE)*100}%` }}/>
        </div>

        {!showResults && questions.map((q, qi) => (
          <div key={qi} id={`qcard-${qi}`}>
            <QuestionCard q={q} qi={qi} setId={currentSet} answered={answered} onAnswer={handleAnswer} />
          </div>
        ))}

        {!showResults && (
          <div className="test-foot">
            <button className="btn btn-gold btn-submit-test" disabled={!allDone} onClick={handleSubmit}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="17" height="17" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Submit Test
            </button>
          </div>
        )}

        {showResults && lastScore && (
          <ResultsPanel
            score={lastScore.score}
            total={TEST_SIZE}
            setId={currentSet}
            answered={Object.values(answered)}
            questions={questions}
            xpEarned={lastScore.xpEarned}
            streakCount={lastScore.streak}
            onNewTest={() => startNewTest(currentSet, isShuffled, false)}
            onNextSet={() => {
              const next = currentSet === "A" ? "B" : currentSet === "B" ? "C" : "A";
              handleSetChange(next);
            }}
          />
        )}
      </div>

      <Footer />
    </>
  );
}
