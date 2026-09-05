/**
 * Every fact on this site lives here, so there is exactly one place to check
 * a claim against a source.
 *
 * Sources, in order of authority:
 *   1. The build chat — 1,299 messages, 21 Jul 2025 → 29 Mar 2026. Quoted verbatim.
 *   2. The V3 firmware pinout (PAWME_FIRMWARE_2/MAIN_CODE.ino) and our ESP-IDF port.
 *   3. docs/ORBIE_PLAN.md.
 *
 * Rules that are easy to break by accident and expensive to break in public:
 *   - No number appears here that nobody can check. The reservation count and the
 *     app-install figures circulate in our own materials with no confirmed
 *     provenance; until someone sources them they stay off the site.
 *   - Nothing is described as finished that is not. See GAPS.
 */

export const LINKS = {
  x: 'https://x.com/orbie_robot',
  xFounder: 'https://x.com/jaiswalashok',
  github: 'https://github.com/orbierobot',
  espRoll: 'https://www.instructables.com/ESP-ROLL-Build-a-Spherical-Self-balancing-Robot-Wi/',
  maxImagination: 'https://www.instructables.com/member/Max+Imagination/',
  s60sc: 'https://github.com/s60sc/ESP32-CAM_MJPEG2SD',
} as const;

/* ── The machine ──────────────────────────────────────────────────────────
 * Part numbers are from the V3 pinout and the component list in the build
 * chat. Where a part differs between the units we have flashed and the CAD,
 * the note says so rather than picking the tidier answer.
 */
export interface Subsystem {
  id: string;
  name: string;
  part: string;
  /* Where it sits on the SVG, in the 0-100 space of <RobotDiagram>. */
  x: number;
  y: number;
  what: string;
  /* The part people skip past on a spec sheet: what it makes possible. */
  opens: string;
  photo?: string;
  bus?: string;
}

