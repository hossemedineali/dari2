import { publicProcedure, router } from "../../trpc";

import { cities,governorates } from "../../../../utils/cities";

const houses= ["Dari/fs1wb2mldxejrjcbipoh","Dari/axkmqnsciantfr10dvai","Dari/nxqcsd0ecsqzkabzkwdv","Dari/fmfipf1ezpapzlmycgih","Dari/as9spndpfsfigcb2bapd","Dari/fft6ilnp8rjb2t4rtpo8","Dari/zrrhlcmbhajccxpmijjp","Dari/vurbvextnqxoa515jnhi","Dari/osms7t4dx6ft0v5xviac","Dari/xigvuscmcbuucdvzma52","Dari/mhpcimflsjxhbhjoozme","Dari/wkq3dhdsc1w7ozg0hanv","Dari/gtm0vjols6t8dmoyqmsg","Dari/ijv2lwgzu2vs6jli1suq","Dari/nam6ow3r11gyfkamrqbs","Dari/jchjy4wzltzjqpqomvuo","Dari/akdoaay48fk7gsr3nfo7","Dari/p9pcnytficyglmfm1qt9","Dari/kopwno2mdqnbrkn2fd2w","Dari/g9oyxyui7ssprqisslci","Dari/qd34hqyk76f1oydzbztt","Dari/ptsq252e9pvqp5bkjhbw","Dari/bkf5yvytrgw24vvcwipp","Dari/q1cdfdsoufe9mesoslzo","Dari/kculpokwhzlv0gpr2hgn","Dari/mp9yk01xrudkxvexendw","Dari/lcw8ucdh13i8mb3d2bmj","Dari/duhkng6eruxcd5xxlhb3","Dari/qiir2iumjaksw8mmdvbz","Dari/pcmgz51psev2zwest3mf","Dari/lqvw5cjiclch9ucgh5fg","Dari/rwgp5fjkyuzgyxkmt6zs","Dari/jgd5dwafgm0ny5pgu9bh","Dari/yk86qklxmkhxgdfsdmgx","Dari/hh9enhu1arjg4lgqlumz","Dari/zrhpbl3bcukeu1a8lu4s","Dari/u6uvmi5o7pcd2gwfrban","Dari/ziyhwd8bpyjpnsbjfbsg","Dari/vthpbejbvtzirh6k4q1p","Dari/ejlchdobmymbxc9bxbvj","Dari/jvzrvhqfefdorjqto5au","Dari/et9xf4mmthvavyob9udx","Dari/iqu96a5xy0os2x8mxff0","Dari/doymyuhgale8kcggx3yb","Dari/oa9dzz7xs1verqbkf8zb","Dari/iiqkqofqdk9ffsay7djc","Dari/y9intrirdwuyjrwlnkys","Dari/lshkhiu1lnle5nnxu4o9","Dari/zsz1q8cdn89msppxrqgn","Dari/o6am7r26v4fqvovwvj6r","Dari/m2oxvqmtd4yzsl1egsfa","Dari/xbmj9resvg2atvqhpklw","Dari/niytkqr2tcrqjtid4gi0","Dari/p2ouqg5lrje6snn7epz1","Dari/gvjqqssrofflncvsnxn3","Dari/slh1wellcwmawm9vjmro","Dari/prl6k03zbmxwzzcf4dyf","Dari/jn9q4x5mj0hcfczveqvs","Dari/egww7gdoyoota6ebjwft","Dari/qxocvpgo2snonbgcbx5s","Dari/t6y18sv7acboj947xgsw","Dari/jdzcf3tzr4eqqerzsume","Dari/vjoghery7rn5dwlw0vof","Dari/gjlsyeptmle5oubvmr3j","Dari/vmltilwhwl7tl0ycqqu4","Dari/teqoxuzhfbikcohqn1xm","Dari/xadxbzz258rfgo1ccett","Dari/aapeihj6gxamtzdwqqhy","Dari/oj4x8vp1wkr934pv9wse","Dari/awdfnduz0di84kpmcj5k","Dari/n6wgpyjx1nqsnmpuocxa","Dari/zexrat5bl0bga0tkwsfn","Dari/smboxkdiqgraubc5x0xc","Dari/ckvgt3zahno9ajwgvyiq","Dari/lziaqll9gyul0ro1kvat","Dari/ndaiygaqegxfz2rtnj0x","Dari/rem9hvh3uzsyul7es8g8","Dari/iychtaupdzwtqr8rs3h7","Dari/agxwpzgj2f8bh9mj5njx","Dari/vnaslllcfex2fqyismbe","Dari/meggjb7dareuycfc2odu","Dari/on01onexllklybjyvhgr","Dari/jdxjveujiho59nnxu638","Dari/aa5jsqzlqmmz7uzyucnm","Dari/hsdprqgkj3jmlzktgadp","Dari/yihjgt1xcbwlnwgvmtdn","Dari/yo5rqvsirig1kjcjkhse","Dari/nsi7iq6twrlrw4l6hip5","Dari/omnogxxpylblcirarxet","Dari/zvdxx6mwhyuudoddh6ox","Dari/jiwqeqhe51ga2xoctg61","Dari/zlwmcopmn2w965a3dztn","Dari/tfdopgbole0rvsqgwzsv","Dari/q4zzps6rye56og3acfkq","Dari/zmswxk0ampsosyrgwhhx","Dari/iup9964yia9p7z53kdx4","Dari/jkkznic95reh4s1n8nqn","Dari/voz8yrg3oijm1nlajrre","Dari/jrsnlmrmmylrofczwuea","Dari/pp8glrlb9nqdzxnyjjue","Dari/ru7y7tbcodoejdz5lcxy","Dari/ilffm2ccqnpsuj4zjbu8","Dari/gj6h3oc0tvsgo3663znp","Dari/ytpd3yqrmm6bypi619ot","Dari/lbm9689hg6buclyy5lvu","Dari/oz96ylu09odihrlhq75s","Dari/xtztugnsbsvyedraxtwd","Dari/kxbmzapnctphob2mltoa","Dari/vwd6jwutkjhkn2m2wy6i","Dari/ovf0phyzc4kiohudsvz1","Dari/m5c5fgofcxgquz8dnrc0","Dari/ibvv6w7vssklc9vku9tp","Dari/kq646khrw7r48tapmvgo","Dari/udd5jcmoisoqumvagigs","Dari/d6ej1hxceg8zly8jlszf","Dari/i2hpr0yinwdw5k6h2vpz","Dari/x0bvagpw1nk9lxoakbov","Dari/umvyn1tleio6y67b1p2v","Dari/e4i9xxx533xzwtsykw9k","Dari/kusabhylrk4ysryb7hgq","Dari/rksxqloivqkc6309khta","Dari/p24rfdgjgglz6jnhrrdg","Dari/zgintpfhpt2tpyhx1olp","Dari/uz4c29k93ovlqpyhmlp8","Dari/hmqkqci4dffip4iiw4f4","Dari/okzejvnirtaavvppahd4","Dari/ihmvkebxhq7plyjitttf","Dari/n2wrmfszv1lgl5vuckwl","Dari/ca3pkdww5lxdds5lknjz","Dari/awiq08fs2qs3rp0aoeya","Dari/tik9oxotpuprhc1almh5","Dari/wfmx0ohwr2kvu46mqone","Dari/donnryngaubpkyu7mhis","Dari/jphpj8qhqkr7jvsfgyjw","Dari/pujmlrppdd2srkjpiyhx","Dari/qkc0osvnohiulkpmj6zm","Dari/vjjteewcwstiizf5juv6","Dari/fnoywkyecy6cbqdln8jt","Dari/jg8oib3pzmsncfaa4quv","Dari/qoaqxsvjtggks32uw2ha","Dari/z1965lakns4sjjcx1x3w","Dari/fcracohlxuwqga6nhrdv","Dari/erbwcx1clxp0zxq7ye4w","Dari/l0mtcn5szrbmm9rdfwl5","Dari/rhzsvlomclysmw6jvv68","Dari/xscmbdmn5fswx4k4guon","Dari/j0me0ggewh3uci9k3qdb","Dari/h0f9xyxsfibnlccneqyg","Dari/hvw2crtkizn5gojk2gcu","Dari/o8iwboesdqu9fqqopyt4","Dari/qxjz4zllgfaxs4fqzaiq","Dari/ahzvkgozhkoxri9mjmu7","Dari/owg9kdwpic19wrxl8kp6","Dari/k0no9tbep9r9kpegnube","Dari/byyrkubbsbqynyermqbz","Dari/envtwj9zyqtuy2ggy5hp","Dari/yqvf59ymf7wt4tmbmkcs","Dari/hrwi3ql0noizwbdtikq3","Dari/bjfnuwchb8tpshmepbha","Dari/z4dzhbrikducbraylu7h","Dari/hog6hmyehad1ngjncuix","Dari/arpc9xkxfks7hmmorbom","Dari/ywlrdnflmjrlceubymk0","Dari/riog0gau2ykot2zezlr0","Dari/fubklreeaikwzykjrzmk","Dari/ntj5zwix4k34euzw0qod","Dari/wqcho09hyaqedf7tg7bu","Dari/piygzegd3fzaexye0v9c","Dari/f0ccv0hwl3cutebkzqgy","Dari/j5fyzpykpxy9x0h9muhl","Dari/f9gyxpwvg1g5qhad9to5"]

