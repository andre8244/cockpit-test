function _(string) {
    return LANG_OBJ[string]
}

var LANG_OBJ = {}

nethserver.fetchTranslatedStrings(function (data) {
    LANG_OBJ = data
    $(document).trigger("language-loaded");
});

$(document).on("language-loaded", function () {

    function applyTranslations() {
        $('[i18n]').each(function () {
            $(this).text(_($(this).attr('i18n')))
        });
    }

    // define app routing
    var app = $.sammy('#app-views', function () {
        this.use('Template');

        this.get('#/', function (context) {
            this.partial('views/dashboard.html', {}, function(context) {
                applyTranslations();
            });
        });

        this.get('#/item1', function (context) {
            this.partial('views/item1.html', {}, function(context) {
                applyTranslations();
            });
        });

        this.get('#/logs', function (context) {
            this.partial('views/logs.html', {}, function(context) {
                applyTranslations();
            });
        });

        this.get('#/about', function (context) {
            this.partial('views/about.html', {}, function(context) {
                applyTranslations();
            });
        });

        this.before('.*', function () {

            var hash = document.location.hash.replace("/", "");
            hash = hash == '#' ? '#dashboard' : hash
            $("nav>ul>li").removeClass("active");
            $("nav>ul>li" + hash + "-item").addClass("active");
        });

    });

    app.run('#/');
})