export const SUBSYSTEMS: Subsystem[] = [
  {
    id: 'eyes',
    name: 'Eyes',
    part: 'Monochrome dot-matrix display',
    x: 50,
    y: 21.9,
    bus: 'Custom PCB, fabricated at JLCPCB',
    what:
      'Two dot-matrix panels behind a single dark lens. Not an off-the-shelf part — the ' +
      'panel was drawn as a PCB and fabricated in a batch of ten. Monochrome was chosen ' +
      'over colour in December 2025 so the light coming off the face is the only colour ' +
      'on the machine. It first lit on 24 February 2026.',
    opens:
      'Every expression is a bitmap in firmware, so a face is a pull request. The eyes ' +
      'already track toward wherever the camera is looking — anything else you can draw ' +
      'in an 8-bit grid is a few lines of code.',
    photo: '/build/s-eyes-black.jpg',
  },
  {
    id: 'camera',
    name: 'Camera',
    part: 'OV3660 module',
    x: 50,
    y: 9.8,
    bus: 'SCCB 0x3c · auto-detected',
    what:
      'Mounted in the head above the display, so where it points and where the robot ' +
      'appears to be looking are the same direction. Streams MJPEG on port 81 and serves ' +
      'a single still on /capture.',
    opens:
      'This is the sensor everything interesting hangs off. Any vision model you can ' +
      'reach over HTTP — local or hosted — can drive the robot from one still frame. ' +
      'The capture endpoint exists precisely so you do not have to touch the firmware.',
    photo: '/build/s-camera.jpg',
  },
  {
    id: 'mic',
    name: 'Microphone',
    part: 'PDM MEMS mic',
    x: 30.5,
    y: 21.4,
    bus: 'DATA 41 · CLK 42',
    what:
      'A single digital mic in the head. Ambient noise on the early units was bad enough ' +
      'to be raised in the chat in November 2025 and is still a real constraint.',
    opens:
      'Wake words, clap detection, a room-noise log, speech straight to a hosted model. ' +
      'Pair it with the speaker and the robot holds a conversation without a phone in the loop.',
  },
  {
    id: 'speaker',
    name: 'Speaker',
    part: 'MAX98357A I²S amplifier',
    x: 50,
    y: 61.6,
    bus: 'DOUT 44 · BCLK 7 · LRC 8',
    what:
      'A class-D amp driving a small cone behind the slot in the body. The first working ' +
      'speaker, in August 2025, was too quiet — the note in the chat reads "the speaker is ' +
      'working, but the sound is too low".',
    opens:
      'Text-to-speech, a timer that actually nags, sound effects tied to expressions, ' +
      'a doorbell that walks to you. Audio is the cheapest way to give a machine personality.',
  },
  {
    id: 'distance',
    name: 'Distance',
    part: 'VL53L0X time-of-flight',
    x: 62,
    y: 51.8,
    bus: 'I²C 0x29 → 0x30',
    what:
      'A laser time-of-flight sensor reading in millimetres, not the centimetre guesses an ' +
      'ultrasonic module gives you. Re-addressed off its default because the display driver ' +
      'squats on the address next door.',
    opens:
      'Edge detection so it does not drive off a table, follow-at-a-distance, a doorway ' +
      'tripwire, gesture input by waving a hand at it. This is the sensor that makes ' +
      'autonomy possible rather than remote control.',
  },
  {
    id: 'temp',
    name: 'Temperature',
    part: 'MLX90614 infrared',
    x: 38,
    y: 51.8,
    bus: 'I²C 0x5A',
    what:
      'Non-contact infrared thermometry — it reads the temperature of whatever it is pointed ' +
      'at, from a distance, without touching it. Reports both object and ambient temperature.',
    opens:
      'Check a sleeping child without waking them. Watch a radiator, a fish tank, a 3D ' +
      'printer bed, a pet that is off its food. A thermal reading tied to a photograph is a ' +
      'health record nobody else in this price class can produce.',
  },
  {
    id: 'laser',
    name: 'Laser pointer',
    part: '650nm 5V laser module',
    x: 50,
    y: 51.8,
    bus: 'GPIO 9 · active-low',
    what:
      'A red laser diode in the front of the body. It is the one part on the machine that ' +
      'exists purely to play with an animal.',
    opens:
      'A scheduled cat routine while you are at work. Chase patterns generated rather than ' +
      'looped. Point at what the camera just recognised. Couple it to the wheels and the ' +
      'robot plays a game it can move through.',
    photo: '/build/s-laser.jpg',
  },
  {
    id: 'drive',
    name: 'Drive',
    part: 'N20 gear motors · DRV8833',
    x: 18,
    y: 73.2,
    bus: 'GPIO 1-4 · 1 kHz PWM',
    what:
      'Two brushed gear motors, one per wheel, on a dual H-bridge. Differential drive: it ' +
      'turns by running the wheels against each other. The driver chip is the part that ' +
      'arrived as the wrong part number in September 2025 and had to be desoldered off ' +
      'another board.',
    opens:
      'Room-to-room is the whole premise. A robot that can move is a robot that can go and ' +
      'look, patrol, follow, fetch a view of the back door. Everything a fixed camera cannot do.',
    photo: '/build/v3-pcb-layout.jpg',
  },
  {
    id: 'neck',
    name: 'Neck',
    part: '3 × micro servo',
    x: 50,
    y: 38.8,
    bus: 'GPIO 43 · 50 Hz',
    what:
      'The head tilts on servos rather than being fixed to the body. Alignment was broken by ' +
      'a snapped guide rib in February 2026 and fixed three days later.',
    opens:
      'Tilt is what separates a camera on wheels from something that reads as paying ' +
      'attention. It is also how you point the thermometer and the laser without moving the ' +
      'whole machine.',
    photo: '/build/v3-cad-head.jpg',
  },
  {
    id: 'brain',
    name: 'Compute',
    part: 'Seeed XIAO ESP32-S3',
    x: 50,
    y: 71.4,
    bus: '8 MB flash · Wi-Fi + BLE',
    what:
      'The entire compute budget, for a few dollars. It runs perception, audio, motor control ' +
      'and the web server at once. Wi-Fi credentials arrive over Bluetooth at setup and are ' +
      'only written to flash once a connection actually succeeds.',
    opens:
      'A chip this cheap and this well documented is why a fork is realistic. The heavy ' +
      'thinking happens wherever you send the frames; the robot only has to be honest about ' +
      'what it sees and reliable about what it does.',
  },
  {
    id: 'power',
    name: 'Power',
    part: '1 × 18650 cell',
    x: 50,
    y: 82.1,
    bus: 'Boost to 5V',
    what:
      'One cylindrical lithium cell. In V1 the battery doubled as the ballast that made the ' +
      'ball roll — the weight was the drive mechanism.',
    opens:
      'A standard cell, not a sealed pack. Replaceable by the owner with a part sold ' +
      'everywhere, which is most of what "repairable" actually means.',
  },
];

/* ── What it is for ───────────────────────────────────────────────────────
 * Deliberately ordinary. The robot is unusual; the reasons to want one should
 * not have to be.
 */
