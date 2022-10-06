// this is the kue worker whose task is to get the emails(job) form the queue and process it

const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailer');
queue.process('emails' , function(job,done) {
    console.log('emails worker is processing a job' , job.data);
    commentsMailer.newComment(job.data);
    done();
});