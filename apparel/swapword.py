import cv2, numpy as np, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
S=3; cx,cy,r=619.5,629,604
base=Image.open('/tmp/nogod.png').convert('RGB')
big=base.resize((base.width*S,base.height*S),Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=2,percent=60,threshold=2))
def word(text,fontfile,wght,right_x,base_y,max_w,max_h,out,rot=-4):
    f=ImageFont.truetype(fontfile,400)
    try: f.set_variation_by_axes([wght])
    except Exception: pass
    bb=f.getbbox(text); w,h=bb[2]-bb[0],bb[3]-bb[1]
    sc=min(max_w*S/w, max_h*S/h); f=ImageFont.truetype(fontfile,int(400*sc))
    try: f.set_variation_by_axes([wght])
    except Exception: pass
    bb=f.getbbox(text); w,h=bb[2]-bb[0],bb[3]-bb[1]
    lay=Image.new('RGBA',(w+200,h+200),(0,0,0,0)); d=ImageDraw.Draw(lay)
    d.text((100-bb[0],100-bb[1]),text,font=f,fill=(26,21,18,255),stroke_width=14,stroke_fill=(26,21,18,255))
    lay=lay.rotate(-rot,resample=Image.BICUBIC,expand=True)
    img=big.copy().convert('RGBA')
    x=int(right_x*S-lay.width+100); y=int(base_y*S-lay.height+110)
    img.alpha_composite(lay,(max(0,x),max(0,y)))
    m=Image.new('L',(img.width*2,img.height*2),0); ImageDraw.Draw(m).ellipse(((cx-r)*S*2,(cy-r)*S*2,(cx+r)*S*2,(cy+r)*S*2),fill=255)
    img.putalpha(m.resize(img.size,Image.LANCZOS)); img=img.crop(img.getbbox()); img.save(out)
    p=Image.new('RGB',img.size,(30,30,34)); p.paste(img,(0,0),img); p.thumbnail((600,600)); p.save(out.replace('.png','_prev.jpg').replace('out/','/tmp/'))
font=sys.argv[1]; wght=int(sys.argv[2])
word('Jesus',font,wght,668,735,520,300,'out/L2u.png')
word('Christ',font,wght,668,735,540,300,'out/L3u.png')
