import app from "./app";
app.listen(process.env.APP_PORT, () => {
    console.log('Express server listening on port ' + process.env.APP_PORT);
});