const lands=["Dari/pzo6hfpt8quvfqzg18lu","Dari/xxhnxptkj8cfzl7nuesr","Dari/qtyxsdhuc3drk1xl302x","Dari/xdujdpo7lmdwxxhykqwv","Dari/jv1g9ffctrivvhwpogoe","Dari/kjtvi0ealq9w87prxa2c","Dari/v359swnc1dvwlkxchyqu","Dari/upiitgvbahdlly85p036","Dari/pisl4jx1hjgc6dccjlcw","Dari/xqu065lrlqoh4vej1zfw","Dari/ehwbg4e3k1wnyjvnh5xu","Dari/nrf6naxh8cxjkaub0ssg","Dari/lipmek6bq0zzwak8ouvl","Dari/erzovx6glpsihkd6jvxf","Dari/ngxwr00thyhzenusco0v","Dari/olldhesjd4lcjp7hlm0o","Dari/qfudlfkr6qn4ip3iqaaf","Dari/i026udrcyluotnkw99el","Dari/rndvyj5bsy6q3glm6cpl","Dari/brevbub3jswpnvtqcbky","Dari/w7ap1dlws6aajrsull9f","Dari/qkka20rd61fezcxhonce","Dari/z6tkpiopimbsadrwmkrf","Dari/g8ch4xx3gzazsyza6usk","Dari/a30b7hqpky5icaragoip","Dari/o2bctsxefzfigge9ipap","Dari/mc7rekuhqrh2dhlool1t","Dari/w4j8429pogz3tlzct97p","Dari/svlgtvixs43jnveetjv3","Dari/xhb39jop10lpgrh9aosz","Dari/secqvsy6z8bryb5kliu0","Dari/btnu6cf299yjr1pz4cil","Dari/vi4juglf2zyoei3m3tnl","Dari/khxt7a499jjzzrzr9z5t","Dari/kk5ipoju19be61k5jxlz","Dari/gldhyc4u6wxzr18wilck","Dari/dbdq95xjuqhqjpzslqj3","Dari/q3753cxfnmwqomd11bm9","Dari/gfsiap742h1mobycef1u","Dari/a7o8lzdhxxvykd2srwyu","Dari/qxgxn9fqe4p03ocye0fh","Dari/trlkkbw8nfjjyjl0d7vl","Dari/ldu2jmyxyysl56q5cog4","Dari/lh9mgashqtkbhntlokg3","Dari/nzztbag4e3hcffz4s9bf","Dari/j0prdicscfrmqvpv36tr","Dari/x8yp4ucfeblczlkrur9o","Dari/ytbhczgc8th4oxavbdsq","Dari/t5s8vx0yptairos096x4","Dari/esksro2opgc39m2l5wnx","Dari/umgj8iypbltrmaadg0iz","Dari/uyvgrwnayqts6jvomuun","Dari/dbhyfub17jtahcknkja2","Dari/nidn1l2jftnesg3xl2ca","Dari/w28icxqceioe46oafyuf","Dari/jvflw8dftiqkt9en35bt","Dari/vkofntjestbykdzdejsi","Dari/rzepcm6lu1ad2ivpzkfb","Dari/gcp5jlas2buvm1quaipd","Dari/saste4psidubvsqoaifk","Dari/i4jwpr2o51hpujobyjna","Dari/hbsp0kxgeokody6vsaod","Dari/btdpde19xfm1rgaog5yk","Dari/vrm79xqsigkzt5ouak5i","Dari/clfhsceohsfrksjcnm4q","Dari/dmeu3akvctcmkmvaezx3","Dari/graopcsdtc24rl0ew7qd","Dari/k4frrdsafchizqxpp2pg","Dari/azkbzb78if3h8vbpvj4i","Dari/x8yoa1kose1d068edhhp","Dari/q2ft2b2fmaqdr2muysoh","Dari/fl86b54wq7b0sc7h9fbd","Dari/bpiwrpwruml8qtao3je6","Dari/afsqjbz8a40oydrmbcrd","Dari/ec7zkhvo0gcjylhkkmlf","Dari/sgfrui15ctywxtc5mos2","Dari/x7j7wqzcd0nxj97jz2vr","Dari/a6wzei3q6r4l7tpgfbir","Dari/cq1r5beq6izsolf13yiw","Dari/ldw5engmobmmskhzzenp","Dari/ogokb4tdvvt4bgomuwlj","Dari/zp736burlecwsr5xfyk8","Dari/famf0pnpanzbaga9pqaq","Dari/jzqpvxq9clargr3rg1zr","Dari/yl67okkjvu2fhajjvkxd","Dari/bosw1k9gkjdgmchbyxbl","Dari/pjnsa0cxaquzkfideild","Dari/cypvmo9f5tsx3vb8jfnt","Dari/tsly46l9ahwtvavjydfk", "Dari/ichuabtoxzxb1s938mcn" ,"Dari/qwddhqbsyfrlquld,5a"]

