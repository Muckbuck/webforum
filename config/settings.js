module.exports = {
    dev:{
        URL: 'mongodb://admin:devPW@ds033066.mlab.com:33066/blogproject',
        PORT: 3000,
        SECRET: '!supermariosunshinegamecubesecretzelda)'
    },
    deploy:{
        URL: 'mongodb://admin:'+process.env.dbURL+'W@ds033066.mlab.com:33066/blogproject',
        PORT: process.env.PORT
    }
 
}