export const USE_CASES = [
  {
    title: 'Check on the dog',
    body:
      'It goes and finds the animal rather than waiting for the animal to walk past a fixed ' +
      'camera. Then it plays with them, which is the part a camera can never do.',
    uses: ['camera', 'drive', 'laser'],
  },
  {
    title: 'Look in on a sleeping child',
    body:
      'A quiet pass through the room, a still frame, a skin temperature without a thermometer ' +
      'in an ear. No subscription, and the footage goes wherever you decide it goes.',
    uses: ['camera', 'temp', 'drive'],
  },
  {
    title: 'Remind a parent about medication',
    body:
      'It comes to the room and says the thing out loud, at the time, in a voice — which lands ' +
      'differently from a phone alert in another room.',
    uses: ['drive', 'speaker', 'eyes'],
  },
  {
    title: 'Walk the house before bed',
    body:
      'A route through the rooms, a photo from each, the back door checked. A patrol is just a ' +
      'list of waypoints and a camera.',
    uses: ['drive', 'camera', 'distance'],
  },
  {
    title: 'Sit on the desk and keep you company',
    body:
      'Most of the time it is not doing a job. It has a face, it looks at what it hears, and it ' +
      'reacts. That is the feature people actually keep.',
    uses: ['eyes', 'mic', 'neck'],
  },
  {
    title: 'Be the thing you take apart',
    body:
      'Ten units were built by hand with, in the words of the person who built them, "a lot of ' +
      'tape, glue, and adhesives". It was always meant to be opened.',
    uses: ['brain', 'power'],
  },
] as const;

/* ── What people could build ──────────────────────────────────────────────
 * The point of the section is range, so these span an afternoon to a term
 * project, and each one names the parts it leans on.
 */
export const IDEAS = [
  {
    title: 'Scheduled cat entertainment',
    body: 'Laser routine that runs at 3pm while the house is empty, driving to a different room each day.',
    uses: ['laser', 'drive'],
    effort: 'An afternoon',
  },
  {
    title: 'Fever check',
    body: 'Infrared reading paired to a photo and a timestamp, logged wherever you keep records.',
    uses: ['temp', 'camera'],
    effort: 'An afternoon',
  },
  {
    title: 'Bring your own model',
    body: 'Point /capture at any vision model and let it decide what the robot does next. No firmware changes.',
    uses: ['camera', 'brain'],
    effort: 'An afternoon',
  },
  {
    title: 'Plant round',
    body: 'A route past every pot, a photo of each, drooping leaves flagged before anyone notices.',
    uses: ['drive', 'camera'],
    effort: 'A weekend',
  },
  {
    title: 'Table-edge safety',
    body: 'Time-of-flight pointed down instead of forward, so it stops at a cliff. A patch everyone benefits from.',
    uses: ['distance'],
    effort: 'A weekend',
  },
  {
    title: 'A face nobody drew yet',
    body: 'Expressions are bitmaps. Draw a set, open a pull request, watch it ship to other people’s robots.',
    uses: ['eyes'],
    effort: 'A weekend',
  },
  {
    title: 'Follow me',
    body: 'Person detection on the camera, distance held by the time-of-flight, gait handled by the wheels.',
    uses: ['camera', 'distance', 'drive'],
    effort: 'A weekend',
  },
  {
    title: 'Language tutor on wheels',
    body: 'Mic in, hosted model, speaker out — a conversation partner that follows you around the kitchen.',
    uses: ['mic', 'speaker', 'drive'],
    effort: 'A weekend',
  },
  {
    title: 'Night watch',
    body: 'Motion route after midnight, a frame to your phone only when something changed.',
    uses: ['drive', 'camera', 'distance'],
    effort: 'A weekend',
  },
  {
    title: 'A different body',
    body: 'The CAD is published under a licence that lets you fabricate it. Print a new shell, mount a new sensor.',
    uses: ['neck', 'power'],
    effort: 'A term project',
  },
  {
    title: 'Swarm of one house',
    body: 'Two units, one map, rooms divided between them. Nothing in the firmware assumes it is alone.',
    uses: ['drive', 'brain'],
    effort: 'A term project',
  },
  {
    title: 'Teach it a trick',
    body: 'Record a joystick sequence, name it, trigger it by voice. The recorded macro is the primitive everything else builds on.',
    uses: ['mic', 'drive', 'neck'],
    effort: 'A term project',
  },
  {
    title: 'Radiator audit',
    body: 'A cold morning, a route through the house, an infrared reading off every radiator. Find the one that never warms up.',
    uses: ['temp', 'drive', 'camera'],
    effort: 'A weekend',
  },
  {
    title: 'A laser that knows where the cat is',
    body: 'Only fire when the camera can see the animal, and stop when it stops caring. Better than a loop, and kinder.',
    uses: ['laser', 'camera'],
    effort: 'A weekend',
  },
  {
    title: 'Dot on demand',
    body: 'Tap anywhere in the camera view and the head turns until the laser lands there. Aiming is a neck problem, not a driving one.',
    uses: ['laser', 'neck'],
    effort: 'A weekend',
  },
  {
    title: 'Coffee is ready',
    body: 'Point the thermometer at the mug and say so out loud when it crosses drinkable. Trivial, and you would use it every day.',
    uses: ['temp', 'speaker'],
    effort: 'An afternoon',
  },
  {
    title: 'Eyes that listen',
    body: 'A volume meter with a face — the display reacts to how loud the room is. The cheapest possible way to make it feel present.',
    uses: ['eyes', 'mic'],
    effort: 'An afternoon',
  },
  {
    title: 'Night light with manners',
    body: 'The eyes hold a dim glow and brighten only when the time-of-flight sees someone walk past. No app, no switch.',
    uses: ['eyes', 'distance'],
    effort: 'An afternoon',
  },
  {
    title: 'Read it out loud',
    body: 'Hold a page up to the camera, get it back through the speaker. Text recognition is somebody else’s API and this is the body for it.',
    uses: ['camera', 'speaker'],
    effort: 'A weekend',
  },
  {
    title: 'Patrol that makes it home',
    body: 'Route planning that watches the cell emberage and turns back while it still can. Unglamorous, and the difference between a demo and a device.',
    uses: ['power', 'drive', 'brain'],
    effort: 'A term project',
  },
] as const;

