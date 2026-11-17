import subprocess, math, random, sys
from PIL import Image
W=H=3200; CX=CY=1600; R=1450
GOLD='#c9973a'; GOLD2='#e2b04a'; RED='#c4161c'; INK='#1d1916'; CREAM='#fbf7ee'
def rays():
    random.seed(7); out=[]; cx,cy=1660,1080
    for k in range(26):
        a=-math.pi/2+ (k-12.5)*0.2 + random.uniform(-0.05,0.05)
        if abs(math.sin(a))<0.15 and math.cos(a)<0: pass
        r0=260+random.uniform(0,80); r1=r0+random.uniform(380,720)
        x0,y0=cx+r0*math.cos(a),cy+r0*math.sin(a); x1,y1=cx+r1*math.cos(a),cy+r1*math.sin(a)
        w=random.uniform(10,22)
        nx,ny=-math.sin(a)*w,math.cos(a)*w
        out.append(f'<path d="M{x0-nx:.0f},{y0-ny:.0f} L{x1:.0f},{y1:.0f} L{x0+nx:.0f},{y0+ny:.0f} Z" fill="{GOLD2}" opacity="0.75"/>')
    return ''.join(out)
def brush(d, col, w, seed):
    # several jittered strokes = bristle texture, plus rough edge filter
    s=''
    random.seed(seed)
    for i in range(7):
        ww=w*random.uniform(0.18,0.32); dx=random.uniform(-w*0.32,w*0.32); dy=random.uniform(-w*0.32,w*0.32)
        s+=f'<path d="{d}" transform="translate({dx:.0f},{dy:.0f})" fill="none" stroke="{col}" stroke-width="{ww:.0f}" stroke-linecap="round" opacity="{random.uniform(0.75,1):.2f}"/>'
    return f'<g filter="url(#rough)"><path d="{d}" fill="none" stroke="{col}" stroke-width="{w*0.72:.0f}" stroke-linecap="round"/>{s}</g>'
def design(l1,l2,font,size1,size2):
    heart=("M 980,1290 C 700,1080 640,700 900,600 C 1120,520 1320,700 1450,900 "
           "C 1580,620 1860,420 2150,520 C 2480,640 2460,1080 2230,1420 C 2080,1650 1880,1860 1700,2050")
    cross=f'<g filter="url(#rough)"><path d="M1660,780 L1665,1820" stroke="{GOLD}" stroke-width="95" stroke-linecap="round" fill="none"/><path d="M1350,1080 L1990,1060" stroke="{GOLD}" stroke-width="88" stroke-linecap="round" fill="none"/><path d="M1650,800 L1652,1790" stroke="#a87a24" stroke-width="22" opacity="0.6" fill="none"/></g>'
    swoosh=f'<path d="M760,2480 C1100,2390 1500,2350 1950,2360 C1600,2390 1150,2430 790,2510 Z" fill="{GOLD}"/>'
    txt=(f'<text x="1530" y="1960" font-family="{font}" font-size="{size1}" fill="{INK}" stroke="{INK}" stroke-width="18" stroke-linejoin="round" text-anchor="end" transform="rotate(-6 1530 1960)">{l1}</text>'
         f'<text x="1640" y="2360" font-family="{font}" font-size="{size2}" fill="{INK}" stroke="{INK}" stroke-width="18" stroke-linejoin="round" text-anchor="middle" transform="rotate(-6 1640 2360)">{l2}</text>')
    defs=(f'<defs><radialGradient id="glow" cx="0.52" cy="0.34" r="0.42"><stop offset="0" stop-color="#ffe7a8" stop-opacity="0.85"/><stop offset="1" stop-color="{CREAM}" stop-opacity="0"/></radialGradient>'
          '<filter id="rough" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="26"/></filter></defs>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">{defs}'
            f'<circle cx="{CX}" cy="{CY}" r="{R}" fill="{CREAM}"/><circle cx="{CX}" cy="{CY}" r="{R}" fill="url(#glow)"/>'
            f'{rays()}{brush(heart,RED,120,11)}{cross}{txt}{swoosh}'
            f'<circle cx="{CX}" cy="{CY}" r="{R}" fill="none" stroke="{GOLD}" stroke-width="34"/></svg>')
PH={'L1':('God','Loves You'),'L2':('Jesus','Loves You'),'L3':('Christ','Loves You'),'L4':('God','Is Love')}
font=sys.argv[1] if len(sys.argv)>1 else 'Yellowtail'
from PIL import ImageFont
FT=ImageFont.truetype('/root/.fonts/Yellowtail-Regular.ttf',100)
for code,(a,b) in PH.items():
    w1=FT.getlength(a)/100; w2=FT.getlength(b)/100
    s1=min(700, 1040/w1)   # line 1 must stay left of the cross
    s2=min(720, 2050/w2)
    open(f'out/{code}.svg','w').write(design(a,b,font,s1,s2))
    subprocess.run(['rsvg-convert','-w',str(W),'-h',str(H),f'out/{code}.svg','-o',f'out/{code}.png'],check=True)
    im=Image.open(f'out/{code}.png'); im.crop(im.getbbox()).save(f'out/{code}.png')
    p=Image.new('RGB',(im.width,im.height),(40,40,44)); i2=Image.open(f'out/{code}.png'); p=Image.new('RGB',i2.size,(30,30,34)); p.paste(i2,(0,0),i2); p.thumbnail((640,640)); p.save(f'/tmp/{code}_prev.jpg')
print('ok')
