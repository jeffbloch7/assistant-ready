"""Generate the Assistant Ready logo set (Concept B) as SVG files."""
# Regenerate from the repo root: python3 images/logo/src/build.py
# Fonts: Atkinson Hyperlegible (SIL Open Font License), subset to the logo text.
import base64
import pathlib

HERE = pathlib.Path(__file__).parent
OUT = HERE.parent
OUT.mkdir(parents=True, exist_ok=True)

TEAL, AMBER, CREAM = "#0b3b47", "#e9a23b", "#fbf8f3"
SWOOSH = "M8 70 C 14 96, 66 80, 100 32"


def mark(main, accent, uid):
    """The mark in a 120x104 box. The swoosh cuts a gap through the A via a mask,
    so it works on any background."""
    return f"""<defs>
    <mask id="{uid}" maskUnits="userSpaceOnUse" x="-10" y="-10" width="140" height="124">
      <rect x="-10" y="-10" width="140" height="124" fill="#fff"/>
      <path d="{SWOOSH}" fill="none" stroke="#000" stroke-width="18" stroke-linecap="round"/>
    </mask>
  </defs>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 94 L52 14 L82 94" stroke="{main}" stroke-width="14" mask="url(#{uid})"/>
    <path d="{SWOOSH}" stroke="{accent}" stroke-width="8"/>
    <path d="M88.5 31 L104 26 L103.5 42" stroke="{accent}" stroke-width="8"/>
    <path d="M78 8 L82 2 M88 14 L96 11 M84 20 L91 22" stroke="{accent}" stroke-width="4"/>
  </g>"""


def font_css():
    reg = base64.b64encode((HERE / "regular.woff2").read_bytes()).decode()
    bold = base64.b64encode((HERE / "bold.woff2").read_bytes()).decode()
    return f"""<style>
    @font-face {{ font-family: "AR Atkinson"; font-weight: 400; src: url(data:font/woff2;base64,{reg}) format("woff2"); }}
    @font-face {{ font-family: "AR Atkinson"; font-weight: 700; src: url(data:font/woff2;base64,{bold}) format("woff2"); }}
    text {{ font-family: "AR Atkinson", "Atkinson Hyperlegible", system-ui, sans-serif; }}
  </style>"""


def write(name, body):
    (OUT / name).write_text(body.strip() + "\n")


# Mark only
write("mark.svg", f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104" role="img" aria-label="Assistant Ready">
  {mark(TEAL, AMBER, "cut")}
</svg>""")
write("mark-white.svg", f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 104" role="img" aria-label="Assistant Ready">
  {mark(CREAM, AMBER, "cut")}
</svg>""")

# App / favicon / social icon: reversed mark on a teal rounded square
write("icon.svg", f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Assistant Ready">
  <rect width="512" height="512" rx="112" fill="{TEAL}"/>
  <g transform="translate(88 112) scale(3)">
  {mark(CREAM, AMBER, "cut")}
  </g>
</svg>""")


# Horizontal lockups
def lockup(text_color, tag_color, mark_main):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 110" role="img" aria-label="Assistant Ready: Your AI assistant, set up safely.">
  {font_css()}
  <g transform="translate(0 3)">
  {mark(mark_main, AMBER, "cut")}
  </g>
  <text x="138" y="58" font-size="46" font-weight="700" fill="{text_color}">Assistant Ready</text>
  <text x="140" y="91" font-size="20" font-weight="400" fill="{tag_color}">Your AI assistant, set up safely.</text>
</svg>"""


write("logo.svg", lockup(TEAL, "#46555c", TEAL))
write("logo-white.svg", lockup(CREAM, "#d6e6e8", CREAM))

for p in sorted(OUT.glob("*.svg")):
    print(p.name, p.stat().st_size, "bytes")
