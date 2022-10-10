const development ={
    name: 'development',
    assets_path : './assets',
    session_cookie :'blahsomething',
    db:"mywebsite_dbb",
    smtp :{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "adarshsingh8008@gmail.com",
            pass:"tpvjxaqkopvkkztu"
            // pass: 'udetyurctriwsqwh'
        }
    },
    google_client_id : "162091031643-atpaovb2al8j1heg70cptkeco3bf3pif.apps.googleusercontent.com",
    google_client_secret :"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",
    google_callback_url : "http://localhost:8000/users/auth/google/callback", 
    jwt_secret:'codial'
}
const production ={
    name: 'production',
    assets_path : "./assets",
    session_cookie :process.env.MYWEBSITE_SESSION_COOKIE,
    db:process.env.MYWEBSITE_DB,
    smtp :{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MYWEBSITE_USERNAME,
            pass:process.env. MYWEBSITE_PASSWORD
            // pass: 'udetyurctriwsqwh'
        }
    },
    google_client_id : process.env.MYWEBSITE_GOOGLE_CLIENTID,
    google_client_secret :process.env.MYWEBSITE_GOOGLE_SECRET,
    google_callback_url : process.env. MYWEBSITE_CALLBACK_URL, 
    jwt_secret:process.env.MYWEBSITE_JWT_SECRET
}
module.exports = eval(process.env.MYWEBSITE_CODIAL) == undefined ? development :eval(process.env.MYWEBSITE_CODIAL); 