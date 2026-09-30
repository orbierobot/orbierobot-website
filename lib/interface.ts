/**
 * The HTTP interface. Moved off the front page and into /docs/interface on
 * 30 Sep 2026 at the launch team's request: the presentation site was
 * carrying too much text, and this is reference material.
 *
 * Read straight out of the published firmware
 * (Firmware/components/camera/camera_server.c), not from anyone's memory.
 * Every route is a GET, which is the whole point: the robot is drivable from a
 * shell, a browser bar, or any language that can make an HTTP request.
 */
export const ENDPOINTS = [
  {
    route: 'GET /capture',
    does: 'A single still, as JPEG.',
    returns: 'image/jpeg',
    note: 'The one to point a vision model at. No firmware changes needed.',
  },
  {
    route: 'GET /stream',
    does: 'Live MJPEG.',
    returns: 'multipart/x-mixed-replace',
    note: 'Drop it straight into an <img src>.',
  },
  {
    route: 'GET /status',
    does: 'Every sensor, once.',
    returns: '{"distance":37,"temp_ambient":45.0,"temp_object":39.8,"laser":false,"drive":0,"turn":0}',
    note: 'Distance in millimetres, temperatures in °C.',
  },
  {
    route: 'GET /motor?drive=&turn=',
    does: 'Drive and steer.',
    returns: 'ok',
    note: 'Differential drive — the two wheels run against each other to turn.',
  },
  {
    route: 'GET /laser',
    does: 'Toggles the laser.',
    returns: 'LASER_ON / LASER_OFF',
    note: 'One call, no argument. The cat does not need an API key.',
  },
  {
    route: 'GET /face?expr=',
    does: 'Puts an expression on the display.',
    returns: 'ok / unknown expr',
    note: 'bliss · center · down · happy · heart · left · love · neutral · right · up',
  },
  {
    route: 'GET /beep',
    does: 'Speaker test tone.',
    returns: 'ok',
    note: '',
  },
  {
    route: 'GET /ota/update',
    does: 'Push new firmware over the air.',
    returns: '{"state":"...","percent":0,"message":"..."}',
    note: 'With /ota/info, /ota/status and /ota/rollback. You can brick-proof your own experiments.',
  },
] as const;

/* The three lines that make the point. Kept short enough to actually retype. */
export const EXAMPLE = `# the robot prints its IP on boot — no mDNS on this build yet
ORBIE=http://192.168.1.42

curl -s $ORBIE/capture -o frame.jpg            # what does it see?
curl -s $ORBIE/status                          # what does it feel?
curl -s "$ORBIE/motor?drive=40&turn=0"         # go and have a look
curl -s "$ORBIE/face?expr=happy"               # and be pleased about it`;
