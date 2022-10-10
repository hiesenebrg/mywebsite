const development ={
    name: 'development',
    assets_path : './assets',
    session_cookie :'blahsomething',
    db:'mywebsite_dbb',
    smtp :{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'adarshsingh8008@gmail.com',
            pass:'tpvjxaqkopvkkztu'
            // pass: 'udetyurctriwsqwh'
        }
    },
    google_client_id : "162091031643-atpaovb2al8j1heg70cptkeco3bf3pif.apps.googleusercontent.com",
    google_client_secret :"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",
    google_callback_url : "http://localhost:8000/users/auth/google/callback", 
    jwt_secret:'codial'
}
const production ={
    name: 'production'
}
module.exports = development; 