const anntype=['Sell','Rent','CoRental']



const sellPriceOptions=[75000,45000,30000,120000,250000,125525,131000,225000,137000,88000,95000,125000,131000,154200,100000,320000,160000,60000,43000,88000,87500,145555,120000,135000,125875,170000,500000,250000,78400,62000]

const mountRentOptions=[450,320,250,125,700,1200,120,245,550,610,620,450,480,320,330,391,750,680,620,660,600,270,310,420,480,515,625,521,121,251]

const DaylirentOptions=[45,90,80,75,35,88,62,45,57,86,120,125,300,157,270,110,88,99,77,55,44,35,45,88,120,60,65,70,75,74]

const houseSizeoptions=[175,280,1285,1190,595,1100,605,710,220,330,450,650,460,1170,1180,190,200,320,240,260,880,900,120,340,560,480,400,2520,1440,2450]

const getRandomImages=()=>{
    let image=''
    for(let i=0 ;i<7;i++){

      const random=Math.floor(Math.random() * houses.length-1)


      if(i<6) {image+=( houses[random] + ',')}
      else{
        image+=houses[random]
      }
    }
    return  image
   }


export const seed=router({
    seed:publicProcedure
     .mutation(async({ctx,input})=>{
    
        const table:{
            auther:string,
            authername:string,
            propertyType:string,
            announcementtype:string,
            landtype:string,
            price:number,
            pricePer:string,
            size:number,
            rooms:number,
            governorate:string,
            municipality:string,
            isposition:boolean,
            lng:number |undefined,
            lat:number |undefined,
            
            images:string,
            description:string,
            contact:string,
            userId:string
        }[]=[]
        let addedposts=0
        
        Object.entries(cities).forEach(([key,value])=>{

      
            value.map(async(item)=>{




                for (let i=0 ;i<3 ;i++){

                    const feartures={
                        Garage:Math.round(Math.random())==0?false:true,
                        Balcony:Math.round(Math.random())==0?false:true,
                        OutdoorArea:Math.round(Math.random())==0?false:true,
                        SwimmingPool:Math.round(Math.random())==0?false:true,
                        UndercoverParking:Math.round(Math.random())==0?false:true,
                        airConditioning:Math.round(Math.random())==0?false:true,
                        solarPanels:Math.round(Math.random())==0?false:true,
                        SolarHotwater:Math.round(Math.random())==0?false:true,

                    }
                    
                    const random01=Math.round(Math.random())
                    const random30=Math.floor(Math.random()*29)
                    const random301=Math.floor(Math.random()*29)
                    const randomRooms=Math.floor(Math.random()*5)
                    const image=getRandomImages()
                    
                   // const pricerent=random01==0?DaylirentOptions[random30]:mountRentOptions[random30]
                     const  data={
                        
                        auther:'clakr9ehs0000u6mgf4lp2epl',
                        authername:'hossem edine ali',
                        propertyType:'House',
                        announcementtype:'Sell',
                        landtype:'',
                        price:sellPriceOptions[random30] as number,
                        pricePer:'',
                        size:houseSizeoptions[random301] as number,
                        rooms:randomRooms,
                        governorate:key,
                        municipality:item.label,
                        isposition:true,
                        lng:item.position?.[1],
                        lat:item.position?.[1],
                        
                        images:image,
                        description:'This is a fake Post for testing purposes ',
                        contact:'24707943',
                        userId:'clakr9ehs0000u6mgf4lp2epl',
                        ...feartures
                        
                    }
                    table.push(data)
                  
                }
            })
        })
        

        return await ctx.prisma.post.createMany({
            data:table
        })
        
        
       
       
         
    })

    
})