exports.get404page = (req, res, next) => {
    res.status(404).render("404", {
        pageTitle: "Page Not Found",
        path: "/404",
        isAuthenticated: req.session.isLoggedIn
    });
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
};