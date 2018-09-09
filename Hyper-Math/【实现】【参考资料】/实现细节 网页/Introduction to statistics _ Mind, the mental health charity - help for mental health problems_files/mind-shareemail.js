var intervalId;
$(document).ready(function () {
    $('#ShareEmailModal').foundation('reveal', {
        bg: $('#ShareEmailBackground')
    });

    $('#ShareEmailModal').bind('open', function () {
        var iframeHtml = '<iframe id="ShareModelIframe" width="100%" height="100%" frameborder="0" src="' + shareThisEmailUrl + '"></iframe><a class="close-reveal-modal">&#215;</a>';
        $('#ShareEmailModal').html(iframeHtml);

        $('#ShareModelIframe').on('load', function () {
            clearInterval(intervalId);
            //set correct height when first loads
            setIframeHeight(document.getElementById('ShareModelIframe'));
            //reset height every 100ms if errors (eg invalid email)
            intervalId = setInterval(function () {
                setIframeHeight(document.getElementById('ShareModelIframe'));
            }, 100);
        });

    });

    $('#ShareEmailModal').bind('closed', function () {
        $(this).html('');
        clearInterval(intervalId);
    });
});