/* ── Generations ──────────────────────────────────────────────────────── */
export const GENERATIONS = [
  {
    tag: 'V1',
    when: 'Jul – Sep 2025',
    name: 'The ball',
    body:
      'A replication of the open-source ESP-ROLL ball bot, built to learn what would and would ' +
      'not work: an ESP32 camera in a transparent sphere, driven by two wheels, with the ' +
      'battery slung underneath as the ballast that makes it roll. Two weeks was the estimate.',
    photo: '/build/v1-ball.jpg',
    caption: 'V1 assembly, camera and drive inside the sphere — 27 Sep 2025',
  },
  {
    tag: 'V2',
    when: 'Sep 2025 – Jan 2026',
    name: 'Ten units',
    body:
      'Our own rolling design, built ten times over so there was something to hand people. ' +
      'Still transparent, still nothing hidden. The first one was assembled with tape and glue.',
    photo: '/build/v2-ten-units.jpg',
    caption: 'Ten V2 units on the bench, 22 Oct 2025',
  },
  {
    tag: 'V3',
    when: 'Nov 2025 – now',
    name: 'The companion',
    body:
      'A complete rethink. Two wheels, a tilting head, a custom dot-matrix face. It stopped ' +
      'being a ball and started being someone.',
    photo: '/build/v3-in-hand.jpg',
    caption: 'V3 in the hand, 28 Jan 2026',
  },
] as const;

/* ── Build log ────────────────────────────────────────────────────────────
 * Verbatim from the chat, dates are message timestamps. The failures are here
 * on purpose: a build log with no bad days is a brochure.
 */
