import nodemailer from 'nodemailer'



const Gmail=process.env.Gmail
const Gmail_Pass=process.env.Gmail_Pass


export const mailer=async(email:string,hash:string)=>{

    
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        service:'Gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: Gmail, // generated ethereal user
            pass: Gmail_Pass, // generated ethereal password
        },
    });
    
    
    
    const info = await transporter.sendMail({
        from: 'dari.app.test@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Account verification ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<div>
        <b>Hello  </b>, 
        <p>this is your verification hash </p>
        <a target='blanck' href='https://dari2.vercel.app/verify/${hash}'>verify my account</a>
        </div>`
        
    }); 


    return(info)
}