export const LOG = [
  {
    when: '21 Jul 2025',
    who: 'Ashok Jaiswal',
    line: 'Can you make the below thing? All mechanical, PCBA and firmware code is available in the video description.',
    kind: 'start',
  },
  {
    when: '22 Aug 2025',
    who: 'Lalith Kumar',
    line: 'So, the speaker is working, but, the sound is too low.',
    kind: 'snag',
  },
  {
    when: '26 Aug 2025',
    who: 'Lalith Kumar',
    line: 'This firmware was given to be run on ESP-IDF, and it worked great.',
    kind: 'win',
  },
  {
    when: '9 Sep 2025',
    who: 'Ashok Jaiswal',
    line:
      'We have to show how hard we have been working on this project, save each prototype to ' +
      'show how many iterations we had to do to get it done.',
    kind: 'start',
  },
  {
    when: '16 Sep 2025',
    who: 'Lalith Kumar',
    line:
      'Many parts were not fitting inside the plastic because of dimension, tolerance issues.',
    kind: 'snag',
  },
  {
    when: '17 Sep 2025',
    who: 'Prithu Hazarika',
    line: 'The problem is that in the 3-D printed parts, the motors and the PCB do not fit. It’s a lot of hassle.',
    kind: 'snag',
  },
  {
    when: '18 Sep 2025',
    who: 'Sumit Dandekar',
    line: 'We received wrong part number DRV8834 instead of DRV8833.',
    kind: 'snag',
  },
  {
    when: '18 Sep 2025',
    who: 'Prithu Hazarika',
    line: 'We assembled one device today, using a lot of tape, glue, and adhesives.',
    kind: 'win',
  },
  {
    when: '14 Oct 2025',
    who: 'Lalith Kumar',
    line: 'We are currently assembling the first unit, its going fine but, we faced a couple of issues which are resolvable.',
    kind: 'win',
  },
  {
    when: '20 Oct 2025',
    who: 'Prithu Hazarika',
    line: 'Due to Diwali holidays there has been some delay.',
    kind: 'snag',
  },
  {
    when: '19 Dec 2025',
    who: 'Prithu Hazarika',
    line: 'The display for now we are thinking Monochrome-DotMatrix.',
    kind: 'start',
  },
  {
    when: '9 Feb 2026',
    who: 'Ajay',
    line: 'Head is visually misaligned due to broken ribs which will guide it.',
    kind: 'snag',
  },
  {
    when: '12 Feb 2026',
    who: 'Ajay',
    line: 'Head tilt issue is resolved, now it aligned perfectly.',
    kind: 'win',
  },
  {
    when: '24 Feb 2026',
    who: 'Prithu Hazarika',
    line: 'The display finally worked yesterday 👍🏼',
    kind: 'win',
  },
  {
    when: '24 Mar 2026',
    who: 'Prithu Hazarika',
    line: 'In the current prototype, centre of gravity is a known issue.',
    kind: 'snag',
  },
] as const;

/* ── Licences ─────────────────────────────────────────────────────────────
 * Status is deliberately honest. The repositories are public but carry no
 * licence file, which means default copyright applies and nobody may legally
 * use them yet. Saying "public" and letting a reader infer "open" is the exact
 * gap someone doing diligence will find first.
 */
export const LICENCES = [
  {
    what: 'Firmware, application code, tooling',
    licence: 'Apache-2.0',
    why: 'Carries an explicit patent grant. MIT is silent on patents, and this is robotics.',
    status: 'applied' as const,
  },
  {
    what: 'CAD, PCB, mechanical design',
    licence: 'CERN-OHL-S-2.0',
    why: 'Strongly reciprocal — a modified design has to stay open. A permissive hardware licence would let a larger manufacturer close a fork.',
    status: 'applied' as const,
  },
  {
    what: 'Documentation, photographs, video',
    licence: 'CC BY-SA 4.0',
    why: 'The build record is part of the project, and it should travel under the same terms.',
    status: 'applied' as const,
  },
  {
    what: 'V1 — the ESP-ROLL replication',
    licence: 'Reference only',
    why: 'Derives from Max Imagination’s ESP-ROLL under CC BY-NC-SA: non-commercial, share-alike. Credited, not relicensed, not for commercial use until a lawyer has read it.',
    status: 'quarantined' as const,
  },
] as const;

/* ── What is not true yet ─────────────────────────────────────────────────
 * The most persuasive section on the site, and the cheapest to write.
 */
export const GAPS = [
  'V1 carries no open licence and is not cleared for commercial use. It replicates ESP-ROLL under CC BY-NC-SA, and whether V2 and V3 are legally independent designs is a question for a lawyer, not for us.',
  'Contributor copyright has not been transferred. Ayva Labs paid for the work, so Ayva holds the copyright by default. Moving it takes a legal step, not a decision.',
  'Nobody outside the team has built one from the published files. Until someone has, we do not know whether the repository is genuinely buildable.',
  'The centre of gravity on the current prototype is a known unsolved problem.',
  'Ambient noise on the microphone is not good enough yet.',
  'There is no gathering place that is not X. A forum or chat is owed to anyone who wants to contribute.',
] as const;

export const TEAM = [
  'Ashok Jaiswal',
  'Prithu Hazarika',
  'Lalith Kumar',
  'Sumit Dandekar',
  'Ameya Mistry',
  'Ajay',
] as const;

/* Checkable, all of them. */
export const NUMBERS = [
  { n: '3', label: 'hardware generations' },
  { n: '10', label: 'V2 units built by hand' },
  { n: '1,299', label: 'messages in the build log' },
  { n: '355', label: 'photographs, dated' },
  { n: '6', label: 'people' },
  { n: '$0', label: 'subscription, ever' },
